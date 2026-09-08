/* Fixed 12-step GEOID-first relationship worker. Every valid source gets one or more targets. */
importScripts("https://cdn.jsdelivr.net/npm/@turf/turf@6.5.0/turf.min.js","geoid-candidate-index.js");
self.onmessage = event => { try { self.postMessage(build(event.data)); } catch (error) { self.postMessage({error:error.message||String(error)}); } };
function build({sourceFeatures,targetFeatures,level,options={}}) {
  const minShare = finite(options.minSourceShare,0.0001), cumulativeTarget = finite(options.cumulativeTarget,0.995);
  const index = PrettyCensusCandidateIndex.build(targetFeatures,level), grid = buildGrid(targetFeatures);
  const targetPoints = targetFeatures.map(safePoint), relationships=[], diagnostics=[];
  let direct=0,textConfirmed=0,spatialConfirmed=0,forcedNearest=0,intersectionErrors=0;
  for (const source of sourceFeatures) {
    const sourceId=String(source.properties?.__pc_geoid||""), parsed=PrettyCensusCandidateIndex.parse(sourceId,level);
    if (!parsed) { diagnostics.push({source:sourceId,reason:"invalid-geoid-not-allocatable"}); continue; }
    const exact=index.byGeoid.get(sourceId);
    if (exact !== undefined) { relationships.push(rec(sourceId,sourceId,1,1,0,"full-geoid",100,"high",1)); direct++; continue; }
    const sourceArea=safeArea(source), box=sourceArea?safeBbox(source):null;
    const countyKey=`${parsed.state}|${parsed.county}`, baseKey=`${countyKey}|${parsed.tractBase}`;
    const sameBase=index.byBase.get(baseKey)||[], spatial=box?queryGrid(grid,box):[];
    const countySet=new Set(index.byCounty.get(countyKey)||[]);
    const candidates=[...new Set([...sameBase,...spatial])].filter(i=>countySet.has(i));
    const overlaps=[];
    for (const i of candidates) {
      const target=targetFeatures[i], targetParsed=PrettyCensusCandidateIndex.parse(target.properties?.__pc_geoid,level);
      const textScore=PrettyCensusCandidateIndex.score(parsed,targetParsed), overlap=sourceArea?safeIntersection(source,target):{area:0,error:false};
      if (overlap.error) intersectionErrors++;
      if (!overlap.area) continue;
      overlaps.push({i,target:String(target.properties.__pc_geoid),share:overlap.area/sourceArea,
        targetShare:safeArea(target)?overlap.area/safeArea(target):0,area:overlap.area,textScore});
    }
    overlaps.sort((a,b)=>b.share-a.share||b.textScore-a.textScore);
    let cumulative=0; const accepted=[];
    for (const item of overlaps) { if (item.share>=minShare||cumulative<cumulativeTarget) { accepted.push(item); cumulative+=item.share; } }
    if (accepted.length) {
      const raw=accepted.reduce((sum,item)=>sum+item.share,0);
      for (const item of accepted) {
        const method=item.textScore>=40?"geoid-text-plus-intersection":"bounding-box-plus-intersection";
        relationships.push(rec(sourceId,item.target,item.share/raw,item.targetShare,item.area,method,item.textScore,
          item.textScore>=40?"high":"medium",Math.min(1,cumulative),item.share));
        if(item.textScore>=40)textConfirmed++;else spatialConfirmed++;
      }
      continue;
    }
    // Final forced assignment: nearest target point inside the validated state/county set.
    const point=safePoint(source); let best=-1,distance=Infinity;
    if (point) for (const i of countySet) { const targetPoint=targetPoints[i]; if(!targetPoint)continue;
      const d=turf.distance(point,targetPoint,{units:"kilometers"}); if(d<distance){distance=d;best=i;} }
    if(best>=0){const target=targetFeatures[best],targetId=String(target.properties.__pc_geoid),targetParsed=PrettyCensusCandidateIndex.parse(targetId,level);
      relationships.push({...rec(sourceId,targetId,1,0,0,"forced-nearest-same-county",PrettyCensusCandidateIndex.score(parsed,targetParsed),"very-low",0),distanceKm:distance});forcedNearest++;}
    else diagnostics.push({source:sourceId,reason:"no-valid-target-in-same-county"});
  }
  return {relationships,diagnostics,direct,textConfirmed,spatialConfirmed,forcedNearest,intersectionErrors};
}
function rec(source,target,weight,targetShare,area,method,textScore,confidence,coverage,rawShare=weight){return{source,target,sourceShare:rawShare,normalizedWeight:weight,targetShare,intersectionArea:area,method,textScore,confidence,observedCoverage:coverage,direct:method==="full-geoid",forced:method.startsWith("forced-")};}
function finite(v,f){const n=Number(v);return Number.isFinite(n)?n:f;} function safeArea(f){try{const a=turf.area(f);return Number.isFinite(a)&&a>0?a:0;}catch(_){return 0;}}
function safeBbox(f){try{return turf.bbox(f);}catch(_){return null;}} function safePoint(f){try{return turf.pointOnFeature(f);}catch(_){return null;}}
function safeIntersection(a,b){try{const x=turf.intersect(a,b);return{area:x?safeArea(x):0,error:false};}catch(_){return{area:0,error:true};}}
function cells(b,s=.25){const o=[];for(let x=Math.floor(b[0]/s);x<=Math.floor(b[2]/s);x++)for(let y=Math.floor(b[1]/s);y<=Math.floor(b[3]/s);y++)o.push(`${x}:${y}`);return o;}
function buildGrid(fs){const g=new Map();fs.forEach((f,i)=>{const b=safeBbox(f);if(!b)return;cells(b).forEach(k=>{if(!g.has(k))g.set(k,[]);g.get(k).push(i);});});return g;} function queryGrid(g,b){const o=new Set();cells(b).forEach(k=>(g.get(k)||[]).forEach(i=>o.add(i)));return[...o];}
