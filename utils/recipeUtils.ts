import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { createClient } from "@/lib/supabase/server";
import { currentUser } from "@/data/auth";
import { RecipeSchema, recipeSchema } from "@/schemas/recipeSchema";
import { Recipe } from "@/types/recipes";

export async function generateRecipeData(ingredients: string[]) {
  const result = await generateObject({
    model: openai("gpt-3.5-turbo-0125"),
    system:
      `あなたは創造的な料理人で、与えられた材料を使って美味しいレシピを考案します。
レシピには主材料（ユーザーが指定した材料）と、それに合わせた適切な調味料を含めてください。
全ての材料（主材料と調味料の両方）に正確な分量を指定することが重要です。`,
    prompt: `以下の主材料を使用して日本語でレシピを作成してください: ${
      ingredients.join("、")
    }。
これらの主材料に加えて、適切な調味料も選んでレシピに含めてください。
全ての材料（主材料と調味料の両方）に正確な分量を指定し、詳細な調理手順を含めてください。
材料リストでは、各材料が主材料か調味料かを明確に区別してください。`,
    schema: recipeSchema,
  });

  return result.object.recipe;
}

export async function saveRecipeToSupabase(recipe: RecipeSchema["recipe"]) {
  const supabase = createClient();
  const user = await currentUser();
  if (!user) {
    throw new Error("ユーザーが認証されていません");
  }

  const cookingTimeDate = new Date();
  cookingTimeDate.setMinutes(cookingTimeDate.getMinutes() + recipe.cookingTime);

  const { data, error } = await supabase
    .from("recipes")
    .insert({
      name: recipe.name,
      cookingTime: cookingTimeDate.toISOString(),
      difficulty: recipe.difficulty,
      servings: recipe.servings,
      steps: JSON.stringify(recipe.steps),
      source: recipe.ingredients.map((ing) => `${ing.name}: ${ing.amount}`),
      userId: user.id,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("レシピの取得に失敗しました：", error);
    return null;
  }

  if (!data) return null;

  return {
    id: data.id,
    name: data.name,
    cookingTime: new Date(data.cookingTime).getMinutes(),
    difficulty: data.difficulty,
    servings: data.servings,
    steps: JSON.parse(data.steps),
    source: data.source,
  };
}

export async function getUserRecipes(
  userId: string,
  page: number,
  pageSize: number,
): Promise<{ recipes: Recipe[]; count: number }> {
  const supabase = createClient();
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;

  try {
    const { data, error, count } = await supabase
      .from("recipes")
      .select("*", { count: "exact" })
      .eq("userId", userId)
      .range(start, end)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabaseクエリエラー:", error);
      throw new Error(`Supabaseクエリエラー: ${error.message}`);
    }

    if (!data) {
      console.error("データが返されませんでした");
      throw new Error("データが返されませんでした");
    }

    const recipes: Recipe[] = data.map((item) => ({
      id: item.id,
      name: item.name,
      cookingTime: new Date(item.cookingTime).getMinutes(),
      difficulty: item.difficulty,
      servings: item.servings,
      steps: Array.isArray(item.steps) ? item.steps : JSON.parse(item.steps),
      source: item.source,
    }));

    return { recipes, count: count || 0 };
  } catch (error) {
    console.error("getUserRecipes error:", error);
    throw error;
  }
}
