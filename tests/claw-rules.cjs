const {initializeTestEnvironment,assertSucceeds,assertFails}=require('@firebase/rules-unit-testing');
const {doc,setDoc,getDoc,runTransaction,deleteDoc}=require('firebase/firestore');
const fs=require('fs'),path=require('path');
const rules=fs.readFileSync(path.join(__dirname,'../firestore.rules'),'utf8');
const port=Number(process.env.FIRESTORE_EMULATOR_HOST?.split(':').pop()||8087);
const gate='request.time >= timestamp.value(1795294800000)';
if(!rules.includes(gate))throw Error('The production release date is missing');
let checks=0;
const base=()=>({profile:{name:'Alice'},st:{sp:100000,ts:0,jw:0},shop:{owned:[],riftLedger:{keep:{status:'won'}}},cards:{ch:{},sk:{},log:[]},eggs:[],v:1,updatedAt:1});
function entry(roll,mid='',skin=''){return {v:1,roll,mid,skin,cost:1000,at:Date.now()}}
function reward(account,id,e){const r=e.roll,cash=r>=14000&&r<17000?10000:r>=17000&&r<30000?2000:r>=30000&&r<50000?500:0;account.st.sp+=cash-1000;const old=account.shop.claw||{};account.shop.claw={n:(old.n||0)+1,boots:(old.boots||0)+(r>=50000&&r<70000?1:0),titles:{hunter:0,lucky:0,azart:0,...old.titles},last:id};const t=account.shop.claw.titles;if(r===0)t.azart++;else if(r<100)t.lucky++;else if(r<1000)t.hunter++;if(r>=1000&&r<14000){if(r>=4000||!account.cards.ch[e.mid])account.cards.ch[e.mid]=(account.cards.ch[e.mid]||0)+1;if(r<4000){const k=e.mid+':'+e.skin;account.cards.sk[k]=(account.cards.sk[k]||0)+1}}account.assetOp='claw/'+id;account.updatedAt=Date.now();return account}
async function seed(env,account=base()){await env.withSecurityRulesDisabled(c=>setDoc(doc(c.firestore(),'users','alice'),account))}
async function attempt(db,id,e,mutate=()=>{},uid='alice'){return runTransaction(db,async t=>{const u=doc(db,'users',uid),s=await t.get(u),account=reward(s.data(),id,e);mutate(account);t.set(u,account);t.set(doc(db,'users',uid,'clawRuns',id),e)})}
(async()=>{
 const closed=await initializeTestEnvironment({projectId:'demo-claw-before',firestore:{host:'127.0.0.1',port,rules:rules.replace(gate,'request.time >= timestamp.value(4102444800000)')}});await closed.clearFirestore();await seed(closed);const early=closed.authenticatedContext('alice',{firebase:{sign_in_provider:'password'}}).firestore();await assertFails(attempt(early,'early',entry(70000)));checks++;await closed.cleanup();
 const env=await initializeTestEnvironment({projectId:'demo-claw-after',firestore:{host:'127.0.0.1',port,rules:rules.replace(gate,'request.time >= timestamp.value(0)')}});await env.clearFirestore();await seed(env);
 const a=env.authenticatedContext('alice',{firebase:{sign_in_provider:'password'}}).firestore(),b=env.authenticatedContext('bob',{firebase:{sign_in_provider:'password'}}).firestore(),guest=env.authenticatedContext('alice',{firebase:{sign_in_provider:'anonymous'}}).firestore();
 for(const [i,e] of [entry(0),entry(1),entry(99),entry(100),entry(999),entry(1000,'tolstikov','neon'),entry(3999,'tolstikov','comic'),entry(4000,'tolstikov'),entry(13999,'reutskaya'),entry(14000),entry(16999),entry(17000),entry(29999),entry(30000),entry(49999),entry(50000),entry(69999),entry(70000),entry(99999)].entries()){await assertSucceeds(attempt(a,'boundary-'+i,e));checks++}
 const after=(await getDoc(doc(a,'users','alice'))).data();if(after.shop.claw.n!==19||after.shop.claw.titles.azart!==1||after.shop.claw.titles.lucky!==2||after.shop.claw.titles.hunter!==2||after.shop.claw.boots!==2)throw Error('Wrong aggregate counters');if(after.cards.ch.tolstikov!==2||after.cards.sk['tolstikov:neon']!==1||after.cards.sk['tolstikov:comic']!==1)throw Error('Skin did not unlock the character exactly once');checks++;
 await assertFails(setDoc(doc(a,'users','alice','clawRuns','receipt-only'),entry(0)));checks++;
 await assertFails(attempt(a,'false-money',entry(70000),d=>d.st.sp+=50000));checks++;
 await assertFails(attempt(a,'false-title',entry(70000),d=>d.shop.claw.titles.azart++));checks++;
 await assertFails(attempt(a,'false-card',entry(70000),d=>d.cards.ch.zverev=99));checks++;
 await assertFails(attempt(a,'unrelated',entry(70000),d=>d.shop.owned.push('t:gold')));checks++;
 await assertFails(attempt(a,'invalid-skin',entry(1000,'tolstikov','royal')));checks++;
 await assertFails(attempt(a,'invalid-member',entry(4000,'not-a-person')));checks++;
 await assertFails(attempt(a,'invalid-roll',entry(100000)));checks++;
 await assertFails(attempt(a,'negative-roll',entry(-1)));checks++;
 await assertFails(attempt(a,'wrong-price',{...entry(70000),cost:1}));checks++;
 await assertFails(attempt(a,'boundary-0',entry(0)));checks++;
 await assertFails(deleteDoc(doc(a,'users','alice','clawRuns','boundary-0')));checks++;
 await assertFails(attempt(b,'someone-else',entry(0)));checks++;
 await assertFails(getDoc(doc(b,'users','alice','clawRuns','boundary-0')));checks++;
 await assertFails(attempt(guest,'anonymous',entry(0)));checks++;
 const stale=JSON.parse(JSON.stringify(after));delete stale.shop.claw;await assertFails(setDoc(doc(a,'users','alice'),stale));checks++;
 const forged=JSON.parse(JSON.stringify(after));forged.shop.claw.titles.azart++;await assertFails(setDoc(doc(a,'users','alice'),forged));checks++;
 const unchanged=JSON.parse(JSON.stringify(after));unchanged.profile.name='Alice Updated';await assertSucceeds(setDoc(doc(a,'users','alice'),unchanged));checks++;
 await seed(env,{...base(),st:{sp:999,ts:0,jw:0}});await assertFails(attempt(a,'insufficient',entry(14000)));checks++;
 await assertSucceeds(setDoc(doc(a,'players','alice'),{name:'Alice',role:'',photo:null,jackpots:100,spins:1,look:{f:'x',b:'x',c:'x',k:'x',t:'claw:azart'}}));checks++;
 await assertFails(setDoc(doc(a,'players','alice'),{name:'Alice',role:'',photo:null,jackpots:100,spins:1,look:{t:'x'.repeat(65)}}));checks++;
 console.log('Claw rule checks passed:',checks);await env.cleanup();process.exit(0);
})().catch(e=>{console.error(e);process.exit(1)});
