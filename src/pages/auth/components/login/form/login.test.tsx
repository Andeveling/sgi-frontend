import { render, screen } from '@testing-library/react';
import LoginForm from './login-form';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

const RouterMemory = () => (
  <MemoryRouter>
    <LoginForm />
  </MemoryRouter>
);

describe('LoginForm', () => {
  it('should render the form', () => {
    render(<RouterMemory />);
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('should render the title', () => {
    render(<RouterMemory />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('should render the email input', () => {
    render(<RouterMemory />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('should render the password input', () => {
    render(<RouterMemory />);
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('should render the login button', () => {
    render(<RouterMemory />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render the login form description', () => {
    render(<RouterMemory />);
    expect(
      screen.getByText('Enter your email and password to access your account.'),
    ).toBeInTheDocument();
  });
});
