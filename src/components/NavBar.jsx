import Link from "next/link";
import { Press_Start_2P } from "next/font/google";
const inter = Press_Start_2P({ subsets: ["latin"], weight: ["400"] });
function NavBar() {
  return (
    <nav className="bg-black flex justify-between items-center mb-5 mx-auto p-4 border border-b-blue-700 flex-wrap">
        <div class="typewriter">
          <h1
            className={`typewriter text-green-700 font-mono text-3xl p-1 text-center ${inter.className}`}
          >
            OFS Project
          </h1>
        </div>
        <div className="flex flex-row justify-between items-center flex-wrap">
          <Link
            className="mx-auto mr-5 bg-black text-white hover:bg-white hover:text-black p-1 rounded"
            href="/"
          >
            Home
          </Link>
          <Link
            className="mx-auto mr-5 bg-black text-white hover:bg-white hover:text-black p-1 rounded"
            href="/about"
          >
            About
          </Link>
          <Link
            className="mx-auto mr-5 bg-black text-white hover:bg-white hover:text-black p-1 rounded"
            href="/product"
          >
            Products
          </Link>
        </div>
    </nav>
  );
}

export default NavBar;
