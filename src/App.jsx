import { Button, message } from "antd";
import "./App.css";
import "antd/dist/reset.css";
import SpinAll from "./components/SpinAll";
import AppRouter from "./router";
import { ToastContainer, toast } from "react-toastify";
function App() {
  return (
    <>
      <SpinAll />
      <ToastContainer />
      <AppRouter />
    </>
  );
}

export default App;
