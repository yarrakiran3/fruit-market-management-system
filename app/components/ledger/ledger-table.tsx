'use client'
import { MartketCustomer } from "@/app/lib/definitions";
import { getAccountLedger } from "@/app/lib/read";
import { LatestInvoicesSkeleton } from "@/app/ui/skeletons";
import { useEffect, useState } from "react";
import { DeleteLedger, UpdateLedger } from "./ledger-buttons";
import { unstable_noStore } from "next/cache";

export default function LedgerSearch({customers}:{customers:MartketCustomer[]} 
){
    const [customerId,setCustomerId]=useState(0);
    const [customerIsSelected,setCustomerIsSelected]=useState(false);
    const [isFetched,setIsFetched]=useState(false);
    const [ledgerData,setLedgerData]=useState<any>();

    const handleChange=(e:any)=>{
        setCustomerId(e.target.value)
        setLedgerData(null)
    }
    function handleClick(){
        if(customerId!=0){
            setCustomerIsSelected(true)
            setIsFetched(false)
            // console.log('is selected')
        }
    }

    useEffect(()=>{
        if(customerId!=0&&customerIsSelected){
            const getLedger=async()=>{
                unstable_noStore();
                const allRecords=await getAccountLedger(customerId);
                if(allRecords!=undefined){
                    setLedgerData(allRecords)
                    setCustomerIsSelected(false)
                    setIsFetched(true)
                    console.log(allRecords)
                }
            };getLedger()
        }
        
    },[customerIsSelected])

    return(
        <>
        <label htmlFor="customer">Select a customer</label>
        <select  id="customer" name="customer" 
        value={customerId}
        onChange={handleChange}>
            <option>Select</option>
            {customers.map((customer,index)=>{
                return <option key={customer.id} value={customer.id}>
                    {customer.id}{'-'}{customer.fname}{' '}{customer.lname}{' S/o -'}{customer.father}
                </option>
            })}

        </select>
        <button type="button" className="bg-blue-500 mt-4 rounded-md text-white" onClick={handleClick}>Get Ledger</button>
        {customerIsSelected&&<LatestInvoicesSkeleton/>}
        {isFetched&&<LedgerTable ledgerData={ledgerData}/>}
        </>
    )
    
}

export function LedgerTable({ledgerData}:{ledgerData:any}){
return(
    <table cellPadding={10} className="border border-sky-500" >
            <thead className="border border-sky-500">
                <tr className="border border-sky-500">
                <th className="border border-sky-500" >Transaction/Payment</th>
                <th className="border border-sky-500" >Credit</th>
                <th className="border border-sky-500" >Debit</th>
                <th className="border border-sky-500" >Update</th>
                </tr>
            </thead>
            <tbody className="text-center">

        
            {ledgerData.map((record:any)=>{
            return(
                <tr key={record.ledger_id} className="border border-sky-500">
                    {record.tran_id!=null&&record.payment_id==null&&<td className="border border-sky-500">Transaction</td>}
                    {record.payment_id!=null&&record.tran_id==null&&<td className="border border-sky-500">Payment</td>}
                    <td className="border border-sky-500">{record.credit}</td>
                    <td className="border border-sky-500">{record.debit}</td>
                    <td className="border border-sky-500"><UpdateLedger tran_id={record.tran_id} payment_id={record.payment_id}  /></td>

                </tr>)
            })}
            </tbody>
        </table>
)
}