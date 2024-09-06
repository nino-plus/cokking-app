'use client';

import { User } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User as UserIcon, CreditCard, Settings, LogOut } from 'lucide-react';
import { signInWithGoogle, signOut } from '@/actions/auth';
import { useRouter } from 'next/navigation';

interface UserMenuProps {
  user: User | null;
}

export default function UserMenu({ user }: UserMenuProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.refresh();
    } catch (error) {
      console.error('ログアウトに失敗しました:', error);
    }
  };

  if (!user) {
    return (
      <form action={signInWithGoogle}>
        <Button variant="outline" type="submit">
          ログイン
        </Button>
      </form>
    );
  }

  const avatarUrl =
    user.user_metadata?.avatar_url ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage src={avatarUrl} alt={user.email || ''} />
            <AvatarFallback>
              {user.email ? user.email[0].toUpperCase() : 'U'}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={8} align="end" className="w-56">
        <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserIcon className="mr-2 h-4 w-4" />
            <span>プロフィール</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>支援する</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>設定</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>ログアウト</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
