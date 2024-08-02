import { Link } from "react-router-dom";
import Button from "./Button";
import { motion } from "framer-motion";
import { Card } from "flowbite-react";

const Cookies = ({ setCookies }) => {
  const handleCookie = () => setCookies(false);
  return (
    <motion.div
      initial={{ y: 200, opacity: 0 }}
      exit={{ y: 200, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="z-20 sm:p-4 fixed left-0 bottom-0 sm:left-2 sm:bottom-2 sm:w-[400px] min-[800px]:w-[600px] "
    >
      <Card className="!bg-slate-100">
        <h6 className="font-semibold text-xl min-[800px]:text-2xl border-b-2 border-black pb-4">
          Cookie Use
        </h6>
        <p className="font-medium text-sm min-[800px]:text-base">
          Cookies are used when you visit our site. These cookies are necessary
          to make our site work properly, personalize content and improve your
          user experience. They also help us understand how you use our site and
          improve it.
          <br />
          You can visit our{" "}
          <Link className="text-blue-700 hover:underline" to="">
            &quot;Cookie Policy&quot;
          </Link>{" "}
          page to get more information about cookies. By using our site you
          accept our use of cookies.
        </p>
        <div className="flex flex-wrap justify-start  gap-2">
          <Button className="cookies-button">Decline</Button>
          <Button className="cookies-button">Manage the cookies</Button>
          <Button className="cookies-button" onClick={handleCookie}>
            Accept
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default Cookies;
