import Imagen1 from "@/assets/images/panel1.jpg"
import Imagen2 from "@/assets/images/panel2.jpg";
import Imagen3 from "@/assets/images/panel3.jpg";
import Image from 'next/image';
function Products() {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <h1 className="font-bold text-center text-5xl mb-5">☀️ Solar panels Inc.</h1>
      <div className="container flex flex-row gap-3 justify-center  flex-wrap">
        <Image className=" w-80" src={Imagen1} alt="Panel solar img 1"/>
        <Image className=" w-80" src={Imagen2} alt="Panel solar img 2"/>
        <Image className=" w-80" src={Imagen3} alt="Panel solar img 3"/>
      </div>
      <p className=" text-justify p-5 w-9/12 bg-red-500 text-white rounded">Solar Panels Inc. is a leading provider of renewable energy solutions. We specialize in the design, installation, and distribution of high-quality solar panels and related equipment. Our mission is to empower individuals and businesses to harness the power of the sun to reduce energy costs and minimize their environmental footprint.</p>
    </div>
  );
}

export default Products;