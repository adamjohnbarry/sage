import { StyleSheet, View } from 'react-native';
import { colors, spacing } from '../theme/theme';
import TabBarButton from './TabBarButton';
import { useRouter } from 'expo-router';

const TabBar = ({ safeArea }) => {
	const router = useRouter();

	return (
		<View style={[styles.tabBar, { paddingBottom: safeArea.paddingBottom }]}>
			<TabBarButton
				icon='book-open'
				text='Learn'
				onPress={() =>
					router.replace({
						pathname: '/home/learn',
						params: {
							title: 'Learn',
							description: 'Hi',
						},
					})
				}
			/>
			<TabBarButton
				icon='leaf'
				text='My Garden'
				onPress={() =>
					router.replace({
						pathname: '/home/my-garden',
						params: {
							title: 'My Garden',
							description: 'Hi',
						},
					})
				}
			/>
			<TabBarButton
				icon='cog'
				text='Settings'
				onPress={() =>
					router.replace({
						pathname: '/home/settings',
						params: {
							title: 'Settings',
							color: colors.white,
						},
					})
				}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	tabBar: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		paddingTop: spacing.mdSpacing,
		backgroundColor: colors.navbar + '70',
	},
});

export default TabBar;
