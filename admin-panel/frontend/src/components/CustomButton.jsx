import { Button } from '@chakra-ui/react'
import React from 'react'

const CustomButton = ({ title, isLoading, backgroundColor, loadingText, buttonClick, variant, colorScheme, width }) => {
    return (
        <Button
            variant={variant}
            colorScheme={colorScheme}
            isLoading={isLoading}
            loadingText={loadingText}
            onClick={buttonClick}
            style={{
                paddingBottom: 1,
                height: 35,
                width: width,
                background: backgroundColor
            }}
        >
            {title}
        </Button>
    )
}

export default CustomButton
