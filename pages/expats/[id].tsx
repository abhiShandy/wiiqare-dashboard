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
          <div className="flex flex-col my-2">
            <label htmlFor="email" className="my-1">
              Email
            </label>
            <select>
              {patients.map((patient) => (
                <option key={patient.id}>{patient.email}</option>
              ))}
            </select>
          </div>
        </form>
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
