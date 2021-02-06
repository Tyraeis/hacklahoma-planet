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

export module StellarObjects {
  const cubic_meter = meters.squared().times(meters);
  export const GRAVITIES = meters.per(seconds.squared()).scale(9.81);
  let mmHg = Measure.of(133.3, pascals);

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
    IaP,
    Ia,
    Iab,
    Ib,
    II,
    III,
    IV,
    V,
    VI,
    VII,
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
  export function constructStar(temp: number, lum: YerkesSpectralType): Star {
    let starColor: HarvardSpectralType;
    if (temp >= 30000) {
      starColor = HarvardSpectralType.O;
    } else if (temp >= 10000) {
      starColor = HarvardSpectralType.B;
    } else if (temp >= 7500) {
      starColor = HarvardSpectralType.A;
    } else if (temp >= 6000) {
      starColor = HarvardSpectralType.F;
    } else if (temp >= 5200) {
      starColor = HarvardSpectralType.G;
    } else if (temp >= 3700) {
      starColor = HarvardSpectralType.K;
    } else if (temp >= 2400) {
      starColor = HarvardSpectralType.M;
    }

    let t: Temperature = Measure.of(temp, kelvin);

    let star = { class: { color: starColor, luminosity: lum }, temperature: t };
    return star;
  }

  export enum AtmosphereType {
    Inert, //Inert gas with no oxygen
    Hydrogn, //Primarily hydrogen
    Oxygen, //Mix of oxygen and inert gases
    Methane, //Methane
    Corrosive, //Halogens, sulfur/nitrogen oxides, etc.
    Reducing, //Reducing agents: atomic hydrogen, boranes, cyanides, some acids, etc
  }

  export enum hydrosphereType {
    None,
    Liquid,
    Solid,
  }

  export enum biosphereType {
    None,
    Cellular,
    SimplePlants,
    ComplexPlants,
    SimpleAnimals,
    ComplexAnimals,
    SentientLife,
    SapientLife,
  }

  export type Planet = {
    size: Length; //Radius in km
    mass: Mass; //Mass in kilograms
    density: VolumeDensity; //Density in kilograms per cubic meter
    gravity: Acceleration; //Acceleration due to gravity
    parentStar: Star; //Star this planet orbits
    atmosphere: AtmosphereType; //atmosphere composition
    airPressure: Pressure; //pressure. We'll want to display this in millibar probably, but should store as pascals
    hydrosphere: hydrosphereType;
    hydrosphereElement: String;
    averageTemperature: Temperature;
    life: biosphereType;
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
        .squared()
        .times(p.size)
        .scale((4.0 / 3.0) * Math.PI);
      let density = p.mass.div(volume);

      return density;
    }
}
