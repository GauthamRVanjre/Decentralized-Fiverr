# DecentraFiverr

A Web3 freelance marketplace with smart-contract escrow on Ethereum Sepolia. Clients create and fund jobs with test ETH, freelancers submit work through IPFS, and clients approve payment release through the contract.

[Demo](https://decentralized-fiverr-fawn.vercel.app/) · [Escrow contract source](smart_contract/DevFiverr.sol)

The frontend and contract address are configured for Sepolia. The demo URL is listed for exploration; a complete live transaction flow has not been verified for this documentation update.

## How it works

1. Connect a Sepolia wallet using RainbowKit.
2. Create a job, upload its requirements and metadata through Pinata, and deposit test ETH into the escrow contract.
3. A freelancer uploads a deliverable and records its CID on-chain.
4. The job poster reviews the submission and calls `releaseFunds`.
5. The contract checks the caller and job state, marks the job completed, and transfers the escrowed ETH to the recorded worker.

The contract holds deposited funds and enforces settlement rules without a marketplace operator holding the payment. Release still requires the job poster's approval: this is client-approved escrow, not automatic verification of work quality.

## Stack and architecture

| Responsibility | Technology |
| --- | --- |
| Interface | React, TypeScript, Vite, Tailwind CSS |
| Wallet connection | RainbowKit, wagmi |
| Contract reads, writes, and transaction receipts | viem, wagmi |
| Job-query caching and background refetching | TanStack Query |
| Payment custody and job state | Solidity escrow contract |
| Requirements, metadata, and deliverables | IPFS through Pinata |
| USD-to-ETH conversion | Chainlink ETH/USD price feed |
| Frontend hosting | Vercel |

The browser reads job records from the contract and retrieves associated files through Pinata. Contract records contain addresses, payment amounts, job state, and content identifiers; uploaded documents remain off-chain.

## Engineering decisions

- **Contract-held escrow:** job funding and payment release are contract transactions. The contract permits only the job poster to release payment, requires a submitted worker, and prevents repeated completion. This removes platform custody while retaining client approval.
- **Content identifiers instead of on-chain files:** requirements and submissions are uploaded through Pinata, with CIDs recorded in the contract. This keeps document bytes out of contract storage, while depending on continued content availability.
- **Separate query and transaction flows:** TanStack Query caches job reads, while write helpers wait for transaction receipts before returning. A wallet accepting a request is distinct from the transaction being mined.

## Run the frontend

Prerequisites: an active Node.js LTS release with npm, a compatible wallet, a Reown project ID for RainbowKit, and Sepolia test ETH for transactions.

```sh
git clone https://github.com/GauthamRVanjre/Decentralized-Fiverr.git
cd Decentralized-Fiverr/client
npm ci
```

Create `client/.env` relative to the repository root. The current source reads these names:

| Variable | Purpose | Exposure |
| --- | --- | --- |
| `VITE_RAINBOWKIT_PROJECT_ID` | Reown project ID used by RainbowKit | Browser-visible identifier |
| `VITE_ADMIN_ADDRESS` | Optional wallet address for frontend admin presentation | Public address; not contract authorization |
| `VITE_JWT_SECRET_KEY` | Pinata bearer token used by the existing upload and file-query helpers | Sensitive value exposed by the current browser implementation |

The first two variables are public configuration. Allowlist the deployed domain in the Reown dashboard.

**Pinata implementation limitation:** `client/src/requests/pinata.requests.ts` sends the Pinata token from browser code. Putting it in a Vite environment file does not keep its value private. Do not supply a private account token to a public build. A server-issued signed upload URL and server-side authenticated file queries are the recommended replacement; that server flow is not implemented in this repository.

See [Vite environment-variable exposure](https://vite.dev/guide/env-and-mode) and [Pinata client-side uploads](https://docs.pinata.cloud/files/uploading-files#client-side-uploads). The frontend can start without a Pinata token, but the existing authenticated upload and metadata-query operations will not work.

```sh
npm run dev
```

Build and static checks, as defined in `client/package.json`:

```sh
npm run build
npm run lint
```

These commands are available in the repository; they were not executed during this documentation review. Test scripts are present, but no test suite is committed in the current tree.

## Contract configuration

The frontend's contract address and ABI are in `client/src/constants/constants.ts`. The configured Sepolia address is:

```text
0x325d3bfd4b9bd5538df80a2f9a8d520d07eed4b0
```

Changing a Vite environment variable alone does not change that address. A new deployment requires updating the constants and ABI.

The Solidity source is in `smart_contract/DevFiverr.sol`; this repository does not include a pinned contract build or deployment toolchain. Its OpenZeppelin imports and constructor use version-specific conventions that need to be aligned before compiling a fresh deployment.

## Scope

- Sepolia demonstration using test ETH, not a production payments service.
- No dispute resolution, escrow refund, or deadline-based release path is implemented.
- The first accepted submission records the worker; there is no separate freelancer-selection transaction.
- The current `createJob` check allows zero-value deposits.
- Price conversion exists in the contract, but it does not enforce a minimum job payment.
- The browser-side Pinata credential flow needs replacement before a public build can keep that credential private.
