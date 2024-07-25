import React from 'react'
import { Input } from "antd";
const CustomInput = ({ inputData,value,ref, Icon, placeholder, type,name }) => {
    return (
        <Input
            size="large"
            name={name}
            ref={ref}
            value={value}
            placeholder={placeholder}
            onChange={inputData}
            prefix={Icon}
            style={{ borderRadius: 5 }}
            type={type}
        />
    )
}

export default CustomInput
