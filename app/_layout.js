import { Slot } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LangContext, SafeAreaContext } from '../assets/contexts/contexts';
import { langEN } from '../assets/utils/utils';

const _layout = () => {
	const insets = useSafeAreaInsets();

	// create object with dimensions for safe area use
	const safeArea = {
		paddingTop: insets.top,
		paddingBottom: insets.bottom,
	};

	return (
		<SafeAreaContext.Provider value={safeArea}>
			<LangContext.Provider value={langEN}>
				<Slot />
			</LangContext.Provider>
		</SafeAreaContext.Provider>
	);
};

export default _layout;
