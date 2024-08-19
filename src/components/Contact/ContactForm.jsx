import {
  MdOutlineAlternateEmail,
  MdOutlineSubject,
  MdSend,
} from "react-icons/md";
import Button from "../UI/Button";
import { motion } from "framer-motion";
import Input from "../UI/Input";
import { RiText } from "react-icons/ri";
import { fadeInLeft } from "../../animations/variants";

const ContactForm = () => {
  return (
    <motion.form
      variants={fadeInLeft}
      whileInView="open"
      initial="close"
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="sm:w-1/2"
    >
      <h4 className="font-bold text-4xl mb-4">Get in touch</h4>
      <div className="flex gap-2   md:gap-4 mb-2">
        <Input
          placeholder="Your name"
          className="w-1/2 "
          leftIcon={<RiText />}
        />
        <Input
          placeholder="Your email"
          type="email"
          className="w-1/2 "
          leftIcon={<MdOutlineAlternateEmail />}
        />
      </div>
      <Input
        placeholder="Subject"
        className="w-full mb-2"
        leftIcon={<MdOutlineSubject />}
      />

      <textarea
        placeholder="Your message"
        className="w-full outline-none rounded-lg p-2 min-h-48 max-h-96   border-2 border-zinc-200"
      ></textarea>
      <Button
        className="bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        type="submit"
      >
        <MdSend /> Send Message
      </Button>
    </motion.form>
  );
};

export default ContactForm;
