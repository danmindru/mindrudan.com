import Link from 'next/link';
import { SoftBg } from './softBg';

export default function ContentPieceWrapper({ children, link }) {
  return (
    <div
      className="fancyGlass group relative -mt-4 flex items-center justify-between gap-1 overflow-hidden rounded-md px-4 shadow-sm transition-shadow duration-1000 first:mt-0 first-of-type:p-4 last-of-type:pb-4 hover:shadow-xl sm:px-8
    sm:first-of-type:p-8 sm:last-of-type:pb-8"
    >
      <div className="absolute left-0 top-0 -z-10 h-full w-full bg-white/40 backdrop-blur-lg dark:bg-black/40" />

      <SoftBg
        variant="secondary"
        className="h-96 w-96 opacity-0 transition-all duration-1000 group-hover:scale-150 dark:opacity-10 dark:group-hover:opacity-100"
      />
      <SoftBg
        variant="secondary"
        className="-right-1/2 h-96 w-96 opacity-0 transition-all duration-1000 group-hover:scale-150 dark:opacity-10 dark:group-hover:opacity-100"
      />

      <article className="relative">
        <div className="relative z-20">{children}</div>

        {link && (
          <Link
            href={`/articles/${link}`}
            className="absolute left-0 top-0 z-10 h-full w-full"
          ></Link>
        )}
      </article>
    </div>
  );
}
