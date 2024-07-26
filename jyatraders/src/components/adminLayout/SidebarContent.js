'use client'
import React, { useEffect, useState } from 'react';
import { Box, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import './css/sidebarcontent.css'
import { LuLayoutDashboard } from "react-icons/lu";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { TbUsersGroup } from "react-icons/tb";
import Link from "next/link"
import Image from 'next/image'
import { MdOutlineClass } from "react-icons/md";
import { RiFileAddLine } from "react-icons/ri";



const SidebarContent = ({ onCloseDrawer }) => {

    const [isMobileScreen, setIsMobileScreen] = useState(false);

    const hideDrawer = () => {
        if (isMobileScreen) {
            onCloseDrawer();
        }
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 765) {
                setIsMobileScreen(true);
            } else {
                setIsMobileScreen(false);
            }
        };

        // Initial check on mount
        handleResize();

        // Attach event listener to window resize
        window.addEventListener('resize', handleResize);

        // Clean-up function to remove event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [active, setActive] = useState(1);
    const styles = {
        singleOption: {
            display: 'flex',
            verticalAlign: 'middle',
            alignItems: 'center',
            gap: 8,
            color: '#1A1C20',
            // background: '#F5F5F5',
            marginBottom: 6,
            padding: '8px 16px',
            textDecoration: 'none',
            // marginTop: 6
        },
        activeSingleOption: {
            display: 'flex',
            verticalAlign: 'middle',
            alignItems: 'center',
            gap: 8,
            color: '#1A1C20',
            background: '#F5F5F5',
            marginBottom: 6,
            padding: '8px 16px',
            textDecoration: 'none',
            // marginTop: 6
        },
        subOption: {
            padding: '3px 0 3px 20px',
            marginLeft: 20
        }
    }

    return (
        <div>
            <div className='sidebar-header' >
                <Link href='/' style={{ display: "flex", gap: 5, textDecoration: 'none' }}>
                    <Image src={"/images/favicon.png"} height={50} width={50} />
                    <div style={{ fontWeight: 500, fontSize: 24, marginTop: 12, fontWeight: 'bold' }} >
                        Jya Trades
                    </div>
                </Link>

            </div>

            <div className='sidebar-content' >

                <Link onClick={() => { setActive(1); hideDrawer() }} href="/" style={active === 1 ? styles.activeSingleOption : styles.singleOption}                >
                    <LuLayoutDashboard />
                    <span style={{ fontWeight: '500' }} > Dashboard </span>
                </Link>

                {/* <Accordion allowToggle  >
                    <AccordionItem
                        border="none"

                    >
                        <AccordionButton
                            onClick={() => { setActive(0); }}
                            _expanded={{ bg: '#F5F5F5' }}
                        >
                            <Box as='span' flex='1' textAlign='left'>
                                <div style={{ display: 'flex', verticalAlign: 'middle', alignItems: 'center', gap: 8, }}>
                                    <CiPlay1 />
                                    <span style={{ fontWeight: '600' }} >
                                        Courses
                                    </span>
                                </div>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>

                        <Link onClick={() => { setActive(0); hideDrawer() }} href={''} style={{ textDecoration: 'none' }} >
                            <AccordionPanel style={styles.subOption}>
                                Add Courses
                            </AccordionPanel>
                        </Link>

                        <Link onClick={() => { setActive(0); hideDrawer() }} href={''} style={{ textDecoration: 'none' }}>
                            <AccordionPanel style={styles.subOption}>
                                View Courses
                            </AccordionPanel>
                        </Link>
                    </AccordionItem>
                </Accordion> */}

                <Link onClick={() => { setActive(2); hideDrawer() }} href="/admin/courses/add" style={active === 2 ? styles.activeSingleOption : styles.singleOption}>
                    <RiFileAddLine />
                    <span style={{ fontWeight: '500' }} > Add Courses </span>
                </Link>
                <Link onClick={() => { setActive(3); hideDrawer() }} href="/admin/courses/view" style={active === 3 ? styles.activeSingleOption : styles.singleOption}>
                    <MdOutlineClass />
                    <span style={{ fontWeight: '500' }} > View Courses </span>
                </Link>

                <Link onClick={() => { setActive(4); hideDrawer() }} href="/admin/subscription" style={active === 4 ? styles.activeSingleOption : styles.singleOption}>
                    <BiPurchaseTagAlt />
                    <span style={{ fontWeight: '500' }} > Subscription </span>
                </Link>

                <Link onClick={() => { setActive(5); hideDrawer() }} href="/admin/users" style={active === 5 ? styles.activeSingleOption : styles.singleOption}>
                    <TbUsersGroup />
                    <span style={{ fontWeight: '500' }} > View Users </span>
                </Link>


            </div>
        </div>
    )
}

export default SidebarContent
