/** PrettyCensus global state and naming aliases. */
let apiKey="",selectedYear="",selectedDataset="",selectedTables=[],geoLevel="",selectedState="",selectedCounty="",selectedTract="*",selectedBlockGroup="*";
let availabilityAbortController=null,availabilityDebounceTimer=null,currentFetchedData=null,currentFetchedHeaders=null;
const $=id=>document.getElementById(id);
const tableFriendlyNames=Object.fromEntries(variableDefinitions().map(item=>[item.id,item.displayName]));
