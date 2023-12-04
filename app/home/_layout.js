import { Tabs } from 'expo-router';
import Header from '../../assets/components/Header';
import TabBar from '../../assets/components/TabBar';
import { useContext } from 'react';
import { LangContext, SafeAreaContext } from '../../assets/contexts/contexts';

const _layout = () => {
	const safeArea = useContext(SafeAreaContext);
	const lang = useContext(LangContext);

	return (
		<Tabs
			screenOptions={{
				header: (props) => <Header {...props} safeArea={safeArea} />,
			}}
			tabBar={(props) => <TabBar {...props} safeArea={safeArea} />}
		>
			<Tabs.Screen name='learn/index' options={{ title: lang.learn.learn.title }} />
			<Tabs.Screen name='my-garden/index' />
			<Tabs.Screen name='settings' options={{ title: lang.settings.settings.title, headerShown: false }} />
		</Tabs>
	);
};

export default _layout;
