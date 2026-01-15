"use client";

import { Heart, Shield, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-burgundy-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-8 h-8 text-amber-400" />
              <span className="text-2xl font-bold">Harmoni Intim</span>
            </div>
            <p className="text-stone-300 leading-relaxed">
              Panduan terpercaya untuk meningkatkan kualitas hubungan intim dalam pernikahan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Menu Cepat</h3>
            <ul className="space-y-2">
              <li>
                <a href="#isi-ebook" className="text-stone-300 hover:text-amber-400 transition-colors">
                  Isi Panduan
                </a>
              </li>
              <li>
                <a href="#pesan" className="text-stone-300 hover:text-amber-400 transition-colors">
                  Pesan Sekarang
                </a>
              </li>
              <li>
                <a href="/admin" className="text-stone-300 hover:text-amber-400 transition-colors">
                  Dashboard Admin
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Trust */}
          <div>
            <h3 className="text-lg font-bold mb-4">Informasi</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Mail className="w-5 h-5 text-amber-400 mt-0.5" />
                <div>
                  <p className="font-semibold">Email Support</p>
                  <p className="text-stone-300 text-sm">support@harmoniintim.com</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="w-5 h-5 text-amber-400 mt-0.5" />
                <div>
                  <p className="font-semibold">Privasi Terjamin</p>
                  <p className="text-stone-300 text-sm">Data Anda 100% aman</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-burgundy-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-stone-400 text-sm">
              © {currentYear} Harmoni Intim. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-stone-400 hover:text-amber-400 transition-colors">
                Kebijakan Privasi
              </a>
              <a href="#" className="text-stone-400 hover:text-amber-400 transition-colors">
                Syarat & Ketentuan
              </a>
              <a href="#" className="text-stone-400 hover:text-amber-400 transition-colors">
                Pengembalian Dana
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
