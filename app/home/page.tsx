import Link from "next/link";
import AcmeLogo from "../components/kgn-logo";
import { lusitana } from "../ui/fonts";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
export default async  function Home(){
    return(
        <>
        <main className="flex min-h-screen flex-col p-6">
      
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          
          <p className={`${lusitana.className} antialiased text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            Welcome to <strong>KGN Mango Company.</strong> <br/>This website is built by {' '}
            <a href="https://shaunith-technologies-company-website.vercel.app/" target="_blank" className="text-blue-500">
              Shaunith Technologies
            </a>
           
          </p>
         
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          
          <Image 
            src="/hero-desktop.png"
            width={1000}
            height={760}
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
        </>
    )
}