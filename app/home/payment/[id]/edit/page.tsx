import EditPaymentTable from "@/app/components/payment/edit-payment-form";
import { getPaymentForEdit } from "@/app/lib/read";

export default async function  EditPayment({params}:{params:{id:number}}){
    const paymentObject=await getPaymentForEdit(params.id);
    
return(
    <>
    <EditPaymentTable 
    paymentObj={paymentObject?.paymentObject} 
    customerObj={paymentObject?.customerObject}/>
    </>
)
}