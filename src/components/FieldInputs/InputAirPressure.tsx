import React from "react";
import { PLANET_MAX_AIR_PRESSURE, PLANET_MIN_AIR_PRESSURE } from "../../../web/planets/planet";
import Slider from "../Slider";

interface IProps {
  onChange: (value: number) => void;
}

const InputAirPressure = (props: IProps): JSX.Element => {
  const { onChange } = props;

  return <Slider min={PLANET_MIN_AIR_PRESSURE.value} max={PLANET_MAX_AIR_PRESSURE.value} defaultValue={PLANET_MAX_AIR_PRESSURE.value / 10} onChange={onChange} />;
};

export default InputAirPressure;
