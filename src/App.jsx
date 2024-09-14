import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@/components/common/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "@/routes";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <AppRoutes />
        <Toaster />
        <ToastContainer
          toastClassName={() =>
            "relative flex py-4 px-3 rounded overflow-hidden cursor-pointer bg-white shadow-lg"
          }
          bodyClassName={() => "text-black text-base font-normal"}
          position="bottom-left"
          autoClose={4000}
          hideProgressBar={true}
          newestOnTop={false}
          closeButton={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;
