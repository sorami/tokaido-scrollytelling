# 53 Stations of the Tōkaidō - Scrollytelling (Scroll + Storytelling)

## Data

### Images

- `public/images/*.jpeg`
  - 歌川広重「東海道五拾三次之内」（保永堂版）
  - source: [東海道五十三次 (浮世絵) - Wikipedia](<https://ja.wikipedia.org/wiki/%E6%9D%B1%E6%B5%B7%E9%81%93%E4%BA%94%E5%8D%81%E4%B8%89%E6%AC%A1_(%E6%B5%AE%E4%B8%96%E7%B5%B5)>)
  - e.g., [ファイル:Hiroshige01 nihonbashi.jpg - Wikipedia](https://ja.wikipedia.org/wiki/%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB:Hiroshige01_nihonbashi.jpg)
  - Public Domain

### Roads

- `public/roads/Tokaido*.geojson`
  - source: [japan-road-jp/Gokaodo-Map](https://github.com/japan-road-jp/Gokaodo-Map)
  - Converted from KML to GeoJSON
  - CC BY-NC-SA 4.0（表示 - 非営利 - 継承 4.0 国際）
- `public/roads/tokaido_boat.geojson`
  - The sea route, between the station 41 (宮宿) and 42 (桑名宿)
  - [七里の渡し - Wikipedia](https://ja.wikipedia.org/wiki/%E4%B8%83%E9%87%8C%E3%81%AE%E6%B8%A1%E3%81%97)
  - Approximated hand-drawn line

### Stations

- `preprocess/stations/stations.csv`
  - source: [東海道五十三次 - Wikipedia](https://ja.wikipedia.org/wiki/%E6%9D%B1%E6%B5%B7%E9%81%93%E4%BA%94%E5%8D%81%E4%B8%89%E6%AC%A1), [東海道五十三次 (浮世絵) - Wikipedia](<https://ja.wikipedia.org/wiki/%E6%9D%B1%E6%B5%B7%E9%81%93%E4%BA%94%E5%8D%81%E4%B8%89%E6%AC%A1_(%E6%B5%AE%E4%B8%96%E7%B5%B5)>)
- `preprocess/stations/geojson.ipynb`
  - Creates a GeoJSON file `public/stations/points.geojson`
- `preprocess/stations/extracts.ipynb`
  - Extracts (article abstract) from Wikipedia Japanese, English
  - Creates `preprocess/stations/extracts.json`
- `preprocess/stations/stations.ipynb`
  - Creates `src/assets/stations.json`

```json
[
  {
    "no":"0",
    "name":"日本橋",
    "name_kana":"にほんばし",
    "name_roman":"Nihonbashi",
    "province":"武蔵国",
    "img_caption":"朝之景 \/ 行列振出",
    "latitude":35.683611,
    "longitude":139.774444,
    "wikipedia_ja":"https:\/\/ja.wikipedia.org\/wiki\/%E6%97%A5%E6%9C%AC%E6%A9%8B_(%E6%9D%B1%E4%BA%AC%E9%83%BD%E4%B8%AD%E5%A4%AE%E5%8C%BA%E3%81%AE%E6%A9%8B)",
    "wikipedia_en":"https:\/\/en.wikipedia.org\/wiki\/Nihonbashi",
    "img_path":"images\/00_nihonbashi.jpeg",
    "extract_ja":"日本橋（にほんばし）は、もともとは1603年（慶長8年）に江戸で最初に町割りが行われた場所にあった川に架けられた木造の橋で、その後何代にもわたり掛け替えられ、現在のものは1911年に完成したもので、東京都中央区の日本橋川に架かり、石造りの2連アーチ橋となっている。",
    "extract_en":"Nihonbashi (日本橋) is a business district of Chūō, Tokyo, Japan which grew up around the bridge of the same name which has linked two sides of the Nihonbashi River at this site since the 17th century.  The first wooden bridge was completed in 1603. The current bridge,  designed by Tsumaki Yorinaka and constructed of stone on a steel frame, dates from 1911.  The district covers a large area to the north and east of the bridge, reaching Akihabara to the north and the Sumida River to the east. Ōtemachi is to the west and Yaesu and Kyobashi to the south.\nNihonbashi, together with Kyobashi and Kanda, is the core of Shitamachi, the original downtown center of Edo-Tokyo, before the rise of newer secondary centers such as Shinjuku and Shibuya."
  },
```

## Code

[Mapbox GL JS](https://www.mapbox.com/mapbox-gljs) for the interactive map. [Scrollama](https://github.com/russellsamora/scrollama) for the scrollytelling. [Turf.js](https://turfjs.org/) for the geospatial calculation. [Svelte](https://svelte.dev/) for the user interfaces. [UnoCSS](https://unocss.dev/) for styling.

For the map tiles, I have used [JP MIERUNE Streets style](https://www.mierune.co.jp/) on [MapTiler](https://www.maptiler.com/).

The implementation was initially based on the [mapbox/storytelling](https://github.com/mapbox/storytelling) template (thanks for the inspiration!), though I have rewritten pretty much everything in the end :)

## Prior Works

- [東海道五十三次 浮世絵地図](https://gunmagisgeek.com/datavis/toukaidou/) (@shimizu, GUNMA GIS GEEK)
- [旧東海道の地図 | 旧街道モバイルマップ](https://gcy.jp/kkd/tokaido.html)
- [浮世絵マップ：歌川広重「東海道五十三次」 | ESRI ジャパン](https://www.esrij.com/news/details/70173/)
