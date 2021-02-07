import { Form } from "antd";
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
  Dimensionless,
  VolumeDensity,
} from "safe-units";
import InputParentStarTemperature from "./FieldInputs/InputParentStarTemperature";
import InputParentStarLuminosity from "./FieldInputs/InputParentStarLuminosity";
import {
  AtmosphereType,
  AU,
  BiosphereType,
  EARTH_MASS,
  getStar,
  GRAVITIES,
  HydrosphereType,
  Planet,
  PLANET_DEF_AIR_PRESSURE,
  PLANET_DEF_BOND_ALBEDO,
  PLANET_DEF_DENSITY,
  PLANET_DEF_GRAVITY,
  PLANET_DEF_MASS,
  PLANET_DEF_ORBITAL_DISTANCE,
  PLANET_DEF_SIZE,
  PLANET_DEF_STAR_TEMPERATURE,
  Star,
  YerkesSpectralType,
} from "../../web/planets/planet";
import InputLife from "./FieldInputs/InputLife";
import InputBondAlbedo from "./FieldInputs/InputBondAlbedo";
import InputOrbitalDistance from "./FieldInputs/InputOrbitalDistance";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface IProps {
  updatePlanet: (p: Planet | undefined) => void;
}



const PlanetForm = (props: IProps): JSX.Element => {
  const [currentPlanet, setCurrentPlanet] = useState<Planet | undefined>();
  const [planetSize, setPlanetSize] = useState<Length>(PLANET_DEF_SIZE);
  const [planetMass, setPlanetMass] = useState<Mass>(PLANET_DEF_MASS);
  const [planetDensity, setPlanetDensity] = useState<VolumeDensity>(
    PLANET_DEF_DENSITY
  );
  const [planetGravity, setPlanetGravity] = useState<Acceleration>(
    PLANET_DEF_GRAVITY
  );
  const [
    parentStarTemperature,
    setParentStarTemperature,
  ] = useState<Temperature>(PLANET_DEF_STAR_TEMPERATURE);
  const [
    parentStarLuminosity,
    setParentStarLuminosity,
  ] = useState<YerkesSpectralType>(YerkesSpectralType.V);
  const [parentStar, setParentStar] = useState<Star>();
  const [planetAtmosphere, setPlanetAtmosphere] = useState<AtmosphereType>(
    AtmosphereType.None
  );
  const [planetHydrosphere, setPlanetHydrosphere] = useState<HydrosphereType>(
    HydrosphereType.None
  );
  const [planetLife, setPlanetLife] = useState<BiosphereType>(
    BiosphereType.None
  );
  const [planetAirPressure, setPlanetAirPressure] = useState<Pressure>(
    PLANET_DEF_AIR_PRESSURE
  );
  const [
    planetHydrosphereElement,
    setPlanetHydrosphereElement,
  ] = useState<string>("");
  const [
    planetAverageTemperature,
    setPlanetAverageTemperature,
  ] = useState<Temperature>(Measure.of(0, kelvin));
  const [planetBondAlbedo, setPlanetBondAlbedo] = useState<Dimensionless>(
    PLANET_DEF_BOND_ALBEDO
  );
  const [planetOrbitalDistance, setPlanetOrbitalDistance] = useState<Length>(
    PLANET_DEF_ORBITAL_DISTANCE
  );
  const { updatePlanet } = props;

  useEffect(() => {
    if (parentStar !== undefined) {
      const planet: Planet = {
        size: planetSize,
        mass: planetMass,
        density: planetDensity,
        gravity: planetGravity,
        parentStar: parentStar,
        atmosphere: planetAtmosphere,
        airPressure: planetAirPressure,
        hydrosphere: planetHydrosphere,
        hydrosphereElement: planetHydrosphereElement,
        averageTemperature: planetAverageTemperature,
        life: planetLife,
        bondAlbedo: planetBondAlbedo,
        orbitalDistance: planetOrbitalDistance,
      };
      setCurrentPlanet(planet);
    }
  }, [
    planetSize,
    planetMass,
    planetDensity,
    planetGravity,
    parentStar,
    planetAtmosphere,
    planetAirPressure,
    planetHydrosphere,
    planetAverageTemperature,
    planetAverageTemperature,
    planetLife,
    planetBondAlbedo,
    planetOrbitalDistance,
  ]);

  useEffect(() => {
    updatePlanet(currentPlanet);
  }, [currentPlanet]);

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
    setPlanetMass(Measure.of(value, EARTH_MASS));
  };

  const handleDensityChange = (value: number) => {
    setPlanetMass(Measure.of(value, VolumeDensity));
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
    setPlanetAirPressure(Measure.of(value, atmospheres));
  };

  const handleHydrosphereElementChange = (value: string) => {
    setPlanetHydrosphereElement(value);
  };

  const handleAverageTemperatureChange = (value: number) => {
    setPlanetAverageTemperature(Measure.of(value, kelvin));
  };

  const handleBondAlbedoChange = (value: number) => {
    setPlanetBondAlbedo(Measure.of(value, Dimensionless));
  };

  const handleOrbitalDistanceChange = (value: number) => {
    setPlanetOrbitalDistance(Measure.of(value, AU));
  };

  useEffect(() => {
    console.log(Mass.symbol);
  }, []);

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item label="Size" name="size">
        <InputSize
          onChange={handleSizeChange}
          symbol={Length.symbol?.toString()}
        />
      </Form.Item>
      <Form.Item label='Mass'  name="mass">
        <InputMass
          onChange={handleMassChange}
          symbol={Mass.symbol?.toString()}
        />
      </Form.Item>
      <Form.Item label="Density" name="density">
        <InputDensity onChange={handleDensityChange} symbol={"kg/m^3"} />
      </Form.Item>
      <Form.Item label="Gravity" name="gravity">
        <InputGravity onChange={handleGravityChange} symbol={"m/s^2"} />
      </Form.Item>
      <Form.Item label="Parent Star Temperature" name="parentStar">
        <InputParentStarTemperature
          onChange={handleParentStarTemperatureChange}
          symbol={kelvin.symbol?.toString()}
        />
      </Form.Item>
      <Form.Item label="Parent Star Luminosity" name="parentStar">
        <InputParentStarLuminosity
          onChange={handleParentStarLuminosityChange}
        />
      </Form.Item>
      <Form.Item label="Atmosphere" name="atmosphere">
        <InputAtmosphere onChange={handleAtmosphereChange} />
      </Form.Item>
      <Form.Item label="Air Pressure" name="airPressure">
        <InputAirPressure
          onChange={handleAirPressureChange}
          symbol={atmospheres.symbol?.toString()}
        />
      </Form.Item>
      <Form.Item label="Hydrosphere" name="hydrosphere">
        <InputHydrosphere onChange={handleHydrosphereChange} />
      </Form.Item>
      <Form.Item label="Hydrosphere Element" name="hydrosphereElement">
        <InputHydrosphereElement onChange={handleHydrosphereElementChange} />
      </Form.Item>
      <Form.Item label="Average Temperature" name="averageTemperature">
        <InputAverageTemperature
          onChange={handleAverageTemperatureChange}
          symbol={kelvin.symbol?.toString()}
        />
      </Form.Item>
      <Form.Item label="Life" name="life">
        <InputLife onChange={handleLifeChange} />
      </Form.Item>
      <Form.Item label="Bond Albedo" name="bondAlbedo">
        <InputBondAlbedo
          onChange={handleBondAlbedoChange}
          symbol={Dimensionless.symbol?.toString()}
        />
      </Form.Item>
      <Form.Item label="Orbital Distance" name="orbitalDistance">
        <InputOrbitalDistance
          onChange={handleOrbitalDistanceChange}
          symbol={AU.symbol?.toString()}
        />
      </Form.Item>
    </Form>
  );
};

export default PlanetForm;
