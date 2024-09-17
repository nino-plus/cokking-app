export type Ingredient = {
  id: string;
  name: string;
  category: string;
};

export type Recipe = {
  id: number;
  name: string;
  cookingTime: number;
  difficulty: string;
  servings: string;
  steps: string[];
  source: string[];
};
