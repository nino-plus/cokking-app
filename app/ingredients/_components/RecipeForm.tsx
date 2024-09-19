'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';
import { FormItem } from '@/components/ui/form';
import { generateRecipe } from '@/actions/recipe';
import { Ingredient } from '@/types/recipes';

export default function RecipeForm() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState<string>('');
  const [additionalInfo, setAdditionalInfo] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setIsFormValid(ingredients.length > 0);
  }, [ingredients]);

  const addIngredient = () => {
    const value = currentIngredient.trim();
    if (value !== '' && !ingredients.includes(value)) {
      setIngredients((prev) => [...prev, value]);
      setCurrentIngredient('');
    }
  };

  const removeIngredient = (ingredientToRemove: string) => {
    setIngredients((prev) =>
      prev.filter((ingredient) => ingredient !== ingredientToRemove)
    );
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const ingredientObjects: Ingredient[] = ingredients.map(
        (name, index) => ({
          id: `${index}`,
          name,
          category: 'user_input',
        })
      );

      const result = await generateRecipe(ingredientObjects);
      if (result.recipeId) {
        router.push(`/results/${result.recipeId}`);
      } else {
        throw new Error('レシピの生成に失敗しました');
      }
    } catch (err) {
      console.error('レシピ生成中にエラーが発生しました:', err);
      setError(
        'レシピの生成中にエラーが発生しました。もう一度お試しください。'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mt-8">
        <FormItem>
          <Label htmlFor="ingredient-input">食材</Label>
          <div className="mt-2 flex items-center gap-4">
            <Input
              autoComplete="off"
              placeholder="例: トマト"
              value={currentIngredient}
              onChange={(e) => setCurrentIngredient(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addIngredient();
                }
              }}
            />
            <Button onClick={addIngredient}>追加</Button>
          </div>
        </FormItem>
      </div>
      <div className="mt-8">
        {ingredients.length > 0 && (
          <>
            <Label>入力した食材</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {ingredients.map((ingredient, index) => (
                <Badge
                  key={index}
                  role="button"
                  tabIndex={0}
                  onClick={() => removeIngredient(ingredient)}
                  variant="secondary"
                  className="text-sm py-1 px-2 cursor-pointer max-w-full"
                >
                  <span className="truncate" title={ingredient}>
                    {ingredient.length > 20
                      ? `${ingredient.slice(0, 17)}...`
                      : ingredient}
                  </span>
                  <span className="ml-2 text-red-500 hover:text-red-700 transition-colors duration-200">
                    <X size={14} />
                    <span className="sr-only">Remove</span>
                  </span>
                </Badge>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="mt-8">
        <Label htmlFor="additional-info">追加情報（任意）</Label>
        <Textarea
          id="additional-info"
          rows={7}
          placeholder="アレルギー、好み、調理時間の制限などがあれば入力してください。"
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
        />
      </div>
      {error && (
        <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}
      <div className="text-center mt-8">
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid || isLoading}
          className="md:w-1/4"
          aria-label="レシピを作成する"
        >
          {isLoading ? 'レシピを生成中...' : 'レシピを作成する'}
        </Button>
      </div>
    </>
  );
}
