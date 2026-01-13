import React from 'react';
import { render, screen } from '@testing-library/react';
import ScentGrid from './ScentGrid';

// Mock Next/Image and Framer Motion
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useTransform: () => 0,
}));

describe('ScentGrid Portfolio', () => {
  it('renders the portfolio header', () => {
    render(<ScentGrid />);
    expect(screen.getByText('Selected Fragrances')).toBeInTheDocument();
  });

  it('renders scent cards', () => {
    render(<ScentGrid />);
    expect(screen.getByText('New York Mystify')).toBeInTheDocument();
    expect(screen.getByText('Dubai Mirage')).toBeInTheDocument();
  });
});