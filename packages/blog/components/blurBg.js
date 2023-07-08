import clsx from 'clsx';

export const BlurBg = ({ className }) => {
  return (
    <svg
      viewBox="0 0 1024 1024"
      aria-hidden="true"
      className={clsx(className, 'absolute -z-10 opacity-30 dark:opacity-90')}
    >
      <circle
        cx="512"
        cy="512"
        r="512"
        fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
        fillOpacity="0.7"
      ></circle>
      <defs>
        <radialGradient
          id="759c1415-0410-454c-8f7c-9a820de03641"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(512 512) rotate(90) scale(512)"
        >
          <stop stopColor="rgba(251, 115, 121, 0.9)"></stop>
          <stop
            offset="1"
            stopColor="rgba(119, 40, 44, 0.9)"
            stopOpacity="0"
          ></stop>
        </radialGradient>
      </defs>
    </svg>
  );
};
