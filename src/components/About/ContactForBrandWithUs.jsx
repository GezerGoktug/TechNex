import { MdOutlineAlternateEmail, MdSend } from "react-icons/md"
import Logo from "../UI/Logo"
import Input from "../UI/Input"
import Button from "../UI/Button"




const ContactForBrandWithUs = () => {
  return (
    <section   className="bg-indigo-950  py-12 ">
    <div className="custom-container flex flex-col-reverse sm:flex-row gap-6 ">
      <div className="text-white sm:w-1/2" >
        <Logo/>
        <h5 className="font-bold text-2xl lg:text-3xl my-3">Would you like to grow your brand with us?</h5>
        <p className="font-medium lg:text-lg">
        At Tech Nex, we&#39;re here to help your brand grow and achieve your goals. By working with us, you can meet our unique solutions and expert team and take your brand to the next level.<br/><br/>
        <span className="font-bold ">
        Contact us and let&#39;s grow your brand together!
        </span>
        </p>
        <form className="flex flex-col gap-3 mt-4 text-black">
        <Input
          placeholder="Your email"
          type="email"
          className="lg:w-3/4"
          leftIcon={<MdOutlineAlternateEmail />}/>
        <textarea
          placeholder="Your message"
          className="p-2 rounded-lg outline-none   lg:w-3/4 max-h-48 min-h-24  border-2 border-zinc-200"
        />
        <Button
          type="submit"
          className="border-slate-200 border text-slate-200 hover:text-black rounded hover:bg-slate-200 w-max "
        >
         <MdSend /> Send
        </Button>
      </form>
      </div>
      <img className="sm:w-1/2 object-contain rounded-2xl  min-[430px]:h-[500px] bg-[#119ABF]" src="/img/sections/about/marketing.png" alt="marketing" />
    </div>
  </section>
  )
}

export default ContactForBrandWithUs