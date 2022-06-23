import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import Dashboard from "../../components/dashboard";
import { fetcher } from "../../utils/fetcher";

const Patient = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(`/api/patients/${id}`, fetcher);

  if (error) return <p>Error getting Patient</p>;

  if (!data) return <p>Loading...</p>;

  return (
    <>
      <Head>
        <title>WiiQare | Patient</title>
      </Head>
      <Dashboard title={data.name}>
        <div className="text-lg">Email: {data.email}</div>
      </Dashboard>
    </>
  );
};

export default Patient;
