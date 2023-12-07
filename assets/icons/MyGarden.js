import React from 'react';
import Svg, { Path } from 'react-native-svg';

const MyGarden = (props) => (
	<Svg width='30' height='30' viewBox='0 0 26 26' fill='none' {...props}>
		<Path
			d='M13.7143 22.8855H22.85V14.5018C22.85 11.4648 21.5492 8.53279 19.2014 6.35663C16.8507 4.17775 13.645 2.94004 10.2857 2.94004H1.15002V11.3238C1.15002 14.3608 2.45081 17.2928 4.7986 19.4689C7.14933 21.6478 10.3551 22.8855 13.7143 22.8855Z'
			stroke={props.color ?? `black`}
			strokeWidth='2.2'
		/>
	</Svg>
);

export default MyGarden;
