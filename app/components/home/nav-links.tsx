
import {
  BookOpenIcon,
  ListBulletIcon,
  CurrencyRupeeIcon,
  UserPlusIcon,
  TableCellsIcon,
  WalletIcon
} from '@heroicons/react/24/outline';

import Link from 'next/link'
import clsx from 'clsx';
import { usePathname } from 'next/navigation';


 const links= [
  {title:"Day Book",
    href:"/home/daybook",
    icon:BookOpenIcon
  },
  {title:"Dashboard",
    href:"/home/dashboard",
    icon:ListBulletIcon
  },
  {title:"Add an Entry",
    href:"/home/entry",
    icon:UserPlusIcon
  },
  {title:"Account Ledger",
    href:"/home/ledger",
    icon:TableCellsIcon
  },
  {title:"Payment",
    href:"/home/payment",
    icon:CurrencyRupeeIcon
  },
  // {title:"Summary",
  //   href:"/home/summary",
  //   icon:WalletIcon
  // },
  
]

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.title}
            href={link.href}
            className={clsx
              ('flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
            },)}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.title}</p>
          </Link>
        );
      })}
    </>
  );
}
