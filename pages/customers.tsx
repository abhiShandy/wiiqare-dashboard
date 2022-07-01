import { Dialog } from "@headlessui/react";
import axios from "axios";
import { MongoClient, WithId } from "mongodb";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Dashboard from "../components/dashboard";
import Modal from "../components/modal";

type Props = {
  expats: WiiQare.Expat[];
  patients: WiiQare.Patient[];
};

const CreateExpatModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  async function createExpat() {
    try {
      await axios.post("/api/expats", { name, email, displayCurrency: "USD" });
      closeModal();
    } catch (error) {
      console.log("Could not create expat");
    }
  }

  return (
    <Modal
      buttonText="Create Expat"
      isOpen={isOpen}
      openModal={openModal}
      closeModal={closeModal}
    >
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900"
      >
        Create an expat profile
      </Dialog.Title>

      <div className="mt-2">
        <form>
          <div className="flex flex-col my-2">
            <label htmlFor="email" className="my-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="border rounded h-10 px-4 py-2"
              placeholder="test@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col my-2">
            <label htmlFor="name" className="my-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="border rounded h-10 px-4 py-2"
              placeholder="John Doe"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
        </form>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          onClick={createExpat}
        >
          Create
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

const CreatePatientModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  async function createPatient() {
    try {
      await axios.post("/api/patients", { name, email });
      closeModal();
    } catch (error) {
      console.log("Could not create patient");
    }
  }

  return (
    <Modal
      buttonText="Create Patient"
      isOpen={isOpen}
      openModal={openModal}
      closeModal={closeModal}
    >
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900"
      >
        Create a patient profile
      </Dialog.Title>

      <div className="mt-2">
        <form>
          <div className="flex flex-col my-2">
            <label htmlFor="email" className="my-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="border rounded h-10 px-4 py-2"
              placeholder="test@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="flex flex-col my-2">
            <label htmlFor="name" className="my-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="border rounded h-10 px-4 py-2"
              placeholder="John Doe"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
        </form>
      </div>

      <div className="mt-4 flex justify-between">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          onClick={createPatient}
        >
          Create
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

const Customers = ({ expats, patients }: Props) => {
  return (
    <>
      <Head>
        <title>WiiQare | Customers</title>
      </Head>
      <Dashboard title="Customers">
        <div className="flex flex-row justify-between m-4">
          <h2 className="text-xl font-bold">Expats</h2>
          <CreateExpatModal />
        </div>
        <div className="border border-gray-200 rounded-md">
          <table className="w-full">
            <thead>
              <tr className="text-left h-8">
                <th className="pl-4">ID</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Name</th>
                <th className="text-right pr-4">KYC</th>
              </tr>
            </thead>
            <tbody>
              {expats.map((expat) => (
                <tr key={expat.id} className="hover:bg-gray-200 h-8 text-left">
                  <td className="pl-4">
                    <Link href={`/expats/${expat.id}`}>{expat.id}</Link>
                  </td>
                  <td>{expat.email}</td>
                  <td>{expat.phone}</td>
                  <td>{expat.name ? expat.name : "N/A"}</td>
                  <td className="text-right pr-4">{expat.kyc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-row justify-between m-4">
          <h2 className="text-xl font-bold">Patients</h2>
          <CreatePatientModal />
        </div>
        <div className="border border-gray-200 rounded-md">
          <table className="w-full">
            <thead>
              <tr className="text-left h-8">
                <th className="pl-4">ID</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr
                  key={patient.id}
                  className="hover:bg-gray-200 h-8 text-left"
                >
                  <td className="pl-4">
                    <Link href={`/patients/${patient.id}`}>{patient.id}</Link>
                  </td>
                  <td>{patient.email}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.name ? patient.name : "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Dashboard>
    </>
  );
};

export const getServerSideProps = async (): Promise<{ props: Props }> => {
  const client = new MongoClient(process.env.MONGODB_URL || "");

  try {
    await client.connect();
  } catch (error) {
    console.log("Error connecting to MongoDB");
    return { props: { expats: [], patients: [] } };
  }

  const expatCursor = client
    .db("customers")
    .collection<WiiQare.Expat>("expats")
    .find();
  const projectExpatCursor = expatCursor.project<WiiQare.Expat>({ _id: 0 });

  const patientCursor = client
    .db("customers")
    .collection<WiiQare.Patient>("patients")
    .find();
  const projectPatientCursor = patientCursor.project<WiiQare.Patient>({
    _id: 0,
  });

  try {
    const expats = await projectExpatCursor.toArray();
    const patients = await projectPatientCursor.toArray();

    return { props: { expats, patients } };
  } catch (error) {
    console.log("Error converting patients and/or expats to array");
    return { props: { expats: [], patients: [] } };
  }
  await client.close();
};

export default Customers;
