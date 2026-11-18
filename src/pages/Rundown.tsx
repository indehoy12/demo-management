import {Badge,Bad} from '../ui';import {FormEvent,useState} from 'react';import {useStore} from '../store';import {conflicts,dur,tm} from '../util';
export default function Rundown(){
 const {ev,d}=useStore();const [ed,setEd]=useState<string|null>(null);const [err,setErr]=useState('');
 const cf=conflicts(ev),cur=ev.rd.find(r=>r.id===ed);
 const sub=(e:FormEvent<HTMLFormElement>)=>{e.preventDefault();const f=new FormData(e.currentTarget),g=(k:string)=>String(f.get(k)||'').trim();
  if(g('title').length<2)return setErr('Judul sesi wajib diisi.');if(tm(g('e'))<=tm(g('s')))return setErr('Jam selesai harus setelah jam mulai.');
  const v={title:g('title'),s:g('s'),e:g('e'),pic:g('pic'),loc:g('loc')};setErr('');d(ed?{type:'editSes',id:ed,...v}:{type:'addSes',...v});setEd(null);e.currentTarget.reset()};
 return <div className="space-y-4 pg"><div><h2 className="font-serif text-2xl">Rundown Builder</h2><p className="text-slate-500">{ev.name}</p></div>
  <form key={ed||'new'} onSubmit={sub} className="card grid sm:grid-cols-6 gap-2 items-end">
   <label className="text-sm text-slate-500 sm:col-span-2">Judul<input name="title" defaultValue={cur?.title} maxLength={80} required className="inp w-full"/></label>
   <label className="text-sm text-slate-500">Mulai<input name="s" type="time" defaultValue={cur?.s||'09:00'} required className="inp w-full"/></label>
   <label className="text-sm text-slate-500">Selesai<input name="e" type="time" defaultValue={cur?.e||'10:00'} required className="inp w-full"/></label>
   <label className="text-sm text-slate-500">PIC<input name="pic" defaultValue={cur?.pic} maxLength={60} required className="inp w-full"/></label>
   <label className="text-sm text-slate-500">Lokasi<input name="loc" defaultValue={cur?.loc} maxLength={60} required className="inp w-full"/></label>
   <div className="sm:col-span-6 flex gap-2"><button className="btn btn-p">{ed?'Simpan sesi':'+ Tambah sesi'}</button>{ed&&<button type="button" className="btn" onClick={()=>setEd(null)}>Batal</button>}</div>{err&&<p className="text-red-600 text-sm sm:col-span-6">{err}</p>}</form>
  {cf.size>0&&<div className="card border-red-500"><b aria-hidden="true" className="text-red-600">✕</b> Ada {cf.size} sesi dengan jadwal bentrok (ditandai merah).</div>}
  <div className="card overflow-x-auto"><table className="w-full min-w-[640px] text-left"><thead className="text-slate-500 text-sm"><tr><th className="p-2">Waktu</th><th>Durasi</th><th>Sesi</th><th>PIC</th><th>Lokasi</th><th>Status</th><th/></tr></thead><tbody>
   {ev.rd.map(r=><tr key={r.id} className={`border-t border-slate-100 ${cf.has(r.id)?'bg-red-50':''}`}><td className="p-2">{r.s}–{r.e}</td><td>{dur(r)} mnt</td><td><b>{r.title}</b>{cf.has(r.id)&&<span className="ml-2"><Bad>Bentrok</Bad></span>}</td><td>{r.pic}</td><td>{r.loc}</td><td><Badge s={r.st}/></td><td className="space-x-1 whitespace-nowrap"><button className="btn" onClick={()=>d({type:'mvSes',id:r.id,dir:-1})} >Naik</button><button className="btn" onClick={()=>d({type:'mvSes',id:r.id,dir:1})} >Turun</button><button className="btn" onClick={()=>setEd(r.id)}>Edit</button><button className="btn text-red-600" onClick={()=>d({type:'delSes',id:r.id})}>Hapus</button></td></tr>)}
   {!ev.rd.length&&<tr><td colSpan={7} className="p-3 text-slate-500">Belum ada sesi. Tambahkan sesi pertama.</td></tr>}</tbody></table></div></div>;
}
