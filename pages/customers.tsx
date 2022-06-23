import { MongoClient, WithId } from "mongodb";
import Head from "next/head";
import Dashboard from "../components/dashboard";

type Expat = {
  id: string;
  email: string;
  name?: string;
  kyc: string;
};

type Patient = Omit<Expat, "kyc">;

type Props = {
  expats: Expat[];
  patients: Patient[];
};

const Customers = ({ expats, patients }: Props) => {
  return (
    <>
      <Head>
        <title>WiiQare | Customers</title>
      </Head>
      <Dashboard title="Customers">
        <h2 className="text-xl font-bold m-4">Expats</h2>
        <div className="border border-gray-200 rounded-md">
          <table className="w-full">
            <thead>
              <tr className="text-left h-8">
                <th className="pl-4">ID</th>
                <th>Email</th>
                <th>Name</th>
                <th className="text-right pr-4">KYC</th>
              </tr>
            </thead>
            <tbody>
              {expats.map((expat) => (
                <tr key={expat.id} className="hover:bg-gray-200 h-8 text-left">
                  <td className="pl-4">{expat.id}</td>
                  <td>{expat.email}</td>
                  <td>{expat.name ? expat.name : "N/A"}</td>
                  <td className="text-right pr-4">{expat.kyc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-xl font-bold m-4">Patients</h2>
        <div className="border border-gray-200 rounded-md">
          <table className="w-full">
            <thead>
              <tr className="text-left h-8">
                <th className="pl-4">ID</th>
                <th>Email</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr
                  key={patient.id}
                  className="hover:bg-gray-200 h-8 text-left"
                >
                  <td className="pl-4">{patient.id}</td>
                  <td>{patient.email}</td>
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

  const expatCursor = client.db("customers").collection<Expat>("expats").find();
  const projectExpatCursor = expatCursor.project<Expat>({ _id: 0 });

  const patientCursor = client
    .db("customers")
    .collection<Patient>("patients")
    .find();
  const projectPatientCursor = patientCursor.project<Patient>({ _id: 0 });

  try {
    const expats = await projectExpatCursor.toArray();
    const patients = await projectPatientCursor.toArray();

    return { props: { expats, patients } };
  } catch (error) {
    console.log("Error converting patients and/or expats to array");
    return { props: { expats: [], patients: [] } };
  }
};

export default Customers;
