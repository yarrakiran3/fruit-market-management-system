'use server';
import { sql } from "@vercel/postgres";
import { revalidatePath, unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";
import { EditTranObject, ExistingPayment, ExistingUserTranObject, Fruit } from "./definitions";
import {z} from 'zod'

export async function updateTransation({transaction,tran_id}:{transaction:EditTranObject,tran_id:number}){
  unstable_noStore();
  const totalExp=transaction.cooli+transaction.kirai+transaction.commission;
try{
console.log(Number(tran_id),transaction.tran_id)
const numer=await sql`
select * from mangoes where tran_id=${Number(transaction.tran_id)}`  
console.log(numer.rows.length)
if(numer.rows.length>0){
  const deleteFruits=await sql`
  delete from mangoes where tran_id=${Number(transaction.tran_id)}`
  ;
  console.log('Deleted')
}
else {
  console.log('No mangoes found')
}
 
const updateTransactionTable=await sql`
update transactions
set tran_date=${transaction.tran_date}, vhtype=${transaction.vhtype}, vhno=${transaction.vhno}, 
cooli=${transaction.cooli}, kirai=${transaction.kirai}, commission=${transaction.commission},
 totalexp=${totalExp} where tran_id=${tran_id}
`
console.log(transaction.fruits_array)
let finalAmount=0;
for(const fruit of transaction.fruits_array){
    const totalFruitAmount =fruit.rate*fruit.weight;
    finalAmount+=totalFruitAmount
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
if(transaction.trantype===1){
  finalAmount=finalAmount-totalExp
  const updateLedger=await sql`
  update ledger
  set credit=${finalAmount}
  where tran_id=${transaction.tran_id}
  `;
  console.log('Credit updated')
}else if(transaction.trantype===1){
  finalAmount=finalAmount+totalExp;
  const updateLedger=await sql`
  update ledger
  set debit=${finalAmount}
  where tran_id=${transaction.tran_id}
  `;
  console.log('Debit updated')

}



}catch(e){
console.log(e)
throw new Error('Database error')
}


revalidatePath('/home/dashboard')
redirect('/home/dashboard')
}



export async function deleteTransaction({tran_id}:{tran_id:number}) {
  unstable_noStore();

const deleteFruits=await sql`
delete from mangoes where tran_id=${tran_id}
`
const deleteTran =await sql`
delete from transactions where tran_id=${tran_id}`


revalidatePath('/home/dashboard')
redirect('/home/dashboard')

}



export async function addPaymentForExisting({existingPaymentObj}:{existingPaymentObj:ExistingPayment}){
  unstable_noStore();

  const presentDate=new Date().toISOString();

  // console.log(existingPaymentObj)
try{

  const addPayment=await sql`
  insert into payments (customer_id, payment_type,note,amount,created_at)
  values (${existingPaymentObj.customer_id},${Number(existingPaymentObj.payment_type)},
    ${existingPaymentObj.note},${existingPaymentObj.amount},${presentDate})
    returning payment_id
  `
  const payment_id=addPayment.rows[0].payment_id

  
if(Number(existingPaymentObj.payment_type)===0){

  const addLedgerRecord=await sql`
  insert into ledger (customer_id,payment_id,credit,created_at)
  values (${existingPaymentObj.customer_id},${payment_id},${existingPaymentObj.amount},${presentDate})
  `
}else if (Number(existingPaymentObj.payment_type)===1){

  const addLedgerRecord=await sql`
  insert into ledger (customer_id,tran_id,debit,created_at)
  values (${existingPaymentObj.customer_id},${payment_id},${existingPaymentObj.amount},${presentDate})
  `
}


} catch(e){
  console.log(e)
  throw new Error('Database Error')
}

revalidatePath('/home/ledger')
redirect('/home/ledger')

}



export async function updatePayment(paymentObject:any){
  unstable_noStore();
  const presentDate=new Date().toISOString();

  try{
    console.log(paymentObject)
    const update=await sql`
  update payments 
  set note=${paymentObject.note}, amount=${paymentObject.amount},
  payment_type=${paymentObject.payment_type} , created_at=${presentDate}
  where payment_id=${paymentObject.payment_id}
  `;

  

  if(Number(paymentObject.payment_type)===0){
    console.log(paymentObject.payment_type)
    const addLedgerRecord=await sql`
    update ledger 
    set credit=${Number(paymentObject.amount)},debit=null,
    created_at=${presentDate} where payment_id=${Number(paymentObject.payment_id)}
    `
  }else if (Number(paymentObject.payment_type)===1){
    console.log(paymentObject.payment_type)
    const addLedgerRecord=await sql`
    update ledger 
    set debit=${Number(paymentObject.amount)},credit=null,
    created_at=${presentDate} where payment_id=${Number(paymentObject.payment_id)}
    `
  }

  }catch(e){
    console.log(e);
    throw new Error('Database Error')
  }
  revalidatePath('/home/ledger')
  redirect('/home/ledger')
  
}



const TranForExistingObject=z.object(
  {
    commsission:z.coerce.number(),
    cooli:z.coerce.number(),
    kirai:z.coerce.number(),
    customer_id:z.coerce.number(),
    trantype:z.coerce.number(),
    vhtype:z.coerce.number(),
    vhno:z.string(),
    date:z.string(),

  }
)

export default async function addTranForExistingCustomer(
  {existingUserTranObject,fruitsArray}:{existingUserTranObject:ExistingUserTranObject,fruitsArray:Fruit[]}){

    const {customer_id,trantype,date,vhno,vhtype,cooli,kirai,commsission}=TranForExistingObject.parse({

    
      customer_id:existingUserTranObject.customer_id,
      trantype:existingUserTranObject.trantype,
      date:existingUserTranObject.tran_date,
      cooli:existingUserTranObject.cooli,
      kirai:existingUserTranObject.kirai,
      commsission:existingUserTranObject.commission,
      vhno:existingUserTranObject.vhno,
      vhtype:existingUserTranObject.vhtype
    }
    )
    const totalExp=Number(existingUserTranObject.cooli)+Number(existingUserTranObject.kirai)+Number(existingUserTranObject.commission);

try{
const add=await sql`
insert into transactions (customer_id,tran_date,trantype,vhtype,vhno,cooli,kirai,commission,totalExp)
values (${customer_id},${date},${trantype},${vhtype},${vhno},${cooli},${kirai},${commsission},${totalExp})
returning tran_id
`
const transaction_id=add.rows[0].tran_id;

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
  console.log('Added Tran')
}
}catch(e){
  console.log(e);
  throw new Error('DB error')
}

redirect('/home/entry')

}