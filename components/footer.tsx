import Link from 'next/link';
import { Button } from './ui/button';

export default function Footer() {
  return (
    <footer className="border-t sticky top-full py-10">
      <div className="container flex flex-col items-start">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/">LOGO</Link>
        </Button>
        <div className="w-full flex md:flex-row flex-col items-center md:justify-between">
          <nav>
            <ul className="flex flex-wrap">
              <li>
                <Button variant="ghost" asChild>
                  <Link href="/ingredients">食材入力</Link>
                </Button>
              </li>
              <li>
                <Button variant="ghost" asChild>
                  <Link href="/results">レシピ結果</Link>
                </Button>
              </li>
              <li>
                <Button variant="ghost" asChild>
                  <Link href="/history">履歴</Link>
                </Button>
              </li>
              <li>
                <Button variant="ghost" asChild>
                  <Link href="/guide">利用規約</Link>
                </Button>
              </li>
            </ul>
          </nav>
          <p className="md:mt-0 mt-4">&copy; KAYKOGU</p>
        </div>
      </div>
    </footer>
  );
}
