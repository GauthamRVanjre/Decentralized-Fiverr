# 🪙 **DecentraFiverr — A decentralized way to hire freelancers in a trustless way**

DecentraFiverr is an on-chain freelance marketplace built using Solidity smart contracts and IPFS/Pinata. It enables clients to create jobs, fund them in ETH, and securely release payments once freelancers submit deliverables — without any intermediaries or centralized control.

---

## 🚀 **Table of Contents**

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Smart Contract Overview](#smart-contract-overview)
- [Architecture](#architecture)
- [Screenshots--Demo](#screenshots--demo)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

---

## 📌 **About the Project**

DecentraFiverr reimagines freelance marketplaces using smart contracts and decentralized storage.  
Clients post jobs and fund them in ETH. Freelancers upload their work to IPFS and submit it on-chain. Funds are released through a trustless escrow contract — ensuring transparency, automation, and censorship resistance.

---

## ✨ **Features**

### 🔹 Core Features

- Create on-chain jobs funded with ETH
- Upload job requirements to Pinata (IPFS)
- Fetch and display metadata using metadata CID
- Freelancers submit deliverables stored on IPFS
- Poster releases escrowed funds securely
- Job list with real-time contract reads
- Clean and responsive dark UI

### 🔹 Smart Contract Features

- Trustless escrow for payments
- Mapping-based job registry
- Chainlink ETH/USD price feed
- Safe ETH transfers using `call()`
- Metadata CID stored on-chain

### 🔹 UX / Frontend Features

- React + Tailwind dark UI
- TanStack Query for caching + background refetching
- wagmi & viem for contract reads/writes
- RainbowKit wallet connection
- Automatic conversion of USD → ETH via Chainlink

---

## 🛠️ **Tech Stack**

### **Smart Contract**

- Solidity
- Remix (deployment & testing)
- Chainlink Price Feeds
- OpenZeppelin Contracts

### **Frontend**

- React
- TypeScript
- Tailwind CSS
- wagmi + viem
- RainbowKit
- TanStack Query

### **Storage**

- Pinata (v3 API Groups)
- IPFS (file + JSON uploads)

### **Deployment**

- **Frontend**: Vercel
- **Smart Contract**: ETH Sepolia
- **zkSync**: Coming Soon

---

## 🔐 **Smart Contract Overview**

The contract manages:

- Job creation (with metadata CID + ETH funding)
- Work submission (CID of deliverable)
- Releasing escrowed funds
- Chainlink ETH/USD price feed logic
- Storage of job state in a mapping

**Contract Name:** `DecentraFiverrEscrow`  
**Language:** Solidity 0.8.x  
**Deployment:** ETH Sepolia via Remix

---

## 🏗 **Architecture**

### **1. Frontend (React)**

1. Uses **Wagmi + Viem** to read/write smart contract data
2. Uses **TanStack Query** for caching, refetching, and background updates
3. Handles **Pinata uploads** for job requirements and work submissions
4. Fetches **job metadata JSON** stored on IPFS
5. Renders UI components such as:
   - Job cards
   - Modals (Create Job, Submit Work)
   - Filters and job listings

---

### **2. Smart Contract (Solidity)**

1. Defines a `Job` struct for storing all job-related data
2. Stores jobs using `mapping(uint256 => Job)`
3. Implements `createJob(cid)` to create and fund jobs
4. Implements `submitWork(jobId, submissionCID)` to submit deliverables
5. Implements `releaseFunds(jobId)` to release escrowed ETH to the worker

---

### **3. Storage Layer (Pinata / IPFS)**

1. Stores **job metadata JSON** (title, description, attachment CID, USD amount, timestamp)
2. Stores **job attachments** such as:
   - PDF requirement files
   - Images (PNG/JPG)
   - Text instructions
   - Any client-uploaded asset

---

## 🖼 **Screenshots / Demo**

> Add your UI screenshots here:

```md
![Jobs List](./screenshots/jobs-list.png)
![Create Job Modal](./screenshots/create-job.png)
![Submit work](./screenshots/job-details.png)
![Release Funds](./screenshots/job-details.png)
```

## ⚙️ Getting Started

1. Clone the repo

```
git clone https://github.com/yourusername/decentrafiverr.git
cd client
```

2. Install dependencies

```
npm install
```

3. Start development server

```
npm run dev
```

🔑 Environment Variables

Create a .env file:

```
VITE_PINATA_KEY=your_pinata_key
VITE_PINATA_SECRET=your_pinata_secret
VITE_JWT_SECRET_KEY=your_pinata_jwt
VITE_SMART_CONTRACT_ADDRESS=your_contract_address
```

🚀 Deployment

```
Smart Contract

Deploy on Remix → Injected Provider (MetaMask)

Select ETH Sepolia testnet

Copy deployed contract address into .env
```

🔮 Future Improvements

1. zkSync native deployment

2. Full multi-chain job creation

3. Full fledged Authentication

4. Rating system for freelancers

🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to open a PR or create an issue.
