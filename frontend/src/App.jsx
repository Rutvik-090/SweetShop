import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Add from "./components/Add";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import PurchaseSweets from "./components/PurchaseSweets";
import RestockSweet from "./components/RestockSweets";
import ViewSweets from "./components/ViewSweets";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/create" element={<Add />} />
            <Route path="/view" element={<ViewSweets />} />
            <Route path="/purchase" element={<PurchaseSweets />} />
            <Route path="/restock" element={<RestockSweet />} />
          </Routes>
        </main>
        <Footer />
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
