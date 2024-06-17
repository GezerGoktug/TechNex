import ContactForm from "./ContactForm";
import ContactLinks from "./ContactLinks";

const ContactSection = () => {
  return (
    <section className="flex flex-col sm:flex-row gap-6  mt-12">
      <ContactForm />
      <ContactLinks />
    </section>
  );
};

export default ContactSection;
