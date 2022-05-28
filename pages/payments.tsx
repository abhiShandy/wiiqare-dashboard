import axios from "axios";
import hawk from "hawk";
import { MouseEventHandler, useState } from "react";
import Navbar from "../components/navbar";

type Payment = {
  uuid: string;
  type: string;
  status: string;
  dateCreated: string;
};

const url = "https://api.sandbox.coindirect.com";
const credentials: {
  id: string;
  key: string;
  algorithm: "sha256" | "sha1";
} = {
  id: "ZPcwjLvvZ107UEhAgOvFqgl6Qmlz92pmJYTVOfPGl3SSseCJJuqF92nlkjSeEHSp",
  key: "4KcRYkSBfJmPRpNO6ebccRLvuxlsq5pEtGzJjAuLleZvYMdiUP1xMEHJ9Chtkges",
  algorithm: "sha256",
};

const merchantId = "e7c967e0-ea58-41de-aad2-c8a28d970baa";

const Payments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const getPayments: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    try {
      const getPaymentsURL =
        url + `/api/v1/pay/summary?merchantId=${merchantId}`;
      const { header } = hawk.client.header(getPaymentsURL, "GET", {
        credentials,
      });
      const response = await axios.get(getPaymentsURL, {
        headers: { Authorization: header },
      });
      setPayments(response.data);
    } catch (error) {
      alert("Failed to get payments");
    }
  };
  return (
    <>
      <Navbar />
      <div className="border-gray-500 border-2 rounded-md max-w-2xl mx-auto mt-5 text-center p-2">
        <button
          className="bg-gray-500 p-2 rounded-md text-white"
          onClick={getPayments}
        >
          List Payments
        </button>
        <table className="divide-y divide-gray-300 m-auto">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                UUID
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Date Created
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Type
              </th>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {payments &&
              payments.map((payment) => (
                <tr key={payment.uuid}>
                  <td>{payment.uuid}</td>
                  <td>
                    {new Date(payment.dateCreated).toISOString().slice(1, -8)}
                  </td>
                  <td>{payment.type}</td>
                  <td>{payment.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Payments;
