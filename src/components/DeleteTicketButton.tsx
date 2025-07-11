'use client'

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from 'sonner';
import { deleteTicket } from "@/actions/ticket.actions"; 

export default function DeleteTicketButton({ticketId}:{ticketId:number}){
    const router = useRouter();
    const initialState = {
        success: false,
        message: ''
    }
    const [state, formAction] = useActionState(deleteTicket, initialState)

    useEffect(() => {
        console.log('🔍 Delete state:', state);
        
        if(state.message){
            if(state.success){
                console.log('✅ Success! Redirecting...');
                toast.success(state.message);
                
                setTimeout(() => {
                    console.log('🚀 Executing redirect to /tickets');
                    router.push('/tickets');
                }, 1000);
                
            } else {
                console.log('❌ Error:', state.message);
                toast.error(state.message);
            }
        }
    }, [state, router])

    const handleSubmit = (e: React.FormEvent) => {
        if(!confirm('Are you sure you want to delete this ticket?')){
            e.preventDefault()
        }
    }

    return(
        <form action={formAction} onSubmit={handleSubmit}>
            <input type="hidden" name="ticketId" value={ticketId} />
            <button
                type="submit"
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
            >
                Delete Ticket
            </button>
        </form>
    );
}