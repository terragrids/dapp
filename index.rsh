'reach 0.1';
'use strict';

export const main =
    Reach.App(() => {
        const Creator = Participant('Creator', {
            getParams: Fun([], Object({
                name: Bytes(32),
                symbol: Bytes(8),
                url: Bytes(96),
                metadata: Bytes(32),
                supply: UInt,
                amt: UInt
            })),
            showContract: Fun(true, Null),
            showTokenAndOptIn: Fun(true, Null),
            didTransfer: Fun(true, Null),
            didPayback: Fun(true, Null),
            notifyContractClosure: Fun(true, Null)
        });

        init();

        Creator.only(() => {
            const { name, symbol, url, metadata, supply, amt } = declassify(interact.getParams());
            assume(amt <= supply);
            assume(amt <= UInt.max);
        });

        Creator.publish(name, symbol, url, metadata, supply, amt);
        require(amt <= supply);
        require(amt <= UInt.max);

        Creator.interact.showContract(getContract());

        const payload = { name, symbol, url, metadata, supply };
        const token = new Token(payload);
        Creator.interact.showTokenAndOptIn(token);
        commit();

        Creator.publish();
        transfer(amt, token).to(Creator);
        Creator.interact.didTransfer(token);
        commit();

        Creator.pay([[amt, token]]);
        commit();

        Creator.interact.didPayback(token);
        Creator.publish();
        token.burn(supply);
        token.destroy();
        commit();

        Creator.interact.notifyContractClosure();
        exit();
    });