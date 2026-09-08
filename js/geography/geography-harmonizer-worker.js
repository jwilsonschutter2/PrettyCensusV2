/* Text-first candidate selection, followed by authoritative geometry confirmation. */
importScripts(
  "https://cdn.jsdelivr.net/npm/@turf/turf@6.5.0/turf.min.js",
  "../geography/geoid-candidate-index.js"
);
self.onmessage = event => {
  try { self.postMessage(build(event.data)); }
  catch (error) { self.postMessage({ error: error.message || String(error) }); }
};
function build({ sourceFeatures, targetFeatures, options = {}, level }) {
  const minShare = finite(options.minSourceShare, 0.0001);
  const cumulativeTarget = finite(options.cumulativeTarget, 0.995);
  const preferredCoverage = finite(options.preferredCoverage, 0.95);
  const minTextScore = finite(options.minTextScore, 40);
  const useTextCandidates = options.useTextCandidates !== false;
  const useWeakTail = options.useWeakTail === true;
  const textIndex = PrettyCensusCandidateIndex.build(targetFeatures, level);
  const spatialIndex = buildGrid(targetFeatures);
  const relationships = [], diagnostics = [];
  let textCandidatesTested = 0, spatialCandidatesTested = 0, sliversExcluded = 0, intersectionErrors = 0;

  for (const source of sourceFeatures) {
    const sourceId = String(source.properties?.__pc_geoid || "");
    const parsedSource = PrettyCensusCandidateIndex.parse(sourceId, level);
    if (!parsedSource) { diagnostics.push({ source: sourceId, reason: "invalid-geoid" }); continue; }
    const same = textIndex.byGeoid.get(sourceId);
    if (same !== undefined) {
      relationships.push(make(sourceId, sourceId, 1, 1, 0, "direct-geoid", 100, "high"));
      continue;
    }
    const sourceArea = safeArea(source);
    if (!sourceArea) { diagnostics.push({ source: sourceId, reason: "invalid-or-zero-area" }); continue; }
    const spatial = queryGrid(spatialIndex, turf.bbox(source));
    const ranked = useTextCandidates
      ? PrettyCensusCandidateIndex.candidates(parsedSource, textIndex, spatial, level, targetFeatures)
      : spatial.map(index => ({ index, parsed: PrettyCensusCandidateIndex.parse(targetFeatures[index].properties?.__pc_geoid, level) }));
    const overlaps = [];
    for (const candidate of ranked) {
      const score = PrettyCensusCandidateIndex.score(parsedSource, candidate.parsed);
      if (!useWeakTail && score === 2) continue;
      if (score > 0 && score < minTextScore && !spatial.includes(candidate.index)) continue;
      if (score >= 40) textCandidatesTested++; else spatialCandidatesTested++;
      const target = targetFeatures[candidate.index], result = intersect(source, target);
      if (result.error) intersectionErrors++;
      if (!result.area) continue;
      const sourceShare = result.area / sourceArea, targetArea = safeArea(target);
      overlaps.push({ target: String(target.properties?.__pc_geoid || ""), sourceShare,
        targetShare: targetArea ? result.area / targetArea : 0, area: result.area, score });
    }
    overlaps.sort((a, b) => b.sourceShare - a.sourceShare || b.score - a.score);
    let cumulative = 0;
    const accepted = overlaps.filter(item => {
      const keep = item.sourceShare >= minShare || cumulative < cumulativeTarget;
      if (keep) cumulative += item.sourceShare; else sliversExcluded++;
      return keep;
    });
    if (!accepted.length) { diagnostics.push({ source: sourceId, reason: "no-confirmed-geographic-candidate" }); continue; }
    const confidence = cumulative >= preferredCoverage && accepted.some(item => item.score >= 40)
      ? "high" : cumulative >= preferredCoverage ? "medium" : cumulative >= 0.8 ? "low" : "very-low";
    accepted.forEach(item => relationships.push(make(sourceId, item.target, item.sourceShare,
      item.targetShare, item.area, item.score >= 40 ? "text-plus-polygon-overlap" : "polygon-overlap",
      item.score, confidence, cumulative)));
  }
  return { relationships, diagnostics, textCandidatesTested, spatialCandidatesTested, sliversExcluded, intersectionErrors };
}
function make(source, target, sourceShare, targetShare, intersectionArea, method, textScore, confidence, observedCoverage = 1) {
  return { source, target, sourceShare, targetShare, intersectionArea, method, textScore, confidence,
    observedCoverage, direct: method === "direct-geoid", fallbackUsed: false };
}
function finite(value, fallback) { const n = Number(value); return Number.isFinite(n) ? n : fallback; }
function safeArea(feature) { try { const a = turf.area(feature); return Number.isFinite(a) && a > 0 ? a : 0; } catch (_) { return 0; } }
function intersect(a, b) { try { const x = turf.intersect(a, b); return { area: x ? safeArea(x) : 0, error: false }; } catch (_) { return { area: 0, error: true }; } }
function cells(box, size = 0.25) { const out=[]; for(let x=Math.floor(box[0]/size);x<=Math.floor(box[2]/size);x++)for(let y=Math.floor(box[1]/size);y<=Math.floor(box[3]/size);y++)out.push(`${x}:${y}`); return out; }
function buildGrid(features) { const grid=new Map(); features.forEach((f,i)=>{let b;try{b=turf.bbox(f);}catch(_){return;}cells(b).forEach(k=>{if(!grid.has(k))grid.set(k,[]);grid.get(k).push(i);});});return grid; }
function queryGrid(grid, box) { const out=new Set();cells(box).forEach(k=>(grid.get(k)||[]).forEach(i=>out.add(i)));return[...out]; }
