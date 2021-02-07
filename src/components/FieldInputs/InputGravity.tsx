import { Col, InputNumber, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Length } from "safe-units";
import { PLANET_DEF_BOND_ALBEDO, PLANET_DEF_GRAVITY, PLANET_MAX_GRAVITY, PLANET_MIN_GRAVITY } from "../../../web/planets/planet";
import Slider from "../Slider";

interface IProps {
  onChange: (value: number) => void;
  symbol: string | undefined;
}

const InputDensity = (props: IProps): JSX.Element => {
  const { onChange, symbol } = props;

  const [value, setValue] = useState<number>(0);

  const handleChange = (value: number) => {
    setValue(value)
    onChange(value)
  } 

  useEffect(() => {
      setValue(PLANET_DEF_GRAVITY.value)
  }, [])
  
  return (
    <Row>
      <Col span={12}>
        <Slider
          min={PLANET_MIN_GRAVITY.value}
          max={PLANET_MAX_GRAVITY.value}
          defaultValue={PLANET_DEF_GRAVITY.value}
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

export default InputDensity;
