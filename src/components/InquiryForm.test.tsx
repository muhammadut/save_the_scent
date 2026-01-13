import React from 'react';
import { render, screen } from '@testing-library/react';
import InquiryForm from './InquiryForm';

describe('InquiryForm Component', () => {
  it('renders the form fields', () => {
    render(<InquiryForm />);
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Inquiry/i })).toBeInTheDocument();
  });
});
