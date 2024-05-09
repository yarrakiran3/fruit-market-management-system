'use server';
import { sql

 } from "@vercel/postgres";

 import { unstable_noStore as noStore } from 'next/cache';

 import { DashboardTran, Fruit,TranObject } from "./definitions";


export  async function fetchTransactionsForDashboard(){
    noStore();
    try{
        const trasnastionsForDasboard:TranObject[]=[]

        const transacionsWithCustomerID=await sql<DashboardTran>`
        select market_customers.id,market_customers.fname,market_customers.lname,
        transactions.tran_id,transactions.totalexp
        from market_customers
        join transactions on market_customers.id=transactions.cutomer_id 
        order by transactions.tran_id desc
        limit 2
        `
        
        for (const tran of transacionsWithCustomerID.rows){
                try{
                    const mangoes = await sql<Fruit>`
                        select mangotype, rate, weight from mangoes
                        where tran_id=${tran.tran_id}
                        `;
                    
                        const dashboardTran: TranObject = {
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