// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.


export type NewUserPaymentObject={
  fname:string,
  lname:string,
  fathername:string,
  place:string,
  payment_type:string,
  note:string,
  amount:number,
  [key:string]:any


}

export type ExistingPayment={
  customer_id:number;
  payment_type:string;
  note:string;
  amount:number
}

export type DashboardTran={
  id:number;
  fname:string;
  lname:string;
  tran_id:number;
  totalexp:number
}

export type DayBookTran={
  id:number;
  fname:string;
  lname:string;
  tran_id:number;
  totalexp:number;
  tran_date:string
}
export type EditTranObject={
  tran_id:number,
  customer_id:number,
  fname:string,
  lname:string,
  fathername:string,
  place:string,
  tran_date:string,
  trantype:number,
  vhtype:number,
  vhno:string,
  cooli:number,
  kirai:number,
  commission:number,
  fruits_array:Fruit[] 
}

export type DashBoardTranObject={
  transaction_details:DashboardTran;
  fruits_array:Fruit[]
}

export type TranObject={
  tran_id:number;
  customer_id:number;
  tran_date:string;
  trantype:number;
  vhtype:number;
  vhno:string;
  cooli:number;
  kirai:number;
  commission:number
}

export type ExistingUserTranObject={
  customer_id:number,
  tran_date:string;
  trantype:number;
  vhtype:number;
  vhno:string;
  cooli:number;
  kirai:number;
  commission:number;
  
  [key:string]:any
}


export type DayBookTranObject={
  transaction_details:DayBookTran;
  fruits_array:Fruit[]
}

export const Mangotypes: string[] = ["","Chinna Rasam","Pedha Rasam", "Totapuri","Banginapalli","Cheruku Rasam"];


export type MartketCustomer ={
  id:number;
  fname:string;
  lname:string;
  father:string;
  place:string;
}

export type Fruit={
  mangotype:number;
  rate:number;
  weight:number;
  [key:string]:any
}

export type FruitArray=Array<Fruit>

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type EntryPageObject={
  fname:string;
  lname:string;
  place:string;
  fathernamne:string;
  date:string;
  vhno:string;
  cooli:number;
  kirai:number
  commission:number;
  vhtype:number
}

// 
export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};
