"use client";
import { ReactNode, useState } from "react";
import SideBar from "./_components/SideBar";
import Header from "./_components/Header";
import Drop from "./_components/Drop";
// import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const PLayout = ({ children }: { children: ReactNode }) => {
  const [mSlider, setMSlider] = useState(false);
  const [drop, setdrop] = useState(false);
  // const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <>
      <div className="overflow-hidden md:gap-0 w-full flex justify-stretch items-stretch">
        <SideBar mSlider={mSlider} />
        <div className="flex flex-col items-start justify-start w-full md:mx-6 m-1 md:m-0 md:mt-1 ">
          <Header setdrop={setdrop} drop={drop} setMSlider={setMSlider} />
          {children}
        </div>

        <Drop drop={drop} />
      </div>
    </>
  );
};

export default PLayout;
