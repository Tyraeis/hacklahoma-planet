import React from "react";
import { AtmosphereType } from "../../../web/planets/planet";
import SimpleSelect from "../SimpleSelect";

interface IProps {
  onChange?: (value: AtmosphereType) => void;
}

const options = [
  {
    value: AtmosphereType.Inert,
    label: AtmosphereType.Inert,
  },
  {
    value: AtmosphereType.Hydrogen,
    label: AtmosphereType.Hydrogen,
  },
  {
    value: AtmosphereType.Oxygen,
    label: AtmosphereType.Oxygen,
  },
  {
    value: AtmosphereType.Methane,
    label: AtmosphereType.Methane,
  },
  {
    value: AtmosphereType.Corrosive,
    label: AtmosphereType.Corrosive,
  },
  {
    value: AtmosphereType.Reducing,
    label: AtmosphereType.Reducing,
  },
];

const InputAtmosphere = (props: IProps): JSX.Element => {
  const {} = props;
  return <SimpleSelect options={options} />;
};

export default InputAtmosphere;
