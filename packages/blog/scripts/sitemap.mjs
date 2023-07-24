import { generateSitemap } from 'pliny/utils/generate-sitemap.js';
import siteMetadata from '../data/siteMetadata.js';
import { allBlogs } from '../.contentlayer/generated/index.mjs';

const sitemap = () => {
  const mappedBlogs = allBlogs.map((blog) => {
    return {
      ...blog,
      path: blog.path.replace('blog/', 'articles/'),
      _raw: {
        ...blog._raw,
        flattenedPath: blog._raw.flattenedPath.replace('blog/', 'articles/'),
      },
    };
  });

  generateSitemap(siteMetadata.siteUrl, mappedBlogs);
  console.log('Sitemap generated...');
};
export default sitemap;
