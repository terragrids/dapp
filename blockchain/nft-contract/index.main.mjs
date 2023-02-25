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
      const [v248, v249, v250, v251, v256] = svs;
      stdlib.assert(false, 'illegal view')
      }
    if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'))) {
      const [v248, v249, v250, v251, v275, v276, v285, v286] = svs;
      return (await ((async () => {
        
        
        return v250;}))(...args));
      }
    
    stdlib.assert(false, 'illegal view')
    };
  const View_token = async (i, svs, args) => {
    if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '1'))) {
      const [v248, v249, v250, v251, v256] = svs;
      stdlib.assert(false, 'illegal view')
      }
    if (stdlib.eq(i, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'))) {
      const [v248, v249, v250, v251, v275, v276, v285, v286] = svs;
      return (await ((async () => {
        
        
        return v249;}))(...args));
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
      4: [ctc0, ctc1, ctc2, ctc0, ctc0, ctc2, ctc5, ctc2]
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
    Market_stop0_70: ctc4
    });
  const ctc6 = stdlib.T_Tuple([ctc2, ctc0, ctc1]);
  const ctc7 = stdlib.T_Bool;
  const ctc8 = stdlib.T_Tuple([ctc0, ctc0, ctc7]);
  const ctc9 = stdlib.T_Array(ctc8, stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '1'));
  
  
  const v238 = [stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'), stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'), false];
  const v239 = [v238];
  const v243 = stdlib.protect(ctc0, interact.price, 'for Admin\'s interact field price');
  const v244 = stdlib.protect(ctc1, interact.token, 'for Admin\'s interact field token');
  const v245 = stdlib.protect(ctc2, interact.wallet, 'for Admin\'s interact field wallet');
  
  const txn1 = await (ctc.sendrecv({
    args: [v244, v243, v245],
    evt_cnt: 3,
    funcNum: 0,
    lct: stdlib.checkedBigNumberify('./nft-contract/index.rsh:32:7:dot', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc1, ctc0, ctc2],
    pay: [stdlib.checkedBigNumberify('./nft-contract/index.rsh:32:7:decimal', stdlib.UInt_max, '0'), []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [v249, v250, v251], secs: v253, time: v252, didSend: v31, from: v248 } = txn1;
      
      const v254 = v239[stdlib.checkedBigNumberify('./nft-contract/index.rsh:32:7:dot', stdlib.UInt_max, '0')];
      const v255 = stdlib.Array_set(v254, '0', stdlib.checkedBigNumberify('./nft-contract/index.rsh:32:7:dot', stdlib.UInt_max, '0'));
      const v256 = stdlib.Array_set(v239, stdlib.checkedBigNumberify('./nft-contract/index.rsh:32:7:dot', stdlib.UInt_max, '0'), v255);
      sim_r.txns.push({
        amt: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
        kind: 'init',
        tok: v249
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
  const {data: [v249, v250, v251], secs: v253, time: v252, didSend: v31, from: v248 } = txn1;
  const v254 = v239[stdlib.checkedBigNumberify('./nft-contract/index.rsh:32:7:dot', stdlib.UInt_max, '0')];
  const v255 = stdlib.Array_set(v254, '0', stdlib.checkedBigNumberify('./nft-contract/index.rsh:32:7:dot', stdlib.UInt_max, '0'));
  const v256 = stdlib.Array_set(v239, stdlib.checkedBigNumberify('./nft-contract/index.rsh:32:7:dot', stdlib.UInt_max, '0'), v255);
  ;
  ;
  const txn2 = await (ctc.sendrecv({
    args: [v248, v249, v250, v251, v256],
    evt_cnt: 0,
    funcNum: 1,
    lct: v252,
    onlyIf: true,
    out_tys: [],
    pay: [stdlib.checkedBigNumberify('./nft-contract/index.rsh:35:7:dot', stdlib.UInt_max, '0'), [[stdlib.checkedBigNumberify('./nft-contract/index.rsh:35:13:decimal', stdlib.UInt_max, '1'), v249]]],
    sim_p: (async (txn2) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [], secs: v260, time: v259, didSend: v38, from: v258 } = txn2;
      
      ;
      const v261 = v256[stdlib.checkedBigNumberify('./nft-contract/index.rsh:35:7:dot', stdlib.UInt_max, '0')];
      const v262 = v261[stdlib.checkedBigNumberify('./nft-contract/index.rsh:35:7:dot', stdlib.UInt_max, '0')];
      const v263 = stdlib.add(v262, stdlib.checkedBigNumberify('./nft-contract/index.rsh:35:13:decimal', stdlib.UInt_max, '1'));
      const v265 = stdlib.Array_set(v261, '0', v263);
      const v266 = stdlib.Array_set(v256, stdlib.checkedBigNumberify('./nft-contract/index.rsh:35:7:dot', stdlib.UInt_max, '0'), v265);
      sim_r.txns.push({
        amt: stdlib.checkedBigNumberify('./nft-contract/index.rsh:35:13:decimal', stdlib.UInt_max, '1'),
        kind: 'to',
        tok: v249
        });
      const v271 = await ctc.getContractInfo();
      
      
      const v275 = v248;
      const v276 = stdlib.checkedBigNumberify('./nft-contract/index.rsh:41:77:decimal', stdlib.UInt_max, '0');
      const v277 = false;
      const v278 = false;
      const v279 = v259;
      const v285 = v266;
      const v286 = stdlib.checkedBigNumberify('./nft-contract/index.rsh:27:5:after expr stmt', stdlib.UInt_max, '0');
      
      if (await (async () => {
        const v294 = v277 ? false : true;
        const v295 = v278 ? false : v294;
        
        return v295;})()) {
        sim_r.isHalt = false;
        }
      else {
        sim_r.txns.push({
          kind: 'from',
          to: v251,
          tok: undefined /* Nothing */
          });
        sim_r.txns.push({
          kind: 'from',
          to: v275,
          tok: v249
          });
        
        if (v278) {
          
          }
        else {
          
          }
        
        sim_r.txns.push({
          kind: 'halt',
          tok: v249
          })
        sim_r.txns.push({
          kind: 'halt',
          tok: undefined /* Nothing */
          })
        sim_r.isHalt = true;
        }
      return sim_r;
      }),
    soloSend: true,
    timeoutAt: undefined /* mto */,
    tys: [ctc2, ctc1, ctc0, ctc2, ctc9],
    waitIfNotPresent: false
    }));
  const {data: [], secs: v260, time: v259, didSend: v38, from: v258 } = txn2;
  ;
  const v261 = v256[stdlib.checkedBigNumberify('./nft-contract/index.rsh:35:7:dot', stdlib.UInt_max, '0')];
  const v262 = v261[stdlib.checkedBigNumberify('./nft-contract/index.rsh:35:7:dot', stdlib.UInt_max, '0')];
  const v263 = stdlib.add(v262, stdlib.checkedBigNumberify('./nft-contract/index.rsh:35:13:decimal', stdlib.UInt_max, '1'));
  const v265 = stdlib.Array_set(v261, '0', v263);
  const v266 = stdlib.Array_set(v256, stdlib.checkedBigNumberify('./nft-contract/index.rsh:35:7:dot', stdlib.UInt_max, '0'), v265);
  ;
  const v267 = stdlib.addressEq(v248, v258);
  stdlib.assert(v267, {
    at: './nft-contract/index.rsh:35:7:dot',
    fs: [],
    msg: 'sender correct',
    who: 'Admin'
    });
  const v271 = await ctc.getContractInfo();
  stdlib.protect(ctc3, await interact.onReady(v271), {
    at: './nft-contract/index.rsh:38:23:application',
    fs: ['at ./nft-contract/index.rsh:38:23:application call to [unknown function] (defined at: ./nft-contract/index.rsh:38:23:function exp)', 'at ./nft-contract/index.rsh:38:23:application call to "liftedInteract" (defined at: ./nft-contract/index.rsh:38:23:application)'],
    msg: 'onReady',
    who: 'Admin'
    });
  
  const v274 = 'The token is on the market';
  stdlib.protect(ctc3, await interact.log(v274), {
    at: './nft-contract/index.rsh:39:19:application',
    fs: ['at ./nft-contract/index.rsh:39:19:application call to [unknown function] (defined at: ./nft-contract/index.rsh:39:19:function exp)', 'at ./nft-contract/index.rsh:39:19:application call to "liftedInteract" (defined at: ./nft-contract/index.rsh:39:19:application)'],
    msg: 'log',
    who: 'Admin'
    });
  
  let v275 = v248;
  let v276 = stdlib.checkedBigNumberify('./nft-contract/index.rsh:41:77:decimal', stdlib.UInt_max, '0');
  let v277 = false;
  let v278 = false;
  let v279 = v259;
  let v285 = v266;
  let v286 = stdlib.checkedBigNumberify('./nft-contract/index.rsh:27:5:after expr stmt', stdlib.UInt_max, '0');
  
  let txn3 = txn2;
  while (await (async () => {
    const v294 = v277 ? false : true;
    const v295 = v278 ? false : v294;
    
    return v295;})()) {
    const txn4 = await (ctc.recv({
      didSend: false,
      evt_cnt: 1,
      funcNum: 3,
      out_tys: [ctc5],
      timeoutAt: undefined /* mto */,
      waitIfNotPresent: false
      }));
    const {data: [v316], secs: v318, time: v317, didSend: v149, from: v315 } = txn4;
    switch (v316[0]) {
      case 'Market_buy0_70': {
        const v319 = v316[1];
        undefined /* setApiDetails */;
        const v326 = stdlib.add(v286, v250);
        ;
        const v328 = [v315, v250, v249];
        await txn4.getOutput('Market_buy', 'v328', ctc6, v328);
        const v337 = stdlib.safeAdd(v250, v276);
        const cv275 = v315;
        const cv276 = v337;
        const cv277 = true;
        const cv278 = false;
        const cv279 = v317;
        const cv285 = v285;
        const cv286 = v326;
        
        v275 = cv275;
        v276 = cv276;
        v277 = cv277;
        v278 = cv278;
        v279 = cv279;
        v285 = cv285;
        v286 = cv286;
        
        txn3 = txn4;
        continue;
        break;
        }
      case 'Market_stop0_70': {
        const v347 = v316[1];
        undefined /* setApiDetails */;
        ;
        const v368 = stdlib.addressEq(v315, v248);
        stdlib.assert(v368, {
          at: './nft-contract/index.rsh:64:24:application',
          fs: ['at ./nft-contract/index.rsh:62:15:application call to [unknown function] (defined at: ./nft-contract/index.rsh:62:15:function exp)'],
          msg: null,
          who: 'Admin'
          });
        await txn4.getOutput('Market_stop', 'v368', ctc7, v368);
        const cv275 = v275;
        const cv276 = v276;
        const cv277 = false;
        const cv278 = true;
        const cv279 = v317;
        const cv285 = v285;
        const cv286 = v286;
        
        v275 = cv275;
        v276 = cv276;
        v277 = cv277;
        v278 = cv278;
        v279 = cv279;
        v285 = cv285;
        v286 = cv286;
        
        txn3 = txn4;
        continue;
        break;
        }
      }
    
    }
  const v378 = stdlib.sub(v286, v276);
  ;
  const v379 = v285[stdlib.checkedBigNumberify('./nft-contract/index.rsh:72:26:application', stdlib.UInt_max, '0')];
  const v380 = v379[stdlib.checkedBigNumberify('./nft-contract/index.rsh:72:26:application', stdlib.UInt_max, '0')];
  const v384 = stdlib.sub(v380, stdlib.checkedBigNumberify('./nft-contract/index.rsh:72:14:decimal', stdlib.UInt_max, '1'));
  const v386 = stdlib.Array_set(v379, '0', v384);
  const v387 = stdlib.Array_set(v285, stdlib.checkedBigNumberify('./nft-contract/index.rsh:72:26:application', stdlib.UInt_max, '0'), v386);
  ;
  stdlib.protect(ctc3, await interact.onSoldOrWithdrawn(), {
    at: './nft-contract/index.rsh:74:33:application',
    fs: ['at ./nft-contract/index.rsh:74:33:application call to [unknown function] (defined at: ./nft-contract/index.rsh:74:33:function exp)', 'at ./nft-contract/index.rsh:74:33:application call to "liftedInteract" (defined at: ./nft-contract/index.rsh:74:33:application)'],
    msg: 'onSoldOrWithdrawn',
    who: 'Admin'
    });
  
  if (v278) {
    const v390 = 'The token has been withdrawn';
    stdlib.protect(ctc3, await interact.log(v390), {
      at: './nft-contract/index.rsh:77:23:application',
      fs: ['at ./nft-contract/index.rsh:77:23:application call to [unknown function] (defined at: ./nft-contract/index.rsh:77:23:function exp)', 'at ./nft-contract/index.rsh:77:23:application call to "liftedInteract" (defined at: ./nft-contract/index.rsh:77:23:application)'],
      msg: 'log',
      who: 'Admin'
      });
    
    }
  else {
    const v392 = 'The token has been sold';
    stdlib.protect(ctc3, await interact.log(v392), {
      at: './nft-contract/index.rsh:79:23:application',
      fs: ['at ./nft-contract/index.rsh:79:23:application call to [unknown function] (defined at: ./nft-contract/index.rsh:79:23:function exp)', 'at ./nft-contract/index.rsh:79:23:application call to "liftedInteract" (defined at: ./nft-contract/index.rsh:79:23:application)'],
      msg: 'log',
      who: 'Admin'
      });
    
    }
  const v394 = 'The market is closing down....';
  stdlib.protect(ctc3, await interact.log(v394), {
    at: './nft-contract/index.rsh:82:19:application',
    fs: ['at ./nft-contract/index.rsh:82:19:application call to [unknown function] (defined at: ./nft-contract/index.rsh:82:19:function exp)', 'at ./nft-contract/index.rsh:82:19:application call to "liftedInteract" (defined at: ./nft-contract/index.rsh:82:19:application)'],
    msg: 'log',
    who: 'Admin'
    });
  
  const v396 = stdlib.eq(v378, stdlib.checkedBigNumberify('./nft-contract/index.rsh:84:26:decimal', stdlib.UInt_max, '0'));
  stdlib.assert(v396, {
    at: './nft-contract/index.rsh:84:12:application',
    fs: [],
    msg: null,
    who: 'Admin'
    });
  const v397 = v387[stdlib.checkedBigNumberify('./nft-contract/index.rsh:85:20:application', stdlib.UInt_max, '0')];
  const v398 = v397[stdlib.checkedBigNumberify('./nft-contract/index.rsh:85:20:application', stdlib.UInt_max, '0')];
  const v399 = stdlib.eq(v398, stdlib.checkedBigNumberify('./nft-contract/index.rsh:85:31:decimal', stdlib.UInt_max, '0'));
  stdlib.assert(v399, {
    at: './nft-contract/index.rsh:85:12:application',
    fs: [],
    msg: null,
    who: 'Admin'
    });
  return;
  
  
  
  
  };
export async function _Market_buy4(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for _Market_buy4 expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for _Market_buy4 expects to receive an interact object as its second argument.`));}
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
    Market_stop0_70: ctc6
    });
  const ctc8 = stdlib.T_Tuple([ctc0, ctc2, ctc1]);
  const ctc9 = stdlib.T_Null;
  
  
  const [v248, v249, v250, v251, v275, v276, v285, v286] = await ctc.getState(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'), [ctc0, ctc1, ctc2, ctc0, ctc0, ctc2, ctc5, ctc2]);
  const v298 = stdlib.protect(ctc6, await interact.in(), {
    at: './nft-contract/index.rsh:1:23:application',
    fs: ['at ./nft-contract/index.rsh:48:13:application call to [unknown function] (defined at: ./nft-contract/index.rsh:48:13:function exp)', 'at ./nft-contract/index.rsh:41:58:application call to "runMarket_buy0_70" (defined at: ./nft-contract/index.rsh:48:13:function exp)', 'at ./nft-contract/index.rsh:41:58:application call to [unknown function] (defined at: ./nft-contract/index.rsh:41:58:function exp)'],
    msg: 'in',
    who: 'Market_buy'
    });
  const v302 = ['Market_buy0_70', v298];
  
  const txn1 = await (ctc.sendrecv({
    args: [v248, v249, v250, v251, v275, v276, v285, v286, v302],
    evt_cnt: 1,
    funcNum: 3,
    lct: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc7],
    pay: [v250, []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [v316], secs: v318, time: v317, didSend: v149, from: v315 } = txn1;
      
      switch (v316[0]) {
        case 'Market_buy0_70': {
          const v319 = v316[1];
          sim_r.txns.push({
            kind: 'api',
            who: "Market_buy"
            });
          sim_r.txns.push({
            amt: v250,
            kind: 'to',
            tok: undefined /* Nothing */
            });
          const v328 = [v315, v250, v249];
          const v329 = await txn1.getOutput('Market_buy', 'v328', ctc8, v328);
          
          const v337 = stdlib.safeAdd(v250, v276);
          sim_r.txns.push({
            kind: 'from',
            to: v251,
            tok: undefined /* Nothing */
            });
          sim_r.txns.push({
            kind: 'from',
            to: v315,
            tok: v249
            });
          sim_r.txns.push({
            kind: 'halt',
            tok: v249
            })
          sim_r.txns.push({
            kind: 'halt',
            tok: undefined /* Nothing */
            })
          sim_r.isHalt = true;
          
          break;
          }
        case 'Market_stop0_70': {
          const v347 = v316[1];
          
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
  const {data: [v316], secs: v318, time: v317, didSend: v149, from: v315 } = txn1;
  switch (v316[0]) {
    case 'Market_buy0_70': {
      const v319 = v316[1];
      undefined /* setApiDetails */;
      const v326 = stdlib.add(v286, v250);
      ;
      const v328 = [v315, v250, v249];
      const v329 = await txn1.getOutput('Market_buy', 'v328', ctc8, v328);
      if (v149) {
        stdlib.protect(ctc9, await interact.out(v319, v329), {
          at: './nft-contract/index.rsh:49:13:application',
          fs: ['at ./nft-contract/index.rsh:49:13:application call to [unknown function] (defined at: ./nft-contract/index.rsh:49:13:function exp)', 'at ./nft-contract/index.rsh:52:18:application call to "k" (defined at: ./nft-contract/index.rsh:51:15:function exp)', 'at ./nft-contract/index.rsh:51:15:application call to [unknown function] (defined at: ./nft-contract/index.rsh:51:15:function exp)'],
          msg: 'out',
          who: 'Market_buy'
          });
        }
      else {
        }
      
      const v337 = stdlib.safeAdd(v250, v276);
      const v628 = stdlib.sub(v326, v337);
      ;
      const v629 = v285[stdlib.checkedBigNumberify('./nft-contract/index.rsh:72:26:application', stdlib.UInt_max, '0')];
      const v630 = v629[stdlib.checkedBigNumberify('./nft-contract/index.rsh:72:26:application', stdlib.UInt_max, '0')];
      const v631 = stdlib.sub(v630, stdlib.checkedBigNumberify('./nft-contract/index.rsh:72:14:decimal', stdlib.UInt_max, '1'));
      const v632 = stdlib.Array_set(v629, '0', v631);
      const v633 = stdlib.Array_set(v285, stdlib.checkedBigNumberify('./nft-contract/index.rsh:72:26:application', stdlib.UInt_max, '0'), v632);
      ;
      const v634 = stdlib.eq(v628, stdlib.checkedBigNumberify('./nft-contract/index.rsh:84:26:decimal', stdlib.UInt_max, '0'));
      stdlib.assert(v634, {
        at: './nft-contract/index.rsh:84:12:application',
        fs: [],
        msg: null,
        who: 'Market_buy'
        });
      const v635 = v633[stdlib.checkedBigNumberify('./nft-contract/index.rsh:85:20:application', stdlib.UInt_max, '0')];
      const v636 = v635[stdlib.checkedBigNumberify('./nft-contract/index.rsh:85:20:application', stdlib.UInt_max, '0')];
      const v637 = stdlib.eq(v636, stdlib.checkedBigNumberify('./nft-contract/index.rsh:85:31:decimal', stdlib.UInt_max, '0'));
      stdlib.assert(v637, {
        at: './nft-contract/index.rsh:85:12:application',
        fs: [],
        msg: null,
        who: 'Market_buy'
        });
      return;
      
      break;
      }
    case 'Market_stop0_70': {
      const v347 = v316[1];
      return;
      break;
      }
    }
  
  
  };
export async function _Market_stop4(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for _Market_stop4 expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for _Market_stop4 expects to receive an interact object as its second argument.`));}
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
    Market_stop0_70: ctc6
    });
  const ctc8 = stdlib.T_Null;
  
  
  const [v248, v249, v250, v251, v275, v276, v285, v286] = await ctc.getState(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4'), [ctc0, ctc1, ctc2, ctc0, ctc0, ctc2, ctc5, ctc2]);
  const v304 = ctc.selfAddress();
  const v306 = stdlib.protect(ctc6, await interact.in(), {
    at: './nft-contract/index.rsh:1:23:application',
    fs: ['at ./nft-contract/index.rsh:58:16:application call to [unknown function] (defined at: ./nft-contract/index.rsh:58:16:function exp)', 'at ./nft-contract/index.rsh:41:58:application call to "runMarket_stop0_70" (defined at: ./nft-contract/index.rsh:56:13:function exp)', 'at ./nft-contract/index.rsh:41:58:application call to [unknown function] (defined at: ./nft-contract/index.rsh:41:58:function exp)'],
    msg: 'in',
    who: 'Market_stop'
    });
  const v308 = stdlib.addressEq(v304, v248);
  stdlib.assert(v308, {
    at: './nft-contract/index.rsh:59:23:application',
    fs: ['at ./nft-contract/index.rsh:58:16:application call to [unknown function] (defined at: ./nft-contract/index.rsh:58:16:function exp)', 'at ./nft-contract/index.rsh:58:16:application call to [unknown function] (defined at: ./nft-contract/index.rsh:58:16:function exp)', 'at ./nft-contract/index.rsh:41:58:application call to "runMarket_stop0_70" (defined at: ./nft-contract/index.rsh:56:13:function exp)', 'at ./nft-contract/index.rsh:41:58:application call to [unknown function] (defined at: ./nft-contract/index.rsh:41:58:function exp)'],
    msg: null,
    who: 'Market_stop'
    });
  const v311 = ['Market_stop0_70', v306];
  
  const txn1 = await (ctc.sendrecv({
    args: [v248, v249, v250, v251, v275, v276, v285, v286, v311],
    evt_cnt: 1,
    funcNum: 3,
    lct: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc7],
    pay: [stdlib.checkedBigNumberify('./nft-contract/index.rsh:61:19:decimal', stdlib.UInt_max, '0'), []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [v316], secs: v318, time: v317, didSend: v149, from: v315 } = txn1;
      
      switch (v316[0]) {
        case 'Market_buy0_70': {
          const v319 = v316[1];
          
          break;
          }
        case 'Market_stop0_70': {
          const v347 = v316[1];
          sim_r.txns.push({
            kind: 'api',
            who: "Market_stop"
            });
          ;
          const v368 = stdlib.addressEq(v315, v248);
          const v369 = await txn1.getOutput('Market_stop', 'v368', ctc3, v368);
          
          sim_r.txns.push({
            kind: 'from',
            to: v251,
            tok: undefined /* Nothing */
            });
          sim_r.txns.push({
            kind: 'from',
            to: v275,
            tok: v249
            });
          sim_r.txns.push({
            kind: 'halt',
            tok: v249
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
  const {data: [v316], secs: v318, time: v317, didSend: v149, from: v315 } = txn1;
  switch (v316[0]) {
    case 'Market_buy0_70': {
      const v319 = v316[1];
      return;
      break;
      }
    case 'Market_stop0_70': {
      const v347 = v316[1];
      undefined /* setApiDetails */;
      ;
      const v368 = stdlib.addressEq(v315, v248);
      stdlib.assert(v368, {
        at: './nft-contract/index.rsh:64:24:application',
        fs: ['at ./nft-contract/index.rsh:62:15:application call to [unknown function] (defined at: ./nft-contract/index.rsh:62:15:function exp)'],
        msg: null,
        who: 'Market_stop'
        });
      const v369 = await txn1.getOutput('Market_stop', 'v368', ctc3, v368);
      if (v149) {
        stdlib.protect(ctc8, await interact.out(v347, v369), {
          at: './nft-contract/index.rsh:57:13:application',
          fs: ['at ./nft-contract/index.rsh:57:13:application call to [unknown function] (defined at: ./nft-contract/index.rsh:57:13:function exp)', 'at ./nft-contract/index.rsh:65:18:application call to "k" (defined at: ./nft-contract/index.rsh:62:15:function exp)', 'at ./nft-contract/index.rsh:62:15:application call to [unknown function] (defined at: ./nft-contract/index.rsh:62:15:function exp)'],
          msg: 'out',
          who: 'Market_stop'
          });
        }
      else {
        }
      
      const v685 = stdlib.sub(v286, v276);
      ;
      const v686 = v285[stdlib.checkedBigNumberify('./nft-contract/index.rsh:72:26:application', stdlib.UInt_max, '0')];
      const v687 = v686[stdlib.checkedBigNumberify('./nft-contract/index.rsh:72:26:application', stdlib.UInt_max, '0')];
      const v688 = stdlib.sub(v687, stdlib.checkedBigNumberify('./nft-contract/index.rsh:72:14:decimal', stdlib.UInt_max, '1'));
      const v689 = stdlib.Array_set(v686, '0', v688);
      const v690 = stdlib.Array_set(v285, stdlib.checkedBigNumberify('./nft-contract/index.rsh:72:26:application', stdlib.UInt_max, '0'), v689);
      ;
      const v691 = stdlib.eq(v685, stdlib.checkedBigNumberify('./nft-contract/index.rsh:84:26:decimal', stdlib.UInt_max, '0'));
      stdlib.assert(v691, {
        at: './nft-contract/index.rsh:84:12:application',
        fs: [],
        msg: null,
        who: 'Market_stop'
        });
      const v692 = v690[stdlib.checkedBigNumberify('./nft-contract/index.rsh:85:20:application', stdlib.UInt_max, '0')];
      const v693 = v692[stdlib.checkedBigNumberify('./nft-contract/index.rsh:85:20:application', stdlib.UInt_max, '0')];
      const v694 = stdlib.eq(v693, stdlib.checkedBigNumberify('./nft-contract/index.rsh:85:31:decimal', stdlib.UInt_max, '0'));
      stdlib.assert(v694, {
        at: './nft-contract/index.rsh:85:12:application',
        fs: [],
        msg: null,
        who: 'Market_stop'
        });
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
  if (step == 4) {return _Market_buy4(ctcTop, interact);}
  throw stdlib.apiStateMismatchError({ _stateSourceMap }, [stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4')], stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, step))
  };
export async function Market_stop(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for Market_stop expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for Market_stop expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const step = await ctc.getCurrentStep()
  if (step == 4) {return _Market_stop4(ctcTop, interact);}
  throw stdlib.apiStateMismatchError({ _stateSourceMap }, [stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '4')], stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, step))
  };
const _ALGO = {
  ABI: {
    impure: [`Market_buy()(address,uint64,uint64)`, `Market_stop()byte`, `_reachp_0((uint64,uint64,uint64,address))void`, `_reachp_1((uint64))void`, `_reachp_3((uint64,(byte,byte[0])))void`],
    pure: [`View_price()uint64`, `View_token()uint64`],
    sigs: [`Market_buy()(address,uint64,uint64)`, `Market_stop()byte`, `View_price()uint64`, `View_token()uint64`, `_reachp_0((uint64,uint64,uint64,address))void`, `_reachp_1((uint64))void`, `_reachp_3((uint64,(byte,byte[0])))void`]
    },
  GlobalNumByteSlice: 3,
  GlobalNumUint: 0,
  LocalNumByteSlice: 0,
  LocalNumUint: 0,
  appApproval: `CCAHAAEECKCNBiAoJgMAAQABATEYQQKpKGRJIls1ASVbNQIpZCpkUIIHBEjgtzwEe+eVkAS0WQAzBND+hikE39kjKATpiAshBOvt9XE2GgCOBwA7AjsAAQJWAksASwBpAIEJrzULJDQBEkSIAw00CyJbNQw0C1cIATUNgAQJq9WkNAwWUDQNULA0DIgC4zQNIlWNAgK2ArlC/8WACQAAAAAAAAAAATULQv+7NAEkEkSIAsg0FhY1BDEZIhJEgAQVH3x1NARQsCNDNAEkEkSIAqo0FxY1BEL/3zQWiALoMQA0FhZQNBcWUDULgAgAAAAAAAABSDQLULA0CzUEMQA0FjQTCCMiMgY0DjQWCDUONRA1ETUSNRM1FDQRFDQSFBBBAcA0GDQXFlA0FhZQNBVQNBRQNBMWUDQPUDQOFlAkMgY1AjUBKUsBVwB/ZypMV38SZyg0ARY0AhZQZzEZIhJEiAJUNANA/2BC/1MxADQYEkk1C0SACAAAAAAAAAFwNAsWUQcIULA0CxZRBwg1BCIjMgY1EDURNRJC/34xADUYNAsiWzUMNAslWzUXNAuBEFs1FjQLVxggNRWABL+0iW00DBZQNBcWUDQWFlA0FVCwNAyIAZ6BEa9JNQtJVwARJa9cAFwANQ0hBIgBxiI0FzIKiAG6NBg0FxZQNBYWUDQVUDQNUIEwr1AjMgZC/zQjNAESRElXACA1GEkhBVs1F0khBls1FklXMCA1FVdQETUNNAsXNQyABNUVGRQ0DBZQsDQMiAEuNA1XABE1CyM0FzEWNAAjCEk1AAlHAzgUMgoSRDgQJBJEOBFPAhJEOBISRDQYMQASRDQYIiIiMgY0DTQLSSJbIwgWXABcACI1DjUPNRA1ETUSNRM1FEL+fYgAzyEEiAENNhoBNQtC/u+IAL82GgE1C0L/VogAtDYaATULQv2lIjE0EkSBAzE1EkQiMTYSRCIxNxJEiACUgZEBryIiQv5eNBM0FYgA2TQPVwARNQsjNBc0FIgAtDQONBMJIhJENA80C0kiWyMJFlwAXABXABEiWyISRCI0FzIKMgmIAMgxGYEFEkSIAI0iMgoyCYgAsUL+LiKyASOyELIHsgiziSKyASSyELIUshGyErOJQv2IQv4WSIlMCUk1BjIJiABiiQlJQf/uSTUGiABaiSM1A4lJIhJMNAISEUSJSVcAIDUYSSEFWzUXSSEGWzUWSVcwIDUVSVdQIDUUSYFwWzUTSVd4ETUPgYkBWzUOibFC/5A0Bgg1Bok0BjQHSg9B/5dC/5+xQv9uMRY0ACMISTUACUcCOAcyChJEOBAjEkQ4CBJEibGyCUL/TLGyFUL/Ug==`,
  appApprovalMap: {
    0: `2`,
    1: `2`,
    10: `2`,
    100: `30`,
    1000: `616`,
    1001: `617`,
    1002: `617`,
    1003: `618`,
    101: `30`,
    102: `32`,
    103: `33`,
    104: `33`,
    105: `34`,
    106: `35`,
    107: `36`,
    108: `36`,
    109: `36`,
    11: `2`,
    110: `37`,
    111: `37`,
    112: `38`,
    113: `39`,
    114: `40`,
    115: `40`,
    116: `41`,
    117: `41`,
    118: `42`,
    119: `42`,
    12: `2`,
    120: `42`,
    121: `43`,
    122: `43`,
    123: `44`,
    124: `44`,
    125: `44`,
    126: `44`,
    127: `44`,
    128: `44`,
    129: `45`,
    13: `2`,
    130: `45`,
    131: `46`,
    132: `47`,
    133: `48`,
    134: `48`,
    135: `49`,
    136: `50`,
    137: `52`,
    138: `52`,
    139: `53`,
    14: `2`,
    140: `53`,
    141: `53`,
    142: `54`,
    143: `54`,
    144: `55`,
    145: `56`,
    146: `57`,
    147: `57`,
    148: `57`,
    149: `57`,
    15: `2`,
    150: `57`,
    151: `57`,
    152: `58`,
    153: `58`,
    154: `58`,
    155: `61`,
    156: `61`,
    157: `61`,
    158: `61`,
    159: `61`,
    16: `2`,
    160: `61`,
    161: `61`,
    162: `61`,
    163: `61`,
    164: `61`,
    165: `61`,
    166: `62`,
    167: `62`,
    168: `63`,
    169: `63`,
    17: `2`,
    170: `63`,
    171: `66`,
    172: `66`,
    173: `67`,
    174: `68`,
    175: `69`,
    176: `72`,
    177: `72`,
    178: `72`,
    179: `73`,
    18: `2`,
    180: `73`,
    181: `74`,
    182: `75`,
    183: `75`,
    184: `77`,
    185: `77`,
    186: `78`,
    187: `79`,
    188: `80`,
    189: `83`,
    19: `4`,
    190: `83`,
    191: `83`,
    192: `83`,
    193: `83`,
    194: `83`,
    195: `84`,
    196: `84`,
    197: `85`,
    198: `86`,
    199: `88`,
    2: `2`,
    20: `4`,
    200: `89`,
    201: `92`,
    202: `92`,
    203: `93`,
    204: `94`,
    205: `95`,
    206: `98`,
    207: `98`,
    208: `98`,
    209: `99`,
    21: `5`,
    210: `99`,
    211: `100`,
    212: `101`,
    213: `101`,
    214: `102`,
    215: `102`,
    216: `102`,
    217: `104`,
    218: `104`,
    219: `105`,
    22: `5`,
    220: `105`,
    221: `105`,
    222: `108`,
    223: `108`,
    224: `109`,
    225: `109`,
    226: `110`,
    227: `111`,
    228: `112`,
    229: `112`,
    23: `5`,
    230: `113`,
    231: `114`,
    232: `115`,
    233: `115`,
    234: `116`,
    235: `116`,
    236: `116`,
    237: `116`,
    238: `116`,
    239: `116`,
    24: `6`,
    240: `116`,
    241: `116`,
    242: `116`,
    243: `116`,
    244: `117`,
    245: `117`,
    246: `118`,
    247: `119`,
    248: `120`,
    249: `120`,
    25: `7`,
    250: `121`,
    251: `121`,
    252: `122`,
    253: `122`,
    254: `123`,
    255: `123`,
    256: `124`,
    257: `124`,
    258: `125`,
    259: `126`,
    26: `8`,
    260: `127`,
    261: `128`,
    262: `128`,
    263: `129`,
    264: `129`,
    265: `130`,
    266: `130`,
    267: `131`,
    268: `132`,
    269: `132`,
    27: `9`,
    270: `133`,
    271: `133`,
    272: `134`,
    273: `134`,
    274: `135`,
    275: `135`,
    276: `136`,
    277: `136`,
    278: `137`,
    279: `137`,
    28: `10`,
    280: `139`,
    281: `139`,
    282: `140`,
    283: `141`,
    284: `141`,
    285: `142`,
    286: `143`,
    287: `144`,
    288: `144`,
    289: `144`,
    29: `11`,
    290: `146`,
    291: `146`,
    292: `147`,
    293: `147`,
    294: `148`,
    295: `149`,
    296: `150`,
    297: `150`,
    298: `151`,
    299: `152`,
    3: `2`,
    30: `11`,
    300: `153`,
    301: `153`,
    302: `154`,
    303: `155`,
    304: `155`,
    305: `156`,
    306: `157`,
    307: `157`,
    308: `158`,
    309: `159`,
    31: `12`,
    310: `160`,
    311: `160`,
    312: `161`,
    313: `162`,
    314: `162`,
    315: `163`,
    316: `164`,
    317: `165`,
    318: `166`,
    319: `166`,
    32: `13`,
    320: `168`,
    321: `168`,
    322: `169`,
    323: `169`,
    324: `170`,
    325: `171`,
    326: `171`,
    327: `172`,
    328: `172`,
    329: `172`,
    33: `14`,
    330: `173`,
    331: `174`,
    332: `175`,
    333: `176`,
    334: `176`,
    335: `176`,
    336: `177`,
    337: `178`,
    338: `179`,
    339: `179`,
    34: `14`,
    340: `180`,
    341: `181`,
    342: `181`,
    343: `182`,
    344: `183`,
    345: `184`,
    346: `185`,
    347: `185`,
    348: `186`,
    349: `187`,
    35: `15`,
    350: `188`,
    351: `190`,
    352: `190`,
    353: `190`,
    354: `192`,
    355: `192`,
    356: `193`,
    357: `193`,
    358: `193`,
    359: `194`,
    36: `16`,
    360: `194`,
    361: `194`,
    362: `196`,
    363: `196`,
    364: `197`,
    365: `197`,
    366: `198`,
    367: `199`,
    368: `200`,
    369: `200`,
    37: `17`,
    370: `201`,
    371: `205`,
    372: `205`,
    373: `205`,
    374: `205`,
    375: `205`,
    376: `205`,
    377: `205`,
    378: `205`,
    379: `205`,
    38: `18`,
    380: `205`,
    381: `206`,
    382: `206`,
    383: `207`,
    384: `208`,
    385: `208`,
    386: `208`,
    387: `209`,
    388: `210`,
    389: `211`,
    39: `19`,
    390: `211`,
    391: `212`,
    392: `213`,
    393: `213`,
    394: `213`,
    395: `214`,
    396: `214`,
    397: `215`,
    398: `216`,
    399: `217`,
    4: `2`,
    40: `21`,
    400: `217`,
    401: `218`,
    402: `218`,
    403: `219`,
    404: `219`,
    405: `220`,
    406: `220`,
    407: `221`,
    408: `221`,
    409: `221`,
    41: `21`,
    410: `223`,
    411: `223`,
    412: `224`,
    413: `224`,
    414: `225`,
    415: `225`,
    416: `226`,
    417: `227`,
    418: `228`,
    419: `228`,
    42: `21`,
    420: `229`,
    421: `229`,
    422: `230`,
    423: `231`,
    424: `232`,
    425: `232`,
    426: `233`,
    427: `233`,
    428: `234`,
    429: `234`,
    43: `21`,
    430: `235`,
    431: `236`,
    432: `236`,
    433: `237`,
    434: `237`,
    435: `238`,
    436: `238`,
    437: `238`,
    438: `239`,
    439: `239`,
    44: `21`,
    440: `240`,
    441: `240`,
    442: `240`,
    443: `240`,
    444: `240`,
    445: `240`,
    446: `241`,
    447: `241`,
    448: `242`,
    449: `243`,
    45: `21`,
    450: `244`,
    451: `244`,
    452: `245`,
    453: `246`,
    454: `247`,
    455: `247`,
    456: `248`,
    457: `249`,
    458: `250`,
    459: `250`,
    46: `21`,
    460: `251`,
    461: `252`,
    462: `254`,
    463: `254`,
    464: `255`,
    465: `255`,
    466: `255`,
    467: `256`,
    468: `256`,
    469: `257`,
    47: `21`,
    470: `258`,
    471: `259`,
    472: `259`,
    473: `260`,
    474: `261`,
    475: `261`,
    476: `261`,
    477: `262`,
    478: `263`,
    479: `264`,
    48: `21`,
    480: `264`,
    481: `265`,
    482: `265`,
    483: `266`,
    484: `266`,
    485: `267`,
    486: `267`,
    487: `268`,
    488: `268`,
    489: `268`,
    49: `21`,
    490: `269`,
    491: `271`,
    492: `271`,
    493: `272`,
    494: `272`,
    495: `273`,
    496: `273`,
    497: `273`,
    498: `275`,
    499: `275`,
    5: `2`,
    50: `21`,
    500: `276`,
    501: `276`,
    502: `277`,
    503: `278`,
    504: `279`,
    505: `279`,
    506: `280`,
    507: `281`,
    508: `282`,
    509: `282`,
    51: `21`,
    510: `283`,
    511: `284`,
    512: `284`,
    513: `285`,
    514: `286`,
    515: `286`,
    516: `287`,
    517: `288`,
    518: `289`,
    519: `290`,
    52: `21`,
    520: `290`,
    521: `291`,
    522: `291`,
    523: `291`,
    524: `293`,
    525: `294`,
    526: `294`,
    527: `295`,
    528: `296`,
    529: `298`,
    53: `21`,
    530: `299`,
    531: `299`,
    532: `299`,
    533: `300`,
    534: `300`,
    535: `301`,
    536: `302`,
    537: `302`,
    538: `303`,
    539: `304`,
    54: `21`,
    540: `304`,
    541: `305`,
    542: `306`,
    543: `306`,
    544: `307`,
    545: `308`,
    546: `308`,
    547: `309`,
    548: `310`,
    549: `310`,
    55: `21`,
    550: `310`,
    551: `311`,
    552: `311`,
    553: `312`,
    554: `312`,
    555: `312`,
    556: `313`,
    557: `313`,
    558: `314`,
    559: `314`,
    56: `21`,
    560: `315`,
    561: `316`,
    562: `316`,
    563: `317`,
    564: `317`,
    565: `317`,
    566: `317`,
    567: `317`,
    568: `317`,
    569: `318`,
    57: `21`,
    570: `318`,
    571: `319`,
    572: `320`,
    573: `321`,
    574: `323`,
    575: `323`,
    576: `324`,
    577: `324`,
    578: `324`,
    579: `325`,
    58: `21`,
    580: `325`,
    581: `326`,
    582: `326`,
    583: `326`,
    584: `327`,
    585: `327`,
    586: `328`,
    587: `329`,
    588: `329`,
    589: `332`,
    59: `21`,
    590: `332`,
    591: `333`,
    592: `333`,
    593: `334`,
    594: `335`,
    595: `336`,
    596: `337`,
    597: `337`,
    598: `338`,
    599: `339`,
    6: `2`,
    60: `21`,
    600: `339`,
    601: `340`,
    602: `340`,
    603: `341`,
    604: `341`,
    605: `342`,
    606: `343`,
    607: `344`,
    608: `344`,
    609: `345`,
    61: `21`,
    610: `346`,
    611: `347`,
    612: `348`,
    613: `348`,
    614: `349`,
    615: `349`,
    616: `350`,
    617: `351`,
    618: `352`,
    619: `352`,
    62: `21`,
    620: `353`,
    621: `354`,
    622: `357`,
    623: `357`,
    624: `358`,
    625: `358`,
    626: `359`,
    627: `360`,
    628: `363`,
    629: `363`,
    63: `21`,
    630: `364`,
    631: `365`,
    632: `366`,
    633: `367`,
    634: `367`,
    635: `368`,
    636: `368`,
    637: `369`,
    638: `369`,
    639: `370`,
    64: `21`,
    640: `371`,
    641: `372`,
    642: `373`,
    643: `374`,
    644: `375`,
    645: `376`,
    646: `376`,
    647: `377`,
    648: `377`,
    649: `378`,
    65: `21`,
    650: `379`,
    651: `379`,
    652: `380`,
    653: `380`,
    654: `381`,
    655: `381`,
    656: `382`,
    657: `382`,
    658: `383`,
    659: `383`,
    66: `21`,
    660: `384`,
    661: `384`,
    662: `385`,
    663: `385`,
    664: `386`,
    665: `386`,
    666: `386`,
    667: `388`,
    668: `388`,
    669: `388`,
    67: `21`,
    670: `389`,
    671: `389`,
    672: `390`,
    673: `390`,
    674: `390`,
    675: `391`,
    676: `391`,
    677: `391`,
    678: `392`,
    679: `392`,
    68: `21`,
    680: `393`,
    681: `393`,
    682: `393`,
    683: `395`,
    684: `395`,
    685: `395`,
    686: `396`,
    687: `396`,
    688: `396`,
    689: `397`,
    69: `21`,
    690: `397`,
    691: `398`,
    692: `398`,
    693: `398`,
    694: `400`,
    695: `400`,
    696: `400`,
    697: `401`,
    698: `401`,
    699: `401`,
    7: `2`,
    70: `21`,
    700: `402`,
    701: `402`,
    702: `403`,
    703: `403`,
    704: `403`,
    705: `405`,
    706: `406`,
    707: `406`,
    708: `407`,
    709: `408`,
    71: `21`,
    710: `409`,
    711: `409`,
    712: `410`,
    713: `410`,
    714: `411`,
    715: `412`,
    716: `413`,
    717: `414`,
    718: `414`,
    719: `415`,
    72: `21`,
    720: `416`,
    721: `417`,
    722: `418`,
    723: `418`,
    724: `419`,
    725: `420`,
    726: `421`,
    727: `421`,
    728: `421`,
    729: `422`,
    73: `21`,
    730: `422`,
    731: `422`,
    732: `423`,
    733: `424`,
    734: `425`,
    735: `426`,
    736: `426`,
    737: `426`,
    738: `428`,
    739: `428`,
    74: `21`,
    740: `430`,
    741: `430`,
    742: `431`,
    743: `431`,
    744: `431`,
    745: `432`,
    746: `432`,
    747: `433`,
    748: `433`,
    749: `433`,
    75: `21`,
    750: `434`,
    751: `434`,
    752: `435`,
    753: `437`,
    754: `437`,
    755: `439`,
    756: `439`,
    757: `440`,
    758: `440`,
    759: `440`,
    76: `21`,
    760: `441`,
    761: `441`,
    762: `442`,
    763: `442`,
    764: `443`,
    765: `444`,
    766: `445`,
    767: `446`,
    768: `449`,
    769: `449`,
    77: `22`,
    770: `450`,
    771: `450`,
    772: `451`,
    773: `452`,
    774: `453`,
    775: `454`,
    776: `455`,
    777: `456`,
    778: `457`,
    779: `457`,
    78: `22`,
    780: `458`,
    781: `458`,
    782: `459`,
    783: `459`,
    784: `459`,
    785: `460`,
    786: `461`,
    787: `462`,
    788: `463`,
    789: `464`,
    79: `22`,
    790: `468`,
    791: `469`,
    792: `469`,
    793: `470`,
    794: `470`,
    795: `471`,
    796: `471`,
    797: `472`,
    798: `472`,
    799: `472`,
    8: `2`,
    80: `23`,
    800: `474`,
    801: `474`,
    802: `475`,
    803: `475`,
    804: `476`,
    805: `477`,
    806: `479`,
    807: `479`,
    808: `479`,
    809: `481`,
    81: `23`,
    810: `482`,
    811: `482`,
    812: `483`,
    813: `483`,
    814: `484`,
    815: `484`,
    816: `484`,
    817: `485`,
    818: `485`,
    819: `485`,
    82: `23`,
    820: `487`,
    821: `488`,
    822: `488`,
    823: `489`,
    824: `490`,
    825: `490`,
    826: `491`,
    827: `491`,
    828: `492`,
    829: `492`,
    83: `23`,
    830: `493`,
    831: `494`,
    832: `496`,
    833: `497`,
    834: `497`,
    835: `498`,
    836: `499`,
    837: `499`,
    838: `500`,
    839: `500`,
    84: `23`,
    840: `501`,
    841: `501`,
    842: `502`,
    843: `502`,
    844: `503`,
    845: `504`,
    846: `506`,
    847: `506`,
    848: `506`,
    849: `508`,
    85: `23`,
    850: `508`,
    851: `508`,
    852: `510`,
    853: `511`,
    854: `513`,
    855: `514`,
    856: `515`,
    857: `516`,
    858: `516`,
    859: `517`,
    86: `23`,
    860: `517`,
    861: `518`,
    862: `518`,
    863: `518`,
    864: `519`,
    865: `521`,
    866: `522`,
    867: `523`,
    868: `523`,
    869: `523`,
    87: `23`,
    870: `524`,
    871: `525`,
    872: `525`,
    873: `526`,
    874: `526`,
    875: `526`,
    876: `527`,
    877: `529`,
    878: `530`,
    879: `530`,
    88: `23`,
    880: `531`,
    881: `533`,
    882: `534`,
    883: `535`,
    884: `536`,
    885: `537`,
    886: `537`,
    887: `538`,
    888: `539`,
    889: `540`,
    89: `23`,
    890: `541`,
    891: `543`,
    892: `544`,
    893: `544`,
    894: `544`,
    895: `545`,
    896: `545`,
    897: `546`,
    898: `547`,
    899: `547`,
    9: `2`,
    90: `23`,
    900: `548`,
    901: `549`,
    902: `549`,
    903: `550`,
    904: `551`,
    905: `551`,
    906: `552`,
    907: `553`,
    908: `553`,
    909: `554`,
    91: `23`,
    910: `555`,
    911: `555`,
    912: `555`,
    913: `556`,
    914: `556`,
    915: `557`,
    916: `558`,
    917: `558`,
    918: `558`,
    919: `559`,
    92: `23`,
    920: `559`,
    921: `560`,
    922: `561`,
    923: `561`,
    924: `562`,
    925: `563`,
    926: `563`,
    927: `564`,
    928: `565`,
    929: `565`,
    93: `23`,
    930: `565`,
    931: `566`,
    932: `566`,
    933: `567`,
    934: `567`,
    935: `567`,
    936: `568`,
    937: `569`,
    938: `569`,
    939: `570`,
    94: `23`,
    940: `572`,
    941: `573`,
    942: `573`,
    943: `573`,
    944: `575`,
    945: `575`,
    946: `576`,
    947: `577`,
    948: `577`,
    949: `578`,
    95: `23`,
    950: `580`,
    951: `580`,
    952: `581`,
    953: `581`,
    954: `582`,
    955: `583`,
    956: `584`,
    957: `584`,
    958: `584`,
    959: `585`,
    96: `25`,
    960: `585`,
    961: `585`,
    962: `587`,
    963: `588`,
    964: `588`,
    965: `588`,
    966: `591`,
    967: `591`,
    968: `592`,
    969: `592`,
    97: `28`,
    970: `593`,
    971: `594`,
    972: `595`,
    973: `596`,
    974: `596`,
    975: `597`,
    976: `598`,
    977: `598`,
    978: `599`,
    979: `599`,
    98: `28`,
    980: `600`,
    981: `600`,
    982: `601`,
    983: `602`,
    984: `603`,
    985: `603`,
    986: `604`,
    987: `605`,
    988: `606`,
    989: `607`,
    99: `29`,
    990: `607`,
    991: `608`,
    992: `609`,
    993: `610`,
    994: `612`,
    995: `613`,
    996: `613`,
    997: `614`,
    998: `614`,
    999: `614`
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
  ABI: `[{"inputs":[{"components":[{"internalType":"uint256","name":"elem0","type":"uint256"},{"internalType":"address payable","name":"elem1","type":"address"},{"internalType":"uint256","name":"elem2","type":"uint256"},{"internalType":"address payable","name":"elem3","type":"address"}],"internalType":"struct T7","name":"v709","type":"tuple"}],"stateMutability":"payable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"msg","type":"uint256"}],"name":"ReachError","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_who","type":"address"},{"components":[{"internalType":"uint256","name":"elem0","type":"uint256"},{"internalType":"address payable","name":"elem1","type":"address"},{"internalType":"uint256","name":"elem2","type":"uint256"},{"internalType":"address payable","name":"elem3","type":"address"}],"indexed":false,"internalType":"struct T7","name":"_a","type":"tuple"}],"name":"_reach_e0","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_who","type":"address"},{"components":[{"internalType":"uint256","name":"elem0","type":"uint256"}],"indexed":false,"internalType":"struct T9","name":"_a","type":"tuple"}],"name":"_reach_e1","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_who","type":"address"},{"components":[{"internalType":"uint256","name":"elem0","type":"uint256"},{"components":[{"internalType":"enum _enum_T2","name":"which","type":"uint8"},{"internalType":"bool","name":"_Market_buy0_70","type":"bool"},{"internalType":"bool","name":"_Market_stop0_70","type":"bool"}],"internalType":"struct T2","name":"elem1","type":"tuple"}],"indexed":false,"internalType":"struct T3","name":"_a","type":"tuple"}],"name":"_reach_e3","type":"event"},{"anonymous":false,"inputs":[{"components":[{"internalType":"address payable","name":"elem0","type":"address"},{"internalType":"uint256","name":"elem1","type":"uint256"},{"internalType":"address payable","name":"elem2","type":"address"}],"indexed":false,"internalType":"struct T0","name":"v0","type":"tuple"}],"name":"_reach_oe_v328","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"v0","type":"bool"}],"name":"_reach_oe_v368","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"Market_buy","outputs":[{"components":[{"internalType":"address payable","name":"elem0","type":"address"},{"internalType":"uint256","name":"elem1","type":"uint256"},{"internalType":"address payable","name":"elem2","type":"address"}],"internalType":"struct T0","name":"","type":"tuple"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"Market_stop","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"View_price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"View_token","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_reachCreationTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_reachCurrentState","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_reachCurrentTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"elem0","type":"uint256"}],"internalType":"struct T9","name":"v712","type":"tuple"}],"name":"_reachp_1","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"elem0","type":"uint256"},{"components":[{"internalType":"enum _enum_T2","name":"which","type":"uint8"},{"internalType":"bool","name":"_Market_buy0_70","type":"bool"},{"internalType":"bool","name":"_Market_stop0_70","type":"bool"}],"internalType":"struct T2","name":"elem1","type":"tuple"}],"internalType":"struct T3","name":"v715","type":"tuple"}],"name":"_reachp_3","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}]`,
  Bytecode: `0x6080601f62001dfb38819003918201601f19168301916001600160401b0383118484101762000437578084926080946040528339810103126200052257604051608081016001600160401b038111828210176200043757604052815181526200006b602083016200055f565b91602082019283526200008d606060408301519260408501938452016200055f565b90606083019182524360035560006080604051620000ab8162000527565b828152620000b862000574565b602082015282604082015282606082015201526040516040810181811060018060401b038211176200043757604052620000f162000574565b815260208101936200010262000595565b855260ff6004541662000509577f143bd7eb5dd759258158818958ac9cd9e010274ba04900f209594407b18e6cdd60a060405133815283516020820152600180831b03895116604082015285516060820152600180831b038751166080820152a1518015908115620004fc575b5015620004e3576000815152600060208251015260006040825101525183515234620004ca5760405193620001a48562000527565b60008552600060208601526000604086015260006060860152620001c762000595565b608086015233855260018060a01b03905116602085015251604084015260018060a01b03905116606083015251805160406020820151910151151560405191620002118362000543565b60008352602083015260408201526200022962000595565b9160005b600181106200047a5750508152608082015260016000554360015560806040519160018060a01b03815116602084015260018060a01b0360208201511660408401526040810151606084015260018060a01b0360608201511682840152015160a082016000905b600182106200044d5760e084528361010081016001600160401b03811182821017620004375760405280516001600160401b0381116200043757600254600181811c911680156200042c575b60208210146200041657601f8111620003ac575b50602091601f8211600114620003425791819260009262000336575b50508160011b916000199060031b1c1916176002555b6040516117f69081620006058239f35b01519050828062000310565b601f19821692600260005260206000209160005b858110620003935750836001951062000379575b505050811b0160025562000326565b015160001960f88460031b161c191690558280806200036a565b9192602060018192868501518155019401920162000356565b60026000527f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace601f830160051c810191602084106200040b575b601f0160051c01905b818110620003fe5750620002f4565b60008155600101620003ef565b9091508190620003e6565b634e487b7160e01b600052602260045260246000fd5b90607f1690620002e0565b634e487b7160e01b600052604160045260246000fd5b60206060600192604086518051835284810151858401520151151560408201520193019101909162000294565b620004868183620005dc565b51620004938286620005dc565b52620004a08185620005dc565b506000198114620004b4576001016200022d565b634e487b7160e01b600052601160045260246000fd5b60405163100960cb60e01b8152600b6004820152602490fd5b60405163100960cb60e01b8152600a6004820152602490fd5b905060015414386200016f565b60405163100960cb60e01b815260096004820152602490fd5b600080fd5b60a081019081106001600160401b038211176200043757604052565b606081019081106001600160401b038211176200043757604052565b51906001600160a01b03821682036200052257565b60405190620005838262000543565b60006040838281528260208201520152565b6040519060208083016001600160401b0381118482101762000437576040528260005b828110620005c557505050565b8290620005d162000574565b8184015201620005b8565b906001811015620005ee5760051b0190565b634e487b7160e01b600052603260045260246000fdfe60806040526004361015610018575b361561001657005b005b6000803560e01c9081631e93b0f1146100cf57508063573b8510146100c657806383230757146100bd578063a25acb89146100b4578063ab53f2c6146100ab578063af6e55f7146100a2578063e3a5410314610099578063f76a4d69146100905763fd70fdbe0361000e5761008b610557565b61000e565b5061008b6104f2565b5061008b61046c565b5061008b6103e0565b5061008b610362565b5061008b6102f6565b5061008b6102d7565b5061008b6100ee565b346100eb57806003193601126100eb5760035460805260206080f35b80fd5b506020806003193601126102d2576101046107d7565b506102b86040916102a583519161011a83610633565b600435835261012d600160005414610e37565b6101a861014961013b6106d0565b8380825183010191016116c4565b9361016561016061015c60045460ff1690565b1590565b610e57565b8651338152815160208201527fcf0e8bec53cd91fa87ecf8f6f405ac75914a22acdb92a3553ee5c294fee8159690604090a15180159081156102c6575b50610e77565b6101b23415610e97565b6080818401936101d36101ce6101c887516103d4565b33611747565b610eb7565b6101ef3360018060a01b036101e884516103d4565b1614610ed7565b61021f6102176101fd610a32565b9661021161020b85516103d4565b89610aab565b516103d4565b848701610aab565b868101518786015261024061023760608301516103d4565b60608701610aab565b61025561024d82516103d4565b838701610aab565b600060a0860152600060c0860152600060e08601524361010086015201516102a0815192600184510193888282015191015115159161029261077b565b958652850152151587840152565b61160a565b61012082015260006101408201526112e7565b5160008152602090f35b0390f35b905060015414386101a2565b600080fd5b50346102d25760003660031901126102d2576020600154604051908152f35b50346102d25760003660031901126102d2576103106107d7565b600460005403610349576060602091604061033a61032c6106d0565b858082518301019101610923565b01519182910152604051908152f35b60405163100960cb60e01b815260076004820152602490fd5b50346102d2576000806003193601126100eb57805461037f6106d0565b906040519283918252602090604082840152835191826040850152815b8381106103bd57505060608094508284010152601f80199101168101030190f35b80860182015187820160600152869450810161039c565b6001600160a01b031690565b50346102d25760003660031901126102d2576103fa6107d7565b6004600054036104535760806102c2916104126106d0565b80516001600160a01b0391602091610431919081018301908301610923565b01511691018190526040516001600160a01b0390911681529081906020820190565b60405163100960cb60e01b815260086004820152602490fd5b5060003660031901126102d257602060406104856107d7565b6104b981610491610827565b85810190600182515251151585825101526104aa610827565b90600082525186820152610aba565b01511515604051908152f35b81516001600160a01b03908116825260208084015190830152604092830151169181019190915260600190565b5060003660031901126102d25761050761079a565b506102c260206105156107d7565b61054981610521610827565b848101906000825152511515858251015261053a610827565b90600082525185820152610aba565b0151604051918291826104c5565b5060803660031901126102d25761056c6107d7565b604051906105798261065b565b600435825260603660231901126102d2576040519161059783610676565b6024359260028410156102d2576105d69381526044356105b68161089c565b60208201526064356105c78161089c565b60408201526020820152610aba565b60405160008152602090f35b90600182811c92168015610612575b60208310146105fc57565b634e487b7160e01b600052602260045260246000fd5b91607f16916105f1565b50634e487b7160e01b600052604160045260246000fd5b602081019081106001600160401b0382111761064e57604052565b61065661061c565b604052565b604081019081106001600160401b0382111761064e57604052565b606081019081106001600160401b0382111761064e57604052565b61010081019081106001600160401b0382111761064e57604052565b601f909101601f19168101906001600160401b0382119082101761064e57604052565b60405190600082600254916106e4836105e2565b80835260019380851690811561075a575060011461070c575b5061070a925003836106ad565b565b600260009081526000805160206117ca83398151915294602093509091905b81831061074257505061070a9350820101386106fd565b8554888401850152948501948794509183019161072b565b905061070a94506020925060ff191682840152151560051b820101386106fd565b60405190606082016001600160401b0381118382101761064e57604052565b60405190606082016001600160401b038111838210176107ca575b60405260006040838281528260208201520152565b6107d261061c565b6107b5565b6040519060a082016001600160401b0381118382101761081a575b604052600060808382815261080561079a565b60208201528260408201528260608201520152565b61082261061c565b6107f2565b604051906108348261065b565b8160008152602061084361079a565b910152565b6002111561085257565b634e487b7160e01b600052602160045260246000fd5b604051906108758261065b565b600060208361088261079a565b81520152565b51906001600160a01b03821682036102d257565b801515036102d257565b9080601f830112156102d2576040918251926108c184610633565b83606093848401938185116102d257915b8483106108e25750505050505090565b85838303126102d257835186916108f882610676565b845182526020918286015183820152868601516109148161089c565b878201528152019201916108d2565b610140818303126102d2576101209061099d6040519361094285610691565b61094b83610888565b855261095960208401610888565b60208601526040830151604086015261097460608401610888565b606086015261098560808401610888565b608086015260a083015160a086015260c083016108a6565b60c0840152015160e082015290565b90929160209060a083019460018060a01b03168352805182840152015180516002811015610852576080916040918285015260208101511515606085015201511515910152565b5160028110156108525790565b60405190610a0d82610633565b8160005b60208110610a1d575050565b602090610a2861079a565b8184015201610a11565b6040519061016082016001600160401b03811183821017610a9e575b604052816101406000918281528260208201528260408201528260608201528260808201528260a08201528260c08201528260e082015282610100820152610a94610a00565b6101208201520152565b610aa661061c565b610a4e565b6001600160a01b039091169052565b90610ac3610868565b90610ad2600460005414610ef7565b610ada6106d0565b92610aef602094858082518301019101610923565b90610b07610b0261015c60045460ff1690565b610f17565b846040917fdb327b347da4cf10605fed5096464b71b34be28d32a3eae7d454bc8f6d9404d8835180610b3a8433836109ac565b0390a1610b5281518015908115610df2575b50610f37565b01610b5d81516109f3565b610b6681610848565b610c8257509081610c1261070a9660e094840195610b8687513414610f97565b610b91338951610aab565b865182895101528180860198610bb3610baa8b516103d4565b87835101610aab565b7f764a36f12a043e5fa19ad108d028669c3005e1f07b40e52710bcea6f438d2c4a610be482518851918291826104c5565b0390a151910152610c0a610bf6610a32565b97610211610c0487516103d4565b8a610aab565b908701610aab565b835190850152610c31610c2860608301516103d4565b60608601610aab565b610c3e3360808601610aab565b610c4e835160a083015190610e15565b60a0850152600160c08501526000828501524361010085015260c081015161012085015201519051016101408201526112e7565b610c91600191969596516109f3565b610c9a81610848565b14610ca7575b5050505050565b610d3f60e09382610d38610de898610cbf3415610f57565b610cde89610cd5610cd08a516103d4565b6103d4565b33149201918252565b610cf0610ceb8251151590565b610f77565b7fdb54220287a7ce3fd77f1b2a17e9002528357545b8fa80efe2efb2f0bd40e225610d2f610d1e8351151590565b855190151581529081906020820190565b0390a151151590565b1515910152565b610d72610d4a610a32565b94610d5e610d5885516103d4565b87610aab565b610d6a818501516103d4565b908601610aab565b8082015190840152610d93610d8a60608301516103d4565b60608501610aab565b610dac610da360808301516103d4565b60808501610aab565b60a081015160a0840152600060c0840152610dc982840160019052565b4361010084015260c081015161012084015201516101408201526112e7565b3880808080610ca0565b90506001541438610b4c565b50634e487b7160e01b600052601160045260246000fd5b9190820191828111610e2a575b82106102d257565b610e32610dfe565b610e22565b15610e3e57565b60405163100960cb60e01b8152600c6004820152602490fd5b15610e5e57565b60405163100960cb60e01b8152600d6004820152602490fd5b15610e7e57565b60405163100960cb60e01b8152600e6004820152602490fd5b15610e9e57565b60405163100960cb60e01b8152600f6004820152602490fd5b15610ebe57565b60405163100960cb60e01b815260106004820152602490fd5b15610ede57565b60405163100960cb60e01b815260116004820152602490fd5b15610efe57565b60405163100960cb60e01b815260126004820152602490fd5b15610f1e57565b60405163100960cb60e01b815260136004820152602490fd5b15610f3e57565b60405163100960cb60e01b815260146004820152602490fd5b15610f5e57565b60405163100960cb60e01b815260166004820152602490fd5b15610f7e57565b60405163100960cb60e01b815260176004820152602490fd5b15610f9e57565b60405163100960cb60e01b815260156004820152602490fd5b15610fbe57565b60405163100960cb60e01b815260186004820152602490fd5b15610fde57565b60405163100960cb60e01b815260196004820152602490fd5b506040513d6000823e3d90fd5b9060018110156110155760051b0190565b634e487b7160e01b600052603260045260246000fd5b818110611036575050565b6000815560010161102b565b61104d6002546105e2565b806110555750565b601f811160011461106857506000600255565b60026000526110ad90601f0160051c6000805160206117ca833981519152017f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5acf61102b565b6000602081208160025555565b6040519061010082016001600160401b03811183821017611111575b6040528160e06000918281528260208201528260408201528260608201528260808201528260a0820152611108610a00565b60c08201520152565b61111961061c565b6110d6565b91909161014081019260018060a01b03808251168352602081818401511681850152604091828401518386015260609080828601511682870152608085015116608086015260a084015160a086015260c08401519060c08601916000925b600184106111975750505050505060e0610120910151910152565b848360019288855180518352848101518584015201511515898201520192019301929061117c565b90601f82116111cc575050565b61070a9160026000526020600020906020601f840160051c830193106111fa575b601f0160051c019061102b565b90915081906111ed565b80519091906001600160401b0381116112da575b61122c816112276002546105e2565b6111bf565b602080601f8311600114611268575081929360009261125d575b50508160011b916000199060031b1c191617600255565b015190503880611246565b6002600052601f198316949091906000805160206117ca833981519152926000905b8782106112c25750508360019596106112a9575b505050811b01600255565b015160001960f88460031b161c1916905538808061129e565b8060018596829496860151815501950193019061128a565b6112e261061c565b611218565b60e08101516000901561149d575060005b156113ba576113a76113b561070a926101406113126110ba565b9161132661132082516103d4565b84610aab565b61133f61133660208301516103d4565b60208501610aab565b60408101516040840152611359610d8a60608301516103d4565b611369610da360808301516103d4565b60a081015160a084015261012081015160c0840152015160e082015261138f6004600055565b61139843600155565b6040519283916020830161111e565b03601f1981018352826106ad565b611204565b6114696101208261142f6113d7610cd060606114719701516103d4565b600080808060a0870194855190828215611494575bf115611487575b61142161140360208501516103d4565b60808501516001600160a01b039061141a906103d4565b16906114b3565b610140830151905114610fb7565b0151805190611464600019835101926040602082015191015115159061145361077b565b948552602085015215156040840152565b611667565b515115610fd7565b6000805561147f6000600155565b61070a611042565b61148f610ff7565b6113f3565b506108fc6113ec565b60c082015115156000036112f8575060016112f8565b60405163a9059cbb60e01b602082019081526001600160a01b039384166024830152600160448084019190915282526115319360009384939092918491608081016001600160401b03811182821017611538575b6040525193165af161152161151a611545565b80926115aa565b5060208082518301019101611592565b156102d257565b61154061061c565b611507565b3d1561158d573d906001600160401b038211611580575b60405191611574601f8201601f1916602001846106ad565b82523d6000602084013e565b61158861061c565b61155c565b606090565b908160209103126102d257516115a78161089c565b90565b156115b25790565b8051156115c157805190602001fd5b60405163100960cb60e01b815260026004820152602490fd5b156115e25790565b8051156115f157805190602001fd5b60405163100960cb60e01b815260016004820152602490fd5b9190611614610a00565b9260005b600181106116265750508252565b8061163360019284611004565b5161163e8288611004565b526116498187611004565b50600019811461165a575b01611618565b611662610dfe565b611654565b9190611671610a00565b9260005b600181106116835750508252565b8061169060019284611004565b5161169b8288611004565b526116a68187611004565b5060001981146116b7575b01611675565b6116bf610dfe565b6116b1565b9060e0828203126102d25760405191611732919060809060a085016001600160401b0381118682101761173a575b6040526116fe81610888565b855261170c60208201610888565b60208601526040810151604086015261172760608201610888565b6060860152016108a6565b608082015290565b61174261061c565b6116f2565b6040516323b872dd60e01b602082019081526001600160a01b039283166024830152306044830152600160648084019190915282526115a793600093849391929184919060a081016001600160401b038111828210176117bc575b6040525193165af16115216117b5611545565b80926115da565b6117c461061c565b6117a256fe405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5acea164736f6c6343000811000a`,
  BytecodeLen: 7675,
  version: 9,
  views: {
    }
  };
export const _stateSourceMap = {
  1: {
    at: './nft-contract/index.rsh:33:5:after expr stmt',
    fs: [],
    msg: null,
    who: 'Module'
    },
  3: {
    at: './nft-contract/index.rsh:87:5:after expr stmt',
    fs: [],
    msg: null,
    who: 'Module'
    },
  4: {
    at: './nft-contract/index.rsh:41:58:after expr stmt semicolon',
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
  "Market_stop": Market_stop
  };
export const _APIs = {
  Market: {
    buy: Market_buy,
    stop: Market_stop
    }
  };
