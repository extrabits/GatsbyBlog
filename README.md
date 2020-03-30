# 💻 Static Blog with Gatsby & React 🚀

![](_/header.png)

**Technology List:**

Javascript, Gatsby, React, GraphQL, NodeJS, Styled-Components

### **Gatsby.**

Gatsby is an incredible static site generator that allows for React to be used as the underlying rendering engine to scaffold out a static site that truly has all the benefits expected in a modern web application. It does this by rendering dynamic React components into static HTML content via server side rendering at build time. This means that your users get all the benefits of a static site such as the ability to work without JavaScript, search engine friendliness, speedy load times, etc. without losing the dynamism and interactivity that is expected of the modern web. Once rendered to static HTML, client-side React/JavaScript can take over (if creating stateful components or logic in componentDidMount) and add dynamism to the statically generated content.

### The JAM Stack.

When we talk about “The Stack”, we no longer talk about operating systems, specific web servers, backend programming languages, or databases.The Jamstack is not about specific technologies. It’s a new way of building websites and apps that delivers better performance, higher security, lower cost of scaling, and a better developer experience.Pre-rendered sites can be enhanced with JavaScript and the growing capabilities of browsers and services available via APIs.

**Better Performance**

Why wait for pages to build on the fly when you can generate them at deploy time? When it comes to minimizing the time to first byte, nothing beats pre-built files served over a CDN.

**Higher Security**

With server-side processes abstracted into microservice APIs, surface areas for attacks are reduced. You can also leverage the domain expertise of specialist third-party services.

**Cheaper, Easier Scaling**

When your deployment amounts to a stack of files that can be served anywhere, scaling is a matter of serving those files in more places. CDNs are perfect for this, and often include scaling in all of their plans.

**Better Developer Experience**

Loose coupling and separation of controls allow for more targeted development and debugging, and the expanding selection of CMS options for site generators remove the need to maintain a separate stack for content and marketing.

## Setting Everything Up

Let's start with the CLI.

    npm install -g gatsby-cli

**Gatsby** ships with a great **CLI** (command line interface) that contains the functionality of scaffolding out a working site as well as commands to help develop the site once created.

Now to create our project,

    gatsby new blog && cd blog

This command will create the folder `blog` and then change into that directory. A working `gatsby` statically generated application can now be developed upon. The CLI generates common development scripts to help you get started.

Inside `blog`, you'll find all the **Gatsby basic starter kit**, to understand the gatsby project structure check out the [official documentation](https://www.gatsbyjs.org/docs/gatsby-project-structure/).

Let's remove all the boilerplate code, we'll do everything ourselves.

    rm -rf src/**/*.*

Inside the /**pages/** folder, create an **index.js** file, usual **react**:

    import React from "react"

    const Home = () => (
      <div>
        <h1>Home</h1>
      </div>
    )

    export default Home

and a **blog.js**

    import React from "react";

    const Blog = () => (
      <div>
        <h1>Blog</h1>
      </div>
    );

    export default Blog;

# Plugins

Gatsby supports a rich plugin interface, and many incredibly useful plugins have been authored to make accomplishing common tasks a breeze. Plugins can be broken up into three main categories: functional plugins, source plugins, and transformer plugins.

We need to read source files to create pages, go to **gatsby-config.js,** under the **plugins** array, add:

    {
          resolve: `gatsby-source-filesystem`,
          options: {
            name: `pages`,
            path: `${__dirname}/src/pages`,
          },
     },

That will give gatsby the tools to read files from the filesystem.

**To create our blog, we'll need to add a transformer plugin.**

A transformer plugin takes some underlying data format that is not inherently usable in its current form (e.g. Markdown, json, yaml, etc.) and transforms it into a format that Gatsby can understand and that you can query against with GraphQL. Jointly, the filesystem source plugin will load file nodes (as Markdown) off of your filesystem, and then the Markdown transformer will take over and convert to usable HTML.

    yarn add gatsby-transformer-remark

Then, in **gatsby-config.js**, under the **plugins** array, add:

    {
          resolve: "gatsby-transformer-remark",
          options: {
            plugins: [],
          },
    }

## **Let's do this.**

Gatsby comes with automatic reload and a custom development server, so you can develop and check your changes in real time on the browser.

Let's run:

    gatsby develop

You can go and take a look at [http://localhost:8000/](http://localhost:8000/), and you'll be greeted by the gatsby standard example page.

## Writing your first post and content.

Inside the **/pages/** directory, create a folder **2020/01/01-first-blog-post/ and 2020/01/02-second-blog-post/,** add an **[index.md](http://index.md) on each** and inside use the following structure:

    ---
    path: '/first-blog-post'
    date: '2020-01-01'
    title: 'My First Blog'
    author: 'Leo'
    description: 'This is my very first blog of 2020!'
    ---

    Here is my main content
    It is very interesting.

Everything between the three hyphens is called frontmatter. Frontmatter is essentially metadata for your blog post.

For each blog post, add some frontmatter, containing the following data:

- **`path`**: The URL path to your blog
- **`date`**: The date of publish
- **`title`**: The blog post title
- **`author`**: The blog post author
- **`description`**: The blog post description

## Querying with GraphQL

Now we need to be able to get your posts .md files data into Gatsby, to do so, we'll use GraphQL.

Go to [http://localhost:8000/___graphql](http://localhost:8000/___graphql), Gatsby also has a tool for helping you construct your queries.

On the left side **explorer,** check the following options: **AllMarkdownRemark > edges > node > frontmatter > date title**

Then press the play button, you should see both of your posts data on the right-hand panel.

Copy that GraphQL query, and let's use it!

Go to **/pages/blog.js**

First, we'll import graphQL module:

    import { graphql } from "gatsby";


Then, after the blog export, add the following code, pasting in the GraphQL query we just copied from GraphiQL, and let's name the **query:** allblogposts:

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

Now, the output of the query will be automatically sent into your page component, to check it out, let's **console.log(data).**

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

## What now?

Now that you know how to get data from your posts raw files with graphQL, you can use the power of react to construct a blog or even whole pages that are based in markdown text content.

Keep it up, let's see what you managed to build! 💪

# Links

JAM Stack

[https://jamstack.org/](https://jamstack.org/)

Gatsby VS Wordpress

[https://www.gatsbyjs.org/features/cms/gatsby-vs-wordpress/](https://www.gatsbyjs.org/features/cms/gatsby-vs-wordpress/)

GraphQL

[https://graphql.org/](https://graphql.org/)

Styled Components.

[https://www.gatsbyjs.org/docs/styled-components/](https://www.gatsbyjs.org/docs/styled-components/)