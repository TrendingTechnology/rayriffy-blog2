import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Layout from '../components/layout'
import { rhythm } from '../utils/typography'
import Style from '../components/theme.module.css'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteUrl = get(this, 'props.data.site.siteMetadata.siteUrl')
    const siteDescription = get(this, 'props.data.site.siteMetadata.description')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')
    const { currentPage, numPages } = this.props.pageContext

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[
            {
              name: 'description',
              content: siteDescription
            },
            {
              name: 'og:url',
              content: siteUrl
            },
            {
              name: 'og:type',
              content: 'article'
            },
            {
              name: 'og:title',
              content: siteTitle
            },
            {
              name: 'og:description',
              content: siteDescription
            },
            {
              name: 'og:image',
              content: 'https://firebasestorage.googleapis.com/v0/b/rayriffy-blog.appspot.com/o/DEF_IMG.jpg?alt=media'
            },
            {
              name: 'twitter:card',
              content: 'summary_large_image'
            },
            {
              name: 'twitter:site',
              content: '@rayriffy'
            },
            {
              name: 'twitter:creator',
              content: '@rayriffy'
            },
            {
              name: 'twitter:title',
              content: siteTitle
            },
            {
              name: 'twitter:description',
              content: siteDescription
            },
            {
              name: 'twitter:image',
              content: 'https://firebasestorage.googleapis.com/v0/b/rayriffy-blog.appspot.com/o/DEF_IMG.jpg?alt=media'
            },
          ]}
          title={siteTitle}
        />
        {posts.map(({ node }) => {
          const title = get(node, 'frontmatter.title') || node.fields.slug
          return (
            <div key={node.fields.slug} className={[Style.article]}>
              <div className={Style.articleteaser + ' ' + Style.displayblock}>
                <Link to={node.fields.slug}><img src={node.frontmatter.banner} /></Link>
              </div>
              <div className={Style.articlecontent}>
                <h1
                  style={{
                    marginBottom: rhythm(1 / 4),
                  }}
                  className={Style.articletitle}
                >
                  <Link style={{ textDecoration: 'none', color: '#000000', boxShadow: 'none' }} to={node.fields.slug}>
                    {title}
                  </Link>
                </h1>
                <div className={Style.articlemeta}>
                  Written by Phumrapee Limpianchop on {node.frontmatter.date}
                </div>
                <p className={Style.articlesubtitle}>{node.frontmatter.subtitle}</p>
              </div>
            </div>
          )
        })}
        <ul className={Style.pagination}>
        {
          Array.from({ length: numPages }, (_, i) => (
            <li
              key={`pagination-number${i + 1}`}
              className={i + 1 === currentPage ? Style.active : ''}
            >
              <Link 
                to={`/${i === 0 ? '' : 'pages/' + (i + 1)}`}
              >
                {i + 1}
              </Link>
            </li>
          ))
        }
        </ul>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: $limit, skip: $skip) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            subtitle
            banner
          }
        }
      }
    }
  }
`