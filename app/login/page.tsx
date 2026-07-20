import { Metadata } from 'next';
import { Suspense } from 'react';
import LoginForm from './login-form';

export const metadata: Metadata = {
  title: 'Issue Tracker - Sign in',
};

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
