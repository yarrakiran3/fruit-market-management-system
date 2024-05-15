'use server';
import { sql

 } from "@vercel/postgres";

 import { unstable_noStore as noStore } from 'next/cache';

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
        console.log(transacionsForDaybookWithCustomerID.rows)

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
    try{

        const transaction=await sql<TranObject>`
    select tran_id,customer_id,tran_date,vhtype,vhno,cooli,kirai,commission from transactions where tran_id=${tid}
    `

    const furits =await sql<Fruit>`
    select mangotype,rate,weight from mangoes where tran_id=${tid}
    `

    const customer=await sql<MartketCustomer>`
    select * from market_customers where id=${transaction.rows[0].customer_id}
    `;

    const tranObjectToEdit={
        tran_id:tid,
        customer_id:customer.rows[0].id,
        fname:customer.rows[0].fname,
        lname:customer.rows[0].lname,
        fathername:customer.rows[0].father,
        place:customer.rows[0].place,
        tran_date:transaction.rows[0].tran_date,
        vhtype:transaction.rows[0].vhtype,
        vhno:transaction.rows[0].vhno,
        cooli:transaction.rows[0].cooli,
        kirai:transaction.rows[0].kirai,
        commission:transaction.rows[0].commission,
        fruits_array:furits.rows    
    }
    // console.log(tranObjectToEdit)
    return tranObjectToEdit

        
    }

    

     catch(e){
        console.log(e)
        throw new Error('Database Error')
    }

    

    
    
}
