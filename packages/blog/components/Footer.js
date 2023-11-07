import Link from './Link';
import siteMetadata from '@/data/siteMetadata';
import SocialIcon from '@/components/social-icons';
import { BlurBg } from './blurBg';

export default function Footer() {
  return (
    <footer className="relative flex min-h-[20rem] flex-col items-center justify-center overflow-x-hidden overflow-y-hidden">
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon
            kind="mail"
            href={`mailto:${siteMetadata.email}`}
            size={6}
          />
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          <SocialIcon kind="facebook" href={siteMetadata.facebook} size={6} />
          <SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size={6} />
        </div>

        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
        </div>

        <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <ul className="flex gap-2">
            <li>
              <a
                href="https://shipixen.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Shipixen
              </a>
            </li>

            <li>•</li>

            <li>
              <a
                href="https://clobbr.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Clobbr
              </a>
            </li>

            <li>•</li>

            <li>
              <a
                href="https://crontap.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Crontap
              </a>
            </li>

            <li>•</li>

            <li>
              <a
                href="https://apihustle.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apihustle
              </a>
            </li>

            <li>•</li>

            <li>
              <a
                href="https://mrrartpro.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                MRRArt Pro
              </a>
            </li>
          </ul>
        </div>

        <div className="mb-8 text-sm text-gray-500/70 dark:text-gray-400/70">
          <Link href="/">{siteMetadata.title}</Link>
        </div>
        <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
          <a href="https://mindrudan.com">mindrudan.com</a>
        </div>
      </div>

      <BlurBg className="absolute -bottom-[25rem] h-[40rem] w-screen" />
    </footer>
  );
}
