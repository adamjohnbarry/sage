import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontSizes, spacing } from '../theme/theme';

const GardenItem = ({ address, image, distance, driveTime, onPress, active }) => {
	return (
		<Pressable onPress={onPress} style={[styles.gardenItem, , active && styles.gardenItemPressed]}>
			<Image source={{ uri: image }} style={styles.gardenItemImage} />
			<View style={styles.gardenItemInfo}>
				<Text style={styles.gardenItemInfoName}>{address}</Text>
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
