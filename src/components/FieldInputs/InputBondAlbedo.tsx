import React from "react";
import { PLANET_MAX_BOND_ALBEDO, PLANET_MIN_BOND_ALBEDO } from "../../../web/planets/planet";
import Slider from "../Slider";

interface IProps {
  onChange: (value: number) => void;
}

const InputBondAlbedo = (props: IProps): JSX.Element => {
  const { onChange } = props;

  return (
    <>
      <Slider granularity={.001} min={PLANET_MIN_BOND_ALBEDO.value} max={PLANET_MAX_BOND_ALBEDO.value} defaultValue={PLANET_MAX_BOND_ALBEDO.value / 10} onChange={onChange} />
    </>
  );
};

export default InputBondAlbedo;
