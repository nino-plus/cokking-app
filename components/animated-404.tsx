'use client';
import { motion } from 'framer-motion';

export default function Animated404() {
  return (
    <div>
      <motion.div
        className="mb-6"
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
      >
        <h1 className="text-6xl font-bold text-zinc-700 dark:text-zinc-200">
          404
        </h1>
      </motion.div>
    </div>
  );
}
