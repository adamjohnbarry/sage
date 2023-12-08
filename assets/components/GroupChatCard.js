import React, { useContext } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LangContext } from '../contexts/Contexts';
import { MEMBERS } from '../data/members';
import ChevronRight from '../icons/ChevronRight';
import Message from '../icons/message';
import globalStyles from '../styles/GlobalStyles';
import { colors, spacing } from '../theme/theme';

export default function GroupChatCard({ onPress }) {
	const { lang } = useContext(LangContext);

	const latestMessage = lang.myGarden.groupChat.example;

	// This function generates a random position for the image inside the circle
	const getImagePosition = (index, imageSize) => {
		const circleDiameter = 50;
		const radius = circleDiameter / 2 - imageSize / 2;

		// Equilateral triangle angles at 0, 120, and 240 degrees
		const angle = index * 30; // Convert angle to radians

		const x = radius + radius * Math.cos(angle) - imageSize + 20 / 2;
		const y = radius + radius * Math.sin(angle) - imageSize + 80 / 2;

		return { top: y, left: x };
	};

	return (
		<TouchableOpacity style={styles.cardContainer} onPress={onPress}>
			<View style={styles.profileImagesContainer}>
				{MEMBERS.slice(0, 3).map((member, index) => {
					const imageSize = 26; // Use a fixed size for this example
					const position = getImagePosition(index, imageSize);
					return (
						<Image
							key={index}
							source={member.photo}
							style={[
								styles.profileImage,
								{
									width: imageSize,
									height: imageSize,
									borderRadius: imageSize / 2,
									...position,
								},
							]}
						/>
					);
				})}
			</View>
			<View style={styles.messageContainer}>
				<View style={{ flexDirection: 'row', gap: spacing.xsSpacing, alignItems: 'center' }}>
					<Message />
					<Text style={globalStyles.subtitle}>{lang.myGarden.groupChat.title}</Text>
				</View>
				<Text style={styles.messageText} numberOfLines={1}>
					{latestMessage}
				</Text>
			</View>
			<ChevronRight />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	cardContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: spacing.lgSpacing,
		borderRadius: spacing.mdSpacing,
		backgroundColor: colors.fog,
		height: 104,
		width: Dimensions.get('window').width - 2 * spacing.xlSpacing,
	},
	profileImagesContainer: {
		flexDirection: 'row',
		position: 'relative',
		backgroundColor: 'rgba(255,255,255,0.4)',
		borderRadius: 100,
		height: 70,
		width: 70,
		zIndex: 1,
	},
	profileImage: {
		borderRadius: 100,
		borderWidth: 2,
		borderColor: '#EEE7E8',
	},
	messageContainer: {
		flex: 1,
		marginLeft: 16,
		gap: spacing.xsSpacing,
	},
	messageText: {
		fontSize: 16,
		fontWeight: '500',
		color: 'rgba(0,0,0,0.6)',
	},
});
