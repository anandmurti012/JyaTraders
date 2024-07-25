import { Textarea } from '@chakra-ui/react'

const CustomTextArea = ({ inputData, value, placeholder, name }) => {
    return (
        <Textarea
            name={name}
            value={value}
            onChange={inputData}
            placeholder={placeholder}
            rows={5}
        />
    )
}

export default CustomTextArea
