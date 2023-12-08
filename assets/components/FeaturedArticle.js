import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fontSizes, spacing } from '../../assets/theme/theme';

export default function FeaturedArticle({ article }) {
	return (
		<View style={styles.container}>
			<View style={styles.imageContainer}>
				<Image source={article.image} />
				<Text style={styles.category}>{article.category.toUpperCase()}</Text>
			</View>
			<Text style={styles.title} numberOfLines={2}>
				{article.title}
			</Text>
			<Text style={styles.text} numberOfLines={3}>
				{article.text}
			</Text>
			<TouchableOpacity>
				<Text style={styles.read}>Read Article</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: 289,
		marginRight: spacing.mdSpacing,
	},
	image: {
		height: 230,
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
		fontSize: fontSizes.h1,
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
