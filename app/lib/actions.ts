'use server';
 import { sql } from "@vercel/postgres";
import { z } from "zod";
import { redirect } from 'next/navigation';
import { revalidatePath } from "next/cache";


 
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});
 
const CreateInvoice = FormSchema.omit({ id: true, date: true });


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



export async function addAnEntry(inputs:Object,fruitsArray:Array<Object>){

  

console.log(inputs)
console.log(fruitsArray)

// revalidatePath('/home/entry')
redirect('/home/entry')

  // const {fname,lname,place,father}=FormSchema.parse({
  //   fname:formData.get('fname'),
  //   lname:formData.get('lname'),
  //   place:formData.get('place'),
  //   father:formData.get('fathername')

  // })

// await sql`
// insert into market_customers (fname,lname,place,father)
// values (${fname},${lname},${place},${father})
// `  

}