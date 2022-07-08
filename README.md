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
Compile the backend with:
```bash
./reach compile
```
The Reach backend code is in `index.rsh`. The current version allows a `Creator` participant to deploy the contract; a supply of non-network tokens is created; a specified amount of tokens is transferred to a participant's account; the participant pays the amount back to the contract; the program burns the whole supply and terminates.
