import styles from '../styles/Home.module.css'
import Link from "next/link";
import Head from "next/head";


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bugra</title>
      </Head>
      <Link href="/about">About</Link>
      <h1 className={styles.homePageTitle}>hello</h1>
    </div>
  )
}
