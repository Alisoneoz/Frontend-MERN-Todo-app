import { BiLoaderCircle } from "react-icons/bi";

const Loader = () => {
  return (
    <div className="flex text-xl font-bold text-blue-800 dark:text-blue-300 sm:w-full sm:items-center justify-center sm:mt-0  sm:py-28 py-12 sm:text-3xl mx-auto">
    <BiLoaderCircle className="animate-spin" />
    <p>Loading...</p>
  </div>
  )
}

export default Loader