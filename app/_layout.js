import { Slot } from 'expo-router';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LangContext, SafeAreaContext } from '../assets/contexts/Contexts';
import { UserProvider } from '../assets/contexts/UserContext';
import { langEN } from '../assets/utils/utils';

const _layout = () => {
	const insets = useSafeAreaInsets();
	const safeArea = {
		paddingTop: insets.top,
		paddingBottom: insets.bottom,
	};

	const [lang, setLang] = useState(langEN);

	return (
		<LangContext.Provider value={{ lang, setLang }}>
			<UserProvider>
				<SafeAreaContext.Provider value={{ safeArea }}>
					<Slot />
				</SafeAreaContext.Provider>
			</UserProvider>
		</LangContext.Provider>
	);
};

export default _layout;
