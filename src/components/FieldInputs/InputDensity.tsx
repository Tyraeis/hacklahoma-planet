import React from "react";
import { Length } from "safe-units";
import Slider from "../Slider";

interface IProps {
  onChange?: (value: number) => void;
}

const InputDensity = (props: IProps): JSX.Element => {
  const { onChange } = props;

  return (
    <>
      <Slider min={0} max={1000000} defaultValue={100000} onChange={onChange} />
    </>
  );
};

export default InputDensity;
