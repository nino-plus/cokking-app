import Link from 'next/link';
import { Button } from './ui/button';

export default function Footer() {
  return (
    <footer className="border-t sticky top-full py-10">
      <div className="container flex flex-col items-start">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/">LOGO</Link>
        </Button>
        <div className="w-full flex justify-between items-center">
          <nav>
            <ul className="flex space-x-2">
              <li>
                <Button variant="ghost" asChild>
                  <Link href="/guide">食材入力</Link>
                </Button>
              </li>
              <li>
                <Button variant="ghost" asChild>
                  <Link href="/privacy">レシピ結果</Link>
                </Button>
              </li>
              <li>
                <Button variant="ghost" asChild>
                  <Link href="/contact">履歴</Link>
                </Button>
              </li>
              <li>
                <Button variant="ghost" asChild>
                  <Link href="/about">利用規約</Link>
                </Button>
              </li>
            </ul>
          </nav>
          <p>&copy; KAYKOGU</p>
        </div>
      </div>
    </footer>
  );
}
