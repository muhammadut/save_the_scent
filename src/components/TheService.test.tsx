import React from 'react';
import { render, screen } from '@testing-library/react';
import TheService from './TheService';

describe('The Service Section', () => {
  it('renders the three service steps', () => {
    render(<TheService />);
    
    expect(screen.getByText(/We arrive before your guests do/i)).toBeInTheDocument();
    expect(screen.getByText(/Awaken the air/i)).toBeInTheDocument();
    expect(screen.getByText(/Disappear/i)).toBeInTheDocument();
    expect(screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === 'p' && content.includes('What remains is') && element.textContent === 'What remains is atmosphere.';
    })).toBeInTheDocument();
  });
});
