# PrettyCensus

https://jwilsonschutter2.github.io/PrettyCensusV2/

## Guide

Essentially, this just automates some fairly annoying basic census GIS work and filtering census tables when downloading. 

You need both a Census API key, and a mapbox js token to use this. You can sign up for both here: https://api.census.gov/data/key_signup.html and here: https://www.mapbox.com/ 

Just choose the year, the tables, etc. If you want to make your own tables (or even just have an ai find you what tables you need) use https://github.com/jwilsonschutter2/PrettyCensusV2/blob/main/js/preset-table-library.js 

The change map isn't perfect, but overall this should be a good time saver for 90% of census work on the back end, assuming change maps are simple this should work, will be looking into updating this census.

I kinda dislike https://www.nhgis.org/annual-tract-estimates just due to the fact that it's like 2014 and 2015 changes to tracts and bgs in alaska, meaning you'd have to resolve and backtrack like 3 maps to get what you want.
I'm trying to automate this on my own without a reliance on nhgis for future proofing but we'll see how it goes, the current version works well unless doing something for like LA county where you may still need some manual resolving of data. 
