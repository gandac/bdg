import React, { Component } from 'react';
import Error from 'next/error';
import WPAPI from 'wpapi';
import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import Menu from '../components/Menu';
import Config from '../config';

const wp = new WPAPI({ endpoint: Config.apiUrl });
wp.location = wp.registerRoute( 'wp/v2', '/location/(?P<slug>)' , {
  params: [ 'slug' ]
});
class Location extends Component {
  static async getInitialProps(context) {
    const { slug, apiRoute } = context.query;

    const theLocationPost = await wp.location().slug(slug).embed().then(data=>{
      return data[0];
    });

    return {theLocationPost};

  }

  render() {
    const { theLocationPost, headerMenu } = this.props;
    if (!theLocationPost.title) return <Error statusCode={404} />;

    return (
      <Layout>

        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: theLocationPost.content.rendered,
          }}
        />
        
      </Layout>
    );
  }
}

export default PageWrapper(Location);
