import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { userEvent, within, expect } from '@storybook/test';

import CookCard from './cook-card';

const meta = {
  component: CookCard,
} satisfies Meta<typeof CookCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: '',
    name: 'aaaaaa',
    isSelected: true,
    onClick: fn(),
    image:
      'https://plus.unsplash.com/premium_photo-1725384940651-1fdd7a649b5b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const heading = canvas.getByRole('heading', {
      name: 'aaaaaa',
    });

    expect(heading).toBeVisible();
  },
};

export const LongText: Story = {
  name: 'テキストが長い場合',
  args: {
    id: '',
    name: 'aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa  aaaaaa aaaaaa aaaaaa  aaaaaa aaaaaa aaaaaa  aaaaaa aaaaaa aaaaaa  aaaaaa aaaaaa aaaaaa  aaaaaa aaaaaa aaaaaa  aaaaaa aaaaaa aaaaaa  aaaaaa aaaaaa aaaaaa  aaaaaa aaaaaa aaaaaa  aaaaaa aaaaaa aaaaaa  aaaaaa aaaaaa aaaaaa  aaaaaa aaaaaa aaaaaa ',
    isSelected: true,
    onClick: fn(),
    image:
      'https://plus.unsplash.com/premium_photo-1725384940651-1fdd7a649b5b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const heading = canvas.getByRole('heading', {
      name: 'aaaaaa',
    });

    expect(heading).toBeVisible();
  },
};
