import axios from "axios";
import hawk from "hawk";
import { useState } from "react";
import Navbar from "../components/navbar";

const credentials: {
  id: string;
  key: string;
  algorithm: "sha256" | "sha1";
} = {
  id: "ZPcwjLvvZ107UEhAgOvFqgl6Qmlz92pmJYTVOfPGl3SSseCJJuqF92nlkjSeEHSp",
  key: "4KcRYkSBfJmPRpNO6ebccRLvuxlsq5pEtGzJjAuLleZvYMdiUP1xMEHJ9Chtkges",
  algorithm: "sha256",
};

const Wallets = () => {
  const [wallets, setWallets] = useState([]);
  const getWallets = async () => {
    const url = "https://api.sandbox.coindirect.com/api/wallet";
    try {
      const { header } = hawk.client.header(url, "GET", {
        credentials,
      });
      const response = await axios.get(url, {
        headers: { Authorization: header },
      });
      setWallets(response.data);
    } catch (error) {
      alert("Failed to get wallets");
    }
  };
  return (
    <>
      <Navbar />
      <div className="border-gray-500 border-2 rounded-md max-w-2xl mx-auto mt-5 text-center p-2">
        <button
          className="bg-gray-500 p-2 rounded-md text-white"
          onClick={getWallets}
        >
          List Wallets
        </button>
        <table className="divide-y divide-gray-300 m-auto">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                ID
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Currency
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Balance
              </th>
            </tr>
          </thead>
          <tbody>
            {wallets &&
              wallets.map((wallet: any) => (
                <tr key={wallet.id}>
                  <td>{wallet.id}</td>
                  <td>{wallet.currency.code}</td>
                  <td>{wallet.balance}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Wallets;
