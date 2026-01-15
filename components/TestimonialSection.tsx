"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "R*** & S***",
    location: "Jakarta",
    rating: 5,
    text: "Panduan ini benar-benar mengubah dinamika hubungan kami. Komunikasi menjadi lebih terbuka dan kami bisa saling memahami kebutuhan masing-masing. Sangat bermanfaat!",
    date: "2 minggu lalu"
  },
  {
    name: "A*** & D***",
    location: "Surabaya",
    rating: 5,
    text: "Setelah 3 tahun menikah, kami merasa hubungan intim mulai monoton. Ebook ini memberikan perspektif baru dan teknik-teknik praktis yang langsung bisa diterapkan. Hasilnya luar biasa!",
    date: "1 bulan lalu"
  },
  {
    name: "M*** & F***",
    location: "Bandung",
    rating: 5,
    text: "Awalnya ragu untuk membeli, tapi ternyata investasi terbaik untuk hubungan kami. Penjelasannya detail namun tidak vulgar. Sangat profesional dan membantu.",
    date: "3 minggu lalu"
  },
  {
    name: "Y*** & L***",
    location: "Yogyakarta",
    rating: 5,
    text: "Kami sempat mengalami masalah dalam hal stamina dan durasi. Setelah mengikuti panduan di ebook ini, ada peningkatan signifikan. Pasangan juga lebih puas. Terima kasih!",
    date: "1 minggu lalu"
  },
  {
    name: "B*** & N***",
    location: "Medan",
    rating: 5,
    text: "Yang paling kami suka adalah bagian tentang komunikasi. Kami jadi tahu cara berbicara tentang kebutuhan intim tanpa merasa canggung. Hubungan jadi lebih harmonis.",
    date: "2 minggu lalu"
  },
  {
    name: "H*** & K***",
    location: "Semarang",
    rating: 5,
    text: "Panduan yang sangat lengkap dan aplikatif. Bonus checklist dan worksheet-nya juga sangat membantu. Worth every penny!",
    date: "1 bulan lalu"
  }
];

export default function TestimonialSection() {
  return (
    <section className="section-container bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-amber-100 text-burgundy-800 px-4 py-2 rounded-full mb-4">
            <Star className="w-5 h-5 fill-current" />
            <span className="font-semibold">Rating 4.9/5.0</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-burgundy-900 mb-4 font-playfair">
            Apa Kata Mereka yang Sudah Membaca?
          </h2>
          
          <p className="text-lg text-stone-600 max-w-3xl mx-auto">
            Ribuan pasangan telah merasakan manfaat dari panduan ini
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-elegant group hover:border-burgundy-200"
            >
              <div className="flex flex-col h-full">
                {/* Quote icon */}
                <Quote className="w-8 h-8 text-burgundy-200 mb-4" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-500 fill-current" />
                  ))}
                </div>
                
                {/* Text */}
                <p className="text-stone-700 mb-6 flex-1 leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                {/* Author */}
                <div className="border-t border-stone-200 pt-4">
                  <p className="font-bold text-burgundy-900">{testimonial.name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-stone-600">{testimonial.location}</p>
                    <p className="text-xs text-stone-500">{testimonial.date}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-burgundy-50 to-amber-50 rounded-2xl p-8 border border-burgundy-200"
        >
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-burgundy-900 mb-2">5000+</div>
              <div className="text-stone-700">Pasangan Terbantu</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-burgundy-900 mb-2">4.9/5.0</div>
              <div className="text-stone-700">Rating Kepuasan</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-burgundy-900 mb-2">98%</div>
              <div className="text-stone-700">Merekomendasikan</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
