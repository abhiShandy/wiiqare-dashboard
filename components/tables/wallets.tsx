import Image from "next/image";

const CurrencyRow = ({ wallet }: { wallet: WiiQare.Wallet }) => {
  return (
    <tr className="">
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
        {wallet.currency.icon && (
          <Image
            src={wallet.currency.icon}
            alt={wallet.currency.code}
            width={32}
            height={32}
          />
        )}
      </td>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
        <p>{wallet.description}</p>
        <p className="text-gray-500">{wallet.currency.code}</p>
      </td>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-gray-900 text-right">
        {wallet.balance} {wallet.currency.code}
      </td>
    </tr>
  );
};

export default function WalletTable({
  wallets,
}: {
  wallets: WiiQare.Wallet[];
}) {
  return (
    <>
      <div className="flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td
                      className="pl-4 py-4 bg-gray-50 font-semibold"
                      colSpan={4}
                    >
                      Fiat
                    </td>
                  </tr>
                  {wallets
                    .filter((wallet) => wallet.currency.fiat)
                    .map((wallet) => (
                      <CurrencyRow key={wallet.id} wallet={wallet} />
                    ))}
                  <tr>
                    <td
                      className="pl-4 py-4 bg-gray-50 font-semibold"
                      colSpan={4}
                    >
                      Cryptocurrency
                    </td>
                  </tr>
                  {wallets
                    .filter((wallet) => !wallet.currency.fiat)
                    .map((wallet) => (
                      <CurrencyRow key={wallet.id} wallet={wallet} />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
