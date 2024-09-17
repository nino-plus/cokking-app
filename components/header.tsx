import Link from 'next/link';
import { Button } from './ui/button';
import { ModeToggle } from './mode-toggle';
import { Menu } from 'lucide-react';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import UserMenu from './user-menu';
import { currentUser } from '@/data/auth';

const navItems = [
  {
    label: '食材入力',
    href: '/ingredients',
  },
  {
    label: '履歴',
    href: '/history',
  },
];

export default async function Header() {
  const user = await currentUser();

  return (
    <header className="h-16 flex items-center container mx-auto border-b px-6">
      <Button variant="ghost" asChild>
        <Link href="/">LOGO</Link>
      </Button>
      <span className="flex-1"></span>
      <div className="md:flex hidden gap-4">
        <nav>
          <ul className="flex items-center gap-2 text-sm font-medium">
            {navItems.map((item) => (
              <li key={item.label}>
                <Button asChild variant="ghost">
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        <ModeToggle />
        <UserMenu user={user} />
      </div>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="size-6" />
              <span className="sr-only">メニューを開く</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex mt-6 flex-col gap-4">
              {navItems.map((item) => (
                <Button key={item.label} asChild variant="ghost">
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))}
            </nav>
            <div className="flex gap-4 mt-4 justify-center">
              <UserMenu user={user} />
              <ModeToggle />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
