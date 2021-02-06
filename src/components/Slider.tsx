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
  const { defaultValue, max, min, onChange } = props;

  const handleSliderChange = (value: number): void => {
    onChange(value)
  };
  
  return (
    <AntDesignSlider
      max={max}
      min={min}
      defaultValue={defaultValue}
      disabled={false}
      onChange={handleSliderChange}
    />
  );
};

export default Slider;
