import { RefreshIcon } from "@heroicons/react/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import TransactionTable from "./transactionTable";

export default function Transactions({ expatId }: { expatId: string }) {
  const [transactions, setTransactions] = useState<WiiQare.Transaction[]>();

  const getTransactions = async () => {
    try {
      const response = await axios.get<WiiQare.Transaction[]>(
        `/api/expats/${expatId}/transactions`
      );
      setTransactions(response.data);
    } catch (error) {
      console.log("Error getting transactions");
    }
  };

  useEffect(() => {
    getTransactions();
  });

  return (
    <>
      <div className="mt-8 px-4 sm:px-6 lg:px-8 py-2 text-xl flex justify-between">
        <p>Transactions</p>
        <button onClick={getTransactions}>
          <RefreshIcon className="h-6" />
        </button>
      </div>
      <TransactionTable transactions={transactions} />
    </>
  );
}
