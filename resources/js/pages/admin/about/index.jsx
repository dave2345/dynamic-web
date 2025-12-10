import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 bg-gray-50 dark:bg-dt-black text-dt-black dark:text-white"
    >
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <img
            src="/images/about-image.jpg"
            alt="About Dave-Tech"
            className="w-full rounded-xl shadow-dt"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex-1"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-dt-blue">
            About Dave-Tech
          </h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Dave-Tech is a modern technology company delivering innovative
            solutions in web, desktop, mobile applications and cybersecurity.
          </p>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            Our mission is to empower businesses with secure, reliable, and
            scalable digital solutions tailored to their needs.
          </p>
          <a
            href="#contact"
            className="inline-block bg-dt-purple text-white px-6 py-3 rounded-xl hover:bg-dt-blue transition-all font-semibold"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
