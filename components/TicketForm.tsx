"use client";
import React, { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';
import { ticketSchema } from '@/validationSchemas/ticket';
import { z } from "zod";
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Ticket } from '@prisma/client';

type TicketFormData = z.infer<typeof ticketSchema>;

interface Props {
    ticket?: Ticket
}

function TicketForm({ ticket }: Props) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();



    const form = useForm<TicketFormData>({
        resolver: zodResolver(ticketSchema)
    });

    async function onSubmit(values: z.infer<typeof ticketSchema>) {
        try {
            setIsSubmitting(true);
            setError("");

            if (ticket) {
                await axios.patch(`/api/tickets/${ticket.id}`, values);

            } else {
                await axios.post("/api/tickets", values);

            }
            setIsSubmitting(true);
            router.push("/tickets")
            router.refresh();
        } catch (error) {
            setError("Unknown Error occured.")
            setIsSubmitting(false);
        }
    }

    return (
        <div className='rounded-md border w-full p-4'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                    <FormField control={form.control} name='title' render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ticket Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Ticket Title..." {...field} defaultValue={ticket?.title} />
                            </FormControl>
                        </FormItem>
                    )} />
                    <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Controller
                                name="description"
                                control={form.control}
                                defaultValue={ticket?.description}
                                render={({ field }) => (
                                    <SimpleMDE {...field} />
                                )}
                            />
                        </FormControl>
                    </FormItem>
                    <div className="flex w-full space-x-4">
                        <FormField control={form.control} name="status" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={ticket ? ticket?.status : field.value} >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Status..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="OPEN">Open</SelectItem>
                                            <SelectItem value="STARTED">Started</SelectItem>
                                            <SelectItem value="CLOSED">Closed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="priority" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Priority</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={ticket ? ticket?.priority : field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Priority..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="OPEN">Low</SelectItem>
                                            <SelectItem value="MEDIUM">Medium</SelectItem>
                                            <SelectItem value="HIGH">High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )} />
                    </div>
                    <Button type='submit' disabled={isSubmitting}>{ticket ? "Update Ticket" : "Create Ticket"}</Button>
                </form>
            </Form>
            <p className='text-destructive'>{error}</p>
        </div>
    );
}

export default TicketForm;
