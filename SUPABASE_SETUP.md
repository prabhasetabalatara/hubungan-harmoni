# 🚀 SETUP GUIDE - SUPABASE & AUTHENTICATION

## 📋 Daftar Isi
1. [Setup Supabase](#setup-supabase)
2. [Konfigurasi Environment Variables](#konfigurasi-environment-variables)
3. [Jalankan SQL Schema](#jalankan-sql-schema)
4. [Testing](#testing)
5. [Default Admin Login](#default-admin-login)
6. [Security Best Practices](#security-best-practices)

---

## 🔧 Setup Supabase

### Step 1: Buat Akun Supabase
1. Buka [https://supabase.com](https://supabase.com)
2. Klik "Start your project"
3. Sign up dengan GitHub atau email

### Step 2: Buat Project Baru
1. Klik "New Project"
2. Isi form:
   - **Name:** landing-page-ebook (atau nama lain)
   - **Database Password:** Buat password yang kuat (simpan!)
   - **Region:** Pilih yang paling dekat dengan target audience
   - **Pricing Plan:** Pilih Free tier untuk development
3. Klik "Create new project"
4. Tunggu ~2 menit sampai project siap

### Step 3: Dapatkan API Keys
1. Setelah project siap, buka **Settings** (icon gear)
2. Klik **API** di sidebar
3. Copy 2 values ini:
   - **Project URL** - Contoh: `https://abcdefgh.supabase.co`
   - **anon/public key** - String panjang yang diawali `eyJ...`

---

## 🔐 Konfigurasi Environment Variables

### Step 1: Buat File .env.local
```bash
cd landing-page-ebook
cp .env.example .env.local
```

### Step 2: Edit .env.local
Buka file `.env.local` dan ganti dengan values dari Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-long-key-here
```

⚠️ **PENTING:** Jangan commit file `.env.local` ke git!

---

## 📊 Jalankan SQL Schema

### Step 1: Buka SQL Editor
1. Di Supabase Dashboard, klik **SQL Editor** di sidebar
2. Klik "New query"

### Step 2: Copy & Run Schema
1. Buka file `supabase-schema.sql` di project
2. Copy **semua isi file**
3. Paste di SQL Editor Supabase
4. Klik "Run" atau tekan `Ctrl+Enter`

### Step 3: Verifikasi
Setelah sukses, check di **Table Editor**:
- ✅ admin_users
- ✅ page_views
- ✅ unique_visitors
- ✅ daily_stats
- ✅ referrers
- ✅ conversion_events

---

## 🧪 Testing

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```

### Step 3: Test Landing Page
1. Buka `http://localhost:3000`
2. Scroll halaman - setiap view akan tercatat di Supabase
3. Check di Supabase Table Editor > `page_views` - harusnya ada data baru

### Step 4: Test Login
1. Buka `http://localhost:3000/login`
2. Login dengan:
   - **Username:** `admin`
   - **Password:** `admin123`
3. Seharusnya redirect ke `/admin`

### Step 5: Test Dashboard
1. Di `/admin`, lihat statistik:
   - Total views
   - Unique visitors
   - Chart 7 hari
   - Recent activity
2. Klik "Refresh" untuk update data

---

## 🔑 Default Admin Login

Default credentials setelah run SQL schema:

```
Username: admin
Password: admin123
```

⚠️ **SANGAT PENTING:** Ganti password ini setelah login pertama!

### Cara Ganti Password (Via Supabase Dashboard)

#### Option 1: Via SQL Editor
```sql
-- Ganti password menjadi 'newpassword123'
-- Hash ini adalah untuk 'newpassword123'
UPDATE admin_users 
SET password_hash = '$2a$10$abcdefghijklmnopqrstuvwxyz1234567890'
WHERE username = 'admin';
```

#### Option 2: Buat Script Node.js
Buat file `hash-password.js`:
```javascript
const bcrypt = require('bcryptjs');

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  console.log('Password hash:', hash);
}

hashPassword('your-new-password-here');
```

Run:
```bash
node hash-password.js
```

Copy hash yang dihasilkan, lalu update di Supabase Table Editor.

---

## 🛡️ Security Best Practices

### 1. Ganti Default Password
❌ Jangan gunakan `admin123` di production!
✅ Gunakan password yang kuat: min 12 karakter, campuran huruf/angka/simbol

### 2. Enable Row Level Security (RLS)
Schema sudah include RLS policies, tapi pastikan enabled:

```sql
-- Check RLS status
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';
```

Semua table harusnya `rowsecurity = true`

### 3. Rate Limiting
Tambahkan rate limiting untuk API routes di production:
- Login endpoint: Max 5 attempts per 15 minutes
- Analytics endpoint: Max 100 requests per minute

### 4. HTTPS Only
Di production, pastikan:
- Landing page di-serve via HTTPS
- Cookies set dengan `secure: true`
- CORS policy configured

### 5. Environment Variables
Di production (Vercel/Netlify):
1. Jangan commit `.env.local`
2. Set environment variables di dashboard hosting
3. Gunakan secrets management untuk sensitive data

### 6. Database Backup
Setup automatic backup di Supabase:
1. Dashboard > Database > Backups
2. Enable Point-in-Time Recovery (PITR) untuk production

---

## 🔍 Troubleshooting

### Error: "Missing Supabase environment variables"
- ✅ Check file `.env.local` exists
- ✅ Check values tidak kosong
- ✅ Restart dev server setelah edit .env

### Error: "Failed to track analytics"
- ✅ Check Supabase project masih aktif
- ✅ Check API keys masih valid
- ✅ Check RLS policies enabled
- ✅ Check di Supabase Logs untuk error details

### Login Gagal
- ✅ Check table `admin_users` ada data
- ✅ Check username/password benar
- ✅ Check bcrypt working: `npm list bcryptjs`

### Analytics Tidak Tercatat
- ✅ Check network tab browser - request ke `/api/analytics` sukses?
- ✅ Check di Supabase Table Editor > `page_views` ada data?
- ✅ Check RLS policy: Public dapat insert page_views

---

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [bcrypt Documentation](https://www.npmjs.com/package/bcryptjs)

---

## 🎉 Selesai!

Jika semua step di atas sudah done, landing page Anda siap dengan:
- ✅ Analytics tracking via Supabase
- ✅ Protected admin dashboard
- ✅ Secure authentication
- ✅ Real-time statistics

**Next Steps:**
1. Deploy ke production (Vercel recommended)
2. Setup custom domain
3. Configure email notifications (optional)
4. Setup monitoring & alerts

Happy launching! 🚀
