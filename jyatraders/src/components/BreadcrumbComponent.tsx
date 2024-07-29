import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import Link from 'next/link'
export default function BreadcrumbComponent({ currentpage }) {
    return (
        <Breadcrumb className='mt-2' >
            <BreadcrumbItem>
                <Link style={{color:'blue'}} href='/admin'>Dashboard</Link>
            </BreadcrumbItem>

            <BreadcrumbItem>
                <Link href='#'>{currentpage}</Link>
            </BreadcrumbItem>
        </Breadcrumb>
    );
};

