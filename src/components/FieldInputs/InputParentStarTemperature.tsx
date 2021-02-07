import React from "react";
import { PLANET_MAX_STAR_TEMPERATURE } from "../../../web/planets/planet";
import Slider from "../Slider";

interface IProps {
  onChange: (value: number) => void;
}

const InputParentStarTemperature = (props: IProps): JSX.Element => {
  const { onChange } = props;

  return <Slider min={0} max={PLANET_MAX_STAR_TEMPERATURE.value} defaultValue={PLANET_MAX_STAR_TEMPERATURE.value / 10} onChange={onChange} />;
};

export default InputParentStarTemperature;
