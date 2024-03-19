import { Tweet } from 'react-tweet';

export const EmbedTweet = ({ tweetId }) => {
  return (
    <div className="not-prose">
      <Tweet id={tweetId} />
    </div>
  );
};
