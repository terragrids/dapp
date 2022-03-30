'reach 0.1';
'use strict';

export const main =
    Reach.App(() => {

        const Creator = Participant('Creator', {
            getId: Fun([], UInt)
        });

        const Owner = ParticipantClass('Owner', {
            newOwner: Fun([], Address),
            showOwner: Fun([UInt, Address], Null)
        });

        const vNFT = View('NFT', {
            owner: Address
        });

        init();

        Creator.only(() => {
            const id = declassify(interact.getId());
        });
        Creator.publish(id);

        var owner = Creator;
        { vNFT.owner.set(owner); };
        invariant(balance() == 0);
        while (true) {
            commit();

            Owner.only(() => {
                interact.showOwner(id, owner);
                const amOwner = this == owner;
                const newOwner =
                    amOwner ? declassify(interact.newOwner()) : this;
            });
            Owner.publish(newOwner)
                .when(amOwner)
                .timeout(false);

            check(this == owner);
            assert(this == owner);

            owner = newOwner;
            continue;
        }
        commit();
        assert(false);
    });