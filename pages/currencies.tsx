import axios from "axios";
import Head from "next/head";
import Dashboard from "../components/dashboard";

type Currency = {
  name: string;
  code: string;
  depositFee: string;
  withdrawalFee: string;
};

const Currencies = ({ currencies }: { currencies: Currency[] }) => {
  return (
    <>
      <Head>
        <title>WiiQare | Currencies</title>
      </Head>
      <Dashboard title="Currencies">
        <table className="m-auto">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Code
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Deposit Fee
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Withdrawal Fee
              </th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((currency) => (
              <tr key={currency.name} className="hover:bg-gray-200">
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {currency.name}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {currency.code}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {currency.depositFee}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {currency.withdrawalFee}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Dashboard>
    </>
  );
};

export async function getStaticProps() {
  const response = await axios.get<Currency[]>(
    "https://api.coindirect.com/api/currency/fiat?max=500"
  );
  const currencies = response.data;
  return {
    props: {
      currencies,
    },
  };
}

export default Currencies;
