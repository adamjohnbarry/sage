import { Slot } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LangContext, SafeAreaContext } from '../assets/contexts/Contexts';
import { UserProvider } from '../assets/contexts/UserContext';
import { langEN } from '../assets/utils/utils';
import * as Font from 'expo-font';

const _layout = () => {
	const insets = useSafeAreaInsets();
	const safeArea = {
		paddingTop: insets.top,
		paddingBottom: insets.bottom,
	};

	const [lang, setLang] = useState(langEN);
	const [fontsLoaded, setFontsLoaded] = useState(false);

	useEffect(() => {
		(async () => {
			await Font.loadAsync({
				'Adelle-Regular': require('../assets/fonts/AdelleSansEXT-Regular.otf'),
				'Adelle-Semibold': require('../assets/fonts/AdelleSansEXT-Semibold.otf'),
				'Adelle-Bold': require('../assets/fonts/AdelleSansEXT-Bold.otf'),
			});
			setFontsLoaded(true);
		})();
	}, []);

	if (!fontsLoaded) {
		return null; // Or some loading component
	}

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
