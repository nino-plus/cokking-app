'use client';

import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';
import { FormItem } from '@/components/ui/form';

export default function RecipeForm() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState<string>('');
  const [additionalInfo, setAdditionalInfo] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

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
    // ここでフォームの送信処理を実装
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
                  className="text-sm py-1 px-2 cursor-pointer"
                >
                  {ingredient}
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
      <div className="text-center mt-8">
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="md:w-1/4"
          aria-label="レシピを作成する"
        >
          レシピを作成する
        </Button>
      </div>
    </>
  );
}
