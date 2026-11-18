import {State} from './types';import {dt,uid} from './util';
const CK=['Venue ready','Sound system ready','Registration desk ready','Speaker confirmed','Presentation materials ready','Crew briefing completed'];
const MT=['Kunci venue','Konfirmasi pembicara','Buka registrasi','Kampanye promosi','Finalisasi sponsor','Cetak materi','Briefing kru'];
const SS=[['08:00','09:00','Registrasi dan welcome coffee','Tim Registrasi','Lobby'],['09:00','09:30','Opening ceremony','MC Acara','Main Hall'],['09:30','10:30','Keynote speech','Rina','Main Hall'],['10:30','11:30','Panel discussion','Dimas','Main Hall'],['11:30','12:30','Networking lunch','Tim Katering','Foyer'],['13:00','14:00','Workshop paralel','Sari','Ruang B']];
export function seed():State{
 const date=dt(0),name='SRT Tech Conference 2026';
 const ms=MT.map((t,i)=>({id:uid(),title:t,date:i<5?dt(-35+i*6):i===5?dt(-1):dt(0),st:(i<5?'done':i===5?'todo':'progress') as 'done'|'todo'|'progress'}));
 const rd=SS.map((s,i)=>({id:uid(),title:s[2],s:s[0],e:s[1],pic:s[3],loc:s[4],st:(i<2?'done':'planned') as 'done'|'planned',t0:null}));
 const ck=CK.map((t,i)=>({id:uid(),t,d:i<5}));
 const ev={name,loc:'Jakarta Convention Center',date,status:'ongoing' as const,mgr:'Rina Pratama',ms,rd,ck,pt:{target:400,reg:320,att:150}};
 const n=Date.now(),h=3600000;
 return{ev,flow:[] as number[],act:[{t:n-.3*h,m:'Session completed: Opening ceremony'},{t:n-1.2*h,m:'Session completed: Registrasi dan welcome coffee'},{t:n-20*h,m:'Milestone completed: Finalisasi sponsor'},{t:n-72*h,m:'Event created: '+name}]};
}
