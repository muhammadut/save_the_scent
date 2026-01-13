import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './page';

// Mock the video component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// Mock GSAP
jest.mock('gsap', () => ({
  registerPlugin: jest.fn(),
  timeline: () => ({
    fromTo: jest.fn().mockReturnThis(),
    to: jest.fn().mockReturnThis(),
  }),
}));

jest.mock('@gsap/react', () => ({
  useGSAP: jest.fn(),
}));

describe('Atmosphere Architect Landing Page', () => {
  it('renders the hero section with correct text', () => {
    render(<Home />);
    
    // Check for Hero Headline parts
    const transformElements = screen.getAllByText(/TRANSFORM/i);
    expect(transformElements.length).toBeGreaterThan(0);
    
    expect(screen.getByText(/THE FEELING/i)).toBeInTheDocument();
    
    // Check for Sub-headline
    expect(screen.getByText(/Scent is the memory that lingers/i)).toBeInTheDocument();
  });
});