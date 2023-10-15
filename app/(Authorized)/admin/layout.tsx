"use client";
import { ReactNode, useState } from "react";
import SideBar from "./_components/SideBar";
import Header from "./_components/Header";
import Drop from "./_components/Drop";
// import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const PLayout = ({ children }: { children: ReactNode }) => {
  const [flat, setflat] = useState(true);
  const [drop, setdrop] = useState(false);
  // const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <>
      <div className="overflow-hidden w-full flex justify-stretch items-stretch">
        <SideBar flat={flat} setflat={setflat} />
        <div className="flex flex-col items-start justify-start w-full mx-8">
          <Header setflat={setflat} flat={flat} setdrop={setdrop} drop={drop} />
          {children}
        </div>

        <Drop drop={drop} />
      </div>
    </>
  );
};

export default PLayout;
