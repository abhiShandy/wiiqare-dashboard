import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/outline";
import axios from "axios";
import hawk from "hawk";
import Head from "next/head";
import Dashboard from "../components/dashboard";

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

const credentials: {
  id: string;
  key: string;
  algorithm: "sha256" | "sha1";
} = {
  id: process.env.NEXT_PUBLIC_COINDIRECT_HAWK_ID || "",
  key: process.env.NEXT_PUBLIC_COINDIRECT_HAWK_KEY || "",
  algorithm: "sha256",
};

export async function getServerSideProps() {
  try {
    const url = `https://api.sandbox.coindirect.com/api/v1/pay/summary?merchantId=${
      process.env.NEXT_PUBLIC_MERCHANT_ID || ""
    }`;
    const { header } = hawk.client.header(url, "GET", {
      credentials,
    });
    const response = await axios.get<Payment[]>(url, {
      headers: { Authorization: header },
    });
    return {
      props: {
        payments: response.data,
      },
    };
  } catch (error) {
    console.log("Failed to get payments");
    return {
      props: {
        payments: [],
      },
    };
  }
}

const Payments = ({ payments }: { payments: Payment[] }) => {
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
