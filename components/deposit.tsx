import { Dialog } from "@headlessui/react";
import { useState } from "react";
import Modal from "./modal";

const Deposit = () => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <Modal
      buttonText="Deposit"
      isOpen={isOpen}
      openModal={openModal}
      closeModal={closeModal}
    >
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900"
      >
        Deposit
      </Dialog.Title>
      <div className="mt-2">
        <form>
          <div className="flex flex-col my-2">
            <label>Select cryptocurrency</label>
            <select className="border rounded h-10 px-4 py-2">
              <option>Bitcoin (BTC)</option>
              <option>Ethereum (ETH)</option>
            </select>
          </div>

          <div className="flex flex-col my-2">
            <label>Select display currency</label>
            <select className="border rounded h-10 px-4 py-2">
              <option>Bitcoin (BTC)</option>
              <option>United States Dollar (USD)</option>
            </select>
          </div>
        </form>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 mx-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          Next
        </button>
      </div>
    </Modal>
  );
};

export default Deposit;
