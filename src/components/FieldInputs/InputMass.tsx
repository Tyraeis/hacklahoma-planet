import { Row, Col, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import { GenericMeasure, Measure } from "safe-units";
import {
  EARTH_MASS,
  PLANET_DEF_MASS,
  PLANET_MAX_MASS,
  PLANET_MIN_MASS,
} from "../../../web/planets/planet";
import Slider from "../Slider";

interface IProps {
  onChange: (value: number) => void;
  symbol?: string | undefined;
}

const InputMass = (props: IProps): JSX.Element => {
  const { onChange, symbol } = props;

  const [value, setValue] = useState<number>(0);

  const handleChange = (value: number) => {
    setValue(value);
    onChange(value);
  };

  useEffect(() => {
    setValue(PLANET_DEF_MASS.value / EARTH_MASS.value);
  }, []);

  return (
    <Row>
      <Col span={12}>
        <Slider
          min={PLANET_MIN_MASS.value / EARTH_MASS.value}
          max={PLANET_MAX_MASS.value / EARTH_MASS.value}
          defaultValue={PLANET_DEF_MASS.value / EARTH_MASS.value}
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

export default InputMass;
