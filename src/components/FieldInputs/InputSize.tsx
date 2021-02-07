import React from "react";
import { Length } from "safe-units";
import { PLANET_MAX_SIZE, PLANET_MIN_SIZE } from "../../../web/planets/planet";
import Slider from "../Slider";

interface IProps {
  onChange: (value: number) => void;
}

const InputSize = (props: IProps): JSX.Element => {
  const { onChange } = props;

  return (
    <>
      <Slider min={PLANET_MIN_SIZE.value} max={PLANET_MAX_SIZE.value} defaultValue={PLANET_MAX_SIZE.value / 10} onChange={onChange} />
    </>
  );
};

export default InputSize;
