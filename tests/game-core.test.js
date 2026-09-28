'use strict';
const assert = require('node:assert/strict');
const Core = require('../game-core.js');

const original = [0,1,2,3];
assert.deepEqual(Core.shuffle(original, () => 0), [1,2,3,0]);
assert.deepEqual(original, [0,1,2,3], 'shuffle must not mutate input');

const bank = {Food:[['Chai','Coffee']],Travel:[['Train','Bus']]};
assert.deepEqual(Core.choosePair(bank,'Food',()=>0),{pack:'Food',majority:'Coffee',odd:'Chai',key:'Food::Chai::Coffee'});
assert.equal(Core.choosePair(bank,'Mixed',()=>.99).pack,'Travel');
assert.throws(()=>Core.choosePair({},'Mixed',()=>0),/khaali/);
const repeatBank={Food:[['Chai','Coffee'],['Samosa','Kachori']]};
assert.equal(Core.choosePair(repeatBank,'Food',()=>0,['Food::Chai::Coffee']).key,'Food::Kachori::Samosa','recent pair should be skipped');

for(let i=0;i<4;i++) assert.notEqual(Core.chooseImpostor(4,2,()=>i/4),2,'same impostor cannot repeat');

let tally=Core.tallyVotes([{target:1},{target:1},{target:1},{target:2}],4);
assert.deepEqual(tally.counts,[0,3,1,0]);
assert.deepEqual(tally.leaders,[1]);
assert.deepEqual(Core.classifyVote([1],1,1),{action:'guess',eliminated:1});
assert.deepEqual(Core.classifyVote([2],1,1),{action:'finish',type:'escaped',eliminated:2});
assert.deepEqual(Core.classifyVote([0,1],1,1),{action:'revote'});
assert.deepEqual(Core.classifyVote([0,1],1,2),{action:'finish',type:'tie',eliminated:null});

const players=Array.from({length:4},(_,id)=>({id,score:0,wins:0,impostorWins:0}));
let scored=Core.scoreRound(players,'caught-failed',2);
assert.deepEqual(scored.winners,[0,1,3]);
assert.deepEqual(scored.players.map(p=>p.score),[1,1,0,1]);
assert.deepEqual(players.map(p=>p.score),[0,0,0,0],'scoreRound must not mutate input');
scored=Core.scoreRound(players,'stolen',2);
assert.equal(scored.players[2].score,1);
scored=Core.scoreRound(players,'escaped',2);
assert.equal(scored.players[2].score,2);
assert.equal(scored.players[2].impostorWins,1);

const validPlayer=(id,avatar)=>({id,name:`P${id}`,avatar,score:0,wins:0,impostorRounds:0,impostorWins:0,caught:0,votesReceived:0});
const valid={sessionActive:true,ended:false,screen:'lobby',clueDuration:120,sessionGoal:5,soundOn:true,hapticsOn:true,recentPairs:[],players:['a','b','c','d'].map((a,i)=>validPlayer(i,a))};
assert.equal(Core.isValidSavedSession(valid,['a','b','c','d']),true);
assert.equal(Core.isValidSavedSession({...valid,clueDuration:42},['a','b','c','d']),false);
assert.equal(Core.isValidSavedSession({...valid,sessionGoal:4},['a','b','c','d']),false);
assert.equal(Core.isValidSavedSession({...valid,soundOn:'yes'},['a','b','c','d']),false);
assert.equal(Core.isValidSavedSession({...valid,recentPairs:Array(21).fill('x')},['a','b','c','d']),false);
assert.equal(Core.isValidSavedSession({...valid,players:[valid.players[0],...valid.players.slice(0,3)]},['a','b','c','d']),false);
assert.equal(Core.isValidSavedSession({...valid,players:valid.players.map((p,i)=>i? p:{...p,score:-1})},['a','b','c','d']),false);
const midRound={...valid,screen:'reveal',revealIndex:0,revealStage:'pass',roundData:{impostor:0,starter:1,order:[0,1,2,3],majority:'Chai',odd:'Coffee'}};
assert.equal(Core.isValidSavedSession(midRound,['a','b','c','d']),true);
assert.equal(Core.isValidSavedSession({...midRound,revealStage:'broken'},['a','b','c','d']),false);
const threePlayers={...valid,players:valid.players.slice(0,3)};
assert.equal(Core.isValidSavedSession(threePlayers,['a','b','c']),true,'three players must be supported');
const twelveAvatars=Array.from({length:12},(_,i)=>`avatar-${i}`);
const twelvePlayers={...valid,players:twelveAvatars.map((avatar,i)=>validPlayer(i,avatar))};
assert.equal(Core.isValidSavedSession(twelvePlayers,twelveAvatars),true,'twelve players must be supported');
assert.equal(Core.isValidSavedSession({...valid,players:valid.players.slice(0,2)},['a','b']),false,'two players must be rejected');

console.log('game-core: all assignment, vote, score and resume assertions passed');
