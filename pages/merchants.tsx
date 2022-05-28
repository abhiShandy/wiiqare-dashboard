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

const Merchants = () => {
  const [merchants, setMerchants] = useState([]);
  const getMerchants = async () => {
    const getMerchantsURL =
      "https://api.sandbox.coindirect.com/api/v1/merchant";
    try {
      const { header } = hawk.client.header(getMerchantsURL, "GET", {
        credentials,
      });
      const response = await axios.get(getMerchantsURL, {
        headers: { Authorization: header },
      });
      setMerchants(response.data);
    } catch (error) {
      alert("Failed to get merchants");
    }
  };
  return (
    <>
      <Navbar />
      <div className="border-gray-500 border-2 rounded-md max-w-2xl mx-auto mt-5 text-center p-2">
        <button
          className="bg-gray-500 p-2 rounded-md text-white"
          onClick={getMerchants}
        >
          List Merchants
        </button>
        <table className="divide-y divide-gray-300 m-auto">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Display Name
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Merchant ID
              </th>
            </tr>
          </thead>
          <tbody>
            {merchants &&
              merchants.map((merchant: any) => (
                <tr key={merchant.merchantId}>
                  <td>{merchant.displayName}</td>
                  <td>{merchant.merchantId}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Merchants;
