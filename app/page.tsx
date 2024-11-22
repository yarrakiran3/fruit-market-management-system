import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css'
import { lusitana } from '@/app/ui/fonts'
import Image from 'next/image'

export default function Page() {
  return (
    <main className="flex  flex-col p-6">
      <div className="flex px-12 py-6  items-end rounded-lg bg-blue-500 ">
        <AcmeLogo />
      </div>
      <div className="mt-4 flex flex-col gap-4 md:flex-row md:justify-around p-6">
        <div className="flex flex-col justify-center gap-4 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 ">
          
          <p className={`${lusitana.className} antialiased text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            Welcome to <strong>Fruit Market Management System</strong> <br/>
           
          </p>
          <Link
            href="/home"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Get Started</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-2/5  ">
          
          <Image 
            src="/hero-desktop.png"
            width={750}
            height={500}
            className="hidden md:block"
            alt='Screenshot of the invoices dashboard'
            />
            <Image 
            src="/hero-desktop.png"
            width={1000}
            height={600}
            className="block md:hidden"
            alt='Screenshot of the invoices dashboard'
            />
         
        </div>
      </div>
    </main>
  );
}
