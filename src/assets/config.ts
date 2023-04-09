export const MAP_CONFIG = {
  lineWidth: 6,
  progressColor: "#eb4d4b",
  nonProgressColor: "rgba(0, 0, 0, 0.7)",
  lineDashArray: [1, 2],
  circleColor: "rgba(31,41,55,1)",
  fogSettings: {
    range: [0.8, 8],
    color: "#dc9f9f",
    "horizon-blend": 0.5,
    "high-color": "#245bde",
    "space-color": "#000000",
    "star-intensity": 0.15,
  },
  bounds: [
    [135.774361, 34.684389],
    [139.774444, 35.683611],
  ],
  style: `https://api.maptiler.com/maps/jp-mierune-streets/style.json?key=${
    import.meta.env.VITE_MAPTILER_KEY
  }`,
  demSource: "mapbox://mapbox.mapbox-terrain-dem-v1",
};

export const createCircleRadiusExpression = (stationNo: string) => {
  return [
    "interpolate",
    ["linear"],
    ["zoom"],
    6,
    ["case", ["==", ["get", "no"], stationNo], 10, 0],
    8,
    ["case", ["==", ["get", "no"], stationNo], 18, 12],
    10,
    ["case", ["==", ["get", "no"], stationNo], 24, 12],
  ];
};

export const createTextSizeExpression = (stationNo: string) => {
  return [
    "interpolate",
    ["linear"],
    ["zoom"],
    6,
    ["case", ["==", ["get", "no"], stationNo], 10, 0],
    8,
    ["case", ["==", ["get", "no"], stationNo], 18, 12],
    10,
    ["case", ["==", ["get", "no"], stationNo], 24, 12],
  ];
};
