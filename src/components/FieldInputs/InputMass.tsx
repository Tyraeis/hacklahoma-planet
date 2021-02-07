import React from "react";
import { Length } from "safe-units";
import { PLANET_MAX_MASS, PLANET_MIN_MASS } from "../../../web/planets/planet";
import Slider from "../Slider";

interface IProps {
  onChange: (value: number) => void;
}

const InputMass = (props: IProps): JSX.Element => {
  const { onChange } = props;

  return (
    <>
      <Slider min={PLANET_MIN_MASS.value} max={PLANET_MAX_MASS.value} defaultValue={PLANET_MAX_MASS.value / 10} onChange={onChange} />
    </>
  );
};

export default InputMass;
