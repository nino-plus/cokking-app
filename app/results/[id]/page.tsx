import { notFound } from 'next/navigation';
import { Recipe } from '@/types/recipes';
import { getRecipeById } from '@/utils/recipeUtils';

export default async function page({ params }: { params: { id: string } }) {
  let recipe: Recipe | null = null;

  try {
    recipe = await getRecipeById(params.id);
  } catch (error) {
    console.error('レシピの取得に失敗しました：', error);
    notFound();
  }

  if (!recipe) {
    notFound();
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          {recipe.name}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="font-semibold text-gray-700">調理時間</p>
            <p className="text-lg">{recipe.cookingTime}分</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="font-semibold text-gray-700">難易度</p>
            <p className="text-lg">{recipe.difficulty}</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="font-semibold text-gray-700">何人分</p>
            <p className="text-lg">{recipe.servings}</p>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">材料:</h2>
          <ul
            className="list-disc list-inside space-y-2"
            aria-label="材料リスト"
          >
            {recipe.source.map((source, index) => (
              <li key={index} className="text-gray-700 pl-2">
                {source}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">
            調理手順:
          </h2>
          <ol
            className="list-decimal list-outside space-y-4 pl-5"
            aria-label="調理手順"
          >
            {recipe.steps.map((step, index) => (
              <li
                key={index}
                className="bg-gray-50 p-3 rounded-lg text-gray-700"
              >
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
