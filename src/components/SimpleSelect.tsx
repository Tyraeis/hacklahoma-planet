import { Select as AntDesignSelect } from "antd";
import React from "react";

const { Option } = AntDesignSelect;

interface IProps {
    options: string[]
    onChange?: (value: string) => void;
    width?: number;

}
const SimpleSelect = (props: IProps): JSX.Element => {
    const { options, onChange, width } = props;

    return (
        <AntDesignSelect defaultValue={options.length > 0 ? options[0] : null} onChange={onChange}>
            {options.map((option: string) => <Option value={option} style={{width: width}}>{option}</Option>)}
        </AntDesignSelect>
    )
}

export default SimpleSelect;