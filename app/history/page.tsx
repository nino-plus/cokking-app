import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getUserRecipes } from '@/utils/recipeUtils';
import RecipeList from './_components/RecipeList';
import Link from 'next/link';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'レシピ履歴',
  description:
    'AIでレシピを提案するクッキングアプリです。お手軽にレシピを提案します。',
};
export default async function Page({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const supabase = createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect('/login');
    }

    const page = parseInt(searchParams.page) || 1;
    const pageSize = 12;

    const { recipes, count } = await getUserRecipes(user.id, page, pageSize);

    const totalPages = Math.ceil(count / pageSize);

    return (
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          レシピ履歴
        </h1>
        <RecipeList recipes={recipes} page={page} totalPages={totalPages} />
      </div>
    );
  } catch (error) {
    console.error('レシピの取得中にエラーが発生しました:', error);
    return (
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          エラー
        </h1>
        <p className="text-center text-red-500">
          レシピの取得中にエラーが発生しました: {(error as Error).message}
        </p>
        <p className="text-center mt-4">
          <Link href="/history" className="text-blue-500 hover:underline">
            再試行
          </Link>
        </p>
      </div>
    );
  }
}
