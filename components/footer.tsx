import Link from 'next/link';
import { ModeToggle } from './mode-toggle';
import { Button } from './ui/button';
import { Github, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t sticky top-full">
      <div className="container h-16 flex items-center justify-between">
        <Button variant="ghost" asChild>
          <Link href="/">LOGO</Link>
        </Button>
        <p>&copy; KAYKOGU</p>
      </div>
    </footer>
  );
}
