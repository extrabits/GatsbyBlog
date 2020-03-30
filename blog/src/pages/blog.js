import React from "react"
import { graphql } from "gatsby"

const Blog = ({ data }) => (
    <div>
        <h1>Blog</h1>
        {console.log(data)}
    </div>
)

export default Blog

export const AllBlogPosts = graphql`
         query AllBlogPosts {
           allMarkdownRemark {
             edges {
               node {
                 frontmatter {
                   path
                   title
                 }
               }
             }
           }
         }
       `