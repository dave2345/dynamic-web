import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/contact", form);
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-dt-black text-dt-black dark:text-white">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-10 text-center text-dt-blue"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Get in Touch
        </motion.h2>

        {success && (
          <motion.div
            className="mb-6 text-green-600 font-semibold text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Message sent successfully!
          </motion.div>
        )}

        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 focus:ring-2 focus:ring-dt-blue focus:outline-none"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 focus:ring-2 focus:ring-dt-blue focus:outline-none"
            required
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={5}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 focus:ring-2 focus:ring-dt-blue focus:outline-none"
            required
          />
          <button
            type="submit"
            className="bg-dt-blue text-white px-6 py-3 rounded-xl hover:bg-dt-purple transition-all font-semibold"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </section>
  );
}
