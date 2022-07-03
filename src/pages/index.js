import * as React from "react"
import { Link, graphql } from "gatsby"
import BlogLayout from "../components/blog-layout"
import Seo from "../components/seo"
import * as blogStyles from "../blog.module.css"

const BlogIndex = ({ data }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <BlogLayout title={siteTitle}>
        <Seo title="Blog" />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </BlogLayout>
    )
  }

  return (
    <BlogLayout headerTitle={siteTitle}>
      {posts.map(post => {
        const title = post.frontmatter.title || post.fields.slug
        const date = post.frontmatter.date
        return (
          <article className={blogStyles.article} key={post.fields.slug}>
            <h2 className={blogStyles.articleTitle}>
              <Link to={post.fields.slug} itemProp="url">
                {title}
              </Link>
            </h2>
            <small className={blogStyles.date}>{date}</small>
            <div className={blogStyles.tags}>
              {post.frontmatter.tags.map((tag, i) => (
                <Link key={i} to={`tags/${tag}`} className={blogStyles.tag}>
                  {tag}
                </Link>
              ))}
            </div>
          </article>
        )
      })}
    </BlogLayout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          tags
        }
      }
    }
  }
`
