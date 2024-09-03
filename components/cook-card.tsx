'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface CookCardProps {
  id: string;
  name: string;
  image: string;
  isSelected: boolean;
  onClick: (id: string) => void;
}

export default function CookCard({
  id,
  name,
  image,
  isSelected,
  onClick,
}: CookCardProps) {
  return (
    <Card
      className={cn(
        'cursor-pointer transition-all shadow-lg',
        isSelected && 'ring-2 ring-primary'
      )}
      onClick={() => onClick(id)}
    >
      <CardHeader className="p-2">
        <div className="relative aspect-square">
          <Image
            src={image}
            alt={name}
            fill
            className="rounded-t-lg object-contain"
          />
        </div>
      </CardHeader>
      <CardContent className="p-2 text-center">
        <CardTitle className="text-sm">{name}</CardTitle>
      </CardContent>
    </Card>
  );
}