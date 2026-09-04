# PrettyCensus mapping update

This build replaces the Mapping Option placeholder with a Mapbox GL JS choropleth workflow.

## Run
Serve this folder through a local web server or GitHub Pages. Do not open index.html directly with file:// because browser fetch and CORS rules may block API and tile requests.

## Mapping workflow
1. Enter and save a Census API key.
2. Select year, dataset, Tract or Block Group, state, county, and table variable.
3. Open Mapping Option.
4. Enter a Mapbox public access token and select a mapped variable.
5. Click Draw map.

The code automatically selects the repository by year, builds the raw GitHub XYZ PBF template, inspects the z0 tile to discover its source-layer name, requests the selected Census variable, joins by GEOID, and applies a five-class quantile style.
