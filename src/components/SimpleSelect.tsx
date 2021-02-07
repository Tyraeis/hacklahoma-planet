import { Select as AntDesignSelect } from "antd";
import React from "react";

const { Option } = AntDesignSelect;

interface Item {
    value: any;
    label: string;
}

interface IProps {
    options: Item[]
    onChange?: (value: string) => void;
    width?: number;

}
const SimpleSelect = (props: IProps): JSX.Element => {
    const { options, onChange, width } = props;

    return (
        <AntDesignSelect style={{width: '25vw'}} defaultValue={options.length > 0 ? options[0].value : null} onChange={onChange}>
            {options.map((option: Item) => <Option value={option.value} style={{width: width}}>{option.label}</Option>)}
        </AntDesignSelect>
    )
}

export default SimpleSelect;