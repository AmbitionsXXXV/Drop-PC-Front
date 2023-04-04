import { useUserContext } from "@/hooks/userHooks";

/**
 *
 */
const Home = () => {
  const { store } = useUserContext();
  return <div className="h-[400px] bg-red-500">{store.tel}</div>;
};

export default Home;
