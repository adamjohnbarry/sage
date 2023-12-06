import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const Help = (props) => (
  <Svg width="20" height="21" viewBox="0 0 20 21" fill="none" {...props}>
    <G opacity="0.5">
      <Path 
        d="M10.0001 18.902C14.6025 18.902 18.3334 15.1711 18.3334 10.5687C18.3334 5.96631 14.6025 2.23535 10.0001 2.23535C5.39771 2.23535 1.66675 5.96631 1.66675 10.5687C1.66675 15.1711 5.39771 18.902 10.0001 18.902Z" 
        stroke="black" 
        strokeWidth="1.83333" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <Path 
        d="M7.57495 8.06883C7.77087 7.51189 8.15758 7.04226 8.66658 6.74311C9.17558 6.44397 9.77403 6.33462 10.3559 6.43443C10.9378 6.53424 11.4656 6.83677 11.8458 7.28844C12.2261 7.74011 12.4342 8.31177 12.4333 8.90217C12.4333 10.5688 9.93328 11.4022 9.93328 11.4022" 
        stroke="black" 
        strokeWidth="1.83333" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <Path 
        d="M10 14.7354H10.01" 
        stroke="black" 
        strokeWidth="1.83333" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </G>
  </Svg>
);

export default Help;

