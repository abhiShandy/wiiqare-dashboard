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

  return <TransactionTable transactions={transactions} />;
}
