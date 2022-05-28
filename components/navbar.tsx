import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex flex-row gap-3 m-3 justify-center">
      <Link href="/">Home</Link>
      <Link href="/currencies">Currencies</Link>
      <Link href="/channels">Channels</Link>
      <Link href="/payments">Payments</Link>
      <Link href="/merchants">Merchants</Link>
    </nav>
  );
};

export default Navbar;
