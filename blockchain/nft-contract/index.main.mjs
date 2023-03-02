// Automatically generated with Reach 0.1.13 (c44a1544)
/* eslint-disable */
export const _version = '0.1.13';
export const _versionHash = '0.1.13 (c44a1544)';
export const _backendVersion = 27;

export function getExports(s) {
  const stdlib = s.reachStdlib;
  return {
    };
  };
export function _getEvents(s) {
  const stdlib = s.reachStdlib;
  return {
    };
  };
export function _getViews(s, viewlib) {
  const stdlib = s.reachStdlib;
  const ctc0 = stdlib.T_Address;
  const ctc1 = stdlib.T_Token;
  const ctc2 = stdlib.T_UInt;
  const ctc3 = stdlib.T_Bool;
  const ctc4 = stdlib.T_Tuple([ctc2, ctc2, ctc3]);
  const ctc5 = stdlib.T_Array(ctc4, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '1'));
  
  const View_price = async (i, svs, args) => {
    if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '1'))) {
      const [v317, v318, v319, v320, v325] = svs;
      stdlib.assert(false, 'illegal view')
      }
    if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '6'))) {
      const [v317, v318, v319, v479, v480] = svs;
      return (await ((async () => {
        
        
        return v319;}))(...args));
      }
    if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '7'))) {
      const [v317, v318, v319, v320, v344, v345, v354, v355] = svs;
      return (await ((async () => {
        
        
        return v319;}))(...args));
      }
    
    stdlib.assert(false, 'illegal view')
    };
  const View_token = async (i, svs, args) => {
    if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '1'))) {
      const [v317, v318, v319, v320, v325] = svs;
      stdlib.assert(false, 'illegal view')
      }
    if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '6'))) {
      const [v317, v318, v319, v479, v480] = svs;
      return (await ((async () => {
        
        
        return v318;}))(...args));
      }
    if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '7'))) {
      const [v317, v318, v319, v320, v344, v345, v354, v355] = svs;
      return (await ((async () => {
        
        
        return v318;}))(...args));
      }
    
    stdlib.assert(false, 'illegal view')
    };
  return {
    infos: {
      View: {
        price: {
          decode: View_price,
          dom: [],
          rng: ctc2
          },
        token: {
          decode: View_token,
          dom: [],
          rng: ctc1
          }
        }
      },
    views: {
      1: [ctc0, ctc1, ctc2, ctc0, ctc5],
      6: [ctc0, ctc1, ctc2, ctc5, ctc2],
      7: [ctc0, ctc1, ctc2, ctc0, ctc0, ctc2, ctc5, ctc2]
      }
    };
  
  };
export function _getMaps(s) {
  const stdlib = s.reachStdlib;
  const ctc0 = stdlib.T_Tuple([]);
  return {
    mapDataTy: ctc0
    };
  };
export async function Admin(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for Admin expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for Admin expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_UInt;
  const ctc1 = stdlib.T_Token;
  const ctc2 = stdlib.T_Address;
  const ctc3 = stdlib.T_Null;
  const ctc4 = stdlib.T_Tuple([]);
  const ctc5 = stdlib.T_Data({
    Market_buy0_70: ctc4,
    Market_withdraw0_70: ctc4
    });
  const ctc6 = stdlib.T_Tuple([ctc2, ctc0, ctc1]);
  const ctc7 = stdlib.T_Bool;
  const ctc8 = stdlib.T_Tuple([ctc0, ctc0, ctc7]);
  const ctc9 = stdlib.T_Array(ctc8, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '1'));
  
  
  const v307 = [stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'), stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'), false];
  const v308 = [v307];
  const v312 = stdlib.protect(ctc0, interact.price, 'for Admin\'s interact field price');
  const v313 = stdlib.protect(ctc1, interact.token, 'for Admin\'s interact field token');
  const v314 = stdlib.protect(ctc2, interact.wallet, 'for Admin\'s interact field wallet');
  
  const txn1 = await (ctc.sendrecv({
    args: [v313, v312, v314],
    evt_cnt: 3,
    funcNum: 0,
    lct: stdlib.checkedBigNumberify('./nft-contract/index.rsh:33:7:dot', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc1, ctc0, ctc2],
    pay: [stdlib.checkedBigNumberify('./nft-contract/index.rsh:33:7:decimal', stdlib.UInt_max, '0'), []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [v318, v319, v320], secs: v322, time: v321, didSend: v31, from: v317 } = txn1;
      
      const v323 = v308[stdlib.checkedBigNumberify('./nft-contract/index.rsh:33:7:dot', stdlib.UInt_max, '0')];
      const v324 = stdlib.Array_set(v323, '0', stdlib.checkedBigNumberify('./nft-contract/index.rsh:33:7:dot', stdlib.UInt_max, '0'));
      const v325 = stdlib.Array_set(v308, stdlib.checkedBigNumberify('./nft-contract/index.rsh:33:7:dot', stdlib.UInt_max, '0'), v324);
      sim_r.txns.push({
        amt: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
        kind: 'init',
        tok: v318
        });
      ;
      sim_r.isHalt = false;
      
      return sim_r;
      }),
    soloSend: true,
    timeoutAt: undefined /* mto */,
    tys: [ctc1, ctc0, ctc2],
    waitIfNotPresent: false
    }));
  const {data: [v318, v319, v320], secs: v322, time: v321, didSend: v31, from: v317 } = txn1;
  const v323 = v308[stdlib.checkedBigNumberify('./nft-contract/index.rsh:33:7:dot', stdlib.UInt_max, '0')];
  const v324 = stdlib.Array_set(v323, '0', stdlib.checkedBigNumberify('./nft-contract/index.rsh:33:7:dot', stdlib.UInt_max, '0'));
  const v325 = stdlib.Array_set(v308, stdlib.checkedBigNumberify('./nft-contract/index.rsh:33:7:dot', stdlib.UInt_max, '0'), v324);
  ;
  ;
  const txn2 = await (ctc.sendrecv({
    args: [v317, v318, v319, v320, v325],
    evt_cnt: 0,
    funcNum: 1,
    lct: v321,
    onlyIf: true,
    out_tys: [],
    pay: [stdlib.checkedBigNumberify('./nft-contract/index.rsh:36:7:dot', stdlib.UInt_max, '0'), [[stdlib.checkedBigNumberify('./nft-contract/index.rsh:36:13:decimal', stdlib.UInt_max, '1'), v318]]],
    sim_p: (async (txn2) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [], secs: v329, time: v328, didSend: v38, from: v327 } = txn2;
      
      ;
      const v330 = v325[stdlib.checkedBigNumberify('./nft-contract/index.rsh:36:7:dot', stdlib.UInt_max, '0')];
      const v331 = v330[stdlib.checkedBigNumberify('./nft-contract/index.rsh:36:7:dot', stdlib.UInt_max, '0')];
      const v332 = stdlib.add(v331, stdlib.checkedBigNumberify('./nft-contract/index.rsh:36:13:decimal', stdlib.UInt_max, '1'));
      const v334 = stdlib.Array_set(v330, '0', v332);
      const v335 = stdlib.Array_set(v325, stdlib.checkedBigNumberify('./nft-contract/index.rsh:36:7:dot', stdlib.UInt_max, '0'), v334);
      sim_r.txns.push({
        amt: stdlib.checkedBigNumberify('./nft-contract/index.rsh:36:13:decimal', stdlib.UInt_max, '1'),
        kind: 'to',
        tok: v318
        });
      const v340 = await ctc.getContractInfo();
      
      
      const v344 = v317;
      const v345 = stdlib.checkedBigNumberify('./nft-contract/index.rsh:42:77:decimal', stdlib.UInt_max, '0');
      const v346 = false;
      const v347 = false;
      const v348 = v328;
      const v354 = v335;
      const v355 = stdlib.checkedBigNumberify('./nft-contract/index.rsh:28:5:after expr stmt', stdlib.UInt_max, '0');
      
      if (await (async () => {
        const v363 = v346 ? false : true;
        const v364 = v347 ? false : v363;
        
        return v364;})()) {
        sim_r.isHalt = false;
        }
      else {
        const v447 = stdlib.sub(v355, v345);
        sim_r.txns.push({
          kind: 'from',
          to: v320,
          tok: undefined /* Nothing */
          });
        const v448 = v354[stdlib.checkedBigNumberify('./nft-contract/index.rsh:73:26:application', stdlib.UInt_max, '0')];
        const v449 = v448[stdlib.checkedBigNumberify('./nft-contract/index.rsh:73:26:application', stdlib.UInt_max, '0')];
        const v453 = stdlib.sub(v449, stdlib.checkedBigNumberify('./nft-contract/index.rsh:73:14:decimal', stdlib.UInt_max, '1'));
        const v455 = stdlib.Array_set(v448, '0', v453);
        const v456 = stdlib.Array_set(v354, stdlib.checkedBigNumberify('./nft-contract/index.rsh:73:26:application', stdlib.UInt_max, '0'), v455);
        sim_r.txns.push({
          kind: 'from',
          to: v344,
          tok: v318
          });
        
        if (v347) {
          
          sim_r.txns.push({
            kind: 'halt',
            tok: v318
            })
          sim_r.txns.push({
            kind: 'halt',
            tok: undefined /* Nothing */
            })
          sim_r.isHalt = true;
          }
        else {
          
          const v472 = false;
          const v473 = v348;
          const v479 = v456;
          const v480 = v447;
          
          if (await (async () => {
            const v487 = v472 ? false : true;
            
            return v487;})()) {
            sim_r.isHalt = false;
            }
          else {
            
            sim_r.txns.push({
              kind: 'halt',
              tok: v318
              })
            sim_r.txns.push({
              kind: 'halt',
              tok: undefined /* Nothing */
              })
            sim_r.isHalt = true;
            }}}
      return sim_r;
      }),
    soloSend: true,
    timeoutAt: undefined /* mto */,
    tys: [ctc2, ctc1, ctc0, ctc2, ctc9],
    waitIfNotPresent: false
    }));
  const {data: [], secs: v329, time: v328, didSend: v38, from: v327 } = txn2;
  ;
  const v330 = v325[stdlib.checkedBigNumberify('./nft-contract/index.rsh:36:7:dot', stdlib.UInt_max, '0')];
  const v331 = v330[stdlib.checkedBigNumberify('./nft-contract/index.rsh:36:7:dot', stdlib.UInt_max, '0')];
  const v332 = stdlib.add(v331, stdlib.checkedBigNumberify('./nft-contract/index.rsh:36:13:decimal', stdlib.UInt_max, '1'));
  const v334 = stdlib.Array_set(v330, '0', v332);
  const v335 = stdlib.Array_set(v325, stdlib.checkedBigNumberify('./nft-contract/index.rsh:36:7:dot', stdlib.UInt_max, '0'), v334);
  ;
  const v336 = stdlib.addressEq(v317, v327);
  stdlib.assert(v336, {
    at: './nft-contract/index.rsh:36:7:dot',
    fs: [],
    msg: 'sender correct',
    who: 'Admin'
    });
  const v340 = await ctc.getContractInfo();
  stdlib.protect(ctc3, await interact.onReady(v340), {
    at: './nft-contract/index.rsh:39:23:application',
    fs: ['at ./nft-contract/index.rsh:39:23:application call to [unknown function] (defined at: ./nft-contract/index.rsh:39:23:function exp)', 'at ./nft-contract/index.rsh:39:23:application call to "liftedInteract" (defined at: ./nft-contract/index.rsh:39:23:application)'],
    msg: 'onReady',
    who: 'Admin'
    });
  
  const v343 = 'The token is on the market';
  stdlib.protect(ctc3, await interact.log(v343), {
    at: './nft-contract/index.rsh:40:19:application',
    fs: ['at ./nft-contract/index.rsh:40:19:application call to [unknown function] (defined at: ./nft-contract/index.rsh:40:19:function exp)', 'at ./nft-contract/index.rsh:40:19:application call to "liftedInteract" (defined at: ./nft-contract/index.rsh:40:19:application)'],
    msg: 'log',
    who: 'Admin'
    });
  
  let v344 = v317;
  let v345 = stdlib.checkedBigNumberify('./nft-contract/index.rsh:42:77:decimal', stdlib.UInt_max, '0');
  let v346 = false;
  let v347 = false;
  let v348 = v328;
  let v354 = v335;
  let v355 = stdlib.checkedBigNumberify('./nft-contract/index.rsh:28:5:after expr stmt', stdlib.UInt_max, '0');
  
  let txn3 = txn2;
  while (await (async () => {
    const v363 = v346 ? false : true;
    const v364 = v347 ? false : v363;
    
    return v364;})()) {
    const txn4 = await (ctc.recv({
      didSend: false,
      evt_cnt: 1,
      funcNum: 5,
      out_tys: [ctc5],
      timeoutAt: undefined /* mto */,
      waitIfNotPresent: false
      }));
    const {data: [v385], secs: v387, time: v386, didSend: v149, from: v384 } = txn4;
    switch (v385[0]) {
      case 'Market_buy0_70': {
        const v388 = v385[1];
        undefined /* setApiDetails */;
        const v395 = stdlib.add(v355, v319);
        ;
        const v397 = [v384, v319, v318];
        await txn4.getOutput('Market_buy', 'v397', ctc6, v397);
        const v406 = stdlib.safeAdd(v319, v345);
        const cv344 = v384;
        const cv345 = v406;
        const cv346 = true;
        const cv347 = false;
        const cv348 = v386;
        const cv354 = v354;
        const cv355 = v395;
        
        v344 = cv344;
        v345 = cv345;
        v346 = cv346;
        v347 = cv347;
        v348 = cv348;
        v354 = cv354;
        v355 = cv355;
        
        txn3 = txn4;
        continue;
        break;
        }
      case 'Market_withdraw0_70': {
        const v416 = v385[1];
        undefined /* setApiDetails */;
        ;
        const v437 = stdlib.addressEq(v384, v317);
        stdlib.assert(v437, {
          at: './nft-contract/index.rsh:65:24:application',
          fs: ['at ./nft-contract/index.rsh:63:15:application call to [unknown function] (defined at: ./nft-contract/index.rsh:63:15:function exp)'],
          msg: null,
          who: 'Admin'
          });
        await txn4.getOutput('Market_withdraw', 'v437', ctc7, v437);
        const cv344 = v344;
        const cv345 = v345;
        const cv346 = false;
        const cv347 = true;
        const cv348 = v386;
        const cv354 = v354;
        const cv355 = v355;
        
        v344 = cv344;
        v345 = cv345;
        v346 = cv346;
        v347 = cv347;
        v348 = cv348;
        v354 = cv354;
        v355 = cv355;
        
        txn3 = txn4;
        continue;
        break;
        }
      }
    
    }
  const v447 = stdlib.sub(v355, v345);
  ;
  const v448 = v354[stdlib.checkedBigNumberify('./nft-contract/index.rsh:73:26:application', stdlib.UInt_max, '0')];
  const v449 = v448[stdlib.checkedBigNumberify('./nft-contract/index.rsh:73:26:application', stdlib.UInt_max, '0')];
  const v453 = stdlib.sub(v449, stdlib.checkedBigNumberify('./nft-contract/index.rsh:73:14:decimal', stdlib.UInt_max, '1'));
  const v455 = stdlib.Array_set(v448, '0', v453);
  const v456 = stdlib.Array_set(v354, stdlib.checkedBigNumberify('./nft-contract/index.rsh:73:26:application', stdlib.UInt_max, '0'), v455);
  ;
  stdlib.protect(ctc3, await interact.onSoldOrWithdrawn(), {
    at: './nft-contract/index.rsh:75:33:application',
    fs: ['at ./nft-contract/index.rsh:75:33:application call to [unknown function] (defined at: ./nft-contract/index.rsh:75:33:function exp)', 'at ./nft-contract/index.rsh:75:33:application call to "liftedInteract" (defined at: ./nft-contract/index.rsh:75:33:application)'],
    msg: 'onSoldOrWithdrawn',
    who: 'Admin'
    });
  
  if (v347) {
    const v459 = 'The token has been withdrawn';
    stdlib.protect(ctc3, await interact.log(v459), {
      at: './nft-contract/index.rsh:78:23:application',
      fs: ['at ./nft-contract/index.rsh:78:23:application call to [unknown function] (defined at: ./nft-contract/index.rsh:78:23:function exp)', 'at ./nft-contract/index.rsh:78:23:application call to "liftedInteract" (defined at: ./nft-contract/index.rsh:78:23:application)'],
      msg: 'log',
      who: 'Admin'
      });
    
    return;
    }
  else {
    const v466 = stdlib.eq(v447, stdlib.checkedBigNumberify('./nft-contract/index.rsh:83:26:decimal', stdlib.UInt_max, '0'));
    stdlib.assert(v466, {
      at: './nft-contract/index.rsh:83:12:application',
      fs: [],
      msg: null,
      who: 'Admin'
      });
    const v467 = v456[stdlib.checkedBigNumberify('./nft-contract/index.rsh:84:20:application', stdlib.UInt_max, '0')];
    const v468 = v467[stdlib.checkedBigNumberify('./nft-contract/index.rsh:84:20:application', stdlib.UInt_max, '0')];
    const v469 = stdlib.eq(v468, stdlib.checkedBigNumberify('./nft-contract/index.rsh:84:31:decimal', stdlib.UInt_max, '0'));
    stdlib.assert(v469, {
      at: './nft-contract/index.rsh:84:12:application',
      fs: [],
      msg: null,
      who: 'Admin'
      });
    const v471 = 'The token has been sold, waiting for end signal';
    stdlib.protect(ctc3, await interact.log(v471), {
      at: './nft-contract/index.rsh:86:19:application',
      fs: ['at ./nft-contract/index.rsh:86:19:application call to [unknown function] (defined at: ./nft-contract/index.rsh:86:19:function exp)', 'at ./nft-contract/index.rsh:86:19:application call to "liftedInteract" (defined at: ./nft-contract/index.rsh:86:19:application)'],
      msg: 'log',
      who: 'Admin'
      });
    
    let v472 = false;
    let v473 = v348;
    let v479 = v456;
    let v480 = v447;
    
    let txn4 = txn3;
    while (await (async () => {
      const v487 = v472 ? false : true;
      
      return v487;})()) {
      const txn5 = await (ctc.recv({
        didSend: false,
        evt_cnt: 1,
        funcNum: 4,
        out_tys: [ctc4],
        timeoutAt: undefined /* mto */,
        waitIfNotPresent: false
        }));
      const {data: [v495], secs: v497, time: v496, didSend: v243, from: v494 } = txn5;
      undefined /* setApiDetails */;
      ;
      const v499 = stdlib.addressEq(v494, v317);
      stdlib.assert(v499, {
        at: './nft-contract/index.rsh:103:24:application',
        fs: ['at ./nft-contract/index.rsh:101:15:application call to [unknown function] (defined at: ./nft-contract/index.rsh:101:15:function exp)'],
        msg: null,
        who: 'Admin'
        });
      await txn5.getOutput('Market_stop', 'v499', ctc7, v499);
      const cv472 = true;
      const cv473 = v496;
      const cv479 = v479;
      const cv480 = v480;
      
      v472 = cv472;
      v473 = cv473;
      v479 = cv479;
      v480 = cv480;
      
      txn4 = txn5;
      continue;
      
      }
    const v507 = 'The market is closing down....';
    stdlib.protect(ctc3, await interact.log(v507), {
      at: './nft-contract/index.rsh:110:19:application',
      fs: ['at ./nft-contract/index.rsh:110:19:application call to [unknown function] (defined at: ./nft-contract/index.rsh:110:19:function exp)', 'at ./nft-contract/index.rsh:110:19:application call to "liftedInteract" (defined at: ./nft-contract/index.rsh:110:19:application)'],
      msg: 'log',
      who: 'Admin'
      });
    
    const v509 = stdlib.eq(v480, stdlib.checkedBigNumberify('./nft-contract/index.rsh:112:26:decimal', stdlib.UInt_max, '0'));
    stdlib.assert(v509, {
      at: './nft-contract/index.rsh:112:12:application',
      fs: [],
      msg: null,
      who: 'Admin'
      });
    const v510 = v479[stdlib.checkedBigNumberify('./nft-contract/index.rsh:113:20:application', stdlib.UInt_max, '0')];
    const v511 = v510[stdlib.checkedBigNumberify('./nft-contract/index.rsh:113:20:application', stdlib.UInt_max, '0')];
    const v512 = stdlib.eq(v511, stdlib.checkedBigNumberify('./nft-contract/index.rsh:113:31:decimal', stdlib.UInt_max, '0'));
    stdlib.assert(v512, {
      at: './nft-contract/index.rsh:113:12:application',
      fs: [],
      msg: null,
      who: 'Admin'
      });
    return;
    }
  
  
  
  };
export async function _Market_buy7(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for _Market_buy7 expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for _Market_buy7 expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Address;
  const ctc1 = stdlib.T_Token;
  const ctc2 = stdlib.T_UInt;
  const ctc3 = stdlib.T_Bool;
  const ctc4 = stdlib.T_Tuple([ctc2, ctc2, ctc3]);
  const ctc5 = stdlib.T_Array(ctc4, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '1'));
  const ctc6 = stdlib.T_Tuple([]);
  const ctc7 = stdlib.T_Data({
    Market_buy0_70: ctc6,
    Market_withdraw0_70: ctc6
    });
  const ctc8 = stdlib.T_Tuple([ctc0, ctc2, ctc1]);
  const ctc9 = stdlib.T_Null;
  
  
  const [v317, v318, v319, v320, v344, v345, v354, v355] = await ctc.getState(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '7'), [ctc0, ctc1, ctc2, ctc0, ctc0, ctc2, ctc5, ctc2]);
  const v367 = stdlib.protect(ctc6, await interact.in(), {
    at: './nft-contract/index.rsh:1:23:application',
    fs: ['at ./nft-contract/index.rsh:49:13:application call to [unknown function] (defined at: ./nft-contract/index.rsh:49:13:function exp)', 'at ./nft-contract/index.rsh:42:58:application call to "runMarket_buy0_70" (defined at: ./nft-contract/index.rsh:49:13:function exp)', 'at ./nft-contract/index.rsh:42:58:application call to [unknown function] (defined at: ./nft-contract/index.rsh:42:58:function exp)'],
    msg: 'in',
    who: 'Market_buy'
    });
  const v371 = ['Market_buy0_70', v367];
  
  const txn1 = await (ctc.sendrecv({
    args: [v317, v318, v319, v320, v344, v345, v354, v355, v371],
    evt_cnt: 1,
    funcNum: 5,
    lct: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc7],
    pay: [v319, []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [v385], secs: v387, time: v386, didSend: v149, from: v384 } = txn1;
      
      switch (v385[0]) {
        case 'Market_buy0_70': {
          const v388 = v385[1];
          sim_r.txns.push({
            kind: 'api',
            who: "Market_buy"
            });
          const v395 = stdlib.add(v355, v319);
          sim_r.txns.push({
            amt: v319,
            kind: 'to',
            tok: undefined /* Nothing */
            });
          const v397 = [v384, v319, v318];
          const v398 = await txn1.getOutput('Market_buy', 'v397', ctc8, v397);
          
          const v406 = stdlib.safeAdd(v319, v345);
          const v833 = stdlib.sub(v395, v406);
          sim_r.txns.push({
            kind: 'from',
            to: v320,
            tok: undefined /* Nothing */
            });
          const v834 = v354[stdlib.checkedBigNumberify('./nft-contract/index.rsh:73:26:application', stdlib.UInt_max, '0')];
          const v835 = v834[stdlib.checkedBigNumberify('./nft-contract/index.rsh:73:26:application', stdlib.UInt_max, '0')];
          const v836 = stdlib.sub(v835, stdlib.checkedBigNumberify('./nft-contract/index.rsh:73:14:decimal', stdlib.UInt_max, '1'));
          const v837 = stdlib.Array_set(v834, '0', v836);
          const v838 = stdlib.Array_set(v354, stdlib.checkedBigNumberify('./nft-contract/index.rsh:73:26:application', stdlib.UInt_max, '0'), v837);
          sim_r.txns.push({
            kind: 'from',
            to: v384,
            tok: v318
            });
          const v861 = v838;
          const v862 = v833;
          sim_r.isHalt = false;
          
          break;
          }
        case 'Market_withdraw0_70': {
          const v416 = v385[1];
          
          break;
          }
        }
      return sim_r;
      }),
    soloSend: false,
    timeoutAt: undefined /* mto */,
    tys: [ctc0, ctc1, ctc2, ctc0, ctc0, ctc2, ctc5, ctc2, ctc7],
    waitIfNotPresent: false
    }));
  const {data: [v385], secs: v387, time: v386, didSend: v149, from: v384 } = txn1;
  switch (v385[0]) {
    case 'Market_buy0_70': {
      const v388 = v385[1];
      undefined /* setApiDetails */;
      const v395 = stdlib.add(v355, v319);
      ;
      const v397 = [v384, v319, v318];
      const v398 = await txn1.getOutput('Market_buy', 'v397', ctc8, v397);
      if (v149) {
        stdlib.protect(ctc9, await interact.out(v388, v398), {
          at: './nft-contract/index.rsh:50:13:application',
          fs: ['at ./nft-contract/index.rsh:50:13:application call to [unknown function] (defined at: ./nft-contract/index.rsh:50:13:function exp)', 'at ./nft-contract/index.rsh:53:18:application call to "k" (defined at: ./nft-contract/index.rsh:52:15:function exp)', 'at ./nft-contract/index.rsh:52:15:application call to [unknown function] (defined at: ./nft-contract/index.rsh:52:15:function exp)'],
          msg: 'out',
          who: 'Market_buy'
          });
        }
      else {
        }
      
      const v406 = stdlib.safeAdd(v319, v345);
      const v833 = stdlib.sub(v395, v406);
      ;
      const v834 = v354[stdlib.checkedBigNumberify('./nft-contract/index.rsh:73:26:application', stdlib.UInt_max, '0')];
      const v835 = v834[stdlib.checkedBigNumberify('./nft-contract/index.rsh:73:26:application', stdlib.UInt_max, '0')];
      const v836 = stdlib.sub(v835, stdlib.checkedBigNumberify('./nft-contract/index.rsh:73:14:decimal', stdlib.UInt_max, '1'));
      const v837 = stdlib.Array_set(v834, '0', v836);
      const v838 = stdlib.Array_set(v354, stdlib.checkedBigNumberify('./nft-contract/index.rsh:73:26:application', stdlib.UInt_max, '0'), v837);
      ;
      const v839 = stdlib.eq(v833, stdlib.checkedBigNumberify('./nft-contract/index.rsh:83:26:decimal', stdlib.UInt_max, '0'));
      stdlib.assert(v839, {
        at: './nft-contract/index.rsh:83:12:application',
        fs: [],
        msg: null,
        who: 'Market_buy'
        });
      const v840 = v838[stdlib.checkedBigNumberify('./nft-contract/index.rsh:84:20:application', stdlib.UInt_max, '0')];
      const v841 = v840[stdlib.checkedBigNumberify('./nft-contract/index.rsh:84:20:application', stdlib.UInt_max, '0')];
      const v842 = stdlib.eq(v841, stdlib.checkedBigNumberify('./nft-contract/index.rsh:84:31:decimal', stdlib.UInt_max, '0'));
      stdlib.assert(v842, {
        at: './nft-contract/index.rsh:84:12:application',
        fs: [],
        msg: null,
        who: 'Market_buy'
        });
      const v861 = v838;
      const v862 = v833;
      return;
      
      break;
      }
    case 'Market_withdraw0_70': {
      const v416 = v385[1];
      return;
      break;
      }
    }
  
  
  };
export async function _Market_stop6(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for _Market_stop6 expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for _Market_stop6 expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Address;
  const ctc1 = stdlib.T_Token;
  const ctc2 = stdlib.T_UInt;
  const ctc3 = stdlib.T_Bool;
  const ctc4 = stdlib.T_Tuple([ctc2, ctc2, ctc3]);
  const ctc5 = stdlib.T_Array(ctc4, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '1'));
  const ctc6 = stdlib.T_Tuple([]);
  const ctc7 = stdlib.T_Null;
  
  
  const [v317, v318, v319, v479, v480] = await ctc.getState(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '6'), [ctc0, ctc1, ctc2, ctc5, ctc2]);
  const v488 = ctc.selfAddress();
  const v490 = stdlib.protect(ctc6, await interact.in(), {
    at: './nft-contract/index.rsh:1:23:application',
    fs: ['at ./nft-contract/index.rsh:97:16:application call to [unknown function] (defined at: ./nft-contract/index.rsh:97:16:function exp)', 'at ./nft-contract/index.rsh:97:16:application call to [unknown function] (defined at: ./nft-contract/index.rsh:97:16:function exp)'],
    msg: 'in',
    who: 'Market_stop'
    });
  const v492 = stdlib.addressEq(v488, v317);
  stdlib.assert(v492, {
    at: './nft-contract/index.rsh:98:23:application',
    fs: ['at ./nft-contract/index.rsh:97:16:application call to [unknown function] (defined at: ./nft-contract/index.rsh:97:16:function exp)', 'at ./nft-contract/index.rsh:97:16:application call to [unknown function] (defined at: ./nft-contract/index.rsh:97:16:function exp)', 'at ./nft-contract/index.rsh:97:16:application call to [unknown function] (defined at: ./nft-contract/index.rsh:97:16:function exp)'],
    msg: null,
    who: 'Market_stop'
    });
  
  const txn1 = await (ctc.sendrecv({
    args: [v317, v318, v319, v479, v480, v490],
    evt_cnt: 1,
    funcNum: 4,
    lct: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc6],
    pay: [stdlib.checkedBigNumberify('./nft-contract/index.rsh:100:19:decimal', stdlib.UInt_max, '0'), []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [v495], secs: v497, time: v496, didSend: v243, from: v494 } = txn1;
      
      sim_r.txns.push({
        kind: 'api',
        who: "Market_stop"
        });
      ;
      const v499 = stdlib.addressEq(v494, v317);
      const v500 = await txn1.getOutput('Market_stop', 'v499', ctc3, v499);
      
      sim_r.txns.push({
        kind: 'halt',
        tok: v318
        })
      sim_r.txns.push({
        kind: 'halt',
        tok: undefined /* Nothing */
        })
      sim_r.isHalt = true;
      
      return sim_r;
      }),
    soloSend: false,
    timeoutAt: undefined /* mto */,
    tys: [ctc0, ctc1, ctc2, ctc5, ctc2, ctc6],
    waitIfNotPresent: false
    }));
  const {data: [v495], secs: v497, time: v496, didSend: v243, from: v494 } = txn1;
  undefined /* setApiDetails */;
  ;
  const v499 = stdlib.addressEq(v494, v317);
  stdlib.assert(v499, {
    at: './nft-contract/index.rsh:103:24:application',
    fs: ['at ./nft-contract/index.rsh:101:15:application call to [unknown function] (defined at: ./nft-contract/index.rsh:101:15:function exp)'],
    msg: null,
    who: 'Market_stop'
    });
  const v500 = await txn1.getOutput('Market_stop', 'v499', ctc3, v499);
  if (v243) {
    stdlib.protect(ctc7, await interact.out(v495, v500), {
      at: './nft-contract/index.rsh:96:13:application',
      fs: ['at ./nft-contract/index.rsh:96:13:application call to [unknown function] (defined at: ./nft-contract/index.rsh:96:13:function exp)', 'at ./nft-contract/index.rsh:104:18:application call to "k" (defined at: ./nft-contract/index.rsh:101:15:function exp)', 'at ./nft-contract/index.rsh:101:15:application call to [unknown function] (defined at: ./nft-contract/index.rsh:101:15:function exp)'],
      msg: 'out',
      who: 'Market_stop'
      });
    }
  else {
    }
  
  const v917 = stdlib.eq(v480, stdlib.checkedBigNumberify('./nft-contract/index.rsh:112:26:decimal', stdlib.UInt_max, '0'));
  stdlib.assert(v917, {
    at: './nft-contract/index.rsh:112:12:application',
    fs: [],
    msg: null,
    who: 'Market_stop'
    });
  const v918 = v479[stdlib.checkedBigNumberify('./nft-contract/index.rsh:113:20:application', stdlib.UInt_max, '0')];
  const v919 = v918[stdlib.checkedBigNumberify('./nft-contract/index.rsh:113:20:application', stdlib.UInt_max, '0')];
  const v920 = stdlib.eq(v919, stdlib.checkedBigNumberify('./nft-contract/index.rsh:113:31:decimal', stdlib.UInt_max, '0'));
  stdlib.assert(v920, {
    at: './nft-contract/index.rsh:113:12:application',
    fs: [],
    msg: null,
    who: 'Market_stop'
    });
  return;
  
  
  
  };
export async function _Market_withdraw7(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for _Market_withdraw7 expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for _Market_withdraw7 expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Address;
  const ctc1 = stdlib.T_Token;
  const ctc2 = stdlib.T_UInt;
  const ctc3 = stdlib.T_Bool;
  const ctc4 = stdlib.T_Tuple([ctc2, ctc2, ctc3]);
  const ctc5 = stdlib.T_Array(ctc4, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '1'));
  const ctc6 = stdlib.T_Tuple([]);
  const ctc7 = stdlib.T_Data({
    Market_buy0_70: ctc6,
    Market_withdraw0_70: ctc6
    });
  const ctc8 = stdlib.T_Null;
  
  
  const [v317, v318, v319, v320, v344, v345, v354, v355] = await ctc.getState(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '7'), [ctc0, ctc1, ctc2, ctc0, ctc0, ctc2, ctc5, ctc2]);
  const v373 = ctc.selfAddress();
  const v375 = stdlib.protect(ctc6, await interact.in(), {
    at: './nft-contract/index.rsh:1:23:application',
    fs: ['at ./nft-contract/index.rsh:59:16:application call to [unknown function] (defined at: ./nft-contract/index.rsh:59:16:function exp)', 'at ./nft-contract/index.rsh:42:58:application call to "runMarket_withdraw0_70" (defined at: ./nft-contract/index.rsh:57:13:function exp)', 'at ./nft-contract/index.rsh:42:58:application call to [unknown function] (defined at: ./nft-contract/index.rsh:42:58:function exp)'],
    msg: 'in',
    who: 'Market_withdraw'
    });
  const v377 = stdlib.addressEq(v373, v317);
  stdlib.assert(v377, {
    at: './nft-contract/index.rsh:60:23:application',
    fs: ['at ./nft-contract/index.rsh:59:16:application call to [unknown function] (defined at: ./nft-contract/index.rsh:59:16:function exp)', 'at ./nft-contract/index.rsh:59:16:application call to [unknown function] (defined at: ./nft-contract/index.rsh:59:16:function exp)', 'at ./nft-contract/index.rsh:42:58:application call to "runMarket_withdraw0_70" (defined at: ./nft-contract/index.rsh:57:13:function exp)', 'at ./nft-contract/index.rsh:42:58:application call to [unknown function] (defined at: ./nft-contract/index.rsh:42:58:function exp)'],
    msg: null,
    who: 'Market_withdraw'
    });
  const v380 = ['Market_withdraw0_70', v375];
  
  const txn1 = await (ctc.sendrecv({
    args: [v317, v318, v319, v320, v344, v345, v354, v355, v380],
    evt_cnt: 1,
    funcNum: 5,
    lct: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc7],
    pay: [stdlib.checkedBigNumberify('./nft-contract/index.rsh:62:19:decimal', stdlib.UInt_max, '0'), []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [v385], secs: v387, time: v386, didSend: v149, from: v384 } = txn1;
      
      switch (v385[0]) {
        case 'Market_buy0_70': {
          const v388 = v385[1];
          
          break;
          }
        case 'Market_withdraw0_70': {
          const v416 = v385[1];
          sim_r.txns.push({
            kind: 'api',
            who: "Market_withdraw"
            });
          ;
          const v437 = stdlib.addressEq(v384, v317);
          const v438 = await txn1.getOutput('Market_withdraw', 'v437', ctc3, v437);
          
          sim_r.txns.push({
            kind: 'from',
            to: v320,
            tok: undefined /* Nothing */
            });
          sim_r.txns.push({
            kind: 'from',
            to: v344,
            tok: v318
            });
          sim_r.txns.push({
            kind: 'halt',
            tok: v318
            })
          sim_r.txns.push({
            kind: 'halt',
            tok: undefined /* Nothing */
            })
          sim_r.isHalt = true;
          
          break;
          }
        }
      return sim_r;
      }),
    soloSend: false,
    timeoutAt: undefined /* mto */,
    tys: [ctc0, ctc1, ctc2, ctc0, ctc0, ctc2, ctc5, ctc2, ctc7],
    waitIfNotPresent: false
    }));
  const {data: [v385], secs: v387, time: v386, didSend: v149, from: v384 } = txn1;
  switch (v385[0]) {
    case 'Market_buy0_70': {
      const v388 = v385[1];
      return;
      break;
      }
    case 'Market_withdraw0_70': {
      const v416 = v385[1];
      undefined /* setApiDetails */;
      ;
      const v437 = stdlib.addressEq(v384, v317);
      stdlib.assert(v437, {
        at: './nft-contract/index.rsh:65:24:application',
        fs: ['at ./nft-contract/index.rsh:63:15:application call to [unknown function] (defined at: ./nft-contract/index.rsh:63:15:function exp)'],
        msg: null,
        who: 'Market_withdraw'
        });
      const v438 = await txn1.getOutput('Market_withdraw', 'v437', ctc3, v437);
      if (v149) {
        stdlib.protect(ctc8, await interact.out(v416, v438), {
          at: './nft-contract/index.rsh:58:13:application',
          fs: ['at ./nft-contract/index.rsh:58:13:application call to [unknown function] (defined at: ./nft-contract/index.rsh:58:13:function exp)', 'at ./nft-contract/index.rsh:66:18:application call to "k" (defined at: ./nft-contract/index.rsh:63:15:function exp)', 'at ./nft-contract/index.rsh:63:15:application call to [unknown function] (defined at: ./nft-contract/index.rsh:63:15:function exp)'],
          msg: 'out',
          who: 'Market_withdraw'
          });
        }
      else {
        }
      
      ;
      ;
      return;
      
      break;
      }
    }
  
  
  };
export async function Market_buy(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for Market_buy expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for Market_buy expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const step = await ctc.getCurrentStep()
  if (step == 7) {return _Market_buy7(ctcTop, interact);}
  throw stdlib.apiStateMismatchError({ _stateSourceMap }, [stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '7')], stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, step))
  };
export async function Market_stop(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for Market_stop expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for Market_stop expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const step = await ctc.getCurrentStep()
  if (step == 6) {return _Market_stop6(ctcTop, interact);}
  throw stdlib.apiStateMismatchError({ _stateSourceMap }, [stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '6')], stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, step))
  };
export async function Market_withdraw(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for Market_withdraw expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for Market_withdraw expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const step = await ctc.getCurrentStep()
  if (step == 7) {return _Market_withdraw7(ctcTop, interact);}
  throw stdlib.apiStateMismatchError({ _stateSourceMap }, [stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '7')], stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, step))
  };
const _ALGO = {
  ABI: {
    impure: [`Market_buy()(address,uint64,uint64)`, `Market_stop()byte`, `Market_withdraw()byte`, `_reachp_0((uint64,uint64,uint64,address))void`, `_reachp_1((uint64))void`, `_reachp_4((uint64,()))void`, `_reachp_5((uint64,(byte,byte[0])))void`],
    pure: [`View_price()uint64`, `View_token()uint64`],
    sigs: [`Market_buy()(address,uint64,uint64)`, `Market_stop()byte`, `Market_withdraw()byte`, `View_price()uint64`, `View_token()uint64`, `_reachp_0((uint64,uint64,uint64,address))void`, `_reachp_1((uint64))void`, `_reachp_4((uint64,()))void`, `_reachp_5((uint64,(byte,byte[0])))void`]
    },
  GlobalNumByteSlice: 3,
  GlobalNumUint: 0,
  LocalNumByteSlice: 0,
  LocalNumUint: 0,
  appApproval: `CCAJAAEHCAYgKKCNBgQmAwABAAEBMRhBA1IoZEkiWzUBJVs1AilkKmRQggkESOC3PAR755WQBJdNI/oEtFkAMwS/hpa2BN/ZIygE6YgLIQTr7fVxBO0kewY2GgCOCQA7AssC8QABAuYC2wDYAPUAyACBCa81CyQ0ARJEiAPzNAsiWzUMNAtXCAE1DYAEBRynmjQMFlA0DVCwNAyIA8k0DSJVjQIC5QLoQv/FJa81DiEENAESRIgD6jQOIls1D4AEb/SOKTQPFlCwNA+IA5kxADQYEkk1DkSACAAAAAAAAAHzNA4WUQcIULA0DhZRBwg1BCMyBjUNNRk0GUEC9jQLIhJENAxXABEiWyISRCI0FzIKMgmIA8AxGYEFEkSIA6UiMgoyCYgD1TQDQAAKgAQVH3x1NARQsCNDgAkAAAAAAAAAAAE1C0L/LjQBJAxBAts0ASEEEkSIA0o0FhY1BDEZIhJEQv/HNAEkDEECzjQBIQQSRIgDLTQXFjUEQv/gNBaIA14xADQWFlA0FxZQNQuACAAAAAAAAAGNNAtQsDQLNQQxADQWNBMIIyIyBjQONBYINQ41EDURNRI1EzUUNBEUNBIUEEEBzTQYNBcWUDQWFlA0FVA0FFA0ExZQNA9QNA4WUCQyBjUCNQEpSwFXAH9nKkxXfxJnKDQBFjQCFlBnMRkiEkSIAr5C/x4xADQYEkk1C0SACAAAAAAAAAG1NAsWUQcIULA0CxZRBwg1BCIjMgY1EDURNRJC/4MxADUYNAsiWzUMNAslWzUXNAuBEFs1FjQLVxggNRWABL+0iW00DBZQNBcWUDQWFlA0FVCwNAyIAfWBEa9JNQtJVwARJa9cAFwANQ0hB4gCRyI0FzIKiAIvNBg0FxZQNBYWUDQVUDQNUIEwr1AjMgZC/zkjNAESRElXACA1GEkhBVs1F0khBls1FklXMCA1FVdQETUNNAsXNQyABNUVGRQ0DBZQsDQMiAGFNA1XABE1CyM0FzEWNAAjCEk1AAlHAzgUMgoSRDgQIQgSRDgRTwISRDgSEkQ0GDEAEkQ0GCIiIjIGNA00C0kiWyMIFlwAXAAiNQ41DzUQNRE1EjUTNRRC/oGIASUhB4gBjTYaATULQv7uiAEVNhoBNQtC/1WIAQo2GgE1DkL9TogA/zYaATULQv0KIjE0EkSBAzE1EkQiMTYSRCIxNxJEiADfgZEBryIiQv5XQv3tQv52NA40Ewk1EjQTNBWIATs0D1cAETUTNA80E0kiWyMJFlwAXAA1DiM0FzQUiAEANBFBAA0iNBcyCjIJiAEHQv1ENBIiEkQ0DlcAESJbIhJEIjQQNA40EjULNQw1DTUZQv0FNBg0FxZQNBYWUDQMUDQLFlCBSK9QIQQyBkL91SKyASOyELIHsgiziSKyASEIshCyFLIRshKziTQBJBJEiAA/NBYWNQRC/SM0ASQSRIgALzQXFjUEQv0TSIlMCUk1BjIJiACGiQlJQf/uSTUGiAB+iSM1A4lJIhJMNAISEUSJSVcAIDUYSSEFWzUXSSEGWzUWSVcwIDUVSVdQIDUUSYFwWzUTSVd4ETUPgYkBWzUOiUlXACA1GEkhBVs1F0khBls1FklXMBE1DIFBWzULibFC/1c0BjQHSg9B/39C/4c0Bgg1BomxshVC/z+xQv8vMRY0ACMISTUACUcCOAcyChJEOBAjEkQ4CBJEibGyCUL/DQ==`,
  appApprovalMap: {
    0: `2`,
    1: `2`,
    10: `2`,
    100: `23`,
    1000: `587`,
    1001: `587`,
    1002: `588`,
    1003: `588`,
    1004: `589`,
    1005: `589`,
    1006: `590`,
    1007: `590`,
    1008: `591`,
    1009: `591`,
    101: `23`,
    1010: `591`,
    1011: `594`,
    1012: `594`,
    1013: `595`,
    1014: `595`,
    1015: `596`,
    1016: `597`,
    1017: `598`,
    1018: `598`,
    1019: `599`,
    102: `23`,
    1020: `600`,
    1021: `601`,
    1022: `601`,
    1023: `602`,
    1024: `603`,
    1025: `603`,
    1026: `604`,
    1027: `605`,
    1028: `606`,
    1029: `606`,
    103: `23`,
    1030: `607`,
    1031: `608`,
    1032: `609`,
    1033: `609`,
    1034: `610`,
    1035: `610`,
    1036: `611`,
    1037: `611`,
    1038: `611`,
    1039: `613`,
    104: `23`,
    1040: `614`,
    1041: `614`,
    1042: `615`,
    1043: `616`,
    1044: `616`,
    1045: `617`,
    1046: `617`,
    1047: `618`,
    1048: `618`,
    1049: `619`,
    105: `23`,
    1050: `620`,
    1051: `622`,
    1052: `623`,
    1053: `623`,
    1054: `624`,
    1055: `624`,
    1056: `625`,
    1057: `625`,
    1058: `626`,
    1059: `626`,
    106: `23`,
    1060: `627`,
    1061: `627`,
    1062: `628`,
    1063: `628`,
    1064: `629`,
    1065: `630`,
    1066: `632`,
    1067: `632`,
    1068: `633`,
    1069: `634`,
    107: `23`,
    1070: `635`,
    1071: `638`,
    1072: `638`,
    1073: `638`,
    1074: `639`,
    1075: `639`,
    1076: `640`,
    1077: `641`,
    1078: `641`,
    1079: `642`,
    108: `23`,
    1080: `642`,
    1081: `642`,
    1082: `644`,
    1083: `644`,
    1084: `645`,
    1085: `646`,
    1086: `647`,
    1087: `650`,
    1088: `650`,
    1089: `650`,
    109: `23`,
    1090: `651`,
    1091: `651`,
    1092: `652`,
    1093: `653`,
    1094: `653`,
    1095: `654`,
    1096: `654`,
    1097: `654`,
    1098: `656`,
    1099: `657`,
    11: `2`,
    110: `23`,
    1100: `659`,
    1101: `660`,
    1102: `661`,
    1103: `662`,
    1104: `662`,
    1105: `663`,
    1106: `663`,
    1107: `664`,
    1108: `664`,
    1109: `664`,
    111: `23`,
    1110: `665`,
    1111: `667`,
    1112: `668`,
    1113: `669`,
    1114: `669`,
    1115: `669`,
    1116: `670`,
    1117: `671`,
    1118: `671`,
    1119: `672`,
    112: `25`,
    1120: `672`,
    1121: `672`,
    1122: `673`,
    1123: `675`,
    1124: `676`,
    1125: `676`,
    1126: `677`,
    1127: `679`,
    1128: `680`,
    1129: `681`,
    113: `28`,
    1130: `682`,
    1131: `683`,
    1132: `683`,
    1133: `684`,
    1134: `685`,
    1135: `686`,
    1136: `687`,
    1137: `689`,
    1138: `690`,
    1139: `690`,
    114: `28`,
    1140: `690`,
    1141: `691`,
    1142: `691`,
    1143: `692`,
    1144: `693`,
    1145: `693`,
    1146: `694`,
    1147: `695`,
    1148: `695`,
    1149: `696`,
    115: `29`,
    1150: `697`,
    1151: `697`,
    1152: `698`,
    1153: `699`,
    1154: `699`,
    1155: `700`,
    1156: `701`,
    1157: `701`,
    1158: `701`,
    1159: `702`,
    116: `30`,
    1160: `702`,
    1161: `703`,
    1162: `704`,
    1163: `704`,
    1164: `704`,
    1165: `705`,
    1166: `705`,
    1167: `706`,
    1168: `707`,
    1169: `707`,
    117: `30`,
    1170: `708`,
    1171: `709`,
    1172: `709`,
    1173: `710`,
    1174: `711`,
    1175: `711`,
    1176: `711`,
    1177: `712`,
    1178: `712`,
    1179: `713`,
    118: `32`,
    1180: `713`,
    1181: `713`,
    1182: `714`,
    1183: `715`,
    1184: `715`,
    1185: `716`,
    1186: `718`,
    1187: `719`,
    1188: `719`,
    1189: `719`,
    119: `33`,
    1190: `720`,
    1191: `720`,
    1192: `721`,
    1193: `722`,
    1194: `722`,
    1195: `723`,
    1196: `724`,
    1197: `724`,
    1198: `725`,
    1199: `726`,
    12: `2`,
    120: `33`,
    1200: `726`,
    1201: `727`,
    1202: `728`,
    1203: `728`,
    1204: `729`,
    1205: `730`,
    1206: `730`,
    1207: `730`,
    1208: `731`,
    1209: `731`,
    121: `34`,
    1210: `732`,
    1211: `732`,
    1212: `733`,
    1213: `734`,
    1214: `734`,
    1215: `735`,
    1216: `737`,
    1217: `738`,
    1218: `738`,
    1219: `738`,
    122: `35`,
    1220: `740`,
    1221: `740`,
    1222: `741`,
    1223: `741`,
    1224: `742`,
    1225: `743`,
    1226: `744`,
    1227: `744`,
    1228: `744`,
    1229: `745`,
    123: `36`,
    1230: `745`,
    1231: `745`,
    1232: `747`,
    1233: `747`,
    1234: `748`,
    1235: `749`,
    1236: `749`,
    1237: `750`,
    1238: `752`,
    1239: `753`,
    124: `36`,
    1240: `753`,
    1241: `754`,
    1242: `754`,
    1243: `754`,
    1244: `756`,
    1245: `757`,
    1246: `757`,
    1247: `757`,
    1248: `760`,
    1249: `760`,
    125: `36`,
    1250: `761`,
    1251: `761`,
    1252: `762`,
    1253: `763`,
    1254: `764`,
    1255: `765`,
    1256: `765`,
    1257: `766`,
    1258: `767`,
    1259: `767`,
    126: `37`,
    1260: `768`,
    1261: `768`,
    1262: `769`,
    1263: `769`,
    1264: `770`,
    1265: `771`,
    1266: `772`,
    1267: `772`,
    1268: `773`,
    1269: `774`,
    127: `37`,
    1270: `775`,
    1271: `776`,
    1272: `776`,
    1273: `777`,
    1274: `778`,
    1275: `779`,
    1276: `781`,
    1277: `782`,
    1278: `782`,
    1279: `783`,
    128: `38`,
    129: `39`,
    13: `2`,
    130: `40`,
    131: `40`,
    132: `41`,
    133: `41`,
    134: `42`,
    135: `42`,
    136: `42`,
    137: `43`,
    138: `43`,
    139: `44`,
    14: `2`,
    140: `44`,
    141: `44`,
    142: `44`,
    143: `44`,
    144: `44`,
    145: `45`,
    146: `45`,
    147: `46`,
    148: `47`,
    149: `48`,
    15: `2`,
    150: `48`,
    151: `49`,
    152: `50`,
    153: `52`,
    154: `52`,
    155: `53`,
    156: `53`,
    157: `53`,
    158: `54`,
    159: `54`,
    16: `2`,
    160: `55`,
    161: `56`,
    162: `57`,
    163: `57`,
    164: `57`,
    165: `57`,
    166: `57`,
    167: `57`,
    168: `58`,
    169: `58`,
    17: `2`,
    170: `58`,
    171: `61`,
    172: `62`,
    173: `63`,
    174: `63`,
    175: `65`,
    176: `65`,
    177: `66`,
    178: `66`,
    179: `67`,
    18: `2`,
    180: `68`,
    181: `69`,
    182: `69`,
    183: `69`,
    184: `70`,
    185: `70`,
    186: `71`,
    187: `72`,
    188: `73`,
    189: `73`,
    19: `2`,
    190: `74`,
    191: `74`,
    192: `74`,
    193: `74`,
    194: `74`,
    195: `74`,
    196: `75`,
    197: `75`,
    198: `76`,
    199: `77`,
    2: `2`,
    20: `2`,
    200: `78`,
    201: `80`,
    202: `80`,
    203: `81`,
    204: `81`,
    205: `81`,
    206: `83`,
    207: `83`,
    208: `84`,
    209: `84`,
    21: `4`,
    210: `85`,
    211: `86`,
    212: `87`,
    213: `87`,
    214: `88`,
    215: `92`,
    216: `92`,
    217: `92`,
    218: `92`,
    219: `92`,
    22: `4`,
    220: `92`,
    221: `92`,
    222: `92`,
    223: `92`,
    224: `92`,
    225: `93`,
    226: `93`,
    227: `94`,
    228: `95`,
    229: `95`,
    23: `5`,
    230: `95`,
    231: `96`,
    232: `97`,
    233: `98`,
    234: `98`,
    235: `99`,
    236: `100`,
    237: `100`,
    238: `100`,
    239: `101`,
    24: `5`,
    240: `101`,
    241: `102`,
    242: `103`,
    243: `103`,
    244: `104`,
    245: `104`,
    246: `105`,
    247: `105`,
    248: `107`,
    249: `107`,
    25: `5`,
    250: `108`,
    251: `108`,
    252: `108`,
    253: `109`,
    254: `109`,
    255: `110`,
    256: `111`,
    257: `112`,
    258: `115`,
    259: `115`,
    26: `6`,
    260: `116`,
    261: `116`,
    262: `116`,
    263: `117`,
    264: `118`,
    265: `119`,
    266: `120`,
    267: `121`,
    268: `125`,
    269: `127`,
    27: `7`,
    270: `127`,
    271: `128`,
    272: `128`,
    273: `129`,
    274: `129`,
    275: `130`,
    276: `130`,
    277: `130`,
    278: `132`,
    279: `132`,
    28: `8`,
    280: `133`,
    281: `133`,
    282: `134`,
    283: `135`,
    284: `137`,
    285: `137`,
    286: `137`,
    287: `139`,
    288: `140`,
    289: `140`,
    29: `9`,
    290: `141`,
    291: `141`,
    292: `142`,
    293: `142`,
    294: `142`,
    295: `144`,
    296: `144`,
    297: `145`,
    298: `145`,
    299: `145`,
    3: `2`,
    30: `10`,
    300: `147`,
    301: `147`,
    302: `147`,
    303: `147`,
    304: `147`,
    305: `147`,
    306: `148`,
    307: `148`,
    308: `149`,
    309: `150`,
    31: `11`,
    310: `152`,
    311: `153`,
    312: `156`,
    313: `156`,
    314: `156`,
    315: `156`,
    316: `156`,
    317: `156`,
    318: `156`,
    319: `156`,
    32: `11`,
    320: `156`,
    321: `156`,
    322: `156`,
    323: `157`,
    324: `157`,
    325: `158`,
    326: `158`,
    327: `158`,
    328: `161`,
    329: `161`,
    33: `12`,
    330: `162`,
    331: `163`,
    332: `164`,
    333: `164`,
    334: `164`,
    335: `165`,
    336: `165`,
    337: `166`,
    338: `166`,
    339: `167`,
    34: `13`,
    340: `168`,
    341: `171`,
    342: `171`,
    343: `171`,
    344: `172`,
    345: `172`,
    346: `173`,
    347: `174`,
    348: `174`,
    349: `176`,
    35: `14`,
    350: `176`,
    351: `177`,
    352: `178`,
    353: `179`,
    354: `181`,
    355: `181`,
    356: `181`,
    357: `184`,
    358: `184`,
    359: `185`,
    36: `14`,
    360: `186`,
    361: `187`,
    362: `187`,
    363: `187`,
    364: `188`,
    365: `188`,
    366: `189`,
    367: `189`,
    368: `190`,
    369: `191`,
    37: `15`,
    370: `194`,
    371: `194`,
    372: `194`,
    373: `195`,
    374: `195`,
    375: `196`,
    376: `197`,
    377: `197`,
    378: `198`,
    379: `198`,
    38: `16`,
    380: `198`,
    381: `200`,
    382: `200`,
    383: `201`,
    384: `201`,
    385: `201`,
    386: `204`,
    387: `204`,
    388: `205`,
    389: `205`,
    39: `17`,
    390: `206`,
    391: `207`,
    392: `208`,
    393: `208`,
    394: `209`,
    395: `210`,
    396: `211`,
    397: `211`,
    398: `212`,
    399: `212`,
    4: `2`,
    40: `18`,
    400: `212`,
    401: `212`,
    402: `212`,
    403: `212`,
    404: `212`,
    405: `212`,
    406: `212`,
    407: `212`,
    408: `213`,
    409: `213`,
    41: `19`,
    410: `214`,
    411: `215`,
    412: `216`,
    413: `216`,
    414: `217`,
    415: `217`,
    416: `218`,
    417: `218`,
    418: `219`,
    419: `219`,
    42: `21`,
    420: `220`,
    421: `220`,
    422: `221`,
    423: `222`,
    424: `223`,
    425: `224`,
    426: `224`,
    427: `225`,
    428: `225`,
    429: `226`,
    43: `21`,
    430: `226`,
    431: `227`,
    432: `228`,
    433: `228`,
    434: `229`,
    435: `229`,
    436: `230`,
    437: `230`,
    438: `231`,
    439: `231`,
    44: `21`,
    440: `232`,
    441: `232`,
    442: `233`,
    443: `233`,
    444: `235`,
    445: `235`,
    446: `236`,
    447: `237`,
    448: `237`,
    449: `238`,
    45: `21`,
    450: `239`,
    451: `240`,
    452: `240`,
    453: `240`,
    454: `242`,
    455: `242`,
    456: `243`,
    457: `243`,
    458: `244`,
    459: `245`,
    46: `21`,
    460: `246`,
    461: `246`,
    462: `247`,
    463: `248`,
    464: `249`,
    465: `249`,
    466: `250`,
    467: `251`,
    468: `251`,
    469: `252`,
    47: `21`,
    470: `253`,
    471: `253`,
    472: `254`,
    473: `255`,
    474: `256`,
    475: `256`,
    476: `257`,
    477: `258`,
    478: `258`,
    479: `259`,
    48: `21`,
    480: `260`,
    481: `261`,
    482: `262`,
    483: `262`,
    484: `264`,
    485: `264`,
    486: `265`,
    487: `265`,
    488: `266`,
    489: `267`,
    49: `21`,
    490: `267`,
    491: `268`,
    492: `268`,
    493: `268`,
    494: `269`,
    495: `270`,
    496: `271`,
    497: `272`,
    498: `272`,
    499: `272`,
    5: `2`,
    50: `21`,
    500: `273`,
    501: `274`,
    502: `275`,
    503: `275`,
    504: `276`,
    505: `277`,
    506: `277`,
    507: `278`,
    508: `279`,
    509: `280`,
    51: `21`,
    510: `281`,
    511: `281`,
    512: `282`,
    513: `283`,
    514: `284`,
    515: `286`,
    516: `286`,
    517: `286`,
    518: `287`,
    519: `287`,
    52: `21`,
    520: `287`,
    521: `289`,
    522: `289`,
    523: `290`,
    524: `290`,
    525: `291`,
    526: `292`,
    527: `293`,
    528: `293`,
    529: `294`,
    53: `21`,
    530: `298`,
    531: `298`,
    532: `298`,
    533: `298`,
    534: `298`,
    535: `298`,
    536: `298`,
    537: `298`,
    538: `298`,
    539: `298`,
    54: `21`,
    540: `299`,
    541: `299`,
    542: `300`,
    543: `301`,
    544: `301`,
    545: `301`,
    546: `302`,
    547: `303`,
    548: `304`,
    549: `304`,
    55: `21`,
    550: `305`,
    551: `306`,
    552: `306`,
    553: `306`,
    554: `307`,
    555: `307`,
    556: `308`,
    557: `309`,
    558: `310`,
    559: `310`,
    56: `21`,
    560: `311`,
    561: `311`,
    562: `312`,
    563: `312`,
    564: `313`,
    565: `313`,
    566: `314`,
    567: `314`,
    568: `314`,
    569: `316`,
    57: `21`,
    570: `316`,
    571: `317`,
    572: `317`,
    573: `318`,
    574: `318`,
    575: `319`,
    576: `320`,
    577: `321`,
    578: `321`,
    579: `322`,
    58: `21`,
    580: `322`,
    581: `323`,
    582: `324`,
    583: `325`,
    584: `325`,
    585: `326`,
    586: `326`,
    587: `327`,
    588: `327`,
    589: `328`,
    59: `21`,
    590: `329`,
    591: `329`,
    592: `330`,
    593: `330`,
    594: `331`,
    595: `331`,
    596: `331`,
    597: `332`,
    598: `332`,
    599: `333`,
    6: `2`,
    60: `21`,
    600: `333`,
    601: `333`,
    602: `333`,
    603: `333`,
    604: `333`,
    605: `334`,
    606: `334`,
    607: `335`,
    608: `336`,
    609: `337`,
    61: `21`,
    610: `337`,
    611: `338`,
    612: `339`,
    613: `340`,
    614: `340`,
    615: `341`,
    616: `342`,
    617: `343`,
    618: `343`,
    619: `344`,
    62: `21`,
    620: `345`,
    621: `347`,
    622: `347`,
    623: `348`,
    624: `348`,
    625: `348`,
    626: `349`,
    627: `349`,
    628: `350`,
    629: `351`,
    63: `21`,
    630: `352`,
    631: `352`,
    632: `353`,
    633: `354`,
    634: `354`,
    635: `354`,
    636: `355`,
    637: `356`,
    638: `357`,
    639: `357`,
    64: `21`,
    640: `358`,
    641: `358`,
    642: `359`,
    643: `359`,
    644: `360`,
    645: `360`,
    646: `361`,
    647: `361`,
    648: `361`,
    649: `362`,
    65: `21`,
    650: `364`,
    651: `364`,
    652: `365`,
    653: `365`,
    654: `366`,
    655: `366`,
    656: `366`,
    657: `368`,
    658: `368`,
    659: `369`,
    66: `21`,
    660: `369`,
    661: `370`,
    662: `371`,
    663: `372`,
    664: `372`,
    665: `373`,
    666: `374`,
    667: `375`,
    668: `375`,
    669: `376`,
    67: `21`,
    670: `377`,
    671: `377`,
    672: `378`,
    673: `379`,
    674: `379`,
    675: `380`,
    676: `381`,
    677: `382`,
    678: `383`,
    679: `383`,
    68: `21`,
    680: `384`,
    681: `384`,
    682: `384`,
    683: `386`,
    684: `387`,
    685: `387`,
    686: `388`,
    687: `389`,
    688: `391`,
    689: `392`,
    69: `21`,
    690: `392`,
    691: `392`,
    692: `393`,
    693: `393`,
    694: `394`,
    695: `395`,
    696: `395`,
    697: `396`,
    698: `397`,
    699: `397`,
    7: `2`,
    70: `21`,
    700: `398`,
    701: `399`,
    702: `399`,
    703: `400`,
    704: `401`,
    705: `401`,
    706: `402`,
    707: `403`,
    708: `403`,
    709: `403`,
    71: `21`,
    710: `404`,
    711: `404`,
    712: `405`,
    713: `405`,
    714: `405`,
    715: `406`,
    716: `406`,
    717: `407`,
    718: `407`,
    719: `408`,
    72: `21`,
    720: `409`,
    721: `409`,
    722: `410`,
    723: `410`,
    724: `410`,
    725: `410`,
    726: `410`,
    727: `410`,
    728: `411`,
    729: `411`,
    73: `21`,
    730: `412`,
    731: `413`,
    732: `414`,
    733: `416`,
    734: `416`,
    735: `417`,
    736: `417`,
    737: `417`,
    738: `418`,
    739: `418`,
    74: `21`,
    740: `419`,
    741: `419`,
    742: `419`,
    743: `420`,
    744: `420`,
    745: `421`,
    746: `422`,
    747: `422`,
    748: `425`,
    749: `425`,
    75: `21`,
    750: `426`,
    751: `426`,
    752: `427`,
    753: `428`,
    754: `429`,
    755: `430`,
    756: `430`,
    757: `431`,
    758: `432`,
    759: `432`,
    76: `21`,
    760: `433`,
    761: `433`,
    762: `434`,
    763: `434`,
    764: `435`,
    765: `436`,
    766: `437`,
    767: `437`,
    768: `438`,
    769: `438`,
    77: `21`,
    770: `439`,
    771: `440`,
    772: `441`,
    773: `441`,
    774: `442`,
    775: `442`,
    776: `443`,
    777: `444`,
    778: `445`,
    779: `445`,
    78: `21`,
    780: `446`,
    781: `447`,
    782: `450`,
    783: `450`,
    784: `451`,
    785: `451`,
    786: `452`,
    787: `453`,
    788: `456`,
    789: `456`,
    79: `21`,
    790: `457`,
    791: `458`,
    792: `459`,
    793: `460`,
    794: `460`,
    795: `461`,
    796: `461`,
    797: `462`,
    798: `462`,
    799: `463`,
    8: `2`,
    80: `21`,
    800: `464`,
    801: `465`,
    802: `466`,
    803: `467`,
    804: `468`,
    805: `469`,
    806: `469`,
    807: `470`,
    808: `470`,
    809: `471`,
    81: `21`,
    810: `472`,
    811: `472`,
    812: `473`,
    813: `473`,
    814: `474`,
    815: `474`,
    816: `475`,
    817: `475`,
    818: `476`,
    819: `476`,
    82: `21`,
    820: `477`,
    821: `477`,
    822: `478`,
    823: `478`,
    824: `479`,
    825: `479`,
    826: `479`,
    827: `481`,
    828: `481`,
    829: `481`,
    83: `21`,
    830: `482`,
    831: `482`,
    832: `483`,
    833: `483`,
    834: `483`,
    835: `484`,
    836: `484`,
    837: `484`,
    838: `485`,
    839: `485`,
    84: `21`,
    840: `486`,
    841: `486`,
    842: `486`,
    843: `488`,
    844: `488`,
    845: `488`,
    846: `489`,
    847: `489`,
    848: `489`,
    849: `490`,
    85: `21`,
    850: `490`,
    851: `491`,
    852: `491`,
    853: `491`,
    854: `493`,
    855: `493`,
    856: `493`,
    857: `494`,
    858: `494`,
    859: `494`,
    86: `21`,
    860: `495`,
    861: `495`,
    862: `496`,
    863: `496`,
    864: `496`,
    865: `498`,
    866: `498`,
    867: `498`,
    868: `499`,
    869: `499`,
    87: `21`,
    870: `499`,
    871: `500`,
    872: `500`,
    873: `501`,
    874: `501`,
    875: `501`,
    876: `503`,
    877: `504`,
    878: `504`,
    879: `505`,
    88: `21`,
    880: `506`,
    881: `507`,
    882: `507`,
    883: `508`,
    884: `508`,
    885: `509`,
    886: `510`,
    887: `511`,
    888: `512`,
    889: `512`,
    89: `22`,
    890: `513`,
    891: `514`,
    892: `515`,
    893: `516`,
    894: `516`,
    895: `517`,
    896: `518`,
    897: `519`,
    898: `519`,
    899: `519`,
    9: `2`,
    90: `22`,
    900: `520`,
    901: `520`,
    902: `520`,
    903: `521`,
    904: `522`,
    905: `523`,
    906: `524`,
    907: `524`,
    908: `524`,
    909: `526`,
    91: `22`,
    910: `526`,
    911: `526`,
    912: `528`,
    913: `528`,
    914: `528`,
    915: `530`,
    916: `530`,
    917: `531`,
    918: `531`,
    919: `532`,
    92: `23`,
    920: `533`,
    921: `533`,
    922: `534`,
    923: `534`,
    924: `536`,
    925: `536`,
    926: `537`,
    927: `537`,
    928: `537`,
    929: `538`,
    93: `23`,
    930: `538`,
    931: `539`,
    932: `539`,
    933: `539`,
    934: `540`,
    935: `540`,
    936: `541`,
    937: `541`,
    938: `542`,
    939: `542`,
    94: `23`,
    940: `543`,
    941: `544`,
    942: `545`,
    943: `546`,
    944: `547`,
    945: `548`,
    946: `549`,
    947: `549`,
    948: `550`,
    949: `550`,
    95: `23`,
    950: `551`,
    951: `551`,
    952: `552`,
    953: `554`,
    954: `554`,
    955: `556`,
    956: `556`,
    957: `557`,
    958: `557`,
    959: `557`,
    96: `23`,
    960: `558`,
    961: `558`,
    962: `559`,
    963: `559`,
    964: `559`,
    965: `561`,
    966: `562`,
    967: `562`,
    968: `563`,
    969: `563`,
    97: `23`,
    970: `564`,
    971: `564`,
    972: `565`,
    973: `565`,
    974: `565`,
    975: `566`,
    976: `566`,
    977: `566`,
    978: `568`,
    979: `568`,
    98: `23`,
    980: `569`,
    981: `570`,
    982: `571`,
    983: `574`,
    984: `574`,
    985: `575`,
    986: `575`,
    987: `575`,
    988: `576`,
    989: `577`,
    99: `23`,
    990: `578`,
    991: `579`,
    992: `580`,
    993: `583`,
    994: `584`,
    995: `584`,
    996: `585`,
    997: `585`,
    998: `586`,
    999: `586`
    },
  appClear: `CA==`,
  appClearMap: {
    },
  companionInfo: null,
  extraPages: 0,
  stateKeys: 2,
  stateSize: 145,
  unsupported: [],
  version: 13,
  warnings: []
  };
const _ETH = {
  ABI: `[{"inputs":[{"components":[{"internalType":"uint256","name":"elem0","type":"uint256"},{"internalType":"address payable","name":"elem1","type":"address"},{"internalType":"uint256","name":"elem2","type":"uint256"},{"internalType":"address payable","name":"elem3","type":"address"}],"internalType":"struct T9","name":"v1030","type":"tuple"}],"stateMutability":"payable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"msg","type":"uint256"}],"name":"ReachError","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_who","type":"address"},{"components":[{"internalType":"uint256","name":"elem0","type":"uint256"},{"internalType":"address payable","name":"elem1","type":"address"},{"internalType":"uint256","name":"elem2","type":"uint256"},{"internalType":"address payable","name":"elem3","type":"address"}],"indexed":false,"internalType":"struct T9","name":"_a","type":"tuple"}],"name":"_reach_e0","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_who","type":"address"},{"components":[{"internalType":"uint256","name":"elem0","type":"uint256"}],"indexed":false,"internalType":"struct T11","name":"_a","type":"tuple"}],"name":"_reach_e1","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_who","type":"address"},{"components":[{"internalType":"uint256","name":"elem0","type":"uint256"},{"internalType":"bool","name":"elem1","type":"bool"}],"indexed":false,"internalType":"struct T4","name":"_a","type":"tuple"}],"name":"_reach_e4","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_who","type":"address"},{"components":[{"internalType":"uint256","name":"elem0","type":"uint256"},{"components":[{"internalType":"enum _enum_T2","name":"which","type":"uint8"},{"internalType":"bool","name":"_Market_buy0_70","type":"bool"},{"internalType":"bool","name":"_Market_withdraw0_70","type":"bool"}],"internalType":"struct T2","name":"elem1","type":"tuple"}],"indexed":false,"internalType":"struct T3","name":"_a","type":"tuple"}],"name":"_reach_e5","type":"event"},{"anonymous":false,"inputs":[{"components":[{"internalType":"address payable","name":"elem0","type":"address"},{"internalType":"uint256","name":"elem1","type":"uint256"},{"internalType":"address payable","name":"elem2","type":"address"}],"indexed":false,"internalType":"struct T0","name":"v0","type":"tuple"}],"name":"_reach_oe_v397","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"v0","type":"bool"}],"name":"_reach_oe_v437","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"v0","type":"bool"}],"name":"_reach_oe_v499","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"Market_buy","outputs":[{"components":[{"internalType":"address payable","name":"elem0","type":"address"},{"internalType":"uint256","name":"elem1","type":"uint256"},{"internalType":"address payable","name":"elem2","type":"address"}],"internalType":"struct T0","name":"","type":"tuple"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"Market_stop","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"Market_withdraw","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"View_price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"View_token","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_reachCreationTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_reachCurrentState","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_reachCurrentTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"elem0","type":"uint256"}],"internalType":"struct T11","name":"v1033","type":"tuple"}],"name":"_reachp_1","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"elem0","type":"uint256"},{"internalType":"bool","name":"elem1","type":"bool"}],"internalType":"struct T4","name":"v1036","type":"tuple"}],"name":"_reachp_4","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"elem0","type":"uint256"},{"components":[{"internalType":"enum _enum_T2","name":"which","type":"uint8"},{"internalType":"bool","name":"_Market_buy0_70","type":"bool"},{"internalType":"bool","name":"_Market_withdraw0_70","type":"bool"}],"internalType":"struct T2","name":"elem1","type":"tuple"}],"internalType":"struct T3","name":"v1039","type":"tuple"}],"name":"_reachp_5","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}]`,
  Bytecode: `0x6080601f620024a938819003918201601f19168301916001600160401b038311848410176200045f578084926080946040528339810103126200054a57604051608081016001600160401b038111828210176200045f57604052815181526200006b602083016200056b565b91602082019283526200008d606060408301519260408501938452016200056b565b606083019081524360035560405190919060c081016001600160401b038111828210176200045f5760009160a091604052828152620000cb62000580565b602082015282604082015282606082015282608082015201526040516040810181811060018060401b038211176200045f576040526200010a62000580565b815260208101936200011b620005a1565b855260ff6004541662000531577f143bd7eb5dd759258158818958ac9cd9e010274ba04900f209594407b18e6cdd60a060405133815283516020820152600180831b03895116604082015285516060820152600180831b038751166080820152a151801590811562000524575b50156200050b576000815152600060208251015260006040825101525183515234620004f2576040519360a085016001600160401b038111868210176200045f5760405260008552600060208601526000604086015260006060860152620001ef620005a1565b608086015233855260018060a01b03905116602085015251604084015260018060a01b0390511660608301525180516040602082015191015115156040519162000239836200054f565b600083526020830152604082015262000251620005a1565b9160005b60018110620004a25750508152608082015260016000554360015560806040519160018060a01b03815116602084015260018060a01b0360208201511660408401526040810151606084015260018060a01b0360608201511682840152015160a082016000905b60018210620004755760e084528361010081016001600160401b038111828210176200045f5760405280516001600160401b0381116200045f57600254600181811c9116801562000454575b60208210146200043e57601f8111620003d4575b50602091601f82116001146200036a579181926000926200035e575b50508160011b916000199060031b1c1916176002555b604051611e989081620006118239f35b01519050828062000338565b601f19821692600260005260206000209160005b858110620003bb57508360019510620003a1575b505050811b016002556200034e565b015160001960f88460031b161c1916905582808062000392565b919260206001819286850151815501940192016200037e565b60026000527f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace601f830160051c8101916020841062000433575b601f0160051c01905b8181106200042657506200031c565b6000815560010162000417565b90915081906200040e565b634e487b7160e01b600052602260045260246000fd5b90607f169062000308565b634e487b7160e01b600052604160045260246000fd5b602060606001926040865180518352848101518584015201511515604082015201930191019091620002bc565b620004ae8183620005e8565b51620004bb8286620005e8565b52620004c88185620005e8565b506000198114620004dc5760010162000255565b634e487b7160e01b600052601160045260246000fd5b60405163100960cb60e01b8152600d6004820152602490fd5b60405163100960cb60e01b8152600c6004820152602490fd5b9050600154143862000188565b60405163100960cb60e01b8152600b6004820152602490fd5b600080fd5b606081019081106001600160401b038211176200045f57604052565b51906001600160a01b03821682036200054a57565b604051906200058f826200054f565b60006040838281528260208201520152565b6040519060208083016001600160401b038111848210176200045f576040528260005b828110620005d157505050565b8290620005dd62000580565b8184015201620005c4565b906001811015620005fa5760051b0190565b634e487b7160e01b600052603260045260246000fdfe60806040526004361015610018575b361561001657005b005b60003560e01c80631e93b0f1146100f4578063573b8510146100eb57806374c2f3e4146100e257806383230757146100d95780638dca4147146100d0578063a25acb89146100c7578063ab53f2c6146100be578063af6e55f7146100b5578063e3a54103146100ac578063e833c2eb146100a35763f76a4d690361000e5761009e6106b1565b61000e565b5061009e610636565b5061009e6105dc565b5061009e610510565b5061009e61048f565b5061009e6103f0565b5061009e610365565b5061009e610346565b5061009e6102fc565b5061009e610118565b5034610113576000366003190112610113576020600354604051908152f35b600080fd5b506020806003193601126101135761012e610926565b506102e26040916102cf83519161014483610767565b6004358352610157600160005414610f8d565b6101d261017361016561081f565b838082518301019101611d86565b9361018f61018a61018660045460ff1690565b1590565b610fad565b8651338152815160208201527fcf0e8bec53cd91fa87ecf8f6f405ac75914a22acdb92a3553ee5c294fee8159690604090a15180159081156102f0575b50610fcd565b6101dc3415610fed565b6080818401936101fd6101f86101f28751610504565b33611de9565b61100d565b6102193360018060a01b036102128451610504565b161461102d565b610249610241610227610b87565b9661023b6102358551610504565b89610c00565b51610504565b848701610c00565b868101518786015261026a6102616060830151610504565b60608701610c00565b61027f6102778251610504565b838701610c00565b600060a0860152600060c0860152600060e08601524361010086015201516102ca81519260018451019388828201519101511515916102bc6108ca565b958652850152151587840152565b6119b9565b6101208201526000610140820152611620565b5160008152602090f35b0390f35b905060015414386101cc565b5060403660031901126101135761033b610314610926565b6040516103208161078f565b6004358152602435610331816109f1565b6020820152611c16565b602060405160008152f35b5034610113576000366003190112610113576020600154604051908152f35b5060803660031901126101135761037a610926565b604051906103878261078f565b6004358252606036602319011261011357604051916103a5836107aa565b602435926002841015610113576103e49381526044356103c4816109f1565b60208201526064356103d5816109f1565b60408201526020820152610c0f565b60405160008152602090f35b5034610113576000366003190112610113576102ec608061040f610926565b600054600781101561045c576006610427911461106d565b604061044361043461081f565b60208082518301019101611bbb565b0151828201525b01516040519081529081906020820190565b6007610468911461104d565b604061048461047561081f565b60208082518301019101610a78565b01518282015261044a565b5034610113576000806003193601126105015780546104ac61081f565b906040519283918252602090604082840152835191826040850152815b8381106104ea57505060608094508284010152601f80199101168101030190f35b8086018201518782016060015286945081016104c9565b80fd5b6001600160a01b031690565b5034610113576000366003190112610113576102ec61058860a0610532610926565b60005460078110156105a257600661054a91146110ad565b610581610579602061056b61055d61081f565b828082518301019101611bbb565b01516001600160a01b031690565b838301610c00565b0151610504565b6040516001600160a01b0390911681529081906020820190565b60076105ae911461108d565b6105b661081f565b60206105d0600180861b0392828082518301019101610a78565b01511682820152610581565b5060008060031936011261050157604060209161062a6105fa610926565b809284519061060882610767565b8082528551916106178361078f565b8783019180835283525115159052611c16565b01511515604051908152f35b506000366003190112610113576020606061064f610926565b61062a8161065b61097c565b85810190600182515251151560408251015261067561097c565b90600082525186820152610c0f565b81516001600160a01b03908116825260208084015190830152604092830151169181019190915260600190565b506000366003190112610113576106c66108e9565b506102ec60206106d4610926565b610708816106e061097c565b84810190600082515251151585825101526106f961097c565b90600082525185820152610c0f565b015160405191829182610684565b90600182811c92168015610746575b602083101461073057565b634e487b7160e01b600052602260045260246000fd5b91607f1691610725565b50634e487b7160e01b600052604160045260246000fd5b602081019081106001600160401b0382111761078257604052565b61078a610750565b604052565b604081019081106001600160401b0382111761078257604052565b606081019081106001600160401b0382111761078257604052565b60a081019081106001600160401b0382111761078257604052565b61010081019081106001600160401b0382111761078257604052565b601f909101601f19168101906001600160401b0382119082101761078257604052565b604051906000826002549161083383610716565b8083526001938085169081156108a9575060011461085b575b50610859925003836107fc565b565b60026000908152600080516020611e6c83398151915294602093509091905b81831061089157505061085993508201013861084c565b8554888401850152948501948794509183019161087a565b905061085994506020925060ff191682840152151560051b8201013861084c565b60405190606082016001600160401b0381118382101761078257604052565b60405190606082016001600160401b03811183821017610919575b60405260006040838281528260208201520152565b610921610750565b610904565b6040519060c082016001600160401b0381118382101761096f575b604052600060a0838281526109546108e9565b60208201528260408201528260608201528260808201520152565b610977610750565b610941565b604051906109898261078f565b816000815260206109986108e9565b910152565b600211156109a757565b634e487b7160e01b600052602160045260246000fd5b604051906109ca8261078f565b60006020836109d76108e9565b81520152565b51906001600160a01b038216820361011357565b8015150361011357565b9080601f8301121561011357604091825192610a1684610767565b836060938484019381851161011357915b848310610a375750505050505090565b85838303126101135783518691610a4d826107aa565b84518252602091828601518382015286860151610a69816109f1565b87820152815201920191610a27565b610140818303126101135761012090610af260405193610a97856107e0565b610aa0836109dd565b8552610aae602084016109dd565b602086015260408301516040860152610ac9606084016109dd565b6060860152610ada608084016109dd565b608086015260a083015160a086015260c083016109fb565b60c0840152015160e082015290565b90929160209060a083019460018060a01b031683528051828401520151805160028110156109a7576080916040918285015260208101511515606085015201511515910152565b5160028110156109a75790565b60405190610b6282610767565b8160005b60208110610b72575050565b602090610b7d6108e9565b8184015201610b66565b6040519061016082016001600160401b03811183821017610bf3575b604052816101406000918281528260208201528260408201528260608201528260808201528260a08201528260c08201528260e082015282610100820152610be9610b55565b6101208201520152565b610bfb610750565b610ba3565b6001600160a01b039091169052565b90610c186109bd565b90610c276007600054146110cd565b610c2f61081f565b92610c44602094858082518301019101610a78565b90610c5c610c5761018660045460ff1690565b6110ed565b846040917fa8cc1e0e7313e31b67ffc8662535f499310f0a2b7d7f2ae89cbe01a18167f1fa835180610c8f843383610b01565b0390a1610ca781518015908115610f48575b5061110d565b01610cb28151610b48565b610cbb8161099d565b610dd757509081610d676108599660e094840195610cdb8751341461116d565b610ce6338951610c00565b865182895101528180860198610d08610cff8b51610504565b87835101610c00565b7fe6add98fdada2fa814f0f54f9b66378a4ca8d2c49e372c043388d9bcbe36aff4610d398251885191829182610684565b0390a151910152610d5f610d4b610b87565b9761023b610d598751610504565b8a610c00565b908701610c00565b835190850152610d86610d7d6060830151610504565b60608601610c00565b610d933360808601610c00565b610da3835160a083015190610f6b565b60a0850152600160c08501526000828501524361010085015260c08101516101208501520151905101610140820152611620565b610de660019196959651610b48565b610def8161099d565b14610dfc575b5050505050565b610e9560e0936060610e8e610f3e98610e15341561112d565b610e3489610e2b610e268a51610504565b610504565b33149201918252565b610e46610e418251151590565b61114d565b7fa7a2b88aa4a1974f696db5c1033c239c64082547e7434db6152a663c4411243b610e85610e748351151590565b885190151581529081906020820190565b0390a151151590565b1515910152565b610ec8610ea0610b87565b94610eb4610eae8551610504565b87610c00565b610ec081850151610504565b908601610c00565b8082015190840152610ee9610ee06060830151610504565b60608501610c00565b610f02610ef96080830151610504565b60808501610c00565b60a081015160a0840152600060c0840152610f1f82840160019052565b4361010084015260c08101516101208401520151610140820152611620565b3880808080610df5565b90506001541438610ca1565b50634e487b7160e01b600052601160045260246000fd5b9190820191828111610f80575b821061011357565b610f88610f54565b610f78565b15610f9457565b60405163100960cb60e01b8152600e6004820152602490fd5b15610fb457565b60405163100960cb60e01b8152600f6004820152602490fd5b15610fd457565b60405163100960cb60e01b815260106004820152602490fd5b15610ff457565b60405163100960cb60e01b815260116004820152602490fd5b1561101457565b60405163100960cb60e01b815260126004820152602490fd5b1561103457565b60405163100960cb60e01b815260136004820152602490fd5b1561105457565b60405163100960cb60e01b815260086004820152602490fd5b1561107457565b60405163100960cb60e01b815260076004820152602490fd5b1561109457565b60405163100960cb60e01b8152600a6004820152602490fd5b156110b457565b60405163100960cb60e01b815260096004820152602490fd5b156110d457565b60405163100960cb60e01b815260196004820152602490fd5b156110f457565b60405163100960cb60e01b8152601a6004820152602490fd5b1561111457565b60405163100960cb60e01b8152601b6004820152602490fd5b1561113457565b60405163100960cb60e01b8152601d6004820152602490fd5b1561115457565b60405163100960cb60e01b8152601e6004820152602490fd5b1561117457565b60405163100960cb60e01b8152601c6004820152602490fd5b1561119457565b60405163100960cb60e01b8152601f6004820152602490fd5b156111b457565b60405163100960cb60e01b815260206004820152602490fd5b156111d457565b60405163100960cb60e01b815260216004820152602490fd5b156111f457565b60405163100960cb60e01b815260226004820152602490fd5b1561121457565b60405163100960cb60e01b815260146004820152602490fd5b1561123457565b60405163100960cb60e01b815260156004820152602490fd5b1561125457565b60405163100960cb60e01b815260166004820152602490fd5b1561127457565b60405163100960cb60e01b815260176004820152602490fd5b1561129457565b60405163100960cb60e01b815260186004820152602490fd5b604051906112ba8261078f565b81600081526020610998610b55565b506040513d6000823e3d90fd5b9060018110156112e75760051b0190565b634e487b7160e01b600052603260045260246000fd5b6040519060e082016001600160401b0381118382101761134d575b6040528160c0600091828152826020820152826040820152826060820152826080820152611344610b55565b60a08201520152565b611355610750565b611318565b818110611365575050565b6000815560010161135a565b61137c600254610716565b806113845750565b601f811160011461139757506000600255565b60026000526113dc90601f0160051c600080516020611e6c833981519152017f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5acf61135a565b6000602081208160025555565b6040519061010082016001600160401b03811183821017611440575b6040528160e06000918281528260208201528260408201528260608201528260808201528260a0820152611437610b55565b60c08201520152565b611448610750565b611405565b6000915b6001831061145e57505050565b600190606083519182518152602092838101518483015260408091015115159082015201920192019190611451565b91909161012060e061014083019460018060a01b0380825116855280602083015116602086015260408201516040860152806060830151166060860152608082015116608085015260a081015160a08501526114f160c082015160c086019061144d565b0151910152565b90601f8211611505575050565b6108599160026000526020600020906020601f840160051c83019310611533575b601f0160051c019061135a565b9091508190611526565b80519091906001600160401b038111611613575b61156581611560600254610716565b6114f8565b602080601f83116001146115a15750819293600092611596575b50508160011b916000199060031b1c191617600255565b01519050388061157f565b6002600052601f19831694909190600080516020611e6c833981519152926000905b8782106115fb5750508360019596106115e2575b505050811b01600255565b015160001960f88460031b161c191690553880806115d7565b806001859682949686015181550195019301906115c3565b61161b610750565b611551565b6116286112ad565b60e08201906116378251151590565b6000901561184c575060005b156117075750506116f46117026108599261014061165f6113e9565b9161167361166d8251610504565b84610c00565b61168c6116836020830151610504565b60208501610c00565b604081015160408401526116a6610ee06060830151610504565b6116b6610ef96080830151610504565b60a081015160a084015261012081015160c0840152015160e08201526116dc6007600055565b6116e543600155565b6040519283916020830161148d565b03601f1981018352826107fc565b61153d565b600080808061014087015160a088019081519003865261172d610e2660608a0151610504565b905190828215611843575bf115611836575b61178061012084015180519061177b600019835101926040602082015191015115159061176a6108ca565b948552602085015215156040840152565b611a16565b602082019081526117b860208501936117b261179c8651610504565b6117ac610e2660808a0151610504565b90611862565b51151590565b156117d75750505050600080556117cf6000600155565b610859611371565b610100610859946117e984511561118d565b6117f683515151156111ad565b61180d6118046102276112fd565b60208701610c00565b6040810151604086015260006060860152015160808401525160a08301525160c0820152611b03565b61183e6112c9565b61173f565b506108fc611738565b60c0840151151560000361164357506001611643565b60405163a9059cbb60e01b602082019081526001600160a01b039384166024830152600160448084019190915282526118e09360009384939092918491608081016001600160401b038111828210176118e7575b6040525193165af16118d06118c96118f4565b8092611959565b5060208082518301019101611941565b1561011357565b6118ef610750565b6118b6565b3d1561193c573d906001600160401b03821161192f575b60405191611923601f8201601f1916602001846107fc565b82523d6000602084013e565b611937610750565b61190b565b606090565b908160209103126101135751611956816109f1565b90565b156119615790565b80511561197057805190602001fd5b60405163100960cb60e01b815260026004820152602490fd5b156119915790565b8051156119a057805190602001fd5b60405163100960cb60e01b815260016004820152602490fd5b91906119c3610b55565b9260005b600181106119d55750508252565b806119e2600192846112d6565b516119ed82886112d6565b526119f881876112d6565b506000198114611a09575b016119c7565b611a11610f54565b611a03565b9190611a20610b55565b9260005b60018110611a325750508252565b80611a3f600192846112d6565b51611a4a82886112d6565b52611a5581876112d6565b506000198114611a66575b01611a24565b611a6e610f54565b611a60565b6040519060a082016001600160401b03811183821017611ab6575b6040526000608083828152826020820152826040820152611aad610b55565b60608201520152565b611abe610750565b611a8e565b91909160c0608060e083019460018060a01b038082511685526020820151166020850152604081015160408501526114f16060820151606086019061144d565b606081015115611b395760a081611b2160c0611b2b940151156111cd565b01515151156111ed565b600080556117cf6000600155565b6116f46117026108599260c0611b4d611a73565b91611b5b61166d8251610504565b611b6b6116836020830151610504565b6040810151604084015260a0810151606084015201516080820152611b906006600055565b611b9943600155565b60405192839160208301611ac3565b60405190611bb582610767565b60008252565b60e0818303126101135760c090611c0760405193611bd8856107c5565b611be1836109dd565b8552611bef602084016109dd565b602086015260408301516040860152606083016109fb565b60608401520151608082015290565b611d20610859926040610e8e611c2a611ba8565b611c3860066000541461120d565b611caf611c4661043461081f565b96611c5e611c5961018660045460ff1690565b61122d565b84513381528151602080830191909152820151151560408201527faa99e317c364fb804a6b7e67b51beee98735c62eb3df9d8182015e63bb19072290606090a1518015908115611d7a575b5061124d565b611cb9341561126d565b611ccf611cc9610e268851610504565b33148252565b611ce1611cdc8251151590565b61128d565b7f6e89973915d75da35bab0934082e72f2cdcfe270029c426726f5eb57330612a1610e85611d0f8351151590565b855190151581529081906020820190565b6080611d2a6112fd565b91611d3861166d8251610504565b611d486116836020830151610504565b60408101516040840152611d5f6060840160019052565b4382840152606081015160a0840152015160c0820152611b03565b90506001541438611ca9565b9060e08282031261011357611de190608060405193611da4856107c5565b611dad816109dd565b8552611dbb602082016109dd565b602086015260408101516040860152611dd6606082016109dd565b6060860152016109fb565b608082015290565b6040516323b872dd60e01b602082019081526001600160a01b0392831660248301523060448301526001606480840191909152825261195693600093849391929184919060a081016001600160401b03811182821017611e5e575b6040525193165af16118d0611e576118f4565b8092611989565b611e66610750565b611e4456fe405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5acea164736f6c6343000811000a`,
  BytecodeLen: 9385,
  version: 9,
  views: {
    }
  };
export const _stateSourceMap = {
  1: {
    at: './nft-contract/index.rsh:34:5:after expr stmt',
    fs: [],
    msg: null,
    who: 'Module'
    },
  3: {
    at: './nft-contract/index.rsh:79:9:after expr stmt',
    fs: [],
    msg: null,
    who: 'Module'
    },
  5: {
    at: './nft-contract/index.rsh:115:5:after expr stmt',
    fs: [],
    msg: null,
    who: 'Module'
    },
  6: {
    at: './nft-contract/index.rsh:88:37:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    },
  7: {
    at: './nft-contract/index.rsh:42:58:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    }
  };
export const _Connectors = {
  ALGO: _ALGO,
  ETH: _ETH
  };
export const _Participants = {
  "Admin": Admin,
  "Market_buy": Market_buy,
  "Market_stop": Market_stop,
  "Market_withdraw": Market_withdraw
  };
export const _APIs = {
  Market: {
    buy: Market_buy,
    stop: Market_stop,
    withdraw: Market_withdraw
    }
  };
