# ⭐ StellarPay

<div align="center">

# StellarPay

### Modern Web3 Payment dApp on Stellar Testnet

A decentralized payment application built with **React**, **Vite**, **Freighter Wallet**, and the **Stellar JavaScript SDK**.

Securely connect your wallet, view your XLM balance, send payments on the Stellar Testnet, and review your latest transactions through a clean Web3 interface.

---

### 🌐 Live Demo

https://stellar-pay-indol.vercel.app/

### 📂 GitHub Repository

https://github.com/Earth-Kumar-Roy/stellar-pay

</div>

---

# 📖 Project Overview

StellarPay is a beginner-friendly decentralized application (dApp) developed as part of the **Stellar Developer Program – White Belt Challenge**.

The objective of this project is to demonstrate the core building blocks of Stellar application development by allowing users to securely connect their Freighter wallet, retrieve account balances from the Stellar Testnet, create and sign XLM payment transactions, and broadcast them to the Stellar blockchain.

The application interacts directly with the Stellar Horizon API and uses the official Stellar JavaScript SDK together with the Freighter Wallet API to provide a secure and seamless transaction workflow.

---

# ✨ Features

## Wallet

- Connect Freighter Wallet
- Secure wallet authentication
- Wallet address display
- Testnet support

---

## Balance

- Live XLM balance retrieval
- Direct Horizon API integration
- Automatic balance refresh after transactions

---

## Payments

- Send native XLM
- Transaction memo support
- Secure transaction signing
- Testnet transaction broadcasting
- Transaction hash generation

---

## Transaction History

- Fetch recent XLM transactions
- Display latest payment history
- Automatic refresh after successful transfers

---

## Validation & Error Handling

The application performs multiple client-side validations before creating a transaction.

### Wallet Validation

- Wallet connection required
- Freighter availability detection

### Address Validation

- Recipient address required
- Stellar public key validation
- Prevent sending to the same wallet

### Amount Validation

- Amount required
- Amount must be greater than zero
- Maximum 7 decimal precision
- Balance verification
- Spendable balance protection

### Memo Validation

- Optional memo
- Maximum supported length validation

### Transaction Feedback

- Success confirmation
- Failure notification
- Transaction hash display
- Balance refresh
- Transaction history refresh

---

# 🖥 Application Preview

> Replace the image below with your latest screenshot.

[Application Preview](public/screenshots/app-preview.jpg)

---

# ⚙ Technology Stack

## Frontend

- React
- Vite
- JavaScript (ES6+)
- CSS3

---

## Web3

- Stellar JavaScript SDK
- Freighter Wallet API

---

## Blockchain

- Stellar Testnet
- Horizon API

---

## Development

- VS Code
- Git
- GitHub
- Vercel

---

# 📂 Project Structure

```text
stellar-pay
│
├── public
│   └── screenshots
│       └── app-preview.jpg
│
├── src
│   ├── assets
│   ├── components
│   │   ├── BalanceCard.jsx
│   │   ├── Navbar.jsx
│   │   ├── SendPayment.jsx
│   │   ├── StatusCard.jsx
│   │   ├── TransactionHistory.jsx
│   │   └── WalletCard.jsx
│   │
│   ├── pages
│   │   └── Home.jsx
│   │
│   ├── services
│   │   └── stellar.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── vite.config.js
└── README.md
```

---

# 🚀 Installation

Clone the repository.

```bash
git clone https://github.com/Earth-Kumar-Roy/stellar-pay.git
```

Open the project.

```bash
cd stellar-pay
```

Install dependencies.

```bash
npm install
```

Start the development server.

```bash
npm run dev
```

Open your browser.

```
http://localhost:5173
```

---

# 🔧 Required Setup

## 1. Install Freighter Wallet

https://www.freighter.app/

---

## 2. Switch Network

Inside Freighter Wallet select

```
Stellar Testnet
```

---

## 3. Fund Your Wallet

Use the Stellar Testnet Faucet to receive free XLM.

---

## 4. Connect Wallet

Click

```
Connect Wallet
```

Approve the connection request inside Freighter.

---

## 5. Send XLM

Enter

- Recipient Address
- Amount
- Memo (Optional)

Click

```
Send XLM
```

Approve the transaction inside Freighter Wallet.

---

# 🔒 Security

The application validates the following before sending a transaction.

- Wallet connected
- Recipient address exists
- Valid Stellar public key
- Sender and recipient are different
- Positive transaction amount
- Decimal precision
- Available balance
- Memo length

Transactions are signed securely using Freighter Wallet.

Private keys never leave the wallet.

---

# 📡 Stellar Integration

The application communicates directly with

- Stellar Horizon Testnet
- Freighter Wallet
- Stellar JavaScript SDK

All transactions are executed on the Stellar Testnet.

---

# 📋 White Belt Requirements

| Requirement | Status |
|-------------|--------|
| Freighter Wallet Setup | ✅ |
| Testnet Support | ✅ |
| Wallet Connect | ✅ |
| Wallet Disconnect | ✅ |
| Display Wallet Address | ✅ |
| Fetch XLM Balance | ✅ |
| Display Balance | ✅ |
| Send XLM Transaction | ✅ |
| Transaction Result | ✅ |
| Transaction Hash | ✅ |
| Public GitHub Repository | ✅ |
| README Documentation | ✅ |
| Live Deployment | ✅ |

---

# 🌍 Deployment

The application is deployed using

**Vercel**

Live URL

https://stellar-pay-indol.vercel.app/

---

# 🔮 Future Improvements

Potential future enhancements include

- Multi-asset support
- QR code payments
- Wallet auto reconnect
- Wallet address book
- Copy transaction hash
- Explorer integration
- Light/Dark themes
- Real-time price data
- Portfolio dashboard
- SEP Authentication
- Mainnet support

---

# 👨‍💻 Developer

**Earth Kumar Roy**

GitHub

https://github.com/Earth-Kumar-Roy

---

# 🙏 Acknowledgements

- Stellar Development Foundation
- Stellar JavaScript SDK
- Freighter Wallet
- React
- Vite
- Vercel

---


<div align="center">

### ⭐ Thank you for visiting StellarPay ⭐

Built by EKR with ❤️ using React, Freighter Wallet, and the Stellar Network.

</div>
