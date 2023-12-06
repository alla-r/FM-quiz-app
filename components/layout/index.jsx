import Header from "./header";
import styles from "./layout.module.css";

function Layout(props) {
  <div className={styles.background}>
    <Header />
    <main>{props.children}</main>
  </div>;
}

export default Layout;
