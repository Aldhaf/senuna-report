import Head from "next/head";
import Tabs from "./Tabs";

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Tabs Example</title>
      </Head>
      <Tabs />
    </div>
  );
};

export default Home;