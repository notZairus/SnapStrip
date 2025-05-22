import { motion } from "motion/react";

function OpenAnimation() {
  return (
    <motion.div 
      className="absolute left-0 top-0 w-full h-full flex items-center justify-center" 
      initial={{backgroundColor: "#000000"}}
      exit={{backgroundColor: "#FFFFFF"}}
    >
      <motion.div 
        className="text-white flex text-5xl font-semibold"
        initial={{
          opacity: 0,
          y: 300
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        exit={{
          opacity: 0,
          y: -300
        }}
        transition={{
          duration: 2,
          type: "spring"
        }}
      >
        <p>
          Snap
        </p>
        <p>
          Strip
        </p>
      </motion.div>
    </motion.div>
  )
}

export default OpenAnimation
