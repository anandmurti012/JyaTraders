import React, { useEffect, useState } from 'react';
import { Box, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import './css/sidebarcontent.css'
import { LuLayoutDashboard } from "react-icons/lu";
import { CiPlay1 } from "react-icons/ci";
import { NavLink } from 'react-router-dom';
import { PiTarget } from "react-icons/pi";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { TbUsersGroup } from "react-icons/tb";
import { BsCartCheck } from "react-icons/bs";
import { FaWpforms } from "react-icons/fa";



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
                <NavLink to='/' style={{ display: "flex", gap: 5, textDecoration: 'none' }}>
                    <img src='/img/logo.png' style={{ height: 30, width: 30, }} alt='logo' />
                    <div style={{ fontWeight: 500, fontSize: 18, marginTop: 2 }} >
                        Pioneers of Lic
                    </div>
                </NavLink>

            </div>

            <div className='sidebar-content' >

                <NavLink onClick={() => { setActive(1); hideDrawer() }} to="/" style={active === 1 ? styles.activeSingleOption : styles.singleOption}                >
                    <LuLayoutDashboard />
                    <span style={{ fontWeight: '500' }} > Dashboard </span>
                </NavLink>

                <Accordion allowToggle  >
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
                                        Classes
                                    </span>
                                </div>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>

                        <NavLink onClick={() => { setActive(0); hideDrawer() }} to={'/addCourses'} style={{ textDecoration: 'none' }} >
                            <AccordionPanel style={styles.subOption}>
                                Add Classes
                            </AccordionPanel>
                        </NavLink>

                        <NavLink onClick={() => { setActive(0); hideDrawer() }} to={'/viewSingleCourse'} style={{ textDecoration: 'none' }}>
                            <AccordionPanel style={styles.subOption}>
                                View Classes
                            </AccordionPanel>
                        </NavLink>
                    </AccordionItem>


                    <AccordionItem
                        border="none"

                    >
                        <AccordionButton
                            onClick={() => { setActive(0); }}
                            _expanded={{ bg: '#F5F5F5' }}
                        >
                            <Box as='span' flex='1' textAlign='left'>
                                <div style={{ display: 'flex', verticalAlign: 'middle', alignItems: 'center', gap: 8, }}>
                                    <FaWpforms />
                                    <span style={{ fontWeight: '600' }} >
                                        Forms
                                    </span>
                                </div>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>

                        <NavLink onClick={() => { setActive(0); hideDrawer() }} to={'/formsSection'} style={{ textDecoration: 'none' }} >
                            <AccordionPanel style={styles.subOption}>
                                Create Section
                            </AccordionPanel>
                        </NavLink>

                        <NavLink onClick={() => { setActive(0); hideDrawer() }} to={'/uploadForms'} style={{ textDecoration: 'none' }}>
                            <AccordionPanel style={styles.subOption}>
                                Upload Forms
                            </AccordionPanel>
                        </NavLink>
                    </AccordionItem>

                </Accordion>

                <NavLink onClick={() => { setActive(3); hideDrawer() }} to="/setTarget" style={active === 3 ? styles.activeSingleOption : styles.singleOption}>
                    <PiTarget />
                    <span style={{ fontWeight: '500' }} > Set Target </span>
                </NavLink>

                <NavLink onClick={() => { setActive(4); hideDrawer() }} to="/setSubscription" style={active === 4 ? styles.activeSingleOption : styles.singleOption}>
                    <BiPurchaseTagAlt />
                    <span style={{ fontWeight: '500' }} > Set Subscription </span>
                </NavLink>

                <NavLink onClick={() => { setActive(5); hideDrawer() }} to="/viewUsers" style={active === 5 ? styles.activeSingleOption : styles.singleOption}>
                    <TbUsersGroup />
                    <span style={{ fontWeight: '500' }} > View Users </span>
                </NavLink>

                <NavLink onClick={() => { setActive(6); hideDrawer() }} to="/viewPurchaseHistory" style={active === 6 ? styles.activeSingleOption : styles.singleOption}>
                    <BsCartCheck />
                    <span style={{ fontWeight: '500' }} > Purchase History </span>
                </NavLink>


            </div>
        </div>
    )
}

export default SidebarContent
