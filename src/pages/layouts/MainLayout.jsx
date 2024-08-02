import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Fragment, useEffect, useState } from "react";
import SideBar from "../../components/layout/SideBar";
import Header from "../../components/layout/Header";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../components/layout/Footer/Footer";
import Button from "../../components/UI/Button";
import { FaArrowUp } from "react-icons/fa6";
import { scrollToTop } from "../../helpers/scrollToTop";
import Cookies from "../../components/UI/Cookies";

const MainLayout = () => {
  const [cookies, setCookies] = useState(
    JSON.parse(localStorage.getItem("cookiesPrefer")) ?? true
  );
  const [showButton, setShowButton] = useState(false);
  const [sideBar, setSideBar] = useState(false);
  const { scrollY } = useScroll();

  //! Çerez tercihinden sonra modalı bi daha gösterme ve localde tercihi sakla
  useEffect(() => {
    localStorage.setItem("cookiesPrefer", JSON.stringify(cookies));
  }, [cookies]);

  //! Return top butonunu belirli bir scroll kaydırmadan sonra göster
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest >= 730) setShowButton(true);
    else setShowButton(false);
  });
  const { pathname } = useLocation();
  //! Her sayfa değiştiğinde sayfanın en başına dön
  useEffect(() => {
    scrollToTop(false);
  }, [pathname]);
  return (
    <Fragment>
      <AnimatePresence>
        {sideBar && <SideBar setSideBar={setSideBar} />}
      </AnimatePresence>
      <Header setSideBar={setSideBar} />
      <main className="overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
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

export default MainLayout;
