import {useStore} from '../store';import {overdue,pct,rdy,ago,fd,today} from '../util';import {BarChart,Donut} from '../charts';import {CountUp} from '../anim';import {SITE} from '../config';
export default function Dashboard(){
 const {s,ev}=useStore();
 const ms=ev.ms,dn=ms.filter(m=>m.st==='done').length,od=ms.filter(overdue).length,sd=ev.rd.filter(r=>r.st==='done').length,rp=ev.rd.length?Math.round(sd*100/ev.rd.length):0,at=ev.pt.reg?Math.round(ev.pt.att*100/ev.pt.reg):0;
 const days=Math.round((new Date(ev.date+'T00:00:00').getTime()-new Date(today()+'T00:00:00').getTime())/864e5),lb=days>0?`H-${days}`:days===0?'Hari ini':`H+${-days}`;
 const K:[string,number,string][]=[['Progres milestone',pct(ev),'%'],['Milestone selesai',dn,` / ${ms.length}`],['Milestone terlambat',od,''],['Sesi selesai',sd,` / ${ev.rd.length}`],['Kesiapan checklist',rdy(ev),'%'],['Peserta hadir',ev.pt.att,` / ${ev.pt.reg}`]];
 const AC=['border-t-or','border-t-nv','border-t-red-500','border-t-blue-500','border-t-green-600','border-t-nv'];
 return <div className="space-y-4 pg"><div><h2 className="font-serif text-2xl">Dashboard</h2><p className="text-slate-500">{ev.name} · {fd(ev.date)} · <b className="text-nv">{lb}</b></p></div>
  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">{K.map(([l,v,sf],i)=><div key={l} className={`card border-t-4 ${AC[i]}`}><span className="text-slate-500 text-sm">{l}</span><b className="block font-serif text-3xl whitespace-nowrap"><CountUp to={v} suffix={sf==='%'?'%':''}/>{sf&&sf!=='%'&&<span className="text-base text-slate-500 font-semibold">{sf}</span>}</b></div>)}</div>
  <div className="grid md:grid-cols-2 gap-3">
   <div className="card"><h3 className="font-serif mb-2">Progres per bidang</h3><BarChart data={[{l:'Milestone',v:pct(ev)},{l:'Rundown',v:rp},{l:'Checklist',v:rdy(ev)},{l:'Kehadiran',v:at}]}/></div>
   <div className="card"><h3 className="font-serif mb-2">Status milestone</h3><Donut parts={[{l:'Selesai',v:dn,c:'#16a34a'},{l:'Berjalan',v:ms.filter(m=>m.st==='progress'&&!overdue(m)).length,c:'#ff7f01'},{l:'Belum',v:ms.filter(m=>m.st==='todo'&&!overdue(m)).length,c:'#94a3b8'},{l:'Terlambat',v:od,c:'#dc2626'}]} center={String(ms.length)}/></div></div>
  <div className="grid md:grid-cols-2 gap-3">
   <div className="card"><h3 className="font-serif mb-2">Status sesi rundown</h3><Donut parts={[{l:'Selesai',v:sd,c:'#16a34a'},{l:'Live',v:ev.rd.filter(r=>r.st==='live').length,c:'#dc2626'},{l:'Terjadwal',v:ev.rd.filter(r=>r.st==='planned').length,c:'#2563eb'},{l:'Tertunda/Dilewati',v:ev.rd.filter(r=>r.st==='delayed'||r.st==='skipped').length,c:'#d97706'}]} center={String(ev.rd.length)}/></div>
   <div className="card"><h3 className="font-serif mb-2">Activity feed</h3><ul>{s.act.slice(0,7).map((a,i)=><li key={i} className="py-1.5 border-b border-slate-100">{a.m}<small className="block text-slate-500">{ago(a.t)}</small></li>)}</ul></div></div>
  <div className="rounded-2xl bg-gradient-to-br from-nv to-[#0a3a8a] text-white p-6"><h3 className="text-lg">Butuh dashboard seperti ini untuk event Anda?</h3><a className="inline-block mt-3 rounded-xl bg-or text-nv font-bold px-4 py-2 hover:brightness-105" href={SITE} target="_blank" rel="noopener noreferrer">Konsultasikan Kebutuhan Event Anda</a></div></div>;
}
