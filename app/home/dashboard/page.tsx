import { CreateTransaction } from "@/app/components/dashboard/buttons";
import DashBoardTable from "@/app/components/dashboard/dashboard-table";
import { DashBoardTranObject, Mangotypes } from "@/app/lib/definitions";
import { LatestInvoicesSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";


export default  async function Page(){
    
    
    

    return(
        <>
        <div className="flex">
        <h1 className="text-blue-500 text-3xl flex-items ">Latest Transactions</h1>
        
        <CreateTransaction ></CreateTransaction>

        </div>
        
        
        <br></br>
        <br></br>
        <Suspense fallback={<LatestInvoicesSkeleton/>}>
            <DashBoardTable />
        </Suspense>
        
        
        
        </>
    )

   
}
