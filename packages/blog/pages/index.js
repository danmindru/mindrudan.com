import Link from '@/components/Link';
import { PageSEO } from '@/components/SEO';
import Tag from '@/components/Tag';
import siteMetadata from '@/data/siteMetadata';
import { formatDate } from 'pliny/utils/formatDate';
import { sortedBlogPost, allCoreContent } from 'pliny/utils/contentlayer';
import { NewsletterForm } from 'pliny/ui/NewsletterForm';
import { allBlogs } from 'contentlayer/generated';
import { SoftBg } from '@/components/softBg';
const MAX_DISPLAY = 5;
export const getStaticProps = async () => {
  const sortedPosts = sortedBlogPost(allBlogs);
  const posts = allCoreContent(sortedPosts);
  return {
    props: {
      posts,
    },
  };
};
export default function Home({ posts }) {
  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />
      <div className="flex flex-col">
        <div className="space-y-2 pb-8 pt-6 md:space-y-2">
          <h1 className="text-2xl leading-9 tracking-tight text-gray-900 dark:text-gray-100">
            Latest posts
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>

        <ul className="flex flex-col gap-4 md:gap-6">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, tags } = post;
            return (
              <li
                key={slug}
                className="fancyGlass group relative flex items-center justify-between gap-1 overflow-hidden rounded-md p-4 shadow-sm transition-shadow duration-1000 hover:shadow-xl sm:p-8"
              >
                <div className="absolute left-0 top-0 -z-10 h-full w-full bg-white/40 dark:bg-black/40" />

                <SoftBg
                  variant="secondary"
                  className="h-96 w-96 opacity-0 transition-all duration-1000 group-hover:scale-150 dark:opacity-10 dark:group-hover:opacity-100"
                />
                <SoftBg
                  variant="secondary"
                  className="-right-1/2 h-96 w-96 opacity-0 transition-all duration-1000 group-hover:scale-150 dark:opacity-10 dark:group-hover:opacity-100"
                />

                <article className="relative w-full">
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>
                          {formatDate(date, siteMetadata.locale)}
                        </time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="relative z-20 text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/articles/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.slice(0, 5).map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none whitespace-pre-line text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/articles/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 relative z-20"
                          aria-label={`Read "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/articles/${slug}`}
                    className="absolute left-0 top-0 z-10 h-full w-full"
                  ></Link>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="mt-10 flex justify-end text-base font-medium leading-6">
          <Link
            href="/articles"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
      {siteMetadata.newsletter.provider && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm apiUrl={'/api/newsletter'} />
        </div>
      )}
    </>
  );
}
