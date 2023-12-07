import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fontSizes, spacing } from '../theme/theme';
import { useContext } from 'react';
import { LangContext } from '../contexts/contexts';

const InviteMember = ({ photo, name, removeOnPress }) => {
	const lang = useContext(LangContext);

	return (
		<View style={styles.inviteMember}>
			<Image source={{ uri: photo }} style={styles.inviteMemberPhoto} />
			<Text style={styles.inviteMemberName}>{name}</Text>
			<Pressable style={styles.inviteMemberRemoveButton} onPress={removeOnPress}>
				<Text style={styles.inviteMemberRemoveText}>{lang.button.remove}</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	inviteMember: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	inviteMemberPhoto: {
		height: spacing.xlSpacing * 2,
		aspectRatio: 1 / 1,
		borderRadius: spacing.xlSpacing,
	},
	inviteMemberName: {
		fontSize: fontSizes.body,
		paddingLeft: spacing.mdSpacing,
		flexGrow: 1,
	},
	inviteMemberRemoveButton: {
		backgroundColor: colors.errorLight,
		padding: spacing.xsSpacing,
		borderRadius: spacing.borderRadius,
	},
	inviteMemberRemoveText: {
		fontSize: fontSizes.body,
		color: colors.error,
	},
});

export default InviteMember;