import React from 'react';
import { SafeAreaView, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, fontSizes, spacing } from '../../assets/theme/theme';

const LearnHeader = ({ title, filters, activeFilter, onFilterPress }) => {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>{title}</Text>

			<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContainer}>
				{filters.map((filter, index) => (
					<TouchableOpacity key={filter} style={[styles.pill, activeFilter === index && styles.activePill]} onPress={() => onFilterPress(index)}>
						<Text style={[styles.filterText, activeFilter === index && styles.activeFilterText]}>{filter}</Text>
					</TouchableOpacity>
				))}
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.secondary,
	},
	title: {
		fontSize: fontSizes.h1,
		fontWeight: 'bold',
		color: colors.white,
		paddingHorizontal: spacing.xlSpacing,
		paddingVertical: spacing.lgSpacing,
	},
	filterContainer: {
		flexDirection: 'row',
		paddingHorizontal: spacing.xlSpacing,
	},
	pill: {
		borderRadius: 100,
		marginRight: spacing.smSpacing,
		paddingHorizontal: spacing.mdSpacing, // Adjust as needed
		paddingVertical: spacing.smSpacing,
		backgroundColor: colors.white10,
	},
	activePill: {
		backgroundColor: colors.white, // Or any color that signifies an active state
	},
	filterText: {
		color: colors.white,
		textAlign: 'center',
	},
	activeFilterText: {
		color: colors.black,
	},
});

export default LearnHeader;
