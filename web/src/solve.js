// SPDX-License-Identifier: GPL-3.0-only
// Copyright (C) 2026 Noel Chan
/* Solve view: derivative, integral, algebra, matrix and geometry calculators with worked steps.
   Uses globals from index.html (engine + editor) and the nerdamer algebra library when it has loaded. */
/* The algebra library is about 430 KB. The offline build wraps it in window.__loadNerdamer so the browser only
   skims it at start-up; it runs here on first use, or in the background shortly after the page is up. */
let NJ=null, njTried=false;
function getNJ(){
  if(NJ||njTried) return NJ; njTried=true;
  let n=null;
  try{ n=typeof window.__loadNerdamer==='function'?window.__loadNerdamer():(typeof nerdamer!=='undefined'?nerdamer:null); }catch(e){ n=null; }
  window.__loadNerdamer=null;
  if(!n) return null;
  try{ n.setFunction('nroot',['n','a'],'a^(1/n)'); n.setFunction('logb',['b','a'],'log(a)/log(b)'); }catch(e){}
  /* nerdamer's solve() switches on its decimal mode and leaves it on when it throws (for example on x + 1 = x),
     which turns every later exact answer into a long fraction; put its settings back after every call */
  if(n.solve&&n.getCore){ const raw=n.solve, raw2=n.solveEquations, Sx=n.getCore().Settings;
    const safe=f=>function(){ const keep=Object.assign({},Sx); try{ return f.apply(this,arguments); } finally{ for(const k in keep) if(typeof keep[k]!=='object'&&typeof keep[k]!=='function') Sx[k]=keep[k]; } };
    n.solve=safe(raw); if(raw2) n.solveEquations=safe(raw2); }
  return NJ=n;
}
(window.requestIdleCallback||(f=>setTimeout(f,1500)))(()=>getNJ(),{timeout:3000});

/* ---------- calculator row -> algebra-library text ---------- */
const CASFN={ln:'log',log:'log10'};
const CASNAMES=['asinh','acosh','atanh','asin','acos','atan','sinh','cosh','tanh','sin','cos','tan','sec','csc','cot','sqrt','nroot','logb','log','ln','abs'].sort((a,b)=>b.length-a.length);
class SolveError extends Error{}
function casStr(row){
  const s=ser(row); if(!s) throw new SolveError('Enter an expression first.');
  if(/(int|diff|sum|prod|lim|mat|r)\(/.test(s.replace(/sqrt\(|nroot\(/g,'')) || /[°′″∠<>≤≥≠#]|mod/.test(s)) throw new SolveError('This calculator takes plain expressions: numbers, letters, powers, roots, fractions and the standard functions.');
  let out='', i=0, prev='o';
  const val=()=>{ if(prev==='v') out+='*'; prev='v'; };
  while(i<s.length){
    const c=s[i];
    if(c===' '){ i++; continue; }
    const m=/^(\d+\.?\d*|\.\d+)/.exec(s.slice(i));
    if(m){ val(); out+=m[0]; i+=m[0].length; continue; }
    const nm=CASNAMES.find(n=>s.startsWith(n+'(',i));
    if(nm){ if(prev==='v') out+='*'; out+=(CASFN[nm]||nm)+'('; i+=nm.length+1; prev='o'; continue; }
    if(s.startsWith('Ans',i)){ if(!isN(V.Ans)) throw new SolveError('Ans is not a plain number.'); val(); out+='('+V.Ans+')'; i+=3; continue; }
    if(c==='π'){ val(); out+='pi'; i++; continue; }
    if(s.startsWith('pi',i)){ val(); out+='pi'; i+=2; continue; }
    if(c==='∞'){ val(); out+='Infinity'; i++; continue; }
    if(/[a-zA-Z]/.test(c)){ val(); out+=c; i++; continue; }
    if(c==='('){ if(prev==='v') out+='*'; out+='('; prev='o'; i++; continue; }
    if(c===')'){ out+=')'; prev='v'; i++; continue; }
    if(c==='!'){ out+='!'; i++; continue; }
    if(c==='%'){ out+='/100'; i++; continue; }
    const op={'×':'*','÷':'/','−':'-','+':'+','-':'-','*':'*','/':'/','^':'^',',':',','=':'='}[c];
    if(!op) throw new SolveError('The symbol “'+c+'” is not supported here.');
    out+=op; prev='o'; i++;
  }
  return out;
}
function splitTop(s,sep){ const out=[]; let d=0,cur=''; for(const ch of s){ if(ch==='('||ch==='[') d++; else if(ch===')'||ch===']') d--; if(ch===sep&&d===0){ out.push(cur); cur=''; } else cur+=ch; } out.push(cur); return out; }
const listOf=s=>{ s=String(s).trim(); if(s.startsWith('[')) s=s.slice(1,-1); return s?splitTop(s,','):[]; };

/* ---------- algebra text -> tree ---------- */
const A={
  num:n=>n<0?{k:'neg',a:{k:'num',v:String(-n)}}:{k:'num',v:String(n)},
  rat:(p,q)=>q===1?A.num(p):(p<0?{k:'neg',a:{k:'div',a:A.num(-p),b:A.num(q)}}:{k:'div',a:A.num(p),b:A.num(q)}),
  sym:n=>({k:'sym',n}), fn:(n,...a)=>({k:'fn',n,a}),
  neg:a=>isNum(a,0)?a:a.k==='neg'?a.a:{k:'neg',a},
  add:(...ts)=>{ const f=[]; ts.forEach(t=>{ if(t.k==='add') f.push(...t.a); else if(!isNum(t,0)) f.push(t); }); return f.length===0?A.num(0):f.length===1?f[0]:{k:'add',a:f}; },
  mul:(...fs)=>{ const f=[]; let c=1,neg=false;
    const put=t=>{ if(t.k==='mul') t.a.forEach(put); else if(t.k==='neg'){ neg=!neg; put(t.a); } else if(t.k==='num'&&/^\d+$/.test(t.v)) c*=+t.v; else f.push(t); };
    fs.forEach(put); if(c===0) return A.num(0);
    if(c!==1||!f.length) f.unshift({k:'num',v:String(c)});
    const r=f.length===1?f[0]:{k:'mul',a:f}; return neg?{k:'neg',a:r}:r; },
  div:(a,b)=>isNum(b,1)?a:isNum(a,0)?a:{k:'div',a,b},
  pow:(a,b)=>isNum(b,1)?a:isNum(b,0)?A.num(1):{k:'pow',a,b}
};
const isNum=(a,v)=>a.k==='num'&&a.v===String(v);
function parseCAS(src){
  const tk=String(src).match(/\d+\.?\d*|\.\d+|[A-Za-z_][A-Za-z0-9_]*|[-+*/^(),!]/g)||[]; let p=0;
  const next=()=>tk[p++], is=v=>tk[p]===v;
  function expr(){ const ts=[term()]; while(is('+')||is('-')){ const o=next(), r=term(); ts.push(o==='-'?{k:'neg',a:r}:r); } return ts.length>1?{k:'add',a:ts}:ts[0]; }
  function term(){ let l=unary(); while(is('*')||is('/')){ const o=next(), r=unary(); if(o==='/') l={k:'div',a:l,b:r}; else l={k:'mul',a:[...(l.k==='mul'?l.a:[l]),...(r.k==='mul'?r.a:[r])]}; } return l; }
  function unary(){ if(is('-')){ next(); return {k:'neg',a:unary()}; } if(is('+')){ next(); return unary(); } return pow(); }
  function pow(){ let b=post(); if(is('^')){ next(); b={k:'pow',a:b,b:unary()}; } return b; }
  function post(){ let a=prim(); while(is('!')){ next(); a={k:'fact',a}; } return a; }
  function prim(){
    const t=next(); if(t===undefined) throw new SolveError('The expression is incomplete.');
    if(/^[\d.]/.test(t)) return {k:'num',v:t};
    if(t==='('){ const e=expr(); if(next()!==')') throw new SolveError('Brackets do not match.'); return e; }
    if(/^[A-Za-z_]/.test(t)){
      if(is('(')){ next(); const a=[]; if(!is(')')){ a.push(expr()); while(is(',')){ next(); a.push(expr()); } } if(next()!==')') throw new SolveError('Brackets do not match.'); return {k:'fn',n:t,a}; }
      return {k:'sym',n:t};
    }
    throw new SolveError('Unexpected “'+t+'”.');
  }
  const e=expr(); if(p<tk.length) throw new SolveError('Unexpected “'+tk[p]+'”.'); return e;
}
function astStr(a){
  switch(a.k){
    case 'num': return a.v; case 'sym': return a.n;
    case 'neg': return '(-'+astStr(a.a)+')';
    case 'add': return '('+a.a.map(astStr).join('+')+')';
    case 'mul': return '('+a.a.map(astStr).join('*')+')';
    case 'div': return '('+astStr(a.a)+'/'+astStr(a.b)+')';
    case 'pow': return '('+astStr(a.a)+'^'+astStr(a.b)+')';
    case 'fact': return astStr(a.a)+'!';
    case 'fn': return a.n+'('+a.a.map(astStr).join(',')+')';
  }
}
const free=(a,v)=>a.k==='sym'?a.n!==v:a.k==='num'?true:(a.a instanceof Array?a.a:[a.a,a.b].filter(Boolean)).every(t=>free(t,v));
/* exact rational value of a purely numeric tree, or null */
function rat(a){
  if(a.k==='num'){ if(!a.v.includes('.')) return {p:+a.v,q:1}; const d=a.v.split('.')[1].length, q=Math.pow(10,d), p=Math.round(parseFloat(a.v)*q), g=gcd(p,q)||1; return {p:p/g,q:q/g}; }
  if(a.k==='neg'){ const r=rat(a.a); return r&&{p:-r.p,q:r.q}; }
  if(a.k==='div'){ const x=rat(a.a),y=rat(a.b); if(!x||!y||!y.p) return null; let p=x.p*y.q,q=x.q*y.p; if(q<0){p=-p;q=-q;} const g=gcd(p,q)||1; return {p:p/g,q:q/g}; }
  if(a.k==='mul'){ let p=1,q=1; for(const f of a.a){ const r=rat(f); if(!r) return null; p*=r.p; q*=r.q; } const g=gcd(p,q)||1; return {p:p/g,q:q/g}; }
  return null;
}
const MF={sin:Math.sin,cos:Math.cos,tan:Math.tan,sec:x=>1/Math.cos(x),csc:x=>1/Math.sin(x),cot:x=>1/Math.tan(x),asin:Math.asin,acos:Math.acos,atan:Math.atan,sinh:Math.sinh,cosh:Math.cosh,tanh:Math.tanh,asinh:Math.asinh,acosh:Math.acosh,atanh:Math.atanh,log:Math.log,log10:Math.log10,sqrt:Math.sqrt,abs:Math.abs,exp:Math.exp,sign:Math.sign};
function evalAst(a,env){
  switch(a.k){
    case 'num': return parseFloat(a.v);
    case 'sym': if(a.n in env) return env[a.n]; if(a.n==='pi') return Math.PI; if(a.n==='e') return Math.E; if(a.n==='Infinity') return Infinity; if(a.n==='i') return NaN; return 0.61+(a.n.charCodeAt(0)%7)/4.3;
    case 'neg': return -evalAst(a.a,env);
    case 'add': return a.a.reduce((t,x)=>t+evalAst(x,env),0);
    case 'mul': return a.a.reduce((t,x)=>t*evalAst(x,env),1);
    case 'div': return evalAst(a.a,env)/evalAst(a.b,env);
    case 'pow': return pw(evalAst(a.a,env),evalAst(a.b,env));
    case 'fact': return fact(evalAst(a.a,env));
    case 'fn': { const f=MF[a.n]; return f&&a.a.length===1?f(evalAst(a.a[0],env)):NaN; }
  }
  return NaN;
}
function sameFn(a,b,v){
  let seen=0;
  for(const x of [0.37,1.21,2.6,-0.83]){ const p=evalAst(a,{[v]:x}), q=evalAst(b,{[v]:x}); if(!Number.isFinite(p)||!Number.isFinite(q)) continue; seen++; if(Math.abs(p-q)>1e-6*(1+Math.abs(p))) return false; }
  return seen>0;
}

/* ---------- tree -> natural display row ---------- */
let PV='x';
const paren=r=>[C('('),...r,C(')')];
const P=a=>{ const r=sg(a); return r.neg?[C('−'),...r.row]:r.row; };
function degOf(a){
  if(free(a,PV)) return -1;
  if(a.k==='sym') return 1;
  if(a.k==='neg') return degOf(a.a);
  if(a.k==='pow'&&a.a.k==='sym'){ const r=rat(a.b); return r?r.p/r.q:0.5; }
  if(a.k==='mul') return a.a.reduce((t,f)=>t+Math.max(0,degOf(f)),0);
  if(a.k==='div') return degOf(a.a)-Math.max(0,degOf(a.b));
  return 0.5;
}
function sg(a){
  switch(a.k){
    case 'num': return {neg:false,row:chars(a.v)};
    case 'sym': return {neg:false,row:[C(a.n==='pi'?'π':a.n==='Infinity'?'∞':a.n)]};
    case 'neg': { const r=sg(a.a); return {neg:!r.neg,row:a.a.k==='add'?paren(r.row):r.row}; }
    case 'add': {
      const ts=a.a.map((t,i)=>({t,i,d:degOf(t)})).sort((x,y)=>y.d-x.d||x.i-y.i), row=[];
      ts.forEach(({t},i)=>{ const r=sg(t); if(i===0){ if(r.neg) row.push(C('−')); } else row.push(C(r.neg?'−':'+')); row.push(...r.row); });
      return {neg:false,row};
    }
    case 'mul': case 'div': return mulRow(a);
    case 'pow': return powRow(a);
    case 'fact': { const r=P(a.a); return {neg:false,row:[...(a.a.k==='num'||a.a.k==='sym'?r:paren(r)),C('!')]}; }
    case 'fn': {
      const args=a.a.map(P);
      if(a.n==='sqrt'&&args.length===1) return {neg:false,row:[{t:'sqrt',a:args[0]}]};
      if(a.n==='abs'&&args.length===1) return {neg:false,row:[{t:'abs',a:args[0]}]};
      if(a.n==='exp'&&args.length===1) return {neg:false,row:[C('e'),{t:'pow',a:args[0]}]};
      const nm={log:'ln',log10:'log'}[a.n]||a.n, row=[C(nm+'(')];
      args.forEach((r,i)=>{ if(i) row.push(C(',')); row.push(...r); }); row.push(C(')'));
      return {neg:false,row};
    }
  }
  return {neg:false,row:[C('?')]};
}
function mulRow(a){
  const o={neg:false,p:1,q:1,num:[],den:[]};
  (function collect(t,inv){
    if(t.k==='mul') t.a.forEach(f=>collect(f,inv));
    else if(t.k==='div'){ collect(t.a,inv); collect(t.b,!inv); }
    else if(t.k==='neg'){ o.neg=!o.neg; collect(t.a,inv); }
    else{
      const r=rat(t);
      if(r){ if(r.p<0) o.neg=!o.neg; const p=Math.abs(r.p); if(inv){ o.q*=p; o.p*=r.q; } else { o.p*=p; o.q*=r.q; } }
      else if(t.k==='pow'&&negExp(t.b)) (inv?o.num:o.den).push({k:'pow',a:t.a,b:A.neg(t.b)});
      else (inv?o.den:o.num).push(t);
    }
  })(a,false);
  const g=gcd(o.p,o.q)||1; o.p/=g; o.q/=g;
  const rank=f=>f.k==='sym'||(f.k==='pow'&&f.a.k==='sym')?1:f.k==='pow'?2:f.k==='add'?3:4;
  const facRow=(c,fs)=>{
    const row=(c!==1||!fs.length)?chars(c):[];
    fs.map((f,i)=>({f,i})).sort((x,y)=>rank(x.f)-rank(y.f)||x.i-y.i).forEach(({f})=>{
      const s=sg(f); let r=s.neg?[C('−'),...s.row]:s.row; if(f.k==='add'||s.neg) r=paren(r);
      const last=row[row.length-1]; if(last&&last.t==='c'&&/\d/.test(last.v)&&r[0].t==='c'&&/^\d$/.test(r[0].v)) row.push(C('×'));
      row.push(...r);
    });
    return row;
  };
  if(o.q===1&&!o.den.length) return {neg:o.neg,row:facRow(o.p,o.num)};
  return {neg:o.neg,row:[{t:'frac',a:facRow(o.p,o.num),b:facRow(o.q,o.den)}]};
}
const negExp=b=>{ const r=rat(b); return r?r.p<0:b.k==='neg'; };
function powRow(a){
  if(negExp(a.b)) return {neg:false,row:[{t:'frac',a:[C('1')],b:powRow({k:'pow',a:a.a,b:A.neg(a.b)}).row}]};
  const r=rat(a.b);
  if(r&&r.p===1&&r.q===2) return {neg:false,row:[{t:'sqrt',a:P(a.a)}]};
  if(r&&r.p===1&&r.q>2) return {neg:false,row:[{t:'root',n:chars(r.q),a:P(a.a)}]};
  if(r&&r.p===1&&r.q===1) return sg(a.a);
  const b=P(a.a), simple=a.a.k==='sym'||a.a.k==='num'||a.a.k==='fn';
  return {neg:false,row:[...(simple?b:paren(b)),{t:'pow',a:P(a.b)}]};
}
const casRow=s=>P(parseCAS(s));

/* ---------- derivative with steps ---------- */
const DT={
  sin:u=>A.fn('cos',u), cos:u=>A.neg(A.fn('sin',u)), tan:u=>A.pow(A.fn('sec',u),A.num(2)),
  sec:u=>A.mul(A.fn('sec',u),A.fn('tan',u)), csc:u=>A.neg(A.mul(A.fn('csc',u),A.fn('cot',u))), cot:u=>A.neg(A.pow(A.fn('csc',u),A.num(2))),
  log:u=>A.div(A.num(1),u), log10:u=>A.div(A.num(1),A.mul(u,A.fn('log',A.num(10)))), exp:u=>A.fn('exp',u),
  sqrt:u=>A.div(A.num(1),A.mul(A.num(2),A.fn('sqrt',u))),
  asin:u=>A.div(A.num(1),A.fn('sqrt',A.add(A.num(1),A.neg(A.pow(u,A.num(2)))))),
  acos:u=>A.neg(A.div(A.num(1),A.fn('sqrt',A.add(A.num(1),A.neg(A.pow(u,A.num(2))))))),
  atan:u=>A.div(A.num(1),A.add(A.num(1),A.pow(u,A.num(2)))),
  sinh:u=>A.fn('cosh',u), cosh:u=>A.fn('sinh',u), tanh:u=>A.div(A.num(1),A.pow(A.fn('cosh',u),A.num(2))),
  abs:u=>A.div(u,A.fn('abs',u))
};
const FNAME={log:'ln',log10:'log',exp:'eˣ',sqrt:'√',asin:'sin⁻¹',acos:'cos⁻¹',atan:'tan⁻¹',abs:'|u|'};
function D(a,v,st){
  if(free(a,v)) return A.num(0);
  const log=(label,r)=>{ const key=astStr(a); if(!st.some(s=>s.key===key)) st.push({key,label,row:[{t:'frac',a:[C('d')],b:[C('d'),C(v)]},...paren(P(a)),C('='),...P(r)]}); return r; };
  switch(a.k){
    case 'sym': return A.num(1);
    case 'neg': return A.neg(D(a.a,v,st));
    case 'add': return log('Sum rule: differentiate each term separately',A.add(...a.a.map(t=>D(t,v,st))));
    case 'mul': {
      const cs=a.a.filter(f=>free(f,v)), vs=a.a.filter(f=>!free(f,v));
      if(cs.length){ const du=D(A.mul(...vs),v,st); return log('Constant multiple rule: keep the constant factor',A.mul(...cs,du)); }
      const u=vs[0], w=A.mul(...vs.slice(1)), du=D(u,v,st), dw=D(w,v,st);
      return log('Product rule: (uv)′ = u′v + uv′',A.add(A.mul(du,w),A.mul(u,dw)));
    }
    case 'div': {
      if(free(a.b,v)){ const du=D(a.a,v,st); return log('Constant multiple rule: the denominator is a constant',A.div(du,a.b)); }
      const du=D(a.a,v,st), dw=D(a.b,v,st);
      return log('Quotient rule: (u/v)′ = (u′v − uv′) / v²',A.div(A.add(A.mul(du,a.b),A.neg(A.mul(a.a,dw))),A.pow(a.b,A.num(2))));
    }
    case 'pow': {
      const u=a.a, n=a.b, inner=u.k!=='sym';
      if(free(n,v)){
        const r=rat(n), n1=r?A.rat(r.p-r.q,r.q):A.add(n,A.num(-1)), du=inner?D(u,v,st):null;
        return log('Power rule: (uⁿ)′ = n·uⁿ⁻¹'+(inner?'·u′, with the chain rule for the inside':''),A.mul(n,A.pow(u,n1),...(du?[du]:[])));
      }
      if(free(u,v)){
        const dn=n.k==='sym'?null:D(n,v,st), isE=u.k==='sym'&&u.n==='e';
        return log(isE?'Exponential rule: (eᵘ)′ = eᵘ·u′':'Exponential rule: (aᵘ)′ = aᵘ·ln a·u′',A.mul(a,...(isE?[]:[A.fn('log',u)]),...(dn?[dn]:[])));
      }
      const du=D(u,v,st), dn=D(n,v,st);
      return log('Logarithmic differentiation: (uᵛ)′ = uᵛ·(v′·ln u + v·u′/u)',A.mul(a,A.add(A.mul(dn,A.fn('log',u)),A.div(A.mul(n,du),u))));
    }
    case 'fn': {
      const f=DT[a.n]; if(!f||a.a.length!==1) throw new Error('nosteps');
      const u=a.a[0], inner=u.k!=='sym', du=inner?D(u,v,st):null, nm=FNAME[a.n]||a.n;
      return log('Derivative of '+nm+(inner?', then the chain rule: multiply by the derivative of the inside':''),du?A.mul(f(u),du):f(u));
    }
  }
  throw new Error('nosteps');
}

/* ---------- integral: which rule each term uses ---------- */
function intRule(core,v){
  if(free(core,v)) return 'Integral of a constant: ∫c dx = c·x';
  const lin=u=>{ if(u.k==='sym') return ''; try{ const d=D(u,v,[]); return free(d,v)?', with the substitution u = (the linear inside)':null; }catch(e){ return null; } };
  if(core.k==='sym') return 'Power rule: ∫xⁿ dx = xⁿ⁺¹/(n+1)';
  if(core.k==='pow'&&free(core.b,v)){
    const r=rat(core.b), l=lin(core.a);
    if(l!==null) return (r&&r.p===-r.q?'Reciprocal rule: ∫1/x dx = ln|x|':'Power rule: ∫xⁿ dx = xⁿ⁺¹/(n+1)')+l;
  }
  if(core.k==='div'&&free(core.a,v)){ const l=lin(core.b); if(l!==null) return 'Reciprocal rule: ∫1/x dx = ln|x|'+l; if(core.b.k==='pow'&&free(core.b.b,v)&&lin(core.b.a)!==null) return 'Power rule with a negative exponent'+lin(core.b.a); }
  if(core.k==='pow'&&free(core.a,v)){ const l=lin(core.b); if(l!==null) return 'Exponential rule: ∫aˣ dx = aˣ/ln a'+l; }
  if(core.k==='fn'&&core.a.length===1){ const l=lin(core.a[0]); if(l!==null&&['sin','cos','exp','sinh','cosh','sqrt'].includes(core.n)) return 'Standard integral of '+(FNAME[core.n]||core.n)+l; }
  return 'Found by the algebra engine (substitution, integration by parts or partial fractions as needed); no worked steps for this term';
}
function splitConst(t,v){
  let neg=false; if(t.k==='neg'){ neg=true; t=t.a; }
  let cs=[], core=t;
  if(t.k==='mul'){ cs=t.a.filter(f=>free(f,v)); const vs=t.a.filter(f=>!free(f,v)); core=vs.length?A.mul(...vs):A.num(1); if(!vs.length) cs=[]; if(!vs.length) core=t; }
  return {neg,cs,core};
}

/* ---------- exact fractions and matrices ---------- */
const fr=(n,d=1)=>{ if(d<0){ n=-n; d=-d; } const g=gcd(n,d)||1; return {n:n/g,d:d/g}; };
const fadd=(a,b)=>fr(a.n*b.d+b.n*a.d,a.d*b.d), fsub=(a,b)=>fr(a.n*b.d-b.n*a.d,a.d*b.d), fmul=(a,b)=>fr(a.n*b.n,a.d*b.d), fdiv=(a,b)=>fr(a.n*b.d,a.d*b.n);
const fstr=f=>(f.n<0?'−':'')+Math.abs(f.n)+(f.d===1?'':'/'+f.d);
const frow=f=>{ const b=f.d===1?chars(Math.abs(f.n)):[{t:'frac',a:chars(Math.abs(f.n)),b:chars(f.d)}]; return f.n<0?[C('−'),...b]:b; };
function parseCell(s){
  s=String(s).trim().replace('−','-'); if(s==='') return fr(0);
  let m=/^(-?\d+)\s*\/\s*(\d+)$/.exec(s); if(m&&+m[2]) return fr(+m[1],+m[2]);
  m=/^-?\d*\.?\d+$/.exec(s)||/^-?\d+\.?$/.exec(s); if(!m) return null;
  const d=(s.split('.')[1]||'').length, q=Math.pow(10,d); return fr(Math.round(parseFloat(s)*q),q);
}
const matNode=M=>({t:'mat',r:M.length,c:M[0].length,cells:M.flat().map(frow)});
const mcopy=M=>M.map(r=>r.slice());
function rref(M0,steps){
  const M=mcopy(M0), R=M.length, Cn=M[0].length, piv=[]; let r=0, sign=1, scale=fr(1);
  const snap=text=>{ if(steps) steps.push({label:text,row:[matNode(M)]}); };
  for(let c=0;c<Cn&&r<R;c++){
    let p=r; while(p<R&&M[p][c].n===0) p++;
    if(p===R) continue;
    if(p!==r){ [M[p],M[r]]=[M[r],M[p]]; sign=-sign; snap('Swap R'+(r+1)+' and R'+(p+1)); }
    const pv=M[r][c];
    if(!(pv.n===1&&pv.d===1)){ scale=fmul(scale,pv); M[r]=M[r].map(x=>fdiv(x,pv)); snap('Divide R'+(r+1)+' by '+fstr(pv)+' to make the pivot 1'); }
    const ops=[];
    for(let k=0;k<R;k++){ if(k===r||M[k][c].n===0) continue; const f=M[k][c]; M[k]=M[k].map((x,j)=>fsub(x,fmul(f,M[r][j]))); ops.push('R'+(k+1)+' → R'+(k+1)+(f.n<0?' + ':' − ')+fstr(fr(Math.abs(f.n),f.d))+'·R'+(r+1)); }
    if(ops.length) snap('Clear column '+(c+1)+': '+ops.join(', '));
    piv.push(c); r++;
  }
  return {M,piv,sign,scale};
}
function fdet(M){ const n=M.length; if(n===1) return M[0][0]; if(n===2) return fsub(fmul(M[0][0],M[1][1]),fmul(M[0][1],M[1][0]));
  let d=fr(0); for(let j=0;j<n;j++){ const minor=M.slice(1).map(r=>r.filter((_,k)=>k!==j)); d=fadd(d,fmul(fmul(fr(j%2?-1:1),M[0][j]),fdet(minor))); } return d; }
const fmulM=(X,Y)=>X.map(r=>Y[0].map((_,j)=>r.reduce((t,x,k)=>fadd(t,fmul(x,Y[k][j])),fr(0))));
const identF=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>fr(+(i===j))));

/* ---------- geometry ---------- */
const g8=v=>String(Number(v.toPrecision(8))).replace('-','−');
const rad=d=>d*Math.PI/180, deg=r=>r*180/Math.PI;
const GEO={
  pyth:{name:'Pythagorean theorem',hint:'Enter any two sides of a right-angled triangle. c is the hypotenuse.',fields:[['a','Leg a'],['b','Leg b'],['c','Hypotenuse c']],need:2,
    run(v){ const st=[]; let {a,b,c}=v;
      if(c===undefined){ c=Math.hypot(a,b); st.push('c² = a² + b²','c = √('+g8(a)+'² + '+g8(b)+'²) = √'+g8(a*a+b*b)+' = '+g8(c)); }
      else{ const k=a===undefined?b:a, nm=a===undefined?'a':'b'; if(c<=k) throw new SolveError('The hypotenuse must be longer than the leg.'); const x=Math.sqrt(c*c-k*k);
        st.push(nm+'² = c² − '+(nm==='a'?'b':'a')+'²',nm+' = √('+g8(c)+'² − '+g8(k)+'²) = √'+g8(c*c-k*k)+' = '+g8(x)); if(a===undefined) a=x; else b=x; }
      st.push('Area = ½·a·b = '+g8(a*b/2),'Perimeter = a + b + c = '+g8(a+b+c));
      return {out:[['a',a],['b',b],['c',c],['Area',a*b/2],['Perimeter',a+b+c],['Angle opposite a',deg(Math.atan2(a,b)),'°'],['Angle opposite b',deg(Math.atan2(b,a)),'°']],steps:st,tri:[a,b,c]}; }},
  tri:{name:'Triangle solver',hint:'Enter three values, at least one of them a side. Side a is opposite angle A, and so on. Angles are in degrees.',fields:[['a','Side a'],['b','Side b'],['c','Side c'],['A','Angle A (°)'],['B','Angle B (°)'],['C','Angle C (°)']],need:3,
    run(v){ const st=[], S3=['a','b','c'], A3=['A','B','C']; let s=S3.map(k=>v[k]), an=A3.map(k=>v[k]);
      const ns=s.filter(x=>x!==undefined).length, na=an.filter(x=>x!==undefined).length;
      if(ns===0) throw new SolveError('At least one side is needed; three angles fix the shape but not the size.');
      if(an.some(x=>x!==undefined&&x>=180)) throw new SolveError('Each angle must be less than 180°.');
      const cosA=(i)=>{ const [j,k]=[0,1,2].filter(x=>x!==i); return deg(Math.acos((s[j]*s[j]+s[k]*s[k]-s[i]*s[i])/(2*s[j]*s[k]))); };
      if(ns===3){
        const [x,y,z]=s.slice().sort((p,q)=>p-q); if(x+y<=z) throw new SolveError('These sides cannot form a triangle: the two shorter sides must add up to more than the longest.');
        st.push('Three sides known: use the cosine rule, cos A = (b² + c² − a²) / (2bc)'); an=[0,1,2].map(cosA);
        A3.forEach((n,i)=>st.push(n+' = '+g8(an[i])+'°'));
      }else if(ns===2&&na===1){
        const ai=an.findIndex(x=>x!==undefined), si=s.findIndex(x=>x===undefined);
        if(ai===si){
          const [j,k]=[0,1,2].filter(x=>x!==si); s[si]=Math.sqrt(s[j]*s[j]+s[k]*s[k]-2*s[j]*s[k]*Math.cos(rad(an[ai])));
          st.push('Two sides and the angle between them: cosine rule, '+S3[si]+'² = '+S3[j]+'² + '+S3[k]+'² − 2·'+S3[j]+'·'+S3[k]+'·cos '+A3[si],S3[si]+' = '+g8(s[si]));
          an[j]=cosA(j); an[k]=180-an[ai]-an[j]; st.push('Cosine rule again: '+A3[j]+' = '+g8(an[j])+'°','Angles add to 180°: '+A3[k]+' = '+g8(an[k])+'°');
        }else{
          const o=[0,1,2].find(x=>x!==ai&&x!==si), sn=s[o]*Math.sin(rad(an[ai]))/s[ai];
          if(sn>1+1e-12) throw new SolveError('No triangle fits these values: the side opposite the given angle is too short.');
          st.push('Two sides and an angle not between them: sine rule, sin '+A3[o]+' = '+S3[o]+'·sin '+A3[ai]+' / '+S3[ai]+' = '+g8(Math.min(1,sn)));
          an[o]=deg(Math.asin(Math.min(1,sn)));
          const alt=180-an[o]; if(sn<1-1e-9&&alt+an[ai]<180&&s[o]>s[ai]) st.push('Ambiguous case: '+A3[o]+' could also be '+g8(alt)+'°, giving a second triangle. The acute solution is shown.');
          an[si]=180-an[ai]-an[o]; if(an[si]<=0) throw new SolveError('No triangle fits these values.');
          s[si]=s[ai]*Math.sin(rad(an[si]))/Math.sin(rad(an[ai]));
          st.push(A3[o]+' = '+g8(an[o])+'°','Angles add to 180°: '+A3[si]+' = '+g8(an[si])+'°','Sine rule: '+S3[si]+' = '+S3[ai]+'·sin '+A3[si]+' / sin '+A3[ai]+' = '+g8(s[si]));
        }
      }else if(ns===1&&na===2){
        const mi=an.findIndex(x=>x===undefined); an[mi]=180-an.reduce((t,x)=>t+(x||0),0);
        if(an[mi]<=0) throw new SolveError('The two angles must add up to less than 180°.');
        st.push('Angles add to 180°: '+A3[mi]+' = '+g8(an[mi])+'°');
        const k=s.findIndex(x=>x!==undefined), r=s[k]/Math.sin(rad(an[k]));
        st.push('Sine rule: a / sin A = b / sin B = c / sin C = '+g8(r));
        [0,1,2].forEach(i=>{ if(i!==k){ s[i]=r*Math.sin(rad(an[i])); st.push(S3[i]+' = '+g8(r)+'·sin '+A3[i]+' = '+g8(s[i])); } });
      }else throw new SolveError('Enter exactly three values, at least one of them a side.');
      const area=0.5*s[0]*s[1]*Math.sin(rad(an[2])), per=s[0]+s[1]+s[2];
      st.push('Area = ½·a·b·sin C = '+g8(area),'Perimeter = a + b + c = '+g8(per));
      return {out:[...S3.map((n,i)=>[n,s[i]]),...A3.map((n,i)=>[n,an[i],'°']),['Area',area],['Perimeter',per],['Inradius',2*area/per],['Circumradius',s[0]/(2*Math.sin(rad(an[0])))]],steps:st,tri:s}; }},
  iso:{name:'Isosceles triangle',hint:'Enter any two of: the equal side, the base, the height onto the base, the apex angle.',fields:[['a','Equal side a'],['b','Base b'],['h','Height h'],['t','Apex angle (°)']],need:2,
    run(v){ const st=[]; let {a,b,h,t}=v;
      if(t!==undefined&&t>=180) throw new SolveError('The apex angle must be less than 180°.');
      if(a!==undefined&&b!==undefined){ if(b>=2*a) throw new SolveError('The base must be shorter than twice the equal side.'); h=Math.sqrt(a*a-b*b/4); st.push('The height splits the base in half: h = √(a² − (b/2)²) = '+g8(h)); }
      else if(a!==undefined&&h!==undefined){ if(h>=a) throw new SolveError('The height must be shorter than the equal side.'); b=2*Math.sqrt(a*a-h*h); st.push('b = 2·√(a² − h²) = '+g8(b)); }
      else if(b!==undefined&&h!==undefined){ a=Math.hypot(h,b/2); st.push('a = √(h² + (b/2)²) = '+g8(a)); }
      else if(a!==undefined){ b=2*a*Math.sin(rad(t/2)); h=a*Math.cos(rad(t/2)); st.push('b = 2·a·sin(apex/2) = '+g8(b),'h = a·cos(apex/2) = '+g8(h)); }
      else if(b!==undefined){ a=b/(2*Math.sin(rad(t/2))); h=a*Math.cos(rad(t/2)); st.push('a = b / (2·sin(apex/2)) = '+g8(a),'h = a·cos(apex/2) = '+g8(h)); }
      else { a=h/Math.cos(rad(t/2)); b=2*a*Math.sin(rad(t/2)); st.push('a = h / cos(apex/2) = '+g8(a),'b = 2·a·sin(apex/2) = '+g8(b)); }
      if(t===undefined){ t=2*deg(Math.asin(b/(2*a))); st.push('Apex angle = 2·sin⁻¹(b / 2a) = '+g8(t)+'°'); }
      st.push('Base angles = (180° − apex) / 2 = '+g8((180-t)/2)+'°','Area = ½·b·h = '+g8(b*h/2),'Perimeter = 2a + b = '+g8(2*a+b));
      return {out:[['Equal side a',a],['Base b',b],['Height h',h],['Apex angle',t,'°'],['Base angles',(180-t)/2,'°'],['Area',b*h/2],['Perimeter',2*a+b]],steps:st,tri:[a,a,b]}; }},
  circle:{name:'Circle',hint:'Enter any one value.',fields:[['r','Radius r'],['d','Diameter d'],['C','Circumference C'],['A','Area A']],need:1,
    run(v){ const st=[]; let r=v.r;
      if(v.d!==undefined){ r=v.d/2; st.push('r = d / 2 = '+g8(r)); } else if(v.C!==undefined){ r=v.C/(2*Math.PI); st.push('r = C / (2π) = '+g8(r)); } else if(v.A!==undefined){ r=Math.sqrt(v.A/Math.PI); st.push('r = √(A / π) = '+g8(r)); }
      st.push('d = 2r = '+g8(2*r),'C = 2πr = '+g8(2*Math.PI*r),'A = πr² = π·'+g8(r)+'² = '+g8(Math.PI*r*r));
      return {out:[['Radius',r],['Diameter',2*r],['Circumference',2*Math.PI*r],['Area',Math.PI*r*r]],steps:st}; }},
  sector:{name:'Sector and arc',hint:'Enter the radius and the central angle.',fields:[['r','Radius r'],['t','Angle θ (°)']],need:2,
    run(v){ const {r,t}=v, th=rad(t), arc=r*th, ar=r*r*th/2, ch=2*r*Math.sin(th/2), seg=r*r*(th-Math.sin(th))/2;
      return {out:[['Arc length',arc],['Sector area',ar],['Chord length',ch],['Segment area',seg]],steps:['θ in radians = θ°·π/180 = '+g8(th),'Arc length = r·θ = '+g8(arc),'Sector area = ½·r²·θ = '+g8(ar),'Chord = 2·r·sin(θ/2) = '+g8(ch),'Segment area = ½·r²·(θ − sin θ) = '+g8(seg)]}; }},
  rect:{name:'Rectangle',hint:'Enter the width and height.',fields:[['w','Width'],['h','Height']],need:2,
    run(v){ const {w,h}=v; return {out:[['Area',w*h],['Perimeter',2*(w+h)],['Diagonal',Math.hypot(w,h)]],steps:['Area = w·h = '+g8(w*h),'Perimeter = 2(w + h) = '+g8(2*(w+h)),'Diagonal = √(w² + h²) = '+g8(Math.hypot(w,h))]}; }},
  poly:{name:'Regular polygon',hint:'Enter the number of sides and the side length.',fields:[['n','Number of sides n'],['s','Side length s']],need:2,
    run(v){ const {n,s}=v; if(!Number.isInteger(n)||n<3) throw new SolveError('The number of sides must be a whole number, 3 or more.');
      const ap=s/(2*Math.tan(Math.PI/n)), R=s/(2*Math.sin(Math.PI/n)), ar=n*s*ap/2;
      return {out:[['Perimeter',n*s],['Apothem',ap],['Circumradius',R],['Area',ar],['Interior angle',180*(n-2)/n,'°']],steps:['Perimeter = n·s = '+g8(n*s),'Apothem = s / (2·tan(180°/n)) = '+g8(ap),'Area = ½·perimeter·apothem = '+g8(ar),'Circumradius = s / (2·sin(180°/n)) = '+g8(R),'Interior angle = 180°·(n − 2) / n = '+g8(180*(n-2)/n)+'°']}; }},
  sphere:{name:'Sphere',hint:'Enter the radius.',fields:[['r','Radius r']],need:1,
    run(v){ const r=v.r; return {out:[['Volume',4/3*Math.PI*r**3],['Surface area',4*Math.PI*r*r]],steps:['Volume = (4/3)·π·r³ = '+g8(4/3*Math.PI*r**3),'Surface area = 4·π·r² = '+g8(4*Math.PI*r*r)]}; }},
  cyl:{name:'Cylinder',hint:'Enter the radius and height.',fields:[['r','Radius r'],['h','Height h']],need:2,
    run(v){ const {r,h}=v, V0=Math.PI*r*r*h, L=2*Math.PI*r*h, T=L+2*Math.PI*r*r; return {out:[['Volume',V0],['Curved surface area',L],['Total surface area',T]],steps:['Volume = π·r²·h = '+g8(V0),'Curved surface = 2·π·r·h = '+g8(L),'Total surface = 2·π·r·h + 2·π·r² = '+g8(T)]}; }},
  cone:{name:'Cone',hint:'Enter the radius and height.',fields:[['r','Radius r'],['h','Height h']],need:2,
    run(v){ const {r,h}=v, l=Math.hypot(r,h), V0=Math.PI*r*r*h/3, L=Math.PI*r*l, T=L+Math.PI*r*r; return {out:[['Slant height',l],['Volume',V0],['Curved surface area',L],['Total surface area',T]],steps:['Slant height l = √(r² + h²) = '+g8(l),'Volume = ⅓·π·r²·h = '+g8(V0),'Curved surface = π·r·l = '+g8(L),'Total surface = π·r·l + π·r² = '+g8(T)]}; }},
  box:{name:'Cuboid',hint:'Enter the length, width and height.',fields:[['l','Length'],['w','Width'],['h','Height']],need:3,
    run(v){ const {l,w,h}=v, V0=l*w*h, T=2*(l*w+l*h+w*h), d=Math.hypot(l,w,h); return {out:[['Volume',V0],['Surface area',T],['Space diagonal',d]],steps:['Volume = l·w·h = '+g8(V0),'Surface area = 2(lw + lh + wh) = '+g8(T),'Space diagonal = √(l² + w² + h²) = '+g8(d)]}; }}
};
if(typeof module!=='undefined') module.exports={casStr,parseCAS,astStr,P,casRow,D,sameFn,evalAst,intRule,splitConst,rref,fdet,parseCell,fr,fstr,GEO,A,listOf,splitTop,fmulM,identF,frow};

/*UI*/
if(typeof document!=='undefined'){
const SV={tool:'deriv',
  d:{row:[C('x'),{t:'pow',a:[C('2')]},C('sin('),C('x'),C(')')],v:'x',n:1},
  i:{row:[C('x'),C('e'),{t:'pow',a:[C('x')]}],lo:[],hi:[],v:'x'},
  a:{row:[C('x'),{t:'pow',a:[C('2')]},C('−'),C('5'),C('x'),C('+'),C('6'),C('='),C('0')],v:'x'},
  m:{r:3,c:3,A:[['2','1','−1'],['−3','−1','2'],['−2','1','2']],br:3,bc:1,B:[['8'],['−11'],['−3']]},
  g:{shape:'tri',vals:{tri:{a:'3',b:'4',c:'5'},pyth:{a:'3',b:'4'},circle:{r:'2'}}},
  out:{}
};
const TOOLS=[['deriv','Derivative'],['integ','Integral'],['alg','Algebra'],['mat','Matrix'],['geo','Geometry']];
const host=$('#solve');
const needLib=()=>{ if(!getNJ()) throw new SolveError('The algebra library did not load, so symbolic results are unavailable. Check the connection and reload. Matrix and Geometry still work.'); };
const addMath=(parent,row,cls)=>{ const d=el('div','smath'+(cls?' '+cls:'')); parent.appendChild(d); staticMath(d,row); return d; };
const eqRow=(l,r)=>[...l,C('='),...r];
const decOf=s=>{ try{ const v=evalAst(parseCAS(s),{}); return Number.isFinite(v)?v:null; }catch(e){ return null; } };

function show(tool,res){ SV.out[tool]=res; renderOut(); }
function renderOut(){
  const o=$('#sout'); if(!o) return; o.textContent=''; const res=SV.out[SV.tool]; if(!res) return;
  if(res.error){ o.appendChild(el('p','serr',res.error)); return; }
  (res.blocks||[]).forEach(b=>{
    o.appendChild(el('h3','',b.title));
    if(b.row) addMath(o,b.row,'res');
    if(b.table){ const t=el('div','gtable'); b.table.forEach(([n,v,u])=>{ t.append(el('span','',n),el('strong','',g8(v)+(u||''))); }); o.appendChild(t); }
    if(b.svg){ const w=el('div','gsvg'); w.innerHTML=b.svg; o.appendChild(w); }
    if(b.note) o.appendChild(el('p','snote',b.note));
    if(b.send){ const r=el('div','trow');
      const s=el('button','btn','Send to calculator'); s.type='button'; s.onclick=()=>{ setView('calc'); setActive(mainEd); mainEd.insRow(clone(b.send)); }; r.appendChild(s);
      if(b.graph){ const g=el('button','btn','Graph it'); g.type='button'; g.disabled=fns.length>=6; g.onclick=()=>{ fns.push({row:clone(b.send),on:true}); buildFnList(); setView('graph'); draw(); save(); }; r.appendChild(g); }
      o.appendChild(r); }
  });
  if(res.steps&&res.steps.length){
    o.appendChild(el('h3','','Steps'));
    const ol=el('ol','steps');
    o.appendChild(ol);
    res.steps.forEach(s=>{ if(s.head){ ol.appendChild(el('li','shead',s.label)); return; } const li=el('li'); ol.appendChild(li); if(s.label) li.appendChild(el('div','slabel',s.label)); if(s.row) addMath(li,s.row); });
  }
  if(res.note) o.appendChild(el('p','snote',res.note));
}
const guard=(tool,f)=>()=>{ try{ show(tool,f()); }catch(e){ show(tool,{error:e instanceof SolveError||e instanceof CalcError?(e instanceof CalcError?'Check the expression: something is missing or out of place.':e.message):'The algebra engine could not handle this input ('+(e.message||'unknown error')+').'}); } };
const onlyX=row=>{ try{ const f=compile(ser(row)); return !f.eq; }catch(e){ return false; } };
const ORD=['','First','Second','Third','Fourth'];

const runDeriv=guard('deriv',()=>{
  needLib(); const st=SV.d, v=st.v; PV=v; let cur=casStr(st.row), ast=parseCAS(cur); const input=P(ast), steps=[]; let missing=false;
  for(let k=1;k<=st.n;k++){
    const res=NJ('diff('+cur+','+v+')').toString(), rAst=parseCAS(res); let s=[];
    try{ const mine=D(ast,v,s); if(!sameFn(mine,rAst,v)&&!(free(rAst,v)&&Math.abs(evalAst(mine,{[v]:0.37})-evalAst(rAst,{}))<1e-9)) s=null; }catch(e){ s=null; }
    if(st.n>1) steps.push({head:true,label:ORD[k]+' derivative'});
    if(s){ steps.push(...s); steps.push({label:'Simplify',row:P(rAst)}); } else { missing=true; steps.push({label:'No worked steps for this one; the result comes straight from the algebra engine',row:P(rAst)}); }
    cur=res; ast=rAst;
  }
  const out=P(ast), dn=st.n===1?[C('d')]:[C('d'),{t:'pow',a:chars(st.n)}], dd=st.n===1?[C('d'),C(v)]:[C('d'),C(v),{t:'pow',a:chars(st.n)}];
  return {blocks:[{title:'Result',row:eqRow([{t:'frac',a:dn,b:dd},...paren(input)],out),send:out,graph:v==='x'&&onlyX(out)}],steps,note:missing?'':'Each step was checked numerically against the engine’s answer.'};
});

const runInteg=guard('integ',()=>{
  needLib(); const st=SV.i, v=st.v; PV=v; const expr=casStr(st.row), ast=parseCAS(expr), input=P(ast);
  const hasB=st.lo.length||st.hi.length; if(hasB&&!(st.lo.length&&st.hi.length)) throw new SolveError('Fill in both limits, or leave both empty for an indefinite integral.');
  const g=x=>evalAst(ast,{[v]:x});
  let F=null; try{ const r=NJ('integrate('+expr+','+v+')').toString(); if(!/integrate|defint/.test(r)) F=r; }catch(e){}
  const blocks=[], steps=[]; let note='';
  const intHead=(lo,hi)=>[{t:'int',lo:lo||[],hi:hi||[],a:input}];
  if(F){
    const FA=parseCAS(F), out=P(FA);
    const terms=ast.k==='add'?ast.a:[ast];
    if(terms.length>1) steps.push({label:'Sum rule: integrate each term separately',row:input});
    terms.forEach(t=>{
      const {neg,cs,core}=splitConst(t,v); let r; try{ r=NJ('integrate('+astStr(t)+','+v+')').toString(); }catch(e){ return; } if(/integrate/.test(r)) return;
      steps.push({label:(cs.length||neg?'Constant multiple rule, then ':'')+intRule(core,v),row:eqRow([{t:'int',lo:[],hi:[],a:P(t)}],casRow(r))});
    });
    steps.push({label:'Combine and add the constant of integration',row:[...out,C('+'),C('C')]});
    const ok=[0.41,1.27,2.3].every(x=>{ const h=1e-5, d=(evalAst(FA,{[v]:x+h})-evalAst(FA,{[v]:x-h}))/(2*h), y=g(x); return !Number.isFinite(d)||!Number.isFinite(y)||Math.abs(d-y)<1e-4*(1+Math.abs(y)); });
    note=ok?'Checked: differentiating the result numerically gives back the integrand.':'Warning: a numerical check of this result did not match the integrand. Treat it with caution.';
    if(!hasB) blocks.push({title:'Result',row:eqRow(intHead(),[...out,C('+'),C('C')]),send:out,graph:v==='x'&&onlyX(out)});
    else{
      const a=casStr(st.lo), b=casStr(st.hi), num=integrateAny(g,evalAst(parseCAS(a),{}),evalAst(parseCAS(b),{}));
      let ex=null; if(!/Infinity/.test(a+b)){ try{ ex=NJ('('+NJ(F,{[v]:'('+b+')'}).toString()+')-('+NJ(F,{[v]:'('+a+')'}).toString()+')').toString(); }catch(e){} }
      const exv=ex&&decOf(ex), good=exv!==null&&exv!==undefined&&ex&&Math.abs(exv-num)<1e-6*(1+Math.abs(num));
      steps.push({label:'Apply the limits: F(upper) − F(lower)',row:good?casRow(ex):decRow(num)});
      blocks.push({title:'Result',row:eqRow(intHead(P(parseCAS(a)),P(parseCAS(b))),good?[...casRow(ex),...(rat(parseCAS(ex))?[]:[C('≈'),...decRow(exv)])]:decRow(num)),send:good?casRow(ex):decRow(num)});
      blocks.push({title:'Antiderivative',row:[...out,C('+'),C('C')]});
      if(!good) note+=' The definite value shown was computed numerically.';
    }
  }else{
    if(!hasB) throw new SolveError('No closed-form antiderivative was found for this integrand. Add limits to get a numerical value.');
    const a=casStr(st.lo), b=casStr(st.hi), num=integrateAny(g,evalAst(parseCAS(a),{}),evalAst(parseCAS(b),{}));
    if(!Number.isFinite(num)) throw new SolveError('The integral could not be evaluated over these limits.');
    blocks.push({title:'Result (numerical)',row:eqRow(intHead(P(parseCAS(a)),P(parseCAS(b))),decRow(num)),send:decRow(num)});
    note='No closed-form antiderivative was found, so this value was computed numerically.';
  }
  return {blocks,steps,note};
});

function runAlg(op){ return guard('alg',()=>{
  needLib(); const st=SV.a, v=st.v; PV=v; const src=casStr(st.row);
  if(op!=='solve'){
    if(src.includes('=')||src.includes(',')) throw new SolveError('Simplify, Expand and Factor take a single expression without = or commas.');
    const r=NJ(op+'('+src+')').toString(), name={simplify:'Simplified',expand:'Expanded',factor:'Factorised'}[op], out=casRow(r);
    return {blocks:[{title:name,row:eqRow(casRow(src),out),send:out,graph:v==='x'&&onlyX(out)}],note:'Worked steps are not available for '+op+'; the result comes from the algebra engine.'};
  }
  const eqs=splitTop(src,',').filter(Boolean);
  if(eqs.length>1){
    if(!eqs.every(e=>e.split('=').length===2)) throw new SolveError('Each equation in a system needs exactly one = sign.');
    const sol=NJ.solveEquations(eqs); if(!sol||!sol.length) throw new SolveError('No unique solution was found for this system.');
    const row=[]; sol.forEach(([n,val],i)=>{ if(i) row.push(C(','),C(' ')); const r=typeof val==='number'?ratApprox(val,99999,1e-11):null; row.push(C(n),C('='),...(r?frow(fr(r[0],r[1])):casRow(String(val)))); });
    return {blocks:[{title:'Solution',row}],note:'Systems are solved by the algebra engine (elimination); worked steps are not shown. Use the Matrix calculator for row-by-row steps on linear systems.'};
  }
  const parts=src.split('='); if(parts.length>2) throw new SolveError('Use a single = sign.');
  const p=parts.length===2?'('+parts[0]+')-('+parts[1]+')':src, steps=[];
  let cf=null; try{ const ex=NJ('expand('+p+')').toString(), c=listOf(NJ('coeffs('+ex+','+v+')').toString());
    const chk=parseCAS(c.map((x,k)=>'('+x+')*'+v+'^'+k).join('+')); if(c.length>1&&c.every(x=>free(parseCAS(x),v))&&sameFn(chk,parseCAS(p),v)) cf={c,ex}; }catch(e){}
  if(cf){
    const n=cf.c.length-1, std=eqRow(casRow(cf.ex),[C('0')]);
    steps.push({label:'Move everything to one side and collect terms',row:std});
    if(n===1){ const [b,a]=cf.c; steps.push({label:'Isolate the '+v+' term',row:eqRow(casRow('('+a+')*'+v),casRow('-('+b+')'))},{label:'Divide both sides by the coefficient of '+v,row:eqRow([C(v)],casRow(NJ('-('+b+')/('+a+')').toString()))}); }
    else if(n===2){
      const [c0,b,a]=cf.c, disc=NJ('('+b+')^2-4*('+a+')*('+c0+')').toString(), dv=decOf(disc);
      steps.push({label:'Identify the coefficients of a'+v+'² + b'+v+' + c = 0',row:[C('a'),C('='),...casRow(a),C(','),C(' '),C('b'),C('='),...casRow(b),C(','),C(' '),C('c'),C('='),...casRow(c0)]});
      let fac=null; try{ fac=NJ('factor('+cf.ex+')').toString(); }catch(e){}
      if(fac&&reallyFactors(fac,v)&&!/sqrt|\^\(?1\/2/.test(fac)) steps.push({label:'It factorises, so each bracket can be set to zero',row:eqRow(casRow(fac),[C('0')])});
      steps.push({label:'Discriminant: Δ = b² − 4ac',row:eqRow([C('Δ')],casRow(disc))});
      if(dv!==null) steps.push({label:dv>1e-12?'Δ is positive, so there are two real solutions':Math.abs(dv)<=1e-12?'Δ is zero, so there is one repeated solution':'Δ is negative, so the solutions are complex'});
      steps.push({label:'Quadratic formula',row:[C(v),C('='),{t:'frac',a:[...casRow('-('+b+')'),C('±'),{t:'sqrt',a:casRow(disc)}],b:casRow('2*('+a+')')}]});
    }else{
      let fac=null; try{ fac=NJ('factor('+cf.ex+')').toString(); }catch(e){}
      if(fac&&reallyFactors(fac,v)) steps.push({label:'Factorise, then set each factor to zero',row:eqRow(casRow(fac),[C('0')])});
      else steps.push({label:'This degree-'+n+' polynomial has no simple factorisation, so its roots are found numerically'});
    }
  }
  const pa=parseCAS(p), numericOnly=onlyNum(pa,v);
  let res=null;
  if(cf&&numericOnly) res=polySolve(cf.ex,v);
  else if(numericOnly) res=funcSolve(pa,v);
  else{
    /* letters other than the unknown: only the algebra engine can answer, so keep its real, exact-looking roots */
    let roots=[]; try{ roots=listOf(NJ.solve(parts.length===2?src:src+'=0',v).toString()); }catch(e){}
    roots=roots.filter(r=>!hasSym(parseCAS(r),'i')&&!BIGRAT.test(r));
    res={sols:roots.map(r=>({row:casRow(r),re:NaN,im:0})),numeric:false};
  }
  const sols=res.sols;
  if(!sols.length) throw new SolveError(numericOnly?'No solution was found for '+v+'. Checked: real values between about −600 000 and 600 000'+(cf?' and complex roots of the polynomial':'')+'.':'No solution was found for '+v+'.');
  const row=[C(v),C('=')]; if(res.before) row.push(C('…'),C(','),C(' '));
  sols.forEach((r,i)=>{ if(i) row.push(C(','),C(' ')); row.push(...r.row); });
  if(res.after) row.push(C(','),C(' '),C('…'));
  if(cf) steps.push({label:sols.length>1?'Solutions':'Solution',row});
  const blocks=[{title:sols.length>1?'Solutions':'Solution',row,send:sols.length===1?sols[0].row:null}];
  const whole=x=>Math.abs(x-Math.round(x))<1e-12;
  if(sols.some(r=>!r.dec&&Number.isFinite(r.re)&&!(whole(r.re)&&whole(r.im)))){ const dr=[C(v),C('≈')]; sols.forEach((r,i)=>{ if(i) dr.push(C(','),C(' ')); dr.push(...cplxDec(r.re,r.im)); }); blocks.push({title:'Decimal',row:dr}); }
  let note='';
  if(res.scan) note='Found numerically: '+(sols.length>1?'these are the real solutions nearest 0':'this is the only real solution found between about −600 000 and 600 000')+(res.before||res.after?'. There are more, for example because the equation repeats periodically':'')+'.'+(/sin|cos|tan|sec|csc|cot/.test(src)?' Trigonometric functions here use radians.':'');
  else if(res.numeric) note='Some roots have no simple exact form, so they were found numerically and are shown as decimals.';
  else if(!cf) note='Worked steps are only available for polynomial equations; these solutions come from the algebra engine.';
  if(res.complex) note=(note?note+' ':'')+'Complex roots are included because the polynomial has fewer real roots than its degree.';
  return {blocks,steps,note};
}); }

/* ---------- reliable roots ----------
   The algebra library's solve() returns wrong complex roots (x² + 1 = 0 gives ±i/2) and rational
   approximations in place of surds, so roots are worked out here and every one is checked numerically. */
const BIGRAT=/^-?\d{6,}\/\d{5,}$/;
const syms=(a,out=new Set())=>{ if(a.k==='sym') out.add(a.n); else (a.a instanceof Array?a.a:[a.a,a.b].filter(Boolean)).forEach(t=>syms(t,out)); return out; };
const hasSym=(a,n)=>syms(a).has(n);
const onlyNum=(a,v)=>[...syms(a)].every(n=>n===v||n==='pi'||n==='e');
const cplxDec=(re,im)=>{ const r=[]; if(Math.abs(im)<=1e-12*(1+Math.abs(re))) return decRow(re);
  if(Math.abs(re)>1e-12*Math.abs(im)) r.push(...decRow(re));
  if(im<0) r.push(C('−')); else if(r.length) r.push(C('+'));
  const a=Math.abs(im); if(Math.abs(a-1)>1e-12) r.push(...decRow(a)); r.push(C('i')); return r; };
const realRow=x=>{ const e=exactRow(x,'π sqrt'); return e?{row:e,dec:false}:{row:decRow(x),dec:true}; };
/* all complex roots of a polynomial with numeric coefficients c[0..n] (c[k] multiplies x^k): Durand–Kerner, then Newton */
function numRoots(c){
  c=c.slice(); while(c.length>1&&c[c.length-1]===0) c.pop();
  const n=c.length-1; if(n<1) return [];
  let lead=0; while(lead<n&&c[lead]===0) lead++;           /* factor out x^lead: roots at 0 */
  const zeros=Array.from({length:lead},()=>({re:0,im:0})); c=c.slice(lead); const m=c.length-1; if(m<1) return zeros;
  const a=c.map(x=>x/c[m]);
  const ev=w=>{ let pr=1,pi=0,dr=0,di=0; for(let k=m-1;k>=0;k--){ const nr=dr*w.re-di*w.im+pr, ni=dr*w.im+di*w.re; dr=nr; di=ni; const qr=pr*w.re-pi*w.im+a[k], qi=pr*w.im+pi*w.re; pr=qr; pi=qi; } return {pr,pi,dr,di}; };
  const R=1+Math.max(...a.slice(0,m).map(Math.abs));
  let z=Array.from({length:m},(_,k)=>({re:R*Math.cos(2*Math.PI*k/m+0.4)*0.7,im:R*Math.sin(2*Math.PI*k/m+0.4)*0.7}));
  for(let it=0;it<800;it++){ let mv=0;
    z=z.map((w,i)=>{ const {pr,pi}=ev(w); let er=1,ei=0; z.forEach((u,j)=>{ if(j===i) return; const xr=w.re-u.re, xi=w.im-u.im, t=er*xr-ei*xi; ei=er*xi+ei*xr; er=t; });
      const d=er*er+ei*ei||1e-300, qr=(pr*er+pi*ei)/d, qi=(pi*er-pr*ei)/d; mv=Math.max(mv,Math.hypot(qr,qi)/(1+Math.hypot(w.re,w.im))); return {re:w.re-qr,im:w.im-qi}; });
    if(mv<1e-16) break; }
  z=z.map(w=>{ for(let i=0;i<4;i++){ const {pr,pi,dr,di}=ev(w), d=dr*dr+di*di; if(!d) break; const nw={re:w.re-(pr*dr+pi*di)/d,im:w.im-(pi*dr-pr*di)/d}; if(!Number.isFinite(nw.re)||!Number.isFinite(nw.im)) break; w=nw; } return w; });
  return zeros.concat(z.map(w=>Math.abs(w.im)<=1e-9*(1+Math.abs(w.re))?{re:w.re,im:0}:w));
}
const coeffNums=(ex,v)=>{ const cs=listOf(NJ('coeffs('+ex+','+v+')').toString()); const ns=cs.map(decOf); if(ns.some(x=>x===null)) throw new SolveError('The coefficients could not be evaluated.'); return {cs,ns}; };
function polyVal(ns,z){ let r=0,i=0,sz=0; for(let k=ns.length-1;k>=0;k--){ const t=r*z.re-i*z.im+ns[k]; i=r*z.im+i*z.re; r=t; sz=sz*Math.hypot(z.re,z.im)+Math.abs(ns[k]); } return {r:Math.hypot(r,i),scale:sz}; }
/* the factors of a factorised expression that contain v, as {base, pw}: (x-1)^3*(x+2) -> [x-1 ×3, x+2 ×1] */
function factorsOf(str,v){
  const out=[], walk=a=>{
    if(a.k==='neg') return walk(a.a);
    if(a.k==='mul') return a.a.forEach(walk);
    if(a.k==='div'){ walk(a.a); if(!free(a.b,v)) throw new Error('not a polynomial'); return; }
    if(free(a,v)) return;
    if(a.k==='pow'){ const r=rat(a.b); if(r&&r.q===1&&r.p>0) return out.push({base:astStr(a.a),pw:r.p}); }
    out.push({base:astStr(a),pw:1});
  };
  walk(parseCAS(str)); return out;
}
const reallyFactors=(fac,v)=>{ try{ const f=factorsOf(fac,v); return f.length>1||f.some(o=>o.pw>1); }catch(e){ return false; } };
/* roots of a polynomial in v given as an expanded expression; exact for linear and quadratic factors */
function polySolve(ex,v){
  const all=coeffNums(ex,v), sols=[]; let numeric=false;
  const same=(p,q)=>Math.abs(p.re-q.re)+Math.abs(p.im-q.im)<=1e-7*(1+Math.hypot(p.re,p.im));
  const put=s=>{ if(!Number.isFinite(s.re)||!Number.isFinite(s.im)) return; const ch=polyVal(all.ns,s); if(ch.r>1e-7*(1+ch.scale)) return; if(!sols.some(t=>same(t,s))) sols.push(s); };
  const exactOr=(str,x)=>{ const d=decOf(str); return d!==null&&Math.abs(d-x)<=1e-9*(1+Math.abs(x))&&!BIGRAT.test(str)?{row:casRow(str),dec:false}:realRow(x); };
  const solveFactor=f=>{
    let cs,ns; try{ ({cs,ns}=coeffNums(NJ('expand('+f+')').toString(),v)); }catch(e){ return -1; }
    while(ns.length>1&&ns[ns.length-1]===0){ ns.pop(); cs.pop(); }
    const n=ns.length-1; if(n<1) return 0;
    if(ns.slice(0,n).every(x=>x===0)){ put({re:0,im:0,row:[C('0')],dec:false}); return n; }
    if(n===1){ const x=-ns[0]/ns[1]; put({re:x,im:0,...exactOr(NJ('-('+cs[0]+')/('+cs[1]+')').toString(),x)}); return 1; }
    if(n===2){
      const [c0,b,a]=ns, D=b*b-4*a*c0, ds=NJ('('+cs[1]+')^2-4*('+cs[2]+')*('+cs[0]+')').toString();
      if(Math.abs(D)<=1e-13*(b*b+Math.abs(4*a*c0))){ const x=-b/(2*a); put({re:x,im:0,...exactOr(NJ('-('+cs[1]+')/(2*('+cs[2]+'))').toString(),x)}); return 2; }
      if(D>0){ [1,-1].forEach(sg=>{ const x=(-b+sg*Math.sqrt(D))/(2*a); put({re:x,im:0,...exactOr(NJ('(-('+cs[1]+')'+(sg>0?'+':'-')+'sqrt('+ds+'))/(2*('+cs[2]+'))').toString(),x)}); }); return 2; }
      const re=-b/(2*a), im=Math.sqrt(-D)/Math.abs(2*a);
      let reS=null, imS=null; try{ reS=NJ('-('+cs[1]+')/(2*('+cs[2]+'))').toString(); imS=NJ('sqrt(-('+ds+'))/abs(2*('+cs[2]+'))').toString(); }catch(e){}
      const okS=(s,x)=>s&&!BIGRAT.test(s)&&decOf(s)!==null&&Math.abs(decOf(s)-x)<=1e-9*(1+Math.abs(x));
      [1,-1].forEach(sg=>{
        let row;
        if(okS(reS,re)&&okS(imS,im)){ row=[]; if(Math.abs(re)>1e-14) row.push(...casRow(reS)); row.push(C(sg>0?(row.length?'+':''):'−')); if(Math.abs(im-1)>1e-14) row.push(...casRow(imS)); row.push(C('i')); row=row.filter(n=>!(n.t==='c'&&n.v==='')); }
        else row=cplxDec(re,sg*im);
        put({re,im:sg*im,row,dec:!(okS(reS,re)&&okS(imS,im))});
      });
      return 2;
    }
    numRoots(ns).forEach(z=>{ numeric=true; put(z.im===0?{re:z.re,im:0,...realRow(z.re)}:{re:z.re,im:z.im,row:cplxDec(z.re,z.im),dec:true}); });
    return n;
  };
  let fac=null; try{ fac=NJ('factor('+ex+')').toString(); }catch(e){}
  /* split the factorised form into factors, each with its power, e.g. (x-1)^3*(x+2) */
  const deg=all.ns.length-1; let parts=[]; try{ if(fac) parts=factorsOf(fac,v); }catch(e){ parts=[]; }
  let covered=0; for(const o of parts){ const d=solveFactor(o.base); if(d<0){ covered=-1; break; } covered+=d*o.pw; }
  if(covered!==deg){ sols.length=0; numeric=false; solveFactor(ex); }
  sols.sort((p,q)=>(p.im!==0)-(q.im!==0)||p.re-q.re||q.im-p.im);
  return {sols,numeric,complex:sols.some(s=>s.im!==0)};
}
/* real roots of a general equation: exact ones from the algebra engine if they check out, plus a numerical scan */
function funcSolve(pa,v){
  const fx=x=>evalAst(pa,{[v]:x}), sols=[];
  const put=s=>{ if(!sols.some(t=>Math.abs(t.re-s.re)<=1e-7*(1+Math.abs(s.re)))) sols.push(s); };
  /* The algebra library is not asked here: for non-polynomial equations it only returns rough fractions (which
     were discarded anyway), it is slow, and it tries to compile code with eval, which the apps' security policy blocks. */
  const old=V.x; let found=[]; try{ found=solve(()=>fx(V.x),()=>0); }finally{ V.x=old; }
  const nice=x=>{ const e=exactRow(x,'π sqrt'); if(e) return {row:e,dec:false};
    let r=ratApprox(x,12,1e-9); if(r&&r[1]>1) return {row:frow(fr(r[0],r[1])),dec:false}; if(r) return {row:decRow(r[0]),dec:true};
    r=ratApprox(x/Math.PI,12,1e-9); if(r){ const nu=[...(Math.abs(r[0])===1?[]:chars(Math.abs(r[0]))),C('π')], b=r[1]===1?nu:[{t:'frac',a:nu,b:chars(r[1])}]; return {row:r[0]<0?[C('−'),...b]:b,dec:false}; }
    return {row:decRow(x),dec:true}; };
  found.forEach(x=>put({re:x,im:0,...nice(x)}));
  sols.sort((p,q)=>Math.abs(p.re)-Math.abs(q.re));
  const keep=sols.slice(0,8).sort((p,q)=>p.re-q.re), lo=Math.min(...sols.map(s=>s.re)), hi=Math.max(...sols.map(s=>s.re));
  return {sols:keep,scan:true,before:keep.length&&keep[0].re>lo,after:keep.length&&keep[keep.length-1].re<hi};
}

/* matrix */
function readMat(which){
  const m=SV.m, R=which==='A'?m.r:m.br, Cn=which==='A'?m.c:m.bc, src=m[which], M=[];
  for(let i=0;i<R;i++){ const row=[]; for(let j=0;j<Cn;j++){ const f=parseCell((src[i]||[])[j]||''); if(!f) throw new SolveError('Matrix '+which+', row '+(i+1)+', column '+(j+1)+' is not a number. Use whole numbers, decimals or fractions like 3/4.'); row.push(f); } M.push(row); }
  return M;
}
const sq=(M,n)=>{ if(M.length!==M[0].length) throw new SolveError(n+' needs a square matrix.'); };
function runMat(op){ return guard('mat',()=>{
  const Am=readMat('A'), steps=[], lab=(t,M)=>[C(t),C('='),matNode(M)];
  const res=(title,row,send,note)=>({blocks:[{title,row,send}],steps,note});
  if(op==='T'){ const T=Am[0].map((_,j)=>Am.map(r=>r[j])); return res('Transpose',lab('Aᵀ',T),[matNode(T)],'Rows become columns.'); }
  if(op==='rref'||op==='rank'){ const r=rref(Am,steps); return op==='rref'?res('Reduced row echelon form',[matNode(r.M)],[matNode(r.M)]):res('Rank',[C('rank'),C('='),...chars(r.piv.length)],chars(r.piv.length),'The rank is the number of pivot rows in the reduced form.'); }
  if(op==='det'){
    sq(Am,'The determinant'); const n=Am.length, d=fdet(Am);
    if(n===2) steps.push({label:'For a 2 × 2 matrix, det = ad − bc = ('+fstr(Am[0][0])+')('+fstr(Am[1][1])+') − ('+fstr(Am[0][1])+')('+fstr(Am[1][0])+') = '+fstr(d)});
    else if(n===3){ steps.push({label:'Expand along the first row: each entry times the determinant of its 2 × 2 minor, with signs + − +'});
      for(let j=0;j<3;j++){ const mn=Am.slice(1).map(r=>r.filter((_,k)=>k!==j)); steps.push({label:(j%2?'−':'+')+' ('+fstr(Am[0][j])+') × det of minor = '+(j%2?'−':'+')+' ('+fstr(Am[0][j])+') × ('+fstr(fdet(mn))+')',row:[matNode(mn)]}); }
      steps.push({label:'Add the three terms: det = '+fstr(d)}); }
    else if(n>3){ const r=rref(Am,steps); steps.push({label:'det = (product of the pivots divided out) × (−1 for each row swap) = '+fstr(d)+(r.piv.length<n?'. A zero row appeared, so the determinant is 0':'')}); }
    return res('Determinant',[C('det('),C('A'),C(')'),C('='),...frow(d)],frow(d));
  }
  if(op==='inv'){
    sq(Am,'The inverse'); const n=Am.length; if(fdet(Am).n===0) throw new SolveError('This matrix has determinant 0, so it has no inverse.');
    steps.push({label:'Write A next to the identity matrix, then row-reduce until the left half is the identity',row:[matNode(Am.map((r,i)=>[...r,...identF(n)[i]]))]});
    const r=rref(Am.map((r,i)=>[...r,...identF(n)[i]]),steps), inv=r.M.map(row=>row.slice(n));
    steps.push({label:'The right half is now the inverse'});
    return res('Inverse',lab('A⁻¹',inv),[matNode(inv)]);
  }
  if(op==='eig'){
    sq(Am,'Eigenvalues'); needLib(); const n=Am.length; let numeric=false; if(n>3) throw new SolveError('Eigenvalues are available for matrices up to 3 × 3.');
    const f=x=>'('+x.n+'/'+x.d+')', tr=Am.reduce((t,r,i)=>fadd(t,r[i]),fr(0)), d=fdet(Am);
    let poly; if(n===1) poly='x-'+f(d); else if(n===2) poly='x^2-'+f(tr)+'*x+'+f(d);
    else{ let m2=fr(0); for(let i=0;i<3;i++){ const mn=Am.filter((_,r)=>r!==i).map(r=>r.filter((_,k)=>k!==i)); m2=fadd(m2,fdet(mn)); } poly='x^3-'+f(tr)+'*x^2+'+f(m2)+'*x-'+f(d); }
    const ren=a=>{ if(a.k==='sym'&&a.n==='x') return {k:'sym',n:'λ'}; const o={...a}; if(a.a instanceof Array) o.a=a.a.map(ren); else if(a.a) o.a=ren(a.a); if(a.b) o.b=ren(a.b); return o; };
    PV='λ'; const pe=NJ('expand('+poly+')').toString();
    steps.push({label:'Characteristic equation: det(A − λI) = 0',row:eqRow(P(ren(parseCAS(pe))),[C('0')])});
    const row=[C('λ'),C('=')], sep=i=>{ if(i) row.push(C(','),C(' ')); };
    const pr=polySolve(pe,'x'); numeric=pr.numeric; if(!pr.sols.length) throw new SolveError('The eigenvalues could not be found.');
    pr.sols.forEach((r,i)=>{ sep(i); row.push(...r.row); });
    steps.push({label:'Solve for λ',row}); PV='x';
    return res('Eigenvalues',row,null,numeric?'Some eigenvalues have no simple exact form, so they were found numerically and are shown as decimals.':'');
  }
  const Bm=readMat('B');
  if(op==='add'||op==='sub'){ if(Am.length!==Bm.length||Am[0].length!==Bm[0].length) throw new SolveError('A and B must be the same size to add or subtract.'); const R=Am.map((r,i)=>r.map((x,j)=>(op==='add'?fadd:fsub)(x,Bm[i][j]))); return res(op==='add'?'Sum':'Difference',lab(op==='add'?'A + B':'A − B',R),[matNode(R)],'Add or subtract matching entries.'); }
  if(op==='mul'){ if(Am[0].length!==Bm.length) throw new SolveError('For A·B, the number of columns of A must equal the number of rows of B.'); const R=fmulM(Am,Bm);
    steps.push({label:'Each entry is a row of A times a column of B. For example, row 1 × column 1: '+Am[0].map((x,k)=>'('+fstr(x)+')('+fstr(Bm[k][0])+')').join(' + ')+' = '+fstr(R[0][0])});
    return res('Product',lab('A·B',R),[matNode(R)]); }
  if(op==='solve'){
    if(Am.length!==Bm.length) throw new SolveError('For A·x = B, B needs the same number of rows as A.');
    const n=Am[0].length, aug=Am.map((r,i)=>[...r,...Bm[i]]);
    steps.push({label:'Write the augmented matrix [A | B] and row-reduce',row:[matNode(aug)]});
    const r=rref(aug,steps);
    if(r.piv.some(c=>c>=n)) throw new SolveError('This system has no solution: row reduction gives a row that says 0 = non-zero.');
    if(r.piv.length<n) return res('Result',[matNode(r.M)],null,'The system has infinitely many solutions; the reduced matrix above shows the relationships between the unknowns.');
    const X=r.M.slice(0,n).map(row=>row.slice(n)); steps.push({label:'Read the solution from the last column'+(Bm[0].length>1?'s':'')});
    return res('Solution',lab('x',X),[matNode(X)]);
  }
}); }

/* geometry */
function triSvg(s){
  const [a,b,c]=s, x=(b*b+c*c-a*a)/(2*c), y=Math.sqrt(Math.max(0,b*b-x*x)), w=Math.max(c,x)-Math.min(0,x), sc=Math.min(260/w,150/(y||1)), ox=20-Math.min(0,x)*sc, oy=20+y*sc;
  const pt=(px,py)=>(ox+px*sc).toFixed(1)+','+(oy-py*sc).toFixed(1);
  return '<svg viewBox="0 0 '+(w*sc+40).toFixed(0)+' '+(y*sc+44).toFixed(0)+'" width="'+(w*sc+40).toFixed(0)+'" role="img" aria-label="Triangle drawn to scale"><polygon points="'+pt(0,0)+' '+pt(c,0)+' '+pt(x,y)+'" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>'
    +'<text x="'+(ox+c*sc/2)+'" y="'+(oy+16)+'" text-anchor="middle">c = '+g8(c)+'</text><text x="'+(ox+(x+c)/2*sc+8)+'" y="'+(oy-y*sc/2)+'">a = '+g8(a)+'</text><text x="'+(ox+x/2*sc-8)+'" y="'+(oy-y*sc/2)+'" text-anchor="end">b = '+g8(b)+'</text></svg>';
}
const runGeo=guard('geo',()=>{
  const def=GEO[SV.g.shape], raw=SV.g.vals[SV.g.shape]||{}, v={}; let n=0;
  for(const [k,label] of def.fields){ const t=String(raw[k]||'').trim(); if(!t) continue; const x=parseFloat(t.replace('−','-')); if(!Number.isFinite(x)||x<=0) throw new SolveError(label+' must be a positive number.'); v[k]=x; n++; }
  if(n!==def.need) throw new SolveError(def.hint+(n>def.need?' Clear the extra value'+(n-def.need>1?'s':'')+'.':''));
  const r=def.run(v);
  return {blocks:[{title:'Results',table:r.out,svg:r.tri?triSvg(r.tri):null}],steps:r.steps.map(s=>({label:s}))};
});

/* layout */
function varInput(st,run){ const i=el('input'); i.id='svVar'; i.value=st.v; i.maxLength=1; i.style.width='44px'; i.oninput=()=>{ if(/^[a-zA-Z]$/.test(i.value)&&!'ei'.includes(i.value)){ st.v=i.value; } }; return i; }
const labFor=(t,f)=>{ const l=el('label','',t); l.htmlFor=f; return l; };
function edBox(label,row,onRow,onEnter,cls){
  const w=el('div','sfield'+(cls?' '+cls:'')); w.appendChild(el('span','lab',label));
  const h=el('div','ed sed'); h.tabIndex=0; h.setAttribute('aria-label',label); w.appendChild(h);
  const ed=new Editor(h,{row,onChange:e=>onRow(e.root)}); ed.onEnter=onEnter; ed.rel=true; return {w,ed};
}
let firstEd=null;
function buildSolve(){
  host.textContent=''; firstEd=null;
  const bar=el('div','sbar'); TOOLS.forEach(([id,name])=>{ const b=el('button','btn'+(id===SV.tool?' sel':''),name); b.type='button'; b.onclick=()=>{ SV.tool=id; buildSolve(); if(!SV.out[id]) autoRun(); if(firstEd) setActive(firstEd); }; bar.appendChild(b); });
  const body=el('div','sbody'), inp=el('div','sinput'), out=el('div','sout'); out.id='sout'; host.append(bar,body); body.append(inp,out);
  const go=(text,fn)=>{ const b=el('button','btn go',text); b.type='button'; b.onclick=fn; return b; };
  const row=()=>{ const r=el('div','trow'); inp.appendChild(r); return r; };
  if(SV.tool==='deriv'){
    const st=SV.d, f=edBox('Function',st.row,r=>{ st.row=r; },runDeriv); inp.appendChild(f.w); firstEd=f.ed;
    const r=row(); r.append(labFor('With respect to','svVar'),varInput(st),labFor('Order','svOrd'));
    const s=el('select'); s.id='svOrd'; [1,2,3,4].forEach(n=>{ const o=el('option','',String(n)); o.value=n; s.appendChild(o); }); s.value=st.n; s.onchange=()=>{ st.n=+s.value; }; r.append(s,go('Differentiate',runDeriv));
  }else if(SV.tool==='integ'){
    const st=SV.i, f=edBox('Integrand',st.row,r=>{ st.row=r; },runInteg); inp.appendChild(f.w); firstEd=f.ed;
    const lims=el('div','slims'); const lo=edBox('Lower limit (optional)',st.lo,r=>{ st.lo=r; },runInteg,'small'), hi=edBox('Upper limit (optional)',st.hi,r=>{ st.hi=r; },runInteg,'small'); lims.append(lo.w,hi.w); inp.appendChild(lims);
    const r=row(); r.append(labFor('With respect to','svVar'),varInput(st),go('Integrate',runInteg));
  }else if(SV.tool==='alg'){
    const st=SV.a, f=edBox('Expression or equation',st.row,r=>{ st.row=r; },runAlg('solve')); inp.appendChild(f.w); firstEd=f.ed;
    const r=row(); r.append(go('Solve',runAlg('solve')),labFor('for','svVar'),varInput(st),go('Simplify',runAlg('simplify')),go('Expand',runAlg('expand')),go('Factor',runAlg('factor')));
    inp.appendChild(el('p','snote','Type = from the keyboard or with 2nd then the = key. For a system, separate the equations with commas, for example 2x + y = 5, x − y = 1.'));
  }else if(SV.tool==='mat'){
    const m=SV.m, grid=(which,R,Cn)=>{ const g=el('div','mgrid'); g.style.gridTemplateColumns='repeat('+Cn+',minmax(44px,64px))';
      for(let i=0;i<R;i++) for(let j=0;j<Cn;j++){ const c=el('input'); c.id='m'+which+i+'_'+j; c.setAttribute('aria-label',which+' row '+(i+1)+' column '+(j+1)); c.value=(m[which][i]||[])[j]||''; c.inputMode='decimal';
        c.oninput=()=>{ (m[which][i]=m[which][i]||[])[j]=c.value; }; g.appendChild(c); } return g; };
    const size=(id,label,cur,set)=>{ const s=el('select'); s.id=id; [1,2,3,4,5].forEach(n=>{ const o=el('option','',String(n)); o.value=n; s.appendChild(o); }); s.value=cur; s.onchange=()=>{ set(+s.value); buildSolve(); }; return [labFor(label,id),s]; };
    const ra=row(); ra.append(el('strong','','Matrix A'),...size('mAr','rows',m.r,v=>{ m.r=v; }),...size('mAc','columns',m.c,v=>{ m.c=v; })); inp.appendChild(grid('A',m.r,m.c));
    const o1=row(); [['det','Determinant'],['inv','Inverse'],['T','Transpose'],['rref','Row reduce'],['rank','Rank'],['eig','Eigenvalues']].forEach(([op,t])=>o1.appendChild(go(t,runMat(op))));
    const rb=row(); rb.append(el('strong','','Matrix B'),...size('mBr','rows',m.br,v=>{ m.br=v; }),...size('mBc','columns',m.bc,v=>{ m.bc=v; })); inp.appendChild(grid('B',m.br,m.bc));
    const o2=row(); [['add','A + B'],['sub','A − B'],['mul','A · B'],['solve','Solve A·x = B']].forEach(([op,t])=>o2.appendChild(go(t,runMat(op))));
    inp.appendChild(el('p','snote','Entries can be whole numbers, decimals or fractions such as 3/4. Results stay as exact fractions.'));
  }else{
    const st=SV.g, r=row(), s=el('select'); s.id='gShape'; Object.entries(GEO).forEach(([id,d])=>{ const o=el('option','',d.name); o.value=id; s.appendChild(o); }); s.value=st.shape; s.onchange=()=>{ st.shape=s.value; buildSolve(); autoRun(); };
    r.append(labFor('Shape','gShape'),s); const def=GEO[st.shape]; inp.appendChild(el('p','snote',def.hint));
    const g=el('div','gfields'); const vals=st.vals[st.shape]=st.vals[st.shape]||{};
    def.fields.forEach(([k,label])=>{ const i=el('input'); i.id='g_'+k; i.inputMode='decimal'; i.value=vals[k]||''; i.oninput=()=>{ vals[k]=i.value; runGeo(); }; g.append(labFor(label,'g_'+k),i); });
    inp.appendChild(g);
    const r2=row(); const clr=el('button','btn','Clear values'); clr.type='button'; clr.onclick=()=>{ st.vals[st.shape]={}; SV.out.geo=null; buildSolve(); }; r2.appendChild(clr);
  }
  renderOut();
}
function autoRun(){ ({deriv:runDeriv,integ:runInteg,alg:runAlg('solve'),mat:runMat('solve'),geo:runGeo})[SV.tool](); }
window.solveShown=()=>{ buildSolve(); if(!SV.out[SV.tool]) autoRun(); if(firstEd) setActive(firstEd); };
}
