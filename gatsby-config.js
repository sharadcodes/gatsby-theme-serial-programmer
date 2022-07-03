module.exports = {
  siteMetadata: {
    title: `Gatsby Serial Programmer`,
    author: {
      name: `Sharad Raj`,
      bio: `<p>
              Developed by Sharad Raj who lives in India building useful things for the world.
            </p>
            <p>
              You should follow him on <a href="https://github.com/sharadcodes">Github</a>
            </p>
            `,
      dp: "https://avatars2.githubusercontent.com/u/36638057?s=460&u=0cbe4fd6b5a3655d91b3eb86db834d0829a0c086&v=4",
      social: [
        {
          title: "github",
          username: `sharadcodes`,
          url: `https://github.com/`,
        },
        {
          title: "linkedin",
          username: `srsmaurya`,
          url: `https://linkedin.com/in/`,
        },
        {
          title: "twitter",
          username: `sharadcodes`,
          url: `https://twitter.com/`,
        },
        { title: "dev", username: `sharadcodes`, url: `https://dev.to/` },
        { title: "email", username: `me@example.com`, url: `mailto:` },
      ],
    },
    description: `A gatsby theme for serial programmers.`,
    siteUrl: `https://sharadcodes.github.io/gatsby-theme-serial-programmer`,
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              classPrefix: "language-",
              showLineNumbers: true,
              noInlineHighlight: false,
            },
          },
          {
            resolve: "gatsby-plugin-tags",
            options: {
              templatePath: `${__dirname}/src/templates/tag.js`,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Gatsby Serial Programmer RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Serial Programmer`,
        short_name: `Gatsby Serial Programmer`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
