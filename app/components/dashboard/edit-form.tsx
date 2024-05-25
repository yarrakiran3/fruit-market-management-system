'use client'
import { useState } from "react";
import FruitTable from "./fruits-table-for-edit";
import { EditTranObject } from "@/app/lib/definitions";
import { updateTransation } from "@/app/lib/update-delete";
export default function EditForm({transaction}:{transaction:EditTranObject}){
    const [fruitsArray,setFruitsArray]=useState(transaction.fruits_array)
    const handleSubmit=async()=>{
        transaction.fruits_array=fruitsArray;
        // console.log(transaction.fruits_array)
        await updateTransation({transaction:transaction,tran_id:transaction.tran_id})
    }
    return(

        <form action={handleSubmit}>
        <label htmlFor="fname">First Name</label><br></br>
        <input type="text" id="fname" name="fname"  
        onChange={(e)=>{transaction.fname=e.target.value;console.log(e.target.value)}}
        defaultValue={transaction.fname}  required></input>
        <br></br>

        <label htmlFor="lname" >Last Name</label><br></br>
        <input type="text" id="lname" name="lname"  
        onChange={(e)=>{transaction.lname=e.target.value}} 
        defaultValue={transaction.lname} required></input>
        <br></br>

        <label htmlFor="fathername" > S/O :</label><br></br>
        <input type="text" id="fathername" name="fathername" 
        onChange={(e)=>{transaction.fathername=e.target.value}}
        defaultValue={transaction.fathername} required></input>
        <br></br>

        <label htmlFor="place" >Place</label><br></br>
        <input type="text" id="place" name="place"  
        onChange={(e)=>{transaction.place=e.target.value}} 
        defaultValue={transaction.place} required></input>
        <br></br>

        <label htmlFor="date">Enter a Date</label><br></br>
        <input type="date" id="date" name="date" 
         onChange={(e)=>{transaction.tran_date=e.target.value}}
         defaultValue={transaction.tran_date} required></input>
        <br></br>

        <span>Import/Export</span><br></br>
        {transaction.trantype===1&&<span className="text-blue-700">Import</span>}
        {transaction.trantype===2&&<span className="text-blue-700">Export</span>}
        <br></br>
        

        <label htmlFor="vhtype">Vehicle Type</label><br></br>
        <select  id="vhtype" name="vhtype"  
        onChange={(e)=>{transaction.vhtype=Number(e.target.value)}}
        defaultValue={transaction.vhtype}  required>
        <option ></option>    
        <option value={1}>Bike</option>
        <option value={2}>Ton Auto</option>
        <option value={3}>Tata A.C</option>
        <option value={4}>Tractor</option>
        <option value={5}>Lorry</option>
        </select>
        <br></br>

        <label htmlFor="vhno">Vehicle No.</label><br></br>
        <input type="text" id="vhno" name="vhno"  
        onChange={(e)=>{transaction.vhno=e.target.value}}
        defaultValue={transaction.vhno}  required></input>
        <br></br>

        <label htmlFor="cooli">Cooli</label><br></br>
        <input type="number" id="cooli" name="cooli"  
        onChange={(e)=>{transaction.cooli=Number(e.target.value)}} 
        defaultValue={transaction.cooli} required></input>
        <br></br>

        <label htmlFor="kirai">Kirai</label><br></br>
        <input type="number" id="kirai" name="kirai"  
        onChange={(e)=>{transaction.kirai=Number(e.target.value)}} 
        defaultValue={transaction.kirai} required></input>
        <br></br>

        <label htmlFor="commission">Commission</label><br></br>
        <input type="number" id="commission" name="commission" 
         onChange={(e)=>{transaction.commission=Number(e.target.value)}} 
         defaultValue={transaction.commission} required></input>
        <br></br>

        <br></br>
        <br></br>


        
        <FruitTable fruits_array={fruitsArray} setFruitsArray={setFruitsArray}/>
        <button className="bg-blue-500 rounded-md" type="submit" >Submit</button>
    </form>
    )
}