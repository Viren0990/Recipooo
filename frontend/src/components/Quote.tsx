import { motion } from "framer-motion"

export const Quote = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
        >
          Make everyday cooking fun!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl text-white md:text-2xl lg:text-3xl"
        >
          Learn new recipes and share your recipe with people around the world today!
        </motion.p>
        
      </motion.div>
    </div>
  )
}