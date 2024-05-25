'use client'

import { updatePayment } from "@/app/lib/update-delete"

export default  function EditPaymentTable({paymentObj,customerObj}:{paymentObj:any,customerObj:any}){

    const handleSubmit = async ()=>{
       await updatePayment(paymentObj)

    }

    function handleRadioButton(e:any){
    paymentObj.payment_type=e.target.value
    }

    return(
        <>
        <h1 className="text-blue-500 text-3xl">
            {customerObj.fname}{' '}{customerObj.lname}{' '}S/o-{customerObj.father}
            </h1>
            <br></br>
        <label >Select a payment type</label>
        <br></br>
        <input type="radio" id="credit" name="typeofpayment" value={0} 
        defaultChecked={paymentObj.payment_type===0}
        onChange={(e)=>handleRadioButton(e)} required></input>

        <label htmlFor="credit">Credit</label>
        <input type="radio" id="debit" name="typeofpayment" value={1}
        defaultChecked={paymentObj.payment_type===1}
        onChange={(e)=>handleRadioButton(e)} required></input>
        <label htmlFor="debit">Debit</label>
        <br></br>
        <br></br>


        <label htmlFor="note" >Add any note</label>
        <input type="text" id="note" name="note" 
        onChange={(e)=>paymentObj.note=e.target.value}
        defaultValue={paymentObj.note}></input>
        <br></br>
        <br></br>


        <label htmlFor="amount">Enter Amount:</label>
        <input type="number" id="amount" name="amount" 
        defaultValue={paymentObj.amount}
        onChange={(e)=>paymentObj.amount=Number(e.target.value)} required ></input>
        <br></br>
        <br></br>

        {/* {!allDetailsCorrect&&<span className="text-red-500">Please add correct details</span>} */}
        <button type="button" className="bg-blue-500 rounded-md" onClick={handleSubmit}>Submit</button>
        </>
    )
}