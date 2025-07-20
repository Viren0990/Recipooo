import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { motion } from "framer-motion"
import { InputBox } from "./Inputbox"
import { Heading } from "./Heading"

export const SigninAuth = () => {
  const navigate = useNavigate()
  const [postInputs, setPostInputs] = useState({
    email: "",
    password: "",
  })

  const handleInputChange = (field: "email" | "password") => (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostInputs((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const sendRequest = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", postInputs)
      const jwt = response.data.token
      localStorage.setItem("token", jwt)
      navigate("/landing")
    } catch (e) {
      alert("Error while signing in")
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg"
      >
        <Heading header="Enter your details" subheader="Don't have an account?" to="SignUp" To="/signup" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <InputBox
            type="email"
            label="Email"
            placeholder="johndoe@abc.com"
            onChange={handleInputChange("email")}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <InputBox
            type="password"
            label="Password"
            placeholder="***********"
            onChange={handleInputChange("password")}
          />
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={sendRequest}
          type="button"
          className="mt-8 w-full rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300"
        >
          Sign In
        </motion.button>
      </motion.div>
    </div>
  )
}