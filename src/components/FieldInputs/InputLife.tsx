import React from "react";
import { BiosphereType } from "../../../web/planets/planet";
import SimpleSelect from "../SimpleSelect";

interface IProps {
  onChange: (value: BiosphereType) => void;
}

const options = [
  {
    value: BiosphereType.None,
    label: BiosphereType.None,
  },
  {
    value: BiosphereType.Cellular,
    label: BiosphereType.Cellular,
  },
  {
    value: BiosphereType.SimplePlants,
    label: BiosphereType.SimplePlants,
  },
  {
    value: BiosphereType.ComplexPlants,
    label: BiosphereType.ComplexPlants,
  },
  {
    value: BiosphereType.SimpleAnimals,
    label: BiosphereType.SimpleAnimals,
  },
  {
    value: BiosphereType.ComplexAnimals,
    label: BiosphereType.ComplexAnimals,
  },
  {
    value: BiosphereType.SentientLife,
    label: BiosphereType.SentientLife,
  },
  {
    value: BiosphereType.SapientLife,
    label: BiosphereType.SapientLife,
  },
];

const InputLife = (props: IProps): JSX.Element => {
  const {onChange} = props;
  return <SimpleSelect options={options} onChange={onChange}/>;
};

export default InputLife;
