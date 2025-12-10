import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ArrowRight } from "lucide-react";

export default function ServicesSection() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get("/api/public/services").then((res) => setServices(res.data));
  }, []);

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-dt-black">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-dt-blue mb-10 text-center">
          Our Services
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-dt hover:shadow-lg transition-all"
            >
              {service.image_path && (
                <img
                  src={`/storage/${service.image_path}`}
                  className="w-full h-40 object-cover rounded-md mb-4"
                  alt={service.name}
                />
              )}
              <h3 className="text-lg font-semibold text-dt-purple">
                {service.name}
              </h3>
              <p className="text-sm text-gray-500 mt-2">{service.summary}</p>
              <div className="mt-4 flex items-center gap-2 text-dt-blue cursor-pointer hover:gap-3 transition-all">
                <span>Learn More</span>
                <ArrowRight size={16} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
