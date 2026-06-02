#!/usr/bin/env node
/**
 * Find "Check progress" + "Check mail" cards on board O83pAyqb,
 * fetch their checklists, and mark specified items complete.
 */
const cfg = JSON.parse(require('fs').readFileSync('/var/www/MyDailyAgent/config/.trello-config.json','utf8'));
const key = cfg.api_key, token = cfg.token;
const https = require('https');

function apiGet(path) {
  return new Promise(r => {
    const url = 'https://api.trello.com/1' + path + (path.includes('?') ? '&' : '?') + 'key=' + key + '&token=' + token;
    https.get(url, res => {
      let d = ''; res.on('data', c => d += c);
      res.on('end', () => { try { r(JSON.parse(d)); } catch { r({ raw: d.slice(0, 200) }); } });
    }).on('error', e => r({ error: e.message }));
  });
}

function apiPut(path, body) {
  return new Promise(r => {
    const qs = Object.entries({ ...body, key, token }).map(([k,v]) => k + '=' + encodeURIComponent(v)).join('&');
    const opts = { hostname: 'api.trello.com', path: '/1' + path + '?' + qs, method: 'PUT' };
    const req = https.request(opts, res => {
      let d = ''; res.on('data', c => d += c);
      res.on('end', () => { try { r({ status: res.statusCode, data: JSON.parse(d) }); } catch { r({ status: res.statusCode, raw: d.slice(0, 100) }); } });
    });
    req.on('error', e => r({ error: e.message }));
    req.end();
  });
}

async function main() {
  // Get all cards on board
  const cards = await apiGet('/boards/' + cfg.board_id + '/cards?fields=id,name');
  if (!Array.isArray(cards)) { console.log('Error fetching cards:', JSON.stringify(cards)); return; }

  const progressCard = cards.find(c => c.name === 'Check progress');
  const mailCard = cards.find(c => c.name === 'Check mail');

  console.log('Progress card:', progressCard ? progressCard.id : 'NOT FOUND');
  console.log('Mail card:', mailCard ? mailCard.id : 'NOT FOUND');

  if (progressCard) {
    const cls = await apiGet('/cards/' + progressCard.id + '/checklists');
    if (Array.isArray(cls)) {
      for (const cl of cls) {
        console.log('\nProgress CL:', cl.name);
        for (const item of cl.checkItems) {
          console.log(' ', item.state, '|', item.name, '|', item.id);
        }
      }
      // Store for completing
      console.log('\nPROGRESS_JSON:' + JSON.stringify(cls));
    }
  }

  if (mailCard) {
    const cls = await apiGet('/cards/' + mailCard.id + '/checklists');
    if (Array.isArray(cls)) {
      for (const cl of cls) {
        console.log('\nMail CL:', cl.name);
        for (const item of cl.checkItems) {
          console.log(' ', item.state, '|', item.name, '|', item.id);
        }
      }
      console.log('\nMAIL_JSON:' + JSON.stringify(cls));
    }
  }
}

main().catch(e => console.error('Fatal:', e.message));
