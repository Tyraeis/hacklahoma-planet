import { Col, InputNumber, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Dimensionless } from "safe-units";
import {
    PLANET_DEF_BOND_ALBEDO,
  PLANET_MAX_BOND_ALBEDO,
  PLANET_MIN_BOND_ALBEDO,
} from "../../../web/planets/planet";
import Slider from "../Slider";

interface IProps {
    onChange: (value: number) => void;
}

const InputBondAlbedo = (props: IProps): JSX.Element => {
  const { onChange } = props;

  const [value, setValue] = useState<number>(0);

  const handleChange = (value: number) => {
    setValue(value)
    onChange(value)
  } 

  useEffect(() => {
      setValue(PLANET_DEF_BOND_ALBEDO.value)
  }, [])

  return (
    <Row>
      <Col span={12}>
        <Slider
          granularity={0.001}
          min={PLANET_MIN_BOND_ALBEDO.value}
          max={PLANET_MAX_BOND_ALBEDO.value}
          defaultValue={PLANET_DEF_BOND_ALBEDO.value}
          onChange={handleChange}
          value={value}
        />
      </Col>
      <Col>
        <InputNumber
          style={{ margin: "0 21px" }}
          value={value}
          onChange={handleChange}
          step={.01}
        />
      </Col>
    </Row>
  );
};

export default InputBondAlbedo;
