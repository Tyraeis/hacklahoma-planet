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
} from "safe-units";

  const cubic_meter = meters.toThe("3")
  export const GRAVITIES = meters.per(seconds.squared()).scale(9.81);
  let mmHg = Measure.of(133.3, pascals, "mmHg");

  export const EARTH_MASS = Measure.of(5.972e24, kilograms);
  export const EARTH_RADIUS = Measure.of(6371, kilo(meters));
  export const EARTH_DIAMETER = EARTH_RADIUS.scale(2);
  export const EARTH_DENSITY = Measure.of(5.514, grams.per(centi(cubic_meter)));

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
  IaP = "IaP",
  Ia = "Ia",
  Iab = "Iab",
  Ib = "Ib",
  II = "II",
  III = "III",
  IV = "IV",
  V = "V",
  VI = "VI",
  VII = "VII",
}

export type StellarClassification = {
  color: HarvardSpectralType;
  luminosity: YerkesSpectralType;
};

export type Star = {
  class: StellarClassification;
  temperature: Temperature;
};

// Create a star.
// temp is the star's temperature in Kelvin
// luminosity is the star's Yerkes Classification
export function getStar(temp: Temperature, lum: YerkesSpectralType): Star {
  let value = temp.value;
  let starColor: HarvardSpectralType;
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
  Inert = 'Intert', //Inert gas with no oxygen
  Hydrogen = 'Hydrogen', //Primarily hydrogen
  Oxygen = 'Oxygen', //Mix of oxygen and inert gases
  Methane = 'Methane', //Methane
  Corrosive = 'Corrosive', //Halogens, sulfur/nitrogen oxides, etc.
  Reducing = 'Reducing', //Reducing agents: atomic hydrogen, boranes, cyanides, some acids, etc
}

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
  }

  export const setPlanetDensity = (p: Planet, density: VolumeDensity): Planet => {
    return {...p, density: density}
  }

  export const setPlanetRadius = (p: Planet, radius: Length): Planet => {
    return {...p, size: radius}
  }

  export const isPlanetTidallyLockedByParentStarClass = (p: Planet): boolean => 
  (
    p.parentStar.class.color >= HarvardSpectralType.K &&
    p.parentStar.class.luminosity >= YerkesSpectralType.V
  );
  

  export const computePlanetaryGravityFromDensityAndRadius = (p: Planet): Acceleration => {
    let relativeDiameter = p.size.scale(2).div(EARTH_DIAMETER);
    let relativeDensity = p.density.div(EARTH_DENSITY);

    let localGravity = relativeDiameter.times(relativeDensity);
    let gravity = Measure.of(localGravity.value, GRAVITIES);
    return gravity;
  }

  export const computeDensityFromMassAndRadius = (p: Planet): VolumeDensity => {
    let volume = p.size
      .toThe("3")
      .scale((4.0 / 3.0) * Math.PI);
    let density = p.mass.div(volume);

    return density;
  }

  export const getPressureAtAlt = (p: Planet, alt: Length): Pressure => {
    let sHeight = alt.scale(-0.00012).value
    let press = 760 * Math.exp(sHeight)

    return Measure.of(press, mmHg)
  }
export enum HydrosphereType {
  None = 'None',
  Liquid = 'Liquid',
  Solid = 'Solid',
}

export enum BiosphereType {
  None = 'None',
  Cellular = 'Cellular',
  SimplePlants = 'SimplePlants',
  ComplexPlants = 'ComplexPlants',
  SimpleAnimals = 'SimpleAnimals',
  ComplexAnimals = 'ComplexAnimals',
  SentientLife = 'SentientLife',
  SapientLife = 'SapientLife',
}
