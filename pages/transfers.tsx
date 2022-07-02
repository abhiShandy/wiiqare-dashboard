import Head from "next/head";
import useSWR from "swr";
import Dashboard from "../components/dashboard";
import TransferTable from "../components/tables/transfers";
import { fetcher } from "../utils/fetcher";

export default function Transfers() {
  const { data, error } = useSWR("/api/transfers", fetcher);

  if (error) return <p>Error fetching transfers!</p>;

  return (
    <>
      <Head>
        <title>WiiQare | Transfers</title>
      </Head>
      <Dashboard title="Transfers">
        <div className="px-4 sm:px-6 lg:px-8">
          {!data && <p>Loading...</p>}
          {data && <TransferTable data={data} />}
        </div>
      </Dashboard>
    </>
  );
}
