import { z } from "zod";

export const recipeSchema = z.object({
  recipe: z.object({
    name: z.string().describe("レシピの名前"),
    ingredients: z.array(z.object({
      name: z.string().describe("材料の名前（主材料や調味料を含む）"),
      amount: z.string().describe("材料の量"),
      type: z.enum(["main", "seasoning"]).describe(
        "材料のタイプ（主材料または調味料）",
      ),
    })),
    steps: z.array(z.string()).describe("調理手順のリスト"),
    cookingTime: z.number().describe("調理時間（分）"),
    difficulty: z.enum(["簡単", "普通", "難しい"]).describe("調理の難易度"),
    servings: z.string().describe("何人分のレシピか"),
  }),
});

export type RecipeSchema = z.infer<typeof recipeSchema>;
