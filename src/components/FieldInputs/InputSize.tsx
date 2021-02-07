import { Row, Col, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import {
  PLANET_DEF_SIZE,
  PLANET_MAX_SIZE,
  PLANET_MIN_SIZE,
} from "../../../web/planets/planet";
import Slider from "../Slider";

interface IProps {
  onChange: (value: number) => void;
}

const InputSize = (props: IProps): JSX.Element => {
  const { onChange } = props;

  const [value, setValue] = useState<number>(0);

  const handleChange = (value: number) => {
    setValue(value);
    onChange(value);
  };

  useEffect(() => {
    setValue(PLANET_DEF_SIZE.value);
  }, []);
  return (
    <Row>
      <Col span={12}>
        <Slider
          min={PLANET_MIN_SIZE.value}
          max={PLANET_MAX_SIZE.value}
          defaultValue={PLANET_MAX_SIZE.value}
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

export default InputSize;
