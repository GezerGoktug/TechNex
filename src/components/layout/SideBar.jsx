import { Link } from "react-router-dom"
import { FaXmark } from "react-icons/fa6"
import { motion } from "framer-motion"
import Logo from "../UI/Logo"
import Overlay from "./SideBarOverlay"

const SideBar = ({setSideBar}) => {
  return (
    <Overlay setSideBar={setSideBar}>
        <motion.aside
        initial={{x:"-65%"}}
        animate={{x:0}}
        transition={{duration:0.3}}
        exit={{x:"-100%"}}
        className="w-3/4 min-[360px]:w-[65%] min-[460px]:w-[50%] relative p-6 text-white me-auto h-full backdrop-blur-lg border-e border-slate-500">
        <FaXmark onClick={()=>setSideBar(false)} className="absolute top-6 right-6 text-2xl"/>
        <Logo/>
            <ul className="font-semibold mt-6 flex flex-col gap-3 text-xl">
                <li ><Link to="">Home</Link></li>
                <li ><Link to="about">About</Link></li>
                <li ><Link to="products">Products</Link></li>
                <li ><Link to="contact">Contact</Link></li>
            </ul>
            <ul className="my-4 flex flex-wrap font-medium text-slate-300 gap-2">
                <li ><Link>Privacy</Link></li>
                <li ><Link>Terms</Link></li>
                <li ><Link>Policy</Link></li>
                <li ><Link>Cookies</Link></li>
                <li ><Link>Advertising</Link></li>
            </ul>
            <div className=" italic text-sm">&copy; 2024 All Rights Reserved</div>
        </motion.aside>
    </Overlay>

  )
}

export default SideBar