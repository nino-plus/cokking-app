import Link from 'next/link';
import { Button } from './ui/button';

const navItems = [
  {
    label: '食材入力',
    href: '/ingredients',
  },
  {
    label: '履歴',
    href: '/history',
  },
  {
    label: '利用規約',
    href: '/guide',
  },
];

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
              {navItems.map((item) => (
                <li key={item.label}>
                  <Button variant="ghost" asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
          <p className="md:mt-0 mt-4">&copy; KAYKOGU</p>
        </div>
      </div>
    </footer>
  );
}
