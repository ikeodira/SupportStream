"use client";

import React from 'react'
import { Button } from './ui/button';
import { ChevronFirstIcon, ChevronLastIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';

interface Props {
    itemCount: number;
    pageSize: number;
    currentPage: number;
}

function Pagination({ itemCount, pageSize, currentPage }: Props) {
    const pageCount = Math.ceil(itemCount / pageSize);
    if (pageCount <= 1) return null;

    const router = useRouter();
    const searchParams = useSearchParams();

    const changePage = (page: number) => {
        const params = new URLSearchParams(searchParams)
        params.set("page", page.toString())
        router.push(`?${params.toString()}`)
    }

    return (

        <div className='mt-4 mb-4'>
            <div>
                <Button variant="outline" disabled={currentPage === 1} onClick={() => changePage(1)}>
                    <ChevronFirstIcon />
                </Button>
                <Button variant="outline" disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)}>
                    <ChevronLeftIcon />
                </Button>
                <Button variant="outline" disabled={currentPage === pageCount} onClick={() => changePage(currentPage + 1)}>
                    <ChevronRightIcon />
                </Button>
                <Button variant="outline" disabled={currentPage === pageCount} onClick={() => changePage(pageCount)}>
                    <ChevronLastIcon />
                </Button>
            </div>
            <p> Page {currentPage} of {pageCount}</p>
        </div>
    )
}

export default Pagination