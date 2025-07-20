import { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'; // Importing heart icons from react-icons
import { Link } from 'react-router-dom';
import axios from 'axios';

export interface Inputs {
  id: string;
  title: string;
  image: string;
  authorName: string;
  upvotes: number;
}

export const RecipeCard = ({ id, title, image, authorName, upvotes }: Inputs) => {
  const [liked, setLiked] = useState(false); // State to track if the button is liked
  const [currentUpvotes, setCurrentUpvotes] = useState(upvotes); // State to track current upvotes

  const handleLikeClick = async () => {
    if (liked) return; // Prevent multiple upvotes on the same click

    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/recipe/upvote',
        { id },
        {
          headers: {
            Authorization: localStorage.getItem('token') || '',
          },
        }
      );

      if (response.status === 200) {
        setLiked(true);
        setCurrentUpvotes(currentUpvotes + 1);
      } else {
        console.error('Failed to update upvote:', response.data.message);
      }
    } catch (error) {
      console.error('Error while updating upvote:', error);
    }
  };

  return (
    <div
      className="max-w-sm  bg-white border border-orange-600 rounded-lg shadow-sm overflow-hidden transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg"
    >
      <Link to={`/recipes/${id}`}>
        <img
          src={`http://localhost:3000/${image}`} // Correctly accessing the image path
          className="w-full h-60 object-cover"
          alt="Recipe"
        />
      </Link>
      <div className="p-4 flex gap-x-10">
        <div>
          <h2 className="text-2xl font-bold mb-0 text-orange-600">{title}</h2>
          <p className="text-gray-400 text-sm font-semibold">From - {authorName}</p>
        </div>

        <div className="flex items-center ml-40 mt-6">
          <button
            onClick={handleLikeClick}
            className={`flex items-center space-x-1 text-gray-500 transition-colors duration-200 ${
              liked ? 'text-red-500' : 'text-gray-500'
            }`}
          >
            {liked ? <AiFillHeart size={25} /> : <AiOutlineHeart size={25} />}
            <span className="text-lg">{liked ? currentUpvotes : upvotes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
