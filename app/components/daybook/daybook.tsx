import { Mangotypes, DayBookTranObject } from "@/app/lib/definitions"

export default  function DayBookTable({dayBookTrans}:{dayBookTrans:DayBookTranObject[]}) {
    
        return (
        <>
        <table cellPadding={10} >
            <thead>
                <tr>
                <th>customer_id</th>
                <th>customer name</th>
                <th>total exp</th>
                <th>Mangoes</th>
                </tr>
            </thead>
            <tbody className="text-center">

        
            {dayBookTrans.map((tran)=>{
            return(
                <tr key={tran.transaction_details.tran_id}>
                    <td>{tran.transaction_details.id}</td>
                    <td>{tran.transaction_details.fname}  {tran.transaction_details.lname}</td>
                    <td>{tran.transaction_details.totalexp}</td>
                    <td>
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
                </tr>
            )
            })}
            </tbody>
        </table>
        </>
        )
    
}