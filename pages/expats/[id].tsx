import { CheckIcon, MailIcon, XIcon } from "@heroicons/react/outline";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import Dashboard from "../../components/dashboard";
import Deposit from "../../components/deposit";
import CreateTransferForm from "../../components/forms/create-transfer";
import Transactions from "../../components/transactions";
import { fetcher } from "../../utils/fetcher";

const Expat = () => {
  const kycComplete = async () => {
    try {
      const response = await axios.post("/api/expats/kyc", { id: data.id });
      console.log(response.data);
      alert("KYC marked as complete");
    } catch (error) {
      alert("Failed to complete KYC");
    }
  };

  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(`/api/expats/${id}`, fetcher);

  if (error) return <p>Error getting expat</p>;

  return (
    <>
      <Head>
        <title>WiiQare | Expat</title>
      </Head>
      {!data && <Dashboard title="Expat">Loading...</Dashboard>}
      {data && (
        <Dashboard title={data.name}>
          <div className="text-lg flex justify-between px-4 sm:px-6 lg:px-8">
            <span>
              <MailIcon className="h-8 inline" /> {data.email}
            </span>
            <span>
              KYC{" "}
              {data.kyc === "complete" && (
                <CheckIcon className="inline h-8 text-green-500" />
              )}
              {data.kyc !== "complete" && (
                <XIcon className="inline h-8 text-red-500" />
              )}
            </span>
          </div>
          {data.kyc !== "complete" && (
            <button
              className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white"
              onClick={kycComplete}
            >
              Mark KYC as Complete
            </button>
          )}
          {data.kyc === "complete" && (
            <>
              <Deposit expatId={data.id} />
              <CreateTransferForm expatID={data.id} />
              <Transactions expatId={data.id} />
            </>
          )}
        </Dashboard>
      )}
    </>
  );
};

export default Expat;
