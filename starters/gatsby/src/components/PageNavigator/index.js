import React from "react";
import { Link } from "gatsby";
import * as styles from "./PageNavigator.module.css";

export default function PageNavigator({ numPages, basePath }) {
  const pageNumbers = Array.from({ length: numPages }, (_x, i) => i + 1);

  return (
    <nav>
      <ul className={styles.list}>
        Page{" "}
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber} className={styles.listItem}>
            <Link
              to={pageNumber === 1 ? basePath : basePath + `/${pageNumber}`}
              activeClassName={styles.activeLink}
            >
              {pageNumber}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
