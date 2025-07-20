
import RecipePage from "../components/FullRecipe";
import { Appbar } from "../components/Appbar";
import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";

export default function FullRecipe() {
  const { id } = useParams();
    console.log(id);
    const {loading, recipe} = useBlog({
      id: id || ""
  });
  if (loading || !recipe) {
    return <div>
        <Appbar />
    
        <div className="h-screen flex flex-col justify-center">
            
            <div className="flex justify-center">
               Loading
            </div>
        </div>
    </div>
}

  return (<div>
    <Appbar />
    <RecipePage recipe={recipe}/>
  </div>)
}