import { fetchTransactionsForDashboard } from "@/app/lib/read";
import { Mangotypes } from "@/app/lib/definitions";
import {  DeleteTransaction, UpdateTransaction } from "@/app/components/dashboard/buttons";

export default async function DashBoardTable(){
    const dashBoardTransactions=await fetchTransactionsForDashboard();

    return(
        
        <table cellPadding={10} className="border border-sky-500" >
            <thead className="border border-sky-500">
                <tr className="border border-sky-500">
                <th className="border border-sky-500" >customer_id</th>
                <th className="border border-sky-500" >customer name</th>
                <th className="border border-sky-500" >total exp</th>
                <th className="border border-sky-500" >Mangoes</th>
                <th className="border border-sky-500" >Update</th>
                <th className="border border-sky-500" >Delete</th>
                </tr>
            </thead>
            <tbody className="text-center">

        
            {dashBoardTransactions.map((tran)=>{
            return(
                <tr key={tran.transaction_details.tran_id} className="border border-sky-500">
                    <td className="border border-sky-500">{tran.transaction_details.id}</td>
                    <td className="border border-sky-500">{tran.transaction_details.fname}  {tran.transaction_details.lname}</td>
                    <td className="border border-sky-500">{tran.transaction_details.totalexp}</td>
                    <td className="border border-sky-500">
                        <table cellPadding={5}>
                            <tbody>
                                {tran.fruits_array.map((fruit,index)=>{

                                    return (
                                    <tr key={index} className="text-center">
                                        <td>{Mangotypes[fruit.mangotype]}</td>
                                        <td>{fruit.rate}</td>
                                        <td>{fruit.weight}</td>

                                    </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </td>
                    <td className="border border-sky-500"><UpdateTransaction tran_id={tran.transaction_details.tran_id} /></td>
                    <td className="border border-sky-500"><DeleteTransaction tran_id={tran.transaction_details.tran_id} /></td>

                </tr>

            )
            })}
            </tbody>
        </table>
    )
}