"use client";

import { motion } from "framer-motion";
import { CheckCircle, Shield, Download, RefreshCw, Gift } from "lucide-react";
import { useEffect } from "react";

const features = [
  "Ebook PDF 80+ halaman dengan panduan lengkap",
  "4 Bab utama yang komprehensif",
  "Bonus checklist & worksheet praktis",
  "Update gratis selamanya",
  "Akses langsung setelah pembayaran",
  "Garansi 30 hari uang kembali 100%",
];

export default function PricingSection() {
  useEffect(() => {
    // Script for Scalev iframe
    const iframe = document.getElementById('myiframe') as HTMLIFrameElement;
    
    if (!iframe) return;

    function resizeIframe(height: number) {
      iframe.style.height = height + 'px';
    }

    function isUrl(string: string) {
      try {
        new URL(string);
        return true;
      } catch (_) {
        return false;
      }
    }

    function isJSONObject(string: string) {
      try {
        const parsed = JSON.parse(string);
        return typeof parsed === 'object' && parsed !== null;
      } catch (e) {
        return false;
      }
    }

    function isIframeSameOrigin() {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        return !!doc;
      } catch (e) {
        return false;
      }
    }

    const messageHandler = (e: MessageEvent) => {
      if (e.origin === 'https://prhatara.myscalev.com') {
        if (isUrl(e.data)) {
          window.location.href = e.data;
        }
        if (isJSONObject(e.data) && !isIframeSameOrigin()) {
          const message = JSON.parse(e.data);
          if (message.type === 'resize') {
            resizeIframe(message.height);
          }
        }
      }
    };

    window.addEventListener('message', messageHandler, false);

    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          iframe.src = iframe.src;
          observer.disconnect();
        }
      });
    });

    observer.observe(iframe);

    return () => {
      window.removeEventListener('message', messageHandler);
      observer.disconnect();
    };
  }, []);

  return (
    <section id="pesan" className="section-container bg-gradient-to-br from-burgundy-900 via-burgundy-800 to-burgundy-900 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-96 h-96 bg-amber-400 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-burgundy-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
            Investasi Kecil untuk Keharmonisan Jangka Panjang
          </h2>
          
          <p className="text-xl text-stone-200">
            Dapatkan panduan lengkap dengan harga spesial hari ini
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left side - Package details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Price Box */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-stone-300 line-through text-xl mb-1">Rp 197.000</p>
                  <p className="text-5xl font-bold text-amber-400">Rp 97.000</p>
                </div>
                <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold">
                  HEMAT 50%
                </div>
              </div>
              
              <div className="bg-amber-400/20 border border-amber-400/30 rounded-xl p-4 mb-6">
                <p className="text-amber-300 font-semibold text-center">
                  ⚡ Harga spesial terbatas untuk 100 pembeli pertama
                </p>
              </div>

              {/* Features */}
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span className="text-stone-200">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 flex items-center gap-3">
                <Shield className="w-8 h-8 text-amber-400" />
                <div>
                  <p className="font-semibold text-sm">Pembayaran Aman</p>
                  <p className="text-xs text-stone-300">Data Terenkripsi</p>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 flex items-center gap-3">
                <Download className="w-8 h-8 text-amber-400" />
                <div>
                  <p className="font-semibold text-sm">Akses Instan</p>
                  <p className="text-xs text-stone-300">Download Langsung</p>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 flex items-center gap-3">
                <RefreshCw className="w-8 h-8 text-amber-400" />
                <div>
                  <p className="font-semibold text-sm">Garansi 30 Hari</p>
                  <p className="text-xs text-stone-300">Uang Kembali 100%</p>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 flex items-center gap-3">
                <Gift className="w-8 h-8 text-amber-400" />
                <div>
                  <p className="font-semibold text-sm">Bonus Gratis</p>
                  <p className="text-xs text-stone-300">Checklist & Template</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Payment form (Scalev embed) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-2 shadow-2xl"
          >
            <iframe
              id="myiframe"
              width="100%"
              frameBorder="0"
              src="https://prhatara.myscalev.com/hubungan-harmonis"
              className="rounded-2xl min-h-[600px]"
              title="Form Pemesanan"
            />
          </motion.div>
        </div>

        {/* Additional guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center"
        >
          <Shield className="w-12 h-12 text-amber-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Garansi Kepuasan 100%</h3>
          <p className="text-stone-200 text-lg">
            Jika dalam 30 hari Anda merasa panduan ini tidak membantu, kami akan mengembalikan uang Anda secara penuh. Tanpa pertanyaan.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
