/** Text-first GEOID candidate indexing for tract/block-group harmonization. */
globalThis.PrettyCensusCandidateIndex = (() => {
  "use strict";

  function parse(raw, level) {
    const geoid = String(raw ?? "").replace(/\D/g, "");
    const expected = level === "blockgroup" ? 12 : 11;
    if (geoid.length !== expected) return null;
    const tractCode = geoid.slice(5, 11);
    return {
      geoid,
      state: geoid.slice(0, 2),
      county: geoid.slice(2, 5),
      tractCode,
      tractBase: tractCode.slice(0, 4),
      tractSuffix: tractCode.slice(4, 6),
      blockGroup: level === "blockgroup" ? geoid.slice(11, 12) : null,
      weakTail: level === "blockgroup" ? geoid.slice(-5) : geoid.slice(-4)
    };
  }

  function score(source, target) {
    if (!source || !target || source.state !== target.state || source.county !== target.county) return -Infinity;
    let value = 0;
    if (source.geoid === target.geoid) value += 100;
    if (source.tractCode === target.tractCode) value += 60;
    if (source.tractBase === target.tractBase) value += 40;
    if (source.tractSuffix === target.tractSuffix) value += 10;
    if (source.blockGroup && source.blockGroup === target.blockGroup) value += 5;
    if (source.weakTail === target.weakTail) value += 2;
    return value;
  }

  function build(features, level) {
    const byGeoid = new Map(), byCounty = new Map(), byTractBase = new Map();
    features.forEach((feature, index) => {
      const parsed = parse(feature.properties?.__pc_geoid, level);
      if (!parsed) return;
      byGeoid.set(parsed.geoid, index);
      const countyKey = `${parsed.state}|${parsed.county}`;
      const baseKey = `${countyKey}|${parsed.tractBase}`;
      if (!byCounty.has(countyKey)) byCounty.set(countyKey, []);
      if (!byTractBase.has(baseKey)) byTractBase.set(baseKey, []);
      byCounty.get(countyKey).push(index);
      byTractBase.get(baseKey).push(index);
    });
    return { byGeoid, byCounty, byTractBase };
  }

  function candidates(parsed, index, spatialIndexes, level, features) {
    if (!parsed) return [];
    const countyKey = `${parsed.state}|${parsed.county}`;
    const baseKey = `${countyKey}|${parsed.tractBase}`;
    const preferred = index.byTractBase.get(baseKey) || [];
    const spatial = spatialIndexes || [];
    const county = new Set(index.byCounty.get(countyKey) || []);
    return [...new Set([...preferred, ...spatial])]
      .filter(candidate => county.has(candidate))
      .map(candidate => ({
        index: candidate,
        parsed: parse(features[candidate].properties?.__pc_geoid, level)
      }))
      .sort((a, b) => score(parsed, b.parsed) - score(parsed, a.parsed));
  }

  return { parse, score, build, candidates };
})();
