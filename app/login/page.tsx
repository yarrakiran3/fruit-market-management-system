import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
 
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center ">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col  p-4 ">
        <div className="flex w-full items-end rounded-lg bg-blue-500 p-3 ">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}