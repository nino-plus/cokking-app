import Animated404 from '@/components/animated-404';
import BackButton from '@/components/ui/back-button';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-zinc-900">
      <div className="w-[350px] text-center bg-white dark:bg-zinc-800 shadow-xl dark:shadow-2xl rounded-lg p-8  dark:border dark:border-zinc-700">
        <Animated404 />
        <div className="mb-6">
          <p className="text-xl mb-4 text-zinc-700 dark:text-zinc-300">
            ページが見つかりません
          </p>
          <p className="text-zinc-400 dark:text-zinc-500">
            お探しのページは存在しないか、移動した可能性があります。
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <Button
            asChild
            className="dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600"
          >
            <Link href="/">ホームに戻る</Link>
          </Button>
          <BackButton>
            <Button
              variant="outline"
              className="dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              前のページへ
            </Button>
          </BackButton>
        </div>
      </div>
    </div>
  );
}
