import { CircularProgress } from '@chakra-ui/react';
import React from 'react'

const Loading = () => {


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <CircularProgress size={10} isIndeterminate color='green.300' />
        </div>
    )
}

export default Loading
