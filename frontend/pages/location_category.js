/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Link from 'next/link';
import Error from 'next/error';
import WPAPI from 'wpapi';
import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import Menu from '../components/Menu';
import Config from '../config';

const wp = new WPAPI({ endpoint: Config.apiUrl });
wp.location = wp.registerRoute( 'wp/v2', '/location/(?P<id>)' , {
  params: [ 'id' ]
});
wp.location_category = wp.registerRoute( 'wp/v2', '/location_category/(?P<slug>)' , {
  params: [ 'slug' ]
});

class Category extends Component {
   
  static async getInitialProps(context) {
    const { slug } = context.query;
    const thisCategory = await wp.location_category().slug(slug).embed();
    const taxonomy = await wp.taxonomies().taxonomy( 'location_category' );
    const categoryPosts = await wp.location().param( 'location_category', thisCategory[0].id);

    return { taxonomy , thisCategory , categoryPosts}
  }

  render() {
    const { headerMenu , thisCategory , categoryPosts } = this.props;
    console.log(thisCategory);
    console.log(categoryPosts);

    const fposts = categoryPosts.map(post => {
      return (
        <ul key={post.slug}>
          <li>
            <Link
              as={`/location/${post.slug}`}
              href={`/location?slug=${post.slug}&apiRoute=location`}
            >
              <a>{post.title.rendered}</a>
            </Link>
          </li>
        </ul>
      );
    });
    return (
      <Layout>
        <Menu menu={headerMenu} />
        <h1>Posts in {thisCategory[0].name} </h1>
        {fposts}
      </Layout>
    );
  }
}

export default PageWrapper(Category);
