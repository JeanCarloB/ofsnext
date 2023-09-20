import Link from "next/link"
import Image from 'next/image';
import LogoImage from "@/assets/images/UNA.png"
function NavBar() {
  return (
    <nav className='bg-black grid sm:grid-cols-2 md:grid-cols-   grid-rows-1 lg:grid-cols-2 justify-center items-center mb-16 h-16 mx-auto p-4'>
        <ul className="flex flex-row justify-evenly items-center h-16">
            <Image src={LogoImage} alt="Logo" className=" w-20" priority="true"></Image>
            <Link className="mx-auto mr-5 bg-black text-white hover:bg-white hover:text-black p-1 rounded" href="/">Home</Link>  
            <Link className="mx-auto mr-5 bg-black text-white hover:bg-white hover:text-black p-1 rounded" href="/about">About</Link>
            <Link className="mx-auto mr-5 bg-black text-white hover:bg-white hover:text-black p-1 rounded" href="/product">Products</Link>
        </ul>
    </nav>
  )
}

export default NavBar