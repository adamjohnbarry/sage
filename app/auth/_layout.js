import { Stack } from 'expo-router';
import { useContext } from 'react';
import AuthenticationHeader from '../../assets/components/AuthenticationHeader';
import { SafeAreaContext } from '../../assets/contexts/Contexts';

const _layout = () => {
	const { safeArea } = useContext(SafeAreaContext);

	return (
		<Stack
			screenOptions={{
				header: (props) => <AuthenticationHeader {...props} safeArea={safeArea} />,
			}}
		>
			<Stack.Screen
				name='how-do-i-get-an-invite-word'
				options={{
					presentation: 'modal',
					headerShown: false,
				}}
			/>
		</Stack>
	);
};

export default _layout;
