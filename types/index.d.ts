type Admin = {
  id: string;
  email: string;
  name?: string;
};

type Currency = {
  name: string;
  code: string;
  depositFee: string;
  withdrawalFee: string;
};

export type Expat = {
  id: string;
  email: string;
  name?: string;
  kyc: string;
};

type Merchant = {
  merchantId: string;
  displayName: string;
  wallet: {
    currency: {
      code: string;
    };
  };
};

type Patient = Omit<Expat, "kyc">;

type Payment = {
  uuid: string;
  type: string;
  status: string;
  dateCreated: string;
  displayCurrency: {
    amount: number;
    currency: string;
  };
};

type Quote = {
  id: string;
  from: string;
  to: string;
  paymentStatus: string;
  dateCreated: string;
};

type Wallet = {
  id: string;
  balance: string;
  currency: {
    code: string;
    name: string;
    icon: string;
    fiat: boolean;
  };
  description: string;
};

export as namespace WiiQare;
