import { generateRSS } from 'pliny/utils/generate-rss.js';
import siteMetadata from '../data/siteMetadata.js';
import { allBlogs } from '../.contentlayer/generated/index.mjs';

const rss = () => {
  const mappedBlogs = allBlogs.map((blog) => {
    return {
      ...blog,
      path: blog.path.replace('blog/', 'articles/'),
    };
  });

  generateRSS(siteMetadata, mappedBlogs);
  console.log('RSS feed generated...');
};
export default rss;
