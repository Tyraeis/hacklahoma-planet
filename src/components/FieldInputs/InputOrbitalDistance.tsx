import React from "react";
import { Length } from "safe-units";
import { PLANET_MAX_ORBITAL_DISTANCE, PLANET_MIN_ORBITAL_DISTANCE } from "../../../web/planets/planet";
import Slider from "../Slider";

interface IProps {
  onChange: (value: number) => void;
}

const InputOrbitalDistance = (props: IProps): JSX.Element => {
  const { onChange } = props;

  return (
    <>
      <Slider min={PLANET_MIN_ORBITAL_DISTANCE.value} max={PLANET_MAX_ORBITAL_DISTANCE.value} defaultValue={PLANET_MAX_ORBITAL_DISTANCE.value / 10} onChange={onChange} />
    </>
  );
};

export default InputOrbitalDistance;
