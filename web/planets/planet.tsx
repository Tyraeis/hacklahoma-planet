import {
  Mass,
  Length,
  Acceleration,
  VolumeDensity,
  Temperature,
  Measure,
  kelvin,
  Pressure,
  kilograms,
  meters,
  seconds,
  kilo,
  grams,
  centi,
  pascals,
  yocto,
  moles,
  newtons,
  wrapUnaryFn,
  Volume,
  atmospheres,
  Dimensionless,
  wrapRootFn,
  giga,
} from "safe-units";

const cubic_meter = meters.cubed();
export const GRAVITIES = Measure.of(
  1,
  meters.per(seconds.squared()).scale(9.81),
  "g"
);
let amu = Measure.of(1.66053907, yocto(grams), "amu"); //Unified atomic mass unit
const GAS_CONSTANT = Measure.of(
  8.3143,
  newtons.times(meters).per(moles.times(kelvin))
);
const AU = Measure.of(1.496e8, kilo(meters), "AU");

export const EARTH_MASS = Measure.of(5.972e24, kilograms, "M 🜨");
export const EARTH_RADIUS = Measure.of(6371, kilo(meters), "R 🜨");
export const EARTH_DIAMETER = EARTH_RADIUS.scale(2);
export const EARTH_DENSITY = Measure.of(
  5.514,
  grams.per(centi(meters).cubed()),
  "ρ 🜨"
); //Do not use centi(cubic_meters)! They are not the same measurement!

export enum HarvardSpectralType { //Star Color
  O,
  B,
  A,
  F,
  G,
  K,
  M,
}

export enum YerkesSpectralType { //Luminosity Class
  IaP = "IaP - Hypergiant",
  Ia = "Ia - Bright Supergiant",
  Iab = "Iab - Intermediate Supergiant",
  Ib = "Ib - Dim Supergiant",
  II = "II - Bright Giant",
  III = "III - Giant",
  IV = "IV - Subgiant",
  V = "V - Main Sequence Star",
  VI = "VI - Subdwarf",
  VII = "VII - White Dwarf",
}

export type StellarClassification = {
  color: HarvardSpectralType;
  luminosity: YerkesSpectralType;
};

export type Star = {
  class: StellarClassification;
  temperature: Temperature;
  radius?: Length;
};

// Create a star.
// temp is the star's temperature in Kelvin
// luminosity is the star's Yerkes Classification
export function getStar(temp: Temperature, lum: YerkesSpectralType): Star {
  let value = temp.value;
  let starColor: HarvardSpectralType = HarvardSpectralType.M; //Set default to type M
  if (value >= 30000) {
    starColor = HarvardSpectralType.O;
  } else if (value >= 10000) {
    starColor = HarvardSpectralType.B;
  } else if (value >= 7500) {
    starColor = HarvardSpectralType.A;
  } else if (value >= 6000) {
    starColor = HarvardSpectralType.F;
  } else if (value >= 5200) {
    starColor = HarvardSpectralType.G;
  } else if (value >= 3700) {
    starColor = HarvardSpectralType.K;
  } else if (value >= 2400) {
    starColor = HarvardSpectralType.M;
  }

  let t: Temperature = Measure.of(value, kelvin);

  let star = { class: { color: starColor, luminosity: lum }, temperature: t };
  return star;
}

export enum AtmosphereType {
  None = "None", //Inert gas with no oxygen
  Inert = "Inert Gas", //Inert gas with no oxygen
  Hydrogen = "Hydrogen", //Primarily hydrogen
  Oxygen = "Oxygen Containing", //Mix of oxygen and inert gases
  Methane = "Methane", //Methane
  Corrosive = "Corrosive", //Halogens, sulfur/nitrogen oxides, etc.
  Reducing = "Reducing Gases", //Reducing agents: atomic hydrogen, boranes, cyanides, some acids, etc
}

export const PLANET_MAX_SIZE: Length = Measure.of(20000, kilo(meters));
export const PLANET_MIN_SIZE: Length = Measure.of(0.1, kilo(meters));
export const PLANET_MAX_MASS: Mass = Measure.of(1e27, kilo(grams));
export const PLANET_MIN_MASS: Mass = Measure.of(1, kilo(grams));
export const PLANET_MAX_DENSITY: VolumeDensity = Measure.of(15, grams.per(centi(meters).cubed()));
export const PLANET_MIN_DENSITY: VolumeDensity = Measure.of(0.001, VolumeDensity);
export const PLANET_MAX_GRAVITY: Acceleration = Measure.of(10, GRAVITIES);
export const PLANET_MIN_GRAVITY: Acceleration = Measure.of(0, GRAVITIES);
export const PLANET_MAX_AIR_PRESSURE: Pressure = Measure.of(100, atmospheres);
export const PLANET_MIN_AIR_PRESSURE: Pressure = Measure.of(0, atmospheres);
export const PLANET_MAX_STAR_TEMPERATURE: Temperature = Measure.of(45000, kelvin);
export const PLANET_MIN_STAR_TEMPERATURE: Temperature = Measure.of(2400, kelvin);
export const PLANET_MAX_TEMPERATURE: Temperature = Measure.of(1000000, kelvin);
export const PLANET_MIN_TEMPERATURE: Temperature = Measure.of(0, kelvin);
export const PLANET_MAX_BOND_ALBEDO: Dimensionless = Measure.of(1, Dimensionless);
export const PLANET_MIN_BOND_ALBEDO: Dimensionless = Measure.of(0, Dimensionless);
export const PLANET_MAX_ORBITAL_DISTANCE: Length = Measure.of(2000, AU);
export const PLANET_MIN_ORBITAL_DISTANCE: Length = Measure.of(0.3, AU);

export type Planet = {
  size: Length; //Radius in km
  mass: Mass; //Mass in kilograms
  density: VolumeDensity; //Density in kilograms per cubic meter
  gravity: Acceleration; //Acceleration due to gravity
  parentStar: Star; //Star this planet orbits
  atmosphere: AtmosphereType; //atmosphere composition
  airPressure: Pressure; //pressure. We'll want to display this in millibar probably, but should store as pascals
  hydrosphere: HydrosphereType;
  hydrosphereElement: string;
  averageTemperature: Temperature;
  life: BiosphereType;
  bondAlbedo: Dimensionless;
  orbitalDistance: Length;
};

export const setPlanetDensity = (p: Planet, density: VolumeDensity): Planet => {
  return { ...p, density: density };
};

export const setPlanetRadius = (p: Planet, radius: Length): Planet => {
  return { ...p, size: radius };
};

export const isPlanetTidallyLockedByParentStarClass = (p: Planet): boolean =>
  p.parentStar.class.color >= HarvardSpectralType.K &&
  p.parentStar.class.luminosity >= YerkesSpectralType.V;

export const computePlanetaryGravityFromDensityAndRadius = (
  p: Planet
): Acceleration => {
  let relativeDiameter = p.size.scale(2).div(EARTH_DIAMETER);
  let relativeDensity = p.density.div(EARTH_DENSITY);

  let localGravity = relativeDiameter.times(relativeDensity);
  let gravity = Measure.of(localGravity.value, GRAVITIES);
  return gravity;
};

export const computeMassFromDensityAndRadius = (p: Planet): Mass => {
  let volume = p.size.cubed().scale((4.0 / 3.0) * Math.PI);
  let mass = volume.times(p.density);

  return mass;
};

export const computeDensityFromMassAndRadius = (p: Planet): VolumeDensity => {
  let volume = p.size.cubed().scale((4.0 / 3.0) * Math.PI);
  let density = p.mass.div(volume);

  return density;
};

//Assumes air's molar mass is 29
export const getPressureAtAlt = (p: Planet, alt: Length): Pressure => {
  let mgh = Measure.of(29, amu).times(p.gravity).times(alt).scale(-1);
  let RT = GAS_CONSTANT.times(p.averageTemperature);

  let exponent = mgh.div(RT);
  let press = p.airPressure.value * Math.exp(exponent.value);

  return Measure.of(press, pascals);
};

const _4thRoot = (n: number): number => {
  return Math.pow(n, 1.0/4.0)
}
const fourthRoot = wrapRootFn(_4thRoot, "4")

export const calculateEquilibriumTemperature = (p: Planet): Temperature => {
  let Ts = p.parentStar.temperature;
  let albedoFraction = fourthRoot(Measure.of(1, Dimensionless).minus(p.bondAlbedo));

  //ToDo Get a "real" star radius
  let Rs = p.parentStar.radius || Measure.of(695700, kilo(meters));
  let a = p.orbitalDistance;
  
  let Teq = Ts.times(Measure.sqrt(Rs.div(a.scale(2)))).times(albedoFraction);
  return Teq;
}

export const getDisplayRadius = (p: Planet): string => {
  return p.size.in(EARTH_RADIUS);
};

export const getDisplayDensity = (p: Planet): string => {
  return p.density.in(EARTH_DENSITY);
};

export const getDisplayMass = (p: Planet): string => {
  return p.mass.in(EARTH_MASS, { formatValue: (m) => m.toFixed(4) });
};

export const getDisplayGravity = (p: Planet): string => {
  return p.gravity.in(GRAVITIES);
};

export const getDisplayPressure = (p: Planet): string => {
  return p.airPressure.in(atmospheres);
};

const _kelvinToFahrenheit = (k: number): number => {
  return k * (9.0 / 5.0) - 459.67;
};
const kelvinToFahrenheit = wrapUnaryFn(_kelvinToFahrenheit);

export const getDisplayTemperature = (p: Planet): string => {
  return kelvinToFahrenheit(p.averageTemperature).toString({
    formatValue: (f) => f.toFixed(2),
    formatUnit: () => "°F",
  });
};

export enum BiosphereType {
  None = "None",
  Cellular = "Cellular",
  SimplePlants = "Simple Plants",
  ComplexPlants = "Complex Plants",
  SimpleAnimals = "Simple Animals",
  ComplexAnimals = "Complex Animals",
  SentientLife = "Sentient Life",
  SapientLife = "Sapient Life",
}

export enum HydrosphereType {
  None = "None",
  Liquid = "Liquid",
  Solid = "Solid",
}
