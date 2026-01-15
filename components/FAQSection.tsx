"use client";

import { motion } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Apakah konten ini sesuai dengan nilai-nilai agama?",
    answer: "Ya, panduan ini disusun dengan mempertimbangkan nilai-nilai kesopanan dan fokus pada hubungan dalam pernikahan yang sah. Kami menggunakan pendekatan yang edukatif dan tidak vulgar, sesuai dengan norma yang berlaku."
  },
  {
    question: "Apakah aman untuk pemula yang baru menikah?",
    answer: "Sangat aman! Panduan ini dimulai dari dasar dan dijelaskan secara bertahap. Cocok untuk pasangan yang baru menikah maupun yang sudah lama menikah dan ingin meningkatkan kualitas hubungan intim mereka."
  },
  {
    question: "Bagaimana cara mendapatkan ebook setelah membeli?",
    answer: "Setelah pembayaran berhasil, Anda akan langsung mendapatkan link download ebook dalam format PDF via email. Prosesnya otomatis dan instan, sehingga Anda bisa langsung membaca panduan."
  },
  {
    question: "Apakah privasi saya terjaga?",
    answer: "100% privasi Anda terjaga. Tidak ada label sensitif dalam transaksi dan semua data Anda dienkripsi dengan aman. Kami sangat menghargai privasi pelanggan kami."
  },
  {
    question: "Apakah ada garansi jika tidak puas?",
    answer: "Ya, kami memberikan garansi 30 hari uang kembali 100%. Jika Anda merasa panduan ini tidak membantu, cukup hubungi kami dan kami akan mengembalikan uang Anda tanpa pertanyaan."
  },
  {
    question: "Berapa lama waktu yang dibutuhkan untuk melihat hasil?",
    answer: "Setiap pasangan berbeda, namun kebanyakan melaporkan perubahan positif dalam 1-2 minggu setelah mulai menerapkan teknik-teknik dalam panduan. Kuncinya adalah konsistensi dan komunikasi terbuka dengan pasangan."
  },
  {
    question: "Apakah panduan ini berbentuk video atau teks?",
    answer: "Panduan ini berbentuk ebook PDF dengan teks dan ilustrasi yang mudah dipahami. Format ini memudahkan Anda untuk membaca di mana saja dan kapan saja, di perangkat apa pun."
  },
  {
    question: "Apakah ada customer support jika saya punya pertanyaan?",
    answer: "Tentu! Kami memiliki tim customer support yang siap membantu Anda jika ada pertanyaan seputar produk atau teknis. Anda bisa menghubungi kami melalui email yang tercantum setelah pembelian."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-container bg-stone-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-burgundy-100 text-burgundy-800 px-4 py-2 rounded-full mb-4">
            <HelpCircle className="w-5 h-5" />
            <span className="font-semibold">FAQ</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-burgundy-900 mb-4 font-playfair">
            Pertanyaan yang Sering Diajukan
          </h2>
          
          <p className="text-lg text-stone-600">
            Temukan jawaban untuk pertanyaan umum seputar panduan kami
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-md border border-stone-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-stone-50 transition-colors"
              >
                <span className="text-lg font-semibold text-burgundy-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-burgundy-600 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 text-stone-700 leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-burgundy-50 to-amber-50 rounded-2xl p-8 text-center border border-burgundy-200"
        >
          <h3 className="text-2xl font-bold text-burgundy-900 mb-3">
            Masih Ada Pertanyaan?
          </h3>
          <p className="text-stone-700 mb-6">
            Tim kami siap membantu Anda. Hubungi kami kapan saja!
          </p>
          <a
            href="#pesan"
            className="inline-flex items-center justify-center bg-burgundy-700 hover:bg-burgundy-800 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Dapatkan Panduan Sekarang
          </a>
        </motion.div>
      </div>
    </section>
  );
}
