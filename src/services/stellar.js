import {
  isConnected,
  isAllowed,
  requestAccess,
  getAddress,
  signTransaction,
} from "@stellar/freighter-api";

import * as StellarSdk from "@stellar/stellar-sdk";

const server = new StellarSdk.Horizon.Server(
  "https://horizon-testnet.stellar.org"
);

// Check Freighter installation
export async function checkFreighter() {
  try {
    const result = await isConnected();
    return result.isConnected;
  } catch {
    return false;
  }
}

// Connect Wallet
export async function connectWallet() {
  try {
    const installed = await isConnected();

    if (!installed.isConnected) {
      throw new Error(
        "Freighter Wallet is not installed. Install it from https://www.freighter.app/"
      );
    }

    const allowed = await isAllowed();

    if (!allowed.isAllowed) {
      throw new Error(
        "Please allow this website inside Freighter."
      );
    }

    const access = await requestAccess();

    if (access.error) {
      throw new Error(access.error);
    }

    const { address } = await getAddress();

    return address;
  } catch (error) {
    throw error;
  }
}

// Get Balance
export async function getBalance(address) {
  try {
    if (
      !StellarSdk.StrKey.isValidEd25519PublicKey(address)
    ) {
      throw new Error("Invalid Stellar address.");
    }

    const account = await server.loadAccount(address);

    const native = account.balances.find(
      (asset) => asset.asset_type === "native"
    );

    return native ? native.balance : "0";
  } catch (error) {
    console.error(error);
    return "0";
  }
}

// Send Payment
export async function sendPayment(
  sender,
  destination,
  amount,
  memo = ""
) {
  try {
    // Validate recipient address
    if (!StellarSdk.StrKey.isValidEd25519PublicKey(destination)) {
      throw new Error("Invalid recipient Stellar address.");
    }

    // Cannot send to yourself
    if (sender.trim() === destination.trim()) {
      throw new Error("You cannot send XLM to your own wallet.");
    }

    // Validate amount
    const sendAmount = Number(amount);

    if (isNaN(sendAmount) || sendAmount <= 0) {
      throw new Error("Amount must be greater than 0 XLM.");
    }

    // Load latest account data
    const sourceAccount = await server.loadAccount(sender);

    // Get current XLM balance
    const nativeBalance = sourceAccount.balances.find(
      (asset) => asset.asset_type === "native"
    );

    const currentBalance = Number(nativeBalance.balance);

    // Keep 1 XLM reserved
    const reserve = 1;
    const spendableBalance = currentBalance - reserve;

    if (sendAmount > spendableBalance) {
      throw new Error(
        `Insufficient balance. Available to spend: ${spendableBalance.toFixed(
          7
        )} XLM`
      );
    }

    // Memo validation
    if (memo.length > 28) {
      throw new Error("Memo cannot exceed 28 characters.");
    }

    // Build transaction
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
          amount: sendAmount.toFixed(7),
        })
      )
      .addMemo(StellarSdk.Memo.text(memo))
      .setTimeout(30)
      .build();

    // Sign with Freighter
    const signed = await signTransaction(transaction.toXDR(), {
      networkPassphrase: StellarSdk.Networks.TESTNET,
      address: sender,
    });

    if (signed.error) {
      throw new Error(signed.error);
    }

    const signedTx = StellarSdk.TransactionBuilder.fromXDR(
      signed.signedTxXdr,
      StellarSdk.Networks.TESTNET
    );

    // Submit transaction
    const response = await server.submitTransaction(signedTx);

    return {
      success: true,
      hash: response.hash,
    };
  } catch (error) {
    console.error(error);

    let errorMessage = "Transaction failed.";

    if (error.response?.data?.extras?.result_codes?.operations) {
      errorMessage =
        error.response.data.extras.result_codes.operations.join(", ");
    } else if (error.message) {
      errorMessage = error.message;
    }

    return {
      success: false,
      error: errorMessage,
    };
  }
}

// Recent Payments
export async function getTransactions(address) {
  try {
    if (
      !StellarSdk.StrKey.isValidEd25519PublicKey(address)
    ) {
      return [];
    }

    const response = await fetch(
      `https://horizon-testnet.stellar.org/accounts/${address}/payments?limit=10&order=desc`
    );

    if (!response.ok) {
      throw new Error(
        "Unable to fetch transaction history."
      );
    }

    const data = await response.json();

    return data._embedded.records.filter(
      (payment) =>
        payment.type === "payment" &&
        payment.asset_type === "native"
    );
  } catch (error) {
    console.error(error);
    return [];
  }
}