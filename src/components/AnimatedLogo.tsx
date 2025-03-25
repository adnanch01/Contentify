
import { motion } from "framer-motion";

export const AnimatedLogo = () => {
  const pathVariants = {
    hidden: {
      opacity: 0,
      pathLength: 0,
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="flex items-center">
      <motion.svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary mr-2"
        initial="hidden"
        animate="visible"
      >
        <motion.path
          d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
        />
        <motion.path
          d="M12 12L12 21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
          transition={{ delay: 0.5, duration: 1 }}
        />
        <motion.path
          d="M4 7.5L12 12L20 7.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
          transition={{ delay: 1, duration: 1 }}
        />
      </motion.svg>
      <span className="font-medium text-lg">Contentify</span>
    </div>
  );
};
