"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Eye, Users, TrendingUp, Calendar, ExternalLink, 
  RefreshCw, ArrowLeft, BarChart3, Globe, LogOut 
} from "lucide-react";
import Link from "next/link";

interface AnalyticsData {
  totalViews: number;
  uniqueVisitors: number;
  todayViews: number;
  last7Days: { date: string; views: number }[];
  topReferrers: { referrer: string; count: number }[];
  recentViews: any[];
}

export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/analytics');
      const analyticsData = await response.json();
      setData(analyticsData);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
    
    // Auto refresh every 30 seconds
    const interval = setInterval(fetchAnalytics, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-burgundy-50 to-stone-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-burgundy-600 animate-spin mx-auto mb-4" />
          <p className="text-burgundy-900 font-semibold">Loading Analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-burgundy-50 to-stone-100">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-burgundy-700 hover:text-burgundy-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-semibold">Kembali ke Landing Page</span>
              </Link>
            </div>
            
            <div className="flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-burgundy-700" />
              <h1 className="text-2xl font-bold text-burgundy-900">Dashboard Analytics</h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={fetchAnalytics}
                className="flex items-center gap-2 bg-burgundy-700 hover:bg-burgundy-800 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-stone-200 hover:bg-stone-300 text-burgundy-900 px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-burgundy-100"
          >
            <div className="flex items-center justify-between mb-4">
              <Eye className="w-10 h-10 text-burgundy-600" />
              <div className="bg-burgundy-100 text-burgundy-700 px-3 py-1 rounded-full text-sm font-semibold">
                Total
              </div>
            </div>
            <p className="text-3xl font-bold text-burgundy-900 mb-1">
              {data?.totalViews.toLocaleString()}
            </p>
            <p className="text-stone-600 text-sm">Total Kunjungan</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-amber-100"
          >
            <div className="flex items-center justify-between mb-4">
              <Users className="w-10 h-10 text-amber-600" />
              <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-semibold">
                Unik
              </div>
            </div>
            <p className="text-3xl font-bold text-burgundy-900 mb-1">
              {data?.uniqueVisitors.toLocaleString()}
            </p>
            <p className="text-stone-600 text-sm">Pengunjung Unik</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-green-100"
          >
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-10 h-10 text-green-600" />
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                Hari Ini
              </div>
            </div>
            <p className="text-3xl font-bold text-burgundy-900 mb-1">
              {data?.todayViews.toLocaleString()}
            </p>
            <p className="text-stone-600 text-sm">Kunjungan Hari Ini</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-blue-100"
          >
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-10 h-10 text-blue-600" />
              <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                Rata-rata
              </div>
            </div>
            <p className="text-3xl font-bold text-burgundy-900 mb-1">
              {data?.last7Days ? 
                Math.round(data.last7Days.reduce((sum, day) => sum + day.views, 0) / 7).toLocaleString() 
                : 0}
            </p>
            <p className="text-stone-600 text-sm">Per Hari (7 Hari)</p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Chart - Last 7 Days */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-stone-200"
          >
            <h3 className="text-xl font-bold text-burgundy-900 mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              Kunjungan 7 Hari Terakhir
            </h3>
            <div className="space-y-3">
              {data?.last7Days.map((day, index) => {
                const maxViews = Math.max(...(data?.last7Days.map(d => d.views) || [1]));
                const percentage = (day.views / maxViews) * 100;
                const date = new Date(day.date);
                const dayName = date.toLocaleDateString('id-ID', { weekday: 'short', month: 'short', day: 'numeric' });
                
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-stone-700">{dayName}</span>
                      <span className="text-sm font-bold text-burgundy-900">{day.views}</span>
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="bg-gradient-to-r from-burgundy-600 to-amber-500 h-3 rounded-full"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Top Referrers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-stone-200"
          >
            <h3 className="text-xl font-bold text-burgundy-900 mb-6 flex items-center gap-2">
              <Globe className="w-6 h-6" />
              Sumber Traffic Teratas
            </h3>
            <div className="space-y-4">
              {data?.topReferrers && data.topReferrers.length > 0 ? (
                data.topReferrers.map((ref, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-burgundy-100 rounded-full flex items-center justify-center">
                        <span className="text-burgundy-700 font-bold text-sm">{index + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-burgundy-900 truncate">
                          {ref.referrer === 'direct' ? 'Direct Traffic' : ref.referrer}
                        </p>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-burgundy-700">{ref.count}</span>
                  </div>
                ))
              ) : (
                <p className="text-stone-500 text-center py-8">Belum ada data referrer</p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Recent Views */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6 border border-stone-200"
        >
          <h3 className="text-xl font-bold text-burgundy-900 mb-6 flex items-center gap-2">
            <Eye className="w-6 h-6" />
            Aktivitas Terbaru
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-stone-700">Waktu</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-stone-700">Halaman</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-stone-700">Referrer</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-stone-700">IP</th>
                </tr>
              </thead>
              <tbody>
                {data?.recentViews && data.recentViews.length > 0 ? (
                  data.recentViews.map((view, index) => (
                    <tr key={index} className="border-b border-stone-100 hover:bg-stone-50">
                      <td className="py-3 px-4 text-sm text-stone-700">
                        {new Date(view.timestamp).toLocaleString('id-ID')}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-burgundy-900">
                        {view.page}
                      </td>
                      <td className="py-3 px-4 text-sm text-stone-600">
                        {view.referrer === 'direct' ? 'Direct' : view.referrer}
                      </td>
                      <td className="py-3 px-4 text-sm text-stone-600 font-mono">
                        {view.ip}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-stone-500">
                      Belum ada aktivitas
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
