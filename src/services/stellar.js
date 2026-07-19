import {
  isConnected,
  requestAccess,
  getAddress,
  signTransaction,
} from "@stellar/freighter-api";

import * as StellarSdk from "@stellar/stellar-sdk";


const server = new StellarSdk.Horizon.Server(
  "https://horizon-testnet.stellar.org"
);

// Check if Freighter is available
export async function checkFreighter() {
  try {
    return await isConnected();
  } catch (error) {
    console.error(error);
    return false;
  }
}

// Connect wallet
export async function connectWallet() {
  try {
    const access = await requestAccess();

    if (access.error) {
      throw new Error(access.error);
    }

    const { address } = await getAddress();

    return address;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Get XLM balance
export async function getBalance(address) {
  try {
    console.log("Wallet Address:", address);

    const account = await server.loadAccount(address);

    console.log(account);

    const nativeBalance = account.balances.find(
      (asset) => asset.asset_type === "native"
    );

    console.log("Native Balance:", nativeBalance);

    return nativeBalance ? nativeBalance.balance : "0";
  } catch (error) {
    console.error("Balance Error:", error);
    return "0";
  }
}

export async function sendPayment(
  sender,
  destination,
  amount,
  memo = ""
) {
  try {
    const sourceAccount = await server.loadAccount(sender);

    const transaction = new StellarSdk.TransactionBuilder(
      sourceAccount,
      {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.TESTNET,
      }
    )
      .addOperation(
        StellarSdk.Operation.payment({
          destination,
          asset: StellarSdk.Asset.native(),
          amount,
        })
      )
      .addMemo(StellarSdk.Memo.text(memo))
      .setTimeout(30)
      .build();

    const signed = await signTransaction(
      transaction.toXDR(),
      {
        networkPassphrase: StellarSdk.Networks.TESTNET,
        address: sender,
      }
    );

    if (signed.error) {
      throw new Error(signed.error);
    }

    const signedTx = StellarSdk.TransactionBuilder.fromXDR(
        signed.signedTxXdr,
        StellarSdk.Networks.TESTNET
    );

    const response =
      await server.submitTransaction(signedTx);

    return {
      success: true,
      hash: response.hash,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: error.message,
    };
  }
}

export async function getTransactions(address) {
  try {
    const response = await fetch(
      `https://horizon-testnet.stellar.org/accounts/${address}/payments?limit=10&order=desc`
    );

    const data = await response.json();

    const payments = data._embedded.records.filter(
      (payment) => payment.type === "payment" && payment.asset_type === "native"
    );

    return payments;
  } catch (error) {
    console.error(error);
    return [];
  }
}