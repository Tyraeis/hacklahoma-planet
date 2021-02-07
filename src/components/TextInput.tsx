import { Input } from "antd"
import React, { ChangeEvent } from "react"

interface IProps {
    onChange?: (value: string) => void;
}
const TextInput = (props: IProps): JSX.Element => {
    const { onChange } = props;
    
    const handleChange = (e: any) => {
        onChange(e.target.value)
    }
    return <Input onChange={handleChange}/>
}

export default TextInput;