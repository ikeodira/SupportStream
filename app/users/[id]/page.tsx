import React from 'react'
import prisma from '@/prisma/db'
import UserForm from '@/components/UserForm'
import { getServerSession } from 'next-auth'
import options from '@/app/api/auth/[...nextauth]/options'

interface Props {
    params: { id: string }
}

async function EditUser({ params }: Props) {

    const session = await getServerSession(options);

    if (session?.user.role !== "ADMIN") {
        return <p className='text-destructive'>Admin access required.</p>
    }

    const user = await prisma?.user.findUnique({
        where: { id: parseInt(params.id) },
        // select: {
        //     id: true,
        //     name: true,
        //     username: true,
        //     role: true,
        // }
    })



    if (!user) {
        return <p className='text-destructive'>User Not Found</p>
    }

    user.password = "";

    return (
        <UserForm user={user} />
    )
}

export default EditUser