import {Badge,Toggle} from '../ui';import {FormEvent,useState} from 'react';import {useStore} from '../store';import {dt,overdue,pct,toastMsg} from '../util';import {MSt} from '../types';
export default function Planning(){
 const {ev,d}=useStore();const [err,setErr]=useState('');
 const add=(e:FormEvent<HTMLFormElement>)=>{e.preventDefault();const f=new FormData(e.currentTarget),t=String(f.get('title')||'').trim(),dd=String(f.get('date')||'');
  if(t.length<2)return setErr('Judul milestone wajib diisi.');if(!/^\d{4}-\d\d-\d\d$/.test(dd))return setErr('Deadline tidak valid.');setErr('');d({type:'addMs',title:t,date:dd});e.currentTarget.reset()};
 return <div className="space-y-4 pg"><div><h2 className="font-serif text-2xl">Planning dan Milestones</h2><p className="text-slate-500">{ev.name} · progres {pct(ev)}%</p></div>
  <form onSubmit={add} className="card flex flex-wrap gap-2 items-end"><label className="text-sm text-slate-500 flex-1 min-w-[180px]">Judul<input name="title" maxLength={80} required className="inp w-full"/></label><label className="text-sm text-slate-500">Deadline<input name="date" type="date" defaultValue={dt(7)} required className="inp block"/></label><button className="btn btn-p">+ Tambah</button>{err&&<p className="text-red-600 text-sm w-full">{err}</p>}</form>
  <div className="card"><div className="h-2 bg-slate-200 rounded-full overflow-hidden mb-2"><i className="block h-full bg-or bar-anim transition-all" style={{width:pct(ev)+'%'}}/></div>
   {ev.ms.map(m=><div key={m.id} className="flex items-center gap-2 py-2 border-b border-slate-100 flex-wrap"><Toggle label="Tandai selesai" on={m.st==='done'} onClick={()=>d({type:'editMs',id:m.id,title:m.title,date:m.date,st:m.st==='done'?'todo':'done'})}/>
    <input key={m.title} aria-label="Judul" defaultValue={m.title} maxLength={80} className="inp flex-1 min-w-[150px]" onBlur={e=>{const v=e.target.value.trim();if(v.length<2){e.target.value=m.title;toastMsg('Judul milestone minimal 2 karakter.');return}if(v!==m.title)d({type:'editMs',id:m.id,title:v,date:m.date,st:m.st})}}/>
    <input aria-label="Deadline" type="date" value={m.date} className="inp" onChange={e=>e.target.value&&d({type:'editMs',id:m.id,title:m.title,date:e.target.value,st:m.st})}/>
    <select aria-label="Status" value={m.st} className="inp" onChange={e=>d({type:'editMs',id:m.id,title:m.title,date:m.date,st:e.target.value as MSt})}><option value="todo">Belum</option><option value="progress">Berjalan</option><option value="done">Selesai</option></select>
    {overdue(m)&&<Badge s="late"/>}<button className="btn text-red-600" onClick={()=>d({type:'delMs',id:m.id})}>Hapus</button></div>)}
   {!ev.ms.length&&<p className="text-slate-500">Belum ada milestone. Tambahkan yang pertama.</p>}</div></div>;
}
