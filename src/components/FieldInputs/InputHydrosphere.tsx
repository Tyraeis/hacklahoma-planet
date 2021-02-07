import React from "react";
import { HydrosphereType } from "../../../web/planets/planet";
import SimpleSelect from "../SimpleSelect";

interface IProps {
  onChange: (value: HydrosphereType) => void;
}

const options = [
  {
    value: HydrosphereType.None,
    label: HydrosphereType.None,
  },
  {
    value: HydrosphereType.Liquid,
    label: HydrosphereType.Liquid,
  },
  {
    value: HydrosphereType.Solid,
    label: HydrosphereType.Solid,
  }
];

const InputAtmosphere = (props: IProps): JSX.Element => {
  const {onChange} = props;
  return <SimpleSelect options={options} onChange={onChange}/>;
};

export default InputAtmosphere;
