import {createContext,useCallback,useContext,useEffect,useReducer,ReactNode} from 'react';
import {Ev,State,Status,MSt,Session} from './types';import {seed} from './seed';import {uid} from './util';
type Action={type:'finish'}|{type:'addMs';title:string;date:string}|{type:'delMs';id:string}|{type:'togCk';id:string}|{type:'addCk';t:string}|{type:'delCk';id:string}|{type:'editEv';name:string;date:string;loc:string;mgr:string;status:Status}|{type:'editMs';id:string;title:string;date:string;st:MSt}|{type:'addSes';title:string;s:string;e:string;pic:string;loc:string}|{type:'editSes';id:string;title:string;s:string;e:string;pic:string;loc:string}|{type:'delSes';id:string}|{type:'mvSes';id:string;dir:number}|{type:'live';op:'start'|'complete'|'delay'|'skip'|'reset'}|{type:'pt';target:number;reg:number;att:number}|{type:'editCk';id:string;t:string}|{type:'flow';step:number};
const K='srt-demo';
const ok=(s:any):s is State=>!!s&&!!s.ev&&!Array.isArray(s.ev)&&Array.isArray(s.act)&&Array.isArray(s.flow)&&typeof s.ev.name==='string'&&Array.isArray(s.ev.ms)&&Array.isArray(s.ev.rd)&&Array.isArray(s.ev.ck)&&!!s.ev.pt&&typeof s.ev.pt.reg==='number';
function load():State{try{const s=JSON.parse(sessionStorage.getItem(K)||'null');if(ok(s))return s}catch{}return seed()}
const up=(s:State,fn:(e:Ev)=>Ev,m?:string):State=>({...s,ev:fn(s.ev),act:m?[{t:Date.now(),m},...s.act].slice(0,60):s.act});
function core(s:State,a:Action):State{switch(a.type){
 case'finish':return up(s,e=>({...e,status:'completed' as const}),'Event completed');
 case'addMs':return up(s,e=>({...e,ms:[...e.ms,{id:uid(),title:a.title,date:a.date,st:'todo'}]}),'Milestone added: '+a.title);
 case'delMs':return up(s,e=>({...e,ms:e.ms.filter(m=>m.id!==a.id)}));
 case'togCk':return up(s,e=>({...e,ck:e.ck.map(c=>c.id===a.id?{...c,d:!c.d}:c)}));
 case'addCk':return up(s,e=>({...e,ck:[...e.ck,{id:uid(),t:a.t,d:false}]}));
 case'delCk':return up(s,e=>({...e,ck:e.ck.filter(c=>c.id!==a.id)}));
 case'editEv':{const {type,...f}=a;return up(s,e=>({...e,...f}),'Event updated: '+f.name)}
 case'editMs':return up(s,e=>({...e,ms:e.ms.map(m=>m.id===a.id?{...m,title:a.title,date:a.date,st:a.st}:m)}),a.st==='done'?'Milestone completed: '+a.title:'Milestone updated: '+a.title);
 case'addSes':return up(s,e=>({...e,rd:[...e.rd,{id:uid(),title:a.title,s:a.s,e:a.e,pic:a.pic,loc:a.loc,st:'planned',t0:null}]}),'Rundown updated: '+a.title);
 case'editSes':return up(s,e=>({...e,rd:e.rd.map(x=>x.id===a.id?{...x,title:a.title,s:a.s,e:a.e,pic:a.pic,loc:a.loc}:x)}),'Rundown updated: '+a.title);
 case'delSes':return up(s,e=>({...e,rd:e.rd.filter(x=>x.id!==a.id)}),'Rundown updated: sesi dihapus');
 case'mvSes':return up(s,e=>{const r=[...e.rd],i=r.findIndex(x=>x.id===a.id),j=i+a.dir;if(i<0||j<0||j>=r.length)return e;[r[i],r[j]]=[r[j],r[i]];return{...e,rd:r}},'Rundown updated: urutan diubah');
 case'pt':return up(s,e=>({...e,pt:{target:a.target,reg:a.reg,att:a.att}}));
 case'editCk':return up(s,e=>({...e,ck:e.ck.map(c=>c.id===a.id?{...c,t:a.t}:c)}));
 case'live':return liveOp(s,a.op);
 default:return s;
}}
const STEP:Record<string,number>={addMs:1,editMs:1,addSes:2,editSes:2};
function red(s:State,a:Action):State{
 if(s.ev.status==='completed'&&a.type!=='flow')return s;
 if(a.type==='flow')return s.flow.includes(a.step)?s:{...s,flow:[...s.flow,a.step]};
 const n=core(s,a);const k=STEP[a.type]??(a.type==='live'&&a.op==='start'&&n!==s?3:0);
 return k&&!n.flow.includes(k)?{...n,flow:[...n.flow,k]}:n}
function liveOp(s:State,op:string):State{
 const e=s.ev;
 if(op==='reset')return up(s,x=>({...x,rd:x.rd.map(r=>({...r,st:'planned' as const,t0:null}))}),'Live simulation reset');
 const L=e.rd.find(x=>x.st==='live'),N=e.rd.find(x=>x.st==='planned'||x.st==='delayed');
 const t=op==='start'?(L?undefined:N):op==='complete'?L:op==='delay'?(L||e.rd.find(x=>x.st==='planned')):(L||N);
 if(!t)return s;
 const st:Session['st']=op==='start'?'live':op==='complete'?'done':op==='delay'?'delayed':'skipped';
 const lb={start:'started',complete:'completed',delay:'delayed',skip:'skipped'}[op as 'start'];
 return up(s,x=>{const rd=x.rd.map(r=>r.id===t.id?{...r,st,t0:st==='live'?Date.now():null}:r);
  const status=rd.every(r=>r.st==='done'||r.st==='skipped')?'completed' as const:(op==='start'&&x.status==='upcoming'?'ongoing' as const:x.status);
  return{...x,rd,status}},'Session '+lb+': '+t.title);
}
const MSG:Record<string,string>={editEv:'Detail event diperbarui.',addMs:'Milestone ditambahkan.',delMs:'Milestone dihapus.',addSes:'Sesi ditambahkan.',editSes:'Sesi diperbarui.',delSes:'Sesi dihapus.',addCk:'Checklist ditambahkan.',delCk:'Checklist dihapus.',pt:'Angka simulasi diperbarui.'};
const LV={start:'Sesi dimulai.',complete:'Sesi selesai.',delay:'Sesi ditandai tertunda.',skip:'Sesi dilewati.',reset:'Simulasi live direset.'};
const Ctx=createContext<{s:State;d:(a:Action)=>void;ev:Ev}>(null as never);
export function Provider({children}:{children:ReactNode}){
 const [s,d0]=useReducer(red,undefined,load);
 const d=useCallback((a:Action)=>{d0(a);const m=MSG[a.type]||(a.type==='live'?LV[a.op]:'');if(m)dispatchEvent(new CustomEvent('toast',{detail:m}))},[]);
 useEffect(()=>{try{sessionStorage.setItem(K,JSON.stringify(s))}catch{}},[s]);
 return <Ctx.Provider value={{s,d,ev:s.ev}}>{children}</Ctx.Provider>;
}
export const useStore=()=>useContext(Ctx);
