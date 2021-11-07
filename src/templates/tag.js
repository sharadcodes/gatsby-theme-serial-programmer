import * as React from "react"
import { Link, graphql } from "gatsby"
import TagLayout from "../components/tag-layout"
import * as blogStyles from "../blog.module.css"

const TagIndex = ({ data, pageContext }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.edges
  const { tag } = pageContext

  if (posts.length === 0) {
    return (
      <TagLayout headerTitle={siteTitle} title={tag}>
        <p>No blog posts found.</p>
      </TagLayout>
    )
  }

  return (
    <TagLayout headerTitle={siteTitle} title={tag}>
      {posts.map(post => {
        const { node } = post
        const title = node.frontmatter.title || node.fields.slug
        const date = node.frontmatter.date
        return (
          <article className={blogStyles.article} key={node.fields.slug}>
            <h2 className={blogStyles.articleTitle}>
              <Link to={node.fields.slug} itemProp="url">
                {title}
              </Link>
            </h2>
            <small className={blogStyles.date}>{date}</small>
            <div className={blogStyles.tags}>
              {node.frontmatter.tags.map((tag, i) => (
                <Link key={i} to={`/tags/${tag}`} className={blogStyles.tag}>
                  {tag}
                </Link>
              ))}
            </div>
          </article>
        )
      })}
    </TagLayout>
  )
}

export default TagIndex

export const pageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      filter: { fields: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            tags
          }
        }
      }
    }
  }
`
