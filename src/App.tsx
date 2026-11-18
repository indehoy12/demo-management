import {useEffect,useRef,useState} from 'react';
import {Provider,useStore} from './store';import {FlowBar,StepFoot,STEPS} from './flow';import {toastMsg,fd} from './util';import {SITE} from './config';
import Home from './pages/Home';import Dashboard from './pages/Dashboard';import Planning from './pages/Planning';import Checklist from './pages/Checklist';import Overview from './pages/Overview';import Timeline from './pages/Timeline';import Rundown from './pages/Rundown';import Live from './pages/Live';import Participants from './pages/Participants';import Reports from './pages/Reports';import About from './pages/About';
export {SITE};
const NAV:[string,string][]=[['home','Beranda'],['dashboard','Dashboard'],['overview','Event Overview'],['planning','Planning dan Milestones'],['timeline','Timeline'],['rundown','Rundown'],['live','Live Monitoring'],['checklist','Operational Checklist'],['participants','Participants Overview'],['reports','Reports'],['about','About Demo']];
const PAGES:Record<string,()=>JSX.Element>={home:Home,dashboard:Dashboard,overview:Overview,planning:Planning,timeline:Timeline,rundown:Rundown,live:Live,checklist:Checklist,participants:Participants,reports:Reports,about:About};
function Shell(){
 const [h0,setH]=useState(location.hash.slice(1));const [open,setOpen]=useState(false);const [tt,setTt]=useState('');
 const {s,d,ev}=useStore();const main=useRef<HTMLElement>(null);const h=PAGES[h0]?h0:'home';const flow=s.flow;const prev=useRef(flow.length);
 useEffect(()=>{const f=()=>{setH(location.hash.slice(1));setOpen(false);scrollTo(0,0);main.current?.focus({preventScroll:true})};addEventListener('hashchange',f);return()=>removeEventListener('hashchange',f)},[]);
 useEffect(()=>{let t=0;const f=(e:Event)=>{setTt((e as CustomEvent<string>).detail);clearTimeout(t);t=window.setTimeout(()=>setTt(''),2400)};addEventListener('toast',f);return()=>removeEventListener('toast',f)},[]);
 useEffect(()=>{if(h==='dashboard'&&flow.includes(3))d({type:'flow',step:4});if(h==='reports'&&flow.includes(4))d({type:'flow',step:5})},[h,s.flow]);
 useEffect(()=>{const n=flow.length;if(n>prev.current){const k=flow[n-1],nx=STEPS[k];toastMsg(`Langkah ${k} selesai${nx?`. Berikutnya: ${nx.l}`:'. Seluruh alur demo selesai'}`)}prev.current=n},[s.flow]);
 const Page=PAGES[h];const locked=ev.status==='completed';const was=useRef(locked);
 useEffect(()=>{if(locked&&!was.current)toastMsg('Event selesai. Dashboard dikunci dan hanya dapat dilihat.');was.current=locked},[locked]);
 return <div className="flex min-h-screen">
  <button className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:top-2 focus:left-2 btn btn-p" onClick={()=>main.current?.focus()}>Lompat ke konten</button>
  <aside aria-label="Navigasi" className={`fixed lg:sticky top-0 h-[100dvh] overflow-y-auto w-64 shrink-0 bg-nv text-slate-200 p-3 flex flex-col gap-1 z-30 transition-transform duration-300 ${open?'':'-translate-x-full lg:translate-x-0'}`}>
   <div className="px-3 pt-2 pb-4"><div className="text-white font-extrabold text-lg leading-tight">Event Management</div><div className="text-slate-300 text-xs mt-0.5">Demo Sumber Rejeki Tech</div></div>
   {NAV.map(([k,l])=><a key={k} href={'#'+k} aria-current={h===k?'page':undefined} className={`px-3 py-2.5 rounded-xl transition-all duration-200 ${h===k?'bg-white/15 text-white font-semibold shadow-[inset_4px_0_0_#ff7f01]':'hover:bg-white/10 hover:translate-x-0.5'}`}>{l}</a>)}
   <div className="flex-1"/><a className="rounded-xl bg-or text-nv font-bold px-3 py-2.5 text-center hover:brightness-105 transition" href={SITE} target="_blank" rel="noopener noreferrer">Konsultasikan Kebutuhan Event Anda</a>
  </aside>
  {open&&<div className="fixed inset-0 bg-black/40 z-20 lg:hidden fade-in" onClick={()=>setOpen(false)}/>}
  <main className="flex-1 min-w-0">
   <div className="sticky [@media(max-height:480px)]:static top-0 z-20 bg-white/90 backdrop-blur border-b border-[#e3e9f5] px-3 sm:px-5 py-2 flex items-center gap-2">
    <button className="btn lg:hidden" aria-label="Buka menu" aria-expanded={open} onClick={()=>setOpen(!open)}>Menu</button>
    <div className="min-w-0 flex-1" aria-label="Event"><div className="font-bold truncate leading-tight">{ev.name}</div><div className="text-xs text-slate-500 truncate">{`${fd(ev.date)} · ${ev.loc}`}</div></div>
    <span className="ml-auto text-[11px] sm:text-xs font-bold bg-nv text-white rounded-full px-3 py-1 tracking-wide whitespace-nowrap">DEMO<span className="hidden sm:inline"> — SUMBER REJEKI TECH</span></span>
   </div>
   <section ref={main} tabIndex={-1} aria-label="Konten utama" className="p-3 sm:p-5 max-w-6xl 2xl:max-w-[1480px] mx-auto outline-none">
    {locked&&<div role="status" className="card mb-4 flex items-start gap-3 !border-l-4 !border-l-green-600 rise"><b aria-hidden="true" className="shrink-0 w-6 h-6 rounded-full bg-green-600 text-white grid place-items-center text-sm">✓</b><div><div className="font-bold">Event telah selesai</div><div className="text-sm text-slate-600">Dashboard ini sekali pakai dan kini dikunci. Seluruh data hanya dapat dilihat, tidak dapat diubah atau digunakan lagi.</div></div></div>}
    <FlowBar h={h} flow={flow}/><fieldset disabled={locked} className="contents"><Page/></fieldset><StepFoot h={h}/>
   </section>
  </main>
  <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-[35]" style={{backgroundImage:'url(/wm-tile.png)',backgroundSize:'520px auto',opacity:.14}}/>
  <div role="status" aria-live="polite" className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-[60] pointer-events-none">{tt&&<div key={tt} className="bg-nv text-white px-4 py-2 rounded-full shadow-lg toast-in">{tt}</div>}</div>
 </div>;
}
export default function App(){return <Provider><Shell/></Provider>}
