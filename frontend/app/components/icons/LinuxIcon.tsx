import React from 'react';

const LinuxIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="27.77"
    height="32"
    viewBox="0 0 256 295"
    className={className}
  >
    <defs>
      <linearGradient id="logosLinuxTux0" x1="48.548%" x2="51.047%" y1="115.276%" y2="41.364%">
        <stop offset="0%" stopColor="#FFEED7"/>
        <stop offset="100%" stopColor="#BDBFC2"/>
      </linearGradient>
      <linearGradient id="logosLinuxTux1" x1="54.407%" x2="46.175%" y1="2.404%" y2="90.542%">
        <stop offset="0%" stopColor="#FFF" stopOpacity=".8"/>
        <stop offset="100%" stopColor="#FFF" stopOpacity="0"/>
      </linearGradient>
    </defs>
    <g fill="none">
      <path fill="#000" fillOpacity=".2" d="M235.125 249.359c0 17.355-52.617 31.497-117.54 31.497S.044 266.806.044 249.359c0-17.356 52.618-31.498 117.54-31.498c64.924 0 117.45 14.142 117.541 31.498" transform="translate(10)"/>
      <path fill="#000" d="M63.213 215.474c-11.387-16.346-13.591-69.606 12.947-102.39C89.292 97.383 92.69 86.455 93.7 71.67c.734-16.805-11.846-66.851 35.537-70.616c48.027-3.857 45.364 43.526 45.088 68.596c-.183 21.12 15.52 33.15 26.355 49.68c19.927 30.303 18.274 82.461-3.765 110.745c-27.916 35.354-51.791 20.018-67.678 21.304c-29.752 1.745-30.762 17.54-66.024-35.905"/>
      <path fill="url(#logosLinuxTux0)" d="M169.1 122.451c8.265 7.622 29.661 41.69-4.224 62.995c-11.937 7.438 10.653 35.721 21.488 22.039c19.193-24.61 6.98-63.913-4.591-77.963c-7.714-9.917-19.651-13.774-12.672-7.07" transform="translate(10)"/>
      <path fill="#FFC107" d="M107.483 54.957c.46 8.173-3.397 15.06-8.723 15.335c-5.326.276-10.01-6.06-10.469-14.233c-.459-8.173 3.398-15.06 8.724-15.335c5.326-.276 10.01 6.06 10.468 14.233" transform="translate(10)"/>
      <path fill="#FFC107" d="M117.125 55.6c.184 9.458 6.337 16.988 13.683 16.805c7.346-.184 13.131-7.99 12.948-17.54c-.184-9.458-6.336-16.988-13.683-16.804c-7.346.183-13.223 8.08-12.948 17.539" transform="translate(10)"/>
    </g>
  </svg>
);

export default LinuxIcon;
