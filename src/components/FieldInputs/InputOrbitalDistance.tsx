import { Row, Col, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import { Length } from "safe-units";
import {
    AU,
    PLANET_DEF_BOND_ALBEDO,
    PLANET_DEF_ORBITAL_DISTANCE,
  PLANET_MAX_ORBITAL_DISTANCE,
  PLANET_MIN_ORBITAL_DISTANCE,
} from "../../../web/planets/planet";
import Slider from "../Slider";

interface IProps {
  onChange: (value: number) => void;
  symbol: string | undefined;
}

const InputOrbitalDistance = (props: IProps): JSX.Element => {
  const { onChange, symbol } = props;

  const [value, setValue] = useState<number>(0);

  const handleChange = (value: number) => {
    setValue(value);
    onChange(value);
  };

  useEffect(() => {
    setValue(PLANET_DEF_ORBITAL_DISTANCE.value / AU.value);
  }, []);
  return (
    <Row>
      <Col span={12}>
        <Slider
          min={PLANET_MIN_ORBITAL_DISTANCE.value / AU.value}
          max={PLANET_MAX_ORBITAL_DISTANCE.value / AU.value}
          defaultValue={PLANET_DEF_ORBITAL_DISTANCE.value / AU.value}
          onChange={handleChange}
          value={value}
        />
      </Col>
      <Col>
        <InputNumber
          style={{ margin: "0 16px" }}
          value={value}
          onChange={handleChange}
        />
        {symbol}
      </Col>
    </Row>
  );
};

export default InputOrbitalDistance;
