import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Header from "../components/header/Header";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Next Js Cart Example</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <div className="Section">
        <h1>Cart Example</h1>
      </div>
    </div>
  );
}
