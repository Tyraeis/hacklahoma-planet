import { Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import InputAirPressure from "./FieldInputs/InputAirPressure";
import InputAtmosphere from "./FieldInputs/InputAtmosphere";
import InputDensity from "./FieldInputs/InputDensity";
import InputGravity from "./FieldInputs/InputGravity";
import InputMass from "./FieldInputs/InputMass";
import InputSize from "./FieldInputs/InputSize";
import InputHydrosphere from "./FieldInputs/InputHydrosphere";
import InputHydrosphereElement from "./FieldInputs/InputHydrosphereElement";
import InputAverageTemperature from "./FieldInputs/InputAverageTemperature";
import {
  Length,
  Measure,
  kilo,
  meters,
  grams,
  Mass,
  Acceleration,
  Temperature,
  kelvin,
  Pressure,
  atmospheres,
} from "safe-units";
import InputParentStarTemperature from "./FieldInputs/InputParentStarTemperature";
import InputParentStarLuminosity from "./FieldInputs/InputParentStarLuminosity";
import {
  AtmosphereType,
  BiosphereType,
  getStar,
  GRAVITIES,
  HydrosphereType,
  Planet,
  Star,
  YerkesSpectralType,
} from "../../web/planets/planet";
import InputLife from "./FieldInputs/InputLife";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface IProps {}

const PlanetForm = (props: IProps): JSX.Element => {
  const [currentPlanet, setCurrentPlanet] = useState<Planet | undefined>();
  const [planetSize, setPlanetSize] = useState<Length>(Measure.of(0, kilo(meters)));
  const [planetMass, setPlanetMass] = useState<Mass>(Measure.of(0, kilo(grams)));
  const [planetGravity, setPlanetGravity] = useState<Acceleration>(Measure.of(0, GRAVITIES));
  const [
    parentStarTemperature,
    setParentStarTemperature,
  ] = useState<Temperature>(Measure.of(0, kelvin));
  const [
    parentStarLuminosity,
    setParentStarLuminosity,
  ] = useState<YerkesSpectralType>(YerkesSpectralType.V);
  const [parentStar, setParentStar] = useState<Star | undefined>();
  const [planetAtmosphere, setPlanetAtmosphere] = useState<AtmosphereType>(AtmosphereType.None);
  const [planetHydrosphere, setPlanetHydrosphere] = useState<HydrosphereType>(HydrosphereType.None);
  const [planetLife, setPlanetLife] = useState<BiosphereType>(BiosphereType.None);
  const [planetAirPressure, setPlanetAirPressure] = useState<Pressure>(Measure.of(0, atmospheres));
  const [planetHydrosphereElement, setPlanetHydrosphereElement] = useState<string>('');
  const [planetAverageTemperature, setPlanetAverageTemperature] = useState<Temperature>(Measure.of(0, kelvin));
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
    setPlanetGravity(Measure.of(value, GRAVITIES));
  };

  const handleParentStarTemperatureChange = (value: number) => {
    setParentStarTemperature(Measure.of(value, kelvin));
  };

  const handleParentStarLuminosityChange = (value: YerkesSpectralType) => {
    setParentStarLuminosity(value);
  };

  useEffect(() => {
    setParentStar(getStar(parentStarTemperature, parentStarLuminosity));
  }, [parentStarLuminosity, parentStarTemperature]);

  const handleAtmosphereChange = (value: AtmosphereType) => {
    setPlanetAtmosphere(value);
  };

  const handleHydrosphereChange = (value: HydrosphereType) => {
    setPlanetHydrosphere(value);
  };

  const handleLifeChange = (value: BiosphereType) => {
    setPlanetLife(value);
  };

  const handleAirPressureChange = (value: number) => {
    setPlanetAirPressure(Measure.of(value, atmospheres))
  }


  const handleHydrosphereElementChange = (value: string) => {
    setPlanetHydrosphereElement(value)
  }

  
  const handleAverageTemperatureChange = (value: number) => {
    setPlanetAverageTemperature(Measure.of(value, kelvin))
  }

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
        label="Parent Star Temperature"
        name="parentStar"
        rules={[{ required: true, message: "Please input parentStar!" }]}
      >
        <InputParentStarTemperature
          onChange={handleParentStarTemperatureChange}
        />
      </Form.Item>
      <Form.Item
        label="Parent Star Luminosity"
        name="parentStar"
        rules={[{ required: true, message: "Please input parentStar!" }]}
      >
        <InputParentStarLuminosity
          onChange={handleParentStarLuminosityChange}
        />
      </Form.Item>
      <Form.Item
        label="Atmosphere"
        name="atmosphere"
        rules={[{ required: true, message: "Please input atmosphere!" }]}
      >
        <InputAtmosphere onChange={handleAtmosphereChange} />
      </Form.Item>
      <Form.Item
        label="Air Pressure"
        name="airPressure"
        rules={[{ required: true, message: "Please input airPressure!" }]}
      >
        <InputAirPressure onChange={handleAirPressureChange}/>
      </Form.Item>
      <Form.Item
        label="Hydrosphere"
        name="hydrosphere"
        rules={[{ required: true, message: "Please input hydrosphere!" }]}
      >
        <InputHydrosphere onChange={handleHydrosphereChange}/>
      </Form.Item>
      <Form.Item
        label="Hydrosphere Element"
        name="hydrosphereElement"
        rules={[
          { required: true, message: "Please input hydrosphereElement!" },
        ]}
      >
        <InputHydrosphereElement onChange={handleHydrosphereElementChange}/>
      </Form.Item>
      <Form.Item
        label="Average Temperature"
        name="averageTemperature"
        rules={[
          { required: true, message: "Please input averageTemperature!" },
        ]}
      >
        <InputAverageTemperature onChange={handleAverageTemperatureChange}/>
      </Form.Item>
      <Form.Item
        label="Life"
        name="life"
        rules={[{ required: true, message: "Please input life!" }]}
      >
        <InputLife onChange={handleLifeChange}/>
      </Form.Item>
    </Form>
  );
};

export default PlanetForm;
