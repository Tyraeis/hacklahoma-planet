import { Slider as AntDesignSlider } from "antd";
import React from "react";

interface IProps {
  defaultValue?: number;
  disabled?: boolean;
  max?: number;
  min?: number;
  onChange: (value: number) => void;
  granularity?: number;
  value: number;
}

const Slider = (props: IProps): JSX.Element => {
  const { defaultValue, granularity, max, min, onChange, value } = props;

  const handleSliderChange = (value: number): void => {
    onChange(value)
  };
  
  return (
    <AntDesignSlider
      max={max}
      min={min}
      defaultValue={defaultValue}
      disabled={false}
      step={granularity}
      onChange={handleSliderChange}
      value={value}
    />
  );
};

export default Slider;
