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
    lct: stdlib.checkedBigNumberify('./nft-contract/index.rsh:31:7:dot', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc1, ctc0, ctc2],
    pay: [stdlib.checkedBigNumberify('./nft-contract/index.rsh:31:7:decimal', stdlib.UInt_max, '0'), []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [v249, v250, v251], secs: v253, time: v252, didSend: v31, from: v248 } = txn1;
      
      const v254 = v239[stdlib.checkedBigNumberify('./nft-contract/index.rsh:31:7:dot', stdlib.UInt_max, '0')];
      const v255 = stdlib.Array_set(v254, '0', stdlib.checkedBigNumberify('./nft-contract/index.rsh:31:7:dot', stdlib.UInt_max, '0'));
      const v256 = stdlib.Array_set(v239, stdlib.checkedBigNumberify('./nft-contract/index.rsh:31:7:dot', stdlib.UInt_max, '0'), v255);
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
  const v254 = v239[stdlib.checkedBigNumberify('./nft-contract/index.rsh:31:7:dot', stdlib.UInt_max, '0')];
  const v255 = stdlib.Array_set(v254, '0', stdlib.checkedBigNumberify('./nft-contract/index.rsh:31:7:dot', stdlib.UInt_max, '0'));
  const v256 = stdlib.Array_set(v239, stdlib.checkedBigNumberify('./nft-contract/index.rsh:31:7:dot', stdlib.UInt_max, '0'), v255);
  ;
  ;
  const txn2 = await (ctc.sendrecv({
    args: [v248, v249, v250, v251, v256],
    evt_cnt: 0,
    funcNum: 1,
    lct: v252,
    onlyIf: true,
    out_tys: [],
    pay: [stdlib.checkedBigNumberify('./nft-contract/index.rsh:34:7:dot', stdlib.UInt_max, '0'), [[stdlib.checkedBigNumberify('./nft-contract/index.rsh:34:13:decimal', stdlib.UInt_max, '1'), v249]]],
    sim_p: (async (txn2) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [], secs: v260, time: v259, didSend: v38, from: v258 } = txn2;
      
      ;
      const v261 = v256[stdlib.checkedBigNumberify('./nft-contract/index.rsh:34:7:dot', stdlib.UInt_max, '0')];
      const v262 = v261[stdlib.checkedBigNumberify('./nft-contract/index.rsh:34:7:dot', stdlib.UInt_max, '0')];
      const v263 = stdlib.add(v262, stdlib.checkedBigNumberify('./nft-contract/index.rsh:34:13:decimal', stdlib.UInt_max, '1'));
      const v265 = stdlib.Array_set(v261, '0', v263);
      const v266 = stdlib.Array_set(v256, stdlib.checkedBigNumberify('./nft-contract/index.rsh:34:7:dot', stdlib.UInt_max, '0'), v265);
      sim_r.txns.push({
        amt: stdlib.checkedBigNumberify('./nft-contract/index.rsh:34:13:decimal', stdlib.UInt_max, '1'),
        kind: 'to',
        tok: v249
        });
      const v271 = await ctc.getContractInfo();
      
      
      const v275 = v248;
      const v276 = stdlib.checkedBigNumberify('./nft-contract/index.rsh:40:77:decimal', stdlib.UInt_max, '0');
      const v277 = false;
      const v278 = false;
      const v279 = v259;
      const v285 = v266;
      const v286 = stdlib.checkedBigNumberify('./nft-contract/index.rsh:26:5:after expr stmt', stdlib.UInt_max, '0');
      
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
  const v261 = v256[stdlib.checkedBigNumberify('./nft-contract/index.rsh:34:7:dot', stdlib.UInt_max, '0')];
  const v262 = v261[stdlib.checkedBigNumberify('./nft-contract/index.rsh:34:7:dot', stdlib.UInt_max, '0')];
  const v263 = stdlib.add(v262, stdlib.checkedBigNumberify('./nft-contract/index.rsh:34:13:decimal', stdlib.UInt_max, '1'));
  const v265 = stdlib.Array_set(v261, '0', v263);
  const v266 = stdlib.Array_set(v256, stdlib.checkedBigNumberify('./nft-contract/index.rsh:34:7:dot', stdlib.UInt_max, '0'), v265);
  ;
  const v267 = stdlib.addressEq(v248, v258);
  stdlib.assert(v267, {
    at: './nft-contract/index.rsh:34:7:dot',
    fs: [],
    msg: 'sender correct',
    who: 'Admin'
    });
  const v271 = await ctc.getContractInfo();
  stdlib.protect(ctc3, await interact.onReady(v271), {
    at: './nft-contract/index.rsh:37:23:application',
    fs: ['at ./nft-contract/index.rsh:37:23:application call to [unknown function] (defined at: ./nft-contract/index.rsh:37:23:function exp)', 'at ./nft-contract/index.rsh:37:23:application call to "liftedInteract" (defined at: ./nft-contract/index.rsh:37:23:application)'],
    msg: 'onReady',
    who: 'Admin'
    });
  
  const v274 = 'The token is on the market';
  stdlib.protect(ctc3, await interact.log(v274), {
    at: './nft-contract/index.rsh:38:19:application',
    fs: ['at ./nft-contract/index.rsh:38:19:application call to [unknown function] (defined at: ./nft-contract/index.rsh:38:19:function exp)', 'at ./nft-contract/index.rsh:38:19:application call to "liftedInteract" (defined at: ./nft-contract/index.rsh:38:19:application)'],
    msg: 'log',
    who: 'Admin'
    });
  
  let v275 = v248;
  let v276 = stdlib.checkedBigNumberify('./nft-contract/index.rsh:40:77:decimal', stdlib.UInt_max, '0');
  let v277 = false;
  let v278 = false;
  let v279 = v259;
  let v285 = v266;
  let v286 = stdlib.checkedBigNumberify('./nft-contract/index.rsh:26:5:after expr stmt', stdlib.UInt_max, '0');
  
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
          at: './nft-contract/index.rsh:62:24:application',
          fs: ['at ./nft-contract/index.rsh:60:15:application call to [unknown function] (defined at: ./nft-contract/index.rsh:60:15:function exp)'],
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
  const v379 = v285[stdlib.checkedBigNumberify('./nft-contract/index.rsh:70:26:application', stdlib.UInt_max, '0')];
  const v380 = v379[stdlib.checkedBigNumberify('./nft-contract/index.rsh:70:26:application', stdlib.UInt_max, '0')];
  const v384 = stdlib.sub(v380, stdlib.checkedBigNumberify('./nft-contract/index.rsh:70:14:decimal', stdlib.UInt_max, '1'));
  const v386 = stdlib.Array_set(v379, '0', v384);
  const v387 = stdlib.Array_set(v285, stdlib.checkedBigNumberify('./nft-contract/index.rsh:70:26:application', stdlib.UInt_max, '0'), v386);
  ;
  stdlib.protect(ctc3, await interact.onSoldOrWithdrawn(), {
    at: './nft-contract/index.rsh:72:33:application',
    fs: ['at ./nft-contract/index.rsh:72:33:application call to [unknown function] (defined at: ./nft-contract/index.rsh:72:33:function exp)', 'at ./nft-contract/index.rsh:72:33:application call to "liftedInteract" (defined at: ./nft-contract/index.rsh:72:33:application)'],
    msg: 'onSoldOrWithdrawn',
    who: 'Admin'
    });
  
  if (v278) {
    const v390 = 'The token has been withdrawn';
    stdlib.protect(ctc3, await interact.log(v390), {
      at: './nft-contract/index.rsh:75:23:application',
      fs: ['at ./nft-contract/index.rsh:75:23:application call to [unknown function] (defined at: ./nft-contract/index.rsh:75:23:function exp)', 'at ./nft-contract/index.rsh:75:23:application call to "liftedInteract" (defined at: ./nft-contract/index.rsh:75:23:application)'],
      msg: 'log',
      who: 'Admin'
      });
    
    }
  else {
    const v392 = 'The token has been sold';
    stdlib.protect(ctc3, await interact.log(v392), {
      at: './nft-contract/index.rsh:77:23:application',
      fs: ['at ./nft-contract/index.rsh:77:23:application call to [unknown function] (defined at: ./nft-contract/index.rsh:77:23:function exp)', 'at ./nft-contract/index.rsh:77:23:application call to "liftedInteract" (defined at: ./nft-contract/index.rsh:77:23:application)'],
      msg: 'log',
      who: 'Admin'
      });
    
    }
  const v394 = 'The market is closing down....';
  stdlib.protect(ctc3, await interact.log(v394), {
    at: './nft-contract/index.rsh:80:19:application',
    fs: ['at ./nft-contract/index.rsh:80:19:application call to [unknown function] (defined at: ./nft-contract/index.rsh:80:19:function exp)', 'at ./nft-contract/index.rsh:80:19:application call to "liftedInteract" (defined at: ./nft-contract/index.rsh:80:19:application)'],
    msg: 'log',
    who: 'Admin'
    });
  
  const v396 = stdlib.eq(v378, stdlib.checkedBigNumberify('./nft-contract/index.rsh:82:26:decimal', stdlib.UInt_max, '0'));
  stdlib.assert(v396, {
    at: './nft-contract/index.rsh:82:12:application',
    fs: [],
    msg: null,
    who: 'Admin'
    });
  const v397 = v387[stdlib.checkedBigNumberify('./nft-contract/index.rsh:83:20:application', stdlib.UInt_max, '0')];
  const v398 = v397[stdlib.checkedBigNumberify('./nft-contract/index.rsh:83:20:application', stdlib.UInt_max, '0')];
  const v399 = stdlib.eq(v398, stdlib.checkedBigNumberify('./nft-contract/index.rsh:83:31:decimal', stdlib.UInt_max, '0'));
  stdlib.assert(v399, {
    at: './nft-contract/index.rsh:83:12:application',
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
    fs: ['at ./nft-contract/index.rsh:46:13:application call to [unknown function] (defined at: ./nft-contract/index.rsh:46:13:function exp)', 'at ./nft-contract/index.rsh:40:58:application call to "runMarket_buy0_70" (defined at: ./nft-contract/index.rsh:46:13:function exp)', 'at ./nft-contract/index.rsh:40:58:application call to [unknown function] (defined at: ./nft-contract/index.rsh:40:58:function exp)'],
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
          at: './nft-contract/index.rsh:47:13:application',
          fs: ['at ./nft-contract/index.rsh:47:13:application call to [unknown function] (defined at: ./nft-contract/index.rsh:47:13:function exp)', 'at ./nft-contract/index.rsh:50:18:application call to "k" (defined at: ./nft-contract/index.rsh:49:15:function exp)', 'at ./nft-contract/index.rsh:49:15:application call to [unknown function] (defined at: ./nft-contract/index.rsh:49:15:function exp)'],
          msg: 'out',
          who: 'Market_buy'
          });
        }
      else {
        }
      
      const v337 = stdlib.safeAdd(v250, v276);
      const v616 = stdlib.sub(v326, v337);
      ;
      const v617 = v285[stdlib.checkedBigNumberify('./nft-contract/index.rsh:70:26:application', stdlib.UInt_max, '0')];
      const v618 = v617[stdlib.checkedBigNumberify('./nft-contract/index.rsh:70:26:application', stdlib.UInt_max, '0')];
      const v619 = stdlib.sub(v618, stdlib.checkedBigNumberify('./nft-contract/index.rsh:70:14:decimal', stdlib.UInt_max, '1'));
      const v620 = stdlib.Array_set(v617, '0', v619);
      const v621 = stdlib.Array_set(v285, stdlib.checkedBigNumberify('./nft-contract/index.rsh:70:26:application', stdlib.UInt_max, '0'), v620);
      ;
      const v622 = stdlib.eq(v616, stdlib.checkedBigNumberify('./nft-contract/index.rsh:82:26:decimal', stdlib.UInt_max, '0'));
      stdlib.assert(v622, {
        at: './nft-contract/index.rsh:82:12:application',
        fs: [],
        msg: null,
        who: 'Market_buy'
        });
      const v623 = v621[stdlib.checkedBigNumberify('./nft-contract/index.rsh:83:20:application', stdlib.UInt_max, '0')];
      const v624 = v623[stdlib.checkedBigNumberify('./nft-contract/index.rsh:83:20:application', stdlib.UInt_max, '0')];
      const v625 = stdlib.eq(v624, stdlib.checkedBigNumberify('./nft-contract/index.rsh:83:31:decimal', stdlib.UInt_max, '0'));
      stdlib.assert(v625, {
        at: './nft-contract/index.rsh:83:12:application',
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
    fs: ['at ./nft-contract/index.rsh:56:16:application call to [unknown function] (defined at: ./nft-contract/index.rsh:56:16:function exp)', 'at ./nft-contract/index.rsh:40:58:application call to "runMarket_stop0_70" (defined at: ./nft-contract/index.rsh:54:13:function exp)', 'at ./nft-contract/index.rsh:40:58:application call to [unknown function] (defined at: ./nft-contract/index.rsh:40:58:function exp)'],
    msg: 'in',
    who: 'Market_stop'
    });
  const v308 = stdlib.addressEq(v304, v248);
  stdlib.assert(v308, {
    at: './nft-contract/index.rsh:57:23:application',
    fs: ['at ./nft-contract/index.rsh:56:16:application call to [unknown function] (defined at: ./nft-contract/index.rsh:56:16:function exp)', 'at ./nft-contract/index.rsh:56:16:application call to [unknown function] (defined at: ./nft-contract/index.rsh:56:16:function exp)', 'at ./nft-contract/index.rsh:40:58:application call to "runMarket_stop0_70" (defined at: ./nft-contract/index.rsh:54:13:function exp)', 'at ./nft-contract/index.rsh:40:58:application call to [unknown function] (defined at: ./nft-contract/index.rsh:40:58:function exp)'],
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
    pay: [stdlib.checkedBigNumberify('./nft-contract/index.rsh:59:19:decimal', stdlib.UInt_max, '0'), []],
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
        at: './nft-contract/index.rsh:62:24:application',
        fs: ['at ./nft-contract/index.rsh:60:15:application call to [unknown function] (defined at: ./nft-contract/index.rsh:60:15:function exp)'],
        msg: null,
        who: 'Market_stop'
        });
      const v369 = await txn1.getOutput('Market_stop', 'v368', ctc3, v368);
      if (v149) {
        stdlib.protect(ctc8, await interact.out(v347, v369), {
          at: './nft-contract/index.rsh:55:13:application',
          fs: ['at ./nft-contract/index.rsh:55:13:application call to [unknown function] (defined at: ./nft-contract/index.rsh:55:13:function exp)', 'at ./nft-contract/index.rsh:63:18:application call to "k" (defined at: ./nft-contract/index.rsh:60:15:function exp)', 'at ./nft-contract/index.rsh:60:15:application call to [unknown function] (defined at: ./nft-contract/index.rsh:60:15:function exp)'],
          msg: 'out',
          who: 'Market_stop'
          });
        }
      else {
        }
      
      const v673 = stdlib.sub(v286, v276);
      ;
      const v674 = v285[stdlib.checkedBigNumberify('./nft-contract/index.rsh:70:26:application', stdlib.UInt_max, '0')];
      const v675 = v674[stdlib.checkedBigNumberify('./nft-contract/index.rsh:70:26:application', stdlib.UInt_max, '0')];
      const v676 = stdlib.sub(v675, stdlib.checkedBigNumberify('./nft-contract/index.rsh:70:14:decimal', stdlib.UInt_max, '1'));
      const v677 = stdlib.Array_set(v674, '0', v676);
      const v678 = stdlib.Array_set(v285, stdlib.checkedBigNumberify('./nft-contract/index.rsh:70:26:application', stdlib.UInt_max, '0'), v677);
      ;
      const v679 = stdlib.eq(v673, stdlib.checkedBigNumberify('./nft-contract/index.rsh:82:26:decimal', stdlib.UInt_max, '0'));
      stdlib.assert(v679, {
        at: './nft-contract/index.rsh:82:12:application',
        fs: [],
        msg: null,
        who: 'Market_stop'
        });
      const v680 = v678[stdlib.checkedBigNumberify('./nft-contract/index.rsh:83:20:application', stdlib.UInt_max, '0')];
      const v681 = v680[stdlib.checkedBigNumberify('./nft-contract/index.rsh:83:20:application', stdlib.UInt_max, '0')];
      const v682 = stdlib.eq(v681, stdlib.checkedBigNumberify('./nft-contract/index.rsh:83:31:decimal', stdlib.UInt_max, '0'));
      stdlib.assert(v682, {
        at: './nft-contract/index.rsh:83:12:application',
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
    pure: [`View_token()uint64`],
    sigs: [`Market_buy()(address,uint64,uint64)`, `Market_stop()byte`, `View_token()uint64`, `_reachp_0((uint64,uint64,uint64,address))void`, `_reachp_1((uint64))void`, `_reachp_3((uint64,(byte,byte[0])))void`]
    },
  GlobalNumByteSlice: 3,
  GlobalNumUint: 0,
  LocalNumByteSlice: 0,
  LocalNumUint: 0,
  appApproval: `CCAHAAEECKCNBiAoJgMAAQABATEYQQKSKGRJIls1ASVbNQIpZCpkUIIGBEjgtzwEe+eVkAS0WQAzBND+hikE39kjKATr7fVxNhoAjgYAOwIrAAECRgI7AEsAgQmvNQskNAESRIgDATQLIls1DDQLVwgBNQ2ABAmr1aQ0DBZQNA1QsDQMiALTNA0iVY0CAqYCqUL/xYAJAAAAAAAAAAABNQtC/7s0ASQSRIgCvDQXFjUEMRkiEkSABBUffHU0BFCwI0M0FogC6DEANBYWUDQXFlA1C4AIAAAAAAAAAUg0C1CwNAs1BDEANBY0EwgjIjIGNA40Fgg1DjUQNRE1EjUTNRQ0ERQ0EhQQQQHANBg0FxZQNBYWUDQVUDQUUDQTFlA0D1A0DhZQJDIGNQI1ASlLAVcAf2cqTFd/EmcoNAEWNAIWUGcxGSISRIgCVDQDQP9wQv9jMQA0GBJJNQtEgAgAAAAAAAABcDQLFlEHCFCwNAsWUQcINQQiIzIGNRA1ETUSQv9+MQA1GDQLIls1DDQLJVs1FzQLgRBbNRY0C1cYIDUVgAS/tIltNAwWUDQXFlA0FhZQNBVQsDQMiAGegRGvSTULSVcAESWvXABcADUNIQSIAcYiNBcyCogBiTQYNBcWUDQWFlA0FVA0DVCBMK9QIzIGQv80IzQBEkRJVwAgNRhJIQVbNRdJIQZbNRZJVzAgNRVXUBE1DTQLFzUMgATVFRkUNAwWULA0DIgBLjQNVwARNQsjNBcxFjQAIwhJNQAJRwM4FDIKEkQ4ECQSRDgRTwISRDgSEkQ0GDEAEkQ0GCIiIjIGNA00C0kiWyMIFlwAXAAiNQ41DzUQNRE1EjUTNRRC/n2IAM8hBIgBDTYaATULQv7viAC/NhoBNQtC/1aIALQ2GgE1C0L9tSIxNBJEgQMxNRJEIjE2EkQiMTcSRIgAlIGRAa8iIkL+XjQTNBWIANk0D1cAETULIzQXNBSIAIM0DjQTCSISRDQPNAtJIlsjCRZcAFwAVwARIlsiEkQiNBcyCjIJiADIMRmBBRJEiACNIjIKMgmIALFC/i4isgEjshCyB7IIs4kisgEkshCyFLIRshKziUL9iEL+FkiJTAlJNQYyCYgAYokJSUH/7kk1BogAWokjNQOJSSISTDQCEhFEibFC/8FJVwAgNRhJIQVbNRdJIQZbNRZJVzAgNRVJV1AgNRRJgXBbNRNJV3gRNQ+BiQFbNQ6JNAYINQaJNAY0B0oPQf+XQv+fsUL/bjEWNAAjCEk1AAlHAjgHMgoSRDgQIxJEOAgSRImxsglC/0yxshVC/1I=`,
  appApprovalMap: {
    0: `2`,
    1: `2`,
    10: `2`,
    100: `36`,
    101: `36`,
    102: `36`,
    103: `37`,
    104: `37`,
    105: `38`,
    106: `39`,
    107: `40`,
    108: `40`,
    109: `41`,
    11: `2`,
    110: `41`,
    111: `42`,
    112: `42`,
    113: `42`,
    114: `43`,
    115: `43`,
    116: `44`,
    117: `44`,
    118: `44`,
    119: `44`,
    12: `2`,
    120: `44`,
    121: `44`,
    122: `45`,
    123: `45`,
    124: `46`,
    125: `47`,
    126: `48`,
    127: `48`,
    128: `49`,
    129: `50`,
    13: `2`,
    130: `52`,
    131: `52`,
    132: `53`,
    133: `53`,
    134: `53`,
    135: `54`,
    136: `54`,
    137: `55`,
    138: `56`,
    139: `57`,
    14: `2`,
    140: `57`,
    141: `57`,
    142: `57`,
    143: `57`,
    144: `57`,
    145: `58`,
    146: `58`,
    147: `58`,
    148: `61`,
    149: `61`,
    15: `2`,
    150: `61`,
    151: `61`,
    152: `61`,
    153: `61`,
    154: `61`,
    155: `61`,
    156: `61`,
    157: `61`,
    158: `61`,
    159: `62`,
    16: `2`,
    160: `62`,
    161: `63`,
    162: `63`,
    163: `63`,
    164: `66`,
    165: `66`,
    166: `67`,
    167: `68`,
    168: `69`,
    169: `72`,
    17: `2`,
    170: `72`,
    171: `72`,
    172: `73`,
    173: `73`,
    174: `74`,
    175: `75`,
    176: `75`,
    177: `77`,
    178: `77`,
    179: `78`,
    18: `2`,
    180: `79`,
    181: `80`,
    182: `83`,
    183: `83`,
    184: `83`,
    185: `83`,
    186: `83`,
    187: `83`,
    188: `84`,
    189: `84`,
    19: `4`,
    190: `85`,
    191: `86`,
    192: `88`,
    193: `89`,
    194: `91`,
    195: `91`,
    196: `92`,
    197: `92`,
    198: `92`,
    199: `95`,
    2: `2`,
    20: `4`,
    200: `95`,
    201: `96`,
    202: `96`,
    203: `97`,
    204: `98`,
    205: `99`,
    206: `99`,
    207: `100`,
    208: `101`,
    209: `102`,
    21: `5`,
    210: `102`,
    211: `103`,
    212: `103`,
    213: `103`,
    214: `103`,
    215: `103`,
    216: `103`,
    217: `103`,
    218: `103`,
    219: `103`,
    22: `5`,
    220: `103`,
    221: `104`,
    222: `104`,
    223: `105`,
    224: `106`,
    225: `107`,
    226: `107`,
    227: `108`,
    228: `108`,
    229: `109`,
    23: `5`,
    230: `109`,
    231: `110`,
    232: `110`,
    233: `111`,
    234: `111`,
    235: `112`,
    236: `113`,
    237: `114`,
    238: `115`,
    239: `115`,
    24: `6`,
    240: `116`,
    241: `116`,
    242: `117`,
    243: `117`,
    244: `118`,
    245: `119`,
    246: `119`,
    247: `120`,
    248: `120`,
    249: `121`,
    25: `7`,
    250: `121`,
    251: `122`,
    252: `122`,
    253: `123`,
    254: `123`,
    255: `124`,
    256: `124`,
    257: `126`,
    258: `126`,
    259: `127`,
    26: `8`,
    260: `128`,
    261: `128`,
    262: `129`,
    263: `130`,
    264: `131`,
    265: `131`,
    266: `131`,
    267: `133`,
    268: `133`,
    269: `134`,
    27: `9`,
    270: `134`,
    271: `135`,
    272: `136`,
    273: `137`,
    274: `137`,
    275: `138`,
    276: `139`,
    277: `140`,
    278: `140`,
    279: `141`,
    28: `10`,
    280: `142`,
    281: `142`,
    282: `143`,
    283: `144`,
    284: `144`,
    285: `145`,
    286: `146`,
    287: `147`,
    288: `147`,
    289: `148`,
    29: `11`,
    290: `149`,
    291: `149`,
    292: `150`,
    293: `151`,
    294: `152`,
    295: `153`,
    296: `153`,
    297: `155`,
    298: `155`,
    299: `156`,
    3: `2`,
    30: `11`,
    300: `156`,
    301: `157`,
    302: `158`,
    303: `158`,
    304: `159`,
    305: `159`,
    306: `159`,
    307: `160`,
    308: `161`,
    309: `162`,
    31: `12`,
    310: `163`,
    311: `163`,
    312: `163`,
    313: `164`,
    314: `165`,
    315: `166`,
    316: `166`,
    317: `167`,
    318: `168`,
    319: `168`,
    32: `13`,
    320: `169`,
    321: `170`,
    322: `171`,
    323: `172`,
    324: `172`,
    325: `173`,
    326: `174`,
    327: `175`,
    328: `177`,
    329: `177`,
    33: `14`,
    330: `177`,
    331: `179`,
    332: `179`,
    333: `180`,
    334: `180`,
    335: `180`,
    336: `181`,
    337: `181`,
    338: `181`,
    339: `183`,
    34: `14`,
    340: `183`,
    341: `184`,
    342: `184`,
    343: `185`,
    344: `186`,
    345: `187`,
    346: `187`,
    347: `188`,
    348: `192`,
    349: `192`,
    35: `15`,
    350: `192`,
    351: `192`,
    352: `192`,
    353: `192`,
    354: `192`,
    355: `192`,
    356: `192`,
    357: `192`,
    358: `193`,
    359: `193`,
    36: `16`,
    360: `194`,
    361: `195`,
    362: `195`,
    363: `195`,
    364: `196`,
    365: `197`,
    366: `198`,
    367: `198`,
    368: `199`,
    369: `200`,
    37: `17`,
    370: `200`,
    371: `200`,
    372: `201`,
    373: `201`,
    374: `202`,
    375: `203`,
    376: `204`,
    377: `204`,
    378: `205`,
    379: `205`,
    38: `18`,
    380: `206`,
    381: `206`,
    382: `207`,
    383: `207`,
    384: `208`,
    385: `208`,
    386: `208`,
    387: `210`,
    388: `210`,
    389: `211`,
    39: `19`,
    390: `211`,
    391: `212`,
    392: `212`,
    393: `213`,
    394: `214`,
    395: `215`,
    396: `215`,
    397: `216`,
    398: `216`,
    399: `217`,
    4: `2`,
    40: `21`,
    400: `218`,
    401: `219`,
    402: `219`,
    403: `220`,
    404: `220`,
    405: `221`,
    406: `221`,
    407: `222`,
    408: `223`,
    409: `223`,
    41: `21`,
    410: `224`,
    411: `224`,
    412: `225`,
    413: `225`,
    414: `225`,
    415: `226`,
    416: `226`,
    417: `227`,
    418: `227`,
    419: `227`,
    42: `21`,
    420: `227`,
    421: `227`,
    422: `227`,
    423: `228`,
    424: `228`,
    425: `229`,
    426: `230`,
    427: `231`,
    428: `231`,
    429: `232`,
    43: `21`,
    430: `233`,
    431: `234`,
    432: `234`,
    433: `235`,
    434: `236`,
    435: `237`,
    436: `237`,
    437: `238`,
    438: `239`,
    439: `241`,
    44: `21`,
    440: `241`,
    441: `242`,
    442: `242`,
    443: `242`,
    444: `243`,
    445: `243`,
    446: `244`,
    447: `245`,
    448: `246`,
    449: `246`,
    45: `21`,
    450: `247`,
    451: `248`,
    452: `248`,
    453: `248`,
    454: `249`,
    455: `250`,
    456: `251`,
    457: `251`,
    458: `252`,
    459: `252`,
    46: `21`,
    460: `253`,
    461: `253`,
    462: `254`,
    463: `254`,
    464: `255`,
    465: `255`,
    466: `255`,
    467: `256`,
    468: `258`,
    469: `258`,
    47: `21`,
    470: `259`,
    471: `259`,
    472: `260`,
    473: `260`,
    474: `260`,
    475: `262`,
    476: `262`,
    477: `263`,
    478: `263`,
    479: `264`,
    48: `21`,
    480: `265`,
    481: `266`,
    482: `266`,
    483: `267`,
    484: `268`,
    485: `269`,
    486: `269`,
    487: `270`,
    488: `271`,
    489: `271`,
    49: `21`,
    490: `272`,
    491: `273`,
    492: `273`,
    493: `274`,
    494: `275`,
    495: `276`,
    496: `277`,
    497: `277`,
    498: `278`,
    499: `278`,
    5: `2`,
    50: `21`,
    500: `278`,
    501: `280`,
    502: `281`,
    503: `281`,
    504: `282`,
    505: `283`,
    506: `285`,
    507: `286`,
    508: `286`,
    509: `286`,
    51: `21`,
    510: `287`,
    511: `287`,
    512: `288`,
    513: `289`,
    514: `289`,
    515: `290`,
    516: `291`,
    517: `291`,
    518: `292`,
    519: `293`,
    52: `21`,
    520: `293`,
    521: `294`,
    522: `295`,
    523: `295`,
    524: `296`,
    525: `297`,
    526: `297`,
    527: `297`,
    528: `298`,
    529: `298`,
    53: `21`,
    530: `299`,
    531: `299`,
    532: `299`,
    533: `300`,
    534: `300`,
    535: `301`,
    536: `301`,
    537: `302`,
    538: `303`,
    539: `303`,
    54: `21`,
    540: `304`,
    541: `304`,
    542: `304`,
    543: `304`,
    544: `304`,
    545: `304`,
    546: `305`,
    547: `305`,
    548: `306`,
    549: `307`,
    55: `21`,
    550: `308`,
    551: `310`,
    552: `310`,
    553: `311`,
    554: `311`,
    555: `311`,
    556: `312`,
    557: `312`,
    558: `313`,
    559: `313`,
    56: `21`,
    560: `313`,
    561: `314`,
    562: `314`,
    563: `315`,
    564: `316`,
    565: `316`,
    566: `319`,
    567: `319`,
    568: `320`,
    569: `320`,
    57: `21`,
    570: `321`,
    571: `322`,
    572: `323`,
    573: `324`,
    574: `324`,
    575: `325`,
    576: `326`,
    577: `326`,
    578: `327`,
    579: `327`,
    58: `21`,
    580: `328`,
    581: `328`,
    582: `329`,
    583: `330`,
    584: `331`,
    585: `331`,
    586: `332`,
    587: `333`,
    588: `334`,
    589: `335`,
    59: `21`,
    590: `335`,
    591: `336`,
    592: `336`,
    593: `337`,
    594: `338`,
    595: `339`,
    596: `339`,
    597: `340`,
    598: `341`,
    599: `344`,
    6: `2`,
    60: `21`,
    600: `344`,
    601: `345`,
    602: `345`,
    603: `346`,
    604: `347`,
    605: `350`,
    606: `350`,
    607: `351`,
    608: `352`,
    609: `353`,
    61: `21`,
    610: `354`,
    611: `354`,
    612: `355`,
    613: `355`,
    614: `356`,
    615: `356`,
    616: `357`,
    617: `358`,
    618: `359`,
    619: `360`,
    62: `21`,
    620: `361`,
    621: `362`,
    622: `363`,
    623: `363`,
    624: `364`,
    625: `364`,
    626: `365`,
    627: `366`,
    628: `366`,
    629: `367`,
    63: `21`,
    630: `367`,
    631: `368`,
    632: `368`,
    633: `369`,
    634: `369`,
    635: `370`,
    636: `370`,
    637: `371`,
    638: `371`,
    639: `372`,
    64: `21`,
    640: `372`,
    641: `373`,
    642: `373`,
    643: `373`,
    644: `375`,
    645: `375`,
    646: `375`,
    647: `376`,
    648: `376`,
    649: `377`,
    65: `21`,
    650: `377`,
    651: `377`,
    652: `378`,
    653: `378`,
    654: `378`,
    655: `379`,
    656: `379`,
    657: `380`,
    658: `380`,
    659: `380`,
    66: `21`,
    660: `382`,
    661: `382`,
    662: `382`,
    663: `383`,
    664: `383`,
    665: `383`,
    666: `384`,
    667: `384`,
    668: `385`,
    669: `385`,
    67: `21`,
    670: `385`,
    671: `387`,
    672: `387`,
    673: `387`,
    674: `388`,
    675: `388`,
    676: `388`,
    677: `389`,
    678: `389`,
    679: `390`,
    68: `21`,
    680: `390`,
    681: `390`,
    682: `392`,
    683: `393`,
    684: `393`,
    685: `394`,
    686: `395`,
    687: `396`,
    688: `396`,
    689: `397`,
    69: `21`,
    690: `397`,
    691: `398`,
    692: `399`,
    693: `400`,
    694: `401`,
    695: `401`,
    696: `402`,
    697: `403`,
    698: `404`,
    699: `405`,
    7: `2`,
    70: `21`,
    700: `405`,
    701: `406`,
    702: `407`,
    703: `408`,
    704: `408`,
    705: `408`,
    706: `409`,
    707: `409`,
    708: `409`,
    709: `410`,
    71: `21`,
    710: `411`,
    711: `412`,
    712: `413`,
    713: `413`,
    714: `413`,
    715: `415`,
    716: `415`,
    717: `417`,
    718: `417`,
    719: `418`,
    72: `22`,
    720: `418`,
    721: `418`,
    722: `419`,
    723: `419`,
    724: `420`,
    725: `420`,
    726: `420`,
    727: `421`,
    728: `421`,
    729: `422`,
    73: `22`,
    730: `424`,
    731: `424`,
    732: `426`,
    733: `426`,
    734: `427`,
    735: `427`,
    736: `427`,
    737: `428`,
    738: `428`,
    739: `429`,
    74: `22`,
    740: `429`,
    741: `430`,
    742: `431`,
    743: `432`,
    744: `433`,
    745: `436`,
    746: `436`,
    747: `437`,
    748: `437`,
    749: `438`,
    75: `23`,
    750: `439`,
    751: `440`,
    752: `441`,
    753: `442`,
    754: `443`,
    755: `444`,
    756: `444`,
    757: `445`,
    758: `445`,
    759: `446`,
    76: `23`,
    760: `446`,
    761: `446`,
    762: `447`,
    763: `448`,
    764: `449`,
    765: `450`,
    766: `451`,
    767: `455`,
    768: `456`,
    769: `456`,
    77: `23`,
    770: `457`,
    771: `457`,
    772: `458`,
    773: `458`,
    774: `459`,
    775: `459`,
    776: `459`,
    777: `461`,
    778: `461`,
    779: `462`,
    78: `23`,
    780: `462`,
    781: `463`,
    782: `464`,
    783: `466`,
    784: `466`,
    785: `466`,
    786: `468`,
    787: `469`,
    788: `469`,
    789: `470`,
    79: `23`,
    790: `470`,
    791: `471`,
    792: `471`,
    793: `471`,
    794: `472`,
    795: `472`,
    796: `472`,
    797: `474`,
    798: `475`,
    799: `475`,
    8: `2`,
    80: `23`,
    800: `476`,
    801: `477`,
    802: `477`,
    803: `478`,
    804: `478`,
    805: `479`,
    806: `479`,
    807: `480`,
    808: `481`,
    809: `483`,
    81: `23`,
    810: `484`,
    811: `484`,
    812: `485`,
    813: `486`,
    814: `486`,
    815: `487`,
    816: `487`,
    817: `488`,
    818: `488`,
    819: `489`,
    82: `23`,
    820: `489`,
    821: `490`,
    822: `491`,
    823: `493`,
    824: `493`,
    825: `493`,
    826: `495`,
    827: `495`,
    828: `495`,
    829: `497`,
    83: `23`,
    830: `498`,
    831: `500`,
    832: `501`,
    833: `502`,
    834: `503`,
    835: `503`,
    836: `504`,
    837: `504`,
    838: `505`,
    839: `505`,
    84: `23`,
    840: `505`,
    841: `506`,
    842: `508`,
    843: `509`,
    844: `510`,
    845: `510`,
    846: `510`,
    847: `511`,
    848: `512`,
    849: `512`,
    85: `23`,
    850: `513`,
    851: `513`,
    852: `513`,
    853: `514`,
    854: `516`,
    855: `517`,
    856: `517`,
    857: `518`,
    858: `520`,
    859: `521`,
    86: `23`,
    860: `522`,
    861: `523`,
    862: `524`,
    863: `524`,
    864: `525`,
    865: `526`,
    866: `527`,
    867: `528`,
    868: `530`,
    869: `531`,
    87: `23`,
    870: `531`,
    871: `531`,
    872: `533`,
    873: `534`,
    874: `534`,
    875: `534`,
    876: `535`,
    877: `535`,
    878: `536`,
    879: `537`,
    88: `23`,
    880: `537`,
    881: `538`,
    882: `539`,
    883: `539`,
    884: `540`,
    885: `541`,
    886: `541`,
    887: `542`,
    888: `543`,
    889: `543`,
    89: `25`,
    890: `544`,
    891: `545`,
    892: `545`,
    893: `545`,
    894: `546`,
    895: `546`,
    896: `547`,
    897: `548`,
    898: `548`,
    899: `548`,
    9: `2`,
    90: `28`,
    900: `549`,
    901: `549`,
    902: `550`,
    903: `551`,
    904: `551`,
    905: `552`,
    906: `553`,
    907: `553`,
    908: `554`,
    909: `555`,
    91: `28`,
    910: `555`,
    911: `555`,
    912: `556`,
    913: `556`,
    914: `557`,
    915: `557`,
    916: `557`,
    917: `558`,
    918: `559`,
    919: `559`,
    92: `29`,
    920: `560`,
    921: `562`,
    922: `562`,
    923: `563`,
    924: `564`,
    925: `564`,
    926: `565`,
    927: `567`,
    928: `567`,
    929: `568`,
    93: `30`,
    930: `568`,
    931: `569`,
    932: `570`,
    933: `571`,
    934: `571`,
    935: `571`,
    936: `572`,
    937: `572`,
    938: `572`,
    939: `574`,
    94: `30`,
    940: `575`,
    941: `575`,
    942: `575`,
    943: `578`,
    944: `578`,
    945: `579`,
    946: `579`,
    947: `580`,
    948: `581`,
    949: `582`,
    95: `32`,
    950: `583`,
    951: `583`,
    952: `584`,
    953: `585`,
    954: `585`,
    955: `586`,
    956: `586`,
    957: `587`,
    958: `587`,
    959: `588`,
    96: `33`,
    960: `589`,
    961: `590`,
    962: `590`,
    963: `591`,
    964: `592`,
    965: `593`,
    966: `594`,
    967: `594`,
    968: `595`,
    969: `596`,
    97: `33`,
    970: `597`,
    971: `599`,
    972: `600`,
    973: `600`,
    974: `601`,
    975: `601`,
    976: `601`,
    977: `603`,
    978: `604`,
    979: `604`,
    98: `34`,
    980: `605`,
    99: `35`
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
  ABI: `[{"inputs":[{"components":[{"internalType":"uint256","name":"elem0","type":"uint256"},{"internalType":"address payable","name":"elem1","type":"address"},{"internalType":"uint256","name":"elem2","type":"uint256"},{"internalType":"address payable","name":"elem3","type":"address"}],"internalType":"struct T7","name":"v695","type":"tuple"}],"stateMutability":"payable","type":"constructor"},{"inputs":[{"internalType":"uint256","name":"msg","type":"uint256"}],"name":"ReachError","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_who","type":"address"},{"components":[{"internalType":"uint256","name":"elem0","type":"uint256"},{"internalType":"address payable","name":"elem1","type":"address"},{"internalType":"uint256","name":"elem2","type":"uint256"},{"internalType":"address payable","name":"elem3","type":"address"}],"indexed":false,"internalType":"struct T7","name":"_a","type":"tuple"}],"name":"_reach_e0","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_who","type":"address"},{"components":[{"internalType":"uint256","name":"elem0","type":"uint256"}],"indexed":false,"internalType":"struct T9","name":"_a","type":"tuple"}],"name":"_reach_e1","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_who","type":"address"},{"components":[{"internalType":"uint256","name":"elem0","type":"uint256"},{"components":[{"internalType":"enum _enum_T2","name":"which","type":"uint8"},{"internalType":"bool","name":"_Market_buy0_70","type":"bool"},{"internalType":"bool","name":"_Market_stop0_70","type":"bool"}],"internalType":"struct T2","name":"elem1","type":"tuple"}],"indexed":false,"internalType":"struct T3","name":"_a","type":"tuple"}],"name":"_reach_e3","type":"event"},{"anonymous":false,"inputs":[{"components":[{"internalType":"address payable","name":"elem0","type":"address"},{"internalType":"uint256","name":"elem1","type":"uint256"},{"internalType":"address payable","name":"elem2","type":"address"}],"indexed":false,"internalType":"struct T0","name":"v0","type":"tuple"}],"name":"_reach_oe_v328","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"bool","name":"v0","type":"bool"}],"name":"_reach_oe_v368","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"Market_buy","outputs":[{"components":[{"internalType":"address payable","name":"elem0","type":"address"},{"internalType":"uint256","name":"elem1","type":"uint256"},{"internalType":"address payable","name":"elem2","type":"address"}],"internalType":"struct T0","name":"","type":"tuple"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"Market_stop","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"View_token","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_reachCreationTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_reachCurrentState","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"_reachCurrentTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"elem0","type":"uint256"}],"internalType":"struct T9","name":"v698","type":"tuple"}],"name":"_reachp_1","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"uint256","name":"elem0","type":"uint256"},{"components":[{"internalType":"enum _enum_T2","name":"which","type":"uint8"},{"internalType":"bool","name":"_Market_buy0_70","type":"bool"},{"internalType":"bool","name":"_Market_stop0_70","type":"bool"}],"internalType":"struct T2","name":"elem1","type":"tuple"}],"internalType":"struct T3","name":"v701","type":"tuple"}],"name":"_reachp_3","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}]`,
  Bytecode: `0x6080601f1962001d2c38819003601f810192909216830192916001600160401b039183851083861117620004c8578160809285926040978852833981010312620004c3578251916200005183620004de565b8051835260606020936200006785840162000516565b858201908152620000848388860151958985019687520162000516565b918381019283524360035587516200009c81620004de565b6000948186809352620000ae6200052b565b8a820152828b820152015287519488860186811088821117620004af578952620000d76200052b565b865287860195620000e76200054c565b875260ff600454166200049757895133815283518a82015284516001600160a01b03908116828d01528351606083015286518116608083015293907f143bd7eb5dd759258158818958ac9cd9e010274ba04900f209594407b18e6cdd9060a090a15180159081156200048a575b5015620004725785815152858982510152858a8251015251865152346200045a5788519360a085018581108982111762000446578a5285855288850196868852838b87019288845260608801948986528260808a0198620001b46200054c565b8a52338b5251168b52518452511683525180518b8b82015191015115158c5191620001df83620004fa565b8983528c8301528c820152620001f46200054c565b91885b60018110620003f85750508152845260018087554381558a51955184168a87015296518316858b0152516060850152511660808301525182848760a085015b828410620003ce57505050505060e08152610100810181811085821117620003ba5786528051938411620003a6576002548381811c911680156200039b575b868210146200038757601f81116200033b575b508491601f8511600114620002d2579394508492919083620002c6575b50501b916000199060031b1c1916176002555b516117709081620005bc8239f35b015192503880620002a5565b6002815285812093958591601f198316915b8883831062000320575050501062000306575b505050811b01600255620002b8565b015160001960f88460031b161c19169055388080620002f7565b858701518855909601959485019487935090810190620002e4565b60028352858320601f860160051c8101918787106200037c575b601f0160051c019084905b8281106200037057505062000288565b84815501849062000360565b909150819062000355565b634e487b7160e01b83526022600452602483fd5b90607f169062000275565b634e487b7160e01b82526041600452602482fd5b634e487b7160e01b83526041600452602483fd5b6060908b8651805183528481015185840152015115158c8201520193019101909187869162000236565b62000404818362000593565b5162000411828662000593565b526200041e818562000593565b5060001981146200043257600101620001f7565b634e487b7160e01b8a52601160045260248afd5b634e487b7160e01b87526041600452602487fd5b885163100960cb60e01b8152600a6004820152602490fd5b895163100960cb60e01b815260096004820152602490fd5b9050600154143862000154565b895163100960cb60e01b815260086004820152602490fd5b634e487b7160e01b86526041600452602486fd5b600080fd5b634e487b7160e01b600052604160045260246000fd5b608081019081106001600160401b03821117620004c857604052565b606081019081106001600160401b03821117620004c857604052565b51906001600160a01b0382168203620004c357565b604051906200053a82620004fa565b60006040838281528260208201520152565b6040519060208083016001600160401b03811184821017620004c8576040528260005b8281106200057c57505050565b8290620005886200052b565b81840152016200056f565b906001811015620005a55760051b0190565b634e487b7160e01b600052603260045260246000fdfe60806040526004361015610018575b361561001657005b005b6000803560e01c9081631e93b0f1146100bb57508063573b8510146100b257806383230757146100a9578063ab53f2c6146100a0578063af6e55f714610097578063e3a541031461008e578063f76a4d69146100855763fd70fdbe0361000e576100806104d7565b61000e565b50610080610472565b506100806103ec565b50610080610360565b506100806102e2565b506100806102c3565b506100806100da565b346100d757806003193601126100d75760035460805260206080f35b80fd5b506020806003193601126102be576100f0610757565b506102a4604091610291835191610106836105b3565b6004358352610119600160005414610db1565b610194610135610127610650565b83808251830101910161163e565b9361015161014c61014860045460ff1690565b1590565b610dd1565b8651338152815160208201527fcf0e8bec53cd91fa87ecf8f6f405ac75914a22acdb92a3553ee5c294fee8159690604090a15180159081156102b2575b50610df1565b61019e3415610e11565b6080818401936101bf6101ba6101b48751610354565b336116c1565b610e31565b6101db3360018060a01b036101d48451610354565b1614610e51565b61020b6102036101e96109ac565b966101fd6101f78551610354565b89610a25565b51610354565b848701610a25565b868101518786015261022c6102236060830151610354565b60608701610a25565b6102416102398251610354565b838701610a25565b600060a0860152600060c0860152600060e086015243610100860152015161028c815192600184510193888282015191015115159161027e6106fb565b958652850152151587840152565b611584565b6101208201526000610140820152611261565b5160008152602090f35b0390f35b9050600154143861018e565b600080fd5b50346102be5760003660031901126102be576020600154604051908152f35b50346102be576000806003193601126100d75780546102ff610650565b906040519283918252602090604082840152835191826040850152815b83811061033d57505060608094508284010152601f80199101168101030190f35b80860182015187820160600152869450810161031c565b6001600160a01b031690565b50346102be5760003660031901126102be5761037a610757565b6004600054036103d35760606102ae91610392610650565b80516001600160a01b03916020916103b191908101830190830161089d565b01511691018190526040516001600160a01b0390911681529081906020820190565b60405163100960cb60e01b815260076004820152602490fd5b5060003660031901126102be5760206040610405610757565b610439816104116107a1565b858101906001825152511515858251015261042a6107a1565b90600082525186820152610a34565b01511515604051908152f35b81516001600160a01b03908116825260208084015190830152604092830151169181019190915260600190565b5060003660031901126102be5761048761071a565b506102ae6020610495610757565b6104c9816104a16107a1565b84810190600082515251151585825101526104ba6107a1565b90600082525185820152610a34565b015160405191829182610445565b5060803660031901126102be576104ec610757565b604051906104f9826105db565b600435825260603660231901126102be5760405191610517836105f6565b6024359260028410156102be5761055693815260443561053681610816565b602082015260643561054781610816565b60408201526020820152610a34565b60405160008152602090f35b90600182811c92168015610592575b602083101461057c57565b634e487b7160e01b600052602260045260246000fd5b91607f1691610571565b50634e487b7160e01b600052604160045260246000fd5b602081019081106001600160401b038211176105ce57604052565b6105d661059c565b604052565b604081019081106001600160401b038211176105ce57604052565b606081019081106001600160401b038211176105ce57604052565b61010081019081106001600160401b038211176105ce57604052565b601f909101601f19168101906001600160401b038211908210176105ce57604052565b604051906000826002549161066483610562565b8083526001938085169081156106da575060011461068c575b5061068a9250038361062d565b565b6002600090815260008051602061174483398151915294602093509091905b8183106106c257505061068a93508201013861067d565b855488840185015294850194879450918301916106ab565b905061068a94506020925060ff191682840152151560051b8201013861067d565b60405190606082016001600160401b038111838210176105ce57604052565b60405190606082016001600160401b0381118382101761074a575b60405260006040838281528260208201520152565b61075261059c565b610735565b60405190608082016001600160401b03811183821017610794575b604052600060608382815261078561071a565b60208201528260408201520152565b61079c61059c565b610772565b604051906107ae826105db565b816000815260206107bd61071a565b910152565b600211156107cc57565b634e487b7160e01b600052602160045260246000fd5b604051906107ef826105db565b60006020836107fc61071a565b81520152565b51906001600160a01b03821682036102be57565b801515036102be57565b9080601f830112156102be5760409182519261083b846105b3565b83606093848401938185116102be57915b84831061085c5750505050505090565b85838303126102be5783518691610872826105f6565b8451825260209182860151838201528686015161088e81610816565b8782015281520192019161084c565b610140818303126102be5761012090610917604051936108bc85610611565b6108c583610802565b85526108d360208401610802565b6020860152604083015160408601526108ee60608401610802565b60608601526108ff60808401610802565b608086015260a083015160a086015260c08301610820565b60c0840152015160e082015290565b90929160209060a083019460018060a01b031683528051828401520151805160028110156107cc576080916040918285015260208101511515606085015201511515910152565b5160028110156107cc5790565b60405190610987826105b3565b8160005b60208110610997575050565b6020906109a261071a565b818401520161098b565b6040519061016082016001600160401b03811183821017610a18575b604052816101406000918281528260208201528260408201528260608201528260808201528260a08201528260c08201528260e082015282610100820152610a0e61097a565b6101208201520152565b610a2061059c565b6109c8565b6001600160a01b039091169052565b90610a3d6107e2565b90610a4c600460005414610e71565b610a54610650565b92610a6960209485808251830101910161089d565b90610a81610a7c61014860045460ff1690565b610e91565b846040917fdb327b347da4cf10605fed5096464b71b34be28d32a3eae7d454bc8f6d9404d8835180610ab4843383610926565b0390a1610acc81518015908115610d6c575b50610eb1565b01610ad7815161096d565b610ae0816107c2565b610bfc57509081610b8c61068a9660e094840195610b0087513414610f11565b610b0b338951610a25565b865182895101528180860198610b2d610b248b51610354565b87835101610a25565b7f764a36f12a043e5fa19ad108d028669c3005e1f07b40e52710bcea6f438d2c4a610b5e8251885191829182610445565b0390a151910152610b84610b706109ac565b976101fd610b7e8751610354565b8a610a25565b908701610a25565b835190850152610bab610ba26060830151610354565b60608601610a25565b610bb83360808601610a25565b610bc8835160a083015190610d8f565b60a0850152600160c08501526000828501524361010085015260c08101516101208501520151905101610140820152611261565b610c0b6001919695965161096d565b610c14816107c2565b14610c21575b5050505050565b610cb960e09382610cb2610d6298610c393415610ed1565b610c5889610c4f610c4a8a51610354565b610354565b33149201918252565b610c6a610c658251151590565b610ef1565b7fdb54220287a7ce3fd77f1b2a17e9002528357545b8fa80efe2efb2f0bd40e225610ca9610c988351151590565b855190151581529081906020820190565b0390a151151590565b1515910152565b610cec610cc46109ac565b94610cd8610cd28551610354565b87610a25565b610ce481850151610354565b908601610a25565b8082015190840152610d0d610d046060830151610354565b60608501610a25565b610d26610d1d6080830151610354565b60808501610a25565b60a081015160a0840152600060c0840152610d4382840160019052565b4361010084015260c08101516101208401520151610140820152611261565b3880808080610c1a565b90506001541438610ac6565b50634e487b7160e01b600052601160045260246000fd5b9190820191828111610da4575b82106102be57565b610dac610d78565b610d9c565b15610db857565b60405163100960cb60e01b8152600b6004820152602490fd5b15610dd857565b60405163100960cb60e01b8152600c6004820152602490fd5b15610df857565b60405163100960cb60e01b8152600d6004820152602490fd5b15610e1857565b60405163100960cb60e01b8152600e6004820152602490fd5b15610e3857565b60405163100960cb60e01b8152600f6004820152602490fd5b15610e5857565b60405163100960cb60e01b815260106004820152602490fd5b15610e7857565b60405163100960cb60e01b815260116004820152602490fd5b15610e9857565b60405163100960cb60e01b815260126004820152602490fd5b15610eb857565b60405163100960cb60e01b815260136004820152602490fd5b15610ed857565b60405163100960cb60e01b815260156004820152602490fd5b15610ef857565b60405163100960cb60e01b815260166004820152602490fd5b15610f1857565b60405163100960cb60e01b815260146004820152602490fd5b15610f3857565b60405163100960cb60e01b815260176004820152602490fd5b15610f5857565b60405163100960cb60e01b815260186004820152602490fd5b506040513d6000823e3d90fd5b906001811015610f8f5760051b0190565b634e487b7160e01b600052603260045260246000fd5b818110610fb0575050565b60008155600101610fa5565b610fc7600254610562565b80610fcf5750565b601f8111600114610fe257506000600255565b600260005261102790601f0160051c600080516020611744833981519152017f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5acf610fa5565b6000602081208160025555565b6040519061010082016001600160401b0381118382101761108b575b6040528160e06000918281528260208201528260408201528260608201528260808201528260a082015261108261097a565b60c08201520152565b61109361059c565b611050565b91909161014081019260018060a01b03808251168352602081818401511681850152604091828401518386015260609080828601511682870152608085015116608086015260a084015160a086015260c08401519060c08601916000925b600184106111115750505050505060e0610120910151910152565b84836001928885518051835284810151858401520151151589820152019201930192906110f6565b90601f8211611146575050565b61068a9160026000526020600020906020601f840160051c83019310611174575b601f0160051c0190610fa5565b9091508190611167565b80519091906001600160401b038111611254575b6111a6816111a1600254610562565b611139565b602080601f83116001146111e257508192936000926111d7575b50508160011b916000199060031b1c191617600255565b0151905038806111c0565b6002600052601f19831694909190600080516020611744833981519152926000905b87821061123c575050836001959610611223575b505050811b01600255565b015160001960f88460031b161c19169055388080611218565b80600185968294968601518155019501930190611204565b61125c61059c565b611192565b60e081015160009015611417575060005b156113345761132161132f61068a9261014061128c611034565b916112a061129a8251610354565b84610a25565b6112b96112b06020830151610354565b60208501610a25565b604081015160408401526112d3610d046060830151610354565b6112e3610d1d6080830151610354565b60a081015160a084015261012081015160c0840152015160e08201526113096004600055565b61131243600155565b60405192839160208301611098565b03601f19810183528261062d565b61117e565b6113e3610120826113a9611351610c4a60606113eb970151610354565b600080808060a087019485519082821561140e575bf115611401575b61139b61137d6020850151610354565b60808501516001600160a01b039061139490610354565b169061142d565b610140830151905114610f31565b01518051906113de60001983510192604060208201519101511515906113cd6106fb565b948552602085015215156040840152565b6115e1565b515115610f51565b600080556113f96000600155565b61068a610fbc565b611409610f71565b61136d565b506108fc611366565b60c0820151151560000361127257506001611272565b60405163a9059cbb60e01b602082019081526001600160a01b039384166024830152600160448084019190915282526114ab9360009384939092918491608081016001600160401b038111828210176114b2575b6040525193165af161149b6114946114bf565b8092611524565b506020808251830101910161150c565b156102be57565b6114ba61059c565b611481565b3d15611507573d906001600160401b0382116114fa575b604051916114ee601f8201601f19166020018461062d565b82523d6000602084013e565b61150261059c565b6114d6565b606090565b908160209103126102be575161152181610816565b90565b1561152c5790565b80511561153b57805190602001fd5b60405163100960cb60e01b815260026004820152602490fd5b1561155c5790565b80511561156b57805190602001fd5b60405163100960cb60e01b815260016004820152602490fd5b919061158e61097a565b9260005b600181106115a05750508252565b806115ad60019284610f7e565b516115b88288610f7e565b526115c38187610f7e565b5060001981146115d4575b01611592565b6115dc610d78565b6115ce565b91906115eb61097a565b9260005b600181106115fd5750508252565b8061160a60019284610f7e565b516116158288610f7e565b526116208187610f7e565b506000198114611631575b016115ef565b611639610d78565b61162b565b9060e0828203126102be57604051916116ac919060809060a085016001600160401b038111868210176116b4575b60405261167881610802565b855261168660208201610802565b6020860152604081015160408601526116a160608201610802565b606086015201610820565b608082015290565b6116bc61059c565b61166c565b6040516323b872dd60e01b602082019081526001600160a01b0392831660248301523060448301526001606480840191909152825261152193600093849391929184919060a081016001600160401b03811182821017611736575b6040525193165af161149b61172f6114bf565b8092611554565b61173e61059c565b61171c56fe405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5acea164736f6c6343000811000a`,
  BytecodeLen: 7468,
  version: 9,
  views: {
    }
  };
export const _stateSourceMap = {
  1: {
    at: './nft-contract/index.rsh:32:5:after expr stmt',
    fs: [],
    msg: null,
    who: 'Module'
    },
  3: {
    at: './nft-contract/index.rsh:85:5:after expr stmt',
    fs: [],
    msg: null,
    who: 'Module'
    },
  4: {
    at: './nft-contract/index.rsh:40:58:after expr stmt semicolon',
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
