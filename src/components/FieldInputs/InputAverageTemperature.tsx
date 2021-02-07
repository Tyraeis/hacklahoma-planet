import { Row, Col, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import {
  PLANET_DEF_TEMPERATURE,
  PLANET_MAX_TEMPERATURE,
  PLANET_MIN_TEMPERATURE,
} from "../../../web/planets/planet";
import Slider from "../Slider";

interface IProps {
  onChange: (value: number) => void;
  symbol: string | undefined;
}

const InputAverageTemperature = (props: IProps): JSX.Element => {
  const { onChange, symbol } = props;

  const [value, setValue] = useState<number>(0);

  const handleChange = (value: number) => {
    setValue(value);
    onChange(value);
  };

  useEffect(() => {
    setValue(PLANET_DEF_TEMPERATURE.value);
  }, []);
  return (
    <Row>
      <Col span={12}>
        <Slider
          min={PLANET_MIN_TEMPERATURE.value}
          max={PLANET_MAX_TEMPERATURE.value}
          defaultValue={PLANET_DEF_TEMPERATURE.value}
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

export default InputAverageTemperature;
