'use client';

import Link from 'next/link';
import { Recipe } from '@/types/recipes';

type RecipeListProps = {
  recipes: Recipe[];
  page: number;
  totalPages: number;
};

export default function RecipeList({
  recipes,
  page,
  totalPages,
}: RecipeListProps) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <Link href={`/results/${recipe.id}`} key={recipe.id}>
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h2 className="text-xl font-semibold mb-2">{recipe.name}</h2>
              <p className="text-gray-600">調理時間: {recipe.cookingTime}分</p>
              <p className="text-gray-600">難易度: {recipe.difficulty}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-8 flex justify-center items-center space-x-4">
        {page > 1 && (
          <Link
            href={`/history?page=${page - 1}`}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            前へ
          </Link>
        )}
        <span>
          ページ {page} / {totalPages}
        </span>
        {page < totalPages && (
          <Link
            href={`/history?page=${page + 1}`}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            次へ
          </Link>
        )}
      </div>
    </div>
  );
}
