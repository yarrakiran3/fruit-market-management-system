import { Fruit,Mangotypes } from "@/app/lib/definitions";
import { PencilIcon,TrashIcon } from "@heroicons/react/24/outline";
export default function FruitTable({fruitsArray,setFruitValues,addFruittoArray,setIsEditingFruit,setIndexOfEdit}:
    {fruitsArray:Array<Fruit>,
        setFruitValues:any,addFruittoArray:any,setIsEditingFruit:any,
        setIndexOfEdit:any})
        {

    function editFruit(index:number){
        setFruitValues(fruitsArray[index])
        setIsEditingFruit(true)
        setIndexOfEdit(index)
    }
    function deleteFruit(index:number){
        const length=fruitsArray.length;
        const finalNewArray =[...fruitsArray.slice(0,index),...fruitsArray.slice(index+1,length)]
        addFruittoArray(finalNewArray)
    }

    return (
        <>
        <table className="p-6">
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
        {fruitsArray.map((fruit,index)=>{
            
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