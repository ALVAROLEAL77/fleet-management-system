import Link from "next/link";

const Card = ({ Icon, count, name, path }: any) => {
  return (
    <Link
      href={path}
      className="h-24 md:w-60 w-full p-4 m-2 rounded-xl bg-primary bg-opacity-10 backdrop-blur-xl border-double border-2 border-secondary gap-3 flex items-center justify-evenly duration-700 transition-all hover:animate-pulse focus:outline-none "
    >
      <Icon className={`text-5xl text-tertiary shadow-secondary`} />
      <div className="p-2 text-sm font-medium text-center flex flex-col justify-center items-center">
        <div className="flex items-center gap-1">
          <p className="font-bold font-rock md:text-xl text-2xl text-tertiary">
            {count}
          </p>
        </div>{" "}
        <h5 className="mb-2 text-md font-bold font-rock tracking-widest text-tertiary uppercase">
          {name}
        </h5>
      </div>
    </Link>
  );
};

export default Card;
