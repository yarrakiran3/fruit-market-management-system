'use client'
import { useState } from "react";
import { addAnEntry } from "@/app/lib/actions"

    
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
function FruitTable({addedFruitArray}:{addedFruitArray:Array<any>}){
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
                    <td>{fruit.mangotype}</td>
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
export default function Page(){



    const [formIsFilled,setFormIsFilled]=useState(true);
    const [fruitIsAdded,setFruitIsAdded]=useState(true);
    const [trigger,triggerTable]=useState(false)
    const [allFruitDetailsEntered,setAllFruitDetailsEntered]=useState(true);
    const [inputs, setInputs] = useState({});
    const [fruitsArray,addFruittoArray]=useState(Array<Object>);
    const [singleFruit,setFruitValues]=useState({})

function handleChange(e:any){
    const name=e.target.name;
    const value=e.target.value
    setInputs(values => ({...values, [name]: value}))
    

}

function handleFruitInputChange(e:any){
    const name=e.target.name;
    const value=e.target.value;
    if(name!=null&&value!=null){
        setFruitValues(values=>({...values,[name]:value}))
    }
}

function addFruit(e:any){
    if(size(singleFruit)==3){
        const nextArray=[...fruitsArray,singleFruit];
        addFruittoArray(nextArray);
        setFruitValues({});
        setFruitIsAdded(true);
        triggerTable(true);

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

   function addEntry(){
    
    if(size(inputs)==9&&fruitsArray.length>0){
        addAnEntry(inputs,fruitsArray);
        setInputs({})
        addFruittoArray([])

    } else if(fruitsArray.length==0){
        setFruitIsAdded(false);
    }
    
    else {
        setFormIsFilled(false);
        // console.log("Please fill al the details")
        // console.log(formIsFilled)
        
    }
        



  }
  
    return(
        <form action={addEntry}>
            <label htmlFor="fname">First Name</label>
            <input type="text" id="fname" name="fname" value={inputs.fname || ""} onChange={handleChange} onClick={()=>{setFormIsFilled(true)}}></input>
            <br></br>
            <br></br>

            <label htmlFor="lname" >Last Name</label>
            <input type="text" id="lname" name="lname" value={inputs.lname || ""} onChange={handleChange} onClick={()=>{setFormIsFilled(true)}}></input>
            <br></br>
            <br></br>

            <label htmlFor="fathername" > S/O :</label>
            <input type="text" id="fathername" name="fathername" value={inputs.fathername || ""} onChange={handleChange} onClick={()=>{setFormIsFilled(true)}}></input>
            <br></br>
            <br></br>

            <label htmlFor="place" >Place</label>
            <input type="text" id="place" name="place" value={inputs.place || ""} onChange={handleChange} onClick={()=>{setFormIsFilled(true)}}></input>
            <br></br>
            <br></br>

            <label htmlFor="date">Enter a Date</label>
            <input type="date" id="date" name="date" value={inputs.date || ""} onChange={handleChange} onClick={()=>{setFormIsFilled(true)}}></input>
            <br></br>
            <br></br>

            <label htmlFor="vhtype">Vehicle Type</label>
            <select  id="vhtype" name="vhtype" value={inputs.vhtype || ""} onChange={handleChange} onClick={()=>{setFormIsFilled(true)}}>
            <option >Select</option>    
            <option value={1}>Bike</option>
            <option value={2}>Ton Auto</option>
            <option value={3}>Tata A.C</option>
            <option value={4}>Tractor</option>
            <option value={5}>Lorry</option>
            </select>
            <br></br>
            <br></br>

            <label htmlFor="cooli">Cooli</label>
            <input type="number" id="cooli" name="cooli" value={inputs.cooli || ""} onChange={handleChange} onClick={()=>{setFormIsFilled(true)}}></input>
            <br></br>
            <br></br>

            <label htmlFor="kirai">Kirai</label>
            <input type="number" id="kirai" name="kirai" value={inputs.kirai || ""} onChange={handleChange} onClick={()=>{setFormIsFilled(true)}}></input>
            <br></br>
            <br></br>

            <label htmlFor="commission">Commission</label>
            <input type="number" id="commission" name="commission" value={inputs.commission || ""} onChange={handleChange} onClick={()=>{setFormIsFilled(true)}}></input>
            <br></br>
            <br></br>

            <FruitValidation fruitIsAdded={fruitIsAdded}/>

            <br></br>
            <ValidationMsg type="fruit" formisFilled={allFruitDetailsEntered}></ValidationMsg>
            <br></br>

            <label htmlFor="mangotype" >Select a mango Type</label>
            <select  id="mangotype" name="mangotype" value={singleFruit.mangotype || ""} onChange={(e)=>handleFruitInputChange(e)}>
            <option >Select</option>
            <option value={"ChinnaRasam"}>Chinna Rasam</option>
            <option value={"PedhaRasam"}>Pedha Rasam </option>
            <option value={"Totapuri"}>Totapuri</option>
            <option value={"BanginaPalli"}>Banginapalli</option>
            <option value={"CherukuRasam"}>Cheruku Rasam</option>
            </select>
            <br></br>
            <br></br>

            
            <label htmlFor="rate">Rate</label>
            <input type="number" id="rate" name="rate" value={singleFruit.rate || ""} onClick={()=>setAllFruitDetailsEntered(true)} onChange={(e)=>{handleFruitInputChange(e)}} ></input>
            <br></br>
            <br></br>

            <label htmlFor="weight" >Weight</label>
            <input type="number" id="weight" name="weight" value={singleFruit.weight || ""} onChange={(e)=>{handleFruitInputChange(e)}} ></input>
            <br></br>
            <br></br>

            <button className="bg-blue-500 rounded-md" onClick={(e)=>addFruit(e)}>Add</button>
            
            <br></br>
            {trigger?<FruitTable addedFruitArray={fruitsArray}></FruitTable>:<></>}
            <br></br>

            
            <ValidationMsg formisFilled={formIsFilled} type="transaction"></ValidationMsg>
            <button className="bg-blue-500 rounded-md" type="submit" >Submit</button>
        </form>
    )
}