import bcrypt from 'bcryptjs';
import { supabase } from './supabase';

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Verify password
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Authenticate admin user
export async function authenticateAdmin(username: string, password: string) {
  try {
    // Get user from database
    const { data: user, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('username', username)
      .eq('is_active', true)
      .single();

    if (error || !user) {
      return { success: false, error: 'Invalid credentials' };
    }

    // Verify password
    const isValid = await verifyPassword(password, user.password_hash);

    if (!isValid) {
      return { success: false, error: 'Invalid credentials' };
    }

    // Update last login
    await supabase
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', user.id);

    // Return user data (without password hash)
    const { password_hash, ...userData } = user;
    
    return {
      success: true,
      user: userData,
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return { success: false, error: 'Authentication failed' };
  }
}

// Create admin user
export async function createAdminUser(
  username: string,
  password: string,
  email?: string,
  fullName?: string
) {
  try {
    // Check if username exists
    const { data: existing } = await supabase
      .from('admin_users')
      .select('username')
      .eq('username', username)
      .single();

    if (existing) {
      return { success: false, error: 'Username already exists' };
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Insert user
    const { data, error } = await supabase
      .from('admin_users')
      .insert({
        username,
        password_hash: passwordHash,
        email,
        full_name: fullName,
      })
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    const { password_hash, ...userData } = data;
    return { success: true, user: userData };
  } catch (error) {
    console.error('Create user error:', error);
    return { success: false, error: 'Failed to create user' };
  }
}

// Change password
export async function changePassword(userId: string, newPassword: string) {
  try {
    const passwordHash = await hashPassword(newPassword);

    const { error } = await supabase
      .from('admin_users')
      .update({ password_hash: passwordHash })
      .eq('id', userId);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Change password error:', error);
    return { success: false, error: 'Failed to change password' };
  }
}
