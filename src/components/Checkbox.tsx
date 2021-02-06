import { Checkbox as AntDesignCheckbox } from "antd"
import { CheckboxChangeEvent } from "antd/lib/checkbox"
import React from "react"

interface IProps {
    checked: boolean;
    defaultChecked?: boolean;
    onChange?: (value: boolean) => void;
}

const Checkbox = (props: IProps): JSX.Element => {
    const { checked, defaultChecked, onChange} = props

    const handleChange = (e: CheckboxChangeEvent) => {
        onChange(e.target.value)
    }

    return (
        <AntDesignCheckbox checked={checked} defaultChecked={defaultChecked} onChange={handleChange}/>
    )
}

export default Checkbox;