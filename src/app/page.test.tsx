import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './page';

// Mock all child components to isolate page testing and avoid duplicate text issues
jest.mock('@/components/Hero', () => () => <div>Hero Component</div>);
jest.mock('@/components/TheScience', () => () => <div>TheScience Component</div>);
jest.mock('@/components/TheService', () => () => <div>TheService Component</div>);
jest.mock('@/components/ScentGrid', () => () => <div>ScentGrid Component</div>);
jest.mock('@/components/Packages', () => () => <div>Packages Component</div>);
jest.mock('@/components/InquiryForm', () => () => <div>InquiryForm Component</div>);

describe('Home Page Integration', () => {
  it('renders all main sections', () => {
    render(<Home />);
    
    expect(screen.getByText('Hero Component')).toBeInTheDocument();
    expect(screen.getByText('TheScience Component')).toBeInTheDocument();
    expect(screen.getByText('TheService Component')).toBeInTheDocument();
    expect(screen.getByText('ScentGrid Component')).toBeInTheDocument();
    expect(screen.getByText('Packages Component')).toBeInTheDocument();
    expect(screen.getByText('InquiryForm Component')).toBeInTheDocument();
  });
});
