import React from "react";
import { Length } from "safe-units";
import { PLANET_MAX_DENSITY, PLANET_MIN_DENSITY } from "../../../web/planets/planet";
import Slider from "../Slider";

interface IProps {
  onChange: (value: number) => void;
}

const InputDensity = (props: IProps): JSX.Element => {
  const { onChange } = props;

  return (
    <>
      <Slider min={PLANET_MIN_DENSITY.value} max={PLANET_MAX_DENSITY.value} defaultValue={PLANET_MAX_DENSITY.value / 10} onChange={onChange} />
    </>
  );
};

export default InputDensity;
