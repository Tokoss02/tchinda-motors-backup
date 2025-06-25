import { motion } from "framer-motion";

const MarqueeText = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap bg-gray-900 text-white py-3">
      <motion.div
        className="text-lg font-bold px-5"
        animate={{ x: ["-100%", "100%"] }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "linear",
        }}
      >
         Exclusive Summer Car Deals – Over 800+ Cars Available! 🌟
      </motion.div>
    </div>
  );
};

export default MarqueeText;
