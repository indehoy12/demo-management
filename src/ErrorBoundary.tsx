import {Component,ReactNode} from 'react';
export default class ErrorBoundary extends Component<{children:ReactNode},{err:boolean}>{
 state={err:false};
 static getDerivedStateFromError(){return{err:true}}
 render(){if(!this.state.err)return this.props.children;
  return <div className="min-h-screen grid place-items-center p-5 bg-slate-100"><div role="alert" className="card max-w-md w-full"><h1 className="font-serif text-xl">Terjadi kendala pada demo</h1><p className="text-slate-500 my-2">Data simulasi Anda mungkin tidak terbaca. Reset demo untuk kembali ke data awal.</p><button className="btn btn-p" onClick={()=>{try{sessionStorage.removeItem('srt-demo')}catch{}location.hash='dashboard';location.reload()}}>Reset dan muat ulang</button></div></div>}
}
