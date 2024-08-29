import {
  SiApple,
  SiAsus,
  SiHp,
  SiHuawei,
  SiJbl,
  SiLenovo,
  SiLg,
  SiMonster,
  SiSamsung,
  SiXiaomi,
} from "react-icons/si";
import Marquee from "react-fast-marquee";

const Brands = () => {
  return (
    <>
      <h5 className="text-center text-gradient-b from-slate-400 to-slate-600 px-6 py-6 text-4xl md:text-5xl font-bold mx-auto border-b-2 border-dashed mb-12 border-slate-500">
        The best brands are here!
      </h5>
      <div className="overflow-hidden bg-gradient-to-b from-slate-200 to-zinc-200 py-12">
        <Marquee speed={50} pauseOnHover={false} gradient={false}>
          <div className="flex gap-24 mx-12">
            <SiApple className="brand-item" />
            <SiSamsung className="brand-item" />
            <SiJbl className="brand-item" />
            <SiXiaomi className="brand-item" />
            <SiHuawei className="brand-item" />
            <SiLg className="brand-item" />
            <SiHp className="brand-item" />
            <SiLenovo className="brand-item" />
            <SiAsus className="brand-item" />
            <SiMonster className="brand-item" />
          </div>
        </Marquee>
      </div>
    </>
  );
};

export default Brands;
