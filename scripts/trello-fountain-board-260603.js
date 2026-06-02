#!/usr/bin/env node
/**
 * Fetch Fountain (Web Development) Trello board cards + customer comments.
 * Board: 5475eaf923a9a1309357eb51
 */
const cfgAll = JSON.parse(require('fs').readFileSync('/var/www/MyDailyAgent/config/.trello-config.json','utf8'));
const cfg = cfgAll.fountain;
const key = cfg.api_key, token = cfg.token;
const https = require('https');
const BOARD = cfg.board_id;
const CUSTOMER_MEMBERS = ['kunalsheth','tmmckay','mike62798179','iris63293413'];
const STUCK_DAYS = 5;

function get(url) {
  return new Promise(r => {
    https.get(url, res => {
      let d=''; res.on('data',c=>d+=c);
      res.on('end',()=>{ try{r(JSON.parse(d))}catch{r({raw:d.slice(0,200)})} });
    }).on('error',e=>r({err:e.message}));
  });
}

async function main() {
  const qs = `key=${key}&token=${token}`;

  // Get lists
  const lists = await get(`https://api.trello.com/1/boards/${BOARD}/lists?${qs}&fields=id,name`);
  if (!Array.isArray(lists)) { console.log(JSON.stringify({error: 'cannot access board', detail: lists})); return; }

  // Get all cards
  const cards = await get(`https://api.trello.com/1/boards/${BOARD}/cards?${qs}&fields=id,name,idList,dateLastActivity,labels,shortUrl&limit=100`);
  if (!Array.isArray(cards)) { console.log(JSON.stringify({error: 'cannot get cards', detail: cards})); return; }

  const listMap = {};
  lists.forEach(l => listMap[l.id] = l.name);

  const now = Date.now();
  const stuckThreshold = STUCK_DAYS * 24 * 3600 * 1000;

  // Count cards per list
  const listCounts = {};
  lists.forEach(l => listCounts[l.name] = 0);
  const stuckCards = [];

  cards.forEach(c => {
    const listName = listMap[c.idList] || 'Unknown';
    listCounts[listName] = (listCounts[listName] || 0) + 1;
    const age = now - new Date(c.dateLastActivity).getTime();
    if (age > stuckThreshold) {
      stuckCards.push({
        name: c.name.slice(0, 60),
        list: listName,
        days_inactive: Math.floor(age / (24*3600*1000)),
        url: c.shortUrl,
      });
    }
  });

  // Get recent actions (customer comments)
  const since = new Date(Date.now() - 7 * 24 * 3600 * 1000).toISOString();
  const actions = await get(
    `https://api.trello.com/1/boards/${BOARD}/actions?${qs}&filter=commentCard&since=${since}&limit=50`
  );

  const customerComments = [];
  if (Array.isArray(actions)) {
    actions.forEach(a => {
      const uname = (a.memberCreator?.username || '').toLowerCase();
      const full = a.memberCreator?.fullName || '';
      if (CUSTOMER_MEMBERS.some(m => uname.includes(m.toLowerCase()) || full.toLowerCase().includes(m.toLowerCase()))) {
        customerComments.push({
          by: uname,
          card: (a.data?.card?.name || '').slice(0,50),
          text: (a.data?.text || '').slice(0,200),
          date: a.date?.slice(0,16),
        });
      }
    });
  }

  console.log(JSON.stringify({
    lists: listCounts,
    total_cards: cards.length,
    stuck_5d: stuckCards.slice(0, 10),
    customer_comments_7d: customerComments,
  }, null, 2));
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
