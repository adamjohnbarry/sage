import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fontSizes, spacing } from '../../assets/theme/theme';

export default function FeaturedArticle({ article }) {
	return (
		<TouchableOpacity style={styles.container}>
			<View style={styles.imageContainer}>
				<Image source={article.image} style={styles.image} resizeMode='cover' />
				<Text style={styles.category}>{article.category.toUpperCase()}</Text>
			</View>
			<Text style={styles.title} numberOfLines={2}>
				{article.title}
			</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		width: 229,
		marginRight: spacing.mdSpacing,
	},
	imageContainer: {
		width: 229,
		height: 152,
		borderRadius: 12,
		overflow: 'hidden',
	},
	image: {
		width: '100%',
		height: '100%',
	},
	category: {
		position: 'absolute',
		right: 16,
		top: 16,
		fontSize: 14,
		color: colors.black,
		backgroundColor: colors.white,
		paddingHorizontal: spacing.xsSpacing,
		paddingVertical: 2,
	},
	title: {
		fontSize: fontSizes.h3,
		fontWeight: 'bold',
		color: colors.black,
		paddingVertical: spacing.smSpacing,
	},
	text: {
		fontSize: fontSizes.body,
		color: colors.darkGrey,
		paddingBottom: spacing.lgSpacing,
	},
	read: {
		fontSize: fontSizes.body,
		color: colors.darkGrey,
		fontWeight: 'bold',
	},
});
