import { Clock, Users } from 'lucide-react';

export interface Recipe {
  id: string;
  title: string;
  ingredients: string;
  instructions: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: string;
  mealType: string;
  upvotes: number;
  image: string;
  authorId: string;
  author: {
    name: string;
  };
}

// Define a Props type that includes the Recipe object
interface RecipePageProps {
  recipe: Recipe;
}

const RecipePage: React.FC<RecipePageProps> = ({ recipe }) => {
  return (
    <div className="min-h-screen py-4 px-4">
      <div className="max-w-4xl mx-auto bg-white border-2 border-orange-500 rounded-lg shadow-lg overflow-hidden">
        <article className="p-12 md:p-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-orange-500">{recipe.title}</h1>
          
          <div className="mb-6">
            <img
              src={`http://localhost:3000/${recipe.image}`}
              alt={recipe.title} 
              width={600} 
              height={400} 
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-600">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-1 text-orange-500" />
              <span>Prep: {recipe.prepTime} minutes</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-1 text-orange-500" />
              <span>Cook: {recipe.cookTime} minutes</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-1 text-orange-500" />
              <span>Serves: {recipe.servings}</span>
            </div>
          </div>
          
          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-orange-500">Ingredients</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {/* Assuming ingredients are provided as a comma-separated string */}
              {recipe.ingredients.split(',').map((ingredient, index) => (
                <li key={index}>{ingredient.trim()}</li>
              ))}
            </ul>
          </section>
          
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-orange-500">Instructions</h2>
            <ol className="list-decimal pl-5 space-y-4 text-gray-700">
              {/* Assuming instructions are provided as a newline-separated string */}
              {recipe.instructions.split('\n').map((instruction, index) => (
                <li key={index}>{instruction.trim()}</li>
              ))}
            </ol>
          </section>
        </article>
      </div>
    </div>
  );
};

export default RecipePage;
