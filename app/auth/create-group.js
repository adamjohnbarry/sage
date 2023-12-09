import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../assets/components/Button';
import ButtonGroup from '../../assets/components/ButtonGroup';
import { LangContext, SafeAreaContext } from '../../assets/contexts/Contexts';
import { colors, fontSizes, spacing } from '../../assets/theme/theme';
import globalStyles from '../../assets/styles/GlobalStyles';

const CreateGroup = () => {
	const router = useRouter();
	const { safeArea } = useContext(SafeAreaContext);
	const { lang } = useContext(LangContext);

	return (
		<View style={[styles.instructionsContainer, { paddingBottom: safeArea.paddingBottom }]}>
			<View style={styles.instructions}>
				<View style={styles.instructionsList}>
					{lang.createGroup.createGroup.instructions.map((instruction, i) => (
						<View key={i} style={styles.instruction}>
							<View style={styles.instructionNumberContainer}>
								<Text style={globalStyles.h2}>{i + 1}</Text>
							</View>
							<Text style={globalStyles.h3}>{instruction.description}</Text>
						</View>
					))}
				</View>
				<View style={styles.timeGuide}>
					<FontAwesome5 name='clock' size={fontSizes.body} color={colors.black} />
					<Text style={globalStyles.body}>{lang.createGroup.createGroup.timeGuide}</Text>
				</View>
			</View>
			<ButtonGroup>
				<Button
					text={lang.button.continue}
					onPress={() =>
						router.push({
							pathname: '/auth/name-garden',
							params: { index: 4, title: lang.createGroup.nameGarden.title, description: lang.createGroup.nameGarden.description },
						})
					}
				/>
			</ButtonGroup>
		</View>
	);
};

const styles = StyleSheet.create({
	instructionsContainer: {
		flex: 1,
		justifyContent: 'space-between',
		backgroundColor: colors.primary,
		padding: spacing.lgSpacing,
	},
	instructions: {
		flex: 1,
		justifyContent: 'center',
		paddingBottom: spacing.xlSpacing * 2,
		gap: spacing.xlSpacing,
	},
	instructionsList: {
		gap: spacing.xlSpacing,
		marginBottom: spacing.lgSpacing,
		marginHorizontal: spacing.xlSpacing,

	},
	instruction: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: spacing.mdSpacing,
	},
	instructionNumberContainer: {
		width: 50,
		height: 50,
		borderRadius: 25,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: colors.black,
		justifyContent: 'center',
		alignItems: 'center',
	},
	timeGuide: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		gap: spacing.smSpacing,
	},
});

export default CreateGroup;
