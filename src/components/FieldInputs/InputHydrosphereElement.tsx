import React from "react";
import TextInput from "../TextInput";

interface IProps {
  onChange: (value: string) => void;
}

const InputHydrosphereElement = (props: IProps): JSX.Element => {
  const { onChange } = props;
  return <TextInput onChange={onChange}/>;
};

export default InputHydrosphereElement;
