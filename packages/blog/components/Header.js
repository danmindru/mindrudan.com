import siteMetadata from '@/data/siteMetadata';
import headerNavLinks from '@/data/headerNavLinks';
import Logo from '@/data/logo.svg';
import Link from './Link';
import MobileNav from './MobileNav';
import ThemeSwitch from './ThemeSwitch';
const Header = () => {
  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <Logo className="h-8 w-8" />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden h-8 text-2xl font-light opacity-70 sm:block">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </Link>
      </div>
      <div className="flex items-center text-base leading-5">
        <div className="hidden sm:block">
          {headerNavLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
            >
              {link.title}
            </Link>
          ))}

          <Link
            href="https://mindrudan.com"
            className="hidden p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4 lg:inline-block"
          >
            DanOS
          </Link>
        </div>
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  );
};
export default Header;
