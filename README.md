# Terragrids DApp
The DApp web interface and Reach backend.

## Web interface
The web interface is a Next.js application. 
You can run it on a local development server with:
```bash
npm run dev
```
or you can build and start in production with:
```
npm run build
npm run start
```

## Reach backend
The Reach backend is in `index.rsh`. The current version allows a `Creator` participant to create a simple NFT and transfer its ownership to other participants. Each participant is a member of the `Owner` participant class.

The `while` loop never terminates, and it continuously allows all members of the `Owner` participant class to attempt the transfer. 

Each member of the `Owner` participant class performs the local steps within `Owner.only()`. In particular, if a member is the owner (i.e. `this == owner`), they update their local state with a public value for `newOwner` given by the frontend; otherwise, if a member is not the owner, they update their local state with the local value of `newOwner` bound to themselves (i.e. `newOwner = this`). This particular value is never going to be used, as the following consensus transfer takes place only when a member of the participant class is the owner.

Then, each member of the `Owner` participant class attempts a consensus transfer. In particular, they all try to publish `newOwner`. Each participant's consensus transfer actually takes place only if `amOwner` in their local state evaluates to `true`. If `amOwner` in their local state is `false`, their consensus transfer does not take place.

Since this consensus transfer is a race between members of a participant class that attempt to transfer, and we know that one of them has to be the current owner (i.e. `when` is not statically `false`), the `timeout` can be omitted, as one of the members of a participant class will eventually continue the `while` loop.

The next consensus computation is `check(this == owner);`, which translates to `require(this == owner);`. This claims that only the current owner can make the consensus transfer and can get this far into the `while` loop. This requirement is not an assertion that we verify logically; it is a claim that we check dynamically and then add to the verification environment as an axiom.

Also, `assert(this == owner);` statically verifies that only owners can make the transfer. If we removed `check(this == owner)`, then the assert would fail in dishonest mode, because dishonest participants could run a different program and still try to do a consensus transfer even when `when` is `false`. This because a dishonest participant could completely ignore the backend and just send messages directly to the smart contract, ignoring everything Reach provides - `when` is not part of the consensus network, it is just part of the DApp.

The `commit()` statement after the `while` block will never run, but we need it there or the compiler will error that the program is ending without calling `commit()`; this is because the verification engine needs a "syntactically" correct program to analyze and the compiler enforces that before it interacts with the verification engine.

