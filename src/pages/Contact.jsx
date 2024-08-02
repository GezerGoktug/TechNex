import ContactSection from "../components/layout/Contact/ContactSection";

const Contact = () => {
  return (
    <div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.3854137682806!2d28.932030340178514!3d41.02761075908518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac489ee661c8d%3A0xfc787dcae8aaf76!2zxLBCQiBZb2wgQmFrxLFtIFZlIEFsdHlhcMSxIEtvb3JkaW5hc3lvbiBEYWlyZSBCYcWfa2FubMSxxJ_EsQ!5e0!3m2!1str!2str!4v1716059547792!5m2!1str!2str"
        className="w-full mt-20 h-[500px]"
        loading="lazy"
      ></iframe>
      <div className="custom-container my-16">
        <h3 className="font-bold font-playfair text-5xl text-center text-gradient-r from-zinc-200 to-slate-700 italic">
          Contact Us
        </h3>
        <ContactSection />
      </div>
    </div>
  );
};

export default Contact;
