import {Mass, Length, Acceleration, VolumeDensity, Temperature, Measure, kelvin, Pressure} from "safe-units";

enum HarvardSpectralType { //Star Color
    O,
    B,
    A,
    F,
    G,
    K,
    M
};

enum YerkesSpectralType { //Luminosity Class
    IaP,
    Ia,
    Iab,
    Ib,
    II,
    III,
    IV,
    V,
    VI,
    VII
};

type StellarClassification = {
    color: HarvardSpectralType;
    luminosity: YerkesSpectralType;
};

type Star = {
    class: StellarClassification;
    temperature: Temperature;
}

// Create a star.
// temp is the star's temperature in Kelvin
// luminosity is the star's Yerkes Classification
function constructStar(temp: number, lum: YerkesSpectralType): Star {
    let starColor: HarvardSpectralType;
    if(temp >= 30000)
    {
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

    let star = {class: {color: starColor, luminosity: lum}, temperature: t};
    return star;
}

enum AtmosphereType {
    Inert, //Inert gas with no oxygen
    Hydrogn, //Primarily hydrogen
    Oxygen, //Mix of oxygen and inert gases
    Methane, //Methane
    Corrosive, //Halogens, sulfur/nitrogen oxides, etc. 
    Reducing //Reducing agents: atomic hydrogen, boranes, cyanides, some acids, etc
}

enum hydrosphereType {
    None,
    Liquid,
    Solid
}

enum biosphereType {
    None,
    Cellular,
    SimplePlants,
    ComplexPlants,
    SimpleAnimals,
    ComplexAnimals,
    SentientLife,
    SapientLife
}

type Planet = {
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
};

function isPlanetTidallyLockedByParentStarClass(p: Planet): boolean {
    return p.parentStar.class.color >= HarvardSpectralType.K && p.parentStar.class.luminosity >= YerkesSpectralType.V
}