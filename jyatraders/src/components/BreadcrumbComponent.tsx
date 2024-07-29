import React from 'react';
import { Breadcrumb, BreadcrumbItem } from '@chakra-ui/react';
import Link from 'next/link'
export default function BreadcrumbComponent({ pages }) {
    return (
        <div className='mt-4' >
            <Breadcrumb>
                {
                    pages.map((e, i) => (
                        <BreadcrumbItem key={i}>
                            <Link style={{ color: e.active ? 'blue' : 'black' }} href={e.link}>{e.page}</Link>
                        </BreadcrumbItem>
                    ))
                }
            </Breadcrumb>
        </div>
    );
};

