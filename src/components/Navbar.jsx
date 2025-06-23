import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const menuLinks = [
  { label: 'Inicio', href: '#' },
  { label: 'Artistas', href: '#' },
  { label: 'Servicios', href: '#' },
  { label: 'Contacto', href: '#' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-black border-b border-gray-800 shadow">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6 relative">
        {/* Espacio para centrar el título */}
        <div className="w-16 sm:w-24" />
        {/* Título centrado */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="text-lg sm:text-2xl font-bold text-white select-none whitespace-nowrap">
            SGLAM STUDIOS
          </span>
        </div>
        {/* Botón hamburguesa */}
        <button
          className="ml-auto flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-gray-800 transition"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          <span className={`block w-7 h-1 rounded bg-white mb-1 transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-7 h-1 rounded bg-white mb-1 transition-all duration-300 ${open ? 'opacity-0' : ''}`}></span>
          <span className={`block w-7 h-1 rounded bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>
      {/* Menú lateral animado */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed top-0 left-0 w-full sm:w-64 h-screen bg-black border-r border-gray-800 shadow-2xl z-50 flex flex-col"
          >
            <button
              className="absolute top-4 right-4 text-white text-3xl font-bold"
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
            >
              ×
            </button>
            <nav className="flex-1 flex flex-col justify-center items-center gap-8">
              {menuLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="relative text-2xl sm:text-lg font-bold text-white overflow-hidden py-4 px-6 cursor-pointer transition-colors w-full text-center sm:hidden"
                  onClick={() => setOpen(false)}
                  style={{ zIndex: 2, backgroundColor: "#000" }}
                  initial={{ opacity: 0.3, backgroundColor: "#000" }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    backgroundColor: ["#000", "#ff00f7", "#000"]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                    delay: idx * 3
                  }}
                >
                  <span className="relative z-10">{link.label}</span>
                </motion.a>
              ))}
              {/* Bloque desktop como ya lo tienes */}
              {menuLinks.map((link) => (
                <motion.a
                  key={link.label + "-desktop"}
                  href={link.href}
                  className="relative hidden sm:block text-lg font-bold text-white overflow-hidden py-4 px-6 cursor-pointer transition-colors w-full text-center"
                  onClick={() => setOpen(false)}
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                >
                  <motion.span
                    variants={{
                      rest: { width: 0 },
                      hover: { width: "100%" }
                    }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="absolute left-0 top-0 h-full bg-neon-green"
                    style={{ zIndex: 1 }}
                  />
                  <motion.span
                    variants={{
                      rest: { color: "#fff" },
                      hover: { color: "#000" }
                    }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10"
                  >
                    {link.label}
                  </motion.span>
                </motion.a>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </nav>
  );
}