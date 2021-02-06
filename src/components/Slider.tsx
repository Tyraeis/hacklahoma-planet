import { Slider as AntDesignSlider } from "antd";
import React from "react";

interface IProps {
  defaultValue?: number;
  disabled?: boolean;
  max?: number;
  min?: number;
  onChange: (value: number) => void;
}

const Slider = (props: IProps): JSX.Element => {
  const { defaultValue, max, min } = props;
  
  return (
    <AntDesignSlider
      max={max}
      min={min}
      defaultValue={defaultValue}
      disabled={false}
    />
  );
};

export default Slider;
