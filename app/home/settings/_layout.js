import { Stack } from 'expo-router';
import { useContext } from 'react';
import Header from '../../../assets/components/Header';
import { SafeAreaContext } from '../../../assets/contexts/Contexts';

const _layout = () => {
	const { safeArea } = useContext(SafeAreaContext);

	return (
		<Stack
			screenOptions={{
				header: (props) => <Header {...props} safeArea={safeArea} />,
			}}
		/>
	);
};

export default _layout;
