import useDocumentTitle from "../hooks/useDocumentTitle";

const Home = () => {
  useDocumentTitle("Booking Platform");
  return (
    <main className="pt-32 pb-12">
      <h2 className="text-center font-bold text-2xl">
        Welcome! <br />
      </h2>
    </main>
  );
};

export default Home;
