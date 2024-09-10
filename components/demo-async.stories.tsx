import type { Meta, StoryObj } from '@storybook/react';
import { within, expect } from '@storybook/test';

import DemoAsync from './demo-async';

const meta = {
  component: DemoAsync,
} satisfies Meta<typeof DemoAsync>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const img = canvas.getByRole('heading', {
      name: 'test',
    });

    expect(img).toBeVisible();
  },
};