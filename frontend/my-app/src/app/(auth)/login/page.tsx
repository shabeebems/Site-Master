import Image from 'next/image';
import LoginForm from './LoginForm';
import Photos from '../components/AuthComponet';

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      <Photos />
      {/* Right side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <LoginForm />
      </div>
    </div>
  );
}