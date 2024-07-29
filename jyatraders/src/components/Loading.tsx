import { CircularProgress } from '@chakra-ui/react';

export default function Loading({ pages }) {
    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'90vh'}} >
            <CircularProgress size={10} isIndeterminate color='green.300' />
        </div>
    );
};

