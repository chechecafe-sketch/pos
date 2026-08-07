import { useState, useEffect, useRef } from "react";

const CHECHE_LOGO = "data:image/png;base64,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";

// ═══════════════════════════════════════════════════════
//  SUPABASE
// ═══════════════════════════════════════════════════════
const SUPABASE_URL = "https://flundjmctddrlnzndbvm.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsdW5kam1jdGRkcmxuem5kYnZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMDU5ODAsImV4cCI6MjA4OTc4MTk4MH0.zgkeRNzheXIJWbYAcnhHuRxMNw0OReC0ZTiWB_uTfKk";
const sb = {
  h: {"apikey":SUPABASE_KEY,"Authorization":`Bearer ${SUPABASE_KEY}`,"Content-Type":"application/json","Prefer":"return=representation"},
  url:(t,q="")=>`${SUPABASE_URL}/rest/v1/${t}${q}`,
  async select(t,q=""){try{const r=await fetch(this.url(t,q),{headers:this.h});return r.json();}catch{return[];}},
  async upsert(t,d){try{const r=await fetch(this.url(t),{method:"POST",headers:{...this.h,"Prefer":"resolution=merge-duplicates,return=representation"},body:JSON.stringify(d)});return r.json();}catch{return null;}},
  async insert(t,d){try{const r=await fetch(this.url(t),{method:"POST",headers:this.h,body:JSON.stringify(d)});return r.json();}catch{return null;}},
  async delete(t,q){try{await fetch(this.url(t,q),{method:"DELETE",headers:this.h});}catch{}},
  async update(t,q,d){try{const r=await fetch(this.url(t,q),{method:"PATCH",headers:this.h,body:JSON.stringify(d)});return r.json();}catch{return null;}},
};

// ═══════════════════════════════════════════════════════
//  STORES
// ═══════════════════════════════════════════════════════
const STORES = [
  {id:"santa-maria", name:"Santa María La Ribera", short:"Santa María", tables:12, color:"#4a7c99"},
  {id:"tabacalera",  name:"Tabacalera",             short:"Tabacalera",  tables:8,  color:"#8fb87a"},
  {id:"juarez",      name:"Juárez",                 short:"Juárez",      tables:10, color:"#c8a96e"},
  {id:"centro",      name:"Centro",                 short:"Centro",      tables:8,  color:"#b87c4a"},
  {id:"del-valle",   name:"Del Valle - Studio",     short:"Del Valle",   tables:10, color:"#7aace0"},
  {id:"jardin",      name:"Jardín",                 short:"Jardín",      tables:11, color:"#c47ab8"},
];

// Global admins can see all stores
const GLOBAL_ADMINS = [
  {id:1, name:"Fernanda Hughes", pin:"8888", role:"superadmin"},
  {id:2, name:"Luis Garinian",   pin:"5366", role:"superadmin"},
  {id:3, name:"Victoria",        pin:"9999", role:"superadmin"},
  {id:4, name:"Clemente",        pin:"7777", role:"superadmin"},
];

// Store employees (each store has their own team)
const STORE_EMPLOYEES = {
  "santa-maria":[
    {id:101,name:"Isaac",    pin:"1010",role:"gerente"},
    {id:103,name:"Karla",    pin:"1030",role:"mesero"},
    {id:104,name:"Marcelo",  pin:"1040",role:"mesero"},
    {id:105,name:"Tania",    pin:"1050",role:"mesero"},
  ],
  "tabacalera":[
    {id:201,name:"Miriam",    pin:"2010",role:"gerente"},
    {id:202,name:"Mariana",   pin:"2020",role:"mesero"},
    {id:204,name:"Uriel",     pin:"2040",role:"mesero"},
    {id:205,name:"Valentina", pin:"2050",role:"mesero"},
  ],
  "juarez":[
    {id:301,name:"Lizbeth",  pin:"3010",role:"gerente"},
    {id:302,name:"Eliseo",   pin:"3020",role:"mesero"},
    {id:303,name:"Adhonay",  pin:"3030",role:"mesero"},
  ],
  "centro":[
    {id:401,name:"Omar",      pin:"4010",role:"gerente"},
    {id:402,name:"Irán Nicole",pin:"4020",role:"mesero"},
    {id:403,name:"Iván",      pin:"4030",role:"mesero"},
  ],
  "del-valle":[
    {id:501,name:"Monserrath",pin:"5010",role:"gerente"},
    {id:502,name:"Zoé",       pin:"5020",role:"mesero"},
    {id:503,name:"Violeta",   pin:"5030",role:"mesero"},
  ],
  "jardin":[
    {id:601,name:"Giselle Aguilar", pin:"8787",role:"gerente"},
    {id:603,name:"Javier Ruíz",     pin:"3333",role:"mesero"},
    {id:610,name:"Dulce",           pin:"4444",role:"mesero"},
    {id:611,name:"Karla",           pin:"2222",role:"mesero"},
    {id:606,name:"Magali Cortés",   pin:"6061",role:"gerente"},
    {id:607,name:"Briza Guzmán",    pin:"6071",role:"mesero"},
    {id:608,name:"Francisco Perea", pin:"6081",role:"mesero"},
    {id:609,name:"Invitado",        pin:"1111",role:"mesero"},
  ],
};

// ── STORE GOALS (progressive, monthly) ──────────────────
const STORE_GOALS = {
  "santa-maria": { daily:6000,  weekly:44000, monthly:180000, label:"Santa María" },
  "tabacalera":  { daily:7333,  weekly:51333, monthly:220000, label:"Tabacalera"  },
  "juarez":      { daily:3167,  weekly:22167, monthly:95000,  label:"Juárez"      },
  "centro":      { daily:5500,  weekly:38500, monthly:165000, label:"Centro"      },
  "del-valle":   { daily:1667,  weekly:11667, monthly:50000,  label:"Del Valle"   },
  "jardin":      { daily:5167,  weekly:36167, monthly:155000, label:"Jardín"      },
};

const AVATAR_OPTIONS = [
  "☕","🧑🏻‍🍳","👩🏽‍🍳","👨🏽‍🍳","🧑🏾‍🍳","👩🏻‍🍳","👨🏻‍🍳","🧑🏻‍🍳",
  "🌟","🔥","💎","🚀","🎯","⚡","🌈","🦋",
  "🐱","🦊","🐻","🐼","🦁","🐯","🦊","🐺",
  "🌺","🌸","🌻","🌴","🍀","🌵","🍁","🌿",
];

const VICTORIA_WHATSAPP = "525512345678"; // UPDATE with real number
const ALERT_SHOTS  = 10;
const ALERT_MILK_L = 3;
const TABLE_DRINK_ALERT_MS  = 5  * 60 * 1000; // 5 min → bring drinks
const TABLE_CHECK_ALERT_MS  = 10 * 60 * 1000; // 10 min → check table
const TABLE_UPSELL_ALERT_MS = 30 * 60 * 1000; // 30 min → upsell push

// ═══════════════════════════════════════════════════════
//  MENU
// ═══════════════════════════════════════════════════════
const MILK_OPTIONS = [
  {id:"entera",       label:"Entera",       extra:0 },
  {id:"deslactosada", label:"Deslactosada", extra:0 },
  {id:"almendra",     label:"Almendra",     extra:13},
  {id:"avena",        label:"Avena",        extra:18},
];
const FOOD_EXTRAS = [
  {id:"cochinita",label:"Extra Cochinita",price:53},
  {id:"pollo",    label:"Extra Pollo",    price:44},
  {id:"tocino",   label:"Extra Tocino",   price:35},
  {id:"huevo",    label:"Extra Huevo",    price:17},
];
const COCKTAIL_EXTRAS = [
  {id:"magia", label:"✨ Magia", price:53},
];
const MILK_TYPES = [
  {id:"entera",       label:"Entera",       emoji:"🥛"},
  {id:"deslactosada", label:"Deslactosada", emoji:"🥛"},
  {id:"almendra",     label:"Almendra",     emoji:"🌰"},
  {id:"avena",        label:"Avena",        emoji:"🌾"},
];
const DISPOSABLE_PROFILES = {
  hot_8oz: {"Vaso 8oz caliente":1,"Tapa 8oz caliente":1},
  hot_12oz:{"Vaso 12oz caliente":1,"Tapa 12-16oz caliente":1},
  hot_16oz:{"Vaso 16oz caliente":1,"Tapa 12-16oz caliente":1},
  cold_16oz:{"Vaso cristal 16oz":1,"Tapa boquilla 16oz":1},
};
const ESPRESSO_SHOTS={c1:1,c2:2,c3:2,c4:2,c5:2,c6:2,c7:2,c8:2,c9:1,c10:1,c11:1,c12:2,c13:2};
const MILK_L = 0.22;

const MENU = {
  "CAFÉ":[
    {id:"c1", name:"Americano",      medPrice:48, grPrice:53,  station:"barra",hasSizes:true,hasMilk:false,isCold:false},
    {id:"c2", name:"Capuchino",      medPrice:66, grPrice:71,  station:"barra",hasSizes:true,hasMilk:true, isCold:false},
    {id:"c3", name:"Flat White",     medPrice:62, grPrice:71,  station:"barra",hasSizes:true,hasMilk:true, isCold:false,isFlatWhite:true},
    {id:"c4", name:"Latte",          medPrice:71, grPrice:80,  station:"barra",hasSizes:true,hasMilk:true, isCold:false},
    {id:"c5", name:"Frappé",         medPrice:89, grPrice:99,  station:"barra",hasSizes:true,hasMilk:true, isCold:true},
    {id:"c6", name:"Paraíso",        medPrice:98, grPrice:108, station:"barra",hasSizes:true,hasMilk:true, isCold:false,fav:true},
    {id:"c7", name:"Receta Secreta", medPrice:80, grPrice:89,  station:"barra",hasSizes:true,hasMilk:true, isCold:false,fav:true,note:"café o chocolate"},
    {id:"c8", name:"El Veracruzano", medPrice:80, grPrice:90,  station:"barra",hasSizes:true,hasMilk:false,isCold:true},
    {id:"c9", name:"Horchata-Café",  medPrice:53, grPrice:63,  station:"barra",hasSizes:true,hasMilk:false,isCold:false,fav:true},
    {id:"c10",name:"Espresso",       medPrice:35, grPrice:45,  station:"barra",hasSizes:true,hasMilk:false,isCold:false},
    {id:"c11",name:"Cold Brew",      medPrice:53, grPrice:63,  station:"barra",hasSizes:true,hasMilk:false,isCold:true},
    {id:"c12",name:"Espresso Tonic", medPrice:71, grPrice:81,  station:"barra",hasSizes:true,hasMilk:false,isCold:false},
    {id:"c13",name:"Moka",           medPrice:75, grPrice:85,  station:"barra",hasSizes:true,hasMilk:true, isCold:false},
  ],
  "SIN CAFÉ":[
    {id:"s1",name:"Té",           medPrice:53,grPrice:62,station:"barra",hasSizes:true,hasMilk:false,isCold:false},
    {id:"s2",name:"Limonada",     medPrice:62,grPrice:72,station:"barra",hasSizes:true,hasMilk:false,isCold:true},
    {id:"s3",name:"Jugo Verde",   medPrice:71,grPrice:81,station:"barra",hasSizes:true,hasMilk:false,isCold:false},
    {id:"s4",name:"Matcha",       medPrice:65,grPrice:75,station:"barra",hasSizes:true,hasMilk:true, isCold:false},
    {id:"s5",name:"Papaya Playa", medPrice:71,grPrice:81,station:"barra",hasSizes:true,hasMilk:false,isCold:false,fav:true},
    {id:"s6",name:"Chai",         medPrice:66,grPrice:75,station:"barra",hasSizes:true,hasMilk:true, isCold:false},
    {id:"s7",name:"La Chimba",    medPrice:80,grPrice:90,station:"barra",hasSizes:true,hasMilk:false,isCold:false,fav:true},
    {id:"s8",name:"Chocolate",    medPrice:65,grPrice:75,station:"barra",hasSizes:true,hasMilk:true, isCold:false},
  ],
  "TODO EL DÍA":[
    {id:"t1",name:"Chilaquiles V/R",    price:125,station:"cocina",hasFoodExtras:true},
    {id:"t2",name:"Burritos Cochinita", price:152,station:"cocina",hasFoodExtras:true},
    {id:"t3",name:"Molletes Cochinita", price:161,station:"cocina",hasFoodExtras:true},
    {id:"t4",name:"Sándwich Cubanito",  price:170,station:"cocina",hasFoodExtras:true,fav:true},
    {id:"t5",name:"Sándwich Barcelona", price:161,station:"cocina",hasFoodExtras:true,fav:true},
    {id:"t6",name:"Sándwich de Tocino", price:170,station:"cocina",hasFoodExtras:true,fav:true},
    {id:"t7",name:"Montecristo",        price:170,station:"cocina",hasFoodExtras:true,fav:true},
  ],
  "LIGEROS":[
    {id:"l1",name:"Bowl Frutos Rojos",price:152,station:"cocina"},
    {id:"l2",name:"Toast Aguacate",   price:134,station:"cocina",hasFoodExtras:true,fav:true},
    {id:"l3",name:"Toast Hummus",     price:134,station:"cocina"},
  ],
  "PAN DULCE":[
    {id:"p1",name:"Croissant",         price:80,station:"barra"},
    {id:"p2",name:"Cruffin",           price:80,station:"barra",fav:true},
    {id:"p3",name:"Croissant Cubo",    price:80,station:"barra",fav:true},
    {id:"p4",name:"Roles",             price:80,station:"barra"},
    {id:"p5",name:"Galletas / Cookies",price:53,station:"barra",note:"choc·sal / arándano / avena / triple choc"},
    {id:"p6",name:"Donas",             price:53,station:"barra"},
    {id:"p7",name:"Pan Dulce",         price:70,station:"barra"},
  ],
  "COMBOS":[
    {id:"cb1",name:"Combo Galleta",price:71,station:"barra",isCombo:true,note:"bebida + galleta"},
    {id:"cb2",name:"Combo Concha", price:62,station:"barra",isCombo:true,note:"bebida + concha"},
    {id:"cb3",name:"Combo Panqué", price:62,station:"barra",isCombo:true,note:"bebida + panqué"},
  ],
  "COCTELERÍA":[
    {id:"k1",name:"Jardín Prohibido",price:116,station:"barra",note:"Romero, Eureka, Jengibre, Tónica",hasCocktailExtras:true},
    {id:"k2",name:"Vista Al Mar",    price:116,station:"barra",note:"Toronja, Pepino, Romero, Tónica, Limón",hasCocktailExtras:true},
    {id:"k3",name:"Club Paraíso",    price:116,station:"barra",note:"Piña, Romero, Eureka, Jengibre, Limón",hasCocktailExtras:true},
    {id:"k4",name:"Cielo Azul",      price:116,station:"barra",note:"Toronja, Curaçao, Limón, Mineral",hasCocktailExtras:true},
  ],
};

const EMP_DRINKS=[
  {id:"ec1",name:"Latte",    medPrice:71,grPrice:80, hasMilk:true},
  {id:"ec2",name:"Espresso", medPrice:35,grPrice:45, hasMilk:false},
  {id:"ec3",name:"Capuchino",medPrice:66,grPrice:71, hasMilk:true},
  {id:"ec4",name:"Americano",medPrice:48,grPrice:53, hasMilk:false},
  {id:"ec5",name:"Chocolate",medPrice:65,grPrice:75, hasMilk:true},
  {id:"ec6",name:"Chai",     medPrice:66,grPrice:75, hasMilk:true},
  {id:"ec7",name:"Matcha",   medPrice:65,grPrice:75, hasMilk:true},
];
const EMP_MILK=[
  {id:"entera",label:"Entera",extra:0},
  {id:"deslactosada",label:"Deslactosada",extra:0},
  {id:"almendra",label:"Almendra",extra:10},
  {id:"avena",label:"Avena",extra:10},
];

const DISCOUNTS=[
  {id:"staff",label:"Staff",pct:0.40,emoji:"👥",adminOnly:false},
  {id:"vip",  label:"VIP / Inversionista",pct:0.20,emoji:"⭐",adminOnly:false},
  {id:"custom",label:"Otro",pct:null,emoji:"✏️",adminOnly:true},
];

const SHIFTS=[
  {id:"A",  name:"Turno A",    time:"07:00",label:"7:00 AM"},
  {id:"mid",name:"Intermedio", time:"10:00",label:"10:00 AM"},
  {id:"B",  name:"Turno B",    time:"14:00",label:"2:00 PM"},
];

const DEFAULT_INV={
  coffeBags:[],
  milk:{entera:10,deslactosada:5,almendra:3,avena:3},
  milkLiters:18,
  bread:{},
  disposables:{},
  consumptionLog:[],
};

// ── HELPERS ──────────────────────────────────────────────
const fmt    = n=>`$${Number(n).toFixed(0)}`;
const pctFmt = n=>`${Math.round(n*100)}%`;
const nowISO = ()=>new Date().toISOString();
const TZ = "America/Mexico_City";
const dayKey  = (d=new Date())=>new Intl.DateTimeFormat("en-CA",{timeZone:TZ}).format(d);
const weekKey = (d=new Date())=>{const s=new Intl.DateTimeFormat("en-CA",{timeZone:TZ}).format(d);const dd=new Date(s+"T12:00:00");const j=new Date(dd.getFullYear(),0,1);return`${dd.getFullYear()}-W${Math.ceil(((dd-j)/86400000+j.getDay()+1)/7)}`;};
const monthKey= (d=new Date())=>new Intl.DateTimeFormat("en-CA",{timeZone:TZ,year:"numeric",month:"2-digit"}).format(d).slice(0,7);
const localHour=(d=new Date())=>parseInt(new Intl.DateTimeFormat("es-MX",{timeZone:TZ,hour:"2-digit",hour12:false}).format(d));
const fixTS   = ts=>(ts||"").replace(" ","T").replace(/\+00$/,"+00:00");
const DAILY_GOAL=8000, WEEKLY_GOAL=50000, MONTHLY_GOAL=200000; // fallback defaults
const CASH_LIMIT=100, VICTORIA_ID=3;

function calcDailyBonus(s){if(s<1500)return 0;let b=0;const t1=Math.min(s,2500)-1500;if(t1>0)b+=t1*.015;const t2=Math.min(s,4000)-2500;if(t2>0)b+=t2*.025;const t3=s-4000;if(t3>0)b+=t3*.04;return b;}
function calcWeeklyBonus(avg){if(avg<180)return 0;if(avg<220)return 150;if(avg<280)return 300;return 500;}
function calcGroupBonus(pct){if(pct<.8)return 0;if(pct<.9)return 300;if(pct<1)return 600;return 1000;}
function getLevel(s){if(s>=20000)return{emoji:"🏆",label:"Leyenda"};if(s>=12000)return{emoji:"💎",label:"Diamante"};if(s>=7000)return{emoji:"🥇",label:"Oro"};if(s>=3000)return{emoji:"🥈",label:"Plata"};return{emoji:"☕",label:"Barista"};}

function alertVictoria(type,detail){
  const msg=encodeURIComponent(
    type==="coffee"?`⚠️ ALERTA CAFÉ - Che'Che' POS\nQuedan menos de ${detail} shots. Necesitamos reabastecer.`
    :type==="milk"?`⚠️ ALERTA LECHE - Che'Che' POS\nLeche ${detail} en menos de 3L. Necesitamos reabastecimiento.`
    :`⚠️ ALERTA INVENTARIO - Che'Che' POS\n${detail}`
  );
  window.open('https://wa.me/'+VICTORIA_WHATSAPP+'?text='+msg,'_blank');
}

// Beep using Web Audio API
function beep(freq=440, duration=200, vol=0.3){
  try{
    const ctx=new(window.AudioContext||window.webkitAudioContext)();
    const o=ctx.createOscillator();
    const g=ctx.createGain();
    o.connect(g);g.connect(ctx.destination);
    o.frequency.value=freq;g.gain.value=vol;
    o.start();o.stop(ctx.currentTime+duration/1000);
    setTimeout(()=>ctx.close(),duration+100);
  }catch{}
}
function alertBeep(){beep(880,150);setTimeout(()=>beep(880,150),200);}
function urgentBeep(){beep(660,200);setTimeout(()=>beep(880,200),250);setTimeout(()=>beep(1100,300),550);}

const UPSELL_TIPS=[
  "🍞 Solo bebida — ¿les ofreciste pan dulce o ligero?",
  "⬆️ Mediano — el grande son $10 más, ofrécelo.",
  "🥑 Sin comida — el Toast Aguacate y Cubanito son favoritos.",
  "☕ Ticket bajo — ¿ofreciste algo para llevar o postre?",
  "🌰 Leche normal — ¿ofreciste upgrade a almendra o avena?",
];
function getUpsell(items){
  if(!items||!items.length)return null;
  const hF=items.some(i=>i.station==="cocina"),hD=items.some(i=>i.station==="barra"),
        hL=items.some(i=>i.size==="grande"),hS=items.some(i=>i.milk&&(i.milk==="Almendra"||i.milk==="Avena")),
        tot=items.reduce((s,i)=>s+i.price*i.qty,0);
  if(hD&&!hF)return UPSELL_TIPS[0];
  if(hD&&!hL)return UPSELL_TIPS[1];
  if(!hF&&items.length<2)return UPSELL_TIPS[2];
  if(tot<150)return UPSELL_TIPS[3];
  if(hD&&!hS)return UPSELL_TIPS[4];
  return null;
}

function parseShiftTime(timeStr){
  const today=new Intl.DateTimeFormat("en-CA",{timeZone:TZ}).format(new Date());
  return new Date(`${today}T${timeStr}:00-06:00`);
}
function checkLate(shiftTime,arrivalTime){
  return new Date(arrivalTime)>new Date(parseShiftTime(shiftTime).getTime()+15*60*1000);
}

// ── TABLE TIMER STATUS ────────────────────────────────────
function getTableStatus(seatedAt, lastOrderAt){
  if(!seatedAt) return null;
  const now = Date.now();
  const seated = new Date(seatedAt).getTime();
  const lastOrder = lastOrderAt ? new Date(lastOrderAt).getTime() : seated;
  const sinceSeated = now - seated;
  const sinceOrder  = now - lastOrder;
  if(sinceSeated < TABLE_DRINK_ALERT_MS) return {level:"ok",    color:"var(--ac2)", msg:null};
  if(sinceSeated < TABLE_CHECK_ALERT_MS) return {level:"drinks",color:"var(--ac)",  msg:"☕ ¿Ya les llevaron bebidas?"};
  if(sinceOrder  < TABLE_UPSELL_ALERT_MS)return {level:"check", color:"var(--warn)",msg:"👀 Revisa la mesa"};
  return {level:"upsell",color:"var(--err)",msg:"🚀 ¡30 min! Ofrece postre, café extra o para llevar"};
}

function formatElapsed(seatedAt){
  if(!seatedAt) return "";
  const ms = Date.now() - new Date(seatedAt).getTime();
  const m = Math.floor(ms/60000);
  const s = Math.floor((ms%60000)/1000);
  return m>0?`${m}m ${s}s`:`${s}s`;
}

// ═══════════════════════════════════════════════════════
//  STYLES
// ═══════════════════════════════════════════════════════
const css=`
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --bg:#0f0f0e;--sf:#181816;--sf2:#202020;--sf3:#282826;
  --bd:#2a2a28;--bd2:#363634;
  --ac:#c8a96e;--ac2:#8fb87a;--ac3:#7aace0;
  --err:#c46b5a;--warn:#d4955a;
  --tx:#e8e6e0;--mu:#7a7875;--mu2:#555350;
  --bar:#4a7c99;--kok:#b87c4a;
}
body{background:var(--bg);color:var(--tx);font-family:'DM Sans',sans-serif;min-height:100dvh;-webkit-font-smoothing:antialiased;}
button{cursor:pointer;border:none;font-family:inherit;transition:all .12s;}
input,select,textarea{font-family:inherit;}
::-webkit-scrollbar{width:3px;height:3px;}
::-webkit-scrollbar-thumb{background:var(--bd2);border-radius:2px;}
@keyframes spin{to{transform:rotate(360deg);}}
@keyframes pulse{0%,100%{opacity:1;}50%{opacity:.4;}}
@keyframes flash{0%,100%{opacity:1;}50%{opacity:.2;}}
@keyframes slin{from{opacity:0;transform:translateY(-6px);}to{opacity:1;transform:translateY(0);}}

/* STORE SELECT */
.store-select-wrap{min-height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px;padding:20px;background:radial-gradient(ellipse at 50% 0%,#1e1a12,var(--bg) 70%);}
.brand{font-family:'DM Mono',monospace;font-size:26px;letter-spacing:.2em;color:var(--ac);display:block;text-align:center;}
.subttl{font-size:10px;letter-spacing:.4em;color:var(--mu);text-transform:uppercase;font-family:'DM Mono',monospace;text-align:center;margin-top:3px;}
.store-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;width:100%;max-width:600px;}
.store-card{background:var(--sf);border:2px solid var(--bd);border-radius:16px;padding:20px 16px;display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center;}
.store-card:hover,.store-card:active{transform:translateY(-2px);filter:brightness(1.1);}
.store-card .sc-icon{font-size:28px;}
.store-card .sc-name{font-size:14px;font-weight:700;line-height:1.2;}
.store-card .sc-tables{font-size:11px;color:var(--mu);font-family:'DM Mono',monospace;}

/* LOGIN */
.lw{min-height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;padding:20px;background:radial-gradient(ellipse at 50% 0%,#1e1a12,var(--bg) 70%);}
.store-banner{padding:10px 20px;border-radius:10px;font-size:13px;font-weight:700;text-align:center;letter-spacing:.05em;}
.egrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(128px,1fr));gap:8px;width:100%;max-width:540px;}
.ecard{background:var(--sf);border:1px solid var(--bd);border-radius:14px;padding:15px 11px;display:flex;flex-direction:column;align-items:center;gap:7px;}
.ecard:active,.ecard:hover{border-color:var(--ac);background:var(--sf2);}
.eavatar{width:40px;height:40px;border-radius:50%;background:var(--sf3);display:flex;align-items:center;justify-content:center;font-size:19px;}
.ename{font-size:12px;font-weight:600;text-align:center;line-height:1.2;}
.erole{font-size:10px;color:var(--mu);font-family:'DM Mono',monospace;text-transform:uppercase;letter-spacing:.08em;}
.abadge{font-size:9px;background:#1f1a0a;color:var(--ac);border:1px solid #3a2e10;border-radius:4px;padding:1px 6px;font-family:'DM Mono',monospace;}
.pinw{display:flex;flex-direction:column;align-items:center;gap:15px;}
.pname{font-size:17px;font-weight:700;}
.psub{font-size:11px;color:var(--mu);font-family:'DM Mono',monospace;letter-spacing:.15em;text-transform:uppercase;}
.pdots{display:flex;gap:14px;}
.pdot{width:14px;height:14px;border-radius:50%;border:1.5px solid var(--bd2);transition:all .2s;}
.pdot.on{background:var(--ac);border-color:var(--ac);box-shadow:0 0 8px #c8a96e55;}
.npad{display:grid;grid-template-columns:repeat(3,70px);gap:7px;}
.nb{height:56px;background:var(--sf2);border:1px solid var(--bd);border-radius:12px;font-size:22px;color:var(--tx);}
.nb:active,.nb:hover{background:var(--sf3);border-color:var(--ac);}
.nb.del{font-size:17px;color:var(--mu);}
.nb.ok{background:var(--ac);color:#0f0f0e;font-weight:700;font-size:18px;}
.perr{font-size:12px;color:var(--err);font-family:'DM Mono',monospace;}

/* SHELL */
.shell{display:flex;flex-direction:column;height:100dvh;overflow:hidden;}
.topbar{height:50px;background:var(--sf);border-bottom:1px solid var(--bd);display:flex;align-items:center;gap:9px;padding:0 13px;flex-shrink:0;}
.tbrand{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.2em;color:var(--ac);text-transform:uppercase;white-space:nowrap;}
.store-pill{font-size:11px;font-weight:700;padding:3px 10px;border-radius:20px;white-space:nowrap;}
.tsep{width:1px;height:20px;background:var(--bd);}
.tsp{flex:1;}
.ttime{font-family:'DM Mono',monospace;font-size:11px;color:var(--mu2);white-space:nowrap;}
.tbtn{background:var(--sf2);border:1px solid var(--bd);border-radius:8px;padding:5px 10px;font-size:12px;color:var(--tx);white-space:nowrap;}
.tbtn:hover{border-color:var(--ac);color:var(--ac);}
.tbtn.on{background:var(--ac);color:#0f0f0e;border-color:var(--ac);font-weight:700;}
.sync-dot{width:8px;height:8px;border-radius:50%;background:var(--ac2);animation:pulse 2s infinite;flex-shrink:0;}
.sync-dot.off{background:var(--err);animation:none;}

/* TABS */
.view-tabs{display:flex;gap:2px;padding:6px 10px;background:var(--sf);border-bottom:1px solid var(--bd);flex-shrink:0;}
.vtab{padding:6px 14px;border-radius:8px;font-size:12px;font-weight:600;color:var(--mu);background:transparent;}
.vtab.on{background:var(--sf2);color:var(--tx);border:1px solid var(--bd2);}
.vtab:hover:not(.on){color:var(--tx);}

/* 3-COL */
.cols{display:grid;grid-template-columns:188px 1fr 308px;flex:1;overflow:hidden;}

/* LEFT PANEL */
.lpanel{background:var(--sf);border-right:1px solid var(--bd);overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:5px;}
.ptitle{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.2em;color:var(--mu);text-transform:uppercase;padding-bottom:7px;border-bottom:1px solid var(--bd);margin-bottom:1px;}

/* TABLE BUTTONS */
.tbtn2{background:var(--sf2);border:1px solid var(--bd);border-radius:9px;padding:10px 9px;text-align:left;display:flex;flex-direction:column;gap:2px;position:relative;overflow:hidden;}
.tbtn2.on{border-color:var(--ac);background:#1c1a10;}
.tbtn2.occ::after{content:'';width:7px;height:7px;border-radius:50%;background:var(--ac2);position:absolute;top:7px;right:7px;}
.tbtn2.alert-drinks{border-color:var(--ac)!important;animation:none;}
.tbtn2.alert-check{border-color:var(--warn)!important;}
.tbtn2.alert-upsell{border-color:var(--err)!important;animation:flash 1s infinite;}
.tname{font-size:13px;font-weight:600;}
.tsub2{font-size:11px;color:var(--mu);font-family:'DM Mono',monospace;}
.timer-bar{position:absolute;bottom:0;left:0;height:3px;transition:width 1s linear,background .5s;}
.comr{display:flex;align-items:center;gap:5px;padding:7px 9px;background:var(--sf2);border:1px solid var(--bd);border-radius:8px;}
.comr span{font-size:12px;color:var(--mu);flex:1;}
.cb{width:24px;height:24px;border-radius:6px;background:var(--bd);color:var(--tx);font-size:16px;display:flex;align-items:center;justify-content:center;}
.cb:hover{background:var(--ac);color:#0f0f0e;}
.cv{font-family:'DM Mono',monospace;font-size:13px;min-width:18px;text-align:center;}

/* MODE TOGGLE */
.mode-toggle{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:4px;}
.mode-btn{padding:12px 6px;border-radius:10px;font-size:13px;font-weight:700;border:2px solid transparent;display:flex;flex-direction:column;align-items:center;gap:3px;background:var(--sf2);}
.mode-btn .mode-icon{font-size:20px;}
.mode-btn .mode-label{font-size:11px;letter-spacing:.05em;}
.mode-btn.salon{border-color:#3a5a3a;color:#6abf6a;background:#1a2e1a;}
.mode-btn.salon.on{border-color:#6abf6a;background:#2a4a2a;box-shadow:0 0 12px #3a8a3a44;}
.mode-btn.takeout{border-color:#2a3a55;color:#6a9abf;background:#1a2535;}
.mode-btn.takeout.on{border-color:#6a9abf;background:#1a2a45;box-shadow:0 0 12px #2a5a8a44;}
.ba-btn{padding:8px 10px;border-radius:9px;font-size:12px;font-weight:600;border:1px solid var(--bd);background:var(--sf2);color:var(--tx);text-align:left;display:flex;align-items:center;gap:7px;width:100%;}
.ba-btn:hover{border-color:var(--ac);color:var(--ac);}
.ba-btn.warn{border-color:var(--warn);color:var(--warn);background:#251500;}
.ba-btn.success{border-color:var(--ac2);color:var(--ac2);background:#0a1a0a;}
.ba-btn.danger{border-color:var(--err);color:var(--err);background:#200a0a;}

/* TABLE VIEW */
.table-view-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;padding:14px;overflow-y:auto;align-content:start;}
.table-card{background:var(--sf);border:2px solid var(--bd);border-radius:14px;padding:14px;display:flex;flex-direction:column;gap:6px;cursor:pointer;transition:all .2s;position:relative;overflow:hidden;}
.table-card:hover{transform:translateY(-2px);}
.table-card.empty{opacity:.6;}
.table-card.occupied{border-color:var(--ac2);}
.table-card.alert-drinks{border-color:var(--ac);}
.table-card.alert-check{border-color:var(--warn);}
.table-card.alert-upsell{border-color:var(--err);animation:flash 1.5s infinite;}
.tc-name{font-size:15px;font-weight:700;}
.tc-timer{font-family:'DM Mono',monospace;font-size:18px;font-weight:700;}
.tc-status{font-size:11px;font-weight:600;padding:3px 8px;border-radius:6px;align-self:flex-start;}
.tc-items{font-size:11px;color:var(--mu);}
.tc-total{font-family:'DM Mono',monospace;font-size:14px;color:var(--ac);}
.tc-mode{font-size:10px;padding:2px 7px;border-radius:5px;align-self:flex-start;font-weight:700;}
.tc-mode.salon{background:#1a2e1a;color:#6abf6a;}
.tc-mode.takeout{background:#1a2535;color:#6a9abf;}
.tc-bar{position:absolute;bottom:0;left:0;height:4px;}

/* COACHING BANNER */
.coach-banner{background:#1a1200;border:1px solid var(--warn);border-radius:10px;padding:10px 13px;font-size:12px;color:var(--warn);display:flex;align-items:flex-start;gap:8px;animation:slin .3s ease;}
.coach-banner.urgent{background:#1a0800;border-color:var(--err);color:var(--err);}
.coach-banner button{background:none;border:none;color:inherit;font-size:16px;margin-left:auto;padding:0 2px;opacity:.6;}

/* MENU */
.mpanel{display:flex;flex-direction:column;overflow:hidden;background:var(--bg);}
.cscroll{display:flex;gap:5px;padding:8px 10px;border-bottom:1px solid var(--bd);overflow-x:auto;background:var(--sf);flex-shrink:0;}
.cscroll::-webkit-scrollbar{height:0;}
.ctab{background:var(--sf2);border:1px solid var(--bd);border-radius:20px;padding:5px 13px;font-size:12px;white-space:nowrap;color:var(--mu);}
.ctab.on{background:var(--ac);border-color:var(--ac);color:#0f0f0e;font-weight:700;}
.igrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(145px,1fr));gap:7px;padding:9px;overflow-y:auto;align-content:start;}
.mcard{background:var(--sf);border:1px solid var(--bd);border-radius:12px;padding:12px 11px;display:flex;flex-direction:column;gap:5px;text-align:left;}
.mcard:active,.mcard:hover{border-color:var(--ac);background:var(--sf2);transform:translateY(-1px);}
.mcard.combo{border-color:#3a2e10;background:#1a1508;}
.mcard.combo:hover{border-color:var(--ac);background:#201c0a;}
.mcrow{display:flex;justify-content:space-between;align-items:flex-start;gap:4px;}
.mcname{font-size:13px;font-weight:600;line-height:1.25;flex:1;}
.mcfav{color:var(--ac);font-size:11px;}
.mcprice{font-family:'DM Mono',monospace;font-size:14px;color:var(--ac);}
.mcnote{font-size:10px;color:var(--mu);line-height:1.3;}
.combo-badge{font-size:9px;background:#2a1e08;color:var(--ac);border:1px solid #4a3a18;border-radius:4px;padding:2px 7px;font-family:'DM Mono',monospace;align-self:flex-start;}
.stag{font-size:9px;font-family:'DM Mono',monospace;letter-spacing:.08em;text-transform:uppercase;padding:2px 7px;border-radius:4px;align-self:flex-start;}
.stag.barra{background:#152030;color:var(--bar);}
.stag.cocina{background:#251500;color:var(--kok);}

/* ORDER */
.rpanel{background:var(--sf);border-left:1px solid var(--bd);display:flex;flex-direction:column;overflow:hidden;}
.oh{padding:10px 12px;border-bottom:1px solid var(--bd);display:flex;align-items:center;justify-content:space-between;flex-shrink:0;gap:6px;}
.otitle{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--tx);}
.mode-badge{font-size:11px;font-weight:700;padding:3px 8px;border-radius:6px;}
.mode-badge.salon{background:#2a4a2a;color:#6abf6a;border:1px solid #3a6a3a;}
.mode-badge.takeout{background:#1a2a45;color:#6a9abf;border:1px solid #2a4a6a;}
.oclr{background:transparent;border:1px solid var(--bd);border-radius:6px;padding:4px 9px;font-size:11px;color:var(--mu);}
.oclr:hover{border-color:var(--err);color:var(--err);}
.oitems{overflow-y:auto;padding:8px;display:flex;flex-direction:column;gap:5px;flex:1;}
.oempty{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:8px;color:var(--mu);}
.oeicon{font-size:34px;opacity:.3;}
.oetext{font-size:11px;font-family:'DM Mono',monospace;letter-spacing:.1em;}
.oitem{background:var(--sf2);border:1px solid var(--bd);border-radius:9px;padding:8px 9px;display:flex;align-items:center;gap:7px;}
.oqctrl{display:flex;flex-direction:column;align-items:center;gap:1px;}
.oqb{width:20px;height:20px;border-radius:5px;background:var(--bd);color:var(--tx);font-size:14px;display:flex;align-items:center;justify-content:center;}
.oqb:hover{background:var(--ac);color:#0f0f0e;}
.oqn{font-family:'DM Mono',monospace;font-size:13px;color:var(--ac);min-width:18px;text-align:center;}
.obody{flex:1;display:flex;flex-direction:column;gap:1px;}
.oiname{font-size:12px;font-weight:600;line-height:1.25;}
.oimods{font-size:10px;color:var(--mu);}
.oiprice{font-family:'DM Mono',monospace;font-size:12px;color:var(--tx);}
.odel{background:transparent;border:none;color:var(--mu2);font-size:18px;padding:0 2px;line-height:1;}
.odel:hover{color:var(--err);}
.onote{background:var(--sf2);border:1px solid var(--bd);border-radius:8px;padding:7px 10px;color:var(--tx);font-size:12px;width:100%;outline:none;resize:none;}
.onote:focus{border-color:var(--ac);}
.ofoot{border-top:1px solid var(--bd);padding:10px 12px;display:flex;flex-direction:column;gap:7px;flex-shrink:0;}
.trow{display:flex;justify-content:space-between;font-size:13px;color:var(--mu);}
.trow.big{color:var(--tx);font-size:18px;font-family:'DM Mono',monospace;font-weight:500;}
.pgrid{display:grid;grid-template-columns:1fr 1fr;gap:5px;}
.pbtn{padding:10px 5px;border-radius:10px;font-size:13px;font-weight:700;border:1.5px solid transparent;}
.pbtn.cash{background:#162016;border-color:var(--ac2);color:var(--ac2);}
.pbtn.card{background:#162030;border-color:var(--ac3);color:var(--ac3);}
.pbtn.mix{grid-column:span 2;background:var(--sf2);border-color:var(--bd2);color:var(--tx);}
.pbtn:hover:not(:disabled){opacity:.82;transform:translateY(-1px);}
.pbtn:disabled{opacity:.28;cursor:not-allowed;}
.sbtn{background:var(--sf3);border:1px solid var(--bd2);border-radius:9px;padding:9px;font-size:12px;font-weight:500;color:var(--tx);width:100%;}
.sbtn:hover:not(:disabled){border-color:var(--ac);color:var(--ac);}
.sbtn:disabled{opacity:.28;cursor:not-allowed;}
.disc-toggle{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;}
.disc-btn{padding:9px 4px;border-radius:9px;font-size:11px;font-weight:600;border:1.5px solid var(--bd);background:var(--sf2);color:var(--mu);display:flex;flex-direction:column;align-items:center;gap:2px;width:100%;}
.disc-btn:hover,.disc-btn.on{border-color:var(--warn);color:var(--warn);background:#251200;}
.disc-row-active{background:#251200;border:1px solid var(--warn);border-radius:9px;padding:8px 12px;display:flex;justify-content:space-between;align-items:center;font-size:12px;color:var(--warn);}

/* UPSELL */
.ubanner{background:#1c1800;border:1px solid #3a3010;border-radius:9px;padding:9px 11px;font-size:12px;color:#d4b84a;display:flex;align-items:flex-start;gap:7px;animation:slin .3s ease;}
.ubanner button{background:none;border:none;color:#3a3010;font-size:16px;margin-left:auto;padding:0 2px;}

/* GAMI BAR */
.gbar{background:var(--sf);border-top:1px solid var(--bd);padding:8px 12px;display:flex;align-items:center;gap:10px;flex-shrink:0;}
.gstat{display:flex;flex-direction:column;gap:1px;min-width:68px;}
.glabel{font-size:9px;color:var(--mu);font-family:'DM Mono',monospace;text-transform:uppercase;letter-spacing:.1em;}
.gval{font-size:14px;font-family:'DM Mono',monospace;color:var(--ac);}
.gbwrap{flex:1;display:flex;flex-direction:column;gap:3px;}
.gblabrow{display:flex;justify-content:space-between;font-size:10px;color:var(--mu);}
.gbtrack{height:7px;background:var(--sf3);border-radius:4px;overflow:hidden;}
.gbfill{height:100%;border-radius:4px;transition:width .7s ease;background:linear-gradient(90deg,var(--ac2),var(--ac));}
.gbfill.warn{background:linear-gradient(90deg,var(--warn),#f0c040);}
.gbfill.done{background:linear-gradient(90deg,var(--ac2),#6bdf70);}
.lbadge{font-size:19px;min-width:24px;text-align:center;}
.bonus-strip{background:#1a1a10;border:1px solid #3a3010;border-radius:9px;padding:8px 11px;display:flex;gap:12px;flex-wrap:wrap;}
.bs-item{display:flex;flex-direction:column;gap:1px;}
.bs-label{font-size:9px;color:var(--mu);font-family:'DM Mono',monospace;text-transform:uppercase;letter-spacing:.08em;}
.bs-val{font-size:14px;font-family:'DM Mono',monospace;color:#f0c040;font-weight:500;}

/* MODAL */
.ov{position:fixed;inset:0;background:rgba(0,0,0,.72);display:flex;align-items:flex-end;justify-content:center;z-index:200;}
@media(min-width:580px){.ov{align-items:center;padding:20px;}}
.mod{background:var(--sf);border:1px solid var(--bd);border-radius:20px 20px 0 0;padding:22px;width:100%;max-width:440px;display:flex;flex-direction:column;gap:13px;max-height:92dvh;overflow-y:auto;}
@media(min-width:580px){.mod{border-radius:18px;}}
.mdrag{width:38px;height:4px;background:var(--bd2);border-radius:2px;margin:0 auto -5px;}
.mod h2{font-size:18px;font-weight:700;}
.msub{font-size:13px;color:var(--mu);margin-top:-6px;}
.mrow2{display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid var(--bd);}
.mrow2:last-of-type{border:none;}
.mlbl{font-size:13px;color:var(--mu);}
.mval{font-family:'DM Mono',monospace;color:var(--ac);}
.mval.big{font-size:22px;color:var(--tx);}
.mbtns{display:flex;gap:8px;}
.mb{flex:1;padding:12px;border-radius:11px;font-size:14px;font-weight:600;border:1.5px solid var(--bd);background:var(--sf2);color:var(--tx);}
.mb.p{background:var(--ac);color:#0f0f0e;border-color:var(--ac);}
.mb.danger{background:#200a0a;color:var(--err);border-color:var(--err);}
.mb:hover:not(:disabled){opacity:.87;}
.mb:disabled{opacity:.3;cursor:not-allowed;}
.minput{background:var(--sf2);border:1px solid var(--bd);border-radius:10px;padding:11px 13px;color:var(--tx);font-size:16px;font-family:'DM Mono',monospace;width:100%;outline:none;}
.minput:focus{border-color:var(--ac);}
.mlabel2{font-size:10px;color:var(--mu);font-family:'DM Mono',monospace;letter-spacing:.12em;text-transform:uppercase;}
.ssep{font-size:10px;color:var(--mu);font-family:'DM Mono',monospace;text-transform:uppercase;letter-spacing:.15em;padding-top:2px;}
.ogrid{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
.obtn{padding:13px 9px;border-radius:12px;background:var(--sf2);border:1.5px solid var(--bd);display:flex;flex-direction:column;align-items:center;gap:4px;}
.obtn:hover,.obtn.sel{border-color:var(--ac);background:#1c1a10;}
.oblbl{font-size:12px;color:var(--mu);}
.obprice{font-family:'DM Mono',monospace;font-size:17px;color:var(--ac);}
.ckrow{display:flex;align-items:center;gap:9px;padding:9px 11px;border-radius:10px;background:var(--sf2);border:1.5px solid var(--bd);cursor:pointer;}
.ckrow.sel{border-color:var(--ac);background:#1c1a10;}
.ckbox{width:20px;height:20px;border-radius:5px;border:1.5px solid var(--bd2);background:var(--sf3);display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;}
.ckrow.sel .ckbox{background:var(--ac);border-color:var(--ac);color:#0f0f0e;}
.cklbl{flex:1;font-size:13px;font-weight:500;}
.ckprice{font-family:'DM Mono',monospace;font-size:13px;color:var(--ac);}
.tip-row{display:flex;gap:6px;flex-wrap:wrap;}
.tip-chip{padding:6px 11px;border-radius:8px;font-size:12px;font-weight:600;background:var(--sf2);border:1px solid var(--bd);color:var(--mu);}
.tip-chip.sel{background:#162016;border-color:var(--ac2);color:var(--ac2);}

/* COMANDA */
.csheet{background:#f5f0e8;color:#111;border-radius:12px;padding:19px;font-family:'DM Mono',monospace;}
.csheet h3{font-size:12px;letter-spacing:.2em;text-transform:uppercase;border-bottom:2px dashed #bbb;padding-bottom:8px;margin-bottom:10px;}
.cline{display:flex;gap:7px;font-size:13px;padding:3px 0;}
.cqty{font-weight:700;min-width:22px;}
.cmod{font-size:10px;color:#666;margin-left:29px;margin-top:-2px;}

/* REPORTS */
.repwrap{padding:13px;overflow-y:auto;flex:1;display:flex;flex-direction:column;gap:14px;}
.frow{display:flex;gap:5px;flex-wrap:wrap;align-items:center;}
.rfbtn{background:var(--sf2);border:1px solid var(--bd);border-radius:20px;padding:5px 12px;font-size:12px;color:var(--mu);}
.rfbtn.on{background:var(--ac);border-color:var(--ac);color:#0f0f0e;font-weight:700;}
.empsel{background:var(--sf2);border:1px solid var(--bd);border-radius:20px;padding:5px 12px;color:var(--tx);font-size:12px;outline:none;}
.sgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:7px;}
.scard{background:var(--sf);border:1px solid var(--bd);border-radius:12px;padding:12px;}
.sclbl{font-size:10px;color:var(--mu);font-family:'DM Mono',monospace;text-transform:uppercase;letter-spacing:.1em;margin-bottom:3px;}
.scval{font-size:21px;font-family:'DM Mono',monospace;color:var(--ac);font-weight:500;}
.scsub{font-size:11px;color:var(--mu2);margin-top:2px;}
.scorec{background:var(--sf);border:1px solid var(--bd);border-radius:13px;padding:15px;}
.scoreh{display:flex;justify-content:space-between;align-items:center;margin-bottom:11px;}
.sctt{font-size:14px;font-weight:700;}
.sctogg{display:flex;gap:4px;}
.sctb{padding:4px 9px;border-radius:16px;font-size:11px;background:var(--sf2);border:1px solid var(--bd);color:var(--mu);}
.sctb.on{background:var(--ac);border-color:var(--ac);color:#0f0f0e;font-weight:700;}
.scoretrack{height:13px;background:var(--sf3);border-radius:7px;overflow:hidden;}
.scorefill{height:100%;border-radius:7px;transition:width .8s cubic-bezier(.34,1.56,.64,1);background:linear-gradient(90deg,var(--ac2),var(--ac));}
.lboard{display:flex;flex-direction:column;gap:5px;}
.lrow{display:flex;align-items:center;gap:9px;background:var(--sf);border:1px solid var(--bd);border-radius:10px;padding:9px 11px;}
.hhead,.hrow{display:grid;grid-template-columns:60px 1fr 50px 60px 55px 65px;gap:4px;align-items:center;}
.hhead{font-size:10px;color:var(--mu);font-family:'DM Mono',monospace;text-transform:uppercase;letter-spacing:.07em;padding:5px 8px;}
.hrow{background:var(--sf);border:1px solid var(--bd);border-radius:8px;padding:8px 8px;font-size:12px;}
.hrow:hover{background:var(--sf2);}
.ptag{font-size:10px;font-family:'DM Mono',monospace;padding:2px 6px;border-radius:4px;}
.ptag.cash{background:#162016;color:var(--ac2);}
.ptag.card{background:#162030;color:var(--ac3);}
.ptag.mix{background:#201800;color:var(--ac);}
.hour-bar-wrap{display:flex;align-items:flex-end;gap:3px;height:60px;}
.hour-bar{flex:1;border-radius:3px 3px 0 0;background:var(--ac);min-width:8px;transition:height .5s ease;}

/* CORTE */
.corte-section{background:var(--sf);border:1px solid var(--bd);border-radius:13px;padding:15px;display:flex;flex-direction:column;gap:10px;}
.corte-row{display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid var(--bd);}
.corte-row:last-child{border:none;}
.shift-btn{padding:9px 14px;border-radius:10px;font-size:12px;font-weight:700;border:1.5px solid var(--bd);background:var(--sf2);color:var(--tx);}
.shift-btn.on{background:#162016;border-color:var(--ac2);color:var(--ac2);}

/* INVENTORY */
.inv-section{background:var(--sf);border:1px solid var(--bd);border-radius:13px;padding:15px;display:flex;flex-direction:column;gap:10px;}
.inv-title{font-size:14px;font-weight:700;}
.inv-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:7px;}
.inv-card{background:var(--sf2);border:1px solid var(--bd);border-radius:10px;padding:11px;}
.inv-card .ic-label{font-size:10px;color:var(--mu);font-family:'DM Mono',monospace;text-transform:uppercase;letter-spacing:.08em;margin-bottom:3px;}
.inv-card .ic-val{font-size:19px;font-family:'DM Mono',monospace;color:var(--ac);font-weight:500;}
.inv-card .ic-sub{font-size:11px;color:var(--mu2);margin-top:1px;}
.inv-card.warn .ic-val{color:var(--warn);}
.inv-btn{padding:9px 12px;border-radius:9px;font-size:12px;font-weight:600;border:1px solid var(--bd);background:var(--sf2);color:var(--tx);display:flex;align-items:center;gap:6px;}
.inv-btn:hover{border-color:var(--ac);color:var(--ac);}
.inv-btn.danger{border-color:var(--err);color:var(--err);background:#200a0a;}
.inv-btn.success{border-color:var(--ac2);color:var(--ac2);background:#0a200a;}
.bag-row{display:flex;align-items:center;gap:8px;padding:8px 10px;background:var(--sf2);border:1px solid var(--bd);border-radius:8px;}
.bag-dot{width:10px;height:10px;border-radius:50%;background:var(--ac2);flex-shrink:0;}
.bag-dot.closed{background:var(--mu2);}
.sanim{font-size:50px;text-align:center;}
.pending-banner{background:#200a0a;border:1px solid var(--err);border-radius:10px;padding:12px;display:flex;flex-direction:column;gap:6px;}
.pending-banner h3{font-size:13px;color:var(--err);font-weight:700;}

/* TABLE CONFIGURATOR */
.table-canvas{position:relative;background:var(--sf2);border:1px solid var(--bd);border-radius:14px;overflow:hidden;touch-action:none;}
.tc-draggable{position:absolute;cursor:grab;user-select:none;display:flex;flex-direction:column;align-items:center;justify-content:center;border:2px solid var(--bd2);border-radius:10px;background:var(--sf);transition:box-shadow .15s;font-size:11px;font-family:'DM Mono',monospace;}
.tc-draggable:active{cursor:grabbing;box-shadow:0 4px 20px rgba(0,0,0,.5);z-index:100;}
.tc-draggable.occupied{border-color:var(--ac2);background:#0a1a0a;}
.tc-draggable.selected{border-color:var(--ac);box-shadow:0 0 0 2px var(--ac)44;}
.tc-add-btn{position:absolute;bottom:12px;right:12px;background:var(--ac);color:#0f0f0e;border:none;border-radius:10px;padding:8px 14px;font-size:12px;font-weight:700;cursor:pointer;}

/* TELEMETRY */
.tele-wrap{flex:1;overflow-y:auto;padding:12px;background:var(--bg);display:flex;flex-direction:column;gap:10px;}
.tele-header{display:flex;align-items:center;justify-content:space-between;padding:8px 0;flex-shrink:0;}
.tele-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:10px;}
.tele-card{background:var(--sf);border:1px solid var(--bd);border-radius:14px;overflow:hidden;}
.tele-card-header{padding:12px 14px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--bd);}
.tele-store-name{font-size:13px;font-weight:700;}
.tele-status-dot{width:9px;height:9px;border-radius:50%;}
.tele-status-dot.active{background:var(--ac2);animation:pulse 2s infinite;}
.tele-status-dot.idle{background:var(--warn);}
.tele-status-dot.dead{background:var(--err);}
.tele-body{padding:12px 14px;display:flex;flex-direction:column;gap:8px;}
.tele-kpi-row{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;}
.tele-kpi{background:var(--sf2);border-radius:8px;padding:8px;text-align:center;}
.tele-kpi-val{font-family:'DM Mono',monospace;font-size:17px;color:var(--ac);font-weight:500;}
.tele-kpi-lbl{font-size:9px;color:var(--mu);font-family:'DM Mono',monospace;text-transform:uppercase;letter-spacing:.1em;margin-top:2px;}
.tele-shift-row{display:grid;grid-template-columns:1fr 1fr;gap:6px;}
.tele-shift{background:var(--sf2);border-radius:8px;padding:8px 10px;}
.tele-shift-lbl{font-size:9px;color:var(--mu);font-family:'DM Mono',monospace;text-transform:uppercase;letter-spacing:.1em;}
.tele-shift-val{font-family:'DM Mono',monospace;font-size:15px;color:var(--ac2);margin-top:2px;}
.tele-tables-strip{display:flex;gap:3px;flex-wrap:wrap;}
.tele-table-dot{width:16px;height:16px;border-radius:4px;border:1px solid var(--bd2);}
.tele-table-dot.occ{background:var(--ac2);}
.tele-table-dot.alert{background:var(--err);animation:flash 1s infinite;}
.tele-table-dot.empty{background:var(--sf3);}
.tele-last-sale{font-size:11px;color:var(--mu);font-family:'DM Mono',monospace;}
.tele-alert{background:#200a0a;border:1px solid var(--err);border-radius:8px;padding:7px 10px;font-size:11px;color:var(--err);display:flex;align-items:center;gap:6px;}
.tele-alert.warn{background:#1a1000;border-color:var(--warn);color:var(--warn);}
.tele-big-metric{text-align:center;padding:16px 0;}
.tele-big-val{font-family:'DM Mono',monospace;font-size:32px;color:var(--ac);font-weight:500;}
.tele-big-lbl{font-size:10px;color:var(--mu);font-family:'DM Mono',monospace;text-transform:uppercase;letter-spacing:.15em;margin-top:4px;}

/* SCHEDULE */
.sched-wrap{flex:1;overflow-y:auto;background:var(--bg);display:flex;flex-direction:column;gap:0;}
.sched-toolbar{background:var(--sf);border-bottom:1px solid var(--bd);padding:10px 14px;display:flex;align-items:center;gap:10px;flex-shrink:0;flex-wrap:wrap;}
.sched-table{width:100%;border-collapse:collapse;}
.sched-table th{background:var(--sf);border:1px solid var(--bd);padding:8px 6px;font-size:10px;font-family:'DM Mono',monospace;text-transform:uppercase;letter-spacing:.08em;color:var(--mu);text-align:center;position:sticky;top:0;z-index:2;}
.sched-table td{border:1px solid var(--bd);padding:4px;vertical-align:top;min-width:80px;}
.sched-table tr:hover td{background:var(--sf);}
.shift-cell{border-radius:7px;padding:5px 7px;font-size:11px;font-weight:600;cursor:pointer;text-align:center;min-height:38px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;transition:all .15s;}
.shift-cell.turno-a{background:#162016;color:var(--ac2);border:1px solid #2a4a2a;}
.shift-cell.turno-b{background:#162030;color:var(--ac3);border:1px solid #2a3a55;}
.shift-cell.descanso{background:#200a0a;color:var(--err);border:1px solid #3a1010;}
.shift-cell.empty{background:var(--sf2);color:var(--mu);border:1px dashed var(--bd2);}
.shift-cell.turno-m{background:#1a1530;color:#b87ae0;border:1px solid #3a2a55;}
.warn-badge{display:inline-flex;align-items:center;gap:4px;font-size:10px;font-weight:700;padding:3px 8px;border-radius:6px;font-family:'DM Mono',monospace;}
.warn-badge.critical{background:#200a0a;color:var(--err);border:1px solid var(--err);}
.warn-badge.warning{background:#1a1000;color:var(--warn);border:1px solid var(--warn);}
.warn-banner{background:#200a0a;border:1px solid var(--err);border-radius:10px;padding:10px 13px;font-size:12px;display:flex;flex-direction:column;gap:4px;}
.warn-banner.soft{background:#1a1000;border-color:var(--warn);}
.leaderboard-card{background:var(--sf);border:1px solid var(--bd);border-radius:12px;overflow:hidden;}
.lb-header{background:var(--olive2,#3a4a2e);padding:10px 14px;display:flex;justify-content:space-between;align-items:center;}
.lb-row{display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid var(--bd);transition:background .15s;}
.lb-row:last-child{border:none;}
.lb-row:hover{background:var(--sf2);}
.lb-row.warn-row{background:#1a0a00;}
.lb-row.critical-row{background:#1a0000;border-left:3px solid var(--err);}
.lb-rank{font-family:'DM Mono',monospace;font-size:13px;font-weight:700;min-width:24px;text-align:center;}
.lb-avatar{font-size:18px;min-width:24px;text-align:center;}
.lb-name{font-size:13px;font-weight:600;flex:1;}
.lb-stat{font-family:'DM Mono',monospace;font-size:12px;text-align:right;}
.lb-score-bar{height:4px;border-radius:2px;background:var(--sf3);margin-top:2px;overflow:hidden;}
.lb-score-fill{height:100%;border-radius:2px;transition:width .6s ease;}
.shift-cell:hover{filter:brightness(1.2);}
.sched-status{font-size:9px;padding:2px 8px;border-radius:10px;font-family:'DM Mono',monospace;font-weight:700;}
.sched-status.pendiente{background:#1a1000;color:var(--ac);border:1px solid var(--ac)44;}
.sched-status.aprobado{background:#0a200a;color:var(--ac2);border:1px solid var(--ac2)44;}
.sched-status.rechazado{background:#200a0a;color:var(--err);border:1px solid var(--err)44;}
.coverage-bar{height:5px;border-radius:3px;margin-top:3px;}
.coverage-ok{background:var(--ac2);}
.coverage-warn{background:var(--warn);}
.coverage-low{background:var(--err);}
.emp-row-name{font-size:12px;font-weight:700;padding:4px 8px;white-space:nowrap;}
.att-card{background:var(--sf);border:1px solid var(--bd);border-radius:10px;padding:12px;display:flex;flex-direction:column;gap:6px;}
.att-badge{font-size:10px;padding:2px 8px;border-radius:5px;font-family:'DM Mono',monospace;font-weight:700;}
.att-badge.ok{background:#162016;color:var(--ac2);}
.att-badge.late{background:#200a0a;color:var(--err);}
.cash-entry{display:flex;align-items:center;gap:8px;padding:8px 10px;background:var(--sf);border:1px solid var(--bd);border-radius:8px;}
.cash-entry.income{border-left:3px solid var(--ac2);}
.cash-entry.expense{border-left:3px solid var(--err);}
.cash-amount{font-family:'DM Mono',monospace;font-size:14px;font-weight:700;}
.cash-amount.income{color:var(--ac2);}
.cash-amount.expense{color:var(--err);}

/* STORE FILTER */
.store-filter{display:flex;gap:5px;flex-wrap:wrap;}
.sf-btn{padding:5px 12px;border-radius:20px;font-size:11px;font-weight:700;border:1.5px solid var(--bd);background:var(--sf2);color:var(--mu);}
.sf-btn.on{color:#0f0f0e;}

/* MOBILE ORDER WIZARD ─────────────────────────── */
.mobile-wizard{display:none;}
.wiz-head{display:flex;align-items:center;gap:8px;padding:10px 12px;background:var(--sf);border-bottom:1px solid var(--bd);flex-shrink:0;}
.wiz-back{background:var(--sf2);border:1px solid var(--bd);border-radius:8px;padding:8px 12px;font-size:13px;font-weight:600;color:var(--tx);flex-shrink:0;}
.wiz-dots{display:flex;align-items:center;gap:6px;flex:1;justify-content:center;}
.wiz-dot{display:flex;flex-direction:column;align-items:center;gap:2px;opacity:.5;}
.wiz-dot.on,.wiz-dot.done{opacity:1;}
.wiz-dot-n{width:22px;height:22px;border-radius:50%;background:var(--sf3);border:1.5px solid var(--bd2);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--mu);}
.wiz-dot.on .wiz-dot-n{background:var(--ac);border-color:var(--ac);color:#0f0f0e;}
.wiz-dot.done .wiz-dot-n{background:var(--ac2);border-color:var(--ac2);color:#0f0f0e;}
.wiz-dot-l{font-size:9px;color:var(--mu);white-space:nowrap;}
.wiz-title-inline{flex:1;text-align:center;font-size:15px;font-weight:700;color:var(--tx);}
.wiz-cart-fab{background:var(--ac);color:#0f0f0e;border:none;border-radius:20px;padding:9px 14px;font-size:13px;font-weight:700;white-space:nowrap;flex-shrink:0;}
.wiz-body{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;-webkit-overflow-scrolling:touch;}
.wiz-title{font-size:16px;font-weight:700;color:var(--tx);}
.wiz-togo-btn{background:var(--ac2);color:#0f0f0e;border:none;border-radius:14px;padding:22px;font-size:19px;font-weight:800;letter-spacing:.02em;}
.wiz-sep{text-align:center;font-size:12px;color:var(--mu);margin:4px 0;}
.wiz-table-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;}
.wiz-table-card{background:var(--sf);border:2px solid var(--bd);border-radius:14px;padding:16px 10px;display:flex;flex-direction:column;align-items:center;gap:6px;min-height:76px;justify-content:center;color:var(--tx);}
.wiz-table-card.occ{border-color:var(--ac);background:var(--sf2);}
.wtc-name{font-size:15px;font-weight:700;color:var(--tx);}
.wtc-sub{font-size:11px;color:var(--mu);text-align:center;}
.wtc-sub.empty{color:var(--mu2);}
.wiz-cat-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;}
.wiz-cat-card{background:var(--sf);border:2px solid var(--bd);border-radius:16px;padding:24px 12px;display:flex;flex-direction:column;align-items:center;gap:8px;color:var(--tx);}
.wcc-icon{font-size:34px;}
.wcc-name{font-size:13px;font-weight:700;text-align:center;color:var(--tx);}
.wiz-igrid.igrid{grid-template-columns:repeat(2,1fr);padding:0;overflow-y:visible;}
.wiz-more-cat-btn{background:var(--sf2);border:1px solid var(--bd);border-radius:10px;padding:12px;font-size:13px;font-weight:600;color:var(--tx);margin-top:4px;}
.wiz-cart-body{padding:0;}
.wiz-rpanel.rpanel{border:none;width:100%;}
.wiz-add-more-btn{background:var(--sf2);border:1.5px dashed var(--bd2);border-radius:10px;padding:11px;font-size:13px;font-weight:700;color:var(--ac);margin-bottom:6px;}

@media(max-width:1024px){
  .view-tabs,.desktop-tables-view,.cols{display:none!important;}
  .mobile-wizard{display:flex;flex-direction:column;flex:1;overflow:hidden;}
}
`;

// ═══════════════════════════════════════════════════════
//  APP
// ═══════════════════════════════════════════════════════
export default function App() {
  const [store, setStore]       = useState(null);   // selected store
  const [employee, setEmployee] = useState(null);
  const [view, setView]         = useState("pos");
  const [posView, setPosView]   = useState("order"); // order | tables
  const [selTable, setSelTable] = useState(1);
  const [orders, setOrders]     = useState({});
  const [closed, setClosed]     = useState([]);
  const [folios, setFolios]     = useState([]); // control interno de folios (anti-faltantes)
  const [activeCat, setCat]     = useState("CAFÉ");
  const [mobStep, setMobStep]   = useState("table"); // table | category | items | cart (mobile order wizard)
  const [modal, setModal]       = useState(null);
  const [mdata, setMdata]       = useState({});
  const [rFilter, setRFilter]   = useState("day");
  const [rEmp, setREmp]         = useState("all");
  const [rStore, setRStore]     = useState("all");
  const [sFilter, setSFilter]   = useState("day");
  const [time, setTime]         = useState(new Date());
  const [tick2, setTick2]       = useState(0); // timer tick for table timers
  const [tipDismissed, setTipD] = useState(false);
  const [empMode, setEmpMode]   = useState(false);
  const [inventory, setInventory] = useState(DEFAULT_INV);
  const [empCons, setEmpCons]   = useState({});
  const [synced, setSynced]     = useState(false);
  const [loading, setLoading]   = useState(true);
  const [cashLog, setCashLog]   = useState([]);
  const [attendance, setAttendance] = useState({});
  const [corteShift, setCorteShift] = useState("A");
  const [pendingExpenses, setPendingExpenses] = useState([]);
  const [discount, setDiscount] = useState(null);
  const [isPaying, setIsPaying] = useState(false);
  const [tableConfig, setTableConfig] = useState({}); // {storeId: [{id,name,capacity,x,y,shape}]}
  const [telemetryData, setTelemetryData] = useState({}); // {storeId: {orders,closed,...}}
  const [draggingTable, setDraggingTable] = useState(null);
  const [schedules, setSchedules] = useState({}); // {storeId_weekKey: {status, schedule, comment}}
  const [schedWeek, setSchedWeek] = useState(()=>{
    // Get current week Monday in CDMX
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1);
    const mon = new Date(now.setDate(diff));
    return new Intl.DateTimeFormat('en-CA',{timeZone:'America/Mexico_City'}).format(mon);
  });
  const lastPayRef = useRef({});
  const alertedTablesRef = useRef({});
  const tickRef = useRef();
  const tick2Ref = useRef();

  const storeObj = store ? STORES.find(s=>s.id===store) : null;
  const isSuperAdmin = employee?.role === "superadmin";
  const isGerente    = employee?.role === "gerente" || isSuperAdmin;
  const storeEmployees = store ? STORE_EMPLOYEES[store]||[] : [];
  const tableCount = storeObj?.tables || 10;
  const TABLES = (()=>{
    const cfg = tableConfig[store];
    if(cfg && cfg.length > 0) return cfg;
    return Array.from({length:tableCount},(_,i)=>({id:i+1,name:`Mesa ${i+1}`,capacity:4,x:(i%4)*120+20,y:Math.floor(i/4)*120+20,shape:"square"}));
  })();

  // ── LOAD ─────────────────────────────────────────────
  useEffect(()=>{
    if(!store) return;
    const storeQ = `?store_id=eq.${store}`;
    Promise.all([
      sb.select("closed_orders",`?store_id=eq.${store}&order=timestamp.desc&limit=500`),
      sb.select("open_orders",storeQ),
      sb.select("inventory",`?id=eq.${store}`),
      sb.select("emp_consumption"),
      sb.select("folios",`?store_id=eq.${store}&order=folio_num.desc&limit=500`),
    ]).then(([co,oo,inv,ec,fo])=>{
      if(Array.isArray(co)) setClosed(co);
      if(Array.isArray(oo)){const m={};oo.forEach(r=>{m[r.table_id]=r.data;});setOrders(m);}
      if(Array.isArray(inv)&&inv[0]) setInventory({...DEFAULT_INV,...inv[0].data});
      if(Array.isArray(ec)){const m={};ec.forEach(r=>{m[r.key]=r.data;});setEmpCons(m);}
      if(Array.isArray(fo)) setFolios(fo);
      setSynced(true); setLoading(false);
    }).catch(()=>setLoading(false));
    try{
      const cl=JSON.parse(localStorage.getItem(`cheche_cash_${store}`)||"[]");
      const at=JSON.parse(localStorage.getItem(`cheche_att_${store}`)||"{}");
      const pe=JSON.parse(localStorage.getItem(`cheche_pending_${store}`)||"[]");
      setCashLog(cl);setAttendance(at);setPendingExpenses(pe);
    }catch{}
  },[store]);

  // ── SCHEDULE LOADER ──────────────────────────────────────
  useEffect(()=>{
    if(!store||store==='admin-all') return;
    sb.select('schedules', `?store_id=eq.${store}&order=week_start.desc&limit=8`)
      .then(rows=>{
        if(!Array.isArray(rows)) return;
        const m = {};
        rows.forEach(r=>{ m[`${r.store_id}_${r.week_start}`] = r; });
        setSchedules(prev=>({...prev,...m}));
      });
  },[store]);

  const saveSchedule = async(storeId, weekStart, schedData, status='pendiente', comment='') => {
    const key = `${storeId}_${weekStart}`;
    const row = {store_id:storeId, week_start:weekStart, schedule:schedData, status, comment, updated_at:nowISO()};
    setSchedules(prev=>({...prev,[key]:row}));
    await sb.upsert('schedules', row);
  };

  const approveSchedule = async(storeId, weekStart, comment='') => {
    await saveSchedule(storeId, weekStart,
      schedules[`${storeId}_${weekStart}`]?.schedule || {}, 'aprobado', comment);
  };

  const rejectSchedule = async(storeId, weekStart, comment) => {
    await saveSchedule(storeId, weekStart,
      schedules[`${storeId}_${weekStart}`]?.schedule || {}, 'rechazado', comment);
  };

  // ── TABLE CONFIG ─────────────────────────────────────────
  useEffect(()=>{
    if(!store) return;
    const saved = localStorage.getItem(`cheche_tables_${store}`);
    if(saved) { try { setTableConfig(prev=>({...prev,[store]:JSON.parse(saved)})); } catch {} }
  },[store]);

  const saveTableConfig = (storeId, tables) => {
    setTableConfig(prev=>({...prev,[storeId]:tables}));
    localStorage.setItem(`cheche_tables_${storeId}`, JSON.stringify(tables));
    // Also sync to Supabase
    sb.upsert("stores", {id:storeId, tables_config:tables, updated_at:nowISO()}).catch(()=>{});
  };

  const getStoreTables = (storeId) => {
    const cfg = tableConfig[storeId];
    if(cfg && cfg.length > 0) return cfg;
    // Default tables if no config
    const storeData = STORES.find(s=>s.id===storeId);
    const count = storeData?.tables || 10;
    return Array.from({length:count},(_,i)=>({
      id:i+1, name:`Mesa ${i+1}`, capacity:4,
      x: (i%4) * 120 + 20, y: Math.floor(i/4) * 120 + 20,
      shape:"square"
    }));
  };

  // ── TELEMETRY POLLER (for superadmin global view) ─────────
  useEffect(()=>{
    if(!isSuperAdmin) return;
    const pollTelemetry = async () => {
      try {
        const [allOrders, allOpen] = await Promise.all([
          sb.select("closed_orders","?order=timestamp.desc&limit=1000"),
          sb.select("open_orders"),
        ]);
        const today = dayKey();
        const telemetry = {};
        STORES.forEach(s=>{
          const storeOrds = Array.isArray(allOrders) ? allOrders.filter(o=>o.store_id===s.id) : [];
          const todayOrds = storeOrds.filter(o=>dayKey(new Date(fixTS(o.timestamp)))===today);
          const openOrdsList = Array.isArray(allOpen) ? allOpen.filter(o=>o.store_id===s.id) : [];
          const occupiedTables = openOrdsList.filter(o=>o.data?.items?.length>0);
          const amOrds = todayOrds.filter(o=>localHour(new Date(fixTS(o.timestamp)))<14);
          const pmOrds = todayOrds.filter(o=>localHour(new Date(fixTS(o.timestamp)))>=14);
          telemetry[s.id] = {
            todaySales: todayOrds.reduce((sum,o)=>sum+o.subtotal,0),
            todayCount: todayOrds.length,
            amSales: amOrds.reduce((sum,o)=>sum+o.subtotal,0),
            pmSales: pmOrds.reduce((sum,o)=>sum+o.subtotal,0),
            occupiedTables: occupiedTables.length,
            totalTables: s.tables,
            lastSale: todayOrds[0] ? new Date(fixTS(todayOrds[0].timestamp)) : null,
            avgTicket: todayOrds.length ? Math.round(todayOrds.reduce((s,o)=>s+o.subtotal,0)/todayOrds.length) : 0,
            openOrders: openOrdsList.map(o=>o.data),
          };
        });
        setTelemetryData(telemetry);
      } catch {}
    };
    pollTelemetry();
    const id = setInterval(pollTelemetry, 10000);
    return ()=>clearInterval(id);
  },[isSuperAdmin]);

  // ── POLLING ───────────────────────────────────────────
  useEffect(()=>{
    if(!store) return;
    const poll=async()=>{
      try{
        const[co,oo,inv]=await Promise.all([
          sb.select("closed_orders",`?store_id=eq.${store}&order=timestamp.desc&limit=500`),
          sb.select("open_orders",`?store_id=eq.${store}`),
          sb.select("inventory",`?id=eq.${store}`),
        ]);
        if(Array.isArray(co)) setClosed(co);
        if(Array.isArray(oo)){const m={};oo.forEach(r=>{m[r.table_id]=r.data;});setOrders(prev=>({...m,...Object.fromEntries(Object.entries(prev).filter(([k])=>prev[k]?.items?.length>0&&!m[k]))}));}
        if(Array.isArray(inv)&&inv[0]) setInventory({...DEFAULT_INV,...inv[0].data});
        setSynced(true);
      }catch{setSynced(false);}
    };
    const id=setInterval(poll,5000);
    return()=>clearInterval(id);
  },[store]);

  useEffect(()=>{tickRef.current=setInterval(()=>setTime(new Date()),1000);return()=>clearInterval(tickRef.current);},[]);
  // Timer tick for table timers (every 10s)
  useEffect(()=>{tick2Ref.current=setInterval(()=>setTick2(t=>t+1),10000);return()=>clearInterval(tick2Ref.current);},[]);

  useEffect(()=>{if(store)localStorage.setItem(`cheche_cash_${store}`,JSON.stringify(cashLog));},[cashLog,store]);
  useEffect(()=>{if(store)localStorage.setItem(`cheche_att_${store}`,JSON.stringify(attendance));},[attendance,store]);
  useEffect(()=>{if(store)localStorage.setItem(`cheche_pending_${store}`,JSON.stringify(pendingExpenses));},[pendingExpenses,store]);

  // ── TABLE ALERT BEEPS ─────────────────────────────────
  useEffect(()=>{
    if(!store) return;
    Object.entries(orders).forEach(([tableId, order])=>{
      if(!order?.seatedAt) return;
      const status = getTableStatus(order.seatedAt, order.lastOrderAt);
      const key = `${tableId}_${status?.level}`;
      if(status?.level==="drinks" && !alertedTablesRef.current[key]){
        alertedTablesRef.current[key]=true;
        alertBeep();
      }
      if(status?.level==="upsell" && !alertedTablesRef.current[key]){
        alertedTablesRef.current[key]=true;
        urgentBeep();
      }
    });
  },[tick2, orders]);

  const EMPTY={items:[],comensales:1,note:"",mode:"salon"};
  const cur = orders[selTable]||EMPTY;
  const subtotalBeforeDisc=(cur.items||[]).reduce((s,i)=>s+i.price*i.qty,0);
  const discAmount=discount?Math.round(subtotalBeforeDisc*discount.pct):0;
  const total=subtotalBeforeDisc-discAmount;
  const tipAlert=!tipDismissed?getUpsell(cur.items):null;

  const syncOpenOrder=async(tId,data)=>sb.upsert("open_orders",{table_id:tId,store_id:store,data,updated_at:nowISO()});
  const upd=(tId,patch)=>{
    const o={...EMPTY,...(orders[tId]||{}),...patch};
    setOrders(p=>({...p,[tId]:o}));
    syncOpenOrder(tId,o);
  };

  // Seat a table (start timer)
  const seatTable=(tId)=>{
    const existing=orders[tId]||EMPTY;
    if(!existing.seatedAt){
      upd(tId,{seatedAt:nowISO()});
    }
  };

  const syncInventory=async(ni)=>{setInventory(ni);await sb.upsert("inventory",{id:store,store_id:store,data:ni,updated_at:nowISO()});};
  const addCoffeeBag=()=>syncInventory({...inventory,coffeBags:[...(inventory.coffeBags||[]),{id:`bag_${Date.now()}`,openedAt:nowISO(),shotsUsed:0,closed:false}]});
  const closeCoffeeBag=(id)=>syncInventory({...inventory,coffeBags:(inventory.coffeBags||[]).map(b=>b.id===id?{...b,closed:true,closedAt:nowISO()}:b)});
  const addBread=(type,qty=1)=>{const t=dayKey();const b={...(inventory.bread||{})};if(!b[t])b[t]={arrived:0,waste:0,sold:0};b[t][type]=(b[t][type]||0)+qty;syncInventory({...inventory,bread:b});};
  const addMilk=(milkType,liters)=>{const milk={...(inventory.milk||{entera:0,deslactosada:0,almendra:0,avena:0})};milk[milkType]=(milk[milkType]||0)+liters;const total=Object.values(milk).reduce((s,v)=>s+v,0);syncInventory({...inventory,milk,milkLiters:total});};

  const logConsumption=(items,mode)=>{
    let sh=0,milk=0;const dp={};
    items.forEach(i=>{const q=i.qty;sh+=(ESPRESSO_SHOTS[i.id]||0)*q;if(i.hasMilk||i.milk)milk+=MILK_L*q;if(mode==="takeout"){const p=i.isFlatWhite&&!i.isCold?DISPOSABLE_PROFILES.hot_8oz:i.isCold?DISPOSABLE_PROFILES.cold_16oz:i.size==="mediano"?DISPOSABLE_PROFILES.hot_12oz:DISPOSABLE_PROFILES.hot_16oz;Object.entries(p).forEach(([k,v])=>{dp[k]=(dp[k]||0)+v*q;});}});
    const bags=[...(inventory.coffeBags||[])];let rem=sh;for(let i=bags.length-1;i>=0&&rem>0;i--){if(!bags[i].closed){bags[i]={...bags[i],shotsUsed:bags[i].shotsUsed+rem};rem=0;}}
    const milkObj={...(inventory.milk||{entera:10,deslactosada:5,almendra:3,avena:3})};
    milkObj.entera=Math.max(0,(milkObj.entera||0)-milk*0.6);
    milkObj.deslactosada=Math.max(0,(milkObj.deslactosada||0)-milk*0.1);
    milkObj.almendra=Math.max(0,(milkObj.almendra||0)-milk*0.15);
    milkObj.avena=Math.max(0,(milkObj.avena||0)-milk*0.15);
    const totalMilk=Object.values(milkObj).reduce((s,v)=>s+v,0);
    const nd={...(inventory.disposables||{})};Object.entries(dp).forEach(([k,v])=>{nd[k]={...(nd[k]||{stock:0,used:0}),used:(nd[k]?.used||0)+v};});
    const log={ts:nowISO(),day:dayKey(),items:items.map(i=>({id:i.id,name:i.name,qty:i.qty})),shotsUsed:sh,milkUsed:milk.toFixed(3),disposables:dp};
    syncInventory({...inventory,coffeBags:bags,milk:milkObj,milkLiters:totalMilk,disposables:nd,consumptionLog:[log,...(inventory.consumptionLog||[]).slice(0,199)]});
  };

  // ── FOLIOS (control interno anti-faltantes) ─────────────
  // Cada cuenta nueva abre un folio secuencial en Supabase. Se cierra al
  // cobrar, se cancela si se limpia sin cobrar. El conteo de folios
  // cancelados/abandonados es visible solo para gerentes/admins.
  const openFolio=async(tId,modeNow)=>{
    try{
      const row=await sb.insert("folios",{
        store_id:store,table_num:tId,mode:modeNow||"salon",
        employee_id:employee?.id,employee_name:employee?.name,status:"abierto",
      });
      const rec=Array.isArray(row)?row[0]:row;
      if(rec?.id){
        // Merge sobre el estado MÁS RECIENTE (no una referencia vieja de orders),
        // para no pisar items que se hayan agregado mientras el insert viajaba.
        setOrders(prev=>{
          const o={...EMPTY,...(prev[tId]||{}),folioId:rec.id,folioNum:rec.folio_num};
          syncOpenOrder(tId,o);
          return {...prev,[tId]:o};
        });
        setFolios(p=>[rec,...p]);
      }
    }catch{}
  };
  const cancelFolio=async(folioId,itemsSnapshot)=>{
    if(!folioId)return;
    const total=(itemsSnapshot||[]).reduce((s,i)=>s+i.price*i.qty,0);
    setFolios(p=>p.map(f=>f.id===folioId?{...f,status:"cancelado",items:itemsSnapshot||[],total,closed_at:nowISO()}:f));
    try{
      await sb.update("folios",`?id=eq.${folioId}`,{
        status:"cancelado",items:itemsSnapshot||[],total,closed_at:nowISO(),
      });
    }catch{}
  };
  const closeFolio=async(folioId,closedOrderId,orderTotal)=>{
    if(!folioId)return;
    setFolios(p=>p.map(f=>f.id===folioId?{...f,status:"cerrado",closed_order_id:closedOrderId,total:orderTotal,closed_at:nowISO()}:f));
    try{
      await sb.update("folios",`?id=eq.${folioId}`,{
        status:"cerrado",closed_order_id:closedOrderId,total:orderTotal,closed_at:nowISO(),
      });
    }catch{}
  };
  // Limpiar una mesa/cuenta: si tenía folio abierto con items, se marca cancelado (queda registrado)
  const clearOrder=(tId)=>{
    const o=orders[tId]||EMPTY;
    if(o.folioId&&o.items&&o.items.length>0) cancelFolio(o.folioId,o.items);
    upd(tId,{items:[],seatedAt:null,lastOrderAt:null,folioId:null,folioNum:null});
  };

  const addItem=(item)=>{
    setTipD(false);
    const c=orders[selTable]||EMPTY;const items=c.items||[];
    const idx=items.findIndex(i=>i.id===item.id&&i.size===item.size&&i.milk===item.milk&&JSON.stringify(i.extras)===JSON.stringify(item.extras));
    const ni=idx>=0?items.map((it,j)=>j===idx?{...it,qty:it.qty+1}:it):[...items,{...item,qty:1,lineId:`${item.id}_${Date.now()}`}];
    // Auto-seat table when first item added
    const isNewFolio=!c.seatedAt;
    const patch={items:ni};
    if(isNewFolio) patch.seatedAt=nowISO();
    patch.lastOrderAt=nowISO();
    upd(selTable,patch);
    if(isNewFolio) openFolio(selTable,c.mode||"salon");
  };

  const removeItem=(lid)=>upd(selTable,{items:(cur.items||[]).filter(i=>i.lineId!==lid)});
  const changeQty=(lid,d)=>upd(selTable,{items:(cur.items||[]).map(i=>i.lineId===lid?{...i,qty:i.qty+d}:i).filter(i=>i.qty>0)});

  const handleMenuClick=(item)=>{
    if(!employee)return;
    if(item.hasSizes||item.hasMilk||item.hasFoodExtras||item.hasCocktailExtras){setMdata({item});setModal("customize");}
    else addItem({...item,price:item.price||item.medPrice,size:null,milk:null,extras:[]});
  };

  const handlePay=async(method,cashAmt,cardAmt,tipAmt)=>{
    if(isPaying)return;
    const lastPay=lastPayRef.current[selTable];
    if(lastPay&&Date.now()-lastPay<8000)return;
    if(!cur.items||cur.items.length===0)return;
    setIsPaying(true);
    lastPayRef.current[selTable]=Date.now();
    setOrders(p=>{const n={...p};delete n[selTable];return n;});
    setModal(null);
    try{
      logConsumption(cur.items||[],cur.mode);
      const breadSold=(cur.items||[]).filter(i=>i.station==="barra"&&i.id.startsWith("p")).reduce((s,i)=>s+i.qty,0);
      if(breadSold>0){const t=dayKey();const b={...(inventory.bread||{})};if(!b[t])b[t]={arrived:0,waste:0,sold:0};b[t].sold=(b[t].sold||0)+breadSold;syncInventory({...inventory,bread:b});}
      const o={id:`ord_${Date.now()}`,table_num:selTable,store_id:store,store_name:storeObj?.name||"",employee:employee.name,employee_id:employee.id,items:[...cur.items],comensales:cur.comensales,mode:cur.mode,subtotal:total,subtotal_before_disc:subtotalBeforeDisc,discount_label:discount?.label||null,discount_pct:discount?.pct||0,method,cash_amt:cashAmt||0,card_amt:cardAmt||0,tip:tipAmt||0,timestamp:nowISO()};
      await sb.insert("closed_orders",o);
      await sb.delete("open_orders",`?table_id=eq.${selTable}&store_id=eq.${store}`);
      if(cur.folioId) closeFolio(cur.folioId,o.id,total);
      // Clear alert tracking for this table
      Object.keys(alertedTablesRef.current).forEach(k=>{if(k.startsWith(`${selTable}_`))delete alertedTablesRef.current[k];});
      setDiscount(null);
      setClosed(p=>[o,...p]);
      setModal("success");setMdata({order:o});
    }catch(err){
      setOrders(p=>({...p,[selTable]:cur}));
      alert("Error al procesar el pago. Intenta de nuevo.");
      delete lastPayRef.current[selTable];
    }finally{setIsPaying(false);}
  };

  const addCashEntry=(type,amount,description,photo="")=>{
    const entry={id:`cash_${Date.now()}`,type,amount,description,photo,employee:employee.name,employeeId:employee.id,timestamp:nowISO(),approved:type==="income"||amount<=CASH_LIMIT,pendingApproval:type==="expense"&&amount>CASH_LIMIT};
    if(entry.pendingApproval) setPendingExpenses(p=>[...p,entry]);
    else setCashLog(p=>[entry,...p]);
    return entry;
  };

  const approveExpense=(id)=>{
    const exp=pendingExpenses.find(e=>e.id===id);
    if(exp){setCashLog(p=>[{...exp,approved:true,approvedBy:employee.name,approvedAt:nowISO()},...p]);setPendingExpenses(p=>p.filter(e=>e.id!==id));}
  };

  const checkIn=(shiftId)=>{
    const shift=SHIFTS.find(s=>s.id===shiftId);
    const key=`${employee.id}_${dayKey()}`;
    const now=new Date();
    const isLate=checkLate(shift.time,now.toISOString());
    const entry={shift:shiftId,shiftName:shift.name,time:now.toISOString(),late:isLate};
    const cur2=attendance[key]||[];
    setAttendance({...attendance,[key]:[...cur2.filter(e=>e.shift!==shiftId),entry]});
    return isLate;
  };

  // ── CSV EXPORT ───────────────────────────────────────────
  const exportCSV = (period) => {
    const ords = filterO("all", period, isSuperAdmin ? rStore : store||"all");
    if(ords.length===0){alert("No hay ventas en este período");return;}
    const headers = ["Fecha","Hora","Tienda","Mesa","Empleado","Items","Subtotal","Descuento","Total","Método","Efectivo","Tarjeta","Propina","Modo"];
    const rows = ords.map(o=>{
      const d = new Date(fixTS(o.timestamp));
      const fecha = dayKey(d);
      const hora = d.toLocaleTimeString("es-MX",{timeZone:TZ,hour:"2-digit",minute:"2-digit"});
      const items = (o.items||[]).map(i=>`${i.qty}x ${i.name}`).join(" | ");
      const disc = (o.subtotal_before_disc||o.subtotal) - o.subtotal;
      return [
        fecha, hora,
        o.store_name||o.store_id||"",
        `Mesa ${o.table_num}`,
        o.employee||"",
        `"${items}"`,
        (o.subtotal_before_disc||o.subtotal).toFixed(0),
        disc.toFixed(0),
        o.subtotal.toFixed(0),
        o.method||"",
        (o.cash_amt||0).toFixed(0),
        (o.card_amt||0).toFixed(0),
        (o.tip||0).toFixed(0),
        o.mode==="takeout"?"Para llevar":"Salón",
      ].join(",");
    });
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], {type:"text/csv;charset=utf-8;"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const periodLabel = period==="day"?"hoy":period==="week"?"semana":"mes";
    a.href=url; a.download=`cheche-ventas-${periodLabel}-${today}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const filterO=(empF,perF,storeF="all")=>{
    const d=new Date();
    return closed.filter(o=>{
      const tsStr=fixTS(o.timestamp);
      const od=new Date(tsStr);
      if(isNaN(od.getTime()))return false;
      const eOk=empF==="all"||o.employee_id===parseInt(empF);
      const sOk=storeF==="all"||o.store_id===storeF||(isSuperAdmin&&storeF==="all");
      let pOk=true;
      if(perF==="day")  pOk=dayKey(od)===dayKey(d);
      if(perF==="week") pOk=weekKey(od)===weekKey(d);
      if(perF==="month")pOk=monthKey(od)===monthKey(d);
      if(perF==="year") pOk=od.getFullYear()===d.getFullYear();
      return eOk&&pOk&&sOk;
    });
  };

  const fOrds=filterO(rEmp,rFilter,isSuperAdmin?rStore:store||"all");
  const fRev=fOrds.reduce((s,o)=>s+o.subtotal,0);
  const fCov=fOrds.reduce((s,o)=>s+o.comensales,0);
  const fTips=fOrds.reduce((s,o)=>s+(o.tip||0),0);
  const myOrds=employee?filterO(String(employee.id),"day"):[];
  const mySales=myOrds.reduce((s,o)=>s+o.subtotal,0);
  const myTips=myOrds.reduce((s,o)=>s+(o.tip||0),0);
  const storeGoal = store && STORE_GOALS[store] ? STORE_GOALS[store] : {daily:DAILY_GOAL,weekly:WEEKLY_GOAL,monthly:MONTHLY_GOAL};
  // Per-employee daily goal = store daily / number of active employees
  const activeEmpCount = Math.max((STORE_EMPLOYEES[store]||[]).length, 1);
  const empDailyGoal = Math.round(storeGoal.daily / activeEmpCount);
  const myPct=Math.min(mySales/empDailyGoal,1);
  const lvl=getLevel(mySales);
  const sGoal=sFilter==="day"?storeGoal.daily:sFilter==="week"?storeGoal.weekly:storeGoal.monthly;
  const sOrds=filterO("all",sFilter);
  const sRev=sOrds.reduce((s,o)=>s+o.subtotal,0);
  const sPct=Math.min(sRev/sGoal,1);
  const groupBonus=calcGroupBonus(sPct);
  const openBag=(inventory.coffeBags||[]).find(b=>!b.closed);
  const shotsRem=openBag?Math.max(0,47-openBag.shotsUsed):0;
  const today=dayKey();
  const todayBread=(inventory.bread||{})[today]||{arrived:0,waste:0,sold:0};
  const todayEmpCons=employee?((empCons[`${employee.id}_${today}`])||{count:0,items:[],charges:0}):{count:0,items:[],charges:0};
  const myAttToday=attendance[`${employee?.id}_${today}`]||[];
  const todayOrds=closed.filter(o=>dayKey(new Date(fixTS(o.timestamp)))===today);
  // Shift boundaries from actual clock-in times
  const getShiftBoundary = (shiftId) => {
    // Find all clock-ins for this shift today across all employees
    const times = Object.entries(attendance)
      .filter(([key]) => key.endsWith(`_${today}`))
      .flatMap(([,entries]) => entries.filter(e=>e.shift===shiftId).map(e=>new Date(e.time)));
    if(times.length===0) {
      // Fallback to default times if no clock-ins
      return shiftId==="A" ? {start:7, end:14} : {start:14, end:24};
    }
    const earliest = Math.min(...times.map(t=>localHour(t)));
    return shiftId==="A" ? {start:earliest, end:14} : {start:earliest, end:24};
  };
  const shiftBound = getShiftBoundary(corteShift);
  const shiftOrds=todayOrds.filter(o=>{
    const h=localHour(new Date(fixTS(o.timestamp)));
    return corteShift==="A" ? h>=shiftBound.start && h<14 : h>=14;
  });
  const shiftCash=shiftOrds.filter(o=>o.method==="cash"||o.method==="mix").reduce((s,o)=>s+(o.cash_amt||0),0);
  const shiftCard=shiftOrds.filter(o=>o.method==="card"||o.method==="mix").reduce((s,o)=>s+(o.card_amt||0),0);
  const shiftTips=shiftOrds.reduce((s,o)=>s+(o.tip||0),0);
  const todayCashIn=cashLog.filter(e=>e.type==="income"&&dayKey(new Date(e.timestamp))===today).reduce((s,e)=>s+e.amount,0);
  const todayCashOut=cashLog.filter(e=>e.type==="expense"&&dayKey(new Date(e.timestamp))===today&&e.approved).reduce((s,e)=>s+e.amount,0);
  const hourly=Array(24).fill(0);fOrds.forEach(o=>{hourly[localHour(new Date(fixTS(o.timestamp)))]+=o.subtotal;});
  const maxH=Math.max(...hourly,1);

  // ── STORE SELECT SCREEN ───────────────────────────────
  if(!store) return (
    <>
      <style>{css}</style>
      <div className="store-select-wrap">
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
        <img src={CHECHE_LOGO} alt="Che'Che' Café" style={{width:160,height:"auto",opacity:.95}}/>
        <span className="subttl">selecciona tu tienda</span>
      </div>
        <div className="store-grid">
          {STORES.map(s=>(
            <button key={s.id} className="store-card" style={{borderColor:s.color+'44'}} onClick={()=>setStore(s.id)}>
              <span className="sc-icon">☕</span>
              <span className="sc-name">{s.name}</span>
              <span className="sc-tables">Sucursal</span>
            </button>
          ))}
          {/* Super admin option */}
          <button className="store-card" style={{borderColor:"#c8a96e44"}} onClick={()=>{setStore("admin-all");setEmployee(GLOBAL_ADMINS[0]);}}>
            <span className="sc-icon">📊</span>
            <span className="sc-name">Vista Global</span>
            <span className="sc-tables">Todas las tiendas</span>
          </button>
        </div>
      </div>
    </>
  );

  // ── LOGIN SCREEN ──────────────────────────────────────
  if(!employee) return (
    <LoginScreen
      store={storeObj}
      employees={[...GLOBAL_ADMINS,...(STORE_EMPLOYEES[store]||[])]}
      onLogin={setEmployee}
      onBack={()=>{setStore(null);setLoading(true);}}/>
  );

  if(loading) return(
    <>
      <style>{css}</style>
      <div style={{minHeight:"100dvh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,background:"var(--bg)"}}>
        <span style={{fontFamily:"DM Mono,monospace",fontSize:24,letterSpacing:".2em",color:"var(--ac)"}}>che'che'</span>
        <div style={{width:40,height:40,border:"3px solid var(--bd)",borderTop:"3px solid var(--ac)",borderRadius:"50%",animation:"spin 1s linear infinite"}}/>
        <style>{`@keyframes spin{to{transform:rotate(360deg);}}`}</style>
        <span style={{fontSize:12,color:"var(--mu)",fontFamily:"DM Mono,monospace"}}>Conectando…</span>
      </div>
    </>
  );

  return(
    <>
      <style>{css}</style>
      <div className="shell">
        {/* TOPBAR */}
        <div className="topbar">
          <img src={CHECHE_LOGO} alt="che'che'" style={{height:22,width:"auto",opacity:.85}}/>
          <span className="store-pill" style={{background:storeObj?.color+'22',color:storeObj?.color,border:`1px solid ${storeObj?.color}44`}}>
            {storeObj?.short||"Global"}
          </span>
          <div className="tsep"/>
          <div className={`sync-dot ${synced?"":"off"}`}/>
          <span style={{fontSize:12,color:"var(--mu)",maxWidth:100,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
            👤 {employee.name.split(" ")[0]}
          </span>
          <div className="tsp"/>
          <button className={`tbtn ${view==="pos"?"on":""}`} onClick={()=>setView("pos")}>POS</button>
          {(employee.role==="admin"||isSuperAdmin)&&<>
            <button className={`tbtn ${view==="reports"?"on":""}`} onClick={()=>setView("reports")}>Reportes</button>
            <button className={`tbtn ${view==="corte"?"on":""}`} onClick={()=>setView("corte")}>Corte</button>
            <button className={`tbtn ${view==="inventory"?"on":""}`} onClick={()=>setView("inventory")}>Inventario</button>
          </>}
          {isGerente&&!isSuperAdmin&&<>
            <button className={`tbtn ${view==="corte"?"on":""}`} onClick={()=>setView("corte")}>Corte</button>
            <button className={`tbtn ${view==="schedule"?"on":""}`} onClick={()=>setView("schedule")}>📅 Horarios</button>
            <button className={`tbtn ${view==="tables-config"?"on":""}`} onClick={()=>setView("tables-config")}>🪑 Mesas</button>
          </>}
          {isSuperAdmin&&<>
            <button className={`tbtn ${view==="telemetry"?"on":""}`} onClick={()=>setView("telemetry")}>📡 Telemetría</button>
            <button className={`tbtn ${view==="schedule"?"on":""}`} onClick={()=>setView("schedule")}>📅 Horarios</button>
            <button className={`tbtn ${view==="tables-config"?"on":""}`} onClick={()=>setView("tables-config")}>🪑 Mesas</button>
          </>}
          {employee.role==="mesero"&&<button className={`tbtn ${view==="corte"?"on":""}`} onClick={()=>setView("corte")}>Corte</button>}
          <button className={`tbtn ${empMode?"on":""}`} style={empMode?{background:"#1a2e1a",borderColor:"var(--ac2)",color:"var(--ac2)"}:{}} onClick={()=>setEmpMode(e=>!e)}>☕ Mi Bebida</button>
          {pendingExpenses.length>0&&isSuperAdmin&&(
            <button className="tbtn" style={{background:"#200a0a",borderColor:"var(--err)",color:"var(--err)"}} onClick={()=>setModal("pending")}>⚠️ {pendingExpenses.length}</button>
          )}
          <span className="ttime">{time.toLocaleTimeString("es-MX",{hour:"2-digit",minute:"2-digit"})}</span>
          <button className="tbtn" onClick={()=>{setEmployee(null);setStore(null);setLoading(true);}}>Salir</button>
        </div>

        {/* POS */}
        {view==="pos"&&(
          <>
            {/* POS sub-tabs */}
            <div className="view-tabs">
              <button className={`vtab ${posView==="order"?"on":""}`} onClick={()=>setPosView("order")}>📋 Orden</button>
              <button className={`vtab ${posView==="tables"?"on":""}`} onClick={()=>setPosView("tables")}>
                🗺 Mesas
                {Object.values(orders).some(o=>{const s=getTableStatus(o?.seatedAt,o?.lastOrderAt);return s&&s.level!=="ok";})&&
                  <span style={{marginLeft:5,background:"var(--err)",color:"#fff",borderRadius:10,padding:"0 5px",fontSize:10}}>!</span>
                }
              </button>
            </div>

            {posView==="tables" ? (
              // ── TABLE MAP VIEW ──────────────────────────────
              <div className="desktop-tables-view" style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>
                {/* Global coach alerts */}
                <div style={{padding:"6px 12px",display:"flex",flexDirection:"column",gap:4,background:"var(--sf)",borderBottom:"1px solid var(--bd)",flexShrink:0}}>
                  {Object.entries(orders).map(([tId,order])=>{
                    if(!order?.seatedAt)return null;
                    const s=getTableStatus(order.seatedAt,order.lastOrderAt);
                    if(!s||s.level==="ok")return null;
                    return(
                      <div key={tId} className={`coach-banner ${s.level==="upsell"?"urgent":""}`}>
                        <span style={{fontWeight:700}}>Mesa {tId}:</span>
                        <span style={{flex:1}}>{s.msg}</span>
                        <span style={{fontFamily:"DM Mono",fontSize:10}}>{formatElapsed(order.seatedAt)}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="table-view-grid">
                  {TABLES.map(t=>{
                    const o=orders[t.id];
                    const items=o?.items||[];
                    const occ=items.length>0;
                    const status=occ?getTableStatus(o?.seatedAt,o?.lastOrderAt):null;
                    const elapsed=occ?formatElapsed(o?.seatedAt):"";
                    const pct=occ&&o?.seatedAt?Math.min((Date.now()-new Date(o.seatedAt).getTime())/TABLE_UPSELL_ALERT_MS,1):0;
                    return(
                      <div key={t.id}
                        className={`table-card ${!occ?"empty":"occupied"} ${status?`alert-${status.level}`:""}`}
                        style={status?{borderColor:status.color}:{}}
                        onClick={()=>{setSelTable(t.id);setPosView("order");}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                          <span className="tc-name">{t.name}</span>
                          {occ&&<span className={`tc-mode ${o.mode==="takeout"?"takeout":"salon"}`}>{o.mode==="takeout"?"🛍":"🪑"}</span>}
                        </div>
                        {occ?(
                          <>
                            <span className="tc-timer" style={{color:status?.color||"var(--ac2)"}}>{elapsed}</span>
                            {status?.msg&&<span className="tc-status" style={{background:status.color+'22',color:status.color}}>{status.msg}</span>}
                            <span className="tc-items">{items.reduce((s,i)=>s+i.qty,0)} items</span>
                            <span className="tc-total">{fmt(items.reduce((s,i)=>s+i.price*i.qty,0))}</span>
                            <div className="tc-bar" style={{width:`${pct*100}%`,background:status?.color||"var(--ac2)"}}/>
                          </>
                        ):(
                          <span style={{fontSize:11,color:"var(--mu)"}}>Vacía — toca para abrir</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              // ── ORDER VIEW ──────────────────────────────────
              <div className="cols">
                {/* LEFT */}
                <div className="lpanel">
                  <div className="ptitle">Mesas</div>
                  {TABLES.map(t=>{
                    const o=orders[t.id];const items=o?.items||[];const occ=items.length>0;
                    const status=occ?getTableStatus(o?.seatedAt,o?.lastOrderAt):null;
                    return(
                      <button key={t.id} className={`tbtn2 ${selTable===t.id?"on":""} ${occ?"occ":""} ${status?`alert-${status.level}`:""}`}
                        style={status?{borderColor:status.color}:{}}
                        onClick={()=>setSelTable(t.id)}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                          <span className="tname">{t.name}</span>
                          {occ&&<span style={{fontSize:9,fontFamily:"DM Mono",color:"var(--mu)"}}>{formatElapsed(o?.seatedAt)}</span>}
                        </div>
                        <span className="tsub2">{occ?`${items.reduce((s,i)=>s+i.qty,0)} · ${fmt(items.reduce((s,i)=>s+i.price*i.qty,0))}`:"vacía"}</span>
                        {occ&&<div className="timer-bar" style={{width:`${Math.min((Date.now()-new Date(o?.seatedAt||Date.now()).getTime())/TABLE_UPSELL_ALERT_MS,1)*100}%`,background:status?.color||"var(--ac2)"}}/>}
                      </button>
                    );
                  })}
                  <div style={{marginTop:6}}>
                    <div className="ptitle">Personas</div>
                    <div className="comr">
                      <span>👥</span>
                      <button className="cb" onClick={()=>upd(selTable,{comensales:Math.max(1,(cur.comensales||1)-1)})}>−</button>
                      <span className="cv">{cur.comensales||1}</span>
                      <button className="cb" onClick={()=>upd(selTable,{comensales:(cur.comensales||1)+1})}>+</button>
                    </div>
                    <div style={{height:6}}/>
                    <div className="ptitle">Tipo de servicio</div>
                    <div className="mode-toggle">
                      <button className={`mode-btn salon ${cur.mode==="salon"?"on":""}`} onClick={()=>upd(selTable,{mode:"salon"})}>
                        <span className="mode-icon">🪑</span><span className="mode-label">SALÓN</span>
                      </button>
                      <button className={`mode-btn takeout ${cur.mode==="takeout"?"on":""}`} onClick={()=>upd(selTable,{mode:"takeout"})}>
                        <span className="mode-icon">🛍</span><span className="mode-label">LLEVAR</span>
                      </button>
                    </div>
                    <div style={{height:6}}/>
                    <div className="ptitle">Barista</div>
                    <div style={{display:"flex",flexDirection:"column",gap:4}}>
                      {!openBag
                        ?<button className="ba-btn success" onClick={addCoffeeBag}>☕ Abrir bolsa de café</button>
                        :<button className="ba-btn warn" onClick={()=>setModal("close_bag")}>⚠️ Cerrar bolsa ({shotsRem} shots)</button>
                      }
                      <button className="ba-btn" onClick={()=>setModal("bread_entry")}>🥐 Registrar pan</button>
                      <button className="ba-btn" onClick={()=>setModal("milk_entry")}>🥛 Registrar leche</button>
                      <button className="ba-btn" onClick={()=>{setModal("cash_entry");setMdata({});}}>💰 Ingreso/Egreso</button>
                      <button className="ba-btn" onClick={()=>setModal("checkin")}>🕐 Check-in turno</button>
                    </div>
                    {shotsRem<ALERT_SHOTS&&shotsRem>=0&&openBag&&(
                      <div style={{background:"#200a0a",border:"1px solid var(--err)",borderRadius:8,padding:"7px 10px",fontSize:11,color:"var(--err)",display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:4}}>
                        <span>🚨 {shotsRem} shots</span>
                        <button style={{background:"none",border:"1px solid var(--err)",borderRadius:5,color:"var(--err)",fontSize:10,padding:"2px 7px",cursor:"pointer"}} onClick={()=>alertVictoria("coffee",shotsRem)}>WhatsApp</button>
                      </div>
                    )}
                    {Object.entries(inventory.milk||{}).map(([type,liters])=>
                      Number(liters)<ALERT_MILK_L?(
                        <div key={type} style={{background:"#200a0a",border:"1px solid var(--warn)",borderRadius:8,padding:"7px 10px",fontSize:11,color:"var(--warn)",display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:3}}>
                          <span>⚠️ {type}: {Number(liters).toFixed(1)}L</span>
                          <button style={{background:"none",border:"1px solid var(--warn)",borderRadius:5,color:"var(--warn)",fontSize:10,padding:"2px 7px",cursor:"pointer"}} onClick={()=>alertVictoria("milk",type)}>WhatsApp</button>
                        </div>
                      ):null
                    )}
                    <div style={{marginTop:6,display:"flex",flexDirection:"column",gap:3}}>
                      <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"var(--mu)"}}>
                        <span>☕ Shots</span>
                        <span style={{fontFamily:"DM Mono",color:shotsRem<ALERT_SHOTS?"var(--warn)":"var(--ac)"}}>{openBag?shotsRem:"—"}</span>
                      </div>
                      {MILK_TYPES.map(mt=>{const ml=Number((inventory.milk||{})[mt.id]||0);return(
                        <div key={mt.id} style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"var(--mu)"}}>
                          <span>{mt.emoji} {mt.label}</span>
                          <span style={{fontFamily:"DM Mono",color:ml<ALERT_MILK_L?"var(--err)":ml<ALERT_MILK_L+1?"var(--warn)":"var(--ac)"}}>{ml.toFixed(1)}L</span>
                        </div>
                      );})}
                      <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"var(--mu)"}}>
                        <span>🥐 Pan</span>
                        <span style={{fontFamily:"DM Mono",color:"var(--ac)"}}>{Math.max(0,todayBread.arrived-todayBread.waste-todayBread.sold)}</span>
                      </div>
                      {myAttToday.length>0&&(
                        <div style={{marginTop:4,padding:"6px 8px",background:"var(--sf2)",border:"1px solid var(--bd)",borderRadius:7}}>
                          {myAttToday.map(a=>(
                            <div key={a.shift} style={{display:"flex",justifyContent:"space-between",fontSize:10}}>
                              <span style={{color:"var(--mu)"}}>{a.shiftName}</span>
                              <span style={{fontFamily:"DM Mono",color:a.late?"var(--err)":"var(--ac2)"}}>{a.late?"⚠️ Retardo":"✅ OK"}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {/* My today shift */}
                      {(()=>{
                        const mySchedKey=`${store}_${schedWeek}`;
                        const mySched=schedules[mySchedKey];
                        if(!mySched||mySched.status!=='aprobado')return null;
                        const myShifts=mySched.schedule?.[employee.id];
                        if(!myShifts)return null;
                        const wd=new Date().getDay();
                        const idx=wd===0?6:wd-1;
                        const opt=SHIFT_OPTIONS.find(s=>s.id===myShifts[idx]);
                        if(!opt)return null;
                        return(
                          <div style={{marginTop:4,padding:"6px 8px",background:"var(--sf2)",border:`1px solid ${opt.id==='R'?"var(--err)":"var(--ac2)"}`,borderRadius:7}}>
                            <div style={{fontSize:9,color:"var(--mu)",fontFamily:"DM Mono,monospace",textTransform:"uppercase",letterSpacing:".1em",marginBottom:2}}>Mi turno hoy</div>
                            <div style={{fontSize:12,fontWeight:700,color:opt.id==='R'?"var(--err)":"var(--ac2)"}}>{opt.label} · {opt.time}</div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>

                {/* MENU */}
                <div className="mpanel">
                  {empMode&&(
                    <div style={{padding:"10px 12px",background:"#0a200a",borderBottom:"1px solid var(--ac2)"}}>
                      <div style={{background:"#0a200a",border:"1px solid var(--ac2)",borderRadius:10,padding:"10px 12px",display:"flex",flexDirection:"column",gap:5}}>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                          <span style={{fontSize:13,fontWeight:700,color:"var(--ac2)"}}>☕ Mi bebida</span>
                          <span style={{fontSize:10,background:todayEmpCons.count<2?"#162016":"#201800",color:todayEmpCons.count<2?"var(--ac2)":"var(--ac)",border:`1px solid ${todayEmpCons.count<2?"var(--ac2)":"var(--ac)"}`,borderRadius:5,padding:"2px 7px",fontFamily:"DM Mono,monospace"}}>
                            {todayEmpCons.count<2?`${2-todayEmpCons.count} gratis`:"40% OFF"}
                          </span>
                        </div>
                        <span style={{fontSize:11,color:"var(--mu)"}}>Bebidas hoy: {todayEmpCons.count} · Cargo: {fmt(todayEmpCons.charges)}</span>
                        <button className="inv-btn" style={{marginTop:2}} onClick={()=>setModal("emp_drink")}>+ Registrar mi bebida</button>
                      </div>
                    </div>
                  )}
                  <div className="cscroll">
                    {Object.keys(MENU).map(cat=>(
                      <button key={cat} className={`ctab ${activeCat===cat?"on":""}`} onClick={()=>setCat(cat)}>{cat}</button>
                    ))}
                  </div>
                  <div className="igrid">
                    {MENU[activeCat].map(item=>{
                      const bp=item.medPrice||item.price;const tp=item.grPrice||item.medPrice||item.price;
                      if(item.isCombo) return(
                        <button key={item.id} className="mcard combo" onClick={()=>addItem({...item,price:item.price,size:null,milk:null,extras:[]})}>
                          <div className="mcrow"><span className="mcname">{item.name}</span><span className="mcfav">🎁</span></div>
                          <span className="combo-badge">COMBO</span>
                          <span className="mcprice">{fmt(item.price)}</span>
                          {item.note&&<span className="mcnote">{item.note}</span>}
                        </button>
                      );
                      return(
                        <button key={item.id} className="mcard" onClick={()=>handleMenuClick(item)}>
                          <div className="mcrow"><span className="mcname">{item.name}</span>{item.fav&&<span className="mcfav">★</span>}</div>
                          <span className={`stag ${item.station}`}>{item.station}</span>
                          <span className="mcprice">{item.hasSizes?`${fmt(bp)} – ${fmt(tp)}`:fmt(bp)}</span>
                          {item.note&&<span className="mcnote">{item.note}</span>}
                          {item.hasMilk&&<span className="mcnote">🥛 leche a elegir</span>}
                          {item.isCold&&<span className="mcnote">🧊 frío</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ORDER */}
                <div className="rpanel">
                  <div className="oh">
                    <span className="otitle">Mesa {selTable}</span>
                    <span className={`mode-badge ${cur.mode==="salon"?"salon":"takeout"}`}>
                      {cur.mode==="salon"?"🪑 Salón":"🛍 Para llevar"}
                    </span>
                    <button className="oclr" onClick={()=>clearOrder(selTable)}>Limpiar</button>
                  </div>
                  <div className="oitems">
                    {(!cur.items||cur.items.length===0)?(
                      <div className="oempty"><div className="oeicon">☕</div><div className="oetext">sin pedido</div></div>
                    ):(
                      <>
                        {tipAlert&&<div className="ubanner"><span style={{flex:1}}>{tipAlert}</span><button onClick={()=>setTipD(true)}>×</button></div>}
                        {/* Table coaching alert */}
                        {cur.seatedAt&&(()=>{const s=getTableStatus(cur.seatedAt,cur.lastOrderAt);if(s&&s.level!=="ok")return<div className={`coach-banner ${s.level==="upsell"?"urgent":""}`}><span style={{flex:1}}>{s.msg}</span><span style={{fontFamily:"DM Mono",fontSize:10}}>{formatElapsed(cur.seatedAt)}</span></div>;return null;})()}
                        {cur.items.map(item=>(
                          <div key={item.lineId} className="oitem">
                            <div className="oqctrl">
                              <button className="oqb" onClick={()=>changeQty(item.lineId,1)}>+</button>
                              <span className="oqn">{item.qty}</span>
                              <button className="oqb" onClick={()=>changeQty(item.lineId,-1)}>−</button>
                            </div>
                            <div className="obody">
                              <span className="oiname">{item.name}{item.size?` (${item.size==="grande"?"G":"M"})`:""}</span>
                              <span className="oimods">{[item.milk,...(item.extras||[]).map(e=>e.label)].filter(Boolean).join(" · ")}</span>
                            </div>
                            <span className="oiprice">{fmt(item.price*item.qty)}</span>
                            <button className="odel" onClick={()=>removeItem(item.lineId)}>×</button>
                          </div>
                        ))}
                        <textarea className="onote" rows={2} placeholder="Nota para cocina / barra…" value={cur.note||""} onChange={e=>upd(selTable,{note:e.target.value})}/>
                      </>
                    )}
                  </div>
                  <div className="ofoot">
                    <div className="trow"><span>Subtotal</span><span>{fmt(subtotalBeforeDisc)}</span></div>
                    <div className="disc-toggle">
                      {DISCOUNTS.filter(d=>!d.adminOnly||employee.role!=="mesero").map(d=>(
                        <button key={d.id} className={`disc-btn ${discount?.id===d.id?"on":""}`}
                          onClick={()=>{
                            if(d.id==="custom"){const p=prompt("% de descuento:");if(p){const pct=parseFloat(p)/100;if(pct>0&&pct<=1)setDiscount({id:"custom",pct,label:`Descuento ${p}%`});}}
                            else setDiscount(discount?.id===d.id?null:d);
                          }}>
                          <span style={{fontSize:14}}>{d.emoji}</span>
                          <span>{d.label}</span>
                          {d.pct&&<span style={{fontSize:10,color:"var(--warn)"}}>{d.pct*100}% off</span>}
                        </button>
                      ))}
                    </div>
                    {discount&&(
                      <div className="disc-row-active">
                        <span>{discount.emoji} {discount.label}</span>
                        <div style={{display:"flex",alignItems:"center",gap:10}}>
                          <span style={{fontFamily:"DM Mono"}}>−{fmt(discAmount)}</span>
                          <button onClick={()=>setDiscount(null)} style={{background:"none",border:"none",color:"var(--warn)",fontSize:16,padding:0}}>×</button>
                        </div>
                      </div>
                    )}
                    <div className="trow big"><span>Total</span><span>{fmt(total)}</span></div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>
                      <button className="sbtn" disabled={!cur.items||cur.items.length===0} onClick={()=>{setModal("comanda");setMdata({});}}>📋 Comanda</button>
                      <button className="sbtn" disabled={!cur.items||cur.items.length===0} onClick={()=>printTicket("ticket")} style={{borderColor:"var(--ac3)",color:"var(--ac3)"}}>🖨️ Ticket</button>
                    </div>
                    {isPaying?(
                      <div style={{background:"var(--sf2)",border:"1px solid var(--bd)",borderRadius:10,padding:"16px",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
                        <div style={{width:28,height:28,border:"3px solid var(--bd)",borderTop:"3px solid var(--ac)",borderRadius:"50%",animation:"spin 1s linear infinite"}}/>
                        <span style={{fontSize:13,color:"var(--mu)"}}>Procesando…</span>
                      </div>
                    ):(
                      <div className="pgrid">
                        <button className="pbtn cash" disabled={!cur.items||cur.items.length===0} onClick={()=>{setModal("pay");setMdata({method:"cash"});}}>💵 Efectivo</button>
                        <button className="pbtn card" disabled={!cur.items||cur.items.length===0} onClick={()=>{setModal("pay");setMdata({method:"card"});}}>💳 Tarjeta</button>
                        <button className="pbtn mix" disabled={!cur.items||cur.items.length===0} onClick={()=>{setModal("mix");setMdata({});}}>⚡ Combinado</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* MOBILE ORDER WIZARD ─────────────────────────── */}
            <div className="mobile-wizard">
              <div className="wiz-head">
                {mobStep!=="table"&&(
                  <button className="wiz-back" onClick={()=>{
                    if(mobStep==="category")setMobStep("table");
                    else if(mobStep==="items")setMobStep("category");
                    else if(mobStep==="cart")setMobStep("items");
                  }}>← Atrás</button>
                )}
                {mobStep!=="cart"?(
                  <div className="wiz-dots">
                    {[{k:"table",l:"1 Mesa"},{k:"category",l:"2 Categoría"},{k:"items",l:"3 Productos"}].map((s,i)=>{
                      const order=["table","category","items"];
                      const curIdx=order.indexOf(mobStep);
                      return(
                        <div key={s.k} className={`wiz-dot ${mobStep===s.k?"on":""} ${curIdx>i?"done":""}`}>
                          <span className="wiz-dot-n">{curIdx>i?"✓":i+1}</span>
                          <span className="wiz-dot-l">{s.l.split(" ")[1]}</span>
                        </div>
                      );
                    })}
                  </div>
                ):(
                  <div className="wiz-title-inline">🧾 Cuenta</div>
                )}
                {mobStep!=="cart"&&cur.items&&cur.items.length>0&&(
                  <button className="wiz-cart-fab" onClick={()=>setMobStep("cart")}>
                    🛒 {cur.items.reduce((s,i)=>s+i.qty,0)} · {fmt(total)}
                  </button>
                )}
              </div>

              {/* STEP 1 — MESA O TO GO */}
              {mobStep==="table"&&(
                <div className="wiz-body">
                  <div className="wiz-title">¿Mesa o para llevar?</div>
                  <button className="wiz-togo-btn" onClick={()=>{
                    const free=TABLES.find(t=>!(orders[t.id]?.items?.length));
                    const tId=free?free.id:TABLES[0].id;
                    setSelTable(tId);
                    upd(tId,{mode:"takeout"});
                    setMobStep("category");
                  }}>🛍 Para Llevar</button>
                  <div className="wiz-sep">o elige una mesa</div>
                  <div className="wiz-table-grid">
                    {TABLES.map(t=>{
                      const o=orders[t.id];const items=o?.items||[];const occ=items.length>0;
                      const status=occ?getTableStatus(o?.seatedAt,o?.lastOrderAt):null;
                      return(
                        <button key={t.id} className={`wiz-table-card ${occ?"occ":""} ${status?`alert-${status.level}`:""}`}
                          style={status?{borderColor:status.color}:{}}
                          onClick={()=>{
                            setSelTable(t.id);
                            if(!o?.mode)upd(t.id,{mode:"salon"});
                            setMobStep("category");
                          }}>
                          <span className="wtc-name">{t.name}</span>
                          {occ?(
                            <span className="wtc-sub">{items.reduce((s,i)=>s+i.qty,0)} items · {fmt(items.reduce((s,i)=>s+i.price*i.qty,0))}</span>
                          ):(
                            <span className="wtc-sub empty">vacía</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2 — CATEGORÍA */}
              {mobStep==="category"&&(
                <div className="wiz-body">
                  <div className="wiz-title">{cur.mode==="takeout"?"🛍 Para llevar":`Mesa ${selTable}`} — elige categoría</div>
                  <div className="wiz-cat-grid">
                    {Object.keys(MENU).map(cat=>{
                      const icon={"CAFÉ":"☕","SIN CAFÉ":"🧊","TODO EL DÍA":"🍽","LIGEROS":"🥗","PAN DULCE":"🥐","COMBOS":"🎁","COCTELERÍA":"🍹"}[cat]||"🍴";
                      return(
                        <button key={cat} className="wiz-cat-card" onClick={()=>{setCat(cat);setMobStep("items");}}>
                          <span className="wcc-icon">{icon}</span>
                          <span className="wcc-name">{cat}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3 — PRODUCTOS (+ paso 4 = modal de extras al tocar un producto) */}
              {mobStep==="items"&&(
                <div className="wiz-body">
                  <div className="wiz-title">{activeCat}</div>
                  <div className="igrid wiz-igrid">
                    {MENU[activeCat].map(item=>{
                      const bp=item.medPrice||item.price;const tp=item.grPrice||item.medPrice||item.price;
                      if(item.isCombo)return(
                        <button key={item.id} className="mcard combo" onClick={()=>addItem({...item,price:item.price,size:null,milk:null,extras:[]})}>
                          <div className="mcrow"><span className="mcname">{item.name}</span><span className="mcfav">🎁</span></div>
                          <span className="combo-badge">COMBO</span>
                          <span className="mcprice">{fmt(item.price)}</span>
                          {item.note&&<span className="mcnote">{item.note}</span>}
                        </button>
                      );
                      return(
                        <button key={item.id} className="mcard" onClick={()=>handleMenuClick(item)}>
                          <div className="mcrow"><span className="mcname">{item.name}</span>{item.fav&&<span className="mcfav">★</span>}</div>
                          <span className={`stag ${item.station}`}>{item.station}</span>
                          <span className="mcprice">{item.hasSizes?`${fmt(bp)} – ${fmt(tp)}`:fmt(bp)}</span>
                          {item.note&&<span className="mcnote">{item.note}</span>}
                          {item.hasMilk&&<span className="mcnote">🥛 leche a elegir</span>}
                          {item.isCold&&<span className="mcnote">🧊 frío</span>}
                          {item.hasCocktailExtras&&<span className="mcnote">✨ extras disponibles</span>}
                        </button>
                      );
                    })}
                  </div>
                  <button className="wiz-more-cat-btn" onClick={()=>setMobStep("category")}>↺ Cambiar categoría</button>
                </div>
              )}

              {/* CUENTA / COBRAR */}
              {mobStep==="cart"&&(
                <div className="wiz-body wiz-cart-body">
                  <div className="rpanel wiz-rpanel">
                    <div className="oh">
                      <span className="otitle">{cur.mode==="takeout"?"🛍 Para llevar":`Mesa ${selTable}`}</span>
                      <span className={`mode-badge ${cur.mode==="salon"?"salon":"takeout"}`}>
                        {cur.mode==="salon"?"🪑 Salón":"🛍 Para llevar"}
                      </span>
                      <button className="oclr" onClick={()=>clearOrder(selTable)}>Limpiar</button>
                    </div>
                    <div className="oitems">
                      {(!cur.items||cur.items.length===0)?(
                        <div className="oempty"><div className="oeicon">☕</div><div className="oetext">sin pedido</div></div>
                      ):(
                        <>
                          {tipAlert&&<div className="ubanner"><span style={{flex:1}}>{tipAlert}</span><button onClick={()=>setTipD(true)}>×</button></div>}
                          {cur.seatedAt&&(()=>{const s=getTableStatus(cur.seatedAt,cur.lastOrderAt);if(s&&s.level!=="ok")return<div className={`coach-banner ${s.level==="upsell"?"urgent":""}`}><span style={{flex:1}}>{s.msg}</span><span style={{fontFamily:"DM Mono",fontSize:10}}>{formatElapsed(cur.seatedAt)}</span></div>;return null;})()}
                          {cur.items.map(item=>(
                            <div key={item.lineId} className="oitem">
                              <div className="oqctrl">
                                <button className="oqb" onClick={()=>changeQty(item.lineId,1)}>+</button>
                                <span className="oqn">{item.qty}</span>
                                <button className="oqb" onClick={()=>changeQty(item.lineId,-1)}>−</button>
                              </div>
                              <div className="obody">
                                <span className="oiname">{item.name}{item.size?` (${item.size==="grande"?"G":"M"})`:""}</span>
                                <span className="oimods">{[item.milk,...(item.extras||[]).map(e=>e.label)].filter(Boolean).join(" · ")}</span>
                              </div>
                              <span className="oiprice">{fmt(item.price*item.qty)}</span>
                              <button className="odel" onClick={()=>removeItem(item.lineId)}>×</button>
                            </div>
                          ))}
                          <textarea className="onote" rows={2} placeholder="Nota para cocina / barra…" value={cur.note||""} onChange={e=>upd(selTable,{note:e.target.value})}/>
                        </>
                      )}
                    </div>
                    <div className="ofoot">
                      <button className="wiz-add-more-btn" onClick={()=>setMobStep("category")}>+ Agregar más productos</button>
                      <div className="trow"><span>Subtotal</span><span>{fmt(subtotalBeforeDisc)}</span></div>
                      <div className="disc-toggle">
                        {DISCOUNTS.filter(d=>!d.adminOnly||employee.role!=="mesero").map(d=>(
                          <button key={d.id} className={`disc-btn ${discount?.id===d.id?"on":""}`}
                            onClick={()=>{
                              if(d.id==="custom"){const p=prompt("% de descuento:");if(p){const pct=parseFloat(p)/100;if(pct>0&&pct<=1)setDiscount({id:"custom",pct,label:`Descuento ${p}%`});}}
                              else setDiscount(discount?.id===d.id?null:d);
                            }}>
                            <span style={{fontSize:14}}>{d.emoji}</span>
                            <span>{d.label}</span>
                            {d.pct&&<span style={{fontSize:10,color:"var(--warn)"}}>{d.pct*100}% off</span>}
                          </button>
                        ))}
                      </div>
                      {discount&&(
                        <div className="disc-row-active">
                          <span>{discount.emoji} {discount.label}</span>
                          <div style={{display:"flex",alignItems:"center",gap:10}}>
                            <span style={{fontFamily:"DM Mono"}}>−{fmt(discAmount)}</span>
                            <button onClick={()=>setDiscount(null)} style={{background:"none",border:"none",color:"var(--warn)",fontSize:16,padding:0}}>×</button>
                          </div>
                        </div>
                      )}
                      <div className="trow big"><span>Total</span><span>{fmt(total)}</span></div>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:5}}>
                        <button className="sbtn" disabled={!cur.items||cur.items.length===0} onClick={()=>{setModal("comanda");setMdata({});}}>📋 Comanda</button>
                        <button className="sbtn" disabled={!cur.items||cur.items.length===0} onClick={()=>printTicket("ticket")} style={{borderColor:"var(--ac3)",color:"var(--ac3)"}}>🖨️ Ticket</button>
                      </div>
                      {isPaying?(
                        <div style={{background:"var(--sf2)",border:"1px solid var(--bd)",borderRadius:10,padding:"16px",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
                          <div style={{width:28,height:28,border:"3px solid var(--bd)",borderTop:"3px solid var(--ac)",borderRadius:"50%",animation:"spin 1s linear infinite"}}/>
                          <span style={{fontSize:13,color:"var(--mu)"}}>Procesando…</span>
                        </div>
                      ):(
                        <div className="pgrid">
                          <button className="pbtn cash" disabled={!cur.items||cur.items.length===0} onClick={()=>{setModal("pay");setMdata({method:"cash"});}}>💵 Efectivo</button>
                          <button className="pbtn card" disabled={!cur.items||cur.items.length===0} onClick={()=>{setModal("pay");setMdata({method:"card"});}}>💳 Tarjeta</button>
                          <button className="pbtn mix" disabled={!cur.items||cur.items.length===0} onClick={()=>{setModal("mix");setMdata({});}}>⚡ Combinado</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* PERSONAL WARNING */}
            {employee&&(()=>{
              const w = calcWarningLevel(employee.id, store, closed, STORE_GOALS, STORE_EMPLOYEES);
              if(!w) return null;
              return(
                <div className={`warn-banner ${w.level==='critical'?'':'soft'}`} style={{margin:"0 0 0 0",borderRadius:0,padding:"7px 14px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontSize:12,fontWeight:700,color:w.level==='critical'?"var(--err)":"var(--warn)"}}>
                      {w.level==='critical'?`🚨 Llevas ${w.days} días bajo meta — tu puesto está en riesgo`:`⚠ ${w.days} días por debajo de tu meta personal`}
                    </span>
                    <span style={{fontSize:10,color:"var(--mu)",fontFamily:"DM Mono,monospace"}}>Meta: {fmt(empDailyGoal)}/día</span>
                  </div>
                </div>
              );
            })()}
            {/* GAMI BAR */}
            <div className="gbar">
              <span className="lbadge">{lvl.emoji}</span>
              <div className="gstat"><span className="glabel">Mis ventas</span><span className="gval">{fmt(mySales)}</span></div>
              <div className="gbwrap">
                <div className="gblabrow"><span>{lvl.label}</span><span>Meta {fmt(empDailyGoal)} · {pctFmt(myPct)}</span></div>
                <div className="gbtrack"><div className={`gbfill ${myPct>=1?"done":myPct>=.65?"warn":""}`} style={{width:`${myPct*100}%`}}/></div>
              </div>
              <div className="bonus-strip">
                <div className="bs-item"><span className="bs-label">Bono</span><span className="bs-val">{fmt(calcDailyBonus(mySales))}</span></div>
                <div className="bs-item"><span className="bs-label">Propinas</span><span className="bs-val" style={{color:"var(--ac2)"}}>{fmt(myTips)}</span></div>
              </div>
            </div>
          </>
        )}

        {/* CORTE */}
        {view==="corte"&&(
          <div className="repwrap">
            <div className="corte-section">
              <div style={{fontSize:15,fontWeight:700}}>🗂 Corte de Caja — {storeObj?.name}</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                <button className={`shift-btn ${corteShift==="A"?"on":""}`} onClick={()=>setCorteShift("A")}>☀️ Turno A (Mañana)</button>
                <button className={`shift-btn ${corteShift==="B"?"on":""}`} onClick={()=>setCorteShift("B")}>🌙 Turno B (Tarde)</button>
              </div>
              {/* Attendance for this shift */}
              {(()=>{
                const allEmps=[...GLOBAL_ADMINS,...(STORE_EMPLOYEES[store]||[])];
                const shiftAtt=Object.entries(attendance)
                  .filter(([k])=>k.endsWith(`_${today}`))
                  .flatMap(([k,entries])=>{
                    const empId=parseInt(k.split("_")[0]);
                    const emp=allEmps.find(e=>e.id===empId);
                    return entries.filter(e=>e.shift===corteShift).map(e=>({...e,empName:emp?.name||""}));
                  });
                if(!shiftAtt.length) return <div style={{fontSize:11,color:"var(--mu)"}}>Sin marcajes registrados para este turno</div>;
                return(
                  <div style={{background:"var(--sf2)",border:"1px solid var(--bd)",borderRadius:10,padding:"10px 12px",display:"flex",flexDirection:"column",gap:4}}>
                    <div style={{fontSize:10,color:"var(--mu)",fontFamily:"DM Mono",textTransform:"uppercase",letterSpacing:".1em",marginBottom:2}}>Marcajes del turno</div>
                    {shiftAtt.map((a,i)=>(
                      <div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:12}}>
                        <span>{a.empName}</span>
                        <span style={{fontFamily:"DM Mono",color:a.late?"var(--err)":"var(--ac2)"}}>
                          {new Date(a.time).toLocaleTimeString("es-MX",{timeZone:TZ,hour:"2-digit",minute:"2-digit"})}
                          {a.late?" ⚠️":""}</span>
                      </div>
                    ))}
                  </div>
                );
              })()}
              {/* Control de folios — solo gerentes/admins lo ven */}
              {(isGerente||isSuperAdmin)&&(()=>{
                const todayFolios=folios.filter(f=>dayKey(new Date(f.created_at))===today);
                const cancelados=todayFolios.filter(f=>f.status==="cancelado");
                const abiertos=todayFolios.filter(f=>f.status==="abierto");
                const cerrados=todayFolios.filter(f=>f.status==="cerrado");
                const montoCancelado=cancelados.reduce((s,f)=>s+(Number(f.total)||0),0);
                const totalFolios=todayFolios.length;
                const tieneAlerta=cancelados.length>0||abiertos.length>0;
                return(
                  <div style={{background:tieneAlerta?"#200a0a":"var(--sf2)",border:`1px solid ${tieneAlerta?"var(--err)":"var(--bd)"}`,borderRadius:10,padding:"12px",display:"flex",flexDirection:"column",gap:6}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <span style={{fontSize:12,fontWeight:700,color:tieneAlerta?"var(--err)":"var(--tx)"}}>🔒 Control de Folios (hoy) · solo gerencia</span>
                      <span style={{fontSize:10,color:"var(--mu)",fontFamily:"DM Mono"}}>{totalFolios} folios</span>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                      <div style={{display:"flex",flexDirection:"column"}}>
                        <span style={{fontSize:10,color:"var(--mu)"}}>Cerrados (OK)</span>
                        <span style={{fontFamily:"DM Mono",fontSize:16,color:"var(--ac2)"}}>{cerrados.length}</span>
                      </div>
                      <div style={{display:"flex",flexDirection:"column"}}>
                        <span style={{fontSize:10,color:"var(--mu)"}}>Abiertos</span>
                        <span style={{fontFamily:"DM Mono",fontSize:16,color:abiertos.length>0?"var(--warn)":"var(--tx)"}}>{abiertos.length}</span>
                      </div>
                      <div style={{display:"flex",flexDirection:"column"}}>
                        <span style={{fontSize:10,color:"var(--mu)"}}>Faltantes (cancelados)</span>
                        <span style={{fontFamily:"DM Mono",fontSize:16,color:cancelados.length>0?"var(--err)":"var(--tx)"}}>{cancelados.length}{montoCancelado>0?` · ${fmt(montoCancelado)}`:""}</span>
                      </div>
                    </div>
                    {cancelados.length>0&&(
                      <div style={{display:"flex",flexDirection:"column",gap:3,marginTop:4,paddingTop:6,borderTop:"1px solid var(--bd)"}}>
                        {cancelados.map(f=>(
                          <div key={f.id} style={{display:"flex",justifyContent:"space-between",fontSize:11}}>
                            <span>Folio #{f.folio_num} · Mesa {f.table_num} · {f.employee_name||"—"}</span>
                            <span style={{fontFamily:"DM Mono",color:"var(--err)"}}>{fmt(f.total||0)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })()}
              <div className="corte-row"><span style={{fontSize:13,color:"var(--mu)"}}>Cuentas</span><span style={{fontFamily:"DM Mono"}}>{shiftOrds.length}</span></div>
              <div className="corte-row"><span style={{fontSize:13,color:"var(--mu)"}}>Total ventas</span><span style={{fontFamily:"DM Mono",color:"var(--ac)"}}>{fmt(shiftOrds.reduce((s,o)=>s+o.subtotal,0))}</span></div>
              <div className="corte-row"><span style={{fontSize:13,color:"var(--mu)"}}>💵 Efectivo</span><span style={{fontFamily:"DM Mono",color:"var(--ac2)"}}>{fmt(shiftCash)}</span></div>
              <div className="corte-row"><span style={{fontSize:13,color:"var(--mu)"}}>💳 Tarjeta</span><span style={{fontFamily:"DM Mono",color:"var(--ac3)"}}>{fmt(shiftCard)}</span></div>
              <div className="corte-row"><span style={{fontSize:13,color:"var(--mu)"}}>🤝 Propinas</span><span style={{fontFamily:"DM Mono",color:"var(--ac2)"}}>{fmt(shiftTips)}</span></div>
              <div className="corte-row"><span style={{fontSize:13,color:"var(--mu)"}}>📥 Ingresos</span><span style={{fontFamily:"DM Mono",color:"var(--ac2)"}}>{fmt(todayCashIn)}</span></div>
              <div className="corte-row"><span style={{fontSize:13,color:"var(--mu)"}}>📤 Egresos</span><span style={{fontFamily:"DM Mono",color:"var(--err)"}}>−{fmt(todayCashOut)}</span></div>
              <div className="corte-row" style={{borderTop:"2px solid var(--bd)",paddingTop:12}}>
                <span style={{fontSize:14,fontWeight:700}}>Efectivo esperado</span>
                <span style={{fontFamily:"DM Mono",fontSize:20,color:"var(--ac)"}}>{fmt(shiftCash+todayCashIn-todayCashOut)}</span>
              </div>
              <div style={{background:"var(--sf2)",border:"1px solid var(--bd)",borderRadius:10,padding:"12px"}}>
                <div style={{fontSize:12,color:"var(--mu)",marginBottom:6}}>Efectivo físico contado:</div>
                <input className="minput" type="number" placeholder="Ej. 3500" id="physical-cash"/>
                <button className="mb p" style={{marginTop:8,width:"100%"}} onClick={()=>{
                  const val=parseFloat(document.getElementById("physical-cash").value)||0;
                  const expected=shiftCash+todayCashIn-todayCashOut;const diff=val-expected;
                  alert(`Diferencia: ${fmt(diff)}\n${diff===0?"✅ Cuadra perfecto":diff>0?"⬆️ Sobrante":"⬇️ Faltante"}`);
                }}>Verificar cuadre</button>
              </div>
            </div>
            <div>
              <div className="ptitle" style={{marginBottom:8}}>💰 Movimientos de hoy</div>
              <button className="ba-btn success" style={{marginBottom:8}} onClick={()=>{setModal("cash_entry");setMdata({});}}>+ Registrar movimiento</button>
              {cashLog.filter(e=>dayKey(new Date(e.timestamp))===today).map(e=>(
                <div key={e.id} className={`cash-entry ${e.type}`} style={{marginBottom:5}}>
                  <div style={{display:"flex",flexDirection:"column",flex:1,gap:2}}>
                    <span style={{fontSize:12}}>{e.description}</span>
                    <span style={{fontSize:10,color:"var(--mu)"}}>{e.employee}</span>
                  </div>
                  <span className={`cash-amount ${e.type}`}>{e.type==="income"?"+":"-"}{fmt(e.amount)}</span>
                </div>
              ))}
            </div>
            <div>
              <div className="ptitle" style={{marginBottom:8}}>🕐 Asistencia hoy</div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:8}}>
                {[...GLOBAL_ADMINS,...storeEmployees].map(emp=>{
                  const key=`${emp.id}_${today}`;const att=attendance[key]||[];
                  return(
                    <div key={emp.id} className="att-card">
                      <div style={{fontSize:13,fontWeight:700}}>{emp.name}</div>
                      {SHIFTS.map(shift=>{
                        const entry=att.find(a=>a.shift===shift.id);
                        return(
                          <div key={shift.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:11}}>
                            <span style={{color:"var(--mu)"}}>{shift.label}</span>
                            {entry?(
                              <span className={`att-badge ${entry.late?"late":"ok"}`}>{entry.late?"⚠️ Retardo":"✅"} {new Date(entry.time).toLocaleTimeString("es-MX",{hour:"2-digit",minute:"2-digit"})}</span>
                            ):(
                              <span style={{fontSize:10,color:"var(--mu2)"}}>—</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* REPORTS */}
        {view==="reports"&&(employee.role==="admin"||isSuperAdmin)&&(
          <div className="repwrap">
            <div className="scorec">
              <div className="scoreh">
                <span className="sctt">🎯 Ventas {isSuperAdmin?`— ${rStore==="all"?"Todas":STORES.find(s=>s.id===rStore)?.short||rStore}`:storeObj?.name}</span>
                <div className="sctogg">{[["day","Hoy"],["week","Sem"],["month","Mes"]].map(([k,l])=><button key={k} className={`sctb ${sFilter===k?"on":""}`} onClick={()=>setSFilter(k)}>{l}</button>)}</div>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span>{fmt(sRev)} / {fmt(sGoal)}</span><span style={{fontFamily:"DM Mono",fontSize:18,color:"var(--ac)"}}>{pctFmt(sPct)}</span></div>
              <div className="scoretrack"><div className="scorefill" style={{width:`${sPct*100}%`}}/></div>
              <div style={{marginTop:8,fontSize:12,color:"var(--mu)"}}>Bono grupal: <span style={{color:"#f0c040",fontFamily:"DM Mono"}}>{fmt(calcGroupBonus(sPct))}/persona</span></div>
            </div>

            {/* Store filter for super admins */}
            {isSuperAdmin&&(
              <div>
                <div className="ptitle" style={{marginBottom:6}}>Filtrar por tienda</div>
                <div className="store-filter">
                  <button className={`sf-btn ${rStore==="all"?"on":""}`} style={rStore==="all"?{background:"var(--ac)",borderColor:"var(--ac)"}:{}} onClick={()=>setRStore("all")}>Todas</button>
                  {STORES.map(s=><button key={s.id} className={`sf-btn ${rStore===s.id?"on":""}`} style={rStore===s.id?{background:s.color,borderColor:s.color,color:"#0f0f0e"}:{borderColor:s.color+'44',color:s.color}} onClick={()=>setRStore(s.id)}>{s.short}</button>)}
                </div>
              </div>
            )}

            <div className="frow">
              {[["day","Hoy"],["week","Semana"],["month","Mes"],["year","Año"]].map(([k,l])=><button key={k} className={`rfbtn ${rFilter===k?"on":""}`} onClick={()=>setRFilter(k)}>{l}</button>)}
              <select className="empsel" value={rEmp} onChange={e=>setREmp(e.target.value)}>
                <option value="all">Todos</option>
                {[...GLOBAL_ADMINS,...storeEmployees].map(e=><option key={e.id} value={e.id}>{e.name}</option>)}
              </select>
            </div>

            <div className="sgrid">
              {[["Ingresos",fmt(fRev),`${fOrds.length} cuentas`],["Comensales",fCov,"personas"],["Ticket prom.",fOrds.length?fmt(fRev/fOrds.length):"$0","por cuenta"],["Propinas",fmt(fTips),"registradas"],["Efectivo",fmt(fOrds.filter(o=>o.method==="cash"||o.method==="mix").reduce((s,o)=>s+(o.cash_amt||0),0)),"total"],["Tarjeta",fmt(fOrds.filter(o=>o.method==="card"||o.method==="mix").reduce((s,o)=>s+(o.card_amt||0),0)),"total"],["Para llevar",fOrds.filter(o=>o.mode==="takeout").length,"órdenes"]].map(([label,val,sub])=>(
                <div key={label} className="scard"><div className="sclbl">{label}</div><div className="scval">{val}</div><div className="scsub">{sub}</div></div>
              ))}
            </div>

            {/* Hourly chart */}
            <div className="scorec">
              <div className="scoreh"><span className="sctt">⏰ Horario de visitas</span></div>
              <div className="hour-bar-wrap">
                {hourly.map((v,h)=>(
                  <div key={h} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                    <div className="hour-bar" style={{height:`${(v/maxH)*100}%`,background:h>=7&&h<=10?"var(--ac2)":h>=11&&h<=14?"var(--ac)":"var(--bar)"}}/>
                    {(h===7||h===10||h===12||h===14||h===18||h===20)&&<div style={{fontSize:9,color:"var(--mu)",fontFamily:"DM Mono"}}>{h}h</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* Leaderboard */}
            <div>
              <div className="ptitle" style={{marginBottom:8}}>🏆 Leaderboard — Ventas + Puntualidad</div>

              {/* Warning banners for critical employees */}
              {(()=>{
                const criticals = [...GLOBAL_ADMINS,...storeEmployees].filter(emp=>{
                  const w = calcWarningLevel(emp.id, isSuperAdmin?rStore||store:store, closed, STORE_GOALS, STORE_EMPLOYEES);
                  return w?.level==='critical';
                });
                if(!criticals.length) return null;
                return(
                  <div className="warn-banner" style={{marginBottom:8}}>
                    <div style={{fontWeight:700,color:"var(--err)",fontSize:13}}>🚨 Alerta de rendimiento — {criticals.length} empleado{criticals.length>1?"s":""} bajo meta por 3+ días</div>
                    {criticals.map(e=>(
                      <div key={e.id} style={{fontSize:11,color:"var(--err)",fontFamily:"DM Mono,monospace"}}>
                        ⚠ {e.name} — considerados para plan de mejora
                      </div>
                    ))}
                  </div>
                );
              })()}

              <div className="leaderboard-card">
                <div className="lb-header">
                  <span style={{fontSize:11,fontWeight:700,color:"white",fontFamily:"DM Mono,monospace",letterSpacing:".1em",textTransform:"uppercase"}}>Ranking</span>
                  <span style={{fontSize:10,color:"rgba(255,255,255,.5)",fontFamily:"DM Mono,monospace"}}>Ventas · Puntualidad · Estado</span>
                </div>
                {(()=>{
                  const empList = [...GLOBAL_ADMINS,...storeEmployees];
                  const ranked = empList.map(emp=>{
                    const ords = filterO(String(emp.id), rFilter);
                    const sales = ords.reduce((s,o)=>s+o.subtotal,0);
                    const tips = ords.reduce((s,o)=>s+(o.tip||0),0);
                    const avgTk = ords.length?sales/ords.length:0;
                    // Punctuality: check attendance logs
                    const attEntries = Object.entries(attendance)
                      .filter(([k])=>k.startsWith(`${emp.id}_`))
                      .flatMap(([,v])=>v);
                    const onTime = attEntries.filter(a=>!a.late).length;
                    const late = attEntries.filter(a=>a.late).length;
                    const punctuality = attEntries.length ? Math.round(onTime/attEntries.length*100) : 100;
                    // Score: 60% sales + 40% punctuality
                    const goal = rFilter==="day"?storeGoal.daily:rFilter==="week"?storeGoal.weekly:storeGoal.monthly;
                    const salesPct = Math.min(sales/Math.max(goal/Math.max(storeEmployees.length,1),1),1);
                    const score = Math.round(salesPct*60 + (punctuality/100)*40);
                    const warn = calcWarningLevel(emp.id, isSuperAdmin?rStore||store:store, closed, STORE_GOALS, STORE_EMPLOYEES);
                    // Saved avatar
                    const av = localStorage.getItem(`cheche_avatar_${emp.id}`)||"☕";
                    return{...emp,sales,tips,avgTk,punctuality,onTime,late,score,warn,av,
                      dailyB:calcDailyBonus(sales),wkB:calcWeeklyBonus(avgTk)};
                  }).sort((a,b)=>{
                    // Warnings go to bottom
                    if(a.warn?.level==='critical' && b.warn?.level!=='critical') return 1;
                    if(b.warn?.level==='critical' && a.warn?.level!=='critical') return -1;
                    return b.score-a.score;
                  });

                  return ranked.map((emp,i)=>{
                    const isCritical = emp.warn?.level==='critical';
                    const isWarning = emp.warn?.level==='warning';
                    const l = getLevel(emp.sales);
                    const rankColor = i===0?'var(--ac)':i===1?'var(--mu)':i===2?'var(--kok)':'var(--mu2)';
                    const rankEmoji = i===0?'🥇':i===1?'🥈':i===2?'🥉':`#${i+1}`;
                    return(
                      <div key={emp.id} className={`lb-row ${isCritical?'critical-row':isWarning?'warn-row':''}`}>
                        <span className="lb-rank" style={{color:rankColor}}>{rankEmoji}</span>
                        <span className="lb-avatar">{emp.av}</span>
                        <div style={{flex:1,display:"flex",flexDirection:"column",gap:3}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                            <div style={{display:"flex",alignItems:"center",gap:6}}>
                              <span className="lb-name">{emp.name}</span>
                              {isCritical&&<span className="warn-badge critical">🚨 BAJO META {emp.warn.days}d</span>}
                              {isWarning&&!isCritical&&<span className="warn-badge warning">⚠ Riesgo {emp.warn.days}d</span>}
                            </div>
                            <span style={{fontFamily:"DM Mono,monospace",fontSize:13,color:"var(--ac)"}}>{fmt(emp.sales)}</span>
                          </div>
                          {/* Score bar */}
                          <div className="lb-score-bar">
                            <div className="lb-score-fill" style={{
                              width:`${emp.score}%`,
                              background:isCritical?'var(--err)':isWarning?'var(--warn)':'linear-gradient(90deg,var(--ac2),var(--ac))'
                            }}/>
                          </div>
                          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                            <span style={{fontSize:10,color:"var(--mu)"}}>🎯 Score: <span style={{color:isCritical?"var(--err)":isWarning?"var(--warn)":"var(--ac2)",fontFamily:"DM Mono"}}>{emp.score}/100</span></span>
                            <span style={{fontSize:10,color:"var(--mu)"}}>🕐 Puntual: <span style={{color:emp.punctuality>=90?"var(--ac2)":emp.punctuality>=70?"var(--warn)":"var(--err)",fontFamily:"DM Mono"}}>{emp.punctuality}%</span></span>
                            <span style={{fontSize:10,color:"var(--mu)"}}>💰 Bono: <span style={{color:"#f0c040",fontFamily:"DM Mono"}}>{fmt(emp.dailyB+emp.wkB)}</span></span>
                            <span style={{fontSize:10,color:"var(--mu)"}}>🤝 Propinas: <span style={{color:"var(--ac2)",fontFamily:"DM Mono"}}>{fmt(emp.tips)}</span></span>
                          </div>
                          {isCritical&&(
                            <div style={{fontSize:10,color:"var(--err)",background:"#200a0a",borderRadius:5,padding:"3px 7px",marginTop:2}}>
                              ⚠ Condicionado — 3+ días consecutivos bajo el {Math.round(WARN_THRESHOLD*100)}% de meta. Requiere atención de gerencia.
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>

            {/* History */}
            <div>
              {/* CSV EXPORT */}
              <div style={{background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:13,padding:15,display:"flex",flexDirection:"column",gap:10}}>
                <div style={{fontSize:14,fontWeight:700}}>📥 Exportar reporte CSV</div>
                <p style={{fontSize:12,color:"var(--mu)"}}>Descarga el historial de ventas como archivo CSV para Excel o Google Sheets.</p>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  <button className="inv-btn success" onClick={()=>exportCSV("day")}>📅 Hoy</button>
                  <button className="inv-btn success" onClick={()=>exportCSV("week")}>📅 Esta semana</button>
                  <button className="inv-btn success" onClick={()=>exportCSV("month")}>📅 Este mes</button>
                </div>
                <p style={{fontSize:11,color:"var(--mu2)"}}>El archivo incluye: fecha, hora, tienda, mesa, empleado, items, totales, método de pago y propinas.</p>
              </div>
              <div className="ptitle" style={{marginBottom:7}}>Historial</div>
              <div className="hhead"><span>Hora</span><span>Mesa/Emp</span><span>Items</span><span>Método</span><span>Propina</span><span>Total</span></div>
              <div style={{display:"flex",flexDirection:"column",gap:4,marginTop:4}}>
                {fOrds.length===0&&<div style={{textAlign:"center",color:"var(--mu)",fontSize:13,padding:"24px 0"}}>Sin cuentas en este período</div>}
                {fOrds.slice(0,50).map(o=>(
                  <div key={o.id} className="hrow">
                    <span style={{fontFamily:"DM Mono",fontSize:11,color:"var(--mu)"}}>{new Date(fixTS(o.timestamp)).toLocaleTimeString("es-MX",{timeZone:TZ,hour:"2-digit",minute:"2-digit"})}</span>
                    <div><div style={{fontSize:12}}>Mesa {o.table_num} {o.mode==="takeout"?"🛍":""}</div><div style={{fontSize:10,color:"var(--mu)"}}>{o.employee}{isSuperAdmin&&o.store_name?` · ${o.store_name}`:""}</div></div>
                    <span style={{fontFamily:"DM Mono",fontSize:11}}>{(o.items||[]).reduce((s,i)=>s+i.qty,0)}</span>
                    <span className={`ptag ${o.method}`}>{o.method==="cash"?"💵":o.method==="card"?"💳":"⚡"}</span>
                    <span style={{fontFamily:"DM Mono",fontSize:11,color:"var(--ac2)"}}>{fmt(o.tip||0)}</span>
                    <span style={{fontFamily:"DM Mono",fontSize:13,color:"var(--ac)"}}>{fmt(o.subtotal)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TELEMETRY */}
        {view==="telemetry"&&isSuperAdmin&&(
          <div className="tele-wrap">
            <div className="tele-header">
              <span style={{fontFamily:"DM Mono,monospace",fontSize:11,letterSpacing:".2em",textTransform:"uppercase",color:"var(--mu)"}}>📡 Telemetría en vivo</span>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <div className={`sync-dot ${synced?"":"off"}`}/>
                <span style={{fontSize:10,color:"var(--mu)",fontFamily:"DM Mono,monospace"}}>{new Date().toLocaleTimeString("es-MX",{timeZone:TZ,hour:"2-digit",minute:"2-digit"})}</span>
              </div>
            </div>

            {/* Global KPIs strip */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:8}}>
              {[
                ["Total hoy",fmt(Object.values(telemetryData).reduce((s,d)=>s+(d.todaySales||0),0)),"todas las tiendas"],
                ["Cuentas",Object.values(telemetryData).reduce((s,d)=>s+(d.todayCount||0),0),"órdenes cerradas"],
                ["Mesas activas",Object.values(telemetryData).reduce((s,d)=>s+(d.occupiedTables||0),0),"con clientes"],
                ["Ticket prom",fmt(Object.values(telemetryData).reduce((s,d,_,a)=>s+(d.avgTicket||0),0)/Math.max(Object.values(telemetryData).filter(d=>d.avgTicket>0).length,1)),"promedio global"],
              ].map(([lbl,val,sub])=>(
                <div key={lbl} className="tele-kpi" style={{background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:12,padding:"12px 10px",textAlign:"center"}}>
                  <div className="tele-kpi-val" style={{fontSize:20}}>{val}</div>
                  <div className="tele-kpi-lbl">{lbl}</div>
                  <div style={{fontSize:10,color:"var(--mu2)",marginTop:2}}>{sub}</div>
                </div>
              ))}
            </div>

            {/* Per store cards */}
            <div className="tele-grid">
              {STORES.map(s=>{
                const d = telemetryData[s.id]||{};
                const lastSaleMin = d.lastSale ? Math.floor((Date.now()-d.lastSale.getTime())/60000) : null;
                const isIdle = lastSaleMin !== null && lastSaleMin > 30;
                const isDead = lastSaleMin !== null && lastSaleMin > 90;
                const statusClass = isDead?"dead":isIdle?"idle":"active";
                const occupancyPct = d.totalTables ? Math.round((d.occupiedTables||0)/d.totalTables*100) : 0;
                const tables = getStoreTables(s.id);
                return(
                  <div key={s.id} className="tele-card">
                    <div className="tele-card-header" style={{borderLeft:`3px solid ${s.color}`}}>
                      <div>
                        <div className="tele-store-name">{s.name}</div>
                        <div style={{fontSize:10,color:"var(--mu)",fontFamily:"DM Mono,monospace",marginTop:2}}>
                          {lastSaleMin===null?"Sin ventas hoy":lastSaleMin===0?"Última venta: ahora":`Última venta: ${lastSaleMin}min`}
                        </div>
                      </div>
                      <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
                        <div className={`tele-status-dot ${statusClass}`}/>
                        <span style={{fontSize:9,color:"var(--mu)",fontFamily:"DM Mono,monospace"}}>{statusClass==="active"?"EN LÍNEA":statusClass==="idle"?"INACTIVA":"SIN VENTAS"}</span>
                      </div>
                    </div>
                    <div className="tele-body">
                      {/* Alert if idle */}
                      {isIdle&&<div className={`tele-alert ${isDead?"":"warn"}`}>
                        {isDead?"🚨 Sin ventas +90 min — llamar ahora":"⚠️ Sin ventas en 30+ min — revisar"}
                      </div>}

                      {/* Main KPIs */}
                      <div className="tele-kpi-row">
                        <div className="tele-kpi">
                          <div className="tele-kpi-val">{fmt(d.todaySales||0)}</div>
                          <div className="tele-kpi-lbl">Ventas hoy</div>
                        </div>
                        <div className="tele-kpi">
                          <div className="tele-kpi-val">{d.todayCount||0}</div>
                          <div className="tele-kpi-lbl">Cuentas</div>
                        </div>
                        <div className="tele-kpi">
                          <div className="tele-kpi-val">{fmt(d.avgTicket||0)}</div>
                          <div className="tele-kpi-lbl">Ticket prom</div>
                        </div>
                      </div>

                      {/* Shift breakdown */}
                      <div className="tele-shift-row">
                        <div className="tele-shift">
                          <div className="tele-shift-lbl">☀️ Turno A</div>
                          <div className="tele-shift-val">{fmt(d.amSales||0)}</div>
                        </div>
                        <div className="tele-shift">
                          <div className="tele-shift-lbl">🌙 Turno B</div>
                          <div className="tele-shift-val">{fmt(d.pmSales||0)}</div>
                        </div>
                      </div>

                      {/* Tables visual */}
                      <div>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
                          <span style={{fontSize:10,color:"var(--mu)",fontFamily:"DM Mono,monospace",textTransform:"uppercase",letterSpacing:".1em"}}>Mesas</span>
                          <span style={{fontSize:11,fontFamily:"DM Mono,monospace",color:occupancyPct>70?"var(--ac2)":occupancyPct>40?"var(--ac)":"var(--mu)"}}>{d.occupiedTables||0}/{d.totalTables||0} ocupadas</span>
                        </div>
                        <div className="tele-tables-strip">
                          {tables.map(t=>{
                            const openOrd = (d.openOrders||[]).find(o=>o?.tableId===t.id||o?.table_id===t.id);
                            const hasItems = openOrd?.items?.length>0;
                            const status2 = hasItems ? getTableStatus(openOrd?.seatedAt, openOrd?.lastOrderAt) : null;
                            const dotClass = !hasItems?"empty":status2?.level==="upsell"?"alert":"occ";
                            return <div key={t.id} className={`tele-table-dot ${dotClass}`} title={t.name}/>;
                          })}
                        </div>
                        {/* Occupancy bar */}
                        <div style={{height:4,background:"var(--sf3)",borderRadius:2,marginTop:6,overflow:"hidden"}}>
                          <div style={{height:"100%",width:`${occupancyPct}%`,background:occupancyPct>70?"var(--ac2)":occupancyPct>40?"var(--ac)":"var(--mu2)",borderRadius:2,transition:"width .5s ease"}}/>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SCHEDULE */}
        {view==="schedule"&&isGerente&&(
          <ScheduleManager
            store={isSuperAdmin?(rStore!=="all"?rStore:store):store}
            stores={STORES}
            isSuperAdmin={isSuperAdmin}
            storeEmployees={STORE_EMPLOYEES}
            globalAdmins={GLOBAL_ADMINS}
            schedules={schedules}
            schedWeek={schedWeek}
            setSchedWeek={setSchedWeek}
            onSave={saveSchedule}
            onApprove={approveSchedule}
            onReject={rejectSchedule}
          />
        )}

        {/* TABLE CONFIGURATOR */}
        {view==="tables-config"&&isGerente&&(
          <TableConfigurator
            store={isSuperAdmin ? (rStore!=="all"?rStore:store) : store}
            stores={STORES}
            isSuperAdmin={isSuperAdmin}
            getStoreTables={(sid)=>{
              const cfg = tableConfig[sid];
              if(cfg && cfg.length > 0) return cfg;
              const storeData = STORES.find(s=>s.id===sid);
              const count = storeData?.tables || 10;
              return Array.from({length:count},(_,i)=>({id:i+1,name:`Mesa ${i+1}`,capacity:4,x:(i%4)*120+20,y:Math.floor(i/4)*120+20,shape:"square"}));
            }}
            onSave={saveTableConfig}
            orders={orders}
            getTableStatus={getTableStatus}
          />
        )}

        {/* INVENTORY */}
        {view==="inventory"&&(employee.role==="admin"||isSuperAdmin)&&(
          <div className="repwrap">
            <div className="inv-section">
              <div className="inv-title">☕ Café</div>
              <div className="inv-grid">
                <div className={`inv-card ${shotsRem<ALERT_SHOTS?"warn":""}`}><div className="ic-label">Shots restantes</div><div className="ic-val">{openBag?shotsRem:"—"}</div></div>
                <div className="inv-card"><div className="ic-label">Shots hoy</div><div className="ic-val">{(inventory.consumptionLog||[]).filter(l=>l.day===today).reduce((s,l)=>s+l.shotsUsed,0)}</div></div>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:5}}>
                {(inventory.coffeBags||[]).slice(-5).reverse().map(b=>(
                  <div key={b.id} className="bag-row">
                    <div className={`bag-dot ${b.closed?"closed":""}`}/>
                    <div style={{flex:1}}><div style={{fontSize:12,fontWeight:600}}>{b.closed?"Cerrada":"Abierta"} — {b.shotsUsed} shots</div><div style={{fontSize:10,color:"var(--mu)"}}>{new Date(b.openedAt).toLocaleDateString("es-MX",{timeZone:TZ})}</div></div>
                    {!b.closed&&<button className="inv-btn danger" style={{fontSize:11,padding:"5px 8px"}} onClick={()=>closeCoffeeBag(b.id)}>Vacía</button>}
                  </div>
                ))}
              </div>
            </div>
            <div className="inv-section">
              <div className="inv-title">🥛 Leche por tipo</div>
              <div className="inv-grid">
                {MILK_TYPES.map(mt=>{const ml=Number((inventory.milk||{})[mt.id]||0);return(
                  <div key={mt.id} className={`inv-card ${ml<ALERT_MILK_L?"warn":""}`}>
                    <div className="ic-label">{mt.emoji} {mt.label}</div>
                    <div className="ic-val">{ml.toFixed(1)}L</div>
                    <div className="ic-sub">~{Math.floor(ml/0.22)} bebidas</div>
                    {ml<ALERT_MILK_L&&<button className="inv-btn" style={{marginTop:6,fontSize:10,padding:"4px 8px",borderColor:"var(--warn)",color:"var(--warn)"}} onClick={()=>alertVictoria("milk",mt.label)}>⚠️ Avisar Victoria</button>}
                  </div>
                );})}
              </div>
              <button className="inv-btn success" onClick={()=>setModal("milk_entry")}>+ Agregar leche</button>
            </div>
            <div className="inv-section">
              <div className="inv-title">🥐 Pan</div>
              <div className="inv-grid">
                <div className="inv-card"><div className="ic-label">Llegó</div><div className="ic-val">{todayBread.arrived}</div></div>
                <div className="inv-card"><div className="ic-label">Vendido</div><div className="ic-val">{todayBread.sold}</div></div>
                <div className={`inv-card ${todayBread.waste>2?"warn":""}`}><div className="ic-label">Merma</div><div className="ic-val">{todayBread.waste}</div></div>
                <div className="inv-card"><div className="ic-label">Disponible</div><div className="ic-val">{Math.max(0,todayBread.arrived-todayBread.sold-todayBread.waste)}</div></div>
              </div>
              <button className="inv-btn success" onClick={()=>setModal("bread_entry")}>🥐 Registrar pan</button>
            </div>
            <div className="inv-section">
              <div className="inv-title">🥤 Desechables</div>
              <div className="inv-grid">
                {Object.entries(inventory.disposables||{}).map(([name,data])=>(
                  <div key={name} className="inv-card"><div className="ic-label" style={{fontSize:9}}>{name}</div><div className="ic-val">{data.used||0}</div><div className="ic-sub">usados</div></div>
                ))}
                {Object.keys(inventory.disposables||{}).length===0&&<div style={{fontSize:12,color:"var(--mu)"}}>Se registran con órdenes para llevar</div>}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ════ MODALS ════ */}
      {modal==="customize"&&mdata.item&&<CustomizeModal item={mdata.item} onAdd={built=>{addItem(built);setModal(null);}} onClose={()=>setModal(null)}/>}

      {modal==="comanda"&&(
        <div className="ov" onClick={()=>setModal(null)}>
          <div className="mod" onClick={e=>e.stopPropagation()}>
            <div className="mdrag"/>
            <h2>Comanda — Mesa {selTable}</h2>
            {["barra","cocina"].map(station=>{
              const its=(cur.items||[]).filter(i=>i.station===station);if(!its.length)return null;
              return(
                <div key={station} className="csheet">
                  <h3>{station==="barra"?"☕ BARRA":"🍳 COCINA"} — Mesa {selTable} {cur.mode==="takeout"?"· LLEVAR":""}</h3>
                  {its.map(i=>(
                    <div key={i.lineId}>
                      <div className="cline"><span className="cqty">{i.qty}×</span><span>{i.name}{i.size?` (${i.size==="grande"?"Grande":"Med."})`:""}</span></div>
                      {(i.milk||(i.extras&&i.extras.length>0))&&<div className="cmod">{[i.milk&&`Leche ${i.milk}`,...(i.extras||[]).map(e=>e.label)].filter(Boolean).join(" · ")}</div>}
                    </div>
                  ))}
                  {cur.note&&<div style={{borderTop:"1px dashed #ccc",marginTop:8,paddingTop:7,fontSize:11,color:"#666"}}>Nota: {cur.note}</div>}
                </div>
              );
            })}
            <div className="mbtns">
              <button className="mb" style={{borderColor:"var(--ac3)",color:"var(--ac3)"}} onClick={()=>printTicket("comanda")}>🖨️ Imprimir</button>
              <button className="mb p" onClick={()=>setModal(null)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}

      {modal==="pay"&&<PayModal method={mdata.method} subtotal={total} isPaying={isPaying} onConfirm={(c,k,t)=>handlePay(mdata.method,c,k,t)} onClose={()=>setModal(null)}/>}
      {modal==="mix"&&<MixModal subtotal={total} isPaying={isPaying} onConfirm={(c,k,t)=>handlePay("mix",c,k,t)} onClose={()=>setModal(null)}/>}

      {modal==="success"&&(
        <div className="ov" onClick={()=>setModal(null)}>
          <div className="mod" onClick={e=>e.stopPropagation()} style={{alignItems:"center",textAlign:"center"}}>
            <div className="mdrag"/>
            <div className="sanim">✅</div>
            <h2>¡Cuenta cerrada!</h2>
            <p className="msub">Mesa {mdata.order?.table_num} · {fmt(mdata.order?.subtotal||0)}</p>
            {mdata.order?.discount_label&&<div className="mrow2"><span className="mlbl">Descuento</span><span className="mval" style={{color:"var(--warn)"}}>{mdata.order.discount_label}</span></div>}
            <div className="mrow2"><span className="mlbl">Método</span><span className="mval">{mdata.order?.method}</span></div>
            {mdata.order?.tip>0&&<div className="mrow2"><span className="mlbl">Propina</span><span className="mval" style={{color:"var(--ac2)"}}>{fmt(mdata.order.tip)}</span></div>}
            <div style={{background:"var(--sf2)",borderRadius:10,padding:"11px 14px",width:"100%"}}>
              <div style={{fontSize:10,color:"var(--mu)",marginBottom:3,fontFamily:"DM Mono",textTransform:"uppercase",letterSpacing:".1em"}}>Bono acumulado hoy</div>
              <div style={{fontSize:22,fontFamily:"DM Mono",color:"#f0c040"}}>{fmt(calcDailyBonus(mySales))}</div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,width:"100%"}}>
              <button className="mb" style={{borderColor:"var(--ac3)",color:"var(--ac3)"}} onClick={()=>{
                const o=mdata.order;if(!o)return;
                const win=window.open("","_blank","width=300,height=600");
                if(win){const lines=(o.items||[]).map(i=>`${i.qty}x ${i.name}  $${(i.price*i.qty).toFixed(0)}`).join("<br>");win.document.write(`<html><head><title>Ticket</title><style>body{font-family:monospace;font-size:14px;margin:8px;line-height:1.6;}@media print{body{margin:0;}}</style></head><body><div style="text-align:center"><b>CHE' CHE' CAFE</b></div><div style="text-align:center">${o.store_name||""}</div><div style="text-align:center">Mesa ${o.table_num} &nbsp; ${o.mode==="takeout"?"PARA LLEVAR":"SALON"}</div><hr/>${lines}<hr/>${o.discount_label?`<div>Descuento: -$${((o.subtotal_before_disc||0)-(o.subtotal||0)).toFixed(0)}</div>`:""}<b>TOTAL: $${o.subtotal.toFixed(0)}</b><br/>Método: ${o.method}${o.tip>0?`<br/>Propina: $${o.tip.toFixed(0)}`:""}<hr/><div style="text-align:center">¡Gracias!</div></body></html>`);win.document.close();setTimeout(()=>win.print(),300);}
              }}>🖨️ Ticket</button>
              <button className="mb p" onClick={()=>setModal(null)}>Continuar →</button>
            </div>
          </div>
        </div>
      )}

      {modal==="bread_entry"&&(
        <div className="ov" onClick={()=>setModal(null)}>
          <div className="mod" onClick={e=>e.stopPropagation()}>
            <div className="mdrag"/>
            <h2>🥐 Registrar pan</h2>
            <BreadEntryModal todayBread={todayBread} onSave={(type,qty)=>{addBread(type,qty);setModal(null);}} onClose={()=>setModal(null)}/>
          </div>
        </div>
      )}

      {modal==="milk_entry"&&(
        <div className="ov" onClick={()=>setModal(null)}>
          <div className="mod" onClick={e=>e.stopPropagation()}>
            <div className="mdrag"/>
            <h2>🥛 Registrar leche</h2>
            <MilkEntryModal milkStock={inventory.milk||{}} onSave={(type,liters)=>{addMilk(type,liters);setModal(null);}} onClose={()=>setModal(null)}/>
          </div>
        </div>
      )}

      {modal==="close_bag"&&(
        <div className="ov" onClick={()=>setModal(null)}>
          <div className="mod" onClick={e=>e.stopPropagation()}>
            <div className="mdrag"/>
            <h2>☕ Cerrar bolsa de café</h2>
            <p className="msub">¿Confirmas que la bolsa está vacía?</p>
            {openBag&&(
              <div style={{background:"var(--sf2)",border:"1px solid var(--bd)",borderRadius:10,padding:"12px",display:"flex",flexDirection:"column",gap:6}}>
                <div className="mrow2"><span className="mlbl">Shots usados</span><span className="mval">{openBag.shotsUsed}</span></div>
                <div className="mrow2"><span className="mlbl">Shots restantes est.</span><span className="mval" style={{color:shotsRem<5?"var(--err)":"var(--warn)"}}>{shotsRem}</span></div>
              </div>
            )}
            <div className="mbtns">
              <button className="mb" onClick={()=>setModal(null)}>Cancelar</button>
              <button className="mb danger" onClick={()=>{closeCoffeeBag(openBag?.id);setModal(null);}}>Confirmar vacía</button>
            </div>
          </div>
        </div>
      )}

      {modal==="cash_entry"&&<CashEntryModal employee={employee} onSave={(type,amount,desc,photo)=>{addCashEntry(type,amount,desc,photo);setModal(null);}} onClose={()=>setModal(null)}/>}

      {modal==="checkin"&&(
        <div className="ov" onClick={()=>setModal(null)}>
          <div className="mod" onClick={e=>e.stopPropagation()}>
            <div className="mdrag"/>
            <h2>🕐 Check-in de turno</h2>
            {SHIFTS.map(shift=>{
              const key=`${employee.id}_${today}`;
              const existing=(attendance[key]||[]).find(a=>a.shift===shift.id);
              return(
                <button key={shift.id} className={`ba-btn ${existing?"success":""}`} style={{padding:"14px 12px"}} onClick={()=>{
                  if(!existing){const late=checkIn(shift.id);setModal(null);if(late)alert(`⚠️ Retardo en ${shift.name}`);else alert(`✅ Check-in registrado — ${shift.name}`);}
                }}>
                  <span style={{fontSize:16}}>🕐</span>
                  <div style={{flex:1,textAlign:"left"}}>
                    <div style={{fontWeight:700}}>{shift.name} — {shift.label}</div>
                    {existing&&<div style={{fontSize:11,color:existing.late?"var(--err)":"var(--ac2)"}}>{existing.late?"⚠️ Retardo":"✅ Registrado"} {new Date(existing.time).toLocaleTimeString("es-MX",{hour:"2-digit",minute:"2-digit"})}</div>}
                  </div>
                </button>
              );
            })}
            <div className="mbtns"><button className="mb" onClick={()=>setModal(null)}>Cerrar</button></div>
          </div>
        </div>
      )}

      {modal==="pending"&&(
        <div className="ov" onClick={()=>setModal(null)}>
          <div className="mod" onClick={e=>e.stopPropagation()}>
            <div className="mdrag"/>
            <h2>⏳ Gastos pendientes</h2>
            {pendingExpenses.map(e=>(
              <div key={e.id} style={{background:"var(--sf2)",border:"1px solid var(--bd)",borderRadius:10,padding:"12px",display:"flex",flexDirection:"column",gap:6}}>
                <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontWeight:600}}>{e.description}</span><span style={{fontFamily:"DM Mono",color:"var(--err)"}}>{fmt(e.amount)}</span></div>
                <div style={{fontSize:11,color:"var(--mu)"}}>{e.employee}</div>
                {e.photo&&<img src={e.photo} alt="comprobante" style={{width:"100%",borderRadius:8,maxHeight:200,objectFit:"cover"}}/>}
                {(employee.id===VICTORIA_ID||isSuperAdmin)&&<button className="mb p" onClick={()=>approveExpense(e.id)}>✅ Autorizar</button>}
              </div>
            ))}
            {pendingExpenses.length===0&&<div style={{textAlign:"center",color:"var(--mu)",padding:"20px 0"}}>Sin pendientes</div>}
            <div className="mbtns"><button className="mb" onClick={()=>setModal(null)}>Cerrar</button></div>
          </div>
        </div>
      )}

      {modal==="emp_drink"&&<EmpDrinkModal employee={employee} todayCons={todayEmpCons}
        onAdd={async(drink,size,milk)=>{
          const today2=dayKey();const key=`${employee.id}_${today2}`;
          const cur2=empCons[key]||{count:0,items:[],charges:0};
          const isFree=cur2.count<2;const milkExtra=(milk==="almendra"||milk==="avena")?10:0;
          const basePrice=size==="grande"?(drink.grPrice||drink.medPrice):drink.medPrice;
          const charge=isFree?milkExtra:Math.round((basePrice+milkExtra)*0.6);
          const entry={ts:nowISO(),name:drink.name,size,milk:EMP_MILK.find(m=>m.id===milk)?.label||"",basePrice,charge,isFree};
          const nd={count:cur2.count+1,items:[...cur2.items,entry],charges:cur2.charges+charge};
          setEmpCons(p=>({...p,[key]:nd}));
          await sb.upsert("emp_consumption",{key,data:nd,updated_at:nowISO()});
          setModal(null);
        }}
        onClose={()=>setModal(null)}/>}
    </>
  );

  function printTicket(type="comanda"){
    const items=cur.items||[];
    const barraItems=items.filter(i=>i.station==="barra");
    const cocinaItems=items.filter(i=>i.station==="cocina");
    const mode=cur.mode==="takeout"?"PARA LLEVAR":"SALON";
    const now=new Date().toLocaleTimeString("es-MX",{timeZone:TZ,hour:"2-digit",minute:"2-digit"});
    const date=new Date().toLocaleDateString("es-MX",{timeZone:TZ,day:"2-digit",month:"2-digit",year:"numeric"});
    const formatItems=(its)=>its.map(i=>{let line=`${i.qty}x ${i.name}`;if(i.size)line+=` (${i.size==="grande"?"Grande":"Med."})`;let mods=[i.milk&&`Leche ${i.milk}`,...(i.extras||[]).map(e=>e.label)].filter(Boolean);if(mods.length)line+=`\n   -> ${mods.join(", ")}`;if(type==="ticket")line+=`  $${(i.price*i.qty).toFixed(0)}`;return line;}).join("\n");
    let content="";
    if(type==="comanda"){
      if(barraItems.length){content+=`================================\n   CHE CHE CAFE - ${storeObj?.short||""} - BARRA\n================================\nMesa ${selTable}  ${mode}  ${now}\n--------------------------------\n${formatItems(barraItems)}\n`;if(cur.note)content+=`--------------------------------\nNota: ${cur.note}\n`;content+=`================================\n\n`;}
      if(cocinaItems.length){content+=`================================\n   CHE CHE CAFE - ${storeObj?.short||""} - COCINA\n================================\nMesa ${selTable}  ${mode}  ${now}\n--------------------------------\n${formatItems(cocinaItems)}\n`;if(cur.note)content+=`--------------------------------\nNota: ${cur.note}\n`;content+=`================================\n`;}
    }else{
      content+=`================================\n       CHE' CHE' CAFE\n   ${storeObj?.name||""}\n================================\n${date}  ${now}\nMesa: ${selTable}  ${mode}\nAtendio: ${employee.name}\n--------------------------------\n${formatItems(items)}\n--------------------------------\n`;
      if(discount)content+=`Descuento ${discount.label}: -$${discAmount.toFixed(0)}\n`;
      content+=`TOTAL: $${total.toFixed(0)}\n================================\n   ¡Gracias por su visita!\n================================\n`;
    }
    const win=window.open("","_blank","width=300,height=600");
    if(win){win.document.write(`<html><head><title>Ticket</title><style>body{font-family:monospace;font-size:14px;white-space:pre;margin:8px;line-height:1.4;}@media print{body{margin:0;font-size:12px;}}</style></head><body>${content.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br>")}</body></html>`);win.document.close();setTimeout(()=>win.print(),300);}
  }
}

// ── COMPONENTS ────────────────────────────────────────────
function CustomizeModal({item,onAdd,onClose}){
  const [size,setSize]=useState(null);const [milk,setMilk]=useState(item.hasMilk?"entera":null);const [extras,setExtras]=useState([]);
  const milkExtra=(MILK_OPTIONS.find(m=>m.id===milk)?.extra)||0;const extrasSum=extras.reduce((s,e)=>s+e.price,0);
  const basePrice=size==="grande"?(item.grPrice||item.medPrice||0):size==="mediano"?(item.medPrice||item.price||0):(item.price||item.medPrice||0);
  const finalPrice=basePrice+milkExtra+extrasSum;const canAdd=!item.hasSizes||size!==null;
  const toggle=ex=>setExtras(p=>p.find(e=>e.id===ex.id)?p.filter(e=>e.id!==ex.id):[...p,ex]);
  return(
    <div className="ov" onClick={onClose}>
      <div className="mod" onClick={e=>e.stopPropagation()}>
        <div className="mdrag"/>
        <h2>{item.name}</h2>
        {item.note&&<p className="msub">{item.note}</p>}
        {item.hasSizes&&<><span className="ssep">Tamaño</span><div className="ogrid"><button className={`obtn ${size==="mediano"?"sel":""}`} onClick={()=>setSize("mediano")}><span className="oblbl">☕ Mediano</span><span className="obprice">{fmt(item.medPrice||item.price)}</span></button><button className={`obtn ${size==="grande"?"sel":""}`} onClick={()=>setSize("grande")}><span className="oblbl">🥤 Grande</span><span className="obprice">{fmt(item.grPrice||item.medPrice)}</span></button></div></>}
        {item.hasMilk&&<><span className="ssep">Leche</span><div style={{display:"flex",flexDirection:"column",gap:5}}>{MILK_OPTIONS.map(m=><div key={m.id} className={`ckrow ${milk===m.id?"sel":""}`} onClick={()=>setMilk(m.id)}><div className="ckbox">{milk===m.id?"✓":""}</div><span className="cklbl">{m.label}</span><span className="ckprice">{m.extra>0?`+${fmt(m.extra)}`:"incluida"}</span></div>)}</div></>}
        {item.hasFoodExtras&&<><span className="ssep">Extras</span><div style={{display:"flex",flexDirection:"column",gap:5}}>{FOOD_EXTRAS.map(ex=>{const sel=extras.find(e=>e.id===ex.id);return<div key={ex.id} className={`ckrow ${sel?"sel":""}`} onClick={()=>toggle(ex)}><div className="ckbox">{sel?"✓":""}</div><span className="cklbl">{ex.label}</span><span className="ckprice">+{fmt(ex.price)}</span></div>;})}</div></>}
        {item.hasCocktailExtras&&<><span className="ssep">Extras</span><div style={{display:"flex",flexDirection:"column",gap:5}}>{COCKTAIL_EXTRAS.map(ex=>{const sel=extras.find(e=>e.id===ex.id);return<div key={ex.id} className={`ckrow ${sel?"sel":""}`} onClick={()=>toggle(ex)}><div className="ckbox">{sel?"✓":""}</div><span className="cklbl">{ex.label}</span><span className="ckprice">+{fmt(ex.price)}</span></div>;})}</div></>}
        <div className="mrow2"><span className="mlbl">Total</span><span className="mval big">{fmt(finalPrice)}</span></div>
        <div className="mbtns"><button className="mb" onClick={onClose}>Cancelar</button><button className="mb p" onClick={()=>onAdd({...item,price:finalPrice,size,milk:milk&&milk!=="entera"?MILK_OPTIONS.find(m=>m.id===milk)?.label:null,extras})} disabled={!canAdd}>{canAdd?`Agregar ${fmt(finalPrice)}`:"Elige tamaño"}</button></div>
      </div>
    </div>
  );
}

function PayModal({method,subtotal,onConfirm,onClose,isPaying=false}){
  const [cash,setCash]=useState("");const [tip,setTip]=useState(0);const [customTip,setCustomTip]=useState("");
  const change=cash?Math.max(0,parseFloat(cash)-subtotal):0;const tipAmt=customTip?parseFloat(customTip)||0:subtotal*tip;
  return(
    <div className="ov" onClick={onClose}>
      <div className="mod" onClick={e=>e.stopPropagation()}>
        <div className="mdrag"/>
        <h2>{method==="cash"?"💵 Efectivo":"💳 Tarjeta"}</h2>
        <div className="mrow2"><span className="mlbl">Total</span><span className="mval big">{fmt(subtotal)}</span></div>
        {method==="cash"&&<><span className="mlabel2">Con cuánto paga</span><input className="minput" type="number" placeholder="Ej. 200" value={cash} onChange={e=>setCash(e.target.value)} autoFocus/>{cash&&<div className="mrow2"><span className="mlbl">Cambio</span><span className="mval" style={{color:"var(--ac2)"}}>{fmt(change)}</span></div>}</>}
        <span className="mlabel2">Propina</span>
        <div className="tip-row">{[0,.10,.15,.20].map(p=><button key={p} className={`tip-chip ${tip===p&&!customTip?"sel":""}`} onClick={()=>{setTip(p);setCustomTip("");}}>{p===0?"Sin propina":`${p*100}% · ${fmt(subtotal*p)}`}</button>)}</div>
        <input className="minput" type="number" placeholder="O monto manual…" value={customTip} onChange={e=>{setCustomTip(e.target.value);setTip(0);}}/>
        {tipAmt>0&&<div className="mrow2"><span className="mlbl">Propina</span><span className="mval" style={{color:"var(--ac2)"}}>{fmt(tipAmt)}</span></div>}
        <div className="mbtns"><button className="mb" onClick={onClose}>Cancelar</button><button className="mb p" disabled={isPaying} onClick={()=>onConfirm(method==="cash"?subtotal:0,method==="card"?subtotal:0,tipAmt)}>{isPaying?"Procesando…":"Confirmar"}</button></div>
      </div>
    </div>
  );
}

function MixModal({subtotal,onConfirm,onClose,isPaying=false}){
  const [cash,setCash]=useState("");const [tip,setTip]=useState(0);const [customTip,setCustomTip]=useState("");
  const card=Math.max(0,subtotal-(parseFloat(cash)||0));const tipAmt=customTip?parseFloat(customTip)||0:subtotal*tip;
  return(
    <div className="ov" onClick={onClose}>
      <div className="mod" onClick={e=>e.stopPropagation()}>
        <div className="mdrag"/>
        <h2>⚡ Pago Combinado</h2>
        <div className="mrow2"><span className="mlbl">Total</span><span className="mval big">{fmt(subtotal)}</span></div>
        <span className="mlabel2">Monto en efectivo</span>
        <input className="minput" type="number" placeholder="Ej. 100" value={cash} onChange={e=>setCash(e.target.value)} autoFocus/>
        <div className="mrow2"><span className="mlbl">Resto en tarjeta</span><span className="mval">{fmt(card)}</span></div>
        <span className="mlabel2">Propina</span>
        <div className="tip-row">{[0,.10,.15,.20].map(p=><button key={p} className={`tip-chip ${tip===p&&!customTip?"sel":""}`} onClick={()=>{setTip(p);setCustomTip("");}}>{p===0?"Sin prop.":`${p*100}% · ${fmt(subtotal*p)}`}</button>)}</div>
        <input className="minput" type="number" placeholder="Monto manual…" value={customTip} onChange={e=>{setCustomTip(e.target.value);setTip(0);}}/>
        <div className="mbtns"><button className="mb" onClick={onClose}>Cancelar</button><button className="mb p" disabled={isPaying} onClick={()=>onConfirm(parseFloat(cash)||0,card,tipAmt)}>{isPaying?"Procesando…":"Confirmar"}</button></div>
      </div>
    </div>
  );
}

function BreadEntryModal({todayBread,onSave,onClose}){
  const [type,setType]=useState("arrived");const [qty,setQty]=useState(1);
  return(
    <>
      <p className="msub">Registra cuántas piezas llegaron o hay merma</p>
      <div className="ogrid">
        <button className={`obtn ${type==="arrived"?"sel":""}`} onClick={()=>setType("arrived")}><span style={{fontSize:22}}>🥐</span><span className="oblbl">Pan llegó</span></button>
        <button className={`obtn ${type==="waste"?"sel":""}`} onClick={()=>setType("waste")}><span style={{fontSize:22}}>🗑</span><span className="oblbl">Merma</span></button>
      </div>
      <span className="ssep">Cantidad</span>
      <div style={{display:"flex",alignItems:"center",gap:12,justifyContent:"center",padding:"8px 0"}}>
        <button className="cb" style={{width:40,height:40,fontSize:22}} onClick={()=>setQty(q=>Math.max(1,q-1))}>−</button>
        <span style={{fontFamily:"DM Mono",fontSize:32,minWidth:60,textAlign:"center",color:"var(--ac)"}}>{qty}</span>
        <button className="cb" style={{width:40,height:40,fontSize:22}} onClick={()=>setQty(q=>q+1)}>+</button>
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,justifyContent:"center"}}>
        {[6,12,18,24].map(n=><button key={n} className="tip-chip" onClick={()=>setQty(n)}>{n} pzs</button>)}
      </div>
      <div className="mrow2"><span className="mlbl">Hoy: {todayBread.arrived} llegaron · {todayBread.waste} merma</span></div>
      <div className="mbtns"><button className="mb" onClick={onClose}>Cancelar</button><button className="mb p" onClick={()=>onSave(type,qty)}>Registrar {qty} pza{qty>1?"s":""}</button></div>
    </>
  );
}

function MilkEntryModal({milkStock,onSave,onClose}){
  const [milkType,setMilkType]=useState("entera");const [liters,setLiters]=useState(1);
  return(
    <>
      <p className="msub">Registra el ingreso de leche al inventario</p>
      <span className="ssep">Tipo de leche</span>
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        {MILK_TYPES.map(mt=>{const stock=Number(milkStock[mt.id]||0);return(
          <div key={mt.id} className={`ckrow ${milkType===mt.id?"sel":""}`} onClick={()=>setMilkType(mt.id)}>
            <div className="ckbox">{milkType===mt.id?"✓":""}</div>
            <span className="cklbl">{mt.emoji} {mt.label}</span>
            <span className="ckprice" style={{color:stock<3?"var(--err)":"var(--mu)"}}>{stock.toFixed(1)}L</span>
          </div>
        );})}
      </div>
      <span className="ssep">Litros que llegan</span>
      <div style={{display:"flex",alignItems:"center",gap:12,justifyContent:"center",padding:"8px 0"}}>
        <button className="cb" style={{width:40,height:40,fontSize:22}} onClick={()=>setLiters(l=>Math.max(0.5,Math.round((l-0.5)*2)/2))}>−</button>
        <span style={{fontFamily:"DM Mono",fontSize:32,minWidth:70,textAlign:"center",color:"var(--ac)"}}>{liters}L</span>
        <button className="cb" style={{width:40,height:40,fontSize:22}} onClick={()=>setLiters(l=>Math.round((l+0.5)*2)/2)}>+</button>
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,justifyContent:"center"}}>
        {[1,2,3,5,10].map(n=><button key={n} className="tip-chip" onClick={()=>setLiters(n)}>{n}L</button>)}
      </div>
      <div className="mbtns"><button className="mb" onClick={onClose}>Cancelar</button><button className="mb p" onClick={()=>onSave(milkType,liters)}>+{liters}L {MILK_TYPES.find(m=>m.id===milkType)?.label}</button></div>
    </>
  );
}

function CashEntryModal({employee,onSave,onClose}){
  const [type,setType]=useState("expense");const [amount,setAmount]=useState("");const [desc,setDesc]=useState("");const [photo,setPhoto]=useState("");
  const amt=parseFloat(amount)||0;const needsApproval=type==="expense"&&amt>100;
  const handlePhoto=(e)=>{const f=e.target.files[0];if(f){const r=new FileReader();r.onload=ev=>setPhoto(ev.target.result);r.readAsDataURL(f);}};
  return(
    <div className="ov" onClick={onClose}>
      <div className="mod" onClick={e=>e.stopPropagation()}>
        <div className="mdrag"/>
        <h2>💰 Movimiento de caja</h2>
        <div className="ogrid">
          <button className={`obtn ${type==="income"?"sel":""}`} onClick={()=>setType("income")}><span style={{fontSize:20}}>📥</span><span className="oblbl">Ingreso</span></button>
          <button className={`obtn ${type==="expense"?"sel":""}`} onClick={()=>setType("expense")}><span style={{fontSize:20}}>📤</span><span className="oblbl">Egreso</span></button>
        </div>
        <span className="mlabel2">Monto</span>
        <input className="minput" type="number" placeholder="Ej. 150" value={amount} onChange={e=>setAmount(e.target.value)}/>
        {needsApproval&&<div style={{background:"#200a0a",border:"1px solid var(--err)",borderRadius:8,padding:"8px 12px",fontSize:12,color:"var(--err)"}}>⚠️ Mayor a $100 — requiere autorización de Victoria</div>}
        <span className="mlabel2">Descripción</span>
        <input className="minput" type="text" placeholder="Ej. Compra de vasos, limpieza…" value={desc} onChange={e=>setDesc(e.target.value)}/>
        <span className="mlabel2">Foto del comprobante</span>
        <input type="file" accept="image/*" capture="environment" onChange={handlePhoto} style={{color:"var(--tx)",fontSize:13}}/>
        {photo&&<img src={photo} alt="preview" style={{width:"100%",borderRadius:8,maxHeight:160,objectFit:"cover"}}/>}
        <div className="mbtns"><button className="mb" onClick={onClose}>Cancelar</button><button className="mb p" disabled={!amount||!desc} onClick={()=>onSave(type,amt,desc,photo)}>{needsApproval?"Enviar a Victoria":"Registrar"}</button></div>
      </div>
    </div>
  );
}

function EmpDrinkModal({employee,todayCons,onAdd,onClose}){
  const [drink,setDrink]=useState(null);const [size,setSize]=useState(null);const [milk,setMilk]=useState("entera");
  const isFree=todayCons.count<2;const milkExtra=(milk==="almendra"||milk==="avena")?10:0;
  const basePrice=drink?(size==="grande"?drink.grPrice:drink.medPrice):0;
  const charge=isFree?milkExtra:Math.round((basePrice+milkExtra)*0.6);
  return(
    <div className="ov" onClick={onClose}>
      <div className="mod" onClick={e=>e.stopPropagation()}>
        <div className="mdrag"/>
        <h2>☕ Mi bebida</h2>
        <div style={{background:"#0a200a",border:"1px solid var(--ac2)",borderRadius:9,padding:"9px 12px"}}>
          <div style={{fontSize:12,color:"var(--ac2)",fontWeight:600}}>{isFree?`Bebida ${todayCons.count+1} de 2 — GRATIS`:"Bebida extra — 40% descuento"}</div>
          <div style={{fontSize:11,color:"var(--mu)",marginTop:2}}>Bebidas hoy: {todayCons.count} · Cargo: {fmt(todayCons.charges)}</div>
        </div>
        <span className="ssep">Elige tu bebida</span>
        <div className="ogrid">{EMP_DRINKS.map(d=><button key={d.id} className={`obtn ${drink?.id===d.id?"sel":""}`} onClick={()=>setDrink(d)}><span className="oblbl">{d.name}</span><span className="obprice">{fmt(d.medPrice)}</span></button>)}</div>
        {drink&&<><span className="ssep">Tamaño</span><div className="ogrid"><button className={`obtn ${size==="mediano"?"sel":""}`} onClick={()=>setSize("mediano")}><span className="oblbl">☕ Med.</span><span className="obprice">{fmt(drink.medPrice)}</span></button><button className={`obtn ${size==="grande"?"sel":""}`} onClick={()=>setSize("grande")}><span className="oblbl">🥤 Grande</span><span className="obprice">{fmt(drink.grPrice)}</span></button></div></>}
        {drink&&<><span className="ssep">Leche</span>{EMP_MILK.map(m=><div key={m.id} className={`ckrow ${milk===m.id?"sel":""}`} onClick={()=>setMilk(m.id)}><div className="ckbox">{milk===m.id?"✓":""}</div><span className="cklbl">{m.label}</span><span className="ckprice">{m.extra>0?`+$${m.extra}`:"gratis"}</span></div>)}</>}
        {drink&&size&&<div className="mrow2"><span className="mlbl">Cargo en nómina</span><span className="mval big" style={{color:isFree&&milkExtra===0?"var(--ac2)":"var(--warn)"}}>{fmt(charge)}</span></div>}
        <div className="mbtns"><button className="mb" onClick={onClose}>Cancelar</button><button className="mb p" disabled={!drink||!size} onClick={()=>onAdd(drink,size,milk)}>Registrar</button></div>
      </div>
    </div>
  );
}

// ── TABLE CONFIGURATOR ───────────────────────────────────
// ── SCHEDULE MANAGER ─────────────────────────────────────
const DAYS = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
const DAYS_FULL = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];

// Shift presets per day — index 0=Mon, 1=Tue, 2=Wed, 3=Thu, 4=Fri, 5=Sat, 6=Sun
const SHIFT_PRESETS = {
  // Lun–Jue (0-3): open 7:30am, close 10pm
  0: [
    {id:'A',  label:'Turno A',    entry:'7:00am',  exit:'3:00pm',  note:'Llegar 7:00am · Abrir 7:30am', cls:'turno-a'},
    {id:'M',  label:'Intermedio', entry:'10:00am', exit:'6:00pm',  note:'Comodín mediodía',              cls:'turno-m'},
    {id:'B',  label:'Turno B',    entry:'2:00pm',  exit:'10:00pm', note:'Cierre',                        cls:'turno-b'},
    {id:'R',  label:'Descanso',   entry:'—',       exit:'—',       note:'',                              cls:'descanso'},
  ],
  1: 'same_as_0',
  2: 'same_as_0',
  3: 'same_as_0',
  // Viernes (4): turno B una hora después, cierra 10pm
  4: [
    {id:'A',  label:'Turno A',    entry:'7:00am',  exit:'3:00pm',  note:'Llegar 7:00am · Abrir 7:30am', cls:'turno-a'},
    {id:'M',  label:'Intermedio', entry:'10:00am', exit:'6:00pm',  note:'Comodín mediodía',              cls:'turno-m'},
    {id:'B',  label:'Turno B',    entry:'3:00pm',  exit:'11:00pm', note:'Viernes: turno recorrido',      cls:'turno-b'},
    {id:'R',  label:'Descanso',   entry:'—',       exit:'—',       note:'',                              cls:'descanso'},
  ],
  // Sábado (5): abre 8am, cierra 10pm
  5: [
    {id:'A',  label:'Turno A',    entry:'7:30am',  exit:'3:30pm',  note:'Llegar 7:30am · Abrir 8:00am', cls:'turno-a'},
    {id:'M',  label:'Intermedio', entry:'11:00am', exit:'7:00pm',  note:'Pico de sábado',                cls:'turno-m'},
    {id:'B',  label:'Turno B',    entry:'3:00pm',  exit:'11:00pm', note:'Cierre sábado',                 cls:'turno-b'},
    {id:'R',  label:'Descanso',   entry:'—',       exit:'—',       note:'',                              cls:'descanso'},
  ],
  // Domingo (6): abre 9am, cierra 10pm
  6: [
    {id:'A',  label:'Turno A',    entry:'8:30am',  exit:'4:00pm',  note:'Llegar 8:30am · Abrir 9:00am', cls:'turno-a'},
    {id:'M',  label:'Intermedio', entry:'11:00am', exit:'7:00pm',  note:'Pico domingo',                  cls:'turno-m'},
    {id:'B',  label:'Turno B',    entry:'3:00pm',  exit:'11:00pm', note:'Cierre domingo',                cls:'turno-b'},
    {id:'R',  label:'Descanso',   entry:'—',       exit:'—',       note:'',                              cls:'descanso'},
  ],
};

// Helper to get presets for a day
function getDayPresets(dayIdx){
  const p = SHIFT_PRESETS[dayIdx];
  if(p === 'same_as_0') return SHIFT_PRESETS[0];
  return p;
}

// Legacy SHIFT_OPTIONS for backward compat
const SHIFT_OPTIONS = SHIFT_PRESETS[0];
const MIN_COVERAGE = {0:1,1:1,2:1,3:1,4:2,5:2,6:1};
const PEAK_DAYS = [4,5];

// ── WARNING SYSTEM ────────────────────────────────────────
const WARN_DAYS = 3; // days below goal before warning
const WARN_THRESHOLD = 0.70; // below 70% of daily goal = underperforming

function calcWarningLevel(empId, store, closedOrders, storeGoals, storeEmps){
  const goal = storeGoals[store];
  if(!goal) return null;
  const activeCount = Math.max((STORE_EMPLOYEES[store]||[]).length, 1);
  const empDailyGoal = Math.round(goal.daily / activeCount);
  const warnThreshold = empDailyGoal * WARN_THRESHOLD;

  // Get last 7 days
  const badDays = [];
  for(let i=1; i<=7; i++){
    const d = new Date();
    d.setDate(d.getDate()-i);
    const dk = new Intl.DateTimeFormat('en-CA',{timeZone:'America/Mexico_City'}).format(d);
    const dayOrds = closedOrders.filter(o=>{
      const ts = new Date((o.timestamp||'').replace(' ','T').replace(/\+00$/,'+00:00'));
      const odk = new Intl.DateTimeFormat('en-CA',{timeZone:'America/Mexico_City'}).format(ts);
      return o.employee_id===empId && odk===dk;
    });
    const daySales = dayOrds.reduce((s,o)=>s+o.subtotal,0);
    if(dayOrds.length>0 && daySales < warnThreshold){
      badDays.push({date:dk, sales:daySales, goal:empDailyGoal, pct:daySales/empDailyGoal});
    }
  }
  // Consecutive bad days from most recent
  let consecutive=0;
  for(let i=0;i<badDays.length;i++){
    if(i===0||badDays[i-1]) consecutive++;
    else break;
  }
  if(consecutive>=WARN_DAYS) return {level:'critical', days:consecutive, badDays};
  if(badDays.length>=2) return {level:'warning', days:badDays.length, badDays};
  return null;
}

function getWeekDates(weekStart){
  const dates = [];
  const base = new Date(weekStart+'T12:00:00');
  for(let i=0;i<7;i++){
    const d = new Date(base);
    d.setDate(base.getDate()+i);
    dates.push(new Intl.DateTimeFormat('es-MX',{day:'2-digit',month:'short'}).format(d));
  }
  return dates;
}

function checkCoverage(sched, employees, dayIdx){
  const workers = employees.filter(e=>{
    const shift = sched[e.id]?.[dayIdx];
    return shift && shift !== 'R';
  });
  const min = MIN_COVERAGE[dayIdx]||1;
  const isPeak = PEAK_DAYS.includes(dayIdx);
  if(isPeak && workers.length < 2) return 'low';
  if(workers.length < min) return 'low';
  if(workers.length === min) return 'warn';
  return 'ok';
}

function ScheduleManager({store,stores,isSuperAdmin,storeEmployees,globalAdmins,
  schedules,schedWeek,setSchedWeek,onSave,onApprove,onReject}){

  const [activeStore, setActiveStore] = useState(store||stores[0]?.id);
  const [localSched, setLocalSched] = useState({}); // {empId: {0:'A',1:'B',...6:'R'}}
  const [rejectModal, setRejectModal] = useState(false);
  const [rejectComment, setRejectComment] = useState('');
  const [approveModal, setApproveModal] = useState(false);
  const [dirty, setDirty] = useState(false);

  const storeObj = stores.find(s=>s.id===activeStore);
  const employees = storeEmployees[activeStore]||[];
  const schedKey = `${activeStore}_${schedWeek}`;
  const savedSched = schedules[schedKey];
  const status = savedSched?.status||'sin_guardar';
  const weekDates = getWeekDates(schedWeek);

  // Load saved schedule when store/week changes
  useEffect(()=>{
    if(savedSched?.schedule && Object.keys(savedSched.schedule).length>0){
      setLocalSched(savedSched.schedule);
    } else {
      // Auto-generate default schedule
      const auto = {};
      employees.forEach((emp,idx)=>{
        auto[emp.id] = {};
        for(let d=0;d<7;d++){
          // Rotate day off: emp 0 rests Mon, emp 1 rests Tue, etc.
          const restDay = idx % 7;
          auto[emp.id][d] = d===restDay ? 'R' : (idx % 2 === 0 ? 'A' : 'B');
        }
      });
      setLocalSched(auto);
    }
    setDirty(false);
  },[activeStore, schedWeek]);

  const setShift = (empId, day, shift) => {
    setLocalSched(prev=>{
      const empSched = {...(prev[empId]||{})};
      // Enforce 1 rest day per week
      if(shift==='R'){
        // Remove other rest days first
        Object.keys(empSched).forEach(d=>{ if(empSched[d]==='R') empSched[d]='A'; });
      }
      empSched[day] = shift;
      return {...prev,[empId]:empSched};
    });
    setDirty(true);
  };

  const cycleShift = (empId, day) => {
    const presets = getDayPresets(day);
    const cur = localSched[empId]?.[day]||'A';
    const idx = presets.findIndex(s=>s.id===cur);
    const next = presets[(idx+1)%presets.length].id;
    setShift(empId, day, next);
  };

  const prevWeek = () => {
    const d = new Date(schedWeek+'T12:00:00');
    d.setDate(d.getDate()-7);
    setSchedWeek(new Intl.DateTimeFormat('en-CA',{timeZone:'America/Mexico_City'}).format(d));
  };
  const nextWeek = () => {
    const d = new Date(schedWeek+'T12:00:00');
    d.setDate(d.getDate()+7);
    setSchedWeek(new Intl.DateTimeFormat('en-CA',{timeZone:'America/Mexico_City'}).format(d));
  };

  // Count shifts per employee
  const empStats = (empId) => {
    const s = localSched[empId]||{};
    const work = Object.values(s).filter(v=>v&&v!=='R').length;
    const rest = Object.values(s).filter(v=>v==='R').length;
    const turnoA = Object.values(s).filter(v=>v==='A').length;
    const turnoB = Object.values(s).filter(v=>v==='B').length;
    return {work,rest,turnoA,turnoB};
  };

  const canEdit = !isSuperAdmin && (status==='sin_guardar'||status==='rechazado');
  const canApprove = isSuperAdmin && status==='pendiente';
  const canReject = isSuperAdmin && status==='pendiente';

  return(
    <div style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column",background:"var(--bg)"}}>
      {/* Store selector */}
      {isSuperAdmin&&(
        <div style={{padding:"8px 12px",background:"var(--sf)",borderBottom:"1px solid var(--bd)",display:"flex",gap:6,overflowX:"auto",flexShrink:0}}>
          {stores.map(s=>(
            <button key={s.id}
              style={{padding:"5px 12px",borderRadius:20,fontSize:11,fontWeight:700,
                border:`1.5px solid ${activeStore===s.id?s.color:s.color+"44"}`,
                background:activeStore===s.id?s.color+"22":"var(--sf2)",color:s.color,
                cursor:"pointer",whiteSpace:"nowrap"}}
              onClick={()=>setActiveStore(s.id)}>{s.short}
              {schedules[`${s.id}_${schedWeek}`]?.status==='pendiente'&&
                <span style={{marginLeft:4,background:"var(--ac)",color:"#0f0f0e",borderRadius:8,padding:"0 5px",fontSize:9}}>!</span>}
            </button>
          ))}
        </div>
      )}

      {/* Toolbar */}
      <div className="sched-toolbar">
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <button className="cb" onClick={prevWeek}>‹</button>
          <span style={{fontFamily:"DM Mono,monospace",fontSize:12,minWidth:120,textAlign:"center"}}>
            Semana del {schedWeek}
          </span>
          <button className="cb" onClick={nextWeek}>›</button>
        </div>
        <div style={{fontSize:13,fontWeight:700,color:"var(--tx)"}}>{storeObj?.name}</div>
        <div className="tsp"/>
        {/* Status badge */}
        <span className={`sched-status ${status==='aprobado'?'aprobado':status==='rechazado'?'rechazado':'pendiente'}`}>
          {status==='aprobado'?'✅ Aprobado':status==='rechazado'?'❌ Rechazado':status==='pendiente'?'⏳ En revisión':'📝 Sin guardar'}
        </span>
        {savedSched?.comment&&(
          <span style={{fontSize:11,color:"var(--mu)",fontStyle:"italic",maxWidth:200,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
            "{savedSched.comment}"
          </span>
        )}
        {/* Actions */}
        {canEdit&&dirty&&(
          <button className="mb p" style={{padding:"6px 14px",fontSize:12}}
            onClick={()=>{onSave(activeStore,schedWeek,localSched,'pendiente','');setDirty(false);}}>
            📤 Enviar a aprobación
          </button>
        )}
        {canEdit&&!dirty&&status==='sin_guardar'&&(
          <button className="ba-btn success" style={{padding:"6px 12px",fontSize:12}}
            onClick={()=>{onSave(activeStore,schedWeek,localSched,'pendiente','');setDirty(false);}}>
            📤 Enviar
          </button>
        )}
        {canApprove&&(
          <button className="mb p" style={{padding:"6px 14px",fontSize:12,background:"#0a200a",borderColor:"var(--ac2)",color:"var(--ac2)"}}
            onClick={()=>setApproveModal(true)}>✅ Aprobar</button>
        )}
        {canReject&&(
          <button className="mb" style={{padding:"6px 14px",fontSize:12,borderColor:"var(--err)",color:"var(--err)"}}
            onClick={()=>setRejectModal(true)}>❌ Rechazar</button>
        )}
      </div>

      {/* Legend */}
      <div style={{display:"flex",gap:8,padding:"6px 14px",background:"var(--sf)",borderBottom:"1px solid var(--bd)",flexShrink:0,flexWrap:"wrap",alignItems:"center"}}>
        {getDayPresets(new Date().getDay()===0?6:new Date().getDay()-1).map(s=>(
          <span key={s.id} style={{display:"flex",alignItems:"center",gap:4,fontSize:10}}>
            <span className={`shift-cell ${s.cls}`} style={{padding:"2px 7px",minHeight:"auto",borderRadius:5,fontSize:9}}>{s.label}</span>
            {s.entry!=='—'&&<span style={{color:"var(--mu)",fontFamily:"DM Mono,monospace",fontSize:9}}>{s.entry}–{s.exit}</span>}
          </span>
        ))}
        <span style={{color:"var(--mu)",fontSize:10,marginLeft:4}}>· Toca para cambiar · Horarios según día</span>
      </div>

      {/* Schedule grid */}
      <div style={{flex:1,overflow:"auto",padding:12}}>
        <table className="sched-table">
          <thead>
            <tr>
              <th style={{textAlign:"left",minWidth:120}}>Empleado</th>
              {DAYS.map((d,i)=>(
                <th key={d}>
                  <div>{d}</div>
                  <div style={{fontSize:9,color:"var(--mu2)",fontWeight:400}}>{weekDates[i]}</div>
                  {/* Coverage indicator */}
                  <div style={{marginTop:3}}>
                    {(()=>{
                      const cov = checkCoverage(localSched,employees,i);
                      const cnt = employees.filter(e=>(localSched[e.id]?.[i]||'A')!=='R').length;
                      return(
                        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:1}}>
                          <span style={{fontSize:9,color:cov==='ok'?"var(--ac2)":cov==='warn'?"var(--warn)":"var(--err)",fontFamily:"DM Mono,monospace"}}>{cnt}👤</span>
                          <div className={`coverage-bar coverage-${cov}`} style={{width:"80%"}}/>
                        </div>
                      );
                    })()}
                  </div>
                </th>
              ))}
              <th>Resumen</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp=>{
              const stats = empStats(emp.id);
              return(
                <tr key={emp.id}>
                  <td>
                    <div className="emp-row-name">{emp.name}</div>
                    <div style={{fontSize:10,color:"var(--mu)",paddingLeft:8,fontFamily:"DM Mono,monospace"}}>
                      {emp.role==="gerente"?"Gerente":"Barista"}
                    </div>
                  </td>
                  {[0,1,2,3,4,5,6].map(day=>{
                    const shift = localSched[emp.id]?.[day]||'A';
                    const dayPresets = getDayPresets(day);
                    const opt = dayPresets.find(s=>s.id===shift)||dayPresets[0];
                    return(
                      <td key={day}>
                        <div className={`shift-cell ${opt.cls}`}
                          style={{opacity:(!canEdit&&status!=='sin_guardar'&&!isSuperAdmin)?0.7:1}}
                          onClick={()=>(canEdit||isSuperAdmin)?cycleShift(emp.id,day):null}
                          title={opt.note||opt.label}>
                          <span style={{fontSize:10,fontWeight:700}}>{opt.label}</span>
                          {opt.entry!=='—'&&<span style={{fontSize:8,opacity:.75}}>{opt.entry}–{opt.exit}</span>}
                          {opt.id==='R'&&<span style={{fontSize:9}}>🏖</span>}
                        </div>
                      </td>
                    );
                  })}
                  <td>
                    <div style={{fontSize:10,fontFamily:"DM Mono,monospace",display:"flex",flexDirection:"column",gap:2,padding:"2px 4px"}}>
                      <span style={{color:"var(--ac2)"}}>✓ {stats.work} días</span>
                      <span style={{color:"var(--err)"}}>✗ {stats.rest} desc.</span>
                      <span style={{color:"var(--ac3)"}}>A:{stats.turnoA} B:{stats.turnoB}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {employees.length===0&&(
          <div style={{textAlign:"center",color:"var(--mu)",padding:"40px 0",fontSize:13}}>
            Sin empleados registrados para esta tienda
          </div>
        )}

        {/* Coverage summary */}
        <div style={{marginTop:16,background:"var(--sf)",border:"1px solid var(--bd)",borderRadius:12,padding:14}}>
          <div style={{fontSize:12,fontWeight:700,marginBottom:8}}>Análisis de cobertura por día</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:6}}>
            {DAYS.map((d,i)=>{
              const cov = checkCoverage(localSched,employees,i);
              const cnt = employees.filter(e=>(localSched[e.id]?.[i]||'A')!=='R').length;
              const isPeak = PEAK_DAYS.includes(i);
              return(
                <div key={d} style={{background:"var(--sf2)",borderRadius:8,padding:"8px 6px",textAlign:"center",
                  border:`1px solid ${cov==='ok'?"var(--ac2)44":cov==='warn'?"var(--warn)44":"var(--err)44"}`}}>
                  <div style={{fontSize:11,fontWeight:700,color:"var(--tx)"}}>{d}</div>
                  <div style={{fontFamily:"DM Mono,monospace",fontSize:16,color:cov==='ok'?"var(--ac2)":cov==='warn'?"var(--warn)":"var(--err)",fontWeight:700}}>{cnt}</div>
                  <div style={{fontSize:9,color:"var(--mu)"}}>personas</div>
                  {isPeak&&<div style={{fontSize:8,color:"var(--ac)",marginTop:2}}>★ pico</div>}
                  {cov==='low'&&<div style={{fontSize:8,color:"var(--err)",marginTop:2}}>⚠ falta cobertura</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reject modal */}
      {rejectModal&&(
        <div className="ov" onClick={()=>setRejectModal(false)}>
          <div className="mod" onClick={e=>e.stopPropagation()}>
            <div className="mdrag"/>
            <h2>❌ Rechazar horario</h2>
            <p className="msub">Explica qué hay que corregir para que el gerente lo ajuste</p>
            <textarea className="onote" rows={4} style={{width:"100%"}}
              placeholder="Ej. Falta cobertura el viernes, Bertha no puede ese día..."
              value={rejectComment} onChange={e=>setRejectComment(e.target.value)}/>
            <div className="mbtns">
              <button className="mb" onClick={()=>setRejectModal(false)}>Cancelar</button>
              <button className="mb danger" disabled={!rejectComment}
                onClick={()=>{onReject(activeStore,schedWeek,rejectComment);setRejectModal(false);setRejectComment('');}}>
                Rechazar y notificar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Approve modal */}
      {approveModal&&(
        <div className="ov" onClick={()=>setApproveModal(false)}>
          <div className="mod" onClick={e=>e.stopPropagation()}>
            <div className="mdrag"/>
            <h2>✅ Aprobar horario</h2>
            <p className="msub">Semana del {schedWeek} · {storeObj?.name}</p>
            <p style={{fontSize:13,color:"var(--mu)"}}>
              Al aprobar, el horario se publica para todos los empleados de la tienda.
            </p>
            <div className="mbtns">
              <button className="mb" onClick={()=>setApproveModal(false)}>Cancelar</button>
              <button className="mb p"
                onClick={()=>{onApprove(activeStore,schedWeek,'Aprobado');setApproveModal(false);}}>
                ✅ Confirmar aprobación
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TableConfigurator({store,stores,isSuperAdmin,getStoreTables,onSave,orders,getTableStatus}){
  const [activeStore,setActiveStore] = useState(store||stores[0]?.id);
  const [tables,setTables] = useState(()=>getStoreTables(activeStore));
  const [selected,setSelected] = useState(null);
  const [editModal,setEditModal] = useState(false);
  const [editData,setEditData] = useState({});
  const canvasRef = useRef();
  const dragRef = useRef(null);

  // Switch store
  const switchStore = (sid) => {
    setActiveStore(sid);
    setTables(getStoreTables(sid));
    setSelected(null);
  };

  const handlePointerDown = (e,tId) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if(!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const t = tables.find(t=>t.id===tId);
    dragRef.current = {
      tId,
      startX: (e.touches?e.touches[0].clientX:e.clientX) - rect.left - t.x,
      startY: (e.touches?e.touches[0].clientY:e.clientY) - rect.top - t.y,
    };
    setSelected(tId);
  };

  const handlePointerMove = (e) => {
    if(!dragRef.current) return;
    const canvas = canvasRef.current;
    if(!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const cx = (e.touches?e.touches[0].clientX:e.clientX) - rect.left;
    const cy = (e.touches?e.touches[0].clientY:e.clientY) - rect.top;
    const newX = Math.max(0, Math.min(cx - dragRef.current.startX, rect.width-80));
    const newY = Math.max(0, Math.min(cy - dragRef.current.startY, rect.height-70));
    setTables(prev=>prev.map(t=>t.id===dragRef.current.tId?{...t,x:newX,y:newY}:t));
  };

  const handlePointerUp = () => {
    if(dragRef.current) { dragRef.current = null; }
  };

  const addTable = () => {
    const newId = Math.max(0,...tables.map(t=>t.id))+1;
    setTables(prev=>[...prev,{id:newId,name:`Mesa ${newId}`,capacity:4,x:20,y:20,shape:"square"}]);
  };

  const removeTable = (id) => {
    setTables(prev=>prev.filter(t=>t.id!==id));
    setSelected(null);
  };

  const openEdit = (t) => { setEditData({...t}); setEditModal(true); };
  const saveEdit = () => {
    setTables(prev=>prev.map(t=>t.id===editData.id?{...editData}:t));
    setEditModal(false);
  };

  const sel = selected ? tables.find(t=>t.id===selected) : null;

  return(
    <div style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column",background:"var(--bg)"}}>
      {/* Store selector for superadmin */}
      {isSuperAdmin&&(
        <div style={{padding:"8px 12px",background:"var(--sf)",borderBottom:"1px solid var(--bd)",display:"flex",gap:6,overflowX:"auto"}}>
          {stores.map(s=>(
            <button key={s.id} className={`sfbtn ${activeStore===s.id?"on":""}`}
              style={{padding:"5px 12px",borderRadius:20,fontSize:11,fontWeight:700,border:`1.5px solid ${activeStore===s.id?s.color:s.color+"44"}`,background:activeStore===s.id?s.color+"22":"var(--sf2)",color:s.color,cursor:"pointer",whiteSpace:"nowrap"}}
              onClick={()=>switchStore(s.id)}>{s.short}</button>
          ))}
        </div>
      )}

      <div style={{padding:"10px 12px",background:"var(--sf)",borderBottom:"1px solid var(--bd)",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
        <div>
          <div style={{fontSize:14,fontWeight:700}}>🪑 Configurar mesas — {stores.find(s=>s.id===activeStore)?.name}</div>
          <div style={{fontSize:11,color:"var(--mu)"}}>Arrastra las mesas para acomodarlas · Toca para editar</div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button className="ba-btn success" style={{padding:"8px 12px"}} onClick={addTable}>+ Mesa</button>
          <button className="mb p" style={{padding:"8px 14px",fontSize:13}} onClick={()=>onSave(activeStore,tables)}>💾 Guardar</button>
        </div>
      </div>

      <div style={{flex:1,overflow:"hidden",display:"flex",gap:0}}>
        {/* Canvas */}
        <div
          ref={canvasRef}
          className="table-canvas"
          style={{flex:1,margin:10,minHeight:400,position:"relative"}}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}>
          {/* Grid dots */}
          <svg style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",opacity:.15}}>
            <defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1" fill="var(--mu)"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#grid)"/>
          </svg>
          {/* Tables */}
          {tables.map(t=>{
            const occ = orders[t.id]?.items?.length>0;
            const status = occ ? getTableStatus(orders[t.id]?.seatedAt, orders[t.id]?.lastOrderAt) : null;
            return(
              <div key={t.id}
                className={`tc-draggable ${occ?"occupied":""} ${selected===t.id?"selected":""}`}
                style={{
                  left:t.x, top:t.y,
                  width:t.shape==="round"?72:80,
                  height:t.shape==="round"?72:64,
                  borderRadius:t.shape==="round"?"50%":"10px",
                  borderColor:status?.color||undefined,
                }}
                onMouseDown={e=>handlePointerDown(e,t.id)}
                onTouchStart={e=>handlePointerDown(e,t.id)}
                onDoubleClick={()=>openEdit(t)}>
                <span style={{fontSize:10,fontWeight:700,color:"var(--tx)",textAlign:"center",lineHeight:1.2,padding:"0 4px"}}>{t.name}</span>
                <span style={{fontSize:9,color:"var(--mu)"}}>{t.capacity}👤</span>
                {occ&&<span style={{fontSize:8,color:status?.color||"var(--ac2)"}}>●</span>}
              </div>
            );
          })}
          <button className="tc-add-btn" onClick={addTable}>+ Mesa</button>
        </div>

        {/* Side panel when table selected */}
        {sel&&(
          <div style={{width:180,background:"var(--sf)",borderLeft:"1px solid var(--bd)",padding:14,display:"flex",flexDirection:"column",gap:10,flexShrink:0}}>
            <div style={{fontSize:13,fontWeight:700}}>Mesa seleccionada</div>
            <div style={{background:"var(--sf2)",border:"1px solid var(--bd)",borderRadius:9,padding:10,display:"flex",flexDirection:"column",gap:4}}>
              <div style={{fontSize:12,fontWeight:600}}>{sel.name}</div>
              <div style={{fontSize:11,color:"var(--mu)"}}>{sel.capacity} personas</div>
              <div style={{fontSize:11,color:"var(--mu)"}}>{sel.shape==="round"?"Redonda":"Cuadrada"}</div>
            </div>
            <button className="ba-btn success" style={{fontSize:12}} onClick={()=>openEdit(sel)}>✏️ Editar</button>
            <button className="ba-btn danger" style={{fontSize:12}} onClick={()=>removeTable(sel.id)}>🗑 Eliminar</button>
          </div>
        )}
      </div>

      {/* Edit modal */}
      {editModal&&(
        <div className="ov" onClick={()=>setEditModal(false)}>
          <div className="mod" onClick={e=>e.stopPropagation()}>
            <div className="mdrag"/>
            <h2>✏️ Editar {editData.name}</h2>
            <span className="mlabel2">Nombre de la mesa</span>
            <input className="minput" value={editData.name||""} onChange={e=>setEditData(d=>({...d,name:e.target.value}))} placeholder="Ej. Mesa Terraza"/>
            <span className="mlabel2">Capacidad (personas)</span>
            <div style={{display:"flex",alignItems:"center",gap:12,justifyContent:"center",padding:"4px 0"}}>
              <button className="cb" style={{width:36,height:36,fontSize:20}} onClick={()=>setEditData(d=>{const c=Math.max(1,(d.capacity||1)-1);return{...d,capacity:c};})}>−</button>
              <span style={{fontFamily:"DM Mono,monospace",fontSize:26,minWidth:40,textAlign:"center",color:"var(--ac)"}}>{editData.capacity||2}</span>
              <button className="cb" style={{width:36,height:36,fontSize:20}} onClick={()=>setEditData(d=>{const c=(d.capacity||1)+1;return{...d,capacity:c};})}>+</button>
            </div>
            <span className="ssep">Forma</span>
            <div className="ogrid">
              <button className={`obtn ${editData.shape!=="round"?"sel":""}`} onClick={()=>setEditData(d=>({...d,shape:"square"}))}>
                <div style={{width:30,height:24,background:"var(--ac)",borderRadius:6,marginBottom:4}}/>
                <span className="oblbl">Cuadrada</span>
              </button>
              <button className={`obtn ${editData.shape==="round"?"sel":""}`} onClick={()=>setEditData(d=>({...d,shape:"round"}))}>
                <div style={{width:30,height:30,background:"var(--ac)",borderRadius:"50%",marginBottom:4}}/>
                <span className="oblbl">Redonda</span>
              </button>
            </div>
            <div className="mbtns">
              <button className="mb" onClick={()=>setEditModal(false)}>Cancelar</button>
              <button className="mb p" onClick={saveEdit}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LoginScreen({store,employees,onLogin,onBack}){
  const [sel,setSel]=useState(null);
  const [pin,setPin]=useState("");
  const [err,setErr]=useState("");
  const [phase,setPhase]=useState("select"); // select | pin | avatar
  const [chosenAvatar,setChosenAvatar]=useState(null);

  // Load saved avatar for employee
  const getSavedAvatar=(empId)=>localStorage.getItem(`cheche_avatar_${empId}`)||null;
  const saveAvatar=(empId,av)=>localStorage.setItem(`cheche_avatar_${empId}`,av);

  useEffect(()=>{
    if(pin.length===4&&sel){
      if(pin===sel.pin){
        const saved=getSavedAvatar(sel.id);
        if(saved){ onLogin({...sel,avatar:saved}); }
        else { setPhase("avatar"); }
      } else { setErr("PIN incorrecto");setPin(""); }
    }
  },[pin,sel]);

  const handleSelectEmp=(e)=>{
    setSel(e);setPin("");setErr("");
    setChosenAvatar(getSavedAvatar(e.id));
    setPhase("pin");
  };

  return(
    <>
      <style>{css}</style>
      <div className="lw">
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
          <img src={CHECHE_LOGO} alt="Che'Che' Café" style={{width:140,height:"auto",opacity:.95}}/>
          <span className="subttl">punto de venta</span>
        </div>
        {store&&<div className="store-banner" style={{background:store.color+'22',color:store.color,border:`1px solid ${store.color}44`}}>☕ {store.name}</div>}

        {phase==="select"&&(
          <>
            <div style={{fontSize:11,color:"var(--mu)",fontFamily:"DM Mono,monospace",letterSpacing:".2em",textTransform:"uppercase"}}>¿Quién eres?</div>
            <div className="egrid">
              {employees.map((e)=>{
                const av=getSavedAvatar(e.id)||"☕";
                return(
                  <button key={e.id} className="ecard" onClick={()=>handleSelectEmp(e)}>
                    <div className="eavatar" style={{fontSize:22}}>{av}</div>
                    <span className="ename">{e.name}</span>
                    <span className="erole">{e.role==="gerente"?"Gerente":e.role==="superadmin"?"Global":e.role==="admin"?"Admin":"Barista"}</span>
                    {(e.role==="admin"||e.role==="superadmin")&&<span className="abadge">{e.role==="superadmin"?"GLOBAL":"ADMIN"}</span>}
                    {e.role==="gerente"&&<span className="abadge" style={{background:"#1a1a2e",color:"var(--ac3)",borderColor:"var(--ac3)44"}}>GERENTE</span>}
                  </button>
                );
              })}
            </div>
            <button style={{background:"none",border:"none",color:"var(--mu)",fontSize:13,padding:"4px",cursor:"pointer"}} onClick={onBack}>← Cambiar tienda</button>
          </>
        )}

        {phase==="pin"&&sel&&(
          <div className="pinw">
            <div className="eavatar" style={{fontSize:36,width:64,height:64,borderRadius:"50%",background:"var(--sf2)",display:"flex",alignItems:"center",justifyContent:"center"}}>{chosenAvatar||getSavedAvatar(sel.id)||"☕"}</div>
            <span className="pname">{sel.name}</span>
            <span className="psub">Ingresa tu PIN</span>
            <div className="pdots">{[0,1,2,3].map(i=><div key={i} className={`pdot ${pin.length>i?"on":""}`}/>)}</div>
            {err&&<span className="perr">{err}</span>}
            <div className="npad">
              {[1,2,3,4,5,6,7,8,9].map(n=><button key={n} className="nb" onClick={()=>{if(pin.length<4)setPin(p=>p+n)}}>{n}</button>)}
              <button className="nb del" onClick={()=>setPin(p=>p.slice(0,-1))}>⌫</button>
              <button className="nb" onClick={()=>{if(pin.length<4)setPin(p=>p+"0")}}>0</button>
              <button className="nb ok" onClick={()=>{if(sel&&pin===sel.pin){const saved=getSavedAvatar(sel.id);if(saved)onLogin({...sel,avatar:saved});else setPhase("avatar");}else{setErr("PIN incorrecto");setPin("");}}}>✓</button>
            </div>
            <button style={{background:"none",border:"none",color:"var(--mu)",fontSize:13,padding:"4px",cursor:"pointer"}} onClick={()=>{setSel(null);setPin("");setPhase("select");}}>← Cambiar perfil</button>
          </div>
        )}

        {phase==="avatar"&&sel&&(
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16,maxWidth:400,width:"100%"}}>
            <div style={{fontSize:16,fontWeight:700,textAlign:"center"}}>Elige tu avatar, {sel.name.split(" ")[0]} 🎨</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(8,1fr)",gap:8,width:"100%"}}>
              {AVATAR_OPTIONS.map(av=>(
                <button key={av}
                  onClick={()=>setChosenAvatar(av)}
                  style={{fontSize:28,padding:8,border:`2px solid ${chosenAvatar===av?"var(--ac)":"var(--bd)"}`,borderRadius:12,background:chosenAvatar===av?"var(--sf2)":"transparent",cursor:"pointer",transition:"all .15s",transform:chosenAvatar===av?"scale(1.15)":"scale(1)"}}>
                  {av}
                </button>
              ))}
            </div>
            <button className="mb p" style={{width:"100%",padding:14,fontSize:15}}
              disabled={!chosenAvatar}
              onClick={()=>{if(chosenAvatar&&sel){saveAvatar(sel.id,chosenAvatar);onLogin({...sel,avatar:chosenAvatar});}}}>
              {chosenAvatar?`Entrar como ${sel.name.split(" ")[0]} ${chosenAvatar}`:"Elige un avatar"}
            </button>
            <button style={{background:"none",border:"none",color:"var(--mu)",fontSize:12,cursor:"pointer"}} onClick={()=>{const av="☕";saveAvatar(sel.id,av);onLogin({...sel,avatar:av});}}>Saltar por ahora</button>
          </div>
        )}
      </div>
    </>
  );
}
