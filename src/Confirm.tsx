import {useEffect,useRef} from 'react';
export default function Confirm({title,msg,ok,onOk,onCancel}:{title:string;msg:string;ok:string;onOk:()=>void;onCancel:()=>void}){
 const box=useRef<HTMLDivElement>(null),cb=useRef(onCancel),opener=useRef<HTMLElement|null>(null);cb.current=onCancel;if(!opener.current)opener.current=document.activeElement as HTMLElement|null;
 useEffect(()=>{
  const k=(e:KeyboardEvent)=>{if(e.key==='Escape'){cb.current();return}
   if(e.key==='Tab'&&box.current){const f=Array.from(box.current.querySelectorAll<HTMLElement>('button'));if(!f.length)return;const a=document.activeElement,first=f[0],last=f[f.length-1],inside=box.current.contains(a);
    if(e.shiftKey&&(a===first||!inside)){e.preventDefault();last.focus()}else if(!e.shiftKey&&(a===last||!inside)){e.preventDefault();first.focus()}}};
  addEventListener('keydown',k);return()=>{removeEventListener('keydown',k);opener.current?.focus?.()}},[]);
 return <div className="fixed inset-0 bg-black/60 grid place-items-center z-[70] p-4 fade-in" onClick={onCancel}><div ref={box} role="dialog" aria-modal="true" aria-labelledby="cft" className="card max-w-sm w-full max-h-[90dvh] overflow-y-auto dialog-in" onClick={e=>e.stopPropagation()}><h3 id="cft" className="font-serif text-lg">{title}</h3><p className="text-slate-500 my-2">{msg}</p><div className="flex gap-2"><button autoFocus className="btn btn-p" onClick={onOk}>{ok}</button><button className="btn" onClick={onCancel}>Batal</button></div></div></div>;
}
