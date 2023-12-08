import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Message = (props) => (
  <Svg width={20} height={21} viewBox="0 0 20 21" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.5 10.1517C17.5028 11.2516 17.2459 12.3366 16.75 13.3184C15.5508 15.7178 13.0991 17.234 10.4167 17.235C9.31677 17.2379 8.23175 16.9809 7.24999 16.485L2.5 18.0684L4.08333 13.3184C3.58744 12.3366 3.33046 11.2516 3.33333 10.1517C3.33437 7.46929 4.85056 5.01758 7.24999 3.81838C8.23175 3.32249 9.31677 3.06552 10.4167 3.06838H10.8333C14.4298 3.2668 17.3016 6.13854 17.5 9.73504V10.1517V10.1517Z"
      stroke="black"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Message;
