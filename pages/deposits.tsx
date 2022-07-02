import Head from "next/head";
import useSWR from "swr";
import DepositTable from "../components/tables/deposits";
import Dashboard from "../components/dashboard";
import { fetcher } from "../utils/fetcher";

export default function ChannelPayments() {
  const { data, error } = useSWR("/api/deposits", fetcher);

  if (error) return <p>Error loading deposits.</p>;

  return (
    <>
      <Head>
        <title>WiiQare | Deposits</title>
      </Head>
      <Dashboard title="Deposits">
        {!data && <p>Loading ...</p>}
        {data && <DepositTable data={data} />}
      </Dashboard>
    </>
  );
}
