// import TicketForm from '@/components/TicketForm'
import dynamic from 'next/dynamic'
import React from 'react'

const TicketForm = dynamic(() => import('@/components/TicketForm'), {
    ssr: false,
})

function NewTicket() {
    return (
        <TicketForm />
    )
}

export default NewTicket