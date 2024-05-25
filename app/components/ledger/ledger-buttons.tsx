'use client';
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { SyncLoader } from "react-spinners";
import { useState } from "react";

export function UpdateLedger({ tran_id,payment_id }: { tran_id: number,payment_id:number }) {
    
    return (

        <>
      {tran_id!=null&&payment_id==null&&
      <Link
      href={`/home/dashboard/${tran_id}/edit`}
      className='items-center'
    >
      <button className="rounded-md border p-2 hover:bg-gray-100">
      <span className="sr-only">Update</span>
           <PencilIcon className="w-5" />
           </button>
     
    </Link>}
    {tran_id==null&&payment_id!=null&&
      <Link
      href={`/home/payment/${payment_id}/edit`}
      className='items-center'
    >
      <button className="rounded-md border p-2 hover:bg-gray-100">
      <span className="sr-only">Update</span>
           <PencilIcon className="w-5" />
      </button>
    </Link>}
      
      </>
    );
  }
  
  export function DeleteLedger({ tran_id,payment_id }: { tran_id: number,payment_id:number }) {
    const [isDeleteClicked,setIsDeleteClicked]=useState(false);
    return (
      <>
        <button className="rounded-md border p-2 hover:bg-gray-100" 
        >
          <span className="sr-only">Delete</span>
          {!isDeleteClicked&&<TrashIcon className="w-5" />}
          {isDeleteClicked&&<SyncLoader/>}

        </button>
      </>
    );
  }