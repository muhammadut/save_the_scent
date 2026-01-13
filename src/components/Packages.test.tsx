import React from 'react';
import { render, screen } from '@testing-library/react';
import Packages from './Packages';

describe('Packages Component', () => {
  it('renders package tiers', () => {
    render(<Packages />);
    expect(screen.getByText('The Essence')).toBeInTheDocument();
    expect(screen.getByText('$350')).toBeInTheDocument();
    
    expect(screen.getByText('The Signature')).toBeInTheDocument();
    expect(screen.getByText('$550')).toBeInTheDocument();
    
    expect(screen.getByText('Bespoke')).toBeInTheDocument();
    expect(screen.getByText('Custom')).toBeInTheDocument();
  });
});
