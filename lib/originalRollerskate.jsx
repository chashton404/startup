import React from 'react';

export const RollerSkate = ({ 
    topColor,
    stripeColor,
    baseColor,
    wheelColor,
    toeStopColor,
    width,
    height 
}) => {
  return (
    <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width= {width}  height= {height}>
      <defs>
        <style>
          {`
            .top-color {
              fill: ${topColor};
            }

            .stripe-color {
              fill: ${stripeColor};
            }

            .base-color {
              fill: ${baseColor};
            }

            .wheel-color {
              fill: ${wheelColor};
            }

            .toe-stop-color {
              fill: ${toeStopColor};
            }

          `}
        </style>
      </defs>
      {/* Your SVG paths here */}
      <path class="top-color" d="M76.63,281.27c-13.13,0-26.26-.25-39.38.12-5.29.15-6.41-1.81-6.67-6.68-1.54-28.62,4.44-56.16,11.28-83.63,4.27-17.17,8.17-34.44,12.51-51.6.49-1.93,2.38-4.16,4.21-5.01,37-17.41,55.63-47.59,60.91-87.11.61-4.57,1-9.18,1.14-13.79.1-3.36,1.06-5.11,4.8-5.06,10.54.14,21.08.18,31.61-.02,4.39-.08,4.45,2.42,4.64,5.68,1.65,28.72,6.03,57.07,17.05,83.71,5.58,13.51,14.04,25.85,21.57,38.51,1.66,2.79,2.08,4.52.23,7.27-25.59,38-51.04,76.09-76.73,114.02-1.25,1.85-4.38,3.38-6.67,3.43-13.49.32-26.99.16-40.49.16Z"/>
      <path class="base-color" d="M244.84,294.1c70.83,0,141.66,0,212.5.02,9.96,0,15.89,6.19,15.09,15.54-.58,6.77-5.82,12-12.69,12.36-3.87.21-7.77.07-11.65.07-138.15,0-276.3.02-414.45.02-8.47,0-13.82-3.1-15.97-9.27-1.96-5.63-.26-12.79,4.88-15.77,3.29-1.91,7.6-2.85,11.46-2.86,66.02-.17,132.05-.12,198.07-.12,4.25,0,8.51,0,12.76,0Z"/>
      <path class="top-color" d="M272.25,279.66c2.88-4.23,5.72-8.48,8.64-12.67,12.88-18.51,25.83-36.97,38.63-55.53,2.12-3.08,4.51-4.48,8.35-5.24,10.48-2.06,20.76-5.08,31.15-7.61,2.08-.51,4.5-1.25,6.39-.67,24.84,7.59,48.99,16.76,69.25,33.71,12.07,10.1,21.34,22.04,22.33,38.65.02.37.05.74.06,1.11q.26,9.87-9.45,9.86c-56.22,0-112.44.02-168.66.03-1.96,0-3.91,0-5.87,0-.27-.55-.54-1.09-.81-1.64Z"/>
      <path class="base-color" d="M238.31,336.66c59.71,0,119.41,0,179.12,0,1.29,0,2.6-.11,3.88.04,4.43.51,5.86,3.54,2.88,6.83-5.83,6.43-11.99,12.56-18,18.83-2.71,2.83-5.02.8-7.39-.55-22.56-12.84-45.38-13.14-67.99-.55-5.87,3.27-10.89,8.16-16.01,12.64-4.22,3.69-6.61,3.55-8.45-1.81-4.83-14.13-5.7-11.53-17.57-11.56-40.67-.1-81.33.09-122-.17-6.56-.04-10.69,1.74-12.19,8.32-.24,1.07-.79,2.07-1.21,3.09-2.33,5.67-4.44,6.16-8.64,1.83-8.67-8.93-18.83-15.27-30.85-18.74-17.6-5.08-34.31-2.85-50.42,5.43-5.61,2.88-6.82,2.39-8.67-3.55-1.42-4.57-2.68-9.2-4.23-13.73-1.41-4.1.24-5.95,4.19-6.33,1.47-.14,2.96-.04,4.43-.04,59.71,0,119.41,0,179.12,0v.03Z"/>
      <path class="wheel-color" d="M42.66,419.39c.03-29.31,24.1-53.15,53.43-52.89,28.43.25,52.24,24.18,52.24,52.51,0,29.67-23.59,53.7-52.68,53.68-29.38-.02-53.01-23.8-52.98-53.3ZM95.47,442.98c12.87,0,23.3-10.34,23.39-23.15.09-13.17-10.32-23.65-23.46-23.62-12.8.03-23.4,10.45-23.54,23.12-.14,12.89,10.61,23.65,23.61,23.64Z"/>
      <path class="wheel-color" d="M417.05,419.98c-.25,29.46-24.3,53.1-53.63,52.72-28.92-.37-52.24-24.46-52.04-53.76.19-29,24.42-52.82,53.37-52.45,29.11.36,52.56,24.35,52.31,53.49ZM363.91,442.96c13.1.12,23.85-10.36,23.9-23.31.04-12.66-10.53-23.32-23.25-23.42-13.2-.11-23.58,10.07-23.77,23.33-.19,12.71,10.26,23.29,23.12,23.41Z"/>
      <path class="top-color" d="M218.51,51.14c-5.66,0-10.25-.01-14.84,0-4.1.01-6.96,1.74-6.91,6.13.05,4.08,2.87,5.83,6.63,5.96,4.62.15,9.25-.11,13.86.16,1.35.08,3.52,1.12,3.8,2.13,2.51,9.2,4.67,18.49,7.21,28.85-4.3,0-8.09.1-11.86-.03-4.23-.14-7.74,1.26-7.91,5.77-.17,4.49,3.17,6.26,7.41,6.4,5.86.19,12.98-1.53,17.24,1.19,4.3,2.76,5.73,9.95,8.45,15.19,1.57,3.01,3.22,5.97,5.59,10.36-4.86,0-8.27.05-11.67-.01-4.22-.07-6.96,1.98-7.01,6.12-.05,4.01,2.96,5.79,6.68,5.9,5.73.17,11.49-.27,17.18.23,2.59.23,5.44,1.63,7.47,3.33,4.73,3.96,9.04,8.43,14.29,13.43-2.62,1.01-3.99,1.15-4.79,1.91-1.94,1.86-4.86,3.84-5.12,6.05-.43,3.5,2.51,5.47,6.19,5.5,6.66.05,13.31-.07,19.96.15,2.32.08,4.68.73,6.9,1.48,11.14,3.78,22.25,7.68,33.36,11.56,1.44.5,2.83,1.12,4.25,1.68.01.75.03,1.5.04,2.24-5.37.84-10.72,2.03-16.12,2.46-74.24,5.83-116.9-39.66-133.69-94.97-6.52-21.46-10.24-43.44-11.39-65.86-.24-4.59,1.08-6.16,5.77-6.03,10.9.3,21.82.19,32.73.08,3.4-.03,4.96.94,5.01,4.71.07,5.67.78,11.33,1.29,17.9Z"/>
      <path class="toe-stop-color" d="M448.77,339.16c1.76.93,3.1,1.52,4.31,2.31,12.52,8.2,25.03,16.4,37.5,24.67,5.11,3.39,5.28,4.61,1.15,8.93-13.66,14.3-27.35,28.56-41.08,42.79-4.03,4.18-5.38,4.08-9.1-.62-6.27-7.93-12.82-15.58-16.2-25.51-1.68-4.93-5.25-9.27-8.25-13.68-1.99-2.93-2.04-5.24.5-7.83,9.17-9.38,18.23-18.87,27.38-28.26,1.08-1.11,2.52-1.87,3.78-2.79Z"/>
      <path class="stripe-color" d="M210.77,169.68c6.59,5.39,12.68,10.13,18.37,15.31.81.74.23,4.06-.74,5.51-9.82,14.73-19.84,29.34-29.84,43.96-9.68,14.16-19.52,28.22-29.02,42.51-2.24,3.37-4.75,4.55-8.63,4.43-7.65-.24-15.31-.07-22.96-.07-.3-.55-.6-1.11-.9-1.66,24.52-36.58,49.04-73.17,73.72-109.98Z"/>
      <path class="top-color" d="M87.66,28.57c5.72,0,11.46-.21,17.16.15,1.36.09,3.76,2.13,3.72,3.21-1.31,35.83-12.84,66.45-44.94,86.25-1.13.7-2.65.77-3.99,1.14-.22-1.33-.83-2.73-.6-3.98,4.96-26.76,6.45-53.83,7.05-80.95.11-4.72,1.66-6.13,6.09-5.9,5.16.27,10.34.06,15.51.06v.02Z"/>
      <path class="stripe-color" d="M182.34,279.6c2.73-4.08,5.44-8.18,8.2-12.23,15.93-23.34,31.94-46.62,47.74-70.04,2.38-3.53,4.28-4.68,8.37-2.37,4.3,2.44,9.04,4.24,13.78,5.69,4.46,1.36,5.19,2.81,2.35,6.83-13.85,19.61-28.19,38.94-40.82,59.32-7.09,11.43-15.09,17.04-28.46,14.55-3.35-.62-6.91-.09-10.37-.09-.27-.55-.53-1.11-.8-1.66Z"/>
      <path class="stripe-color" d="M226.79,281.26c1.9-3.26,2.78-5.03,3.89-6.63,14.8-21.39,29.71-42.7,44.39-64.16,2.57-3.77,4.86-5.6,9.83-4.3,4.92,1.29,10.24,1.06,15.38,1.52,1.74.16,3.48.37,6.07.65-1.05,2.04-1.54,3.35-2.31,4.46-14.93,21.52-29.94,42.98-44.8,64.55-1.86,2.71-3.81,4.06-7.17,3.97-7.87-.19-15.75-.06-25.27-.06Z"/>
    </svg>
  );
};