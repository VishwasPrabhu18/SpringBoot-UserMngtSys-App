"use client";
import { AddUser, Navbar, UserList } from "../components/index"
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
        <UserList />
      </main>
    </div>
  )
}

export default Home