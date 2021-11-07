import * as React from "react"
import { Link } from "gatsby"
import "../common.css"
import * as blogStyles from "../blog.module.css"

const TagLayout = ({ headerTitle, title, children }) => {
  return (
    <main>
      <header>
        <Link className={blogStyles.siteTitle} to="/">
          {headerTitle}
        </Link>
      </header>
      <h2>Tag: {title}</h2>
      <section className={blogStyles.articles}>{children}</section>
      <footer>
        <p>&copy; {new Date().getFullYear()}</p>
      </footer>
    </main>
  )
}

export default TagLayout
