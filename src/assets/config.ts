export const MAP_CONFIG = {
  line: {
    width: 6,
    progressColor: "#eb4d4b",
    nonProgressColor: "#4b5563",
    dashArray: [1, 2],
  },
  point: {
    circleColor: "#4b5563",
    targetCircleColor: "#eb4d4b",
    textColor: "#fff",
  },
  terrain: {
    demSource: "mapbox://mapbox.mapbox-terrain-dem-v1",
    exaggeration: 2,
    fogSettings: {
      range: [0.8, 8],
      color: "#dc9f9f",
      "horizon-blend": 0.5,
      "high-color": "#245bde",
      "space-color": "#000000",
      "star-intensity": 0.15,
    },
  },
  initialMapSettings: {
    center: [139.767, 35.681],
    zoom: 6,
    pitch: 0,
    bearing: 0,
    // enable `interactive` option, but disable scroll
    // (let the user zoom with the controll button instead)
    interactive: true,
    scrollZoom: false,
    projection: "globe",
    transition: {
      duration: 300,
      delay: 0,
    },
  },
  bounds: [
    [135.774361, 34.684389],
    [139.774444, 35.683611],
  ],
  style: `https://api.maptiler.com/maps/jp-mierune-streets/style.json?key=${
    import.meta.env.VITE_MAPTILER_KEY
  }`,
};

export const createCircleRadiusExpression = (stationNo: string) => {
  return [
    "interpolate",
    ["linear"],
    ["zoom"],
    6,
    ["case", ["==", ["get", "no"], stationNo], 8, 0],
    11,
    ["case", ["==", ["get", "no"], stationNo], 28, 18],
  ];
};

export const createTextSizeExpression = (stationNo: string) => {
  return [
    "interpolate",
    ["linear"],
    ["zoom"],
    8,
    ["case", ["==", ["get", "no"], stationNo], 10, 0],
    11,
    ["case", ["==", ["get", "no"], stationNo], 24, 18],
  ];
};
