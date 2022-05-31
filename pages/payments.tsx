import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/outline";
import Head from "next/head";
import useSWR from "swr";
import Dashboard from "../components/dashboard";
import { fetcher } from "../utils/fetcher";

type Payment = {
  uuid: string;
  type: string;
  status: string;
  dateCreated: string;
  displayCurrency: {
    amount: number;
    currency: string;
  };
};

const Payments = () => {
  const { data: payments, error } = useSWR<Payment[]>("/api/payments", fetcher);
  if (error) return <p>Erro fetching payments!</p>;
  return (
    <>
      <Head>
        <title>WiiQare | Payments</title>
      </Head>
      <Dashboard title="Payments">
        {payments && (
          <div className="border rounded-lg">
            <table className="w-full">
              <thead>
                <tr className="text-left h-8 bg-gray-200">
                  <th className="pl-4">UUID</th>
                  <th>Amount</th>
                  <th>Date Created</th>
                  <th>Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payments &&
                  payments.map((payment) => (
                    <tr key={payment.uuid} className="h-8 hover:bg-gray-200">
                      <td className="pl-4">{payment.uuid}</td>
                      <td>{`${payment.displayCurrency.amount} ${payment.displayCurrency.currency}`}</td>
                      <td>
                        {new Date(payment.dateCreated)
                          .toISOString()
                          .slice(1, -8)}
                      </td>
                      <td>
                        {payment.type === "IN" ? (
                          <ArrowDownIcon className="h-6 text-green-500" />
                        ) : (
                          <ArrowUpIcon />
                        )}
                      </td>
                      <td>
                        {payment.status === "EXPIRED" ? (
                          <span className="text-red-500">EXPIRED</span>
                        ) : (
                          payment.status
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </Dashboard>
    </>
  );
};

export default Payments;
