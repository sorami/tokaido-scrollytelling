export const MAP_CONFIG = {
  line: {
    width: 6,
    progressColor: "#ea580c",
    nonProgressColor: "#4b5563",
    dashArray: [1, 2],
  },
  point: {
    circleColor: "#4b5563",
    targetCircleColor: "#ea580c",
    textColor: "#fff",
  },
  terrain: {
    demSource: "mapbox://mapbox.mapbox-terrain-dem-v1",
    exaggeration: 2,
    fog: {
      switch_probability: 0.7,
      day: {
        range: [0.5, 10],
        "horizon-blend": 0.3,
        color: "white",
        "high-color": "#0652DD",
        "space-color": "#1289A7",
        "star-intensity": 0.0,
      },
      night: {
        range: [0.5, 10],
        "horizon-blend": 0.3,
        color: "#242B4B",
        "high-color": "#161B36",
        "space-color": "#0B1026",
        "star-intensity": 0.8,
      },
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
    ["case", ["==", ["get", "no"], stationNo], 10, 0],
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
    ["case", ["==", ["get", "no"], stationNo], 28, 12],
  ];
};
