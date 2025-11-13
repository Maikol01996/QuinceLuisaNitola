'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { galleryImages } from '@/lib/data';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

export function PhotoGallery() {
  const [mainImage, ...otherImages] = galleryImages;

  return (
    <section id="galeria" className="container mx-auto px-4">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="text-center"
      >
        <motion.h2
          variants={itemVariants}
          className="font-headline text-4xl md:text-5xl mb-4"
        >
          Nuestra Galería
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto"
        >
          Un vistazo a nuestros momentos especiales.
        </motion.p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
      >
        {mainImage && (
          <motion.div
            variants={itemVariants}
            className="col-span-2 row-span-2 rounded-lg overflow-hidden relative aspect-[4/5] md:aspect-square group"
          >
            <Image
              src={mainImage.src}
              alt={mainImage.alt}
              data-ai-hint={mainImage.hint}
              fill
              priority
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </motion.div>
        )}
        {otherImages.slice(0, 4).map((image, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="rounded-lg overflow-hidden relative aspect-square group"
          >
            <Image
              src={image.src}
              alt={image.alt}
              data-ai-hint={image.hint}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
