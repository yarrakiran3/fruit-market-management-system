'use server';
import {sql} from '@vercel/postgres'

 import { unstable_noStore as noStore, revalidatePath } from 'next/cache';

 import { DashBoardTranObject, DashboardTran, DayBookTran, DayBookTranObject, Fruit, FruitArray, MartketCustomer, TranObject } from "./definitions";


export  async function fetchTransactionsForDashboard(){
    noStore();
    try{
        const trasnastionsForDasboard:DashBoardTranObject[]=[]

        const transacionsWithCustomerID=await sql<DashboardTran>`
        select market_customers.id,market_customers.fname,market_customers.lname,
        transactions.tran_id,transactions.totalexp
        from market_customers
        join transactions on market_customers.id=transactions.customer_id 
        order by transactions.tran_id desc
        limit 10
        `
        
        for (const tran of transacionsWithCustomerID.rows){
                try{
                    const mangoes = await sql<Fruit>`
                        select mangotype, rate, weight from mangoes
                        where tran_id=${tran.tran_id}
                        `;
                    
                        const dashboardTran: DashBoardTranObject = {
                            transaction_details: tran,
                            fruits_array: mangoes.rows,
                          };
                          trasnastionsForDasboard.push(dashboardTran)

                }catch(error){
                    console.log(error)
                    throw new Error("Fetch failed")
                }
        }
        // console.log(trasnastionsForDasboard)
        return trasnastionsForDasboard;

            


    } catch(error){
        console.error('Database error',error)
        throw new Error('Failed to fetch')

    }
}

export  async function fetchTransactionsForDayBook({dateToRender}:{dateToRender:string}){
    noStore();
    try{
        const trasnastionsForDayBook:DayBookTranObject[]=[]

        const transacionsForDaybookWithCustomerID=await sql<DayBookTran>`
        select market_customers.id,market_customers.fname,market_customers.lname,
        transactions.tran_id,transactions.totalexp, transactions.tran_date
        from market_customers
        join transactions on market_customers.id=transactions.customer_id 
        where transactions.tran_date=${dateToRender}
        order by transactions.tran_id desc        
        `
        // console.log(transacionsForDaybookWithCustomerID.rows)

        for (const tran of transacionsForDaybookWithCustomerID.rows){
                try{
                    const mangoes = await sql<Fruit>`
                        select mangotype, rate, weight from mangoes
                        where tran_id=${tran.tran_id}
                        `;
                    
                        const dashboardTran: DayBookTranObject = {
                            transaction_details: tran,
                            fruits_array: mangoes.rows,
                          };
                          trasnastionsForDayBook.push(dashboardTran)

                }catch(error){
                    console.log(error)
                    throw new Error("Fetch failed")
                }
        }
        // console.log(trasnastionsForDayBook)
        return trasnastionsForDayBook;

            


    } catch(error){
        console.error('Database error',error)
        throw new Error('Failed to fetch')

    }
}

export async function fetchTransaction(tid:number) {
    noStore();
    try{
        const transaction=await sql<TranObject>`
    select tran_id,customer_id,tran_date,trantype,vhtype,vhno,cooli,kirai,commission from transactions where tran_id=${tid}
    `
    // console.log(transaction)

    const furits =await sql<Fruit>`
    select mangotype,rate,weight from mangoes where tran_id=${tid}
    `
    // console.log(furits)

    
    return {transaction,furits}

    // const tranObjectToEdit={
    //     tran_id:tid,
    //     customer_id:customer.rows[0].id,
    //     fname:customer.rows[0].fname,
    //     lname:customer.rows[0].lname,
    //     fathername:customer.rows[0].father,
    //     place:customer.rows[0].place,
    //     tran_date:transaction.rows[0].tran_date,
    //     vhtype:transaction.rows[0].vhtype,
    //     vhno:transaction.rows[0].vhno,
    //     cooli:transaction.rows[0].cooli,
    //     kirai:transaction.rows[0].kirai,
    //     commission:transaction.rows[0].commission,
    //     fruits_array:furits.rows    
    // }
    // console.log(tranObjectToEdit)
    // return tranObjectToEdit

        
    }

    

     catch(e){
        console.log(e)
        throw new Error('Database Error')
    }

    

    
    
}

export async function fetchCustomerByID(customer_id:number) {
    noStore();
   const customer=await sql<MartketCustomer>`
    select * from market_customers where id=${customer_id}
    `; 
    return customer
;}

export async function fetchAllMarketCustomers() {
    noStore()
    const customer=await sql<MartketCustomer>`
     select * from market_customers order by id desc
     `; 
     return customer.rows
 ;}

 export async function fetchTransactionsForLedger({id}:{id:number}) {
    noStore();
    try{
        

        const transactionsForLedger=await sql<TranObject>`
        select * from transactions where customer_id=${id}
        `
        const paymentsForLedger=await sql<MartketCustomer>`
        select * from payments where customer_id=${id}
        `
        const ledgerObject={
            transactions:transactionsForLedger.rows,
            payments:paymentsForLedger.rows
        }
        return ledgerObject;
    }catch(e){
        console.log(e)
    }

 }

 export async function searchCustomer({searchString}:{searchString:string}) {
    noStore();
    let market_customers:MartketCustomer[];
    try{
    const customers=await sql<MartketCustomer>`
    SELECT *
FROM market_customers
WHERE fname ILIKE ${`%${searchString}%`}
  OR lname ILIKE ${`%${searchString}%`}
  OR father ILIKE ${`%${searchString}%`};
       `
       market_customers=customers.rows
       return market_customers
 }catch(e){
console.log(e)
 }
 }

 export async function getAccountLedger(customer_id:number) {
    noStore();
    try{
        const getLedger=await sql`
    select * from ledger where customer_id=${customer_id}
    `
        console.log(getLedger.rows)
        return getLedger.rows
    }
    catch(e){
        console.log(e)
    }
 }

 export async function getPaymentForEdit(id:number) {
    noStore()
    try{
        const payment=await sql`
    select * from payments where payment_id=${id}
    `
    const paymentCustomer=await sql`
    select * from market_customers where id=${payment.rows[0].customer_id}
    `
    return {paymentObject:payment.rows[0],customerObject:paymentCustomer.rows[0]}

    }catch(e){
        console.log(e)
    }
    
 }