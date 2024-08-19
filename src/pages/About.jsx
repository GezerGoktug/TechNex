import SectionArticle from "../components/About/SectionArticle";
import Countries from "../components/About/Countries";
import Testimonials from "../components/About/Testimonials";
import { aboutPageArticleContent } from "../constants/content";
import ContactForBrandWithUs from "../components/About/ContactForBrandWithUs";

const About = () => {
  return (
    <div className="mt-24 flex flex-col">
      <div
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(0,0,0,0.7344187675070029) 0%, rgba(0,0,0,0.15458683473389356) 100%),url(/img/sections/section.jpg)",
        }}
        className="bg-center bg-cover h-[400px] flex-center"
      >
        <h2 className="text-gradient-b  text-6xl font-bold    from-gray-100 to-zinc-500">
          About Us
        </h2>
      </div>
      <div className="custom-container">
        {aboutPageArticleContent.map((article, i) => (
          <SectionArticle key={i} article={article} />
        ))}
        <Countries />
        <Testimonials />
      </div>
      <ContactForBrandWithUs />
    </div>
  );
};

export default About;
