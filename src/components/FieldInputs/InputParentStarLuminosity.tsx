import React from "react";
import { YerkesSpectralType } from "../../../web/planets/planet";
import SimpleSelect from "../SimpleSelect";

interface IProps {
  onChange: (value: YerkesSpectralType) => void;
}

const options = [
  {
    value: YerkesSpectralType.IaP,
    label: YerkesSpectralType.IaP,
  },
  {
    value: YerkesSpectralType.Ia,
    label: YerkesSpectralType.Ia,
  },
  {
    value: YerkesSpectralType.Iab,
    label: YerkesSpectralType.Iab,
  },
  {
    value: YerkesSpectralType.Ib,
    label: YerkesSpectralType.Ib,
  },
  {
    value: YerkesSpectralType.II,
    label: YerkesSpectralType.II,
  },
  {
    value: YerkesSpectralType.III,
    label: YerkesSpectralType.III,
  },
  {
    value: YerkesSpectralType.IV,
    label: YerkesSpectralType.IV,
  },
  {
    value: YerkesSpectralType.V,
    label: YerkesSpectralType.V,
  },
  {
    value: YerkesSpectralType.VI,
    label: YerkesSpectralType.VI,
  },
  {
    value: YerkesSpectralType.VII,
    label: YerkesSpectralType.VII,
  },
];

const InputParentStarLuminosity = (props: IProps): JSX.Element => {
  const { onChange } = props;
  return <SimpleSelect options={options} onChange={onChange}/>;
};

export default InputParentStarLuminosity;
