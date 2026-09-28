(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.GameCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  function shuffle(items, rng = Math.random) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function pairKey(pack, pair) {
    return `${pack}::${[...pair].sort().join('::')}`;
  }

  function choosePair(wordBank, requestedPack, rng = Math.random, recentKeys = []) {
    const available = Object.keys(wordBank);
    if (!available.length) throw new Error('Word bank khaali ba');
    const pack = requestedPack === 'Mixed'
      ? available[Math.floor(rng() * available.length)]
      : requestedPack;
    if (!wordBank[pack]?.length) throw new Error('Ee shabd pitara naikhe');
    const recent = new Set(recentKeys);
    const freshPairs = wordBank[pack].filter(pair => !recent.has(pairKey(pack, pair)));
    const choices = freshPairs.length ? freshPairs : wordBank[pack];
    const pair = choices[Math.floor(rng() * choices.length)];
    const flip = rng() < .5;
    return { pack, majority: pair[flip ? 1 : 0], odd: pair[flip ? 0 : 1], key: pairKey(pack, pair) };
  }

  function chooseImpostor(playerCount, lastImpostor, rng = Math.random) {
    const pool = Array.from({ length: playerCount }, (_, i) => i).filter(i => i !== lastImpostor);
    return pool[Math.floor(rng() * pool.length)];
  }

  function tallyVotes(votes, playerCount) {
    if (!Number.isInteger(playerCount) || playerCount < 3) throw new Error('Kam se kam 3 khiladi chahi');
    const counts = Array(playerCount).fill(0);
    votes.forEach(vote => {
      if (!Number.isInteger(vote.target) || vote.target < 0 || vote.target >= playerCount) throw new Error('Galat vote target');
      counts[vote.target]++;
    });
    const max = Math.max(...counts);
    return { counts, leaders: counts.map((count, i) => count === max ? i : -1).filter(i => i >= 0) };
  }

  function classifyVote(leaders, impostor, voteRound) {
    if (leaders.length > 1) return voteRound === 1 ? { action: 'revote' } : { action: 'finish', type: 'tie', eliminated: null };
    const eliminated = leaders[0];
    return eliminated === impostor
      ? { action: 'guess', eliminated }
      : { action: 'finish', type: 'escaped', eliminated };
  }

  function scoreRound(players, type, impostor) {
    const next = players.map(player => ({ ...player }));
    let winners;
    if (type === 'caught-failed') {
      winners = next.map((_, i) => i).filter(i => i !== impostor);
      winners.forEach(i => { next[i].score += 1; next[i].wins += 1; });
    } else {
      winners = [impostor];
      next[impostor].score += type === 'stolen' ? 1 : 2;
      next[impostor].wins += 1;
      next[impostor].impostorWins = (next[impostor].impostorWins || 0) + 1;
    }
    return { players: next, winners };
  }

  function isValidSavedSession(value, avatarIds) {
    if (!value || typeof value !== 'object' || value.ended || !value.sessionActive) return false;
    if (!Array.isArray(value.players) || value.players.length < 3 || value.players.length > 12) return false;
    const playerCount = value.players.length;
    const names = new Set();
    const avatars = new Set();
    for (const player of value.players) {
      if (!player || typeof player.name !== 'string' || !player.name.trim() || names.has(player.name.toLowerCase())) return false;
      if (!avatarIds.includes(player.avatar) || avatars.has(player.avatar)) return false;
      if (![player.score, player.wins, player.impostorRounds, player.impostorWins, player.caught, player.votesReceived].every(value => Number.isInteger(value) && value >= 0)) return false;
      names.add(player.name.toLowerCase()); avatars.add(player.avatar);
    }
    if (![60, 90, 120, 180].includes(value.clueDuration)) return false;
    if (![0, 3, 5, 7].includes(value.sessionGoal)) return false;
    if (typeof value.soundOn !== 'boolean' || typeof value.hapticsOn !== 'boolean') return false;
    if (!Array.isArray(value.recentPairs) || value.recentPairs.length > 20 || value.recentPairs.some(key => typeof key !== 'string')) return false;
    const screens = ['lobby','reveal','talk','vote-pass','ballot','tie','caught','guess','result'];
    if (!screens.includes(value.screen)) return false;
    if (value.screen !== 'lobby') {
      const round = value.roundData;
      if (!round || !Number.isInteger(round.impostor) || round.impostor < 0 || round.impostor >= playerCount) return false;
      if (!Number.isInteger(round.starter) || round.starter < 0 || round.starter >= playerCount) return false;
      if (!Array.isArray(round.order) || round.order.length !== playerCount || new Set(round.order).size !== playerCount || round.order.some(index => !Number.isInteger(index) || index < 0 || index >= playerCount)) return false;
      if (typeof round.majority !== 'string' || typeof round.odd !== 'string') return false;
    }
    if (value.screen === 'reveal' && (!Number.isInteger(value.revealIndex) || value.revealIndex < 0 || value.revealIndex >= playerCount || !['pass','peek'].includes(value.revealStage))) return false;
    if (['vote-pass','ballot'].includes(value.screen) && (!Number.isInteger(value.voterIndex) || value.voterIndex < 0 || value.voterIndex >= playerCount || !Array.isArray(value.votes))) return false;
    if (value.screen === 'talk' && !Number.isFinite(value.talkDeadline)) return false;
    if (value.screen === 'result' && (!value.outcome || !['caught-failed','stolen','tie','escaped'].includes(value.outcome.type))) return false;
    return true;
  }

  return { shuffle, pairKey, choosePair, chooseImpostor, tallyVotes, classifyVote, scoreRound, isValidSavedSession };
});
