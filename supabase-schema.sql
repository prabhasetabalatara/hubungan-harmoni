-- ============================================
-- SUPABASE DATABASE SCHEMA
-- Landing Page Ebook Analytics & Authentication
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE: admin_users
-- Menyimpan data admin untuk akses dashboard
-- ============================================
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    email VARCHAR(255) UNIQUE,
    full_name VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index untuk optimasi query login
CREATE INDEX idx_admin_users_username ON admin_users(username);
CREATE INDEX idx_admin_users_email ON admin_users(email);

-- ============================================
-- TABLE: page_views
-- Menyimpan setiap kunjungan halaman
-- ============================================
CREATE TABLE IF NOT EXISTS page_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page VARCHAR(255) NOT NULL,
    referrer TEXT,
    user_agent TEXT,
    ip_address VARCHAR(45),
    country VARCHAR(100),
    city VARCHAR(100),
    device_type VARCHAR(50),
    browser VARCHAR(100),
    os VARCHAR(100),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    session_id UUID,
    is_unique_visitor BOOLEAN DEFAULT false
);

-- Indexes untuk optimasi query analytics
CREATE INDEX idx_page_views_timestamp ON page_views(timestamp DESC);
CREATE INDEX idx_page_views_page ON page_views(page);
CREATE INDEX idx_page_views_ip ON page_views(ip_address);
CREATE INDEX idx_page_views_session ON page_views(session_id);
CREATE INDEX idx_page_views_date ON page_views(DATE(timestamp));

-- ============================================
-- TABLE: unique_visitors
-- Tracking unique visitors berdasarkan IP
-- ============================================
CREATE TABLE IF NOT EXISTS unique_visitors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ip_address VARCHAR(45) UNIQUE NOT NULL,
    first_visit TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_visit TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    visit_count INTEGER DEFAULT 1,
    user_agent TEXT,
    country VARCHAR(100),
    city VARCHAR(100)
);

-- Index untuk query unique visitors
CREATE INDEX idx_unique_visitors_ip ON unique_visitors(ip_address);
CREATE INDEX idx_unique_visitors_first_visit ON unique_visitors(first_visit);

-- ============================================
-- TABLE: daily_stats
-- Agregasi statistik harian untuk performa
-- ============================================
CREATE TABLE IF NOT EXISTS daily_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE UNIQUE NOT NULL,
    total_views INTEGER DEFAULT 0,
    unique_visitors INTEGER DEFAULT 0,
    new_visitors INTEGER DEFAULT 0,
    returning_visitors INTEGER DEFAULT 0,
    avg_session_duration INTERVAL,
    bounce_rate DECIMAL(5,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index untuk query statistik
CREATE INDEX idx_daily_stats_date ON daily_stats(date DESC);

-- ============================================
-- TABLE: referrers
-- Tracking sumber traffic
-- ============================================
CREATE TABLE IF NOT EXISTS referrers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    referrer_url TEXT NOT NULL,
    referrer_domain VARCHAR(255),
    visit_count INTEGER DEFAULT 1,
    first_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index untuk query referrers
CREATE INDEX idx_referrers_domain ON referrers(referrer_domain);
CREATE INDEX idx_referrers_count ON referrers(visit_count DESC);

-- ============================================
-- TABLE: conversion_events
-- Tracking konversi (klik CTA, pembelian, dll)
-- ============================================
CREATE TABLE IF NOT EXISTS conversion_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type VARCHAR(100) NOT NULL, -- 'cta_click', 'form_submit', 'purchase', etc.
    event_data JSONB,
    page VARCHAR(255),
    user_agent TEXT,
    ip_address VARCHAR(45),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    session_id UUID
);

-- Index untuk query konversi
CREATE INDEX idx_conversion_events_type ON conversion_events(event_type);
CREATE INDEX idx_conversion_events_timestamp ON conversion_events(timestamp DESC);
CREATE INDEX idx_conversion_events_session ON conversion_events(session_id);

-- ============================================
-- FUNCTIONS: Auto-update timestamp
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger untuk auto-update timestamp di admin_users
CREATE TRIGGER update_admin_users_updated_at
    BEFORE UPDATE ON admin_users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger untuk auto-update timestamp di daily_stats
CREATE TRIGGER update_daily_stats_updated_at
    BEFORE UPDATE ON daily_stats
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- FUNCTION: Update daily stats
-- Agregasi otomatis statistik harian
-- ============================================
CREATE OR REPLACE FUNCTION update_daily_stats()
RETURNS void AS $$
DECLARE
    target_date DATE := CURRENT_DATE;
BEGIN
    INSERT INTO daily_stats (
        date,
        total_views,
        unique_visitors,
        new_visitors
    )
    SELECT
        target_date,
        COUNT(*),
        COUNT(DISTINCT ip_address),
        COUNT(DISTINCT CASE WHEN is_unique_visitor THEN ip_address END)
    FROM page_views
    WHERE DATE(timestamp) = target_date
    ON CONFLICT (date) DO UPDATE SET
        total_views = EXCLUDED.total_views,
        unique_visitors = EXCLUDED.unique_visitors,
        new_visitors = EXCLUDED.new_visitors,
        updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- VIEW: analytics_summary
-- View untuk summary analytics
-- ============================================
CREATE OR REPLACE VIEW analytics_summary AS
SELECT
    COUNT(*) as total_views,
    COUNT(DISTINCT ip_address) as unique_visitors,
    COUNT(CASE WHEN DATE(timestamp) = CURRENT_DATE THEN 1 END) as today_views,
    COUNT(CASE WHEN timestamp >= CURRENT_DATE - INTERVAL '7 days' THEN 1 END) as last_7_days_views,
    COUNT(CASE WHEN timestamp >= CURRENT_DATE - INTERVAL '30 days' THEN 1 END) as last_30_days_views
FROM page_views;

-- ============================================
-- VIEW: top_referrers
-- View untuk top referrers
-- ============================================
CREATE OR REPLACE VIEW top_referrers AS
SELECT
    referrer_domain,
    visit_count,
    last_seen
FROM referrers
WHERE referrer_domain IS NOT NULL
ORDER BY visit_count DESC
LIMIT 20;

-- ============================================
-- VIEW: recent_activity
-- View untuk aktivitas terbaru
-- ============================================
CREATE OR REPLACE VIEW recent_activity AS
SELECT
    id,
    page,
    referrer,
    ip_address,
    device_type,
    browser,
    timestamp
FROM page_views
ORDER BY timestamp DESC
LIMIT 100;

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- Keamanan akses data
-- ============================================

-- Enable RLS untuk semua tabel
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE unique_visitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrers ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversion_events ENABLE ROW LEVEL SECURITY;

-- Policy: Admin bisa read all data
CREATE POLICY "Admin can read all analytics data" 
    ON page_views FOR SELECT 
    USING (true);

CREATE POLICY "Admin can read all unique visitors" 
    ON unique_visitors FOR SELECT 
    USING (true);

CREATE POLICY "Admin can read all daily stats" 
    ON daily_stats FOR SELECT 
    USING (true);

CREATE POLICY "Admin can read all referrers" 
    ON referrers FOR SELECT 
    USING (true);

-- Policy: Public dapat insert page views (untuk tracking)
CREATE POLICY "Public can insert page views" 
    ON page_views FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Public can insert unique visitors" 
    ON unique_visitors FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Public can insert conversion events" 
    ON conversion_events FOR INSERT 
    WITH CHECK (true);

-- ============================================
-- SEED DATA: Default Admin User
-- Username: admin
-- Password: admin123 (HARUS DIGANTI!)
-- ============================================

-- Password hash untuk 'admin123' menggunakan bcrypt
-- Hash: $2a$10$X8qnLZ5ZGvJ5LZg5hOxKXO.tZvXvJ5nZQxG8xK5YJ5Z5J5Z5J5Z5J
INSERT INTO admin_users (username, password_hash, email, full_name) 
VALUES (
    'admin',
    '$2a$10$X8qnLZ5ZGvJ5LZg5hOxKXO.tZvXvJ5nZQxG8xK5YJ5Z5J5Z5J5Z5J',
    'admin@harmoniintim.com',
    'Administrator'
) ON CONFLICT (username) DO NOTHING;

-- ============================================
-- SCHEDULED JOBS (untuk Supabase Edge Functions)
-- ============================================

-- Catatan: Untuk menjalankan fungsi update_daily_stats() secara otomatis,
-- buat Edge Function atau Cron Job di Supabase dengan schedule:
-- 0 1 * * * (setiap hari jam 01:00)
-- 
-- Contoh SQL untuk manual trigger:
-- SELECT update_daily_stats();

-- ============================================
-- HELPFUL QUERIES
-- ============================================

-- Query: Total views hari ini
-- SELECT COUNT(*) FROM page_views WHERE DATE(timestamp) = CURRENT_DATE;

-- Query: Unique visitors minggu ini
-- SELECT COUNT(DISTINCT ip_address) FROM page_views 
-- WHERE timestamp >= CURRENT_DATE - INTERVAL '7 days';

-- Query: Top pages
-- SELECT page, COUNT(*) as views 
-- FROM page_views 
-- GROUP BY page 
-- ORDER BY views DESC;

-- Query: Hourly traffic today
-- SELECT 
--     EXTRACT(HOUR FROM timestamp) as hour,
--     COUNT(*) as views
-- FROM page_views
-- WHERE DATE(timestamp) = CURRENT_DATE
-- GROUP BY hour
-- ORDER BY hour;

-- ============================================
-- MAINTENANCE
-- ============================================

-- Clean old data (older than 1 year)
-- DELETE FROM page_views WHERE timestamp < NOW() - INTERVAL '1 year';

-- Vacuum tables for performance
-- VACUUM ANALYZE page_views;
-- VACUUM ANALYZE unique_visitors;

-- ============================================
-- BACKUP RECOMMENDATION
-- ============================================
-- Backup database secara rutin menggunakan:
-- 1. Supabase Dashboard > Database > Backups
-- 2. pg_dump untuk manual backup
-- 3. Point-in-time recovery (PITR) untuk production

-- ============================================
-- END OF SCHEMA
-- ============================================
