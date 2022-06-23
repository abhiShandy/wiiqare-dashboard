import { Dialog } from "@headlessui/react";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Dashboard from "../../components/dashboard";
import Modal from "../../components/modal";
import { fetcher } from "../../utils/fetcher";
import { Patient } from "../customers";

const SendMoney = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);

  const getPatients = async () => {
    try {
      const response = await axios.get("/api/patients");
      setPatients(response.data);
    } catch (error) {
      console.log("error getting patients!");
    }
  };

  useEffect(() => {
    getPatients();
  });

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <Modal
      buttonText="Send Money"
      isOpen={isOpen}
      closeModal={closeModal}
      openModal={openModal}
    >
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900"
      >
        Send Money
      </Dialog.Title>

      <div className="mt-2">
        <form>
          <div className="flex flex-col mt-3 mb-1">
            <label htmlFor="email" className="my-1">
              Patient Email
            </label>
            <select className="border rounded h-10 px-4 py-2">
              {patients.map((patient) => (
                <option key={patient.id}>{patient.email}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col mt-3 mb-1">
            <label htmlFor="transferAmount" className="my-1">
              Amount to transfer
            </label>
            <div className="flex flex-row justify-between">
              <input
                type="number"
                name="transferAmount"
                className="border rounded h-10 px-4 py-2"
                defaultValue={100}
              />
              {/* TODO: list available currencies */}
              <select className="border rounded h-10 px-4 py-2">
                <option>EUR</option>
                <option>NGN</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col mt-3 mb-1">
            <label className="my-1">Mode of payment</label>

            {/* TODO: list available currencies */}
            <select className="border rounded h-10 px-4 py-2">
              <option>BTC</option>
              <option>ETH</option>
            </select>

            {/* TODO: update conversion rate when the currencies are changed */}
            <div>Conversion rate: 0.00 BTC/USD</div>
          </div>

          {/* TODO: show detailed statement with other fees */}
        </form>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          {/* TODO: show the correct amount to deposit */}
          Deposit 0.00123 BTC
        </button>
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

const Expat = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(`/api/expats/${id}`, fetcher);

  if (error) return <p>Error getting expat</p>;

  if (!data) return <p>Loading...</p>;

  const kycComplete = async () => {
    try {
      const response = await axios.post("/api/expats/kyc", { id: data.id });
      console.log(response.data);
      alert("KYC marked as complete");
    } catch (error) {
      alert("Failed to complete KYC");
    }
  };

  return (
    <>
      <Head>
        <title>WiiQare | Expat</title>
      </Head>
      <Dashboard title={data.name}>
        <div className="text-lg">Email: {data.email}</div>
        <div className="text-lg">KYC: {data.kyc}</div>
        {data.kyc !== "complete" && (
          <button
            className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white"
            onClick={kycComplete}
          >
            Mark KYC as Complete
          </button>
        )}
        {data.kyc === "complete" && <SendMoney />}
      </Dashboard>
    </>
  );
};

export default Expat;
