'use client'
import React,{ useState } from "react";
import { addAnEntry } from "@/app/lib/actions"
import { Fruit } from "@/app/lib/definitions";

import FruitTable from "@/app/components/entry/fruits-table";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import { SyncLoader } from "react-spinners";


export default function Page(){

    // const router=useSearchParams();
    // const [tranObject,setTranObject]=useState<any>();
    
    // const tranID=Number(router.get('tran_id'));


    
    // const [formIsFilled,setFormIsFilled]=useState(true);
    const [fruitIsAdded,setFruitIsAdded]=useState(true);
    const [trigger,triggerTable]=useState(false)
    const [allFruitDetailsEntered,setAllFruitDetailsEntered]=useState(true);
    const [inputs, setInputs] = useState({});
    const [fruitsArray,addFruittoArray]=useState(Array<Fruit>);
    const [singleFruit,setFruitValues]=useState<Fruit>({
        mangotype:0,
        rate:0,
        weight:0
    });
    const [isEditingFruit,setIsEditingFruit]=useState(false);
    const [indexOfEdit,setIndexOfEdit]=useState(100);
    const [submitClicked,setSubmitClicked]=useState(false);

    

function handleChange(e:any){
    const name=e.target.name;
    const value=e.target.value
    setInputs(values => ({...values, [name]: value}))
    

}

const handleFruitInputChange=<T extends HTMLInputElement | HTMLSelectElement>(e:React.ChangeEvent<T>)=>{
    const {name,value}=e.target;
    const updatedFruit:Fruit={...singleFruit};
   
        updatedFruit[name]=Number(value);

    
    setFruitValues(updatedFruit);
    
    

};


const resetFruit =()=>{
    setFruitValues(
        {
            mangotype:0,
        rate:0,
        weight:0
        }

    )
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
        resetFruit()


    } else {
        setAllFruitDetailsEntered(false);
    }
    e.preventDefault();
        
}    

// function isEmpty(obj:Object) {
//     for (const prop in obj) {
//       if (Object.hasOwn(obj, prop)) {
//         return false;
//       }
//     }
  
//     return true;
//   }

  function size(obj:Object){
    const objLength=Object.keys(obj).length;
    return objLength
  }
  function totalExpenses(data:any){
          return   (Number(data.cooli)+Number(data.kirai)+Number(data.commission))
  }
  
   function addEntry(){
    setInputs(values=>({...values,["totalexp"]:totalExpenses(inputs)}))
    
    if(size(inputs)==12&&fruitsArray.length>0){
        setSubmitClicked(true)
        addAnEntry(inputs,fruitsArray);
        setInputs({})
        addFruittoArray([])
        triggerTable(false);

    } else if(fruitsArray.length==0){
        setFruitIsAdded(false);

    }

  }
  
    return(
        <>
        <Link
        href="/home/entry/existing-customer"
        className="flex w-1/4  h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
        <span className="hidden md:block">Existing Customer</span>{' '}
        <PlusIcon className="h-5 md:ml-4" />
      </Link>
      <br></br>
        <form action={addEntry}>
            <label htmlFor="fname">First Name</label><br></br>
            <input type="text" id="fname" name="fname"  onChange={handleChange}  required></input>
            <br></br>

            <label htmlFor="lname" >Last Name</label><br></br>
            <input type="text" id="lname" name="lname"  onChange={handleChange}  required></input>
            <br></br>

            <label htmlFor="fathername" > S/O :</label><br></br>
            <input type="text" id="fathername" name="fathername"  onChange={handleChange} required></input>
            <br></br>

            <label htmlFor="place" >Place</label><br></br>
            <input type="text" id="place" name="place"  onChange={handleChange}  required></input>
            <br></br>

            <label htmlFor="date">Enter a Date</label><br></br>
            <input type="date" id="date" name="date"  onChange={handleChange}  required></input>
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
            
            <br></br>
            {trigger?<FruitTable fruitsArray={fruitsArray} 
            setFruitValues={setFruitValues} addFruittoArray={addFruittoArray}
            setIsEditingFruit={setIsEditingFruit} setIndexOfEdit={setIndexOfEdit}></FruitTable>:<></>}
            <br></br>

            
            {/* <ValidationMsg formisFilled={formIsFilled} type="transaction"></ValidationMsg> */}
            {!submitClicked&&<button className="bg-blue-500 rounded-md" type="submit" >Submit</button>
            }  
            {submitClicked&&<SyncLoader/>} 
        </form>
        </>
    )
}

export function ValidationMsg({formisFilled,type}:{formisFilled:boolean,type:string}){
    return(
        <>
        {formisFilled?<></>:<span>Pleas fill all {type} details</span>}
        
        </>
    )
}

export function FruitValidation({fruitIsAdded}:{fruitIsAdded:boolean}){
    return(
        <>
        {fruitIsAdded?<></>:<span>Pleas fill atleast one fruit</span>}
        
        </>
    ) 
}