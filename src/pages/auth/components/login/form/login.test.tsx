import { render, screen } from '@testing-library/react';
import LoginForm from './login-form';
import { describe, it, expect } from 'vitest';

describe('LoginForm', () => {
  it('should render the form', () => {
    render(<LoginForm />);
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('should render the title', () => {
    render(<LoginForm />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('should render the email input', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('should render the password input', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('should render the login button', () => {
    render(<LoginForm />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render the login form description', () => {
    render(<LoginForm />);
    expect(screen.getByText('Enter your email and password to access your account.')).toBeInTheDocument();
  });
});
