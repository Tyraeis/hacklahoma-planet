import { Row, Col, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import {
  PLANET_DEF_BOND_ALBEDO,
  PLANET_DEF_DENSITY,
  PLANET_MAX_DENSITY,
  PLANET_MIN_DENSITY,
} from "../../../web/planets/planet";
import Slider from "../Slider";

interface IProps {
  onChange: (value: number) => void;
}

const InputDensity = (props: IProps): JSX.Element => {
  const { onChange } = props;

  const [value, setValue] = useState<number>(0);

  const handleChange = (value: number) => {
    setValue(value);
    onChange(value);
  };

  useEffect(() => {
    setValue(PLANET_DEF_DENSITY.value);
  }, []);
  
  return (
    <Row>
      <Col span={12}>
        <Slider
          min={PLANET_MIN_DENSITY.value}
          max={PLANET_MAX_DENSITY.value}
          defaultValue={PLANET_DEF_DENSITY.value}
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
      </Col>
    </Row>
  );
};

export default InputDensity;
