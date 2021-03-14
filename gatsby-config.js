/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: 'A dev blog',
    description: 'A blog about software development.'
  },
  /* Your site config here */
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/src/blog`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
        ]
      }
    },
    `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
          name: 'pages',
          engine: 'flexsearch',
          query: `
          query MetadataQuery {
            allMarkdownRemark(
              sort: { fields: frontmatter___date, order: DESC }
            ) {
              nodes {
                excerpt
                id
                fields {
                  slug
                }
                frontmatter {
                  author
                  date(formatString: "dddd MMMM Do, YYYY")
                  title
                  featuredImage {
                    publicURL
                  }
                }
              }
            }
          }`,
          ref: 'slug',
          index: ['title', 'excerpt'],
          store: ['title', 'excerpt', 'date', 'slug'],
          normalizer: ({ data }) => 
            data.allMarkdownRemark.nodes.map(node => ({
              title: node.frontmatter.title,
              excerpt: node.excerpt,
              date: node.frontmatter.date,
              slug: node.fields.slug,
            })),
      }
  },
  ],
}
