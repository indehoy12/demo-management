import {FormEvent,useState} from 'react';import {useStore} from '../store';
export default function Participants(){
 const {ev,d}=useStore();const [err,setErr]=useState('');
 const p=ev.pt,r=p.reg?Math.round(p.att*100/p.reg):0;
 const K:[string,string|number][]=[['Target participants',p.target],['Registered',p.reg],['Attended',p.att],['No-show',p.reg-p.att],['Attendance rate',r+'%']];
 const sub=(e:FormEvent<HTMLFormElement>)=>{e.preventDefault();const f=new FormData(e.currentTarget),n=(k:string)=>Number(f.get(k));const[t,g,a]=[n('target'),n('reg'),n('att')];
  if(![t,g,a].every(Number.isInteger)||t<0||g<0||a<0)return setErr('Masukkan bilangan bulat 0 atau lebih.');if(a>g)return setErr('Attended tidak boleh melebihi Registered.');setErr('');d({type:'pt',target:t,reg:g,att:a})};
 return <div className="space-y-4 pg"><div><h2 className="font-serif text-2xl">Participants Overview</h2><p className="text-slate-500">{ev.name} · data dummy, tidak terhubung ke produk registrasi</p></div>
  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">{K.map(([l,v])=><div key={l} className="card"><span className="text-slate-500 text-sm">{l}</span><b className="block font-serif text-3xl">{v}</b></div>)}</div>
  <form key={JSON.stringify(p)} onSubmit={sub} className="card flex flex-wrap gap-2 items-end">{(['target','reg','att'] as const).map(k=><label key={k} className="text-sm text-slate-500">{k==='target'?'Target':k==='reg'?'Registered':'Attended'}<input name={k} type="number" min={0} step={1} defaultValue={p[k]} required className="inp block w-32"/></label>)}<button className="btn btn-p">Ubah angka simulasi</button>{err&&<p className="text-red-600 text-sm w-full">{err}</p>}</form></div>;
}
