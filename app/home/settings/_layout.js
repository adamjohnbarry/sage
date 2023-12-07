import { Stack } from 'expo-router';
import { SafeAreaContext } from '../../../assets/contexts/Contexts';
import { useContext } from 'react';
import Header from '../../../assets/components/Header';

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
