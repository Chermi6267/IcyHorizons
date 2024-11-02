interface Props {
  className: string;
}

function Arrow(props: Props) {
  const { className } = props;

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 13 6"
      fill="none"
    >
      <path
        d="M0.571202 0.706388C0.195016 0.978209 0.195016 1.41896 0.571202 1.69077L5.28371 5.09272C6.03622 5.63593 7.25553 5.63572 8.00765 5.09231L12.7183 1.68827C13.0946 1.41645 13.0946 0.975703 12.7183 0.703876C12.3422 0.432041 11.7322 0.432041 11.3561 0.703876L7.32421 3.61734C6.94805 3.88923 6.33811 3.88916 5.96195 3.61734L1.93347 0.706388C1.55729 0.434554 0.947379 0.434554 0.571202 0.706388Z"
        fill="url(#paint0_linear_531_398)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_531_398"
          x1="0.289062"
          y1="3.00584"
          x2="13.0042"
          y2="3.00584"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8E56D5" />
          <stop offset="1" stopColor="#5976E3" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default Arrow;
