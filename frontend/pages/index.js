import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import WPAPI from 'wpapi';
import Layout from '../components/Layout';
import PageWrapper from '../components/PageWrapper';
import Menu from '../components/Menu';
import Config from '../config';

const wp = new WPAPI({ endpoint: Config.apiUrl });

const headerImageStyle = {
  marginTop: 50,
  marginBottom: 50,
};

const tokenExpired = () => {
  if (process.browser) {
    localStorage.removeItem(Config.AUTH_TOKEN);
  }
  wp.setHeaders('Authorization', '');
  Router.push('/login');
};

class Index extends Component {
  state = {
    id: '',
  };

  static async getInitialProps() {
    try {
      const [page, posts, pages] = await Promise.all([
        wp
          .pages()
          .slug('welcome')
          .embed()
          .then(data => {
            return data[0];
          }),
        wp.posts().embed(),
        wp.pages().embed(),
      ]);

      return { page, posts, pages };
    } catch (err) {
      if (err.data.status === 403) {
        tokenExpired();
      }
    }

    return null;
  }

  componentDidMount() {
    const token = localStorage.getItem(Config.AUTH_TOKEN);
    if (token) {
      wp.setHeaders('Authorization', `Bearer ${token}`);
      wp.users()
        .me()
        .then(data => {
          const { id } = data;
          this.setState({ id });
        })
        .catch(err => {
          if (err.data.status === 403) {
            tokenExpired();
          }
        });
    }
  }

  render() {
    const { id } = this.state;
    const { posts, pages, headerMenu, page } = this.props;
    const fposts = posts.map(post => {
      return (
        <ul key={post.slug}>
          <li>
            <Link
              as={`/post/${post.slug}`}
              href={`/post?slug=${post.slug}&apiRoute=post`}
            >
              <a>{post.title.rendered}</a>
            </Link>
          </li>
        </ul>
      );
    });
    const fpages = pages.map(ipage => {
      return (
        <ul key={ipage.slug}>
          <li>
            <Link
              as={`/page/${ipage.slug}`}
              href={`/post?slug=${ipage.slug}&apiRoute=page`}
            >
              <a>{ipage.title.rendered}</a>
            </Link>
          </li>
        </ul>
      );
    });
    return (
      <Layout>
        <Menu menu={headerMenu} />
        <img
          src="/static/images/wordpress-plus-react-header.png"
          width="815"
          alt="logo"
          style={headerImageStyle}
        />
        <h1>{page.title.rendered}</h1>
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: page.content.rendered,
          }}
        />
       
      
      </Layout>
    );
  }
}

export default PageWrapper(Index);
