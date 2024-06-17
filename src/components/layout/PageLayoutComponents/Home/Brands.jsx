import Slider from "react-slick";
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

const Brands = () => {
  const settings = {
    infinite: true,
    slidesToShow: 6,
    pauseOnHover: false,
    autoplay: true,
    arrows: false,
    speed: 2000,
    autoplaySpeed: 0,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 930,
        settings: {
          slidesToShow: 5,
          speed:2250
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          speed:2500
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
          speed:3000
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
          speed:3500
        },
      },
    ],
  };
  return (
    <>
      <h5 className="text-center text-gradient-b from-slate-400 to-slate-600 px-6 py-6  text-4xl md:text-5xl font-bold mx-auto  border-b-2 border-dashed border-slate-500">
        The best brands are here!
      </h5>
      <div className="my-12 slider-container py-12 bg-gradient-to-b from-slate-200 to-zinc-200    ">
        <Slider {...settings}>
          <SiApple className=" brand-item" />
          <SiSamsung className="brand-item" />
          <SiJbl className="brand-item" />
          <SiXiaomi className="brand-item" />
          <SiHuawei className="brand-item" />
          <SiLg className="brand-item" />
          <SiHp className="brand-item" />
          <SiLenovo className="brand-item" />
          <SiAsus className="brand-item" />
          <SiMonster className="brand-item" />
        </Slider>
      </div>
    </>
  );
};

export default Brands;
