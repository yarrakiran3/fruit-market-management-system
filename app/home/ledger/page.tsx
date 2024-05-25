
import LedgerSearch from '@/app/components/ledger/ledger-table';
import LedgerTable from '@/app/components/ledger/ledger-table';
import { fetchAllMarketCustomers } from '@/app/lib/read';

export default async function Ledger(){

    const customers=await fetchAllMarketCustomers();
    
    

    return (
        <>
        <LedgerSearch customers={customers}/>
        </>
        

    )



    
}