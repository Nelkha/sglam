import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

import artista1 from '../assets/img/artistas/artista1.png';
import artista2 from '../assets/img/artistas/artista2.png';
import artista3 from '../assets/img/artistas/artista3.png';
import artista4 from '../assets/img/artistas/artista4.jpg';

const artistasImgs = [artista1, artista2, artista3, artista4];

export default function Home() {
  const imageRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const adjustVideoHeight = () => {
      const isDesktop = window.innerWidth >= 768;
      if (imageRef.current && videoRef.current && isDesktop) {
        const imageHeight = imageRef.current.offsetHeight;
        if (imageHeight > 0) {
          videoRef.current.style.height = `${imageHeight}px`;
        }
      }
    };

    const img = imageRef.current;
    if (img && window.innerWidth >= 768) {
      if (img.complete) {
        setTimeout(adjustVideoHeight, 100);
      } else {
        img.onload = () => setTimeout(adjustVideoHeight, 100);
      }
    }

    window.addEventListener('resize', adjustVideoHeight);
    if (window.innerWidth >= 768) {
      setTimeout(adjustVideoHeight, 100);
    }

    return () => {
      window.removeEventListener('resize', adjustVideoHeight);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex-1 bg-black flex flex-col items-center relative overflow-hidden px-0 pt-0"
    >
      {/* Video ancho completo, relación 16:9 */}
      <section className="w-full mb-12">
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-gradient-to-br from-black to-gray-800 border-b-2 border-neon-green">
          <iframe
            src="https://www.youtube.com/embed/jjuZga0W5ps"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>
      </section>

      {/* Imagen breadcrumb ancho completo */}
      <div className="w-full max-w-5xl mb-12 px-4">
        <img
          src="/ruta/a/tu/breadcrumb.png"
          alt="Breadcrumb"
          className="w-full h-auto rounded-xl object-cover"
        />
      </div>

      {/* Cards de artistas destacados (más altas) */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16 px-4">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="bg-white/5 border border-neon-green rounded-2xl p-4 flex flex-col items-center shadow-lg h-[500px] justify-between relative overflow-hidden"
            initial={{ x: 0 }}
            animate={{
              x: [0, -0.5, 0.5, -0.5, 0.5, 0],
              transition: { repeat: Infinity, duration: 2.5, ease: "linear" }
            }}
            whileHover={{
              x: [0, -2, 2, -2, 2, 0],
              boxShadow: "0 0 16px 2px #39FF14",
              transition: { repeat: Infinity, duration: 0.7, ease: "linear" }
            }}
          >
            {/* Imagen de fondo que ocupa todo el card */}
            <img
              src={artistasImgs[i - 1]}
              alt={`Artista ${i}`}
              className="absolute inset-0 w-full h-full object-cover rounded-2xl z-0"
              style={{ objectPosition: "center" }}
            />
            {/* Overlay para oscurecer la imagen y resaltar el texto */}
            <div className="absolute inset-0 bg-black/40 rounded-2xl z-10"></div>
            {/* Pulse animado al hover */}
            <motion.span
              className="absolute inset-0 rounded-2xl pointer-events-none z-20"
              initial={{ opacity: 0 }}
              whileHover={{
                opacity: [0, 0.3, 0],
                boxShadow: [
                  "0 0 0px 0px #39FF14",
                  "0 0 16px 4px #39FF14",
                  "0 0 0px 0px #39FF14"
                ],
                transition: { duration: 1, repeat: Infinity }
              }}
            />
            {/* Contenido centrado */}
            <div className="w-full flex-1 flex flex-col justify-end items-center relative z-30">
              <h3 className="text-lg font-bold text-white mb-2 drop-shadow">Artista {i}</h3>
              <p className="text-sm text-gray-200 text-center drop-shadow">Descripción breve del artista destacado.</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contenedor verde neón con feed y lista, más alto */}
      <div className="w-full max-w-6xl bg-neon-green/10 border-2 border-neon-green rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-start mb-16 px-4">
        {/* Feed Instagram */}
        <div className="flex-1 bg-black/60 rounded-xl p-4 border border-neon-green flex flex-col">
          <h4 className="text-neon-green font-bold mb-4 text-xl">Instagram Feed</h4>
          <div className="w-full h-[500px] bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center text-gray-400">
            <iframe
              src="http://lightwidget.com/widgets/288f5d52a9d253ebb099cef314226756.html"
              scrolling="no"
              allowtransparency="true"
              className="w-full h-full border-0"
              style={{ minHeight: 500 }}
              title="Instagram Feed"
            ></iframe>
          </div>
        </div>
        {/* Lista Spotify */}
        <div className="flex-1 bg-black/60 rounded-xl p-4 border border-neon-green flex flex-col">
          <h4 className="text-neon-green font-bold mb-4 text-xl">Spotify Perfil</h4>
          <div className="w-full h-[500px] bg-gray-800 rounded-lg flex items-center justify-center text-gray-400">
            <iframe
              style={{ borderRadius: 12 }}
              src="https://open.spotify.com/embed/artist/2BE7SVoSVaH0oLqokeZArb?utm_source=generator"
              width="100%"
              height="500"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify Perfil"
            ></iframe>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
