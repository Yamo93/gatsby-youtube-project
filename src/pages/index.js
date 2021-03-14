import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import styles from "./Home.module.scss"
import AppContext from "../context/AppContext"
import { useFlexSearch } from "react-use-flexsearch"

export default function Home({ data }) {
  const { index, store } = data.localSearchPages
  const { title, description } = data.site.siteMetadata
  const posts = data.allMarkdownRemark.nodes.slice(0, 2)
  const unflattenResults = results =>
    results.map(post => {
      const { date, slug, excerpt, title } = post
      return {
        excerpt,
        frontmatter: {
          date,
          title,
        },
        fields: {
          slug,
        },
      }
    })

  const { search } = window.location
  const query = new URLSearchParams(search).get("s")
  const [searchQuery, setSearchQuery] = useState(query || "")
  const searchResults = useFlexSearch(searchQuery, index, store)
  const unflattenedSearchResults = unflattenResults(searchResults)

  return (
    <AppContext.Provider
      value={{
        posts: data.allMarkdownRemark.nodes,
        searchQuery,
        setSearchQuery,
      }}
    >
      <Layout>
        <div className={styles.hero}>
          <h1>{title}</h1>
          <h3>{description}</h3>
        </div>

        <div className={styles.latestArticles}>
          {searchResults && searchResults.length > 0 ? (
            <>
              <h1>
                {searchResults.length} results found for "{searchQuery}"
              </h1>
              {unflattenedSearchResults.map(result => {
                const { slug } = result.fields
                const { author, title: postTitle, date } = result.frontmatter
                return (
                  <Link to={slug} key={slug}>
                    <h2>{postTitle}</h2>
                    <p>
                      Posted by {author} on {date}
                    </p>
                  </Link>
                )
              })}
            </>
          ) : (
            <>
              <h1>Latest articles</h1>
              {posts.map(post => {
                const { slug } = post.fields
                const {
                  author,
                  title: postTitle,
                  date,
                  featuredImage: { publicURL },
                } = post.frontmatter
                return (
                  <Link to={slug} key={slug}>
                    <img className={styles.featuredImage} src={publicURL} alt={postTitle} />
                    <h2>{postTitle}</h2>
                    <p>
                      Posted by {author} on {date}
                    </p>
                  </Link>
                )
              })}
            </>
          )}
        </div>
      </Layout>
    </AppContext.Provider>
  )
}

export const pageQuery = graphql`
  query MetadataQuery {
    localSearchPages {
      index
      store
    }
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
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
