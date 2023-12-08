import { ScrollView } from 'react-native';
import globalStyles from '../styles/GlobalStyles';

const ContainerScroll = ({ children }) => {
	return <ScrollView style={globalStyles.containerScroll}>{children}</ScrollView>;
};

export default ContainerScroll;
