'use client'
import React, { useEffect, useState } from 'react'
import './css/styles.css'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'
import MobileMenu from './MobileMenu';
import Link from "next/link"

export default function TopNavBar() {
    const admin ={}

    const Logout = () => {
        // persistor.purge().then(() => {
        //     window.location.reload();
        // });
    }

    const [isExpand, setisExpand] = useState(true);

    // toggle sidebar
    const toggleSideButton = (e) => {
        if (document.getElementById('leftSide').style.display === 'none') {
            setisExpand(true)
            document.getElementById('leftSide').style.display = 'block';
            document.getElementById('leftSide').style.transitionDelay = '2s';
            document.getElementById('rightSide').style.width = '84%';
        } else {
            setisExpand(false)
            document.getElementById('leftSide').style.display = 'none';
            document.getElementById('rightSide').style.width = '100%';
        }
    }


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 765) {
                setisExpand(false)
                document.getElementById('leftSide').style.display = 'none';
                document.getElementById('rightSide').style.width = '100%';
            } else {
                setisExpand(true)
                document.getElementById('leftSide').style.display = 'block';
                document.getElementById('leftSide').style.transitionDelay = '2s';
                document.getElementById('rightSide').style.width = '84%';
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



    return (
        <div className='nav-bar'>

            <div>
                <div className='mobile-menu'>
                    <MobileMenu />
                </div>

                <button className='mobile-none' onClick={() => { toggleSideButton() }}  >
                    {
                        isExpand ?
                            <i class="fa-solid fa-angles-left" style={{ color: '#196ECF', fontSize: '20px' }} ></i>
                            :
                            <i class="fa-solid fa-angles-right" style={{ color: '#196ECF', fontSize: '20px' }} ></i>
                    }
                </button>
            </div>

            <div>

                <Menu>
                    <MenuButton >
                        <Link href="">
                            {/* <img
                                name='A D'
                                src={`${process.env.REACT_APP_APIURL}/uploads/admins/${admin.image}`}
                                style={{ height: 35, width: 35, borderRadius: 100 }}
                                onError={(e) => {
                                    e.target.src = "https://cdn-icons-png.flaticon.com/128/149/149071.png"; // Replace with a placeholder image path
                                    e.target.onerror = null; // Prevent infinite loop in case placeholder image also fails to load
                                }}
                            /> */}
                        </Link>
                    </MenuButton>

                    <MenuList>
                        <MenuItem>Profile</MenuItem>
                        <MenuItem onClick={Logout} >Logout</MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </div>
    )
}

