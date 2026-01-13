import React from 'react';
import { render, screen } from '@testing-library/react';
import TheScience from './TheScience';

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

describe('The Statement Section', () => {
  it('renders the core claim', () => {
    render(<TheScience />);
    
    expect(screen.getByText(/SCENT LINGERS/i)).toBeInTheDocument();
    expect(screen.getByText(/WHERE MOMENTS FADE/i)).toBeInTheDocument();
  });
});