"use client";

import { motion } from "framer-motion";
import { BookOpen, Heart, TrendingUp, Users, Gift, CheckCircle } from "lucide-react";

const chapters = [
  {
    icon: Heart,
    number: "01",
    title: "Fondasi Hubungan Intim yang Sehat",
    description: "Memahami psikologi intimasi dalam pernikahan dan pentingnya komunikasi terbuka antara pasangan",
    topics: ["Psikologi Intimasi", "Komunikasi Efektif", "Membangun Kepercayaan", "Mengatasi Hambatan Mental"]
  },
  {
    icon: TrendingUp,
    number: "02",
    title: "Teknik Meningkatkan Stamina",
    description: "Metode praktis dan aman untuk meningkatkan daya tahan dan performa dalam hubungan intim",
    topics: ["Latihan Fisik Khusus", "Teknik Pernapasan", "Pola Makan Pendukung", "Manajemen Energi"]
  },
  {
    icon: Users,
    number: "03",
    title: "Panduan Merangsang Pasangan",
    description: "Teknik dan pendekatan yang tepat untuk memberikan rangsangan optimal kepada pasangan",
    topics: ["Memahami Anatomi", "Zona Sensitif", "Teknik Foreplay", "Komunikasi Non-Verbal"]
  },
  {
    icon: Heart,
    number: "04",
    title: "Mencapai Kepuasan Bersama",
    description: "Strategi untuk mencapai klimaks yang memuaskan bagi kedua belah pihak secara bersamaan",
    topics: ["Sinkronisasi & Timing", "Variasi Posisi", "Teknik Lanjutan", "Mengatasi Hambatan"]
  }
];

const bonuses = [
  {
    icon: CheckCircle,
    title: "Checklist Komunikasi",
    description: "Template percakapan untuk membahas kebutuhan intim dengan pasangan"
  },
  {
    icon: Gift,
    title: "Worksheet Perencanaan",
    description: "Panduan praktis untuk merencanakan waktu berkualitas bersama pasangan"
  }
];

export default function SolutionSection() {
  return (
    <section id="isi-ebook" className="section-container bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-burgundy-100 text-burgundy-800 px-4 py-2 rounded-full mb-4">
            <BookOpen className="w-5 h-5" />
            <span className="font-semibold">Isi Panduan</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-burgundy-900 mb-4 font-playfair">
            Solusi Komprehensif dalam Satu Panduan Praktis
          </h2>
          
          <p className="text-lg text-stone-600 max-w-3xl mx-auto">
            Panduan lengkap yang dirancang sistematis untuk membantu Anda dan pasangan mencapai harmoni intim yang lebih baik
          </p>
        </motion.div>

        {/* Chapters */}
        <div className="space-y-6 mb-16">
          {chapters.map((chapter, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-elegant group"
            >
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-burgundy-600 to-burgundy-800 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                    <chapter.icon className="w-10 h-10 text-amber-400" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-sm font-bold text-burgundy-600 mb-1 block">
                        BAB {chapter.number}
                      </span>
                      <h3 className="text-2xl font-bold text-burgundy-900 mb-2">
                        {chapter.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-stone-600 mb-4 text-lg">
                    {chapter.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {chapter.topics.map((topic, topicIndex) => (
                      <span
                        key={topicIndex}
                        className="bg-burgundy-50 text-burgundy-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bonuses */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-amber-50 to-burgundy-50 rounded-3xl p-8 md:p-12 border-2 border-amber-200"
        >
          <div className="text-center mb-8">
            <Gift className="w-12 h-12 text-burgundy-700 mx-auto mb-4" />
            <h3 className="text-2xl md:text-3xl font-bold text-burgundy-900 mb-2">
              Bonus Eksklusif
            </h3>
            <p className="text-stone-700">
              Dapatkan material tambahan untuk mempermudah implementasi
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {bonuses.map((bonus, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <bonus.icon className="w-8 h-8 text-burgundy-600 mb-3" />
                <h4 className="text-xl font-bold text-burgundy-900 mb-2">
                  {bonus.title}
                </h4>
                <p className="text-stone-600">
                  {bonus.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
