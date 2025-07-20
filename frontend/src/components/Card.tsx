import { useState } from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export default function AnimatedCard() {
  const [upvotes, setUpvotes] = useState(42)

  return (
    <motion.div
      className="w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
    >
      <motion.img
        src="/placeholder.svg?height=200&width=300"
        alt="Card image"
        className="w-full h-48 object-cover"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      />
      <div className="p-4">
        <motion.h2
          className="text-2xl font-bold mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Card Title
        </motion.h2>
        <motion.p
          className="text-gray-600 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          This is a subtitle for the card
        </motion.p>
        <motion.p
          className="text-gray-700 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          This is some sample content for the card. You can add more details here.
        </motion.p>
        <motion.div
          className="flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.button
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={() => setUpvotes(upvotes + 1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart className="h-4 w-4" />
            <span>{upvotes}</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}