import clsx from 'clsx';

export const SoftBg = ({ className, variant }) => {
  const stopColor =
    variant === 'primary'
      ? 'rgba(251, 115, 121, 0.9)'
      : 'rgba(119, 40, 44, 0.9)';
  const stopColorTwo = variant === 'primary' ? '#3E341D70' : '#1350646f';

  return (
    <svg
      viewBox="0 0 1108 632"
      aria-hidden="true"
      className={clsx(
        className,
        'absolute left-0 top-0 -z-10 h-full w-full max-w-none transform-gpu blur-3xl'
      )}
    >
      <path
        fill={`url(#softbg-${variant})`}
        fillOpacity="0.5"
        d="M235.233 402.609 57.541 321.573.83 631.05l234.404-228.441 320.018 145.945c-65.036-115.261-134.286-322.756 109.01-230.655C968.382 433.026 1031 651.247 1092.23 459.36c48.98-153.51-34.51-321.107-82.37-385.717L810.952 324.222 648.261.088 235.233 402.609Z"
      ></path>
      <defs>
        <linearGradient
          id={`softbg-${variant}`}
          x1="1220.59"
          x2="-85.053"
          y1="432.766"
          y2="638.714"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={stopColor}></stop>
          <stop offset="1" stopColor={stopColorTwo}></stop>
        </linearGradient>
      </defs>
    </svg>
  );
};
