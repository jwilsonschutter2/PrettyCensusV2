#Link

https://jwilsonschutter2.github.io/SuperNiceCensus/

#General Methodology / Thoughts

Census API queries and added mapping made easy.

#Change Methodology

The Create Change Map tool harmonizes older Census geography to newer geography using a GEOID-first approach. Exact GEOID matches are assigned directly. For changed geographies, candidate matches are identified using tract/block group numbering patterns, validated through polygon intersection, and weighted by proportional area overlap. Source values are then allocated across all qualifying target geographies using normalized overlap weights, preserving splits, merges, and other many-to-many boundary changes. Finally, harmonized historical values are compared to contemporary values to calculate numeric and percent change on a common geography framework.

## Export updates in this build

- Mapping Option and Create Change Map can export zipped ESRI Shapefiles next to their GeoJSON exports.
- Fetch JSON CSV exports include a generated GEOID field and Census table documentation links above the data header.
- Both maps resize and refit to the selected results after their Mapbox style and panel layout finish loading.
- HTML, CSS, and JavaScript are formatted for direct human review and maintenance.
