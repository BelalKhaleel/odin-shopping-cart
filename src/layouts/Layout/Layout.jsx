import { Outlet } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import styles from './Layout.module.css'

const Layout = () => {
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout;