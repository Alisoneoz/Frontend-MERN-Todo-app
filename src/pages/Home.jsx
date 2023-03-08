import DisplayData from "../components/DisplayData";
import CreateData from "../components/CreateData";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className=" sm:flex sm:flex-col">
    <Header />
  

    <div className="App font-josefin flex flex-col-reverse lg:grid lg:grid-cols-2 sm:gap-x-8  justify-center px-4 w-screen ">

      <DisplayData />
      <CreateData />
    </div>
    </div>
  );
};

export default Home;
