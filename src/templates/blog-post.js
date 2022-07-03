import * as React from "react"
import { graphql } from "gatsby"
import PostLayout from "../components/post-layout"
import * as postStyles from "../post.module.css"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <PostLayout
      location={location}
      headerTitle={siteTitle}
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
      date={post.frontmatter.date}
      tags={post.frontmatter.tags}
    >
      <div
        className={postStyles.content}
        id="md-content"
        dangerouslySetInnerHTML={{ __html: post.html }}
        itemProp="articleBody"
      />
    </PostLayout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
