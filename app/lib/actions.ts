'use server';
 import { sql } from "@vercel/postgres";
import { coerce, z } from "zod";
import { redirect } from 'next/navigation';
import { revalidatePath, unstable_noStore } from "next/cache";
import { FruitArray, NewUserPaymentObject } from "./definitions";

const InvoiceFormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});
 
const CreateInvoice = InvoiceFormSchema.omit({ id: true, date: true });


export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
 
  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

   
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}







// const FormSchema = z.object({
//   fname:z.string(),
//   lname:z.string(),
//   place:z.string(),
//   father:z.string(),

// })

const FormSchema = z.object({
  
  fname:z.string(),
  lname:z.string(),
  fathername:z.string(),
  place:z.string(),
  trantype:coerce.number(),
  vhno:z.string(),
  vhtype:z.coerce.number(),
  cooli:z.coerce.number(),
  kirai:z.coerce.number(),
  commission:z.coerce.number(),
  date:z.string(),
  totalexp:z.coerce.number(),

});



export async function addAnEntry(inputs:any,fruitsArray:FruitArray){

  unstable_noStore();

console.log(inputs);
console.log(fruitsArray)


const {fname,lname,fathername,place,date,trantype,vhtype,vhno,cooli,kirai,commission,totalexp}=FormSchema.parse({
  fname:inputs.fname,
  lname:inputs.lname,
  fathername:inputs.fathername,
  place:inputs.place,
  date:inputs.date,
  trantype:inputs.trantype,
  vhtype:inputs.vhtype,
  vhno:inputs.vhno,
  cooli:inputs.cooli,
  kirai:inputs.kirai,
  commission:inputs.commission,
  totalexp:inputs.totalexp

})
const totalExp=kirai+commission+cooli;

const customerReturn=await sql`
insert into market_customers (fname,lname,father,place)
values (${fname},${lname},${fathername},${place})
returning id
`
const customer_id=customerReturn.rows[0].id


const tranReturn=await sql`
insert into transactions (customer_id,tran_date,trantype,vhtype,vhno,cooli,kirai,commission,totalExp)
values (${customer_id},${date},${trantype},${vhtype},${vhno},${cooli},${kirai},${commission},${totalExp})
returning tran_id
`

const transaction_id=tranReturn.rows[0].tran_id;
// console.log(transaction_id);

let allFruitsTotalAmount=0;
for(const fruit of fruitsArray){
  const totalFruitAmount =fruit.rate*fruit.weight;
  allFruitsTotalAmount+=totalFruitAmount
  const presentDate=new Date().toISOString();
  // console.log(presentDate)
  await sql`
  insert into mangoes (tran_id,mangotype,rate,weight,total,created_at)
  values (${transaction_id},${fruit.mangotype},${fruit.rate},${fruit.weight},${totalFruitAmount},${presentDate});
  `
}

const presentDate=new Date().toISOString();

if(trantype===1){
  allFruitsTotalAmount=allFruitsTotalAmount-totalExp;

  const addLedgerRecord=await sql`
  insert into ledger (customer_id,tran_id,credit,created_at)
  values (${customer_id},${transaction_id},${allFruitsTotalAmount},${presentDate})
  `
}else if (trantype===2){
  allFruitsTotalAmount=allFruitsTotalAmount+totalExp;

  const addLedgerRecord=await sql`
  insert into ledger (customer_id,tran_id,debit,created_at)
  values (${customer_id},${transaction_id},${allFruitsTotalAmount},${presentDate})
  `
}



revalidatePath('/home/dashboard')
redirect('/home/dashboard')

}

export async function addPayment({paymentObject}:{paymentObject:NewUserPaymentObject}){
  unstable_noStore();
  const presentDate=new Date().toISOString();

try{
const adduser=await sql`
insert into market_customers (fname,lname,father,place)
values (${paymentObject.fname},${paymentObject.lname},${paymentObject.fathername},${paymentObject.place})
returning id
`
const customer_id=adduser.rows[0].id;

const addpayment=await sql`
insert into payments (customer_id,payment_type,note,amount,created_at)
values (${customer_id},${Number(paymentObject.payment_type)},${paymentObject.note},${paymentObject.amount},${presentDate})
returning payment_id
`
const payment_id=addpayment.rows[0].payment_id;

if(Number(paymentObject.payment_type)===0){

  const addLedgerRecord=await sql`
  insert into ledger (customer_id,payment_id,credit,created_at)
  values (${customer_id},${payment_id},${paymentObject.amount},${presentDate})
  `
}else if (Number(paymentObject.payment_type)===1){

  const addLedgerRecord=await sql`
  insert into ledger (customer_id,tran_id,debit,created_at)
  values (${customer_id},${payment_id},${paymentObject.amount},${presentDate})
  `
}


}catch(e){
console.log(e);
}
redirect('/home/ledger')
}