import { RouterProvider } from "react-router-dom";
import { route } from "./routers/route";

function App() {
  return <RouterProvider router={route} />;
}

export default App;
