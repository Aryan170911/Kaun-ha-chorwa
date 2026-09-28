const app = document.querySelector('#app');
const modalRoot = document.querySelector('#modal-root');
const STORAGE_KEY = 'kawan-hawe-chorwa-session-v5';
const PREFS_KEY = 'kawan-hawe-chorwa-prefs-v1';

const WORD_BANK = {
  'Desi Food': [
    ['Litti','Baati'], ['Chokha','Bharta'], ['Samosa','Kachori'], ['Jalebi','Imarti'],
    ['Chai','Sattu Sharbat'], ['Puri Sabji','Kachori Sabji'], ['Chura Dahi','Dahi Chini'], ['Achar','Chutney'],
    ['Thekua','Khajuria'], ['Tilkut','Gajak'], ['Makhana','Chana'], ['Pakora','Bachka'],
    ['Dal Puri','Sattu Paratha'], ['Kheer','Sewai'], ['Rasgulla','Gulab Jamun'], ['Papad','Chips']
  ],
  'Bihar Special': [
    ['Patna','Gaya'], ['Ara','Buxar'], ['Chhapra','Siwan'], ['Nalanda','Rajgir'],
    ['Chhath','Holi'], ['Chhath Ghat','Ganga Ghat'], ['Gamchha','Rumal'], ['Handpump','Nal'],
    ['Gaon','Nani Ghar'], ['Khet','Bagicha'], ['Chowk','Chauraha'], ['Gali','Sadak'],
    ['Bhojpuri Gaana','Bollywood Gaana'], ['Launda Naach','DJ Dance'], ['Mela','Haat'], ['Mukhiya','Sarpanch']
  ],
  'Everyday India': [
    ['Auto','E-rickshaw'], ['Thela','Dukaan'], ['UPI','Cash'], ['Bijli Katna','Network Jana'],
    ['Cooler','Pankha'], ['Machhar','Makhi'], ['Chappal','Hawai Chappal'], ['Balti','Mug'],
    ['Sabji Mandi','Kirana Dukaan'], ['Padosi','Rishtedaar'], ['Aadhaar Card','PAN Card'], ['Jugaad','Setting'],
    ['Line Lagana','Seat Pakadna'], ['Phone Recharge','Bijli Bill'], ['Baranda','Chhat'], ['Cycle','Bike']
  ],
  'Gen-Z Lite': [
    ['Reels','Shorts'], ['Meme','Sticker'], ['Crush','Best Friend'], ['Seen','Ignore'],
    ['Selfie','Mirror Pic'], ['Screenshot','Screen Recording'], ['Block','Unfollow'], ['Online','Last Seen'],
    ['Group Chat','Private Chat'], ['Voice Note','Phone Call'], ['Viral','Trending'], ['Filter','Makeup'],
    ['Status','Story'], ['Like','Reaction'], ['Gaming','Scrolling'], ['Earphone','Speaker']
  ],
  'Anime Energy': [
    ['Naruto','Sasuke'], ['Goku','Vegeta'], ['Luffy','Zoro'], ['Gojo','Sukuna'],
    ['Hero','Villain'], ['Ninja','Samurai'], ['Sensei','Captain'], ['Power-Up','Transformation'],
    ['Manga','Anime'], ['Rival','Best Friend'], ['Training Arc','Tournament Arc'], ['Hidden Power','Secret Identity'],
    ['Sword','Kunai'], ['Demon','Monster'], ['Final Battle','Boss Fight'], ['Opening Song','Background Music']
  ],
  'School & College': [
    ['School','Coaching'], ['Teacher','Master Sahab'], ['Principal','Class Teacher'], ['Exam','Surprise Test'],
    ['Copy','Register'], ['Pen','Pencil'], ['Canteen','Thela'], ['Backbencher','Topper'],
    ['Attendance','Marks'], ['Homework','Assignment'], ['Tuition','Self Study'], ['School Van','Auto'],
    ['Chhutti','Bunk'], ['Class Monitor','CR'], ['Farewell','Annual Function'], ['Period','Tuition']
  ],
  'Movies & Music': [
    ['Bhojpuri Film','Bollywood Film'], ['Pawan Singh','Khesari Lal'], ['Hero','Villain'], ['Cinema Hall','OTT'],
    ['Trailer','Teaser'], ['DJ','Band Baja'], ['Singer','Actor'], ['Dialogue','Gaana'],
    ['Comedy','Action'], ['Horror','Thriller'], ['Remake','Sequel'], ['Interval','Ad Break'],
    ['Headphone','Speaker'], ['Shaadi Gaana','Chhath Geet'], ['Stage Show','Jagrata'], ['Dance','Naach']
  ],
  'Games & Sports': [
    ['Cricket','Gully Cricket'], ['Bat','Danda'], ['Batsman','Bowler'], ['Six','Four'],
    ['Tennis Ball','Leather Ball'], ['Free Fire','BGMI'], ['Ludo','Carrom'], ['Chess','Ludo'],
    ['Kabaddi','Kho-Kho'], ['Gilli Danda','Pitthu'], ['Chhupan Chhupai','Pakdam Pakdai'], ['Ground','Khet'],
    ['Captain','Coach'], ['Final','Semi-Final'], ['Trophy','Medal'], ['Teammate','Opponent']
  ],
  'Travel & Places': [
    ['Railway Station','Bus Stand'], ['General Coach','Sleeper'], ['Upper Berth','Side Upper'], ['Train','Bus'],
    ['Auto','Tempo'], ['Gaon','Sheher'], ['Patna','Delhi'], ['Ganga Ghat','Mandir'],
    ['Platform','Waiting Room'], ['Ticket','Reservation'], ['Suitcase','Bora'], ['Window Seat','Gate Wala Seat'],
    ['Road Trip','Train Journey'], ['Chowk','Station Road'], ['Mela','Picnic'], ['Nani Ghar','Dadi Ghar']
  ],
  'Home & Family': [
    ['Mummy','Chachi'], ['Papa','Chacha'], ['Dadi','Nani'], ['Mama','Chacha'],
    ['Bhai','Cousin'], ['Bhabhi','Didi'], ['Saas','Mummy'], ['Mehmaan','Padosi'],
    ['Jhadu','Pocha'], ['Rasoi','Aangan'], ['Chhat','Baranda'], ['TV Remote','Mobile Charger'],
    ['Shaadi','Tilak'], ['Haldi','Mehndi'], ['Baraat','Juloos'], ['Shagun','Neg']
  ]
};

const AVATARS = [
  {id:'naruto', name:'Naruto', group:'Hero', aura:'#ff9f43', power:'Dattebayo josh', url:'assets/anime/naruto.jpg'},
  {id:'itachi', name:'Itachi', group:'Hero', aura:'#ef476f', power:'Genjutsu level OP', url:'assets/anime/itachi.jpg'},
  {id:'luffy', name:'Luffy', group:'Hero', aura:'#ffd166', power:'Full masti captain', url:'assets/anime/luffy.jpg'},
  {id:'zoro', name:'Zoro', group:'Hero', aura:'#63e6a7', power:'Teen talwar waala', url:'assets/anime/zoro.jpg'},
  {id:'goku', name:'Goku', group:'Hero', aura:'#50dcff', power:'Limit ke paar', url:'assets/anime/goku.jpg'},
  {id:'light', name:'Light Yagami', group:'Hero', aura:'#a78bfa', power:'Dimaag ke baadshah', url:'assets/anime/light.jpg'},
  {id:'gojo', name:'Gojo', group:'Hero', aura:'#65d8ff', power:'Infinity waala', url:'assets/anime/gojo.jpg'},
  {id:'levi', name:'Levi', group:'Hero', aura:'#94a3b8', power:'Safai aur tabahi', url:'assets/anime/levi.jpg'},
  {id:'tsunade', name:'Tsunade', group:'Heroine', aura:'#f59eaa', power:'Hokage power', url:'assets/anime/tsunade.jpg'},
  {id:'hinata', name:'Hinata Uzumaki', group:'Heroine', aura:'#c4a7ff', power:'Byakugan mode', url:'assets/anime/hinata.jpg'},
  {id:'boa', name:'Boa Hancock', group:'Heroine', aura:'#ff5eaa', power:'Empress energy', url:'assets/anime/boa.jpg'},
  {id:'yoruichi', name:'Yoruichi', group:'Heroine', aura:'#8c6cff', power:'Bijli jaisan tez', url:'assets/anime/yoruichi.jpg'},
  {id:'faye', name:'Faye Valentine', group:'Heroine', aura:'#ffd166', power:'Space waali swag', url:'assets/anime/faye.jpg'},
  {id:'revy', name:'Revy', group:'Heroine', aura:'#ff647c', power:'Double pistol OP', url:'assets/anime/revy.jpg'},
  {id:'mikasa', name:'Mikasa', group:'Heroine', aura:'#ef476f', power:'Titan hunter', url:'assets/anime/mikasa.jpg'},
  {id:'makima', name:'Makima', group:'Heroine', aura:'#ff8fab', power:'Control queen', url:'assets/anime/makima.jpg'}
];

const RAVI_SPRITES = [
  'assets/ravi/birthday.jpg',
  'assets/ravi/airport.jpg',
  'assets/ravi/blockbuster.jpg'
];

const RAVI_TIPS = [
  'Zindagi jhand ba, phir bhi clue me ghamand ba!',
  'Ee clue ba ki UPSC ke sawaal? Seedha bola, babu!',
  'Chorwa ke confidence dekha... award le jaayi!',
  'Ka ho, vote dil se na—dimaag se!',
  'Bahut badhiya! Ab asli khel shuru hoi.',
  'Aankh me aankh daal ke clue de da!',
  'Jekar clue sabse golmaal, ohi par pahila sawaal!'
];

const PACK_LABELS = {
  Mixed:'Sab kuchh mix', 'Desi Food':'Khana-peena', 'Bihar Special':'Bihar OP',
  'Everyday India':'Apna roz-marrah', 'Gen-Z Lite':'Gen-Z tadka', 'Anime Energy':'Anime josh',
  'School & College':'School & coaching', 'Movies & Music':'Filim aur gaana',
  'Games & Sports':'Khel-kood', 'Travel & Places':'Gaon-sheher safar', 'Home & Family':'Ghar-parivaar'
};

const freshState = () => ({
  screen: 'home', players: [], pack: 'Mixed', round: 0, lastImpostor: -1,
  roundData: null, history: [], sessionActive: false, ended: false,
  pickIndex: 0, pickedAvatar: null, clueDuration: 120, talkDeadline: null,
  revealIndex: 0, revealStage: 'pass', hasPeeked: false, voterIndex: 0,
  selectedVote: null, votes: [], voteRound: 1, tiedCandidates: null,
  outcome: null, sessionGoal: 5, recentPairs: [], soundOn: true, hapticsOn: true,
  avatarGalleryOpen: false
});

let state = freshState();
let clock = null;
let setupDraft = { names: ['Arya','Aman','Riya'], pack: 'Mixed', goal: 5 };
let deferredInstallPrompt = null;
let audioContext = null;

function loadPrefs() {
  try { return {...{tutorialSeen:false,installDismissed:false,soundOn:true,hapticsOn:true},...JSON.parse(localStorage.getItem(PREFS_KEY)||'{}')}; }
  catch { return {tutorialSeen:false,installDismissed:false,soundOn:true,hapticsOn:true}; }
}

function updatePrefs(patch) {
  const next={...loadPrefs(),...patch};
  try { localStorage.setItem(PREFS_KEY,JSON.stringify(next)); } catch { /* Preferences remain optional. */ }
  return next;
}

function pulse(pattern=18) {
  if (!state.hapticsOn) return;
  try { navigator.vibrate?.(pattern); } catch { /* Vibration is optional. */ }
}

function playFeedback(kind='tap') {
  if (!state.soundOn) return;
  try {
    audioContext ||= new (window.AudioContext||window.webkitAudioContext)();
    const oscillator=audioContext.createOscillator();
    const gain=audioContext.createGain();
    const frequencies={reveal:520,vote:350,win:740,tap:440};
    oscillator.frequency.value=frequencies[kind]||440;
    gain.gain.setValueAtTime(.045,audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001,audioContext.currentTime+.11);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start(); oscillator.stop(audioContext.currentTime+.12);
  } catch { /* Sound feedback is optional. */ }
}

function esc(value='') {
  return String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
}

function avatarHTML(avatar, small=false) {
  const a = AVATARS.find(x => x.id === avatar) || AVATARS[0];
  return `<div class="avatar sprite-avatar${small ? ' small-avatar' : ''}" style="--aura:${a.aura}"><img src="${a.url}" alt="${esc(a.name)}" draggable="false"></div>`;
}

function raviCard(tip = RAVI_TIPS[Math.floor(Math.random()*RAVI_TIPS.length)]) {
  const sprite = RAVI_SPRITES[Math.floor(Math.random()*RAVI_SPRITES.length)];
  return `<aside class="ravi-card"><img src="${sprite}" alt="Ravi Kishan meme host"><div><span>RAVI BHAI KE TIP</span><b>${esc(tip)}</b></div></aside>`;
}

function shell(content, options={}) {
  const stats = state.sessionActive && !state.ended ? `<button class="btn ghost icon-btn" id="stats-btn">⚡ Hisaab</button>` : '';
  const settings = state.sessionActive && !state.ended ? `<button class="btn ghost icon-btn" id="settings-btn">⚙️ Setting</button>` : '';
  app.innerHTML = `<div class="shell"><header class="topbar"><div class="brand"><span class="brand-mark"><img src="assets/icon.svg" alt="" width="39" height="39"></span><span>KAWAN HAWE CHORWA<small class="edition">#BIRTHBASH-ARYA // SPECIAL EDITION</small></span></div><div class="top-actions">${settings}${stats}</div></header><section class="screen">${content}</section><div class="edge-kanji" aria-hidden="true">裏切者</div></div>`;
  document.querySelector('#stats-btn')?.addEventListener('click', showStats);
  document.querySelector('#settings-btn')?.addEventListener('click', showSettings);
  if (state.sessionActive || state.ended) save();
  if (options.noClock !== true) clearClock();
  requestAnimationFrame(()=>window.scrollTo({top:0,left:0,behavior:'auto'}));
}

function clearClock() { if (clock) clearInterval(clock); clock = null; }

function save() {
  if (state.sessionActive || state.ended) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch { /* Game keeps running even when browser storage is unavailable. */ }
  }
}

function loadSaved() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (GameCore.isValidSavedSession(parsed, AVATARS.map(avatar => avatar.id))) return parsed;
  } catch { /* Invalid or unavailable storage is treated as no saved game. */ }
  try { localStorage.removeItem(STORAGE_KEY); } catch { /* Storage may be disabled. */ }
  return null;
}

function renderHome() {
  state.screen = 'home';
  const saved = loadSaved();
  const showcase=['naruto','gojo','boa','itachi'].map((id,i)=>{const a=AVATARS.find(x=>x.id===id);return `<div class="poster-card p${i+1}" style="--aura:${a.aura}"><img src="${a.url}" alt="${esc(a.name)}"><span>${esc(a.name)}</span></div>`}).join('');
  shell(`<div class="hero">
    <div class="hero-copy">
      <div class="birthday-badge"><i></i> #birthbash-Arya special edition</div>
      <p class="eyebrow">3–12 KHILADI // 1 PHONE // 1 CHORWA</p>
      <h1>KAWAN<br>HAWE <span>CHORWA?</span></h1>
      <p class="lede">Sabke mili ekke shabd. Ek jana ke mili alag. Clue de, chehra padha, aur pakada ke game ke asli villain ke!</p>
      <div class="actions hero-actions">
        <button class="btn primary" id="new-session"><span>Naya khel</span><b>CHALU KARA</b><i>→</i></button>
        ${saved?.sessionActive && !saved?.ended ? '<button class="btn cyan" id="resume">Purana khel jaari rakha</button>' : ''}
        <button class="btn ghost" id="how">Kaise kheli?</button>
      </div>
      <p class="art-credit">Character tasveer <a href="https://myanimelist.net/character.php" target="_blank" rel="noreferrer">MyAnimeList</a> se · Ravi bhai photo <a href="https://commons.wikimedia.org/wiki/Category:Ravi_Kishan" target="_blank" rel="noreferrer">Wikimedia Commons</a> se.</p>
    </div>
    <div class="anime-collage"><div class="sun-disc"></div>${showcase}<div class="impact-text">CHOR!</div></div>
  </div>`);
  document.querySelector('#new-session').onclick = () => renderSetup(true);
  document.querySelector('#resume')?.addEventListener('click', () => { state = saved; renderCurrent(); });
  document.querySelector('#how').onclick = showRules;
}

function syncSetupDraft() {
  const inputs=[...document.querySelectorAll('.player-name')];
  if(inputs.length) setupDraft.names=inputs.map(input=>input.value);
  const pack=document.querySelector('#pack');
  if(pack) setupDraft.pack=pack.value;
  const goal=document.querySelector('#session-goal');
  if(goal) setupDraft.goal=Number(goal.value);
}

function renderSetup(reset=false) {
  if(reset){const prefs=loadPrefs();state=freshState();state.soundOn=prefs.soundOn;state.hapticsOn=prefs.hapticsOn;setupDraft={names:['Arya','Aman','Riya'],pack:'Mixed',goal:5};}
  state.screen = 'setup';
  const packOptions = ['Mixed', ...Object.keys(WORD_BANK)].map(x => `<option value="${esc(x)}" ${setupDraft.pack===x?'selected':''}>${esc(PACK_LABELS[x])}</option>`).join('');
  shell(`<div class="stepper"><span class="on"></span><span></span><span></span></div>
    <div class="card"><p class="eyebrow">Pahila kadam</p><h2>Apan toli banaawa</h2>
    <p class="small">Kam se kam 3 jana chahi. Jitna log jodiha, sabke point session bhar judat rahi.</p>
    <div class="setup-count"><span>Toli ke size</span><b>${setupDraft.names.length} / 12</b></div>
    <div class="name-grid dynamic-names">
      ${setupDraft.names.map((n,i)=>`<div class="player-name-row"><div class="field"><label>Khiladi ${i+1}</label><input class="player-name" maxlength="14" value="${esc(n)}" aria-label="Khiladi ${i+1} ke naam"></div>${setupDraft.names.length>3?`<button class="remove-player" data-remove-player="${i}" aria-label="Khiladi ${i+1} hataawa">×</button>`:''}</div>`).join('')}
    </div>
    <button class="add-player" id="add-player" ${setupDraft.names.length>=12?'disabled':''}><span>＋</span> Aur khiladi joda</button>
    <div class="field" style="margin-top:16px"><label>Shabd ke pitara</label><select id="pack">${packOptions}</select></div>
    <div class="field" style="margin-top:13px"><label>Session ketna lamba?</label><select id="session-goal">
      <option value="3" ${setupDraft.goal===3?'selected':''}>3 round — fatafat</option>
      <option value="5" ${setupDraft.goal===5?'selected':''}>5 round — best choice</option>
      <option value="7" ${setupDraft.goal===7?'selected':''}>7 round — poora dangal</option>
      <option value="0" ${setupDraft.goal===0?'selected':''}>Jab tak mann kare</option>
    </select></div>
    <div class="actions inline"><button class="btn ghost" id="back">Peechhe</button><button class="btn primary" id="to-avatar-pick">Anime hero chuna</button></div>
    </div>`);
  document.querySelector('#back').onclick = renderHome;
  document.querySelector('#add-player').onclick=()=>{syncSetupDraft();if(setupDraft.names.length<12){setupDraft.names.push('');renderSetup(false);}};
  document.querySelectorAll('[data-remove-player]').forEach(button=>button.onclick=()=>{syncSetupDraft();setupDraft.names.splice(Number(button.dataset.removePlayer),1);renderSetup(false);});
  document.querySelector('#to-avatar-pick').onclick = () => {
    const names = [...document.querySelectorAll('.player-name')].map(i => i.value.trim());
    if (names.some(n => !n)) return toast('Sab khiladi ke naam daala');
    if (names.length < 3) return toast('Kam se kam 3 khiladi chahi');
    if (new Set(names.map(n=>n.toLowerCase())).size < names.length) return toast('Sabke naam alag-alag rakha');
    const assigned=shuffle(AVATARS.map(avatar=>avatar.id)).slice(0,names.length);
    state.players = names.map((name,id) => ({ id, name, avatar: assigned[id], score: 0, wins: 0, impostorRounds: 0, impostorWins: 0, caught: 0, votesReceived: 0 }));
    state.pack = document.querySelector('#pack').value;
    state.sessionGoal = Number(document.querySelector('#session-goal').value);
    state.pickIndex = 0;
    state.pickedAvatar = state.players[0].avatar;
    state.avatarGalleryOpen=false;
    if(loadPrefs().tutorialSeen) renderAvatarPick(); else showTutorial();
  };
}

function showTutorial(step=0) {
  const slides=[
    {icon:'㊙️',title:'Shabd chupke dekha',body:'Phone bari-bari ghumi. Card daba ke apan shabd dekha, chhodte hi shabd luka jaayi.'},
    {icon:'🗣️',title:'Clue de, bahas kara',body:'Chunail khiladi pahila clue di. Sab log chhota clue deke chorwa ke pakde ke koshish kari.'},
    {icon:'🗳️',title:'Vote aur palatwaar',body:'Sab chupke vote kari. Chorwa pakda gail ta asli shabd bujh ke round chura sakela.'}
  ];
  const slide=slides[step];
  modalRoot.innerHTML=`<div class="modal-backdrop"><div class="card modal tutorial-modal">
    <p class="eyebrow">20-second training • ${step+1} / ${slides.length}</p>
    <div class="tutorial-icon">${slide.icon}</div><h2>${slide.title}</h2><p class="lede">${slide.body}</p>
    <div class="tutorial-dots">${slides.map((_,i)=>`<span class="${i===step?'on':''}"></span>`).join('')}</div>
    <div class="actions"><button class="btn primary" id="tutorial-next">${step===slides.length-1?'Samajh gail—hero chuna':'Agila tip →'}</button><button class="btn ghost" id="tutorial-skip">Seedha khel par chala</button></div>
  </div></div>`;
  const finish=()=>{updatePrefs({tutorialSeen:true});modalRoot.innerHTML='';renderAvatarPick();};
  document.querySelector('#tutorial-next').onclick=()=>step===slides.length-1?finish():showTutorial(step+1);
  document.querySelector('#tutorial-skip').onclick=finish;
}

function renderAvatarPick() {
  state.screen = 'pick-avatar';
  const p = state.players[state.pickIndex];
  const used = state.players.filter((_,i)=>i!==state.pickIndex).map(x => x.avatar).filter(Boolean);
  const picked=AVATARS.find(a=>a.id===state.pickedAvatar)||AVATARS[0];
  const group = label => `<div class="character-group"><h3>${label==='Hero'?'⚔️ Hero log':'✨ Heroine log'}</h3><div class="character-grid">${AVATARS.filter(a=>a.group===label).map(a=>`
    <button class="character-card ${used.includes(a.id)?'used':''} ${state.pickedAvatar===a.id?'selected':''}" data-avatar-id="${a.id}" ${used.includes(a.id)?'disabled':''}>
      <img src="${a.url}" alt="${esc(a.name)}"><b>${esc(a.name)}</b><span>${esc(a.power)}</span>
    </button>`).join('')}</div></div>`;
  shell(`<div class="stepper"><span class="on"></span><span class="on"></span><span></span></div>
    <div class="card avatar-pick-card">
      <p class="eyebrow">Hero ${state.pickIndex+1} / ${state.players.length}</p><h2>${esc(p.name)}, apan anime roop chuna</h2>
      <p class="small">Hero pahile se chunail ba. Pasand ba ta turant pakka kara, na ta badal da.</p>
      <div class="avatar-quick">
        ${avatarHTML(picked.id)}
        <div><span class="small">ABHI CHUNAIL</span><h3>${esc(picked.name)}</h3><p>${esc(picked.power)}</p><button class="btn cyan" id="random-avatar">🎲 Random badla</button></div>
      </div>
      <button class="btn ghost wide" id="toggle-gallery">${state.avatarGalleryOpen?'Hero list lukaawa':'Sab 16 hero dekha'}</button>
      <div class="avatar-sticky-actions">${state.pickIndex===0?'<button class="btn ghost" id="avatar-back">Naam badla</button>':''}<button class="btn primary" id="lock-avatar">Ee hero pakka ba →</button></div>
      ${state.avatarGalleryOpen?`<div class="character-groups">${group('Hero')}${group('Heroine')}</div>`:''}
    </div>`);
  document.querySelector('#avatar-back')?.addEventListener('click',()=>renderSetup(false));
  document.querySelector('#toggle-gallery').onclick=()=>{state.avatarGalleryOpen=!state.avatarGalleryOpen;renderAvatarPick();};
  document.querySelector('#random-avatar').onclick=()=>{
    const choices=AVATARS.filter(a=>!used.includes(a.id)&&a.id!==state.pickedAvatar);
    const next=choices[Math.floor(Math.random()*choices.length)];
    state.pickedAvatar=next.id;
    p.avatar=next.id;
    playFeedback('tap'); pulse(12); renderAvatarPick();
  };
  document.querySelectorAll('[data-avatar-id]').forEach(card => card.onclick = () => {
    state.pickedAvatar = card.dataset.avatarId;
    p.avatar=state.pickedAvatar;
    state.avatarGalleryOpen=false;
    playFeedback('tap'); pulse(12); renderAvatarPick();
  });
  document.querySelector('#lock-avatar').onclick = advanceAvatarPick;
}

function advanceAvatarPick() {
  if (!state.pickedAvatar) return;
  state.players[state.pickIndex].avatar = state.pickedAvatar;
  if (state.pickIndex < state.players.length-1) {
    state.pickIndex++;
    state.pickedAvatar = state.players[state.pickIndex].avatar;
    state.avatarGalleryOpen=false;
    renderAvatarPick();
  } else {
    state.sessionActive = true;
    state.ended = false;
    state.round = 0;
    state.pickedAvatar = null;
    state.avatarGalleryOpen=false;
    save();
    renderLobby();
  }
}

function startDeadlineClock(deadline, selector, onEnd) {
  clearClock();
  const tick = () => {
    const left = Math.max(0, Math.ceil((deadline-Date.now())/1000));
    const el = document.querySelector(selector);
    if (el) el.textContent = `${Math.floor(left/60)}:${String(left%60).padStart(2,'0')}`;
    if (left <= 0) { clearClock(); onEnd(); }
  };
  tick();
  clock = setInterval(tick, 250);
}

function rosterHTML(active=-1, impostor=-1) {
  return `<div class="roster">${state.players.map((p,i)=>`<div class="player-chip ${i===active?'active':''} ${i===impostor?'impostor':''}">${avatarHTML(p.avatar,true)}<span>${esc(p.name)}</span></div>`).join('')}</div>`;
}

function renderLobby() {
  state.screen = 'lobby';
  save();
  const goalLabel=state.sessionGoal?`${state.round} / ${state.sessionGoal} round poora`:`${state.round} round poora · unlimited`;
  const goalProgress=state.sessionGoal?Math.min(100,(state.round/state.sessionGoal)*100):0;
  shell(`<div class="stepper"><span class="on"></span><span class="on"></span><span class="on"></span></div>
    <div class="card"><p class="eyebrow">Toli ekdum taiyaar • ${goalLabel}</p><h2>Round ${state.round+1}${state.sessionGoal?` / ${state.sessionGoal}`:''} ke la taiyaar ba?</h2>
      ${state.sessionGoal?`<div class="session-progress" aria-label="Session progress"><span style="width:${goalProgress}%"></span></div>`:''}
      ${rosterHTML()}
      <p class="small">Pitara: <b>${esc(PACK_LABELS[state.pack])}</b> · ${Object.values(WORD_BANK).flat().length} aasaan aur mast jodi.</p>
      <div class="save-status"><span>✓</span><div><b>Auto-save ON</b><small>Ee browser me session apne-aap bachat rahi</small></div></div>
      <div class="actions"><button class="btn primary" id="start-round">Gupt shabd baanta ⚡</button>${state.round ? '<button class="btn ghost" id="end-session">Khel khatam kara aur hisaab dekha</button>' : ''}</div>
    </div>`);
  document.querySelector('#start-round').onclick = startRound;
  document.querySelector('#end-session')?.addEventListener('click', confirmEndSession);
}

function shuffle(array) {
  return GameCore.shuffle(array);
}

function choosePair() {
  return GameCore.choosePair(WORD_BANK, state.pack, Math.random, state.recentPairs);
}

function startRound() {
  const pair = choosePair();
  state.recentPairs=[...state.recentPairs,pair.key].slice(-20);
  const playerCount=state.players.length;
  const impostor = GameCore.chooseImpostor(playerCount, state.lastImpostor);
  const order = shuffle(Array.from({length:playerCount},(_,i)=>i));
  state.round++;
  state.lastImpostor = impostor;
  state.players[impostor].impostorRounds++;
  state.roundData = {...pair, impostor, order, starter: Math.floor(Math.random()*playerCount)};
  state.revealIndex = 0; state.revealStage = 'pass'; state.hasPeeked = false; state.talkDeadline = null;
  state.voterIndex = 0; state.selectedVote = null; state.votes = []; state.voteRound = 1; state.tiedCandidates = null; state.outcome = null;
  save();
  renderReveal();
}

function renderReveal() {
  state.screen = 'reveal';
  const playerIndex = state.roundData.order[state.revealIndex];
  const p = state.players[playerIndex];
  const word = playerIndex === state.roundData.impostor ? state.roundData.odd : state.roundData.majority;
  const progress = `<div class="reveal-progress">${state.players.map((_,i)=>`<span class="${i<state.revealIndex?'done':i===state.revealIndex?'now':''}"></span>`).join('')}</div>`;
  if(state.revealStage==='pass'){
    shell(`<div class="reveal-shell">${progress}<div class="handoff-card">
      <div class="privacy-orbit"><span>GUPT</span><b>${state.revealIndex+1}</b></div>
      <p class="eyebrow">BAKI SAB AANKH HATAAWA</p>
      <h2>Phone <em>${esc(p.name)}</em> ke de da</h2>
      <div class="handoff-player">${avatarHTML(p.avatar)}<div><b>${esc(p.name)}</b><span>Agila agent</span></div></div>
      <p class="small">Screen tabhe khola jab phone sahi haath me aa jaaye.</p>
      <button class="btn primary wide" id="confirm-player">Haan, hum ${esc(p.name)} bani <i>→</i></button>
    </div></div>`);
    document.querySelector('#confirm-player').onclick=()=>{state.revealStage='peek';state.hasPeeked=false;renderReveal();};
    return;
  }

  shell(`<div class="reveal-shell">${progress}<div class="peek-layout">
    <div class="peek-head"><div><p class="eyebrow">${esc(p.name).toUpperCase()} // GUPT CARD</p><h2>Apan card daba ke rakha</h2></div>${avatarHTML(p.avatar,true)}</div>
    <button class="secret-card" id="secret-card" aria-label="Daba ke gupt shabd dekha">
      <div class="card-noise"></div><div class="seal-front"><span class="seal-eye">眼</span><b>DABA KE RAKHA</b><small>Chhodte hi phir se luk jaayi</small></div>
      <div class="secret-content" aria-hidden="true"><span>TOHAR GUPT SHABD</span><strong>${esc(word)}</strong><small>Chehra normal rakhiha 👀</small></div>
      <div class="hold-meter"></div>
    </button>
    <p class="privacy-note">🔒 Shabd khaali ungli dabale tak dikhi</p>
    <button class="btn primary wide" id="next-player" ${state.hasPeeked?'':'disabled'}>Yaad ho gail — phone aage <i>→</i></button>
  </div></div>`);
  const card=document.querySelector('#secret-card');
  const next=document.querySelector('#next-player');
  const front=card.querySelector('.seal-front');
  const content=card.querySelector('.secret-content');
  const open=()=>{
    card.classList.add('is-open');
    front.setAttribute('aria-hidden','true'); content.setAttribute('aria-hidden','false');
    card.setAttribute('aria-label',`Tohar gupt shabd ${word}`);
    state.hasPeeked=true;
    next.disabled=false;
    playFeedback('reveal'); pulse(18);
  };
  const close=()=>{card.classList.remove('is-open');front.setAttribute('aria-hidden','false');content.setAttribute('aria-hidden','true');card.setAttribute('aria-label','Daba ke gupt shabd dekha');};
  card.addEventListener('pointerdown',e=>{e.preventDefault();card.setPointerCapture?.(e.pointerId);open();});
  card.addEventListener('pointerup',close); card.addEventListener('pointercancel',close); card.addEventListener('lostpointercapture',close);
  card.addEventListener('keydown',e=>{if(e.key===' '||e.key==='Enter'){e.preventDefault();open();}});
  card.addEventListener('keyup',close); card.addEventListener('contextmenu',e=>e.preventDefault());
  next.onclick=()=>{
    close(); state.hasPeeked=false; state.revealStage='pass';
    if(state.revealIndex<state.players.length-1){state.revealIndex++;renderReveal();}
    else{state.talkDeadline=Date.now()+state.clueDuration*1000;renderTalkSession();}
  };
}

function renderTalkSession() {
  state.screen = 'talk';
  if (!state.talkDeadline) state.talkDeadline = Date.now() + state.clueDuration * 1000;
  const starter = state.players[state.roundData.starter];
  shell(`<div class="card turn-focus"><p class="eyebrow">Clue aur bahas • ${esc(PACK_LABELS[state.roundData.pack])}</p><h2>Ab boli chalu kara!</h2>
    <div class="starter-banner">${avatarHTML(starter.avatar,true)}<div><span class="small">SABSE PAHILE CLUE</span><h3 style="margin:2px 0">${esc(starter.name)} di</h3></div></div>
    <div class="big-timer" id="talk-time">${Math.floor(state.clueDuration/60)}:${String(state.clueDuration%60).padStart(2,'0')}</div>
    <p class="lede">Bas shuru kare waala chunail ba. Oke baad sab bari-bari clue di, sawaal puchhi aur chorwa khoji.</p>
    ${raviCard()}
    ${rosterHTML(state.roundData.starter)}
    <button class="btn primary" id="vote-now">Taiyaar bani—ab vote kara</button></div>`, {noClock:true});
  document.querySelector('#vote-now').onclick = () => { clearClock(); state.talkDeadline=null; renderVotePass(); };
  startDeadlineClock(state.talkDeadline,'#talk-time',()=>{if(state.screen!=='talk')return;modalRoot.innerHTML='';state.talkDeadline=null;renderVotePass();});
}

function renderVotePass() {
  state.screen = 'vote-pass';
  const voter = state.players[state.voterIndex];
  shell(`<div class="card pass-card"><div class="privacy-icon">🗳️</div><p class="eyebrow">Chupke vote ${state.voterIndex+1} / ${state.players.length}</p><h2>Phone ${esc(voter.name)} ke de da</h2>${avatarHTML(voter.avatar)}
    <p class="small">Baki sab aankh hataawa. Sabke vote padla ke baadhe result khuli.</p><button class="btn primary" id="open-ballot">Apan vote khola</button></div>`);
  document.querySelector('#open-ballot').onclick = renderBallot;
}

function renderBallot() {
  state.screen = 'ballot';
  const voter = state.players[state.voterIndex];
  let candidates = state.tiedCandidates || state.players.map((_,i)=>i);
  candidates = candidates.filter(i => i !== state.voterIndex);
  shell(`<div class="card"><p class="eyebrow">${esc(voter.name)} ke gupt vote</p><h2>Kawan hawe chorwa?</h2>
    <div class="vote-grid">${candidates.map(i=>`<button class="vote-card" data-vote="${i}">${avatarHTML(state.players[i].avatar)}<b>${esc(state.players[i].name)}</b></button>`).join('')}</div>
    <div class="actions"><button class="btn primary" id="lock-vote" disabled>Vote pakka kara</button></div></div>`);
  document.querySelectorAll('[data-vote]').forEach(card=>card.onclick=()=>{
    state.selectedVote=Number(card.dataset.vote);
    document.querySelectorAll('[data-vote]').forEach(c=>c.classList.toggle('selected',c===card));
    document.querySelector('#lock-vote').disabled=false;
  });
  document.querySelector('#lock-vote').onclick=()=>{
    playFeedback('vote'); pulse(22);
    state.votes.push({voter:state.voterIndex,target:state.selectedVote});
    state.selectedVote=null;
    if(state.voterIndex<state.players.length-1){state.voterIndex++;renderVotePass();}else tallyVotes();
  };
}

function tallyVotes() {
  const {counts,leaders:top}=GameCore.tallyVotes(state.votes,state.players.length);
  state.players.forEach((p,i)=>p.votesReceived += counts[i]);
  const decision=GameCore.classifyVote(top,state.roundData.impostor,state.voteRound);
  if(decision.action==='revote'){
    state.tiedCandidates=top; state.voteRound=2; state.votes=[]; state.voterIndex=0;
    renderTie();
  } else if(decision.action==='guess') {
    state.players[decision.eliminated].caught++;
    state.outcome={type:'caught',eliminated:decision.eliminated};
    renderCaught();
  } else finishRound(decision.type,decision.eliminated);
}

function renderTie() {
  state.screen='tie';
  const tiedCount=state.tiedCandidates?.length||2;
  shell(`<div class="card turn-focus"><p class="eyebrow">Vote barabar ho gail</p><h2>Aakhiri takkar</h2>
    <p class="lede">Barabar vote paawal ${tiedCount} khiladi ek-ek aakhiri clue di. Phir vote hoi. Dobara tie bhail ta chorwa bach jaayi.</p>
    ${raviCard('Ee tie na, poora filim ke interval ba! Ab asli faisla hoi.')}
    ${rosterHTML()}<button class="btn primary" id="revote">Aakhiri vote chalu kara</button></div>`);
  document.querySelector('#revote').onclick=renderVotePass;
}

function renderCaught() {
  state.screen='caught';
  const imp=state.players[state.roundData.impostor];
  shell(`<div class="card turn-focus"><p class="eyebrow">Chorwa pakda gail!</p>${avatarHTML(imp.avatar)}<h2>${esc(imp.name)} niklal chorwa</h2>
    <p class="lede">Okar shabd rahe <b>${esc(state.roundData.odd)}</b>. Abhi ek chance ba—sahi shabd bujh ke round chori kar sakela.</p>
    ${raviCard('Pakda ta gaila babu, lekin picture abhi baaki ba!')}
    <button class="btn primary" id="final-guess">Aakhiri andaaja lagaawa</button></div>`);
  document.querySelector('#final-guess').onclick=renderGuess;
}

function renderGuess() {
  state.screen='guess';
  const imp=state.players[state.roundData.impostor];
  shell(`<div class="card pass-card"><p class="eyebrow">Aakhiri mauka</p><h2>${esc(imp.name)}, andaaja jor se bola</h2>
    <p class="lede">Baki toli ke kaun shabd milal rahe? Jawaab pakka karke tab khola.</p>
    <button class="btn primary" id="reveal-answer">Asli shabd dekha</button></div>`);
  document.querySelector('#reveal-answer').onclick=()=>{
    shell(`<div class="card pass-card"><p class="eyebrow">Baki toli ke shabd rahe</p><div class="word-reveal">${esc(state.roundData.majority)}</div>
      <p class="lede">Imaandaari se bataawa: ${esc(imp.name)} ehi bolal?</p>
      <div class="actions inline"><button class="btn ghost" id="missed">Na, galat rahe</button><button class="btn primary" id="correct">Haan, ekdum sahi!</button></div></div>`);
    document.querySelector('#missed').onclick=()=>finishRound('caught-failed',state.roundData.impostor);
    document.querySelector('#correct').onclick=()=>finishRound('stolen',state.roundData.impostor);
  };
}

function finishRound(type, eliminated) {
  const imp=state.roundData.impostor;
  const scored=GameCore.scoreRound(state.players,type,imp);
  state.players=scored.players;
  const winners=scored.winners;
  state.outcome={type,eliminated,winners};
  state.history.push({round:state.round,pack:state.roundData.pack,majority:state.roundData.majority,odd:state.roundData.odd,impostor:imp,type,winners});
  state.screen='result';
  playFeedback('win'); pulse([35,45,35]);
  save();
  renderRoundResult();
}

function renderRoundResult() {
  const {type, eliminated} = state.outcome;
  const imp=state.roundData.impostor;
  let headline=''; let detail='';
  if(type==='caught-failed'){
    headline='Toli jeet gail!'; detail=`${state.players[imp].name} pakda gail aur aakhiri andaaja bhi galat niklal.`;
  } else {
    headline=type==='stolen'?'Chorwa round chura lelas!':type==='tie'?'Tie me chorwa bach gail!':'Begunaah ke nikaal dela!';
    detail=type==='escaped'?`${state.players[eliminated].name} begunaah rahe. Asli chorwa ${state.players[imp].name} rahe.`:type==='tie'?`${state.players[imp].name} dusra tie me bach gail.`:`${state.players[imp].name} sahi shabd bujh lelas.`;
  }
  const goalReached=state.sessionGoal>0&&state.history.length>=state.sessionGoal;
  shell(`<div class="card turn-focus"><div class="winner-crown">${type==='caught-failed'?'🏆':'😈'}</div><p class="eyebrow">Round ${state.round}${state.sessionGoal?` / ${state.sessionGoal}`:''} poora</p><h2>${headline}</h2>
    <p class="lede">${esc(detail)}</p><div class="card" style="box-shadow:none"><div class="small">SHABD KE JODI</div><h3 style="margin:6px 0">${esc(state.roundData.majority)} <span style="color:var(--muted)">vs</span> ${esc(state.roundData.odd)}</h3></div>
    ${raviCard(type==='caught-failed'?'Waah re toli! Chorwa ke hawa tight kar dela!':'Chorwa aaj sabke chuna laga delas!')}
    ${scoreboardHTML()}
    <div class="actions inline"><button class="btn ghost" id="finish">Khel khatam</button><button class="btn primary" id="next-round">${goalReached?'Final hisaab dekha':'Agila round'}</button></div></div>`);
  document.querySelector('#next-round').onclick=goalReached?renderFinalStats:renderLobby;
  document.querySelector('#finish').onclick=confirmEndSession;
}

function scoreboardHTML(detailed=false) {
  const sorted=[...state.players].sort((a,b)=>b.score-a.score || b.wins-a.wins);
  return `<div class="score-list">${sorted.map((p,i)=>`<div class="score-row">${avatarHTML(p.avatar,true)}<div><b>${i===0?'👑 ':''}${esc(p.name)}</b>${detailed?`<div class="small">${p.wins} jeet · Chorwa ${p.impostorRounds} baar (${p.impostorWins} jeet) · ${p.votesReceived} vote milal</div>`:''}</div><span class="score">${p.score}</span></div>`).join('')}</div>`;
}

function showSettings() {
  const choices = [60,90,120,180];
  modalRoot.innerHTML=`<div class="modal-backdrop"><div class="card modal"><div class="modal-head"><div><p class="eyebrow">Khel ke setting</p><h2>Boli ke time</h2></div><button class="btn ghost close" id="close-modal">×</button></div>
    <p class="small">Clue aur bahas la ketna time mili? Boli chalu rahte badalba ta timer naya time se phir chalu hoi.</p>
    <div class="timer-options">${choices.map(seconds=>`<button class="timer-choice ${state.clueDuration===seconds?'active':''}" data-seconds="${seconds}">${seconds<120?seconds+' sec':(seconds/60)+' min'}</button>`).join('')}</div>
    <div class="feedback-options">
      <button class="setting-toggle ${state.soundOn?'active':''}" id="toggle-sound"><span>🔊 Sound</span><b>${state.soundOn?'ON':'OFF'}</b></button>
      <button class="setting-toggle ${state.hapticsOn?'active':''}" id="toggle-haptics"><span>📳 Vibration</span><b>${state.hapticsOn?'ON':'OFF'}</b></button>
    </div>
    ${raviCard('Time badhaawa ya ghataawa, lekin chorwa ke mauka mat de da!')}
  </div></div>`;
  const close=()=>modalRoot.innerHTML='';
  document.querySelector('#close-modal').onclick=close;
  document.querySelector('.modal-backdrop').onclick=e=>{if(e.target.classList.contains('modal-backdrop'))close();};
  document.querySelector('#toggle-sound').onclick=()=>{state.soundOn=!state.soundOn;updatePrefs({soundOn:state.soundOn});save();close();showSettings();if(state.soundOn)playFeedback('tap');};
  document.querySelector('#toggle-haptics').onclick=()=>{state.hapticsOn=!state.hapticsOn;updatePrefs({hapticsOn:state.hapticsOn});save();close();showSettings();if(state.hapticsOn)pulse(20);};
  document.querySelectorAll('[data-seconds]').forEach(btn=>btn.onclick=()=>{
    state.clueDuration=Number(btn.dataset.seconds);
    if(state.screen==='talk'){
      state.talkDeadline=Date.now()+state.clueDuration*1000;
      close();
      renderTalkSession();
    } else {
      save();
      close();
      toast(`Boli ke time ${state.clueDuration<120?state.clueDuration+' second':state.clueDuration/60+' minute'} ho gail`);
    }
  });
}

function confirmEndSession() {
  modalRoot.innerHTML=`<div class="modal-backdrop"><div class="card modal confirm-modal"><p class="eyebrow">Pakka?</p><h2>Khel khatam kari?</h2>
    <p class="lede">Final hisaab khul jaayi. Chahe ta ee toli se turante phir khel sakat bada.</p>
    <div class="actions inline"><button class="btn ghost" id="cancel-end">Na, khel jaari rakha</button><button class="btn danger" id="confirm-end">Haan, hisaab dekha</button></div>
  </div></div>`;
  document.querySelector('#cancel-end').onclick=()=>modalRoot.innerHTML='';
  document.querySelector('#confirm-end').onclick=()=>{modalRoot.innerHTML='';renderFinalStats();};
}

function showStats() {
  const completed=state.history.length;
  const civilianWins=state.history.filter(h=>h.type==='caught-failed').length;
  modalRoot.innerHTML=`<div class="modal-backdrop"><div class="card modal"><div class="modal-head"><div><p class="eyebrow">Chalu khel</p><h2>Toli ke hisaab</h2></div><button class="btn ghost close" id="close-modal">×</button></div>
    <div class="stat-grid"><div class="stat"><strong>${completed}</strong><span>ROUND POORA</span></div><div class="stat"><strong>${civilianWins}</strong><span>TOLI JEETAL</span></div><div class="stat"><strong>${completed-civilianWins}</strong><span>CHORWA JEETAL</span></div></div>
    ${scoreboardHTML(true)}<div class="actions"><button class="btn danger" id="modal-end">Khel khatam kara</button></div></div></div>`;
  document.querySelector('#close-modal').onclick=()=>modalRoot.innerHTML='';
  document.querySelector('.modal-backdrop').onclick=e=>{if(e.target.classList.contains('modal-backdrop'))modalRoot.innerHTML='';};
  document.querySelector('#modal-end').onclick=()=>{modalRoot.innerHTML='';confirmEndSession();};
}

function awardWinners(metric, mode='max') {
  const values=state.players.map(metric);
  const best=mode==='min'?Math.min(...values):Math.max(...values);
  return state.players.filter((player,i)=>values[i]===best).map(player=>player.name).join(' aur ');
}

function awardsHTML() {
  if(!state.history.length) return '';
  const awards=[
    ['🏆','Jeet Machine',awardWinners(player=>player.wins)],
    ['😈','Chorwa King',awardWinners(player=>player.impostorWins)],
    ['👀','Shak ke Dukaan',awardWinners(player=>player.votesReceived)]
  ];
  return `<div class="awards"><p class="eyebrow">Session ke special award</p>${awards.map(([icon,title,names])=>`<div class="award-card"><span>${icon}</span><div><b>${title}</b><small>${esc(names)}</small></div></div>`).join('')}</div>`;
}

function resultsText() {
  const ranked=[...state.players].sort((a,b)=>b.score-a.score||b.wins-a.wins);
  return `Kawan Hawe Chorwa? — #birthbash-Arya Special Edition\n${state.history.length} round ke final hisaab:\n${ranked.map((p,i)=>`${i+1}. ${p.name} — ${p.score} point`).join('\n')}\n\nChorwa pakada, dosti bachawa 😈`;
}

async function shareResults() {
  const text=resultsText();
  try {
    if(navigator.share) await navigator.share({title:'Kawan Hawe Chorwa?',text});
    else { await navigator.clipboard.writeText(text); toast('Hisaab copy ho gail—WhatsApp par chipka da'); }
  } catch(error) { if(error?.name!=='AbortError') toast('Share na bhail—phir se koshish kara'); }
}

function restartSameGroup() {
  const old=state;
  const next=freshState();
  next.players=old.players.map(player=>({...player,score:0,wins:0,impostorRounds:0,impostorWins:0,caught:0,votesReceived:0}));
  next.pack=old.pack; next.sessionGoal=old.sessionGoal; next.clueDuration=old.clueDuration;
  next.soundOn=old.soundOn; next.hapticsOn=old.hapticsOn; next.sessionActive=true;
  state=next; save(); renderLobby();
}

async function promptInstall() {
  if(!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  try { await deferredInstallPrompt.userChoice; } catch { /* Install choice is browser-owned. */ }
  deferredInstallPrompt=null; updatePrefs({installDismissed:true});
  document.querySelector('#install-game')?.remove();
}

function renderFinalStats() {
  state.screen='final'; state.ended=true; state.sessionActive=false; save();
  const sorted=[...state.players].sort((a,b)=>b.score-a.score||b.wins-a.wins);
  const high=sorted[0]?.score||0;
  const champions=sorted.filter(p=>p.score===high).map(p=>p.name);
  const completed=state.history.length;
  const civilianWins=state.history.filter(h=>h.type==='caught-failed').length;
  shell(`<div class="card turn-focus"><div class="winner-crown">🏆</div><p class="eyebrow">Khel poora bhail</p><h2>${esc(champions.join(' aur '))}${champions.length>1?' barabar!':' jeet gail!'}</h2>
    <p class="lede">${completed} round ke baad final hisaab ee raha.</p>
    <div class="stat-grid"><div class="stat"><strong>${completed}</strong><span>ROUND</span></div><div class="stat"><strong>${civilianWins}</strong><span>TOLI JEETAL</span></div><div class="stat"><strong>${completed-civilianWins}</strong><span>CHORWA JEETAL</span></div></div>
    ${scoreboardHTML(true)}${awardsHTML()}
    <div class="actions"><button class="btn primary" id="same-team">Ee toli se phir khela ⚡</button><button class="btn cyan" id="share-results">Hisaab share kara</button>${state.history.length&&deferredInstallPrompt&&!loadPrefs().installDismissed?'<button class="btn ghost" id="install-game">📲 Phone me game rakha</button>':''}<button class="btn ghost" id="new-final">Bilkul naya toli</button><button class="btn ghost" id="home-final">Ghar waala page</button></div></div>`);
  document.querySelector('#same-team').onclick=restartSameGroup;
  document.querySelector('#share-results').onclick=shareResults;
  document.querySelector('#install-game')?.addEventListener('click',promptInstall);
  document.querySelector('#new-final').onclick=()=>{localStorage.removeItem(STORAGE_KEY);renderSetup(true);};
  document.querySelector('#home-final').onclick=renderHome;
}

function showRules() {
  modalRoot.innerHTML=`<div class="modal-backdrop"><div class="card modal"><div class="modal-head"><div><p class="eyebrow">Fatafat niyam</p><h2>Kaise kheli?</h2></div><button class="btn ghost close" id="close-modal">×</button></div>
    <div class="rules">
      <div class="rule"><b>1</b><p>Apan anime hero chuna. Phone ghuma ke har khiladi chupke se apan shabd dekhi.</p></div>
      <div class="rule"><b>2</b><p>Ek chorwa chhod ke baki sabke ekke shabd mili. Chorwa ke milta-julta alag shabd mili. Kehu ke role na batayi.</p></div>
      <div class="rule"><b>3</b><p>Sab ek-ek chhota clue di. Thoda bahas kara, phir shak waala khiladi ke chupke vote kara.</p></div>
      <div class="rule"><b>4</b><p>Chorwa pakda gail ta asli shabd bujh ke round chura sakela.</p></div>
      <div class="rule"><b>5</b><p>Har round point judat rahi. Hisaab kabho dekha aur mann bhar jaaye ta khel khatam kara.</p></div>
    </div></div></div>`;
  document.querySelector('#close-modal').onclick=()=>modalRoot.innerHTML='';
  document.querySelector('.modal-backdrop').onclick=e=>{if(e.target.classList.contains('modal-backdrop'))modalRoot.innerHTML='';};
}

function toast(message) {
  const el=document.createElement('div'); el.className='toast'; el.textContent=message; document.body.appendChild(el); setTimeout(()=>el.remove(),2200);
}

function renderCurrent() {
  const map={home:renderHome,setup:renderSetup,'pick-avatar':renderAvatarPick,lobby:renderLobby,reveal:renderReveal,talk:renderTalkSession,'vote-pass':renderVotePass,ballot:renderBallot,tie:renderTie,caught:renderCaught,guess:renderGuess,result:renderRoundResult,final:renderFinalStats};
  (map[state.screen]||renderLobby)();
}

renderHome();

window.addEventListener('error', event => {
  if (event.target instanceof HTMLImageElement) {
    event.target.style.visibility='hidden';
    event.target.parentElement?.classList.add('image-failed');
  }
}, true);

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
}

window.addEventListener('beforeinstallprompt',event=>{
  event.preventDefault();
  deferredInstallPrompt=event;
});

window.addEventListener('appinstalled',()=>{
  deferredInstallPrompt=null;
  updatePrefs({installDismissed:true});
});
