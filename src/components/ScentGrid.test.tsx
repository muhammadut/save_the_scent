import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ScentGrid from './ScentGrid';

// Mock Next/Image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('ScentGrid Component', () => {
  it('renders the grid header', () => {
    render(<ScentGrid />);
    expect(screen.getByText('The Scents')).toBeInTheDocument();
  });

  it('renders all scent cards', () => {
    render(<ScentGrid />);
    expect(screen.getByText('New York Mystify')).toBeInTheDocument();
    expect(screen.getByText('Dubai Mirage')).toBeInTheDocument();
    expect(screen.getByText('Black Tie')).toBeInTheDocument();
  });
});
