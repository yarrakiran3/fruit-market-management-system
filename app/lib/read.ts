'use server';
import { sql

 } from "@vercel/postgres";

 import { unstable_noStore as noStore } from 'next/cache';

 import { DashBoardTranObject, DashboardTran, DayBookTran, DayBookTranObject, Fruit } from "./definitions";


export  async function fetchTransactionsForDashboard(){
    noStore();
    try{
        const trasnastionsForDasboard:DashBoardTranObject[]=[]

        const transacionsWithCustomerID=await sql<DashboardTran>`
        select market_customers.id,market_customers.fname,market_customers.lname,
        transactions.tran_id,transactions.totalexp
        from market_customers
        join transactions on market_customers.id=transactions.cutomer_id 
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
        join transactions on market_customers.id=transactions.cutomer_id 
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