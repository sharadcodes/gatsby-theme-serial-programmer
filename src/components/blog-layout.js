import * as React from "react"
import { Link } from "gatsby"
import Bio from "../components/bio"
import Seo from "../components/seo"
import * as blogStyles from "../blog.module.css"

const BlogLayout = ({ headerTitle, children, data }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <main>
      <Seo title={`Blog | ${siteTitle}`} />
      <header>
        <Link className={blogStyles.siteTitle} to="/">
          {headerTitle}
        </Link>
      </header>
      <Bio />
      <section className={blogStyles.articles}>{children}</section>
      <footer>
        <p>&copy; {new Date().getFullYear()}</p>
      </footer>
    </main>
  )
}

export default BlogLayout
