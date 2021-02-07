import { Radio } from "antd";
import React from "react";

export interface IRadioOption {
    label: string;
    value: string;
}

interface IProps {
  options: IRadioOption[];
}

const RadioGroup = (props: IProps): JSX.Element => {
  const { options } = props;
  return (
    <Radio.Group name="radiogroup" defaultValue={1}>
      {options.map((option: IRadioOption) => <Radio value={option.value}>{option.label}</Radio>)}
    </Radio.Group>
  );
};

export default RadioGroup;
