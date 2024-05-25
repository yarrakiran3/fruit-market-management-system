'use client'
import { MartketCustomer } from "@/app/lib/definitions";
import { ExistingPayment } from "@/app/lib/definitions";
import { addPaymentForExisting } from "@/app/lib/update-delete";
import { useState } from "react";
import { SyncLoader } from "react-spinners";

export default function PaymentForm({customers}:{customers:MartketCustomer[]}){
    const [paymentObj,setPaymentObj]=useState<ExistingPayment>(
        {
            customer_id:0,
            payment_type:'',
            note:"",
            amount:0
        }
    );
    const [allDetailsCorrect,setAllDetailsAreCorrect]=useState(true)
    const [selectedOption, setSelectedOption] = useState('');
    const [submitClicked,setSubmitClicked]=useState(false);

    function handSelectInput(e:any){
        const updated_paymentObj={...paymentObj}
        
        updated_paymentObj.customer_id=e.target.value
        setPaymentObj(updated_paymentObj)
        setAllDetailsAreCorrect(true)

    }
    function handleRadioButton(e:any){
        const updated_paymentObj={...paymentObj}
            updated_paymentObj.payment_type=e.target.value
            setPaymentObj(updated_paymentObj)
            setSelectedOption(e.target.value)

        setAllDetailsAreCorrect(true)
    }
    function handleNoteChange(e:any){
        const updated_paymentObj={...paymentObj}

        updated_paymentObj.note=e.target.value
        setPaymentObj(updated_paymentObj)

        setAllDetailsAreCorrect(true)
    }
    function handleAmountChange(e:any){
        const updated_paymentObj={...paymentObj}

        updated_paymentObj.amount=e.target.value
        setPaymentObj(updated_paymentObj)

        setAllDetailsAreCorrect(true)
    }
    function handleSubmit(){
        if(paymentObj.customer_id!=null&&paymentObj.customer_id!=undefined&&paymentObj.customer_id>0
            &&(paymentObj.payment_type=='0'||paymentObj.payment_type=='1')
            &&paymentObj.amount>0){
                setSubmitClicked(true);
                addPaymentForExisting({existingPaymentObj:paymentObj})
                setSelectedOption('')
                // console.log(paymentObj)
                setPaymentObj({
                    customer_id:0,
                    payment_type:'',
                    note:"",
                    amount:0
                })

            } else{
                console.log(paymentObj)
                setAllDetailsAreCorrect(false)

            }
        
    }

    return(
        <>
        
            <label htmlFor="customer">Select a customer</label>
            <select 
                    id="customer"
                    name="customer"
                    onChange={handSelectInput}
                    value={paymentObj.customer_id}
                    >
            <option >Select a Customer</option> 
            {customers.map((customer)=>{
                return(
                    <option value={customer.id} key={customer.id} >
                        {customer.id}{'  -  '}{customer.fname}{' '}{customer.lname}{'S/o:'}
                        {customer.father}{'-'}{customer.place}
                    </option>
                )
            })}       
            </select>
            <br></br>
            <br></br>

            <label >Select a payment type</label>
            <input type="radio" id="credit" name="typeofpayment" value={0} 
            checked={selectedOption==='0'}
            onChange={handleRadioButton} required></input>
            <label htmlFor="credit">Credit</label>
            <input type="radio" id="debit" name="typeofpayment" value={1}
            checked={selectedOption==='1'}
            onChange={handleRadioButton} required></input>
            <label htmlFor="debit">Debit</label>
            <br></br>
            <br></br>


            <label htmlFor="note" >Add any note</label>
            <input type="text" id="note" name="note" 
            onChange={handleNoteChange}
            value={paymentObj.note}></input>
            <br></br>
            <br></br>


            <label htmlFor="amount">Enter Amount:</label>
            <input type="number" id="amount" name="amount" 
            value={paymentObj.amount}
            onChange={handleAmountChange} required ></input>
            <br></br>
            <br></br>

            {!allDetailsCorrect&&<span className="text-red-500">Please add correct details</span>}
            {!submitClicked&&<button type="button" className="bg-blue-500 rounded-md" onClick={handleSubmit}>Submit</button>
                }
                {submitClicked&&<SyncLoader/>}
        
        </>
    )
}