import { Appbar } from "../components/Appbar";
import { RecipeCard } from "../components/RecipeCard";
import { useBlogs } from "../hooks";
import { SearchBar } from "../components/SearchBar";
import { useState } from "react";
import { RecipeSkeleton } from "../components/Skeleton";
import { SearchBarSkeleton } from "../components/Skeleton";


export const Card = () => {
  const { loading, recipe } = useBlogs();
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearchResults = (results: any[]) => {
    setSearchResults(results);
  };

  if (loading) {
    return (
      <div>
        <Appbar />
        <SearchBarSkeleton />
        <div className="flex justify-center p-4 ml-40 mr-40">  
            <RecipeSkeleton />
            <RecipeSkeleton />
            <RecipeSkeleton />
        </div>
        <div className="flex justify-center p-4 ml-40 mr-40">  
            <RecipeSkeleton />
            <RecipeSkeleton />
            <RecipeSkeleton />
        </div>
      </div>
    );
  }

  const displayRecipes = searchResults.length > 0 ? searchResults : recipe;

  return (
    <div className="bg-slate-50">
      <Appbar />
      <SearchBar onSearchResults={handleSearchResults} />
      <div className="flex justify-center p-4 bg-slate-50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayRecipes.map((blog, index) => (
            <RecipeCard
              key={index}
              id={blog.id}
              authorName={blog.author?.name || "Anonymous"} 
              title={blog.title}
              upvotes={blog.upvotes}
              image={blog.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
