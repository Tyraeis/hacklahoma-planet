import { Row, Col, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import { PLANET_DEF_AIR_PRESSURE, PLANET_DEF_BOND_ALBEDO, PLANET_MAX_AIR_PRESSURE, PLANET_MIN_AIR_PRESSURE } from "../../../web/planets/planet";
import Slider from "../Slider";

interface IProps {
  onChange: (value: number) => void;
}

const InputAirPressure = (props: IProps): JSX.Element => {
  const { onChange } = props;

  const [value, setValue] = useState<number>(0);

  const handleChange = (value: number) => {
    setValue(value)
    onChange(value)
  } 

  useEffect(() => {
      setValue(PLANET_DEF_AIR_PRESSURE.value)
  }, [])
  
  return (
    <Row>
      <Col span={12}>
        <Slider
          min={PLANET_MIN_AIR_PRESSURE.value}
          max={PLANET_MAX_AIR_PRESSURE.value}
          defaultValue={PLANET_DEF_AIR_PRESSURE.value}
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
  )
};

export default InputAirPressure;
