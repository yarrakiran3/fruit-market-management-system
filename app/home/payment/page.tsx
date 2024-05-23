import { CreatePaymentForNewCustomer } from "@/app/components/payment/payment-buttons"
import PaymentForm from "@/app/components/payment/payment-form"
import { fetchAllMarketCustomers } from "@/app/lib/read"
import { LatestInvoicesSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

export default async function Payment(){
const customers=await fetchAllMarketCustomers();

return(

        <>
        <CreatePaymentForNewCustomer/>
        <br></br>
        <PaymentForm customers={customers}/>


        </>
    )
}