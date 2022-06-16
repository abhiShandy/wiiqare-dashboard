import { MongoClient, WithId } from "mongodb";
import Head from "next/head";
import Dashboard from "../components/dashboard";

type Customer = {
  id: string;
  email: string;
  name?: string;
  kyc: string;
};

const Customers = ({ customers }: { customers: Customer[] }) => {
  return (
    <>
      <Head>
        <title>WiiQare | Customers</title>
      </Head>
      <Dashboard title="Customers">
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
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="hover:bg-gray-200 h-8 text-left"
                >
                  <td className="pl-4">{customer.id}</td>
                  <td>{customer.email}</td>
                  <td>{customer.name ? customer.name : "N/A"}</td>
                  <td className="text-right pr-4">{customer.kyc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Dashboard>
    </>
  );
};

export const getServerSideProps = async () => {
  const client = new MongoClient(process.env.MONGODB_URL || "");

  try {
    await client.connect();
  } catch (error) {
    console.log("Error connecting to MongoDB");
    return { props: { customers: [] } };
  }

  const cursor = client.db("customers").collection<Customer>("expats").find();

  const projectCursor = cursor.project<Customer>({ _id: 0 });

  try {
    const customers = await projectCursor.toArray();
    return { props: { customers: customers } };
  } catch (error) {
    console.log("Error converting to array");
    return { props: { customers: [] } };
  }
};

export default Customers;
