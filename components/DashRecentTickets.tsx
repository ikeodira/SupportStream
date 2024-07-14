import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Prisma } from '@prisma/client'
import React from 'react';
import TicketStatusBadge from "./TicketStatusBadge";
import Link from "next/link";

type TicketWithUser = Prisma.TicketGetPayload<{
    include: { assignedToUser: true }
}>

interface Props {
    tickets: TicketWithUser[];
}

function DashRecentTickets({ tickets }: Props) {


    return (
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Recently Updated</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {tickets ? tickets.map((ticket) => (
                        <div>
                            <TicketStatusBadge status={ticket.status} />
                            <Link href={`tickets/${ticket.id}`}>
                                <p>{ticket.title}</p>
                                <p>{ticket.assignedToUser?.name || "Unassigned"}</p>
                            </Link>
                        </div>
                    )) : null}
                </div>
            </CardContent>
        </Card>
    )
}

export default DashRecentTickets