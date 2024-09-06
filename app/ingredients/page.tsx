import RecipeForm from './_components/RecipeForm';

export default function Page() {
  return (
    <div className="container mx-auto p-12">
      <h1 className="text-2xl md:text-3xl font-bold text-center">
        AIレシピ提案
      </h1>
      <div className="border rounded-lg p-10 shadow-lg mt-10 md:mt-15">
        <h2 className="text-lg md:text-2xl font-bold">食材を入力</h2>
        <p className="text-sm md:text-xl mt-3">
          お持ちの食材を入力してください。AIがレシピを提案します。
        </p>
        <RecipeForm />
      </div>
    </div>
  );
}
