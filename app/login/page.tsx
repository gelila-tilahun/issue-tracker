

// app/login/page.tsx
import { Metadata } from 'next';
import LoginForm from './login-form';

export const metadata: Metadata = {
  title: 'Issue Tracker - Sign-in',
  description: 'View a summary of project issues',
};

export default function LoginPage() {
  return <LoginForm />;
}