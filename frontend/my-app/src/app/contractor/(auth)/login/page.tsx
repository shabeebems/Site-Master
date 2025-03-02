import LoginForm from './LoginForm';

export default function LoginPage() {
  const role: string = 'Contractor'
  return (
      // <Photos />
      <LoginForm role={role} />
  );
}