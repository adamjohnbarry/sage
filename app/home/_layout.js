import { Tabs } from 'expo-router';
import Header from '../../assets/components/Header';
import TabBar from '../../assets/components/TabBar';
import { useContext } from 'react';
import { SafeAreaContext } from '../../assets/contexts/contexts';

const _layout = () => {
	const safeArea = useContext(SafeAreaContext);

	return (
		<Tabs
			screenOptions={{
				header: (props) => <Header {...props} safeArea={safeArea} />,
			}}
			tabBar={(props) => <TabBar {...props} safeArea={safeArea} />}
		>
			<Tabs.Screen name='learn' options={{ title: 'Learn', headerShown: false }} />
			<Tabs.Screen name='my-garden' options={{ title: 'My Garden' }} />
			<Tabs.Screen name='settings' options={{ title: 'Settings', headerShown: false }} />
		</Tabs>
	);
};

export default _layout;
