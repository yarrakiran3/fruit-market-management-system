'use client'
import React, { useState } from "react";
import { addAnEntry } from "@/app/lib/actions"
import { Fruit } from "@/app/lib/definitions";
import { Mangotypes } from "@/app/lib/definitions";
    

export default function Page(){



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
    })
    

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
    if(singleFruit.mangotype!=0&&singleFruit.rate!=0&&singleFruit.weight!=0){
        const nextArray=[...fruitsArray,singleFruit];
        addFruittoArray(nextArray);
         resetFruit();
        setFruitIsAdded(true);
        triggerTable(true);
        setAllFruitDetailsEntered(true);


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
    
    if(size(inputs)==11&&fruitsArray.length>0){
        
        addAnEntry(inputs,fruitsArray);
        setInputs({})
        addFruittoArray([])
        triggerTable(false);

    } else if(fruitsArray.length==0){
        setFruitIsAdded(false);

    }

  }
  
    return(
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
            {trigger?<FruitTable addedFruitArray={fruitsArray}></FruitTable>:<></>}
            <br></br>

            
            {/* <ValidationMsg formisFilled={formIsFilled} type="transaction"></ValidationMsg> */}
            <button className="bg-blue-500 rounded-md" type="submit" >Submit</button>
        </form>
    )
}

function ValidationMsg({formisFilled,type}:{formisFilled:boolean,type:string}){
    return(
        <>
        {formisFilled?<></>:<span>Pleas fill all {type} details</span>}
        
        </>
    )
}

function FruitValidation({fruitIsAdded}:{fruitIsAdded:boolean}){
    return(
        <>
        {fruitIsAdded?<></>:<span>Pleas fill atleast one fruit</span>}
        
        </>
    ) 
}
function FruitTable({addedFruitArray}:{addedFruitArray:Array<Fruit>}){
    return (
        <>
        <table>
                <thead>
                    <th>Type</th>
                    <th>Rate</th>
                    <th>Weight</th>
                </thead>
        {addedFruitArray.map((fruit,index)=>{
            
             return <>
             <tbody>
                <tr key={index}>
                    <td>{Mangotypes[fruit.mangotype]}</td>
                    <td>{fruit.rate}</td>
                    <td>{fruit.weight}</td>
                </tr>
             </tbody>
             </>
           
        })}
        </table>
        </>
        
    )
    }