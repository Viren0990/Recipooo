import { ChefHat, Share2, Users } from "lucide-react"
import { motion } from "framer-motion"
import { Appbar } from "../components/Appbar"

export default function AboutUs() {
  const features = [
    {
      icon: <ChefHat className="h-10 w-10 text-orange-500" />,
      title: "Recipe Sharing",
      description: "Upload and share your favorite recipes with our community.",
    },
    {
      icon: <Users className="h-10 w-10 text-orange-500" />,
      title: "Community",
      description: "Connect with other food lovers, comment, and share cooking tips.",
    },
    {
      icon: <Share2 className="h-10 w-10 text-orange-500" />,
      title: "Discover",
      description: "Explore new recipes and cuisines from around the world.",
    },
  ]

  return (
    <>
      <Appbar />
      <div className="min-h-screen bg-gray-50 text-gray-800">
        <motion.header
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-orange-400 to-orange-600 px-4 py-20 text-center text-white"
        >
          <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">About Recipoo</h1>
          <p className="mx-auto max-w-2xl text-xl md:text-2xl">
            Connecting food lovers and home chefs through the joy of shared recipes
          </p>
        </motion.header>

        <main className="mx-auto max-w-4xl px-4 py-12 space-y-16">
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="mb-4 text-3xl font-semibold text-orange-600">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              At Recipoo, we believe that great food brings people together. Our mission is to create a vibrant
              community where passionate cooks and food enthusiasts can share their favorite recipes, discover new
              culinary inspirations, and connect with like-minded individuals from around the world.
            </p>
          </motion.section>

          <section>
            <h2 className="mb-6 text-3xl font-semibold text-orange-600">What We Offer</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col items-center mb-4">
                      {feature.icon}
                      <h3 className="mt-2 text-xl font-semibold">{feature.title}</h3>
                    </div>
                    <p className="text-center text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </main>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 bg-gray-100 py-6 text-center"
        >
          <p className="text-gray-600">&copy; 2023 Recipoo. All rights reserved.</p>
        </motion.footer>
      </div>
    </>
  )
}