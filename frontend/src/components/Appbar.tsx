import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { LogOut, Plus, Menu } from "lucide-react"
import { motion } from "framer-motion"

export function Appbar() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate('/signin')
  }

  return (
    <motion.header
      className="bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-md"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/landing" className="text-2xl font-bold text-white">
              Recipoo
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-4">
            <NavLink to="/landing">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <motion.button
              className="flex items-center text-white hover:text-orange-200 transition-colors"
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </motion.button>
          </nav>

          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/createRecipe">
                <button className="flex items-center bg-white text-orange-500 hover:bg-orange-100 px-4 py-2 rounded-md transition-colors">
                  <Plus className="h-5 w-5 mr-2" />
                  <span className="hidden sm:inline">Create Recipe</span>
                </button>
              </Link>
            </motion.div>
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          className="md:hidden bg-orange-500"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-2 space-y-2">
            <NavLink to="/landing" mobile>Home</NavLink>
            <NavLink to="/about" mobile>About</NavLink>
            <motion.button
              className="flex items-center text-white hover:text-orange-200 transition-colors w-full py-2"
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}

function NavLink({ to, children, mobile = false }:any) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        to={to}
        className={`text-white hover:text-orange-200 transition-colors ${mobile ? 'block py-2' : ''}`}
      >
        {children}
      </Link>
    </motion.div>
  )
}