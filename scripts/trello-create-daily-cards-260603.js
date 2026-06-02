#!/usr/bin/env node
/**
 * Create today's "Check progress" and "Check mail" cards for 2026-06-03
 * on board O83pAyqb, "Daily" list, with full checklists.
 * Then marks items complete based on today's scan results.
 */
const cfg = JSON.parse(require('fs').readFileSync('/var/www/MyDailyAgent/config/.trello-config.json','utf8'));
const key = cfg.api_key, token = cfg.token;
const https = require('https');
const DAILY_LIST = '686b1f67e6b82c615ce4762c';

function apiPost(path, params) {
  return new Promise(r => {
    const qs = Object.entries({ ...params, key, token }).map(([k,v]) => k+'='+encodeURIComponent(v)).join('&');
    const opts = { hostname: 'api.trello.com', path: '/1'+path, method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(qs) } };
    const req = https.request(opts, res => {
      let d=''; res.on('data',c=>d+=c);
      res.on('end',()=>{ try{r({status:res.statusCode,data:JSON.parse(d)})}catch{r({status:res.statusCode,raw:d.slice(0,200)})} });
    });
    req.on('error', e => r({ error: e.message }));
    req.write(qs); req.end();
  });
}

function apiPut(path, params) {
  return new Promise(r => {
    const qs = Object.entries({ ...params, key, token }).map(([k,v]) => k+'='+encodeURIComponent(v)).join('&');
    const opts = { hostname: 'api.trello.com', path: '/1'+path+'?'+qs, method: 'PUT' };
    const req = https.request(opts, res => {
      let d=''; res.on('data',c=>d+=c);
      res.on('end',()=>{ try{r({status:res.statusCode,data:JSON.parse(d)})}catch{r({status:res.statusCode,raw:d.slice(0,100)})} });
    });
    req.on('error', e => r({ error: e.message }));
    req.end();
  });
}

// Checklist items: [name, complete]
const PROGRESS_CHECKLISTS = [
  { name: 'Normal', items: [
    ['Maddy - Carrick / Kai/ Luis', true],
    ['John Yi - Amazing Meds', true],
  ]},
  { name: 'Should do', items: [
    ['James Diamond -  Vinn task  - redmine cực kì nhiều BUG', true],
  ]},
  { name: 'closely montor', items: [
    ['Rory', true],
    ['Aysar - review, đào task - đang rất RISK - review kĩ requirement của cus, Khánh làm dễ rework - HẾT TASK', true],
    ['Franc', true],
    ['Elliott - GreenFort Capital - performance issue (pending)', true],
  ]},
  { name: 'Work', items: [
    ['MPFC - suy nghĩ task để suggest', true],
    ['Marcel - update deploy with permission - monitor storage', true],
    ['Elena - SamGuard Digital Plant - review maxGraph - check build - check API', false],
    ['Raymond - LegalAtoms', true],
    ['Neural Contract - Contract Probe', true],
    ['Bailey - 404 better - staging chậm - upwork', false],
    ['Andrew Taraba - Portfolio - AnimeWorld - download backup', true],
    ['Rebecca - William Will', true],
    ['Colin - performance', true],
    ['Fountain - DOCUMENT', false],
    ['Philip', true],
  ]},
  { name: 'Pending', items: [
    ['Elena - WordPress SamGuard', false],
  ]},
];

const MAIL_CHECKLIST = [
  ['duongdn@nustechnology.com', true],
  ['carrick@nustechnology.com', true],
  ['nick@nustechnology.com', true],
  ['rick@nustechnology.com', true],
  ['kai@nustechnology.com', true],
  ['ken@nustechnology.com', true],
];

async function createCardWithChecklists(cardName, checklists) {
  const card = await apiPost('/cards', { name: cardName, idList: DAILY_LIST, pos: 'top' });
  if (!card.data || !card.data.id) { console.log('Failed to create card:', JSON.stringify(card)); return null; }
  const cardId = card.data.id;
  console.log(`Created card: ${cardName} (${cardId})`);

  for (const cl of checklists) {
    const clRes = await apiPost(`/cards/${cardId}/checklists`, { name: cl.name });
    if (!clRes.data || !clRes.data.id) { console.log('Failed to create checklist:', cl.name); continue; }
    const clId = clRes.data.id;

    for (const [itemName] of cl.items) {
      await apiPost(`/checklists/${clId}/checkItems`, { name: itemName });
    }

    // Fetch items to get their IDs for completion
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  // Reload card checklists to get item IDs, then complete
  await new Promise(resolve => setTimeout(resolve, 500));
  const checklistsData = await new Promise(r => {
    const url = `https://api.trello.com/1/cards/${cardId}/checklists?key=${key}&token=${token}`;
    https.get(url, res => { let d=''; res.on('data',c=>d+=c); res.on('end',()=>r(JSON.parse(d))); }).on('error',e=>r([]));
  });

  const clByName = {};
  for (const cl of (checklistsData || [])) clByName[cl.name] = cl;

  for (const clDef of checklists) {
    const clData = clByName[clDef.name];
    if (!clData) continue;
    for (const [itemName, complete] of clDef.items) {
      if (!complete) continue;
      const item = clData.checkItems.find(i => i.name === itemName);
      if (item) {
        await apiPut(`/cards/${cardId}/checkItem/${item.id}`, { state: 'complete' });
      }
    }
  }

  return cardId;
}

async function main() {
  console.log('Creating Check progress card...');
  const progressId = await createCardWithChecklists('Check progress', PROGRESS_CHECKLISTS);

  console.log('\nCreating Check mail card...');
  const mailCard = await apiPost('/cards', { name: 'Check mail', idList: DAILY_LIST, pos: 'top' });
  if (mailCard.data && mailCard.data.id) {
    const mailId = mailCard.data.id;
    console.log(`Created card: Check mail (${mailId})`);
    const clRes = await apiPost(`/cards/${mailId}/checklists`, { name: 'Accounts' });
    if (clRes.data && clRes.data.id) {
      const clId = clRes.data.id;
      for (const [name] of MAIL_CHECKLIST) {
        await apiPost(`/checklists/${clId}/checkItems`, { name });
      }
      await new Promise(r => setTimeout(r, 500));
      const clData = await new Promise(r => {
        const url = `https://api.trello.com/1/cards/${mailId}/checklists?key=${key}&token=${token}`;
        https.get(url, res => { let d=''; res.on('data',c=>d+=c); res.on('end',()=>r(JSON.parse(d))); }).on('error',e=>r([]));
      });
      for (const cl of (clData || [])) {
        for (const [itemName, complete] of MAIL_CHECKLIST) {
          if (!complete) continue;
          const item = cl.checkItems.find(i => i.name === itemName);
          if (item) await apiPut(`/cards/${mailId}/checkItem/${item.id}`, { state: 'complete' });
        }
      }
    }
  }

  console.log('\nDone. Progress card:', progressId);
}

main().catch(e => console.error('Fatal:', e.message));
