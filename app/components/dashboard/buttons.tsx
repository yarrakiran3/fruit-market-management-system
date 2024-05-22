'use client'
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteTransaction } from '@/app/lib/update-delete';
import { useState } from 'react';
import { SyncLoader } from 'react-spinners';
export function CreateTransaction() {
    return (
      <Link
        href="/home/entry"
        className="flex w-1/24 ml-56 h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <span className="hidden md:block">Add an Entry</span>{' '}
        <PlusIcon className="h-5 md:ml-4" />
      </Link>
    );
  }

export function UpdateTransaction({ tran_id }: { tran_id: number }) {
    

    return (
      <Link
        href={`/home/dashboard/${tran_id}/edit`}
        className='items-center'
      >
        <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Update</span>
             <PencilIcon className="w-5" />
             </button>
       
      </Link>
    );
  }
  
  export function DeleteTransaction({ tran_id }: { tran_id: number }) {
    const [isDeleteClicked,setIsDeleteClicked]=useState(false);
    return (
      <>
        <button className="rounded-md border p-2 hover:bg-gray-100" onClick={ ()=>{setIsDeleteClicked(true);deleteTransaction({tran_id:tran_id})}}>
          <span className="sr-only">Delete</span>
          {!isDeleteClicked&&<TrashIcon className="w-5" />}
          {isDeleteClicked&&<SyncLoader/>}

        </button>
      </>
    );
  }