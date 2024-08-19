import { countriesInfo } from "../../constants/content";
import Logo from "../UI/Logo";
import CountryCard from "./CountryCard";

const Countries = () => {
  return (
    <section className="my-24">
      <div className="col-center  text-center gap-4 mb-12">
        <Logo />
        <div className="text-5xl sm:text-7xl text-gradient-b from-emerald-100 to-green-900 font-bold">
          Around the World
        </div>
        <p className=" font-normal text-lg sm:text-2xl italic">
          Location does not matter. We are a global brand that has spread to
          many countries, with our main buildings in major cities of the world.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {countriesInfo.map((item, i) => (
          <CountryCard key={i} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Countries;
