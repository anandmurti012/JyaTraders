import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Stack,
    Box,
    useDisclosure,
} from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import SidebarContent from './SidebarContent'

const MobileMenu = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef()

    return (
        <>
            <div className='ml-2' >
                <NavLink
                    colorScheme='teal' onClick={onOpen}>
                    <i class="fa-solid fa-bars" style={{ fontSize: "25px" }}></i>
                </NavLink>
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
                        <NavLink to='/' style={{ display: "flex", gap: 5, textDecoration: 'none' }}>
                            <img src='/img/icon/icon-02-primary.png' style={{ height: 30, width: 30 }} alt='logo' />
                            <div style={{ fontWeight: 500, fontSize: 18, marginTop: 2 }} >
                                Pioneers of Lic
                            </div>
                        </NavLink>
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

export default MobileMenu
