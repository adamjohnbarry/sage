import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const SageWordmark = (props) => {
	return (
		<Svg width={props.width} height={112} viewBox='0 0 318 112' fill='none' {...props}>
			<Path
				d='M42.2856 82.1178H69.5V57.2219C69.5 48.1353 65.6088 39.345 58.5557 32.8075C51.4911 26.2594 41.8412 22.5273 31.7142 22.5273H4.49982V47.4233C4.49982 56.5099 8.39104 65.3002 15.4441 71.8377C22.5087 78.3858 32.1586 82.1178 42.2856 82.1178Z'
				stroke='black'
				strokeWidth={9}
			/>
			<Path
				d='M135.195 27.2866C131.62 27.2866 129.011 27.9629 127.272 29.3157C125.533 30.6684 124.76 32.5042 124.76 34.7266C124.76 36.8523 125.339 38.4949 126.692 39.751C128.045 41.0071 129.784 42.07 132.007 42.843C134.132 43.616 136.548 44.389 139.06 45.0653C141.572 45.8383 144.084 46.6113 146.693 47.4809C149.302 48.4471 151.718 49.6066 153.843 51.1526C155.969 52.6986 157.708 54.6311 159.061 56.95C160.414 59.3656 161.09 62.361 161.09 66.0327C161.09 71.347 159.834 75.5984 157.322 78.8836C154.81 82.1688 151.428 84.4878 147.37 85.9371C143.312 87.4831 138.963 88.1595 134.326 88.1595C131.137 88.1595 128.045 87.8696 124.953 87.1932C121.861 86.6135 119.059 85.454 116.547 83.908C113.938 82.3621 111.812 80.0431 110.17 77.1444C108.527 74.2457 107.561 70.4773 107.271 65.936L120.798 63.9069C121.185 66.2259 121.764 68.255 122.634 70.1875C123.504 72.12 124.856 73.5693 126.789 74.7288C128.625 75.8883 131.234 76.3714 134.712 76.3714C137.804 76.3714 140.509 75.7917 142.828 74.5355C145.147 73.2794 146.307 71.0571 146.307 67.7719C146.307 65.7428 145.63 64.1002 144.278 62.9407C142.925 61.7812 141.282 60.815 139.157 60.042C137.031 59.269 134.712 58.5926 132.2 57.9163C129.591 57.2399 126.982 56.4669 124.373 55.5973C121.764 54.8243 119.349 53.6648 117.223 52.1188C115.001 50.6695 113.262 48.737 111.909 46.2248C110.556 43.8092 109.88 40.7173 109.88 36.8523C109.88 32.311 110.943 28.446 113.262 25.3541C115.581 22.2621 118.672 19.8465 122.537 18.2039C126.402 16.658 130.654 15.7883 135.388 15.7883C138.48 15.7883 141.476 16.0782 144.374 16.658C147.273 17.2377 149.785 18.3006 152.104 19.8465C154.423 21.3925 156.259 23.4216 157.708 26.0304C159.158 28.7359 160.027 32.1177 160.317 36.2726L146.693 37.8185C146.403 34.5333 145.437 32.0211 143.795 30.0886C142.152 28.2528 139.253 27.2866 135.195 27.2866ZM208.021 74.4389C208.021 75.7917 208.214 76.8545 208.6 77.4343C208.987 78.014 209.76 78.3039 211.016 78.3039C211.789 78.3039 212.755 78.1106 214.011 77.7241L214.398 86.1304C213.432 86.6135 211.982 87.0966 210.146 87.4831C208.311 87.8696 206.668 88.0629 205.122 88.0629C202.223 88.0629 199.904 87.6764 198.165 86.7101C196.426 85.7439 195.266 84.1013 194.783 81.6857C193.141 83.8114 191.112 85.3574 188.696 86.5169C186.184 87.6764 183.285 88.1595 179.807 88.1595C176.618 88.1595 174.009 87.773 172.077 86.8068C170.144 85.9371 168.598 84.7777 167.535 83.3283C166.473 81.9756 165.796 80.4296 165.41 78.8836C165.023 77.3376 164.83 75.9849 164.83 74.7288C164.83 70.8638 165.7 67.7719 167.439 65.4529C169.178 63.1339 171.497 61.3947 174.396 60.1386C177.294 58.9791 180.386 58.1095 183.768 57.723C187.15 57.3365 190.435 57.1433 193.72 57.1433V55.3074C193.72 52.5053 193.334 50.283 192.561 48.6404C191.788 46.9978 189.759 46.1282 186.57 46.1282C184.155 46.1282 182.415 46.7079 181.353 47.7708C180.193 48.9303 179.42 50.6695 178.937 53.0851L166.569 50.6695C167.342 45.9349 169.371 42.2632 172.656 39.5578C175.942 36.9489 180.966 35.5962 187.826 35.5962C194.493 35.5962 199.518 37.0456 202.9 39.751C206.281 42.5531 208.021 47.0944 208.021 53.375V74.4389ZM191.498 65.6462C188.02 65.6462 185.218 66.1293 182.899 67.0955C180.58 68.0618 179.517 69.801 179.517 72.3132C179.517 73.7626 179.903 75.0187 180.676 76.1781C181.449 77.3376 183.092 77.8207 185.411 77.8207C187.15 77.8207 188.793 77.5309 190.339 76.7579C191.885 76.0815 193.044 75.3085 193.817 74.5355V65.6462H191.498ZM239.676 35.5962C242.382 35.5962 244.894 35.8861 247.213 36.3692C249.435 36.8523 251.368 37.6253 253.01 38.6882C253.88 36.8523 255.039 35.1131 256.489 33.4705C257.938 31.9245 259.871 31.0549 262.286 31.0549C263.542 31.0549 264.895 31.3448 266.344 31.9245V41.4902C263.349 41.297 260.547 41.4902 258.035 42.2632C259.484 43.9058 260.547 45.6451 261.223 47.5775C261.803 49.51 262.19 51.5391 262.19 53.5682C262.19 57.3365 261.223 60.5251 259.291 63.2306C257.358 65.936 254.75 68.0618 251.464 69.5111C248.179 70.9605 244.314 71.6368 240.063 71.6368C238.324 71.6368 236.874 71.6368 235.618 71.4436C234.362 71.2503 233.009 70.9605 231.657 70.574C231.173 71.0571 230.787 71.5402 230.4 72.0233C230.014 72.5064 229.821 73.0862 229.821 73.6659C229.821 74.4389 230.111 75.0187 230.69 75.4052C231.27 75.8883 232.526 76.1781 234.362 76.2748L248.662 77.1444C253.977 77.5309 258.131 78.6904 261.127 80.8161C264.025 82.9418 265.571 86.6135 265.571 91.6379C265.571 95.7928 264.412 99.078 262.093 101.59C259.774 104.102 256.585 105.938 252.624 107.098C248.662 108.257 244.218 108.74 239.29 108.74C233.106 108.74 228.275 108.257 224.796 107.291C221.221 106.325 218.709 104.875 217.26 103.136C215.714 101.397 215.037 99.3678 215.037 97.0489C215.037 94.7299 215.81 92.7008 217.453 91.1548C219.095 89.6088 221.318 88.546 224.12 87.9662V87.5797C219.192 86.227 216.776 83.3283 216.776 79.0769C216.776 76.5646 217.453 74.5355 218.902 72.8929C220.255 71.2503 222.187 69.6077 224.603 67.8685C222.284 66.6124 220.545 64.7766 219.192 62.4576C217.839 60.1386 217.26 57.4331 217.26 54.2446C217.26 50.6695 218.129 47.4809 219.868 44.6788C221.608 41.8767 224.12 39.6544 227.502 38.0118C230.787 36.4658 234.845 35.5962 239.676 35.5962ZM248.856 53.4716C248.856 50.8627 248.083 48.9303 246.537 47.6742C244.991 46.5147 242.865 45.8383 240.256 45.8383C237.647 45.8383 235.425 46.5147 233.686 47.6742C231.946 48.8336 231.077 50.7661 231.077 53.4716C231.077 58.6893 234.072 61.2015 240.063 61.2015C242.672 61.2015 244.797 60.5251 246.44 59.1724C247.986 57.8196 248.856 55.9838 248.856 53.4716ZM251.368 94.2468C251.368 93.2805 250.981 92.4109 250.208 91.6379C249.435 90.8649 247.793 90.4785 245.184 90.2852L231.173 89.4156C230.207 90.092 229.531 90.8649 228.951 91.6379C228.371 92.5076 228.178 93.3772 228.178 94.2468C228.178 96.2759 229.338 97.6286 231.753 98.305C234.169 99.078 237.067 99.3678 240.449 99.3678C243.638 99.3678 246.247 99.078 248.276 98.4016C250.305 97.7252 251.368 96.3725 251.368 94.2468ZM291.556 88.1595C286.918 88.1595 282.956 87.4831 279.768 86.0338C276.579 84.681 274.067 82.7486 272.231 80.2363C270.298 77.7241 268.946 74.922 268.173 71.8301C267.303 68.7381 266.917 65.4529 266.917 61.9745C266.917 55.9838 267.979 50.9594 270.202 47.0944C272.424 43.2295 275.419 40.3308 279.188 38.3983C282.86 36.5624 287.014 35.5962 291.556 35.5962C299.189 35.5962 304.696 37.7219 308.078 41.9734C311.46 46.2248 313.199 51.9256 313.199 58.8825C313.199 59.7521 313.103 60.815 313.103 62.1677C313.103 63.5204 313.006 64.5833 312.909 65.4529H282.28C282.376 69.6077 283.343 72.5064 285.082 74.2457C286.821 75.9849 289.237 76.8545 292.425 76.8545C295.034 76.8545 296.967 76.2748 298.126 74.922C299.286 73.5693 300.155 71.8301 300.638 69.7044L312.909 72.6997C311.943 77.4343 309.721 81.2026 306.049 84.0047C302.377 86.8068 297.546 88.1595 291.556 88.1595ZM298.126 56.177C298.126 52.602 297.45 49.9931 296.194 48.4471C294.937 46.9012 293.102 46.1282 290.783 46.1282C288.657 46.1282 286.821 46.9012 285.082 48.4471C283.343 49.9931 282.473 52.5053 282.473 56.177H298.126Z'
				fill='black'
			/>
		</Svg>
	);
};
