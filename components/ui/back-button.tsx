'use client';

import { Slot } from '@radix-ui/react-slot';
import { useRouter } from 'next/navigation';

export default function BackButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return <Slot onClick={() => router.back()}>{children}</Slot>;
}
