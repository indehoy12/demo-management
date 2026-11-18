import {STEPS} from '../flow';import {SITE} from '../config';
export default function Home(){
 return <div className="space-y-6 pg max-w-4xl mx-auto text-center pt-4 sm:pt-8">
  <img src="/logo.png" alt="Sumber Rejeki Tech" className="mx-auto w-48 h-auto"/>
  <h1 className="font-serif text-3xl sm:text-5xl font-extrabold leading-tight">Event Management Dashboard</h1>
  <p className="text-slate-600 max-w-2xl mx-auto">Kelola perencanaan, jadwal, progres, dan pelaksanaan event melalui satu dashboard profesional.</p>
  <p className="text-slate-700 text-sm">Semua data dan aktivitas pada demo ini hanya simulasi.</p>
  <p className="text-slate-600 text-sm">Dashboard ini khusus satu event dan bersifat sekali pakai. Setelah event selesai, dashboard dikunci.</p>
  <div className="flex flex-wrap justify-center gap-2"><a className="btn btn-p" href="#dashboard">Jelajahi Dashboard</a><a className="btn" href="#overview">Coba Kelola Event</a><a className="btn" href="#live">Coba Live Monitoring</a></div>
  <div className="card text-left"><h2 className="text-lg">Alur demo dalam 6 langkah</h2><p className="text-sm text-slate-500 mb-3">Ikuti urutannya, atau klik langkah mana saja. Setiap langkah memberi petunjuk dan tombol lanjut.</p><ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">{STEPS.map((s,i)=><li key={s.k}><a href={'#'+s.k} className="flex gap-3 items-start rounded-xl border border-slate-200 p-3 h-full transition hover:border-or hover:-translate-y-0.5 hover:shadow-md"><b className={`shrink-0 w-8 h-8 rounded-full grid place-items-center text-sm ${i===0?'bg-or text-nv step-pulse':'bg-slate-200 text-slate-700'}`}>{i+1}</b><span><b className="block">{s.l}</b><span className="text-sm text-slate-500">{s.d}</span></span></a></li>)}</ol></div>
  <a className="inline-block text-sm underline" href={SITE} target="_blank" rel="noopener noreferrer">Konsultasikan Kebutuhan Event Anda</a></div>;
}
