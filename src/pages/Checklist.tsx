import {FormEvent,useState} from 'react';import {useStore} from '../store';import {rdy,toastMsg} from '../util';import {Toggle} from '../ui';
export default function Checklist(){
 const {ev,d}=useStore();const [err,setErr]=useState('');
 const add=(e:FormEvent<HTMLFormElement>)=>{e.preventDefault();const t=String(new FormData(e.currentTarget).get('t')||'').trim();if(t.length<2)return setErr('Item checklist minimal 2 karakter.');setErr('');d({type:'addCk',t});e.currentTarget.reset()};
 return <div className="space-y-4 pg"><div><h2 className="font-serif text-2xl">Operational Checklist</h2><p className="text-slate-500">{ev.name} · kesiapan {rdy(ev)}%</p></div>
  <form onSubmit={add} className="card flex flex-wrap gap-2"><input name="t" maxLength={80} required aria-label="Item checklist baru" placeholder="Item checklist baru" className="inp flex-1 min-w-[180px]"/><button className="btn btn-p">+ Tambah</button>{err&&<p className="text-red-600 text-sm w-full">{err}</p>}</form>
  <div className="card"><div className="h-2 bg-slate-200 rounded-full overflow-hidden mb-2"><i className="block h-full bg-or bar-anim transition-all" style={{width:rdy(ev)+'%'}}/></div>
   {ev.ck.map(c=><div key={c.id} className="flex items-center gap-3 py-2 border-b border-slate-100"><Toggle label="Centang" on={c.d} onClick={()=>d({type:'togCk',id:c.id})}/><input key={c.t} aria-label="Edit item checklist" defaultValue={c.t} maxLength={80} className="inp flex-1" onKeyDown={e=>{if(e.key==='Enter')e.currentTarget.blur()}} onBlur={e=>{const v=e.target.value.trim();if(v.length<2){e.target.value=c.t;toastMsg('Item checklist minimal 2 karakter.');return}if(v!==c.t)d({type:'editCk',id:c.id,t:v})}}/><button className="btn text-red-600" onClick={()=>d({type:'delCk',id:c.id})}>Hapus</button></div>)}
   {!ev.ck.length&&<p className="text-slate-500">Checklist kosong. Tambahkan item pertama.</p>}</div></div>;
}
