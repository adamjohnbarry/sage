import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Learn = (props) => (
	<Svg width='30' height='30' viewBox='0 0 26 26' fill='none' {...props}>
		<Path d='M12 2.91309V6.91309' stroke={props.color ?? `black`} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
		<Path d='M12 18.9131V22.9131' stroke={props.color ?? `black`} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
		<Path d='M4.92993 5.84277L7.75993 8.67277' stroke={props.color ?? `black`} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
		<Path d='M16.24 17.1533L19.07 19.9833' stroke={props.color ?? `black`} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
		<Path d='M2 12.9131H6' stroke={props.color ?? `black`} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
		<Path d='M18 12.9131H22' stroke={props.color ?? `black`} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
		<Path d='M4.92993 19.9833L7.75993 17.1533' stroke={props.color ?? `black`} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
		<Path d='M16.24 8.67277L19.07 5.84277' stroke={props.color ?? `black`} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
	</Svg>
);

export default Learn;
