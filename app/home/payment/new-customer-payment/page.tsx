'use client'

import { addPayment } from "@/app/lib/actions";
import { NewUserPaymentObject } from "@/app/lib/definitions";
import { useState } from "react"

export default function Page(){
    const [paymentObject,setPaymentObject]=useState<NewUserPaymentObject>(
        {
            fname:'',
            lname:'',
            fathername:'',
            place:'',
            payment_type:'',
            note:'',
            amount:0
          
        }
    );
    const [allDetailsCorrect,setAllDetailsAreCorrect]=useState(true)
    const [selectedOption, setSelectedOption] = useState('');

    function handleRadioButton(e:any){
        const updated_paymentObj={...paymentObject}
            updated_paymentObj.payment_type=e.target.value
            setPaymentObject(updated_paymentObj)
            setSelectedOption(e.target.value)
        setAllDetailsAreCorrect(true)
    }


    const handleChange=<T extends HTMLInputElement | HTMLSelectElement>(e:React.ChangeEvent<T>)=>{
        const {name,value}=e.target;
        const updatedPaymentObject={...paymentObject}
        updatedPaymentObject[name]=value
        // console.log(updatedPaymentObject)
        setPaymentObject(updatedPaymentObject)
        setAllDetailsAreCorrect(true)

    }

    function handleSubmit(){
        if(Number(paymentObject.amount)>0&&paymentObject.amount!=null&&paymentObject.amount!=undefined){
            console.log(paymentObject)
            addPayment({paymentObject:paymentObject})
            setSelectedOption('')
            setPaymentObject(
                {
                    fname:'',
                    lname:'',
                    fathername:'',
                    place:'',
                    payment_type:'',
                    note:'',
                    amount:0
                  
                }
            )
    
        }else{
            setAllDetailsAreCorrect(false)

        }

        
        


    }

    return(
    <form action={handleSubmit}>
     <label htmlFor="fname">First Name</label><br></br>
            <input type="text" id="fname" name="fname"  onChange={handleChange}  
            value={paymentObject.fname}
            required></input>
            <br></br>

            <label htmlFor="lname" >Last Name</label><br></br>
            <input type="text" id="lname" name="lname"  onChange={handleChange}  
            value={paymentObject.lname}
            required></input>
            <br></br>

            <label htmlFor="fathername" > S/O :</label><br></br>
            <input type="text" id="fathername" name="fathername"  
            onChange={handleChange} 
            value={paymentObject.fathername}
            required></input>
            <br></br>

            <label htmlFor="place" >Place</label><br></br>
            <input type="text" id="place" name="place"  onChange={handleChange} 
            value={paymentObject.place}
            required></input>
            <br></br>
            <br></br>

            <label >Select a payment type</label>
            <br></br>

            <input type="radio" id="credit" name="typeofpayment" value={"0"} 
            checked={selectedOption==='0'}
            onChange={handleRadioButton}
             required></input>
            <label htmlFor="credit">Credit</label>



            <input type="radio" id="debit" name="typeofpayment" value={"1"}
            checked={selectedOption==='1'}
            onChange={handleRadioButton} 
            required></input>
            <label htmlFor="debit">Debit</label>
            <br></br>
            <br></br>


            <label htmlFor="note" >Add any note</label>
            <input type="text" id="note" name="note" 
            onChange={handleChange}
            value={paymentObject.note}
            ></input>
            <br></br>
            <br></br>


            <label htmlFor="amount">Enter Amount:</label>
            <input type="number" id="amount" name="amount" 
            value={paymentObject.amount}
            onChange={handleChange} 
            required ></input>
            <br></br>
            <br></br>

            {!allDetailsCorrect&&<span className="text-red-500">Please add correct amount</span>}
            <br></br>
            <button type="submit" className="bg-blue-500 rounded-md" 
            // onClick={handleSubmit}
            >Submit</button>


    </form>    
    )
}