import {useEffect,useState} from 'react';
export function CountUp({to,suffix=''}:{to:number;suffix?:string}){
 const [v,setV]=useState(0);
 useEffect(()=>{if(matchMedia('(prefers-reduced-motion:reduce)').matches){setV(to);return}let r=0;const t0=performance.now();const f=(t:number)=>{const p=Math.min(1,(t-t0)/700);setV(Math.round(to*(1-Math.pow(1-p,3))));if(p<1)r=requestAnimationFrame(f)};r=requestAnimationFrame(f);return()=>cancelAnimationFrame(r)},[to]);
 return <>{v}{suffix}</>}
