import ExistingCustomerEntry from "@/app/components/entry/existing-customer-form";
import { fetchAllMarketCustomers } from "@/app/lib/read";

export default async function Page(){
    const customers=await fetchAllMarketCustomers();
return(
    <>
    <ExistingCustomerEntry customers={customers}/>
    </>
)
} 