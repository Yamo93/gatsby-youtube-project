import React from "react"
import { graphql, Link } from "gatsby"
import Layout from '../components/layout'
import styles from './Home.module.scss'

export default function Home({ data }) {
  const { title, description } = data.site.siteMetadata
  return (
  <Layout>
    <div className={styles.hero}>
      <h1>{title}</h1>
      <h3>{description}</h3>
    </div>

    <div className={styles.latestArticles}>
      <h1>Latest articles</h1>
      {data.allMarkdownRemark.nodes.map(markdownFile => {
        const { slug } = markdownFile.fields;
        const { author, title: postTitle, date, featuredImage: { publicURL } } = markdownFile.frontmatter;
        return (
          <Link to={slug}>
            <img className={styles.featuredImage} src={publicURL} />
            <h2>{postTitle}</h2>
            <p>Posted by {author} on {date}</p>
          </Link>
        )
      })}
    </div>
  </Layout>
  )
}

export const pageQuery = graphql`
query MetadataQuery {
  allMarkdownRemark(limit: 2, sort: {fields: frontmatter___date, order: DESC}) {
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

  site {
    siteMetadata {
      title
      description
    }
  }

  image: file(base: { eq: "code_screen.jpg" }) {
    publicURL
  }
}
`