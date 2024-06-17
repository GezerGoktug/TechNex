import { Fragment, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer/Footer";
import SideBar from "../components/layout/SideBar";
import { AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import Button from "../components/UI/Button";
import { FaArrowUp } from "react-icons/fa6";
import { motion } from "framer-motion";
import Cookies from "../components/UI/Cookies";
import Modal from "../components/layout/Modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  const [modal, setModal] = useState(false);
  const [cookies, setCookies] = useState(
    JSON.parse(localStorage.getItem("cookiesPrefer")) ?? true
  );
  const [showButton, setShowButton] = useState(false);
  const [sideBar, setSideBar] = useState(false);
  const { pathname } = useLocation();
  const { scrollY } = useScroll();
  const scrollToTop = (isSmooth) => {
    window.scrollTo({
      top: 0,
      behavior: isSmooth ? "smooth" : "auto",
    });
  };
  //! Her sayfa değiştiğinde sayfanın en başına dön
  useEffect(() => {
    scrollToTop(false);
  }, [pathname]);

  //! Çerez tercihinden sonra modalı bi daha gösterme ve localde tercihi sakla
  useEffect(() => {
    localStorage.setItem("cookiesPrefer", JSON.stringify(cookies));
  }, [cookies]);

  //! Return top butonunu belirli bir scroll kaydırmadan sonra göster
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest >= 730) setShowButton(true);
    else setShowButton(false);
  });

  return (
    <Fragment>
      <ToastContainer />
      <AnimatePresence>
        {modal.isOpen && <Modal modal={modal} setModal={setModal} />}
      </AnimatePresence>

      <AnimatePresence>
        {sideBar && <SideBar setSideBar={setSideBar} />}
      </AnimatePresence>
      {pathname !== "/auth" && <Header setSideBar={setSideBar} />}
      <main className="overflow-x-hidden">
        <Outlet context={{ setModal }} />
      </main>
      {pathname !== "/auth" && <Footer />}
      <AnimatePresence>
        {showButton && (
          <motion.div
            className="fixed bottom-5 right-5 sm:bottom-10 sm:right-10 "
            onClick={() => scrollToTop(true)}
            initial={{ y: 100, opacity: 0 }}
            exit={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Button className="btn-return-top">
              <FaArrowUp />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {cookies && <Cookies setCookies={setCookies} />}
      </AnimatePresence>
    </Fragment>
  );
};

export default Layout;
