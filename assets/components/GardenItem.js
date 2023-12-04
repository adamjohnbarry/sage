import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontSizes, spacing } from '../theme/theme';
import { useState } from 'react';

const GardenItem = ({ name, image, distance, driveTime }) => {
	const [pressed, setPressed] = useState(false);

	return (
		<Pressable style={[styles.gardenItem, pressed && styles.gardenItemPressed]} onPress={() => setPressed((prevState) => !prevState)}>
			<Image source={{ uri: image }} style={styles.gardenItemImage} />
			<View style={styles.gardenItemInfo}>
				<Text style={styles.gardenItemInfoName}>{name}</Text>
				<Text style={styles.gardenItemInfoDescription}>
					{distance} miles away · {driveTime} min drive
				</Text>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	gardenItem: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderStyle: 'solid',
		padding: spacing.smSpacing,
		borderColor: colors.white,
		borderRadius: spacing.borderRadius,
		gap: spacing.mdSpacing,
	},
	gardenItemPressed: {
		backgroundColor: colors.lightGrey,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: colors.black,
	},
	gardenItemImage: {
		width: 100,
		aspectRatio: 1 / 1,
		borderRadius: spacing.borderRadius,
	},
	gardenItemInfo: {
		flexGrow: 1,
		gap: spacing.mdSpacing,
	},
	gardenItemInfoName: {
		fontSize: fontSizes.h3,
		fontWeight: 'bold',
	},
	gardenItemInfoDescription: {
		fontSize: fontSizes.body,
	},
});

export default GardenItem;
