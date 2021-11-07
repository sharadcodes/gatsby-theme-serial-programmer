import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import * as blogStyles from "../blog.module.css"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            dp
            bio
            social {
              title
              username
            }
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author

  return (
    <section className={blogStyles.bio}>
      <section className={blogStyles.imgWrapper}>
        <img src={author.dp} alt="DP" />
      </section>
      <section className={blogStyles.bioWrapper}>
        <div
          className={blogStyles.textWrapper}
          dangerouslySetInnerHTML={{ __html: author.bio }}
        />
        <div className={blogStyles.socialWrapper}>
          {author.social.map((social_id, i) => (
            <a
              href={social_id.username}
              target="_blank"
              rel="noreferrer"
              key={i}
            >
              <img
                src={`https://sharadcodes.github.io/hugo-theme-serial-programmer/assets/icons/${social_id.title}.png`}
                alt=""
              />
            </a>
          ))}
        </div>
      </section>
    </section>
  )
}

export default Bio
