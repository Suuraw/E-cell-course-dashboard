import { motion } from 'framer-motion';

interface AnimatedAlertProps {
  message: string;
  type: 'success' | 'error';
}

export function AnimatedAlert({ message, type }: AnimatedAlertProps) {
  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className={`${bgColor} text-white p-4 rounded-md shadow-lg absolute top-4 right-4 z-50`}
    >
      {message}
    </motion.div>
  );
}

