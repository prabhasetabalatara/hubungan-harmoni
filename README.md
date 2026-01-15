# Landing Page Ebook - Harmoni Intim

Landing page profesional untuk penjualan ebook tentang tips hubungan suami istri, dibuat dengan Next.js 15, TypeScript, Tailwind CSS, Framer Motion, dan Supabase.

## 🌟 Fitur

- ✅ **Desain Modern & Responsif** - Tampilan elegan dengan animasi smooth
- ✅ **Hero Section** dengan CTA yang menarik
- ✅ **Problem-Solution Flow** yang persuasif
- ✅ **Testimoni** dari pelanggan
- ✅ **FAQ** dengan accordion interaktif
- ✅ **Integrasi Pembayaran Scalev** - Embed form pemesanan
- ✅ **Dashboard Analytics** - Tracking statistik kunjungan real-time dengan Supabase
- ✅ **Authentication** - Login admin dengan bcrypt password hashing
- ✅ **Animasi Framer Motion** - Transisi halus dan engaging
- ✅ **Icon Lucide React** - Icon set yang konsisten dan profesional
- ✅ **Database Supabase** - PostgreSQL cloud database dengan real-time capabilities

## 🚀 Teknologi

- **Next.js 15** - React framework dengan App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icon set
- **Supabase** - PostgreSQL database, authentication, and real-time subscriptions
- **bcryptjs** - Password hashing untuk security

## 📦 Instalasi

### 1. Clone/Extract Project
```bash
cd landing-page-ebook
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Supabase
**PENTING:** Baca file `SUPABASE_SETUP.md` untuk panduan lengkap!

Quick steps:
1. Buat project di [https://supabase.com](https://supabase.com)
2. Copy API keys dari Settings > API
3. Run SQL schema dari `supabase-schema.sql`
4. Copy `.env.example` ke `.env.local`
5. Update values di `.env.local`

### 4. Jalankan Development Server
```bash
npm run dev
```

### 5. Buka Browser
```
http://localhost:3000
```

## 🔐 Authentication

### Default Admin Login
```
Username: admin
Password: admin123
```

⚠️ **GANTI PASSWORD INI SETELAH LOGIN PERTAMA!**

### Login Page
```
http://localhost:3000/login
```

## 📊 Dashboard Analytics

Akses dashboard analytics di:
```
http://localhost:3000/admin
```

Dashboard menampilkan:
- Total kunjungan
- Pengunjung unik
- Kunjungan hari ini
- Grafik 7 hari terakhir
- Top referrers
- Aktivitas real-time
- Device, browser, dan OS stats

Semua data disimpan di Supabase PostgreSQL database.

## 🗄️ Database Schema

File `supabase-schema.sql` include:
- **admin_users** - Admin authentication
- **page_views** - Setiap kunjungan halaman
- **unique_visitors** - Tracking unique visitors by IP
- **daily_stats** - Agregasi statistik harian
- **referrers** - Sumber traffic
- **conversion_events** - Track konversi & events
- **Views** - analytics_summary, top_referrers, recent_activity
- **RLS Policies** - Row Level Security untuk data protection
- **Functions** - Auto-update timestamps & daily stats aggregation

## 🎨 Struktur Warna

- **Primary:** Burgundy (#991b1b)
- **Secondary:** Amber (#f59e0b)
- **Background:** Stone tones
- **Accent:** Gold highlights

## 📱 Sections

1. **Hero Section** - Header dengan CTA utama
2. **Problem Section** - Identifikasi masalah target audience
3. **Solution Section** - Isi ebook dengan detail bab
4. **Benefit Section** - Manfaat yang didapat pembeli
5. **Testimonial Section** - Social proof dari pelanggan
6. **Pricing Section** - Harga dan form pemesanan (Scalev)
7. **FAQ Section** - Pertanyaan umum dengan accordion
8. **Footer** - Informasi kontak dan links

## 🔧 Kustomisasi

### Mengubah URL Scalev

Edit file `components/PricingSection.tsx` baris 94:
```typescript
src="https://prhatara.myscalev.com/hubungan-harmonis"
```

### Mengubah Warna Brand

Edit file `tailwind.config.ts` untuk mengubah color palette.

### Menambah/Edit Konten

Setiap section ada di folder `components/` dengan nama yang jelas.

## 📈 Analytics API

### POST /api/analytics
Track page view event:
```json
{
  "event": "page_view",
  "page": "/",
  "timestamp": "2026-01-15T10:00:00.000Z",
  "userAgent": "...",
  "referrer": "..."
}
```

Data disimpan ke Supabase tables: `page_views`, `unique_visitors`, `referrers`

### GET /api/analytics
Retrieve analytics data dari Supabase:
```json
{
  "totalViews": 1234,
  "uniqueVisitors": 567,
  "todayViews": 89,
  "last7Days": [...],
  "topReferrers": [...],
  "recentViews": [...]
}
```

### POST /api/auth/login
Admin login:
```json
{
  "username": "admin",
  "password": "admin123"
}
```

Returns session cookie for authentication.

### POST /api/auth/logout
Logout admin - clears session cookie.

## 🚀 Deployment

### Vercel (Recommended)

1. Push code ke GitHub
2. Import project di Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

### Manual Build
```bash
npm run build
npm start
```

## 📝 Files Structure

```
landing-page-ebook/
├── app/
│   ├── admin/              # Dashboard analytics
│   ├── login/              # Login page
│   ├── api/
│   │   ├── analytics/      # Analytics endpoints
│   │   └── auth/           # Authentication endpoints
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/             # React components
├── lib/
│   ├── supabase.ts        # Supabase client config
│   └── auth.ts            # Auth helper functions
├── supabase-schema.sql    # Database schema
├── .env.example           # Environment variables template
├── SUPABASE_SETUP.md      # Detailed Supabase setup guide
└── README.md
```

## 🔒 Security Features

- ✅ Password hashing with bcrypt (10 rounds)
- ✅ HTTP-only cookies for sessions
- ✅ Row Level Security (RLS) di Supabase
- ✅ Environment variables for sensitive data
- ✅ CORS configured
- ✅ SQL injection protection (Supabase parameterized queries)

## 📚 Documentation

- **SUPABASE_SETUP.md** - Panduan lengkap setup Supabase step-by-step
- **QUICK_START.md** - Quick start guide untuk development
- **supabase-schema.sql** - Full database schema dengan comments

## 🆘 Troubleshooting

### Analytics tidak tercatat
- Check Supabase connection
- Check RLS policies enabled
- Lihat browser console untuk errors
- Check Supabase Logs

### Login gagal
- Verify admin_users table has data
- Check password hash benar
- Verify bcryptjs installed

### Environment variables error
- Check .env.local exists
- Restart dev server after editing .env
- Verify values tidak kosong

## 🎯 SEO

Landing page sudah include:
- Meta tags yang optimal
- Open Graph untuk social media
- Semantic HTML structure
- Performance optimized dengan Next.js

## 📞 Support

Untuk pertanyaan dan support:
- Email: support@harmoniintim.com

## 📄 License

© 2026 Harmoni Intim. All rights reserved.
