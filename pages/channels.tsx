import Head from "next/head";
import Dashboard from "../components/dashboard";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useSWR from "swr";
import axios from "axios";

type Channel = {
  id: string;
  address: string;
  reference: string;
  displayCurrency: string;
  payCurrency: string;
  dateCreated: string;
};

function CreateChannelModal() {
  let [isOpen, setIsOpen] = useState(false);
  const [payCurrency, setPayCurrency] = useState("BTC");
  const [displayCurrency, setDisplayCurrency] = useState("USD");
  const [channelRef, setChannelRef] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const createChannel: React.MouseEventHandler = async (e) => {
    try {
      const url = "/api/channels";
      await axios.post(url, {
        payCurrency,
        displayCurrency,
        reference: channelRef,
      });
      closeModal();
    } catch (error) {
      console.log("Failed to create channel!");
    }
  };

  return (
    <>
      <div className="float-right mt-2">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Create Channel
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create a channel
                  </Dialog.Title>
                  <div className="mt-2">
                    <form>
                      <div className="flex flex-col my-2">
                        <label htmlFor="payCurrency" className="my-1">
                          Select the pay currency
                        </label>
                        <select
                          name="payCurrency"
                          className="border rounded h-10 px-4 py-2"
                          value={payCurrency}
                          onChange={(e) => {
                            setPayCurrency(e.target.value);
                          }}
                        >
                          <option value="BTC">Bitcoin (BTC)</option>
                          <option value="USD">
                            United States Dollars (USD)
                          </option>
                          <option value="EUR">Euro (EUR)</option>
                        </select>
                      </div>
                      <div className="flex flex-col my-2">
                        <label htmlFor="displayCurrency" className="my-1">
                          Select the display currency
                        </label>
                        <select
                          name="displayCurrency"
                          className="border rounded h-10 px-4 py-2"
                          value={displayCurrency}
                          onChange={(e) => {
                            setDisplayCurrency(e.target.value);
                          }}
                        >
                          <option value="BTC">Bitcoin (BTC)</option>
                          <option value="USD">
                            United States Dollars (USD)
                          </option>
                          <option value="EUR">Euro (EUR)</option>
                        </select>
                      </div>
                      <div className="flex flex-col my-2">
                        <label htmlFor="description" className="my-1">
                          Channel Reference
                        </label>
                        <input
                          type="text"
                          name="description"
                          className="border rounded h-10 px-4 py-2"
                          placeholder="Brice's BTC channel"
                          value={channelRef}
                          onChange={(e) => {
                            setChannelRef(e.target.value);
                          }}
                        />
                      </div>
                    </form>
                  </div>

                  <div className="mt-4 flex justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                      onClick={createChannel}
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

const fetcher = async (url: string) => {
  const response = await fetch(url);
  return response.json();
};

const Channels = () => {
  const { data: channels, error } = useSWR<Channel[]>("/api/channels", fetcher);
  if (error) return <p>Error fetching channels!</p>;
  return (
    <>
      <Head>
        <title>WiiQare | Channels</title>
      </Head>
      <Dashboard title="Channels">
        {channels && (
          <div className="border border-gray-200 rounded-md">
            <table className="w-full">
              <thead>
                <tr className="text-left h-8">
                  <th className="pl-4">Reference</th>
                  <th>Date Created</th>
                  <th>Address</th>
                  <th className="text-right">Display Currency</th>
                  <th className="text-right pr-4">Pay Currency</th>
                </tr>
              </thead>
              <tbody>
                {channels.map((channel) => (
                  <tr
                    key={channel.id}
                    className="hover:bg-gray-200 h-8 text-left"
                  >
                    <td className="pl-4">{channel.reference}</td>
                    <td>
                      {new Date(channel.dateCreated).toISOString().slice(0, -8)}
                    </td>
                    <td>{channel.address}</td>
                    <td className="text-right">{channel.displayCurrency}</td>
                    <td className="text-right pr-4">{channel.payCurrency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <CreateChannelModal />
      </Dashboard>
    </>
  );
};

export default Channels;
