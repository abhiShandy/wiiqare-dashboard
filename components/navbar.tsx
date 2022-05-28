import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex flex-row gap-3 m-3 justify-center">
      <Link href="/">Home</Link>
      <Link href="/currencies">Currencies</Link>
      <Link href="/channels">Channels</Link>
    </nav>
  );
};

export default Navbar;
