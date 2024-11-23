import '@/app/ui/global.css'
import '@/app/ui/fonts'
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Fruit Market Management System",
  description: "A comprehensive Fruit Market Management System for tracking imports, exports, transactions, and billing. Features include dashboards, daybooks, account ledgers, and automated calculations.",
  authors:{name:"Yarra Kiran Kumar"},
  keywords:["fruit market software","market management system","transaction tracking", "import export tracking", "dashboard for market"]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
} 
