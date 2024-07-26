'use client'
import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
} from '@chakra-ui/react'
import Link from "next/link"
import SidebarContent from './SidebarContent'
import { VscThreeBars } from "react-icons/vsc";
import Image from 'next/image'

export default function MobileMenu() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef()

    return (
        <>
            <div className='ml-2' >
                <Link href=""
                    colorScheme='teal' onClick={onOpen}>
                    <VscThreeBars fontSize={25} />
                </Link>
            </div>
            <Drawer
                isOpen={isOpen}
                placement='left'
                initialFocusRef={firstField}
                onClose={onClose}
                sx={{ margin: 0, padding: 0 }}

            >
                <DrawerOverlay />
                <DrawerContent
                    sx={{ margin: 0, padding: 0 }} >
                    <DrawerCloseButton sx={{ marginTop: 1, fontSize: 15, marginTop: 2 }} />
                    <DrawerHeader borderBottomWidth='1px'>
                        <Link href='/admin' style={{ display: "flex", gap: 5, textDecoration: 'none' }}>
                            <Image src={"/images/favicon.png"} height={35} width={35} style={{marginTop:'-5px',marginLeft:'-12px'}} />
                            <div style={{ fontWeight: 'bold', fontSize: 18, marginTop: 2 }} >
                                Jya Trades
                            </div>
                        </Link>
                    </DrawerHeader>

                    <DrawerBody m={0} p={0} >
                        <SidebarContent onCloseDrawer={() => { onClose() }} />
                    </DrawerBody>

                    {/* <DrawerFooter borderTopWidth='1px'>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue'>Submit</Button>
                    </DrawerFooter> */}
                </DrawerContent>
            </Drawer>
        </>
    )
}

