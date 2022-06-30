import axios from "axios";
import { useEffect, useState } from "react";
import TransactionTable from "./transactionTable";

export type Transaction = {
  hash: string;
  paidAmount: number;
  paidCurrency: string;
  displayAmount: number;
  displayCurrency: string;
  dateCreated: number;
  lastUpdated: number;
  status: "DETECTED" | "COMPLETE";
};

export default function Transactions({ expatId }: { expatId: string }) {
  const [transactions, setTransactions] = useState();

  const getTransactions = async () => {
    try {
      const response = await axios.get(`/api/expats/${expatId}/transactions`);
      setTransactions(response.data);
    } catch (error) {
      console.log("Error getting transactions");
    }
  };

  useEffect(() => {
    getTransactions();
  });

  return <TransactionTable transactions={transactions} />;
}
