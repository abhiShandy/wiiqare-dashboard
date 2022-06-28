export type Expat = {
  id: string;
  email: string;
  name?: string;
  kyc: string;
};

export type Patient = Omit<Expat, "kyc">;

export as namespace WiiQare;
