import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Form = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [prepTime, setPrepTime] = useState(0);
  const [cookTime, setCookTime] = useState(0);
  const [servings, setServings] = useState(0);
  const [difficulty, setDifficulty] = useState('');
  const [mealType, setMealType] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('ingredients', ingredients);
    formData.append('instructions', instructions);
    formData.append('prepTime', prepTime.toString());
    formData.append('cookTime', cookTime.toString());
    formData.append('servings', servings.toString());
    formData.append('difficulty', difficulty);
    formData.append('mealType', mealType);

    if (image) {
      formData.append('image', image);
    }

    try {
        await axios.post(
        'http://localhost:3000/api/v1/recipe/addRecipes',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: localStorage.getItem('token') || '',
          },
        }
      );

      setShowSuccess(true); 
    } catch (error) {
      console.error('Error uploading recipe:', error);
      alert('Failed to upload recipe. Please try again.');
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    } else {
      setImage(null);
    }
  };

  const handleIngredientsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setIngredients(input);
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        navigate('/card'); // Redirect to /card after 2 seconds
      }, 2000);
      return () => clearTimeout(timer); // Clean up the timer
    }
  }, [showSuccess, navigate]);

  return (
    <div className="relative">
      {showSuccess && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-3 rounded-md shadow-md">
          Recipe added successfully!
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="p-6 bg-gray-50 shadow-md rounded-md mx-auto max-w-lg"
      >
        <label className="text-orange-600 font-semibold">Title</label>
        <input
          className="border border-gray-300 p-3 mt-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          type="text"
          placeholder="Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label className="text-orange-600 font-semibold mt-4 block">
          Ingredients
        </label>
        <textarea
          className="border border-gray-300 p-3 mt-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Ingredients (one per line)"
          value={ingredients}
          onChange={handleIngredientsChange}
          required
        />

        <label className="text-orange-600 font-semibold mt-4 block">
          Instructions
        </label>
        <textarea
          className="border border-gray-300 p-3 mt-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
        />

        <label className="text-orange-600 font-semibold mt-4 block">
          Preparation Time (minutes)
        </label>
        <input
          className="border border-gray-300 p-3 mt-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          type="number"
          placeholder="Preparation Time (minutes)"
          value={prepTime}
          onChange={(e) => setPrepTime(parseInt(e.target.value))}
          required
        />

        <label className="text-orange-600 font-semibold mt-4 block">
          Cook Time (minutes)
        </label>
        <input
          className="border border-gray-300 p-3 mt-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          type="number"
          placeholder="Cook Time (minutes)"
          value={cookTime}
          onChange={(e) => setCookTime(parseInt(e.target.value))}
          required
        />

        <label className="text-orange-600 font-semibold mt-4 block">
          Servings
        </label>
        <input
          className="border border-gray-300 p-3 mt-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          type="number"
          placeholder="Servings"
          value={servings}
          onChange={(e) => setServings(parseInt(e.target.value))}
          required
        />

        <label className="text-orange-600 font-semibold mt-4 block">
          Difficulty
        </label>
        <input
          className="border border-gray-300 p-3 mt-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          type="text"
          placeholder="Difficulty (e.g., Easy, Medium, Hard)"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          required
        />

        <label className="text-orange-600 font-semibold mt-4 block">
          Meal Type
        </label>
        <input
          className="border border-gray-300 p-3 mt-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          type="text"
          placeholder="Meal Type (e.g., Breakfast, Lunch)"
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
          required
        />

        <label className="text-orange-600 font-semibold mt-4 block">
          Upload Image
        </label>
        <input
          className="border border-gray-300 p-3 mt-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />

        <button
          type="submit"
          className="mt-6 w-full bg-orange-500 text-white font-semibold py-3 rounded-md hover:bg-orange-600 transition duration-300"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};
