import { Slot } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { UserProvider } from '../assets/contexts/UserContext';
import { LangContext, SafeAreaContext } from '../assets/contexts/Contexts';
import { langEN } from '../assets/utils/utils';
import { useState } from 'react';

const _layout = () => {
	const insets = useSafeAreaInsets();
	const safeArea = {
		paddingTop: insets.top,
		paddingBottom: insets.bottom,
	};

	const [lang, setLang] = useState(langEN);

	return (
		<UserProvider>
			<SafeAreaContext.Provider value={{ safeArea }}>
				<LangContext.Provider value={{ lang, setLang }}>
					<Slot />
				</LangContext.Provider>
			</SafeAreaContext.Provider>
		</UserProvider>
	);
};

export default _layout;
