'use client'
import { ExistingUserTranObject, Fruit, MartketCustomer } from "@/app/lib/definitions"
import { useState } from "react";
import FruitTable from "./fruits-table";
import { FruitValidation, ValidationMsg } from "@/app/home/entry/page";
import addTranForExistingCustomer from "@/app/lib/update-delete";
import { SyncLoader } from "react-spinners";

export default function ExistingCustomerEntry({customers}:{customers:MartketCustomer[]}){
    const [fruitIsAdded,setFruitIsAdded]=useState(true);
    const [trigger,triggerTable]=useState(false)
    const [allFruitDetailsEntered,setAllFruitDetailsEntered]=useState(true);
    const [singleFruit,setFruitValues]=useState<Fruit>({
        mangotype:0,
        rate:0,
        weight:0
    });
    const [fruitsArray,addFruittoArray]=useState(Array<Fruit>);
    const [isEditingFruit,setIsEditingFruit]=useState(false);
    const [indexOfEdit,setIndexOfEdit]=useState(100);
    const [tranIsValid,setTranIsvalid]=useState(true);
    const [existingUserTranObject,setExistingUserTranObject]=useState<ExistingUserTranObject>(
        {
                customer_id:0,
                tran_date:'',
                trantype:0,
                vhtype:0,
                vhno:'',
                cooli:0,
                kirai:0,
                commission:0,
              
        }
    )
    const [submitClicked,setSubmitClicked]=useState(false);
    
    const resetFruit =()=>{
        setFruitValues(
            {
                mangotype:0,
            rate:0,
            weight:0
            }
    
        )
    };

    function handleCustomerChange(e:any){
        const {name,value}=e.target
        const updatedTranObject={...existingUserTranObject};
        updatedTranObject.customer_id=Number(value);
        setExistingUserTranObject(updatedTranObject);
        setTranIsvalid(true)
    }
    function handleChange(e:any){
        const {name,value}=e.target
        const updatedTranObject={...existingUserTranObject};
        updatedTranObject[name]=value;
        setExistingUserTranObject(updatedTranObject)
        setTranIsvalid(true)

    }
    function handleFruitInputChange(e:any){
        const {name,value}=e.target;
    const updatedFruit:Fruit={...singleFruit};
   
        updatedFruit[name]=Number(value);

    
    setFruitValues(updatedFruit);
    setTranIsvalid(true)

    

    }
    function addFruit(e:any){
        if(singleFruit.mangotype!=0&&singleFruit.rate!=0&&singleFruit.weight!=0&&!isEditingFruit){
            const nextArray=[...fruitsArray,singleFruit];
            addFruittoArray(nextArray);
             resetFruit();
            setFruitIsAdded(true);
            triggerTable(true);
            setAllFruitDetailsEntered(true);
    
    
        } else if(isEditingFruit&&singleFruit.rate!=0&&singleFruit.weight!=0) {
            fruitsArray[indexOfEdit]=singleFruit;

            setIsEditingFruit(false)
            setIndexOfEdit(100)
            resetFruit();
    
    
        } else {
            setAllFruitDetailsEntered(false);
        }
        e.preventDefault();
    }
    function handleClick(){
        if(!isEditingFruit&&checkTransactionIsValid()){
            setSubmitClicked(true)
            console.log(existingUserTranObject,fruitsArray)
            addTranForExistingCustomer({existingUserTranObject:existingUserTranObject,fruitsArray:fruitsArray})
        } else  {
            console.log('Check Tran')
            setTranIsvalid(false)
        }
        
        
    }

    function checkTransactionIsValid(){
        if((existingUserTranObject.commission!=0||existingUserTranObject.commission!=undefined||existingUserTranObject.commission!=null)
            &&(existingUserTranObject.cooli!=0||existingUserTranObject.cooli!=null||existingUserTranObject.cooli!=undefined)
            &&(existingUserTranObject.kirai!=0||existingUserTranObject.kirai!=null||existingUserTranObject.kirai!=undefined)
            &&(existingUserTranObject.tran_date!='')
            &&(existingUserTranObject.trantype!=0||existingUserTranObject.trantype!=null||existingUserTranObject.trantype!=undefined)
            &&(existingUserTranObject.vhno!='')
            &&(existingUserTranObject.vhtype!=0||existingUserTranObject.vhtype!=null||existingUserTranObject.vhtype!=undefined)
            &&fruitsArray.length!=0
        ){
            return true
        } else{
            return false
        }
    }

    return(
        <>
    <select id="customer" name="customer"
        onChange={(e)=>handleCustomerChange(e)}>
        <option>Select a Customer</option>
        {customers.map((customer,index)=>{
            return(
                <option value={customer.id} key={index}>
                    {customer.id}{'-'}{customer.fname}{' '}{customer.lname}{' S/o-'}{customer.father}
                </option>
            )
        })}
    </select>
    <br></br>
    <br></br>

    <label htmlFor="tran_date">Enter a Date</label><br></br>
            <input type="date" id="tran_date" name="tran_date"  onChange={handleChange}  required></input>
            <br></br>

            <label htmlFor="trantype">Import/Export</label><br></br>
            <select  id="trantype" name="trantype"  onChange={handleChange}  required>
            <option ></option>    
            <option value={1}>Import</option>
            <option value={2}>Export</option>
            
            </select>
            <br></br>

            <label htmlFor="vhtype">Vehicle Type</label><br></br>
            <select  id="vhtype" name="vhtype"  onChange={handleChange}  required>
            <option ></option>    
            <option value={1}>Bike</option>
            <option value={2}>Ton Auto</option>
            <option value={3}>Tata A.C</option>
            <option value={4}>Tractor</option>
            <option value={5}>Lorry</option>
            </select>
            <br></br>

            <label htmlFor="vhno">Vehicle No.</label><br></br>
            <input type="text" id="vhno" name="vhno"  onChange={handleChange}  required></input>
            <br></br>

            <label htmlFor="cooli">Cooli</label><br></br>
            <input type="number" id="cooli" name="cooli"  onChange={handleChange}  required></input>
            <br></br>

            <label htmlFor="kirai">Kirai</label><br></br>
            <input type="number" id="kirai" name="kirai"  onChange={handleChange}  required></input>
            <br></br>

            <label htmlFor="commission">Commission</label><br></br>
            <input type="number" id="commission" name="commission"  onChange={handleChange}  required></input>
            <br></br>

            <FruitValidation fruitIsAdded={fruitIsAdded}/>

            <br></br>
            <ValidationMsg type="fruit" formisFilled={allFruitDetailsEntered}></ValidationMsg>
            <br></br>

            <label htmlFor="mangotype" >Select a mango Type</label>
            <select  id="mangotype" name="mangotype" 

            value={singleFruit.mangotype}
            onChange={handleFruitInputChange}
            >
            <option ></option>
            <option value={1}>Chinna Rasam</option>
            <option value={2}>Pedha Rasam </option>
            <option value={3}>Totapuri</option>
            <option value={4}>Banginapalli</option>
            <option value={5}>Cheruku Rasam</option>
            </select>
            <br></br>
            <br></br>

            
            <label htmlFor="rate">Rate</label>
            <input type="number" id="rate" name="rate"  
            value={singleFruit.rate || ""}
            onClick={()=>setAllFruitDetailsEntered(true)}
             onChange={handleFruitInputChange} 
             >

             </input>
            <br></br>
            <br></br>

            <label htmlFor="weight" >Weight</label>
            <input type="number" id="weight" name="weight"  
            value={singleFruit.weight || ""}
            onClick={()=>setAllFruitDetailsEntered(true)} 
            onChange={handleFruitInputChange}
             >

             </input>
            <br></br>
            <br></br>

            <button className="bg-blue-500 rounded-md" onClick={(e)=>addFruit(e)}>Add</button>
            {trigger?<FruitTable fruitsArray={fruitsArray} 
            setFruitValues={setFruitValues} addFruittoArray={addFruittoArray}
            setIsEditingFruit={setIsEditingFruit} setIndexOfEdit={setIndexOfEdit}></FruitTable>:<></>}
            <br></br>

            <ValidationMsg formisFilled={tranIsValid} type="transaction"></ValidationMsg>

            {!submitClicked&&<button className="bg-blue-500 rounded-md" type="button" onClick={handleClick} >Submit</button>
                }
            {submitClicked&&<SyncLoader/>}
    
    </>
    )
}