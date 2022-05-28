import axios from "axios";
import Navbar from "../components/navbar";

type Currency = {
  name: string;
  code: string;
  depositFee: string;
  withdrawalFee: string;
};

const Currencies = ({ currencies }: { currencies: Currency[] }) => {
  return (
    <>
      <Navbar />
      <table className="divide-y divide-gray-300 m-auto">
        <thead className="bg-gray-50">
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
        <tbody className="divide-y divide-gray-200 bg-white">
          {currencies.map((currency) => (
            <tr key={currency.name}>
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
    </>
  );
};

export async function getStaticProps() {
  const response = await axios.get(
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
