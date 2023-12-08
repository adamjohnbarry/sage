import React, { useContext, useRef, useState } from 'react';
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ArticleCard from '../../assets/components/ArticleCard';
import FeaturedArticle from '../../assets/components/FeaturedArticle';
import LearnHeader from '../../assets/components/LearnHeader';
import { LangContext } from '../../assets/contexts/Contexts';
import { ARTICLES } from '../../assets/data/articles';
import { colors, fontSizes, spacing } from '../../assets/theme/theme';

const FILTERS = Object.keys(ARTICLES);

const HEADER_MAX_HEIGHT = 155; // Max height for the header
const HEADER_MIN_HEIGHT = 70; // Min height for the header when collapsed

const Learn = () => {
	const scrollY = useRef(new Animated.Value(0)).current; // Animated value for scroll
	const { lang } = useContext(LangContext);
	const [activeFilter, setActiveFilter] = useState(0);

	// Header height interpolated with the scroll position
	const headerHeight = scrollY.interpolate({
		inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
		outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
		extrapolate: 'clamp',
	});

	const onFilterPress = (index) => {
		setActiveFilter(index);
	};

	return (
		<View style={styles.container}>
			<Animated.View style={[styles.header, { height: headerHeight }]}>
				<LearnHeader title={lang.learn.learn.title} filters={FILTERS} activeFilter={activeFilter} onFilterPress={onFilterPress} />
			</Animated.View>
			<ScrollView
				bounces={false}
				contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { y: scrollY } } }],
					{ useNativeDriver: false } // Set to true if you want to offload animations to the native layer
				)}
				scrollEventThrottle={16} // Define how often the scroll event fires
			>
				<View style={{ marginBottom: spacing.xlSpacing }}>
					<View height={180} style={{ marginBottom: -160, marginTop: -spacing.lgSpacing, backgroundColor: colors.secondary }} />
					<View style={styles.articles}>
						{ARTICLES[FILTERS[activeFilter]].featured && ARTICLES['For you'].featured.length > 0 && (
							<ScrollView horizontal={true} style={styles.featured} showsHorizontalScrollIndicator={false}>
								{ARTICLES['For you'].featured.map((article, index) => (
									<FeaturedArticle key={index} article={article} />
								))}
							</ScrollView>
						)}
						{Object.entries(ARTICLES[FILTERS[activeFilter]].sections).map(([sectionTitle, articles], index) => (
							<View key={index} style={styles.sectionContainer}>
								<View style={styles.sectionHeader}>
									<Text style={[styles.sectionTitle, !ARTICLES[FILTERS[activeFilter]].featured && index === 0 ? styles.whiteText : {}]}>{sectionTitle}</Text>
									<TouchableOpacity>
										<Text
											style={[
												{ color: colors.black, paddingBottom: 8, fontSize: fontSizes.body, textDecorationLine: 'underline' },
												!ARTICLES[FILTERS[activeFilter]].featured && index === 0 ? { color: colors.white } : {},
											]}
										>
											See all
										</Text>
									</TouchableOpacity>
								</View>
								<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.sectionScroll}>
									{articles.map((article, idx) => (
										<ArticleCard key={idx} article={article} />
									))}
								</ScrollView>
							</View>
						))}
					</View>
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		backgroundColor: colors.secondary,
		zIndex: 10,
	},
	articles: {},
	featured: {
		paddingHorizontal: spacing.xlSpacing,
		paddingVertical: spacing.lgSpacing,
	},
	sectionContainer: {
		marginTop: spacing.mdSpacing,
	},
	sectionScroll: {
		paddingHorizontal: spacing.xlSpacing,
	},
	sectionHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: spacing.xlSpacing,
	},
	sectionTitle: {
		fontSize: fontSizes.h2,
		fontWeight: 'bold',
		color: colors.black,
		paddingBottom: spacing.mdSpacing,
	},
	whiteText: {
		color: colors.white,
	},
});

export default Learn;
