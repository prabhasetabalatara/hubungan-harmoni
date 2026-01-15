"use client";

import { motion } from "framer-motion";
import { X, AlertCircle } from "lucide-react";

const problems = [
  "Merasa hubungan intim kurang memuaskan untuk salah satu atau kedua belah pihak",
  "Kesulitan menjaga stamina dan durasi yang cukup",
  "Bingung cara merangsang pasangan dengan tepat",
  "Komunikasi tentang kebutuhan intim masih terasa canggung",
  "Ingin menambah variasi namun tidak tahu caranya",
];

export default function ProblemSection() {
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
          <div className="inline-flex items-center gap-2 bg-red-100 text-burgundy-800 px-4 py-2 rounded-full mb-4">
            <AlertCircle className="w-5 h-5" />
            <span className="font-semibold">Masalah Umum</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-burgundy-900 mb-4 font-playfair">
            Apakah Anda Mengalami Hal Ini?
          </h2>
          
          <p className="text-lg text-stone-600">
            Banyak pasangan menghadapi tantangan serupa dalam hubungan intim mereka
          </p>
        </motion.div>

        <div className="space-y-4">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-elegant flex items-start gap-4 hover:border-burgundy-200"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mt-1">
                <X className="w-5 h-5 text-red-600" />
              </div>
              <p className="text-lg text-stone-700 flex-1">{problem}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-burgundy-50 to-amber-50 rounded-2xl p-8 border border-burgundy-200">
            <p className="text-xl md:text-2xl font-semibold text-burgundy-900 mb-2">
              Anda tidak sendirian.
            </p>
            <p className="text-stone-700">
              Ribuan pasangan mengalami hal yang sama dan telah menemukan solusinya
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
