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
  const [payments, setPayments] = useState();

  const getTransactions = async () => {
    try {
      const channelRefs = [expatId];
      const response = await axios.get(`/api/expats/${expatId}/payments`);
      const filteredResponse = response.data.filter(
        (p: any) => channelRefs.includes(p.reference) && p.status === "COMPLETE"
      );
      setPayments(filteredResponse);
    } catch (error) {
      console.log("Error getting transactions");
    }
  };

  useEffect(() => {
    getTransactions();
  });
  return <TransactionTable transactions={payments} />;
}
