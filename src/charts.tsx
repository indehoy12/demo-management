import {useState} from 'react';
export function BarChart({data,h=170}:{data:{l:string;v:number}[];h?:number}){
 const [a,setA]=useState<number|null>(null),w=Math.max(data.length*60+40,320);
 return <div className="overflow-x-auto"><svg role="group" aria-label="Diagram batang progres per bidang" viewBox={`0 0 ${w} ${h+36}`} style={{minWidth:w,width:'100%'}}>
  {[0,50,100].map(g=><g key={g}><line x1="26" x2={w} y1={h-g*h/100+8} y2={h-g*h/100+8} stroke="#e2e8f0"/><text x="0" y={h-g*h/100+12} fontSize="10" fill="#64748b">{g}%</text></g>)}
  {data.map((d,i)=>{const x=36+i*60,bh=Math.max(2,d.v*h/100);return <g key={i} tabIndex={0} role="img" aria-label={`${d.l}: ${d.v}%`} className="cursor-pointer outline-none" onMouseEnter={()=>setA(i)} onMouseLeave={()=>setA(null)} onFocus={()=>setA(i)} onBlur={()=>setA(null)}>
   <title>{d.l}: {d.v}%</title><rect x={x} y={h-bh+8} width="36" height={bh} rx="4" fill={a===i?'#01205c':'#ff7f01'} className="bar-grow" style={{transition:'fill .2s',animationDelay:i*70+'ms'}}/>
   <text x={x+18} y={h+24} fontSize="10" textAnchor="middle" fill="#475569">{d.l.length>9?d.l.slice(0,8)+'…':d.l}</text>
   {a===i&&<text x={x+18} y={h-bh+2} fontSize="12" fontWeight="700" textAnchor="middle" fill="#01205c">{d.v}%</text>}</g>})}</svg></div>;
}
export function Donut({parts,center}:{parts:{l:string;v:number;c:string}[];center?:string}){
 const [a,setA]=useState<number|null>(null),tot=parts.reduce((s,p)=>s+p.v,0)||1,r=48,C=2*Math.PI*r;let off=0;
 return <div className="flex items-center gap-4 flex-wrap"><svg className="donut-in" width="132" height="132" viewBox="0 0 120 120" role="img" aria-label={parts.map(p=>`${p.l} ${p.v}`).join(', ')}>
  <circle cx="60" cy="60" r={r} fill="none" stroke="#e2e8f0" strokeWidth="16"/>
  {parts.map((p,i)=>{const len=p.v/tot*C,el=<circle key={i} cx="60" cy="60" r={r} fill="none" stroke={p.c} strokeWidth={a===i?21:16} strokeDasharray={`${len} ${C-len}`} strokeDashoffset={-off} transform="rotate(-90 60 60)" onMouseEnter={()=>setA(i)} onMouseLeave={()=>setA(null)} style={{transition:'stroke-width .15s'}}><title>{p.l}: {p.v}</title></circle>;off+=len;return el})}
  <text pointerEvents="none" x="60" y="66" textAnchor="middle" fontSize="18" fontWeight="700" fill="#01205c">{a!==null?parts[a].v:center??parts.reduce((s,p)=>s+p.v,0)}</text></svg>
  <ul className="text-sm space-y-1">{parts.map((p,i)=><li key={i} tabIndex={0} onMouseEnter={()=>setA(i)} onMouseLeave={()=>setA(null)} onFocus={()=>setA(i)} onBlur={()=>setA(null)} className={`flex items-center gap-2 rounded ${a===i?'font-bold':''}`}><i className="w-3 h-3 rounded-sm inline-block" style={{background:p.c}}/>{p.l}: {p.v}</li>)}</ul></div>;
}
