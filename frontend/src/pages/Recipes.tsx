import { useState } from "react"
import { motion } from "framer-motion"
import { Appbar } from "../components/Appbar"

export const Recipes = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      <Appbar />
      <main>
        <motion.section
          className="bg-gradient-to-r from-orange-400 to-orange-600 text-white py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div className="flex flex-col justify-center" {...fadeIn}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Discover Delicious Recipes</h1>
              <p className="text-lg mb-8">Share and discover new recipes with our vibrant community.</p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <motion.a
                  href="/recipes"
                  className="bg-white text-orange-500 px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors duration-300 text-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.a>
                <motion.a
                  href="/about"
                  className="border border-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-orange-500 transition-colors duration-300 text-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.a>
              </div>
            </motion.div>
            <motion.div {...fadeIn}>
              <img
                src="images/dd.jpg"
                width="600"
                height="400"
                alt="Delicious food spread"
                className="rounded-md w-full h-auto "
              />
            </motion.div>
          </div>
        </motion.section>
        <motion.section
          className="bg-gray-100 py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Featured Recipes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Creamy Mushroom Pasta",
                  description: "A delicious and easy-to-make pasta dish with a creamy mushroom sauce.",
                  image: "images/qq.webp"
                },
                {
                  title: "Grilled Salmon with Lemon Dill Sauce",
                  description: "A healthy and flavorful salmon dish with a tangy lemon dill sauce.",
                  image: "images/rr.webp"
                },
                {
                  title: "Chocolate Lava Cake",
                  description: "A decadent and indulgent chocolate dessert with a molten center.",
                  image: "images/ww.jpg"
                }
              ].map((recipe, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                  {...fadeIn}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <img
                    src={recipe.image}
                    width="400"
                    height="300"
                    alt={recipe.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{recipe.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{recipe.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </main>
      <motion.footer
        className="bg-gray-800 text-white py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between">
          <p className="mb-4 sm:mb-0">&copy; 2023 Recipe Sharing. All rights reserved.</p>
          <nav className="space-x-4">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
          </nav>
        </div>
      </motion.footer>
    </div>
  )
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}