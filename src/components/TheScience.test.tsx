import React from 'react';
import { render, screen } from '@testing-library/react';
import TheScience from './TheScience';

describe('The Science Section', () => {
  it('renders the core messaging', () => {
    render(<TheScience />);
    
    expect(screen.getByText(/Scent lingers where moments fade/i)).toBeInTheDocument();
    expect(screen.getByText(/remember how it felt/i)).toBeInTheDocument();
  });
});
