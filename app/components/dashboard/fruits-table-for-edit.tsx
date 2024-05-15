import { Fruit,Mangotypes } from "@/app/lib/definitions";
import { PencilIcon,TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function FruitTable({fruits_array,setFruitsArray}:{fruits_array:Fruit[],setFruitsArray:any}){
    const [singleFruit,setFruitValues]=useState<Fruit>({
        mangotype:0,
        rate:0,
        weight:0
    });
    const [allFruitDetailsEntered,setAllFruitDetailsEntered]=useState(true);
    const [isEditingFruit,setIsEditingFruit]=useState(false);
    const [indexOfEdit,setIndexOfEdit]=useState(100);
    const [ableToDelete,setAbleToDelete]=useState(true)



    const handleFruitInputChange=<T extends HTMLInputElement | HTMLSelectElement>(e:React.ChangeEvent<T>)=>{
        const {name,value}=e.target;
        const updatedFruit:Fruit={...singleFruit};
        updatedFruit[name]=Number(value);
        setFruitValues(updatedFruit);
        
        
    
    };

    function editFruit(index:number){
        setFruitValues(fruits_array[index])
        setIsEditingFruit(true)
        setIndexOfEdit(index)
        
    }

    function deleteFruit(index:number){
        if(!isEditingFruit){
        const length=fruits_array.length;
        const finalNewArray =[...fruits_array.slice(0,index),...fruits_array.slice(index+1,length)]
        setFruitsArray(finalNewArray)
        resetFruit()
        }else{
            setAbleToDelete(false)
        }
        
    }

    function addFruit(){
        if(!isEditingFruit&&singleFruit.mangotype!=0&&singleFruit.rate!=0&&singleFruit.weight!=0){
            const newArray=[...fruits_array,singleFruit]
            
            setFruitsArray(newArray)
            console.log(newArray)
            resetFruit();

        } else if (isEditingFruit&&singleFruit.mangotype!=0&&singleFruit.rate!=0&&singleFruit.weight!=0){
            fruits_array[indexOfEdit]=singleFruit
            setIsEditingFruit(false)
            setIndexOfEdit(100)
            resetFruit();
            setAbleToDelete(true)

            

        }else{
            setAllFruitDetailsEntered(false)
        }

    }

   const resetFruit =()=>{
    setFruitValues(
        {
            mangotype:0,
        rate:0,
        weight:0
        }

    )
}

    return (
        <>
        {!allFruitDetailsEntered&&<p>Enter all details</p>}
        {!ableToDelete&&<p>Cannot delete the fruit while editing</p>}
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

        <button type="button" className="bg-blue-500 rounded-md" onClick={()=>addFruit()}>Add</button>
        
        <br></br>
        
        <br></br>

        <table  className="p-6">
                <thead>
                    <tr>

                    
                    <th className="p-6">Type</th>
                    <th className="p-6">Rate</th>
                    <th className="p-6">Weight</th>
                    <th className="p-6">Edit</th>
                    <th className="p-6">Delete</th>
                    </tr>
                </thead>
                <tbody>
            {fruits_array.map((fruit,index)=>{
            
             return (
             
                <tr key={index}>
                    <td className="p-6">{Mangotypes[fruit.mangotype]}</td>
                    <td className="p-6">{fruit.rate}</td>
                    <td className="p-6">{fruit.weight}</td>
                    <td className="p-6"><button type="button" onClick={()=>editFruit(index)}><PencilIcon className="w-6 h-6"/></button></td>
                    <td className="p-6"><button type="button" onClick={()=>deleteFruit(index)}><TrashIcon className="w-6 h-6" /></button></td>
                </tr>
             )
                       
        })}
         </tbody>
        </table>
        </>
        
    )

}