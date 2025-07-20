import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { Recipes } from "./pages/Recipes"
import { Card } from "./pages/Card"
import { Publish } from "./pages/Publish"
import FullRecipe from "./pages/FullRecipe"
import AboutUs from "./pages/Aboutus"
import { BrowserRouter,Route,Routes } from "react-router-dom"


function App() {

  return (
    <BrowserRouter>
         <Routes>
            <Route path="/recipes/:id" element={<FullRecipe></FullRecipe>} />
            <Route path="/signup" element={<Signup></Signup>} />
            <Route path="/signin" element={<Signin></Signin>} />
            <Route path="/landing" element={<Recipes></Recipes>} />
            <Route path="/recipes" element={<Card></Card>} />
            <Route path="/searchResult" element={<Card></Card>} />
            <Route path="/createRecipe" element={<Publish></Publish>} />
            <Route path="/about" element={<AboutUs></AboutUs>} />
         </Routes>
      </BrowserRouter>
  )
}

export default App
