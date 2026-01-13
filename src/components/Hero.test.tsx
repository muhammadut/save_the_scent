import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from './Hero';

// Mock Next/Image and GSAP
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock('gsap', () => ({
  timeline: () => ({
    fromTo: jest.fn().mockReturnThis(),
    to: jest.fn().mockReturnThis(),
  }),
}));

jest.mock('@gsap/react', () => ({
  useGSAP: jest.fn(),
}));

describe('Hero Component', () => {
  it('renders the correct headline and sub-headline', () => {
    render(<Hero />);
    
    // Check for Headline
    expect(screen.getByText(/Transform Any Venue/i)).toBeInTheDocument();
    expect(screen.getByText(/Into A Feeling/i)).toBeInTheDocument();
    
    // Check for Sub-headline
    expect(screen.getByText(/Scent is the memory that lingers/i)).toBeInTheDocument();

    // Check for Descriptor
    expect(screen.getByText(/Signature fragrances for weddings & events/i)).toBeInTheDocument();
  });
});
