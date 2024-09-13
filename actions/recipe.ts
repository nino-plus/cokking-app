"use server";

import { Ingredient } from "@/types/recipes";
import { generateRecipeData, saveRecipeToSupabase } from "@/utils/recipeUtils";

export async function generateRecipe(ingredients: Ingredient[]) {
  try {
    const ingredientNames = ingredients.map((ingredient) => ingredient.name);
    const recipeData = await generateRecipeData(ingredientNames);
    const savedRecipe = await saveRecipeToSupabase(recipeData);
    return { recipeId: savedRecipe.id };
  } catch (error: unknown) {
    console.error("レシピの生成または保存にエラーが発生しました：", error);
    throw new Error(
      "レシピの生成または保存にエラーが発生しました",
    );
  }
}
