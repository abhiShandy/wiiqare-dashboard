import axios from "axios";
import hawk from "hawk";
import Head from "next/head";
import useSWR from "swr";
import Dashboard from "../components/dashboard";
import { fetcher } from "./_utils";

type Merchant = {
  merchantId: string;
  displayName: string;
  wallet: {
    currency: {
      code: string;
    };
  };
};

const Merchants = () => {
  const { data: merchants, error } = useSWR<Merchant[]>(
    "/api/merchants",
    fetcher
  );
  if (error) return <p>Error fetching Merchants!</p>;
  return (
    <>
      <Head>
        <title>WiiQare | Merchants</title>
      </Head>
      <Dashboard title="Merchants">
        {merchants && (
          <div className="rounded-lg border">
            <table className="w-full">
              <thead>
                <tr className="text-left h-8 bg-gray-200">
                  <th className="pl-4">Display Name</th>
                  <th>Merchant ID</th>
                  <th className="pr-4">Currency</th>
                </tr>
              </thead>
              <tbody>
                {merchants &&
                  merchants.map((merchant) => (
                    <tr
                      key={merchant.merchantId}
                      className="hover:bg-gray-200 h-8"
                    >
                      <td className="pl-4">{merchant.displayName}</td>
                      <td>{merchant.merchantId}</td>
                      <td className="pr-4">{merchant.wallet.currency.code}</td>
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

export default Merchants;
