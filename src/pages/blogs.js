import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import styles from "./BlogList.module.scss"

export default function Blog({ data }) {
  const posts = data.blog.posts;
  return (
    <Layout>
      <div className={styles.blogPosts}>
        <h1>My blog posts</h1>

        {posts.map(post => {
          const { frontmatter, excerpt, id } = post
          const { title, date, author } = frontmatter

          return (
              <article key={id}>
                <Link to={post.fields.slug}>
                  <h2>{title}</h2>
                </Link>
                <small>
                  {author}, {date}
                </small>
                <p>{excerpt}</p>
              </article>
          )
        })}
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query MyQuery {
    blog: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      posts: nodes {
        frontmatter {
          author
          date(fromNow: true)
          title
        }
        excerpt(format: PLAIN, pruneLength: 200, truncate: true)
        id
        fields {
          slug
        }
      }
    }
  }
`
