interface Props {
  className: string;
}

function YandexSvg(props: Props) {
  const { className } = props;

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 11 16"
      fill="none"
    >
      <path
        d="M7.88155 2.52804H6.71165C4.56681 2.52804 3.4387 3.61149 3.4387 5.20878C3.4387 7.01466 4.21857 7.86044 5.8203 8.9452L7.14337 9.83426L3.34122 15.5H0.5L3.91222 10.4314C1.94961 9.02851 0.848143 7.66605 0.848143 5.36162C0.848143 2.4723 2.8677 0.5 6.69775 0.5H10.5V15.4861H7.88164L7.88155 2.52804Z"
        stroke="#FF3233"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default YandexSvg;
