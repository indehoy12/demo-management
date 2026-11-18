export type Status='upcoming'|'ongoing'|'completed';
export type MSt='todo'|'progress'|'done';
export interface Milestone{id:string;title:string;date:string;st:MSt}
export interface Session{id:string;title:string;s:string;e:string;pic:string;loc:string;st:'planned'|'live'|'done'|'delayed'|'skipped';t0:number|null}
interface Check{id:string;t:string;d:boolean}
export interface Ev{name:string;loc:string;date:string;status:Status;mgr:string;ms:Milestone[];rd:Session[];ck:Check[];pt:{target:number;reg:number;att:number}}
interface Act{t:number;m:string}
export interface State{ev:Ev;act:Act[];flow:number[]}
