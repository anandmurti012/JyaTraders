import React from 'react'
import TopNavBar from './TopNavBar'
import LeftSideBar from './LeftSideBar'

const MainLayout = ({ Component }) => {
    return (
        <>

            <div className='mainDashBody'>
                <div id='leftSide'>
                    <LeftSideBar />
                </div>
                
                <div id='rightSide'>
                    <div className='sticky-top'>
                        <TopNavBar />
                    </div>
                    
                    <div className='adminComponents' >
                        <Component />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainLayout

