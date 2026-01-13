import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './page';

// Mock the video component since we can't test actual video rendering easily in JSDOM
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe('Atmosphere Architect Landing Page', () => {
  it('renders the hero section with correct text', () => {
    render(<Home />);
    
    // Check for Hero Headline
    expect(screen.getByText(/Transform any venue into a feeling/i)).toBeDefined();
    
    // Check for Sub-headline
    expect(screen.getByText(/Scent is the memory that lingers/i)).toBeDefined();
  });

  it('renders the background video element', () => {
    render(<Home />);
    const videoElement = document.querySelector('video');
    expect(videoElement).toBeDefined();
    expect(videoElement?.getAttribute('src')).toContain('landing_page.mp4');
  });
});
