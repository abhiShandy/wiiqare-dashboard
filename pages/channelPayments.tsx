import Head from "next/head";
import useSWR from "swr";
import ChannelPaymentTable from "../components/tables/channelPayments";
import Dashboard from "../components/dashboard";
import { fetcher } from "../utils/fetcher";

export default function ChannelPayments() {
  const { data, error } = useSWR("/api/channelPayments", fetcher);

  if (error) return <p>Error loading channel payments.</p>;

  return (
    <>
      <Head>
        <title>WiiQare | Channel Payments</title>
      </Head>
      <Dashboard title="Channel Payments">
        {!data && <p>Loading ...</p>}
        {data && <ChannelPaymentTable data={data} />}
      </Dashboard>
    </>
  );
}
