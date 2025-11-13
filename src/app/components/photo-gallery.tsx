'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { galleryImages } from '@/lib/data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function PhotoGallery() {
  const [mainImage, ...collageImages] = galleryImages;

  // Define positions for collage images. These can be adjusted.
  const imagePositions = [
    { top: '5%', left: '5%', width: '30%', rotate: -8 },
    { top: '10%', right: '8%', width: '35%', rotate: 5 },
    { bottom: '15%', left: '10%', width: '28%', rotate: 10 },
    { bottom: '8%', right: '5%', width: '32%', rotate: -5 },
    { top: '40%', left: '35%', width: '30%', rotate: 2 },
  ];

  return (
    <section id="galeria" className="container mx-auto px-4 py-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="text-center"
      >
        <motion.h2
          variants={textVariants}
          className="font-headline text-4xl md:text-5xl mb-4"
        >
          Nuestra Galería
        </motion.h2>
        <motion.p
          variants={textVariants}
          className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto"
        >
          Un collage de nuestros momentos más preciados.
        </motion.p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative max-w-4xl mx-auto aspect-[4/3] md:aspect-video"
      >
        {/* Main Background Image */}
        {mainImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl"
          >
            <Image
              src={mainImage.src}
              alt={mainImage.alt}
              data-ai-hint={mainImage.hint}
              fill
              priority
              className="object-cover"
            />
             <div className="absolute inset-0 bg-black/10"></div>
          </motion.div>
        )}

        {/* Overlayed Collage Images */}
        {collageImages.slice(0, 5).map((image, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="absolute rounded-md overflow-hidden border-4 border-white shadow-lg"
            style={{
              top: imagePositions[index % imagePositions.length].top,
              left: imagePositions[index % imagePositions.length].left,
              right: imagePositions[index % imagePositions.length].right,
              bottom: imagePositions[index % imagePositions.length].bottom,
              width: imagePositions[index % imagePositions.length].width,
              transform: `rotate(${imagePositions[index % imagePositions.length].rotate}deg)`,
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              data-ai-hint={image.hint}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 30vw, 20vw"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
