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
import { MdFormatAlignLeft } from "react-icons/md";
import Image from 'next/image'


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

            console.log(window.innerWidth)
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
        <div className='nav-bar' >

            <div>
                <div className='mobilemenu'>
                    <MobileMenu />
                </div>

                <button className='mobile-none' onClick={() => { toggleSideButton() }}  >
                   <MdFormatAlignLeft style={{fontSize:'24px'}} />
                </button>
            </div>

            <div>

                <Menu>
                    <MenuButton >
                        <Link href="/admin">
                            <Image
                                name='A D'
                                src={`https://cdn-icons-png.flaticon.com/128/149/149071.png`}
                                height={38}
                                width={38}
                                style={{ borderRadius: 100 }}
                            />
                        </Link>
                    </MenuButton>

                    <MenuList>
                        {/* <MenuItem>Profile</MenuItem> */}
                        <MenuItem onClick={Logout} >Logout</MenuItem>
                    </MenuList>
                </Menu>
            </div>
        </div>
    )
}

