/**
 * Export helpers for CSV, GeoJSON, and zipped ESRI Shapefiles.
 *
 * CSV exports include source-table links above the actual CSV header. Map
 * exports use WGS 84 coordinates, which is the coordinate system used by
 * GeoJSON and by the downloaded Shapefile .prj file.
 */
function selectedExportGeoids() {
  return window.PrettyCensusSelectedGeoids instanceof Set &&
    window.PrettyCensusSelectedGeoids.size
    ? window.PrettyCensusSelectedGeoids
    : null;
}

function filterFeatureCollectionToChosenGeography(fc, level = geoLevel) {
  if (!fc || fc.type !== "FeatureCollection") return fc;

  const selected = selectedExportGeoids();
  let features = fc.features || [];

  if (selected) {
    features = features.filter((feature) =>
      selected.has(
        PrettyCensusGeoid.fromFeature(feature, level) ||
          String(feature.properties?.__geoid || ""),
      ),
    );
  } else if (level === "tract" && selectedTract && selectedTract !== "*") {
    features = features.filter(
      (feature) =>
        (
          PrettyCensusGeoid.fromFeature(feature, level) ||
          String(feature.properties?.__geoid || "")
        ).slice(5, 11) === String(selectedTract).padStart(6, "0"),
    );
  } else if (level === "blockgroup") {
    if (selectedTract && selectedTract !== "*") {
      features = features.filter(
        (feature) =>
          (
            PrettyCensusGeoid.fromFeature(feature, level) ||
            String(feature.properties?.__geoid || "")
          ).slice(5, 11) === String(selectedTract).padStart(6, "0"),
      );
    }
    if (selectedBlockGroup && selectedBlockGroup !== "*") {
      features = features.filter(
        (feature) =>
          (
            PrettyCensusGeoid.fromFeature(feature, level) ||
            String(feature.properties?.__geoid || "")
          ).slice(11, 12) === String(selectedBlockGroup),
      );
    }
  }

  return { ...fc, features };
}

function compactFeatureCollection(fc, keepProperties = []) {
  const keep = new Set(keepProperties);
  return {
    ...fc,
    features: (fc.features || []).map((feature) => ({
      ...feature,
      properties: Object.fromEntries(
        Object.entries(feature.properties || {}).filter(([key]) =>
          keep.has(key),
        ),
      ),
    })),
  };
}

function rowWithGeoid(row) {
  const geoid = PrettyCensusGeoid.fromRow(row, geoLevel);
  return geoid ? { GEOID: geoid, ...row } : { ...row };
}

function currentRowsAsObjects() {
  return apiArrayToObjects(currentFetchedData).map(rowWithGeoid);
}

function suggestCurrentCsvName() {
  return `census_${selectedDataset.replaceAll("/", "_")}_${selectedYear}_${geoLevel}.csv`;
}

function exportHeader(header) {
  if (header === "GEOID") return "GEOID";
  return variableMeta(header).exportName || header;
}

function cleanExportValue(value) {
  if (value === null || value === undefined || value === "") return value;
  const number = Number(value);
  return Number.isFinite(number) && number < 0 ? 0 : value;
}

function friendlyExportRow(row) {
  return Object.fromEntries(
    Object.entries(row).map(([key, value]) => [
      exportHeader(key),
      cleanExportValue(value),
    ]),
  );
}

function selectedCensusTableLinks() {
  if (!selectedYear || !selectedDataset) return [];

  const tableIds = [
    ...new Set(
      (selectedTables || [])
        .map((variableId) => String(variableId).match(/^([A-Z]\d{5})/)?.[1])
        .filter(Boolean),
    ),
  ];

  return tableIds.map((tableId) => ({
    tableId,
    url: `https://api.census.gov/data/${selectedYear}/${selectedDataset}/groups/${tableId}.html`,
  }));
}

function csvMetadataLines() {
  const links = selectedCensusTableLinks();
  if (!links.length) return [];

  return [
    ["Census table", "Table documentation"].map(csvEscape).join(","),
    ...links.map(({ tableId, url }) => [tableId, url].map(csvEscape).join(",")),
    "",
  ];
}

function exportRowsToCsv(rows, filename) {
  if (!rows?.length) return;

  const cleanRows = rows.map(friendlyExportRow);
  const headers = Array.from(new Set(cleanRows.flatMap(Object.keys)));
  const csv = [
    ...csvMetadataLines(),
    headers.map(csvEscape).join(","),
    ...cleanRows.map((row) =>
      headers.map((header) => csvEscape(row[header])).join(","),
    ),
  ].join("\n");

  downloadBlob(
    new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" }),
    filename,
  );
}

function friendlyGeoJson(fc) {
  return {
    ...fc,
    features: fc.features.map((feature) => ({
      ...feature,
      properties: friendlyExportRow(feature.properties || {}),
    })),
  };
}

function downloadBlob(blob, filename) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(link.href), 0);
}

function downloadGeoJson(fc, filename) {
  if (fc?.type !== "FeatureCollection") return;
  const blob = new Blob([JSON.stringify(friendlyGeoJson(fc), null, 2)], {
    type: "application/geo+json",
  });
  downloadBlob(blob, filename);
}

async function downloadShapefile(fc, filename) {
  if (fc?.type !== "FeatureCollection" || !fc.features?.length) {
    throw new Error("No mapped features are available for Shapefile export.");
  }
  if (!window.shpwrite?.zip) {
    throw new Error(
      "The Shapefile export library did not load. Refresh and try again.",
    );
  }

  const baseName = filename
    .replace(/\.zip$/i, "")
    .replace(/[^a-z0-9_-]+/gi, "_");
  const zipData = await window.shpwrite.zip(friendlyGeoJson(fc), {
    folder: baseName,
    filename: baseName,
    outputType: "blob",
    compression: "DEFLATE",
    types: {
      point: baseName,
      polygon: baseName,
      polyline: baseName,
    },
  });

  const blob =
    zipData instanceof Blob
      ? zipData
      : new Blob([zipData], { type: "application/zip" });
  downloadBlob(blob, `${baseName}.zip`);
}
