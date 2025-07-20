import { useEffect, useState } from "react"
import axios from "axios";

export interface Recipe {
    "id": string;
    "title": string;
    "ingredients": string;
    "instructions": string;
    "prepTime": number;
    "cookTime": number;
    "servings": number;
    "difficulty": string;
    "mealType": string;
    "upvotes": number;
    "image": string;
    "authorId": string;
    "author": {
        "name": string
    }
}


export const useBlog = ({ id }: { id: string })=>{
    const [loading, setLoading] = useState(true);
    const [recipe, setRecipe] = useState<Recipe>();
  
    useEffect(()=>{
        axios.get(`http://localhost:3000/api/v1/recipe/getRecipe/${id}`,{
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(response => {
            console.log(response.data);
            setRecipe(response.data);
            setLoading(false);
        })
    },[])
  
    return {
        loading,
        recipe
    }
  }
  

export const useBlogs = ()=>{
    const [loading, setLoading] = useState(true);
    const [recipe, setRecipe] = useState<Recipe[]>([]);

    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/recipe/getRecipes",{
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(response => {
            console.log(response.data);
            setRecipe(response.data);
            setLoading(false);
        })
    },[])

    return {
        loading,
        recipe
    }
}