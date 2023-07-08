import Link from 'next/link';
import { kebabCase } from 'pliny/utils/kebabCase';
const Tag = ({ text }) => {
  return (
    <Link
      href={`/tags/${kebabCase(text)}`}
      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 relative z-20 mr-3 text-sm font-medium uppercase"
    >
      {text.split(' ').join('-')}
    </Link>
  );
};
export default Tag;
