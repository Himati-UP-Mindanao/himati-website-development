import Image from "next/image";


export default function Home() {
  
  return (
    <div className="bg-black w-screen h-screen flex justify-center items-center text-white">
      <Image src="/logo/himati-logo.png" alt="Himati Logo" height={150} width={150}/>
      <div className="border h-40 ml-10 mr-10"></div>
      <div>
        <p className="font-bold text-2xl mb-2">Website Under Construction</p>
        <p>Stay tuned!</p>
      </div>
    </div>
  );
}