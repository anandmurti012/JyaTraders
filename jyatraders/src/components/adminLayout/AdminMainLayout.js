import React from 'react'
import TopNavBar from './TopNavBar'
import LeftSideBar from './LeftSideBar'

export default function AdminMainLayout({ children }) {
    return (
        <>
            <div className='mainDashBody' style={{ background: "#eee" }}>
                <div id='leftSide'>
                    <LeftSideBar />
                </div>

                <div id='rightSide'>
                    <div className='sticky-top'>
                        <TopNavBar />
                    </div>

                    <div className='adminComponents' >
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}
