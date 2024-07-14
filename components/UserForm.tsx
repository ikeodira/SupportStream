"use client";
import React, { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { User } from '@prisma/client';
import { userSchema } from '@/validationSchemas/users';

type UserFormData = z.infer<typeof userSchema>;

interface Props {
    user?: User;
}

function UserForm({ user }: Props) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();


    const form = useForm<UserFormData>({
        resolver: zodResolver(userSchema)
    });

    async function onSubmit(values: z.infer<typeof userSchema>) {
        try {
            setIsSubmitting(true);
            setError("");

            if (user) {
                await axios.patch(`/api/users/${user.id}`, values);

            } else {
                await axios.post("/api/users", values);

            }
            setIsSubmitting(true);
            router.push("/tickets")
            router.refresh();
            form.reset();
        } catch (error) {
            setError("Unknown Error occured.");
            setIsSubmitting(false);
        }
    }

    return (
        <div className='rounded-md border w-full p-4'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                    <FormField control={form.control} name='name' defaultValue={user?.name} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter Users Full Name..." {...field} defaultValue={user?.name} />
                            </FormControl>
                        </FormItem>
                    )} />
                    <FormField control={form.control} name='username' defaultValue={user?.username} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter a Username..." {...field} defaultValue={user?.name} />
                            </FormControl>
                        </FormItem>
                    )} />

                    <FormField control={form.control} name='password' defaultValue={user?.password} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" required={user ? false : true} placeholder="Enter a Password" {...field} />
                            </FormControl>
                        </FormItem>
                    )} />



                    <div className="flex w-full space-x-4">
                        <FormField control={form.control} name="role" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Role</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={user ? user?.role : field.value} >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Role..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="USER">User</SelectItem>
                                            <SelectItem value="TECH">Tech</SelectItem>
                                            <SelectItem value="ADMIN">Admin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </FormItem>
                        )} />
                    </div>
                    <Button type='submit' disabled={isSubmitting}>{user ? "Update User" : "Create User"}</Button>
                </form>
            </Form>
            <p className='text-destructive'>{error}</p>
        </div>
    );
}

export default UserForm;
