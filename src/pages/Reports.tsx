import {useStore} from '../store';import {Donut} from '../charts';import {fd,overdue,pct,rdy} from '../util';
const Bar=({v}:{v:number})=><div className="h-2 bg-slate-200 rounded-full overflow-hidden"><i className="block h-full bg-or bar-anim transition-all" style={{width:v+'%'}}/></div>;
export default function Reports(){
 const {s,ev}=useStore();
 const dn=ev.rd.filter(r=>r.st==='done').length,rp=ev.rd.length?Math.round(dn*100/ev.rd.length):0,ra=s.act,p=rdy(ev),at=ev.pt.reg?Math.round(ev.pt.att*100/ev.pt.reg):0;
 return <div className="space-y-4 pg"><div className="flex flex-wrap justify-between gap-2"><div><h2 className="font-serif text-2xl">Reports</h2><p className="text-slate-500">{ev.name} · pratinjau laporan simulasi</p></div><button className="btn opacity-50 cursor-not-allowed" disabled title="Export dinonaktifkan pada demo">Export (nonaktif di demo)</button></div>
  <div className="grid md:grid-cols-2 gap-3">
   <div className="card"><h3 className="font-serif mb-1">Event summary</h3><p>{fd(ev.date)} · {ev.loc}</p><p>Manager: {ev.mgr}</p><p>Status: {ev.status}</p></div>
   <div className="card"><h3 className="font-serif mb-1">Milestone progress</h3><Bar v={pct(ev)}/><p>{ev.ms.filter(m=>m.st==='done').length} dari {ev.ms.length} selesai ({pct(ev)}%) · {ev.ms.filter(overdue).length} terlambat</p></div>
   <div className="card"><h3 className="font-serif mb-1">Rundown completion</h3><Bar v={rp}/><p>{dn} dari {ev.rd.length} sesi selesai ({rp}%)</p></div>
   <div className="card"><h3 className="font-serif mb-2">Checklist readiness</h3><Donut parts={[{l:'Siap',v:ev.ck.filter(c=>c.d).length,c:'#16a34a'},{l:'Belum',v:ev.ck.filter(c=>!c.d).length,c:'#94a3b8'}]} center={p+'%'}/></div><div className="card"><h3 className="font-serif mb-2">Status milestone</h3><Donut parts={[{l:'Selesai',v:ev.ms.filter(m=>m.st==='done').length,c:'#16a34a'},{l:'Berjalan',v:ev.ms.filter(m=>m.st==='progress'&&!overdue(m)).length,c:'#ff7f01'},{l:'Belum',v:ev.ms.filter(m=>m.st==='todo'&&!overdue(m)).length,c:'#94a3b8'},{l:'Terlambat',v:ev.ms.filter(overdue).length,c:'#dc2626'}]}/></div><div className="card"><h3 className="font-serif mb-2">Status sesi rundown</h3><Donut parts={[{l:'Selesai',v:dn,c:'#16a34a'},{l:'Live',v:ev.rd.filter(r=>r.st==='live').length,c:'#dc2626'},{l:'Terjadwal',v:ev.rd.filter(r=>r.st==='planned').length,c:'#2563eb'},{l:'Tertunda/Dilewati',v:ev.rd.filter(r=>r.st==='delayed'||r.st==='skipped').length,c:'#d97706'}]}/></div>
   <div className="card"><h3 className="font-serif mb-1">Attendance overview</h3><p>Registered {ev.pt.reg} · Attended {ev.pt.att} · Rate {at}%</p><Bar v={at}/></div>
   <div className="card"><h3 className="font-serif mb-1">Activity summary</h3><p>{ra.length} aktivitas tercatat untuk event ini.</p><ul>{ra.slice(0,3).map((a,i)=><li key={i} className="text-sm text-slate-600">{a.m}</li>)}</ul></div></div>
  </div>;
}
