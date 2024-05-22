'use server';
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { EditTranObject } from "./definitions";

export async function updateTransation({transaction,tran_id}:{transaction:EditTranObject,tran_id:number}){
const totalExp=transaction.cooli+transaction.kirai+transaction.commission;
try{
    const updateTransactionTable=await sql`
update transactions
set tran_date=${transaction.tran_date}, vhtype=${transaction.vhtype}, vhno=${transaction.vhno}, 
cooli=${transaction.cooli}, kirai=${transaction.kirai}, commission=${transaction.commission},
 totalexp=${totalExp} where tran_id=${tran_id}
`
const deleteFruits=await sql`
delete from mangoes where tran_id=${tran_id}
`

for(const fruit of transaction.fruits_array){
    const totalFruitAmount =fruit.rate*fruit.weight;
    const presentDate=new Date().toISOString();
    // console.log(presentDate)
    await sql`
    insert into mangoes (tran_id,mangotype,rate,weight,total,created_at)
    values (${tran_id},${fruit.mangotype},${fruit.rate},${fruit.weight},${totalFruitAmount},${presentDate});
    `
  }

const updateCustomerTable =await sql`
update market_customers
set fname=${transaction.fname},lname=${transaction.lname},place=${transaction.place},father=${transaction.fathername}
where id=${transaction.customer_id}
`


}catch(e){
console.log(e)
throw new Error('Database error')
}


revalidatePath('/home/dashboard')
redirect('/home/dashboard')
}

export async function deleteTransaction({tran_id}:{tran_id:number}) {
const deleteFruits=await sql`
delete from mangoes where tran_id=${tran_id}
`
const deleteTran =await sql`
delete from transactions where tran_id=${tran_id}`


revalidatePath('/home/dashboard')
redirect('/home/dashboard')

}