import React from 'react';
import { render, screen } from '@testing-library/react';
import TheService from './TheService';

// Mock GSAP
jest.mock('gsap', () => ({
  registerPlugin: jest.fn(),
  timeline: () => ({
    fromTo: jest.fn().mockReturnThis(),
    to: jest.fn().mockReturnThis(),
  }),
  fromTo: jest.fn().mockReturnThis(),
}));

jest.mock('@gsap/react', () => ({
  useGSAP: jest.fn(),
}));

describe('The Service Section', () => {
  it('renders the three service steps with numbers', () => {
    render(<TheService />);
    
    // Check for numbers
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByText('03')).toBeInTheDocument();

    // Check for labels
    expect(screen.getByText(/Arrival/i)).toBeInTheDocument();
    expect(screen.getByText(/Activation/i)).toBeInTheDocument();
    expect(screen.getByText(/Transformation/i)).toBeInTheDocument();

    // Check for descriptions
    expect(screen.getByText(/We arrive before/i)).toBeInTheDocument();
    expect(screen.getByText(/Awaken the air/i)).toBeInTheDocument();
    expect(screen.getByText(/The space is/i)).toBeInTheDocument();
  });
});