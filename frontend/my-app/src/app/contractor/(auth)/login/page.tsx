import LoginForm from '@/app/components/LoginForm';

export default function LoginPage() {
  const role: string = 'Contractor'
  return (
      // <Photos />
      <LoginForm role={role} />
  );
}