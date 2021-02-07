import React from "react";
import { Length } from "safe-units";
import { PLANET_MAX_GRAVITY, PLANET_MIN_GRAVITY } from "../../../web/planets/planet";
import Slider from "../Slider";

interface IProps {
  onChange: (value: number) => void;
}

const InputDensity = (props: IProps): JSX.Element => {
  const { onChange } = props;

  return (
    <>
      <Slider min={PLANET_MIN_GRAVITY.value} max={PLANET_MAX_GRAVITY.value} defaultValue={PLANET_MAX_GRAVITY.value / 10} onChange={onChange} />
    </>
  );
};

export default InputDensity;
