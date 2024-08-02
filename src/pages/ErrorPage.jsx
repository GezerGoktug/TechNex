import { useNavigate } from "react-router-dom";
import Button from "../components/UI/Button";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-slate-200 text-center   h-screen col-center gap-3  justify-center">
      <img
        className="h-48 sm:h-72"
        src="../public/img/sections/error.png"
        alt="error"
      />
      <h4 className="text-4xl sm:text-6xl font-bold">Oops... Not Founded</h4>
      <p className="text-lg sm:text-xl font-semibold">
        Something went wrong. Page not found.
      </p>
      <Button
        className="bg-red-400 rounded-full hover:bg-red-500 transition-colors "
        onClick={() => navigate(-1)}
      >
        Return previous page
      </Button>
    </div>
  );
};

export default ErrorPage;
