#!/usr/bin/env node
const cfg = JSON.parse(require('fs').readFileSync('/var/www/MyDailyAgent/config/.trello-config.json','utf8'));
const key = cfg.api_key, token = cfg.token;
const https = require('https');
function get(url) { return new Promise(r => { https.get(url,res=>{let d='';res.on('data',c=>d+=c);res.on('end',()=>{try{r(JSON.parse(d))}catch{r({raw:d.slice(0,100)})}});}).on('error',e=>r({err:e.message})); }); }
async function main() {
  const progId = cfg.daily_cards.check_progress;
  const mailId = cfg.daily_cards.check_mail;
  const [prog, mail] = await Promise.all([
    get('https://api.trello.com/1/cards/'+progId+'/checklists?key='+key+'&token='+token),
    get('https://api.trello.com/1/cards/'+mailId+'/checklists?key='+key+'&token='+token),
  ]);
  const out = { progress: [], mail: [] };
  if (Array.isArray(prog)) prog.forEach(cl => { cl.checkItems.forEach(i=>out.progress.push({cl:cl.name,name:i.name,state:i.state,id:i.id,clId:cl.id})); });
  if (Array.isArray(mail)) mail.forEach(cl => { cl.checkItems.forEach(i=>out.mail.push({cl:cl.name,name:i.name,state:i.state,id:i.id,clId:cl.id})); });
  console.log(JSON.stringify(out, null, 2));
}
main().catch(e=>console.error(e.message));
