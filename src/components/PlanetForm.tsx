import { Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import Checkbox from "./Checkbox";
import InputAirPressure from "./FieldInputs/InputAirPressure";
import InputAtmosphere from "./FieldInputs/InputAtmosphere";
import InputDensity from "./FieldInputs/InputDensity";
import InputGravity from "./FieldInputs/InputGravity";
import InputMass from "./FieldInputs/InputMass";
import InputParentStar from "./FieldInputs/InputParentStar";
import InputSize from "./FieldInputs/InputSize";
import InputHydrosphere from "./FieldInputs/InputHydrosphere";
import InputHydrosphereElement from "./FieldInputs/InputHydrosphereElement";
import InputAverageTemperature from "./FieldInputs/InputAverageTemperature";
import InputLife from "./FieldInputs/InputAverageTemperature";
import { Length, Measure, kilo, meters, grams, Mass, Acceleration } from "safe-units";
import {StellarObjects} from '../../web/planets/planet';

const Planet = StellarObjects;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface IProps {
  onChange?: (value: StellarObjects.Planet) => void;
}

const PlanetForm = (props: IProps): JSX.Element => {
  const [currentPlanet, setCurrentPlanet] = useState<StellarObjects.Planet>();
  const [planetSize, setPlanetSize] = useState<Length>();
  const [planetMass, setPlanetMass] = useState<Mass>();
  const [planetGravity, setPlanetGravity] = useState<Acceleration>();
  const {} = props;

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleSizeChange = (value: number) => {
    setPlanetSize(Measure.of(value, kilo(meters)));
  };

  const handleMassChange = (value: number) => {
    setPlanetMass(Measure.of(value, kilo(grams)));
  };

  const handleGravityChange = (value: number) => {
    setPlanetGravity(Measure.of(value, StellarObjects.GRAVITIES));
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Size"
        name="size"
        rules={[{ required: true, message: "Please input size!" }]}
      >
        <InputSize onChange={handleSizeChange} />
      </Form.Item>
      <Form.Item
        label="Mass"
        name="mass"
        rules={[{ required: true, message: "Please input mass!" }]}
      >
        <InputMass onChange={handleMassChange} />
      </Form.Item>
      <Form.Item
        label="Density"
        name="density"
        rules={[{ required: true, message: "Please input density!" }]}
      >
        <InputDensity onChange={handleMassChange} />
      </Form.Item>
      <Form.Item
        label="Gravity"
        name="gravity"
        rules={[{ required: true, message: "Please input gravity!" }]}
      >
        <InputGravity onChange={handleGravityChange} />
      </Form.Item>
      <Form.Item
        label="Parent Star"
        name="parentStar"
        rules={[{ required: true, message: "Please input parentStar!" }]}
      >
        <InputParentStar />
      </Form.Item>
      <Form.Item
        label="Atmosphere"
        name="atmosphere"
        rules={[{ required: true, message: "Please input atmosphere!" }]}
      >
        <InputAtmosphere />
      </Form.Item>
      <Form.Item
        label="Air Pressure"
        name="airPressure"
        rules={[{ required: true, message: "Please input airPressure!" }]}
      >
        <InputAirPressure />
      </Form.Item>
      <Form.Item
        label="Hydrosphere"
        name="hydrosphere"
        rules={[{ required: true, message: "Please input hydrosphere!" }]}
      >
        <InputHydrosphere />
      </Form.Item>
      <Form.Item
        label="Hydrosphere Element"
        name="hydrosphereElement"
        rules={[
          { required: true, message: "Please input hydrosphereElement!" },
        ]}
      >
        <InputHydrosphereElement />
      </Form.Item>
      <Form.Item
        label="Average Temperature"
        name="averageTemperature"
        rules={[
          { required: true, message: "Please input averageTemperature!" },
        ]}
      >
        <InputAverageTemperature />
      </Form.Item>
      <Form.Item
        label="Life"
        name="life"
        rules={[{ required: true, message: "Please input life!" }]}
      >
        <InputLife />
      </Form.Item>
    </Form>
  );
};

export default PlanetForm;
