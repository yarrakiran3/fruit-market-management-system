'use client'
import DashBoardTable from "@/app/components/dashboard/dashboard-table";
import { DashBoardTranObject } from "@/app/lib/definitions";
import { fetchTransactionsForDashboard } from "@/app/lib/read";
import {useState,useEffect} from "react";
import { ClipLoader } from "react-spinners";

export default  function Page(){
    const [dashBoardTrans,setDashBoardTrans]=useState<DashBoardTranObject[]>([])
    const [isLoading,setIsLoading]=useState(true)

    useEffect(()=>{
        
        const dashBoardTranFetch = async ()=>{
            try{
                const dashBoardTransactions=await fetchTransactionsForDashboard();
                setDashBoardTrans(dashBoardTransactions);
                setIsLoading(false);

            }catch(e){
                console.log(e)
            }
        };
        dashBoardTranFetch(); 
    },[isLoading]);
    

    return(
        <>
        {isLoading&&<ClipLoader/>}
        <br></br>
        {!isLoading&&<DashBoardTable transactionsForDashboard={dashBoardTrans}/>}
        </>
    )

   
}
