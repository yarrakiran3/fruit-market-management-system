
import EditForm from "@/app/components/dashboard/edit-form";
import { fetchCustomerByID, fetchTransaction } from "@/app/lib/read"
import { updateTransation } from "@/app/lib/update-delete";
import { notFound } from "next/navigation";

export default async function EditTransaction({params}:{params:{id:number}}){
const {transaction,furits}=await fetchTransaction(params.id);
if(!transaction.rows[0]){
    notFound()
}
const customer = await fetchCustomerByID(transaction.rows[0].customer_id)

const tranObjectToEdit={
        tran_id:params.id,
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


    return(
        <>
        <EditForm transaction={tranObjectToEdit} />
        </>
        
    )
}