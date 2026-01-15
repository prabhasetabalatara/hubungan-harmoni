"use client";

import { motion } from "framer-motion";
import { CheckCircle, Heart, MessageCircle, BookOpen, Shield, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "Meningkatkan Kepercayaan Diri",
    description: "Rasakan peningkatan signifikan dalam kepercayaan diri saat berhubungan intim dengan pasangan"
  },
  {
    icon: Heart,
    title: "Hubungan Lebih Harmonis",
    description: "Pernikahan yang lebih bahagia dan penuh kasih sayang melalui intimasi yang berkualitas"
  },
  {
    icon: MessageCircle,
    title: "Komunikasi Lebih Terbuka",
    description: "Belajar cara berkomunikasi tentang kebutuhan intim tanpa rasa canggung"
  },
  {
    icon: BookOpen,
    title: "Teknik Praktis & Aplikatif",
    description: "Panduan yang langsung bisa diterapkan dengan hasil yang terukur"
  },
  {
    icon: Shield,
    title: "Berbasis Riset Terpercaya",
    description: "Disusun berdasarkan penelitian ilmiah dan pengalaman profesional"
  },
  {
    icon: CheckCircle,
    title: "Solusi Komprehensif",
    description: "Mencakup semua aspek dari mental, fisik, hingga teknik praktis"
  }
];

export default function BenefitSection() {
  return (
    <section className="section-container bg-gradient-to-br from-burgundy-50 via-stone-50 to-amber-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-burgundy-900 mb-4 font-playfair">
            Manfaat yang Akan Anda Rasakan
          </h2>
          
          <p className="text-lg text-stone-600 max-w-3xl mx-auto">
            Transformasi nyata dalam hubungan intim Anda dengan pasangan
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-elegant group hover:border-burgundy-300"
            >
              <div className="flex flex-col h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-burgundy-600 to-burgundy-800 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <benefit.icon className="w-7 h-7 text-amber-400" />
                </div>
                
                <h3 className="text-xl font-bold text-burgundy-900 mb-3">
                  {benefit.title}
                </h3>
                
                <p className="text-stone-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA in Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-burgundy-100">
            <h3 className="text-2xl md:text-3xl font-bold text-burgundy-900 mb-4">
              Siap Merasakan Perubahan Positif?
            </h3>
            <p className="text-lg text-stone-600 mb-8">
              Bergabunglah dengan ribuan pasangan yang telah meningkatkan kualitas hubungan intim mereka
            </p>
            <a
              href="#pesan"
              className="inline-flex items-center justify-center bg-gradient-to-r from-burgundy-700 to-burgundy-600 hover:from-burgundy-800 hover:to-burgundy-700 text-white font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg"
            >
              Mulai Perjalanan Anda
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
