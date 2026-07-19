# ⭐ StellarPay

[![Stellar Network](https://shields.io)](https://stellar.org)
[![Wallet](https://shields.io)](https://freighter.app)
[![Deployment](https://shields.io)](http://stellar-pay-indol.vercel.app/)

A modern, high-performance Web3 payment decentralized application (dApp) built on the **Stellar Testnet**. This application provides a seamless asset transfer interface powered by **React**, **Vite**, **Freighter Wallet**, and the official **Stellar JavaScript SDK**.

StellarPay allows users to securely authenticate their Stellar identity, monitor asset balances in real-time, execute reliable testnet transactions, and audit live transactional payloads via an interactive interface.

---

## 🌐 Live Production Deployment

The production environment is live and fully accessible to reviewers at the following endpoint:
* **Application Link:** [http://stellar-pay-indol.vercel.app/](http://stellar-pay-indol.vercel.app/)

---

## 📸 Required Submission Review

The single application snapshot below demonstrates absolute compliance with all validation criteria outlined in the Level 1 evaluation requirements:

* **Wallet Connected State:** Successfully initializes a secure session via the Freighter extension, retrieving the user's active public key.
* **Balance Displayed:** Performs live state-fetching from the Horizon API to render real-time XLM Testnet asset balances.
* **Successful Testnet Transaction:** Compiles, signs, and broadcasts operations successfully onto the network.
* **Transaction Result Shown:** Captures the transaction receipt payload and exposes the signature hash directly to the UI.

![StellarPay System Interface Validation](public/screenshots/app-preview.jpg)

---

## 🚀 Key Features

* **🔐 Session Management:** Instant "Connect" and "Disconnect" lifecycle hooks utilizing the Freighter Wallet API.
* **💰 Real-Time Ledger Queries:** Automated polling of live XLM balances directly from the Stellar Testnet Horizon gateway.
* **💸 Secure Asset Transfers:** Client-side transaction construction, XDR formatting, and network broadcasting.
* **📜 Transaction Tracking:** Clean historical feeds mapping out recent ledger interactions.
* **📋 Clipboard Integration:** One-click utility to securely copy transaction signature hashes.
* **🔗 Block Explorer Mapping:** Direct contextual deep-linking out to Stellar.Expert Explorer.
* **🌙 Premium UX Layout:** Responsive, dark-themed Web3 glassmorphism dashboard.

---

## 🛠 Tech Architecture

### Frontend Layer
* **Framework:** React 18+ (Functional Components & Hooks)
* **Build Pipeline:** Vite (Optimized asset bundling)
* **Styling Engine:** Responsive CSS3 Flexbox/Grid

### Web3 Core Engine
* **SDK:** `@stellar/stellar-sdk`
* **Wallet Connection:** `@stellar/freighter-api`
* **Network Nodes:** Stellar Horizon Testnet Gateway (`https://stellar.org`)

---

## 📂 Project Structure

```text
stellar-pay/
│
├── public/
│   └── screenshots/
│       └── app-preview.jpg    # Validation image
│
├── src/
│   ├── components/            # UI components (Buttons, Cards, Inputs)
│   ├── pages/                 # Layout configurations 
│   ├── services/              # Stellar SDK & Horizon API integrations
│   ├── assets/                # Static design materials
│   ├── App.jsx                # Application root state controller
│   └── main.jsx               # DOM entry configuration
│
├── package.json               # Package manifests & scripts
├── vite.config.js             # Development configurations
└── README.md                  # System documentation
```

---

## ⚙️ Setup Instructions (Local Installation)

Execute these sequential procedures in your local development environment to instantiate a local server:

### 1. Replicate Project Repository
```bash
git clone https://github.com
cd stellar-pay
```

### 2. Provision Dependencies
```bash
npm install
```

### 3. Initialize Hot-Reload Local Server
```bash
npm run dev
```

### 4. Connect Interface
Launch an internet browser application and target the local loopback server configuration:
```text
http://localhost:5173
```

---

## 🧪 Application Testing Checklist

1. **Install Extensions:** Equip your browser environment with the official **Freighter Wallet** plugin.
2. **Adjust Networks:** Set the network context inside your Freighter configuration panel to **Stellar Testnet**.
3. **Acquire Assets:** Use the Stellar Laboratory Faucet tool to fund your public address with test net currency.
4. **Authenticate Account:** Interact with the interface connection parameters to establish a secure public key session.
5. **Review Balances:** Verify that the system dynamically renders your retrieved XLM data metrics.
6. **Initiate Pipelines:** Dispatch a fraction of network assets towards another valid Testnet recipient.
7. **Audit Hashes:** Ensure a successful transaction generates an explicit confirmation response array.

---

## 🎯 White Belt Requirements Metric

* [x] Core Freighter Wallet Extension Synchronization
* [x] Active Ledger Account Authentication Session
* [x] Graceful Session Termination Framework (Disconnect)
* [x] Asynchronous Live Asset Balance Parsing
* [x] Structural XML Transaction Compilation & Network Broadcast
* [x] Transaction Outcome Feedback Routing to UI Layout
* [x] Historical Ledger Activity Auditing Panel
* [x] Fully Mobile-Responsive Web3 Application Interface
* [x] Functional Live Cloud Deployment Structure
* [x] Unrestricted Public GitHub Repository

---

## 👨‍💻 Engineering Credits

**Earth Kumar Roy**
* GitHub Profile: [https://github.com/Earth-Kumar-Roy](https://github.com/Earth-Kumar-Roy)

---
