import Slider from "react-slick"
import TestimonialsCard from "./TestimonialsCard"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { testimonialsContent } from "../../constants/content";


const Testimonials = () => {
  //! Testimonials kısmı yorum slideri ayarları
    const setting = {
        dots: true,
        slidesToShow: 3,
        responsive: [
          {
            breakpoint: 930,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      };
  return (
    <section className="col-center text-center">
        <h4 className=" text-5xl font-playfair sm:text-6xl font-extrabold text-gradient-r from-cyan-500 to-blue-950 p-6 border-b-2 border-dashed border-slate-600">What did they say about us?</h4>
        <div className="my-12 slider-container  w-full    ">
        <Slider {...setting}>
          {testimonialsContent.map((item, i) => (
            <TestimonialsCard item={item} key={i}/>
          ))}
        </Slider>
      </div>
    </section>
  )
}

export default Testimonials