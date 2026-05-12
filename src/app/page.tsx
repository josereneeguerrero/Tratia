"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

const workflow = [
  {
    icon: "📱",
    title: "Conecta tu WhatsApp",
    description: "Escanea el código QR y vincula tu número de negocio al instante. Sin complicaciones, sin cambiar tu número.",
  },
  {
    icon: "⚙️",
    title: "Configura tus servicios",
    description: "Define precios, duración de servicios y horarios de tu equipo en minutos.",
  },
  {
    icon: "✨",
    title: "Recibe citas 24/7",
    description: "Tus clientes agendas solos desde WhatsApp, incluso mientras duermes.",
  },
];

const features = [
  {
    title: "CRM Centralizado",
    desc: "Todos tus clientes y chats en un solo lugar. Sin perder información.",
    icon: "💬",
  },
  {
    title: "Agenda Automática",
    desc: "Tus clientes se agendas sin interacción humana, 24/7.",
    icon: "📅",
  },
  {
    title: "Recordatorios Inteligentes",
    desc: "Reduce no-shows con recordatorios automáticos vía WhatsApp.",
    icon: "🔔",
  },
  {
    title: "Reportes en Tiempo Real",
    desc: "Conoce tus ingresos, ocupación y tendencias de tu salón.",
    icon: "📊",
  },
];

const testimonials = [
  {
    name: "María García",
    salon: "Salon María's Beauty",
    quote: "Pasé de perder clientes a estar completamente lleno. Tratia cambió mi negocio.",
    image: "👩‍🦰",
  },
  {
    name: "Juan López",
    salon: "Barbershop Juan",
    quote: "Mis clientes aman la comodidad. Ahorro horas administrando citas.",
    image: "👨‍💼",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const floatingVariants = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 3, repeat: Infinity, repeatType: "loop" as const },
  },
};

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-[#fdfcfb]/80 backdrop-blur-md border-b border-[#dbc2b0]/20">
        <nav className="max-w-[1280px] mx-auto px-6 md:px-10 py-4 flex justify-between items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-3xl font-bold text-[#8d4b00] tracking-tight">Tratia</p>
          </motion.div>
          <div className="hidden md:flex items-center gap-8 text-[15px] text-[#554336]">
            {["Funciones", "Precios", "FAQ"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-[#8d4b00] transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/login" className="btn-primary px-6 py-2.5 shadow-[0_4px_20px_-2px_rgba(141,75,0,0.1)]">
              Empezar prueba
            </Link>
          </motion.div>
        </nav>
      </header>

      <main className="pt-24">
        <section className="max-w-[1280px] mx-auto px-6 md:px-10 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
                <p className="text-[#8d4b00] font-bold uppercase text-sm tracking-widest mb-4">Para salones en LATAM</p>
              </motion.div>
              <h1 className="text-5xl md:text-6xl leading-[1.08] tracking-[-0.02em] mb-6 font-bold">
                No pierdas clientes de WhatsApp:{" "}
                <span className="bg-gradient-to-r from-[#8d4b00] to-[#b15f00] bg-clip-text text-transparent">agenda más citas</span>{" "}
                y cobra más rápido.
              </h1>
              <p className="text-[18px] leading-[1.6] text-[#554336] mb-10 max-w-xl">
                La herramienta simple y potente diseñada para equipos de salones. Centraliza tus chats, automatiza tu agenda y crece sin límites.
              </p>
              <motion.div className="flex flex-wrap gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
                <Link href="/login" className="btn-primary px-8 py-4 shadow-[0_10px_30px_-5px_rgba(141,75,0,0.2)]">
                  Empezar prueba gratis
                </Link>
                <a href="#funciones" className="btn-secondary px-8 py-4">
                  Ver funciones
                </a>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="relative">
              <motion.div variants={floatingVariants} animate="animate" className="relative">
                <div className="bg-white p-4 rounded-[28px] border border-[#dbc2b0]/30 shadow-[0_20px_40px_-10px_rgba(85,67,54,0.1)]">
                  <div className="relative h-[500px] bg-gradient-to-br from-[#ffdcc3] to-[#ffe8d6] rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold opacity-10">
                      📱
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="absolute -bottom-6 -left-6 bg-gradient-to-br from-[#8d4b00] to-[#6e3900] text-white p-6 rounded-2xl shadow-xl max-w-[240px]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-lg">
                    ●
                  </motion.span>
                  <span className="font-bold text-sm">Nueva Cita</span>
                </div>
                <p className="text-sm opacity-90">Balayage + Corte agendado automáticamente vía WhatsApp.</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <motion.section
          className="bg-gradient-to-r from-[#8d4b00] to-[#b15f00] py-16 px-6 md:px-10 text-white"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-[1280px] mx-auto grid md:grid-cols-3 gap-8 text-center">
            {[
              { stat: "150+", label: "Salones" },
              { stat: "10k+", label: "Citas Agendadas" },
              { stat: "+30%", label: "Aumento de Ingresos" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <p className="text-5xl font-bold mb-2">{item.stat}</p>
                <p className="text-white/80 text-sm tracking-widest uppercase">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <section id="funciones" className="max-w-[1280px] mx-auto px-6 md:px-10 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Todo lo que necesitas para profesionalizar</h2>
            <p className="text-[#554336] text-lg max-w-2xl mx-auto">
              Funcionalidades diseñadas específicamente para salones que quieren crecer sin complicaciones.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-white p-10 rounded-[2rem] border border-[#dbc2b0]/30 shadow-[0_4px_20px_-2px_rgba(141,75,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(141,75,0,0.15)] transition-shadow duration-300"
              >
                <div className="text-5xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-[#554336] leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="py-24 px-6 md:px-10 bg-[#f3f3f3]">
          <div className="max-w-[1280px] mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Empieza en 3 pasos simples</h2>
              <p className="text-[#554336]">Todo lo que necesitas en menos de 10 minutos.</p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-3 gap-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {workflow.map((step, i) => (
                <motion.article key={i} variants={itemVariants} className="text-center">
                  <motion.div
                    className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-white grid place-items-center shadow-[0_4px_20px_-2px_rgba(141,75,0,0.1)]"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <span className="text-5xl">{step.icon}</span>
                  </motion.div>
                  <h4 className="text-2xl font-bold mb-3">{step.title}</h4>
                  <p className="text-[#554336] px-4">{step.description}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-24 px-6 md:px-10">
          <div className="max-w-[1280px] mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold">Lo que dicen nuestros salones</h2>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="bg-white p-10 rounded-[2rem] border border-[#dbc2b0]/30 shadow-[0_4px_20px_-2px_rgba(141,75,0,0.05)]"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-5xl">{testimonial.image}</div>
                    <div>
                      <p className="font-bold text-lg">{testimonial.name}</p>
                      <p className="text-sm text-[#554336]">{testimonial.salon}</p>
                    </div>
                  </div>
                  <p className="text-lg italic text-[#554336]">"{testimonial.quote}"</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="precios" className="py-24 px-6 md:px-10 bg-[#f3f3f3]">
          <div className="max-w-[1280px] mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Un plan simple para crecer</h2>
              <p className="text-[#554336]">Sin letras pequeñas. Solo lo que necesitas.</p>
            </motion.div>

            <motion.div
              className="max-w-lg mx-auto bg-white rounded-[2.5rem] p-12 border-2 border-[#8d4b00] text-center shadow-[0_20px_40px_-10px_rgba(141,75,0,0.15)]"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-sm uppercase tracking-widest text-[#8d4b00] font-bold mb-2">Más popular</p>
              <h3 className="text-4xl font-bold mb-4">Plan Pro</h3>
              <div className="flex items-center justify-center gap-1 mb-10">
                <span className="text-2xl text-[#554336]">USD</span>
                <span className="text-7xl font-bold">29</span>
                <span className="text-[#554336]">/mes</span>
              </div>
              <ul className="text-left space-y-4 mb-12">
                {[
                  "WhatsApp CRM Multi-agente",
                  "Agenda Online Personalizada",
                  "Recordatorios automáticos ilimitados",
                  "Reportes de ingresos y ocupación",
                  "Soporte por WhatsApp",
                ].map((item) => (
                  <motion.li key={item} className="flex items-center gap-3" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                    <span className="text-[#8d4b00] font-bold">✓</span>
                    <span className="text-[#1a1c1c]">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <Link href="/login" className="btn-primary w-full py-4 mb-6 text-lg">
                Empezar prueba gratis
              </Link>
              <p className="text-sm text-[#554336] italic">14 días gratis. Sin tarjeta requerida.</p>
            </motion.div>
          </div>
        </section>

        <section id="faq" className="py-24 px-6 md:px-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold">Preguntas frecuentes</h2>
          </motion.div>

          <motion.div className="space-y-4" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {[
              {
                q: "¿Cómo funciona la integración con WhatsApp?",
                a: "Escaneas un código QR similar a WhatsApp Web. Es como iniciar sesión en tu navegador, pero en Tratia. Tu número actual sigue siendo el mismo.",
              },
              {
                q: "¿Cuánto tiempo toma la configuración inicial?",
                a: "La mayoría de salones está operando en menos de 15 minutos. Es realmente simple: escanea el QR, configura tus servicios, listo.",
              },
              {
                q: "¿Puedo usar Tratia en múltiples dispositivos?",
                a: "Sí, tu cuenta funciona en cualquier dispositivo. Tus datos siempre están sincronizados.",
              },
            ].map((faq, i) => (
              <motion.details
                key={i}
                variants={itemVariants}
                className="bg-white rounded-2xl border border-[#dbc2b0]/30 shadow-[0_4px_20px_-2px_rgba(141,75,0,0.05)] overflow-hidden"
                open={openFaq === i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <summary className="flex justify-between items-center p-6 cursor-pointer font-bold list-none text-lg hover:bg-[#f3f3f3] transition-colors">
                  {faq.q}
                  <motion.span animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    ▾
                  </motion.span>
                </summary>
                <motion.div
                  className="px-6 pb-6 text-[#554336] border-t border-[#dbc2b0]/30"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.a}
                </motion.div>
              </motion.details>
            ))}
          </motion.div>
        </section>

        <footer className="bg-[#1a1c1c] text-white py-16 px-6 md:px-10">
          <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <p className="text-2xl font-bold mb-3">Tratia</p>
              <p className="text-sm text-white/60">Elevando el estándar de belleza y bienestar en LATAM.</p>
            </div>
            {[
              { title: "Producto", links: ["Funciones", "Precios", "Integración"] },
              { title: "Soporte", links: ["WhatsApp", "FAQs", "Email"] },
              { title: "Legal", links: ["Términos", "Privacidad", "Cookies"] },
            ].map((col, i) => (
              <div key={i} className="space-y-3">
                <p className="font-bold text-white">{col.title}</p>
                {col.links.map((link) => (
                  <p key={link} className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer">
                    {link}
                  </p>
                ))}
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm text-white/60">
            <p>© 2024 Tratia. Todos los derechos reservados.</p>
          </div>
        </footer>
      </main>
    </>
  );
}
