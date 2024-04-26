"use client";
import { AddUser, Navbar } from "../components/index"
import Head from "next/head"

const Home = () => {
  return (
    <div>
      <Head>
        <title>Uaer Management System</title>
      </Head>

      <Navbar />

      <main>
        <AddUser />
      </main>
    </div>
  )
}

export default Home