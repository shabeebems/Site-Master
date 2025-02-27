import SignupForm from './signupForm';
import Photos from '../components/AuthComponet';

export default function SignupPage() {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      <Photos />

      {/* Right side - Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <SignupForm />
      </div>
    </div>
  );
}