
import EditForm from "@/app/components/dashboard/edit-form";
import { fetchTransaction } from "@/app/lib/read"
import { updateTransation } from "@/app/lib/update-delete";

export default async function EditTransaction({params}:{params:{id:number}}){
const transaction=await fetchTransaction(params.id);



    return(
        <>
        <EditForm transaction={transaction} />
        </>
        
    )
}