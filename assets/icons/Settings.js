import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const Settings = (props) => (
	<Svg width={30} height={30} viewBox='0 0 26 26' fill='none' {...props}>
		<Path
			d='M14.6693 4.69231L14.0208 2.98462C13.9114 2.69548 13.719 2.44679 13.4688 2.2711C13.2185 2.09541 12.9221 2.00092 12.6183 2H11.3817C11.0779 2.00092 10.7815 2.09541 10.5312 2.2711C10.281 2.44679 10.0886 2.69548 9.9792 2.98462L9.33074 4.69231L7.12897 5.98462L5.34946 5.70769C5.05315 5.66666 4.75158 5.71642 4.48306 5.85065C4.21453 5.98488 3.99119 6.19752 3.8414 6.46154L3.23818 7.53846C3.0836 7.80669 3.01239 8.11643 3.03393 8.4268C3.05547 8.73717 3.16875 9.03359 3.35882 9.27692L4.45971 10.7077V13.2923L3.32866 14.7231C3.13859 14.9664 3.02531 15.2628 3.00377 15.5732C2.98223 15.8836 3.05344 16.1933 3.20802 16.4615L3.81124 17.5385C3.96103 17.8025 4.18437 18.0151 4.45289 18.1493C4.72142 18.2836 5.02299 18.3333 5.3193 18.2923L7.09881 18.0154L9.30058 19.3077L9.94904 21.0154C10.0584 21.3045 10.2508 21.5532 10.5011 21.7289C10.7513 21.9046 11.0478 21.9991 11.3515 22H12.6183C12.9221 21.9991 13.2185 21.9046 13.4688 21.7289C13.719 21.5532 13.9114 21.3045 14.0208 21.0154L14.6693 19.3077L16.871 18.0154L18.6505 18.2923C18.9468 18.3333 19.2484 18.2836 19.5169 18.1493C19.7855 18.0151 20.0088 17.8025 20.1586 17.5385L20.7618 16.4615C20.9164 16.1933 20.9876 15.8836 20.9661 15.5732C20.9445 15.2628 20.8313 14.9664 20.6412 14.7231L19.5403 13.2923V10.7077L20.6713 9.27692C20.8614 9.03359 20.9747 8.73717 20.9962 8.4268C21.0178 8.11643 20.9466 7.80669 20.792 7.53846L20.1888 6.46154C20.039 6.19752 19.8156 5.98488 19.5471 5.85065C19.2786 5.71642 18.977 5.66666 18.6807 5.70769L16.9012 5.98462L14.6693 4.69231ZM15.0161 12C15.0161 12.6086 14.8392 13.2034 14.5078 13.7094C14.1764 14.2154 13.7053 14.6098 13.1542 14.8427C12.6031 15.0756 11.9967 15.1365 11.4116 15.0178C10.8265 14.8991 10.2891 14.606 9.86728 14.1757C9.44547 13.7454 9.15821 13.1971 9.04184 12.6003C8.92546 12.0034 8.98519 11.3847 9.21347 10.8225C9.44175 10.2603 9.82834 9.77973 10.3243 9.44163C10.8203 9.10354 11.4035 8.92308 12 8.92308C12.7999 8.92308 13.5671 9.24725 14.1327 9.82429C14.6983 10.4013 15.0161 11.1839 15.0161 12Z'
			stroke={props.color ?? `black`}
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</Svg>
);

export default Settings;
