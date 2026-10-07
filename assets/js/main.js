const Answers={
 today(){return new Date().toLocaleDateString(undefined,{weekday:"long",year:"numeric",month:"long",day:"numeric"});},
 todayMeta(){const d=new Date();const n=Math.floor((d-new Date(d.getFullYear(),0,0))/86400000);return "Day "+n+" of the year";},
 time(){return new Date().toLocaleTimeString(undefined,{hour:"2-digit",minute:"2-digit",second:"2-digit"});},
 timeMeta(){return "Time zone: "+Intl.DateTimeFormat().resolvedOptions().timeZone;},
 async ip(){try{const r=await fetch("https://api.ipify.org?format=json");return (await r.json()).ip;}catch{return "Unavailable";}},
 async ipMeta(){try{const r=await fetch("https://ipapi.co/json/");const d=await r.json();const p=[d.city,d.region,d.country_name].filter(Boolean);return p.length?"Approx. location: "+p.join(", "):"";}catch{return "";}},
 watch(){const h=new Date().getHours();const s={morning:["A documentary","A comedy series","A short film","A nature documentary"],afternoon:["An action movie","A sci-fi series","A thriller","A superhero film"],evening:["A drama","A classic film","A stand-up special","A mystery series"],night:["A mystery series","An anime","A late-night talk show","A horror film"]};const k=h<12?"morning":h<17?"afternoon":h<22?"evening":"night";const l=s[k];return l[Math.floor(Math.random()*l.length)];},
 watchMeta(){const h=new Date().getHours();const k=h<12?"morning":h<17?"afternoon":h<22?"evening":"night";return "Suggested for your "+k+" Â· refresh for another";}
};
async function fill(k,m){const el=document.querySelector('[data-answer="'+k+'"]');const me=document.querySelector('[data-answer="'+m+'"]');try{el.textContent=await Answers[k]();if(me&&Answers[m])me.textContent=await Answers[m]();}catch{el.textContent="Unable to load";}}
function startClock(){const el=document.querySelector('[data-answer="time"]');if(!el)return;const t=()=>{el.textContent=Answers.time();};t();setInterval(t,1000);}
document.addEventListener("DOMContentLoaded",()=>{const y=document.getElementById("year");if(y)y.textContent=new Date().getFullYear();fill("today","today-meta");startClock();const tm=document.querySelector('[data-answer="time-meta"]');if(tm)tm.textContent=Answers.timeMeta();fill("ip","ip-meta");fill("watch","watch-meta");});