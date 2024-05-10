'use client';
import React, { useState } from "react"
import {useEffect} from "react";
import DayBookTable from "@/app/components/daybook/daybook";
import { DayBookTranObject } from "@/app/lib/definitions";
import { fetchTransactionsForDayBook } from "@/app/lib/read";

export default  function Page(){
    const [date,setDate]=useState("");
    const [dateIsSet,setDateisSet]=useState(false);
    const [dayBookTrans,setDayBookTrans]=useState<DayBookTranObject[]>([]);
    const [dataIsFetched,setDataIsFetched]=useState(false)
    

    const  handleChange=<T extends HTMLInputElement>(e:React.ChangeEvent<T>)=>{
        setDate(e.target.value)
        setDateisSet(false);
        
        console.log(e.target.value) 
    }
     function handleClick(){ 
        if(date!=""){
            setDateisSet(true);
            console.log(dateIsSet);
            setDataIsFetched(false)

        } 
    }
    function handleClear(){
        setDataIsFetched(false)
        setDateisSet(false)
        setDate("")
    }

    useEffect(()=>{
        if(date==="") return;

        const dayBookTransFetch = async ()=>{
            try{
                const dayBookTransactions=await fetchTransactionsForDayBook({dateToRender:date});
                setDayBookTrans(dayBookTransactions)
                setDataIsFetched(true)

            }catch(e){
                console.log(e)
            }
        };
        dayBookTransFetch(); 
    },[dateIsSet])
    return(
        <>
        <label htmlFor="searchwithdate">Select a date</label>
        <br></br>
        <input type="date" name="searchwithdate" id="searchwithdate"  onChange={handleChange} value={date}></input>
        <br></br>
        <button type="submit" onClick={handleClick} className="bg-blue-500 rounded-md">Search</button>

        <button type="submit" onClick={handleClear} className="bg-blue-500 rounded-md ml-56">Clear</button>
        <>
        <br></br>
        {dateIsSet&&!dataIsFetched&&<>Fetching the data...</>}
        <br></br>
        {dataIsFetched&&<DayBookTable dayBookTrans={dayBookTrans}/>}
        </>
            </>
    )
}

