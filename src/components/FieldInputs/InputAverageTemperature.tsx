import React from "react";
import { PLANET_MAX_TEMPERATURE, PLANET_MIN_TEMPERATURE } from "../../../web/planets/planet";
import Slider from "../Slider";

interface IProps {
  onChange: (value: number) => void;
}

const InputAverageTemperature = (props: IProps): JSX.Element => {
  const { onChange } = props;

  return <Slider min={PLANET_MIN_TEMPERATURE.value} max={PLANET_MAX_TEMPERATURE.value} defaultValue={PLANET_MAX_TEMPERATURE.value / 10} onChange={onChange} />;
};

export default InputAverageTemperature;
