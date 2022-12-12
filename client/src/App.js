import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Payment from "./pages/payment";
import BookYoga from "./pages/BookYoga";
import GetSchedule from "./pages/GetSchedule";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<BookYoga />} />
        <Route path="/upcoming" element={<GetSchedule />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </>
  );
}

export default App;
