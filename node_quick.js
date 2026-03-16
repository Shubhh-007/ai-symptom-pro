const fetch = require('node-fetch');
const fs = require('fs');

const featureNames = JSON.parse(fs.readFileSync('feature_names.pkl', {encoding:'binary'}));
// can't parse pickle in JS; instead read Testing.csv to obtain symptom names
const csv = fs.readFileSync('Testing.csv', 'utf8').split('\n');
const headers = csv[0].split(',');
// remove last prognosis column
const symptoms = headers.slice(0, -1);

function randomSubset(arr) {
  return arr.filter(() => Math.random() < 0.1);
}

async function test() {
  for (let i=0;i<200;i++){
    const subset=randomSubset(symptoms);
    if(subset.length===0) continue;
    const resp = await fetch('http://localhost:5000/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({symptoms:subset})});
    const data=await resp.json();
    if(data.primary && data.primary.confidence>=80 && data.primary.confidence<=90){
      console.log('found',subset,data.primary);
      break;
    }
  }
}

test();
