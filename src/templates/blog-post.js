import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import styles from './BlogPost.module.scss'

export default function BlogPost({ data }) {
    const post = data.markdownRemark
    const { title, date, author, featuredImage: { publicURL } } = post.frontmatter;
    const { html } = post;

    return (
        <Layout>
          <div className={styles.blogPost}>
            <h1>{title}</h1>
            <small>{date} - {author}</small>
            <img className={styles.featuredImage} src={publicURL} alt={title} />
            <div dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </Layout>
    )
}

export const query = graphql`
  query BlogQuery($slug: String!) { 
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(fromNow: true)
        author
        featuredImage {
          publicURL
        }
      }
    }
  }
`