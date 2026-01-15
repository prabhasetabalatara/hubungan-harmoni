"use client";

import { motion } from "framer-motion";
import { Heart, Star, Shield, Award } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-burgundy-900 via-burgundy-800 to-burgundy-900 text-white">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-burgundy-500 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20"
            >
              <Shield className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium">100% Privasi Terjamin</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-playfair"
            >
              Rahasia <span className="text-amber-400">Harmoni Intim</span> yang Jarang Dibicarakan
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl mb-8 text-stone-200 leading-relaxed"
            >
              Panduan Lengkap untuk Pasangan Suami Istri - Tingkatkan Kualitas Hubungan Intim dengan Teknik Praktis dan Berbasis Riset
            </motion.p>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-6 mb-8"
            >
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span className="text-sm">5000+ Pasangan Terbantu</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400" />
                <span className="text-sm">Rating 4.9/5.0</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-amber-400" />
                <span className="text-sm">Disusun oleh Ahli</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#pesan"
                className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-burgundy-900 font-bold py-4 px-8 rounded-full shadow-2xl hover:shadow-amber-500/50 transform hover:scale-105 transition-all duration-300 text-lg"
              >
                Dapatkan Panduan Sekarang
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              
              <a
                href="#isi-ebook"
                className="inline-flex items-center justify-center bg-white/10 backdrop-blur-md hover:bg-white/20 border-2 border-white/30 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300"
              >
                Lihat Isi Panduan
              </a>
            </motion.div>

            {/* Price highlight */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6 flex items-center gap-3"
            >
              <span className="text-stone-300 line-through text-lg">Rp 197.000</span>
              <span className="text-3xl font-bold text-amber-400">Rp 97.000</span>
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                HEMAT 50%
              </span>
            </motion.div>
          </motion.div>

          {/* Right Content - Decorative Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Decorative circles */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-10 -right-10 w-72 h-72 border-2 border-amber-400/30 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-10 -left-10 w-64 h-64 border-2 border-white/20 rounded-full"
              />
              
              {/* Central illustration placeholder */}
              <div className="relative z-10 bg-gradient-to-br from-amber-400/20 to-burgundy-600/20 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl">
                <div className="flex flex-col items-center justify-center space-y-8">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-32 h-32 bg-amber-400/30 rounded-full flex items-center justify-center"
                  >
                    <Heart className="w-16 h-16 text-amber-400" />
                  </motion.div>
                  
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">80+ Halaman</h3>
                    <p className="text-stone-300">Panduan Lengkap & Praktis</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold text-amber-400">4</div>
                      <div className="text-sm text-stone-300">Bab Utama</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center">
                      <div className="text-3xl font-bold text-amber-400">2</div>
                      <div className="text-sm text-stone-300">Bonus</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="rgb(250, 250, 249)"
          />
        </svg>
      </div>
    </section>
  );
}
