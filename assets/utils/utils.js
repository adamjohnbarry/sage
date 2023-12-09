// english language
const langEN = {
	auth: {
		initial: {
			title: 'Garden Together.',
			description: 'Organize a gardening group in minutes and work towards your very own harvest.',
		},
		register: {
			title: 'Create Account',
			description: 'Before we get to gardening, we need some basic information about you!',
			photoUploadSuccessful: 'Image successfully uploaded',
		},
		login: {
			title: 'Log In',
			description: 'Log in to schedule a gardening event!',
		},
		joinGroup: {
			title: 'Join Group',
			description: "Now that you're signed up, let's get you in a group.",
		},
		howDoIGetAnInviteWord: {
			title: 'How to get an invite word',
			description:
				'If you are trying to join a group, ask any of the current group members to send you the invite word.\n\nThey can find it by opening Sage, going to the settings page, and tapping the garden settings section.',
		},
	},
	createGroup: {
		createGroup: {
			title: 'Create Group',
			description: 'Create a new garden group and invite your friends!',
			timeGuide: 'This will take 3 minutes or less',
			instructions: [
				{
					description: 'Choose name',
				},
				{
					description: 'Select a garden',
				},
				{
					description: 'Pick a day and time to garden',
				},
				{
					description: 'Invite friends',
				},
			],
		},
		nameGarden: {
			title: 'Name Your Garden',
			description: 'Choose a name for your garden group.',
		},
		chooseLocation: {
			title: 'Choose Location',
			description: 'Select a gardening location for your group.',
			separatorText: 'OR',
			gardens: [
				{
					address: '45 University Ave, PA',
					image:
						'https://hips.hearstapps.com/hmg-prod/images/claude-monets-house-and-gardens-in-giverny-france-news-photo-1042013294-1562610151.jpg?crop=1.00xw:0.753xh;0,0.0671xh&resize=1200:*',
					distance: 5,
					driveTime: 12,
				},
				{
					address: '23 Stanford Way, CA',
					image:
						'https://www.thespruce.com/thmb/IHY_gzo-3Y5terRR2mdPQf0gnSY=/4711x0/filters:no_upscale():max_bytes(150000):strip_icc()/how-to-start-a-garden-from-scratch-2132778-hero-5f6138784a034bad8bf9607ccb18dbed.jpg',
					distance: 1,
					driveTime: 3,
				},
				{
					address: '42 Mulholland Dr, UT',
					image:
						'https://www.bhg.com/thmb/SdH3liapyw5vZZf-LKe_MmgvYuA=/4000x0/filters:no_upscale():strip_icc()/BHG-What-Is-a-Permaculture-Garden-3AWGe3jUq5hAt8vbh3yisf-f3d0c14454b44bf5b319234918574b9e.jpg',
					distance: 3,
					driveTime: 7,
				},
			],
		},
		pickDayAndTime: {
			title: 'Pick Day & Time',
			description: 'Choose the day and time when your group will meet at the garden. You can change this later',
			days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
			times: ['8am-9am', '9am-10am', '10am-11am', '11am-12pm', '12pm-1pm', '1pm-2pm', '3pm-4pm', '5pm-6pm', '7pm-8pm', '8pm-9pm', '9pm-10pm', '10pm-11pm'],
		},
		inviteFriends: {
			title: 'Invite Friends',
			description: 'Search your contacts and choose friends to invite. They will get a text with an invite link.',
		},
		congratulations: {
			title: "Congrats! You're in.",
			oops: 'Oops!',
			loading: 'Loading...',
			registrationError: 'There was an error in registering. Please try again.',
			gardenCreationError: 'There was an error creating your garden. Please try again.',
		},
	},
	learn: {
		learn: {
			title: 'Learn',
		},
	},
	myGarden: {
		default: {
			title: 'My Garden',
			meetsAt: 'Meets at',
			on: 'on',
		},
		attendanceNotification: {
			areYouComing: 'Are you coming this Friday?',
			yes: 'Yes',
			no: 'No',
		},
		sections: {
			attending: 'Attending',
			notAttending: 'Not Attending',
			hasntResponded: "Hasn't Responded",
		},
		groupChat: {
			title: 'Group Chat',
			example: "Let's add some tulips this week...",
			groupChatMessage: "Hey everybody, just checking in to see how you're all doing!",
		},
		chat: {
			attendingMessage: "Hey, how are you getting on? Can't wait to see you this week!",
			notAttendingMessage: "Hey, sorry to hear that you can't make it this week. Is everything ok? We hope to see you at the event next week though!",
			hasntRespondedMessage: 'Hey, just checking in to see how you are doing? Is everything all good?',
		},
		notification: {
			message: 'Message your group members to encourage them to attend this week!',
		},
	},
	settings: {
		settings: {
			title: 'Settings',
		},
		gardenSettings: {
			inviteTextMessage:
				'We would love for you to join our gardening group! We meet weekly on Fridays to work on our garden. Tap this to join us! https://wwww.sage.com/join/',
		},
		accountSettings: {},
		changeLocation: {
			title: 'Change Location',
		},
		changeLanguage: {
			english: {
				name: 'English',
				langCode: 'EN',
			},
			german: {
				name: 'German',
				langCode: 'DE',
			},
		},
		settingsList: [
			{ title: 'Garden Settings' },
			{ title: 'Account Settings' },
			{ title: 'Change Language' },
			{ title: 'Sign Out', message: 'Are you sure you want to sign out?' },
			{ title: 'Delete Account', message: 'Are you sure you want to delete your account?' },
		],
	},
	form: {
		name: {
			label: 'Full Name',
			placeholder: 'Enter your full name',
		},
		email: {
			label: 'Email',
			placeholder: 'Enter your email',
		},
		phoneNumber: {
			label: 'Phone Number',
		},
		passwordRegistration: {
			label: 'Password',
			placeholder: 'Choose password',
		},
		passwordLogin: {
			label: 'Password',
			placeholder: 'Enter your password',
		},
		confirmPassword: {
			label: 'Confirm Password',
			placeholder: 'Confirm your password',
		},
		photo: {
			label: 'Profile Photo',
		},
		takePhoto: {
			label: 'Take Photo',
		},
		chooseFromLibrary: {
			label: 'Choose From Library',
		},
		inviteWord: {
			label: 'Invite Word',
			placeholder: 'Enter an invite word',
			help: 'How do I get an invite word?',
		},
		gardenName: {
			label: 'Garden Name',
			placeholder: 'Enter a garden name',
		},
		privateGarden: {
			label: 'Private Garden',
			placeholder: 'Enter the address of your private garden',
		},
		localGarden: {
			label: 'Local Garden',
		},
		searchContacts: {
			placeholder: 'Search contacts',
		},
		groupMembers: {
			label: 'Group Members',
		},
		changeLanguage: {
			label: 'Language',
		},
		changeLocation: {
			label: 'Change Location',
		},
	},
	button: {
		back: 'Back',
		continue: 'Continue',
		cancel: 'Cancel',
		createAccount: 'Create Account',
		createGroup: 'Create A New Group',
		finish: 'Finish',
		join: 'Join',
		login: 'Log In',
		invites: 'Send Invites',
		skip: 'Skip For Now',
		view: 'View Your Garden',
		home: 'Go Home',
		restart: 'Restart',
		yes: 'Yes',
		save: 'Save',
		deleteAccount: 'Delete Account',
		inviteMembers: 'Invite Members',
		remove: 'Remove',
	},
	error: {
		emailFormat: 'Please enter a properly formatted email.',
		emailInvalidError: 'Please enter a valid email',
		emailOrPasswordIncorrectError: 'Email or password is incorrect.',
		passwordLength: 'Password must be at least 8 characters long.',
		passwordMatching: 'Passwords do not match.',
		passwordEmptyError: 'Password cannot be empty.',
		emailExistsError: 'Email already exists.',
		userRegistration: 'Could not register user.',
		nameEmpty: 'Name cannot be empty.',
		nameUploadError: "Could not update user's name.",
		validPhoneNumber: 'Please enter a valid phone number.',
		numberEmptyError: 'Phone number cannot be empty.',
		phoneNumberUploadError: "Could not update user's number.",
		photoRetrievalError: "Could not retrieve user's photo.",
		photoUploadError: "Could not update user's photo.",
		inviteWordEmptyError: 'Invite word cannot be empty.',
		inviteWordDoesntExistError: 'Invite word does not exist.',
		inviteWordAlreadyExistsError: 'Invite word has already been taken.',
		gardenNameEmpty: 'Garden name cannot be empty.',
		cannotUseSMSError: 'Cannot use SMS on this device.',
	},
};

// german language
const langDE = {
	auth: {
		initial: {
			title: 'Gemeinsam Gärtnern.',
			description: 'Organisiere in Minuten eine Gartengruppe und arbeite auf deine eigene Ernte hin.',
		},
		register: {
			title: 'Konto erstellen',
			description: 'Bevor wir mit dem Gärtnern beginnen, benötigen wir einige grundlegende Informationen von dir!',
			photoUploadSuccessful: 'Bild erfolgreich hochgeladen',
		},
		login: {
			title: 'Einloggen',
			description: 'Melde dich an, um ein Gartenereignis zu planen!',
		},
		joinGroup: {
			title: 'Gruppe beitreten',
			description: 'Jetzt, da du angemeldet bist, bringen wir dich in eine Gruppe.',
		},
		howDoIGetAnInviteWord: {
			title: 'Wie bekomme ich ein Einladungswort',
			description:
				'Wenn du versuchst, einer Gruppe beizutreten, frage einen der aktuellen Gruppenmitglieder nach dem Einladungswort.\n\nSie können es finden, indem sie Sage öffnen, zur Einstellungsseite gehen und den Gartenbereich tippen.',
		},
	},
	createGroup: {
		createGroup: {
			title: 'Gruppe erstellen',
			description: 'Erstelle eine neue Gartengruppe und lade deine Freunde ein!',
			timeGuide: 'Das dauert 3 Minuten oder weniger',
			instructions: [
				{
					description: 'Namen wählen',
				},
				{
					description: 'Garten auswählen',
				},
				{
					description: 'Tag und Uhrzeit zum Gärtnern festlegen',
				},
				{
					description: 'Freunde einladen',
				},
			],
		},
		nameGarden: {
			title: 'Garten benennen',
			description: 'Wähle einen Namen für deine Gartengruppe.',
		},
		chooseLocation: {
			title: 'Ort auswählen',
			description: 'Wähle einen Gartenstandort für deine Gruppe aus.',
			separatorText: 'ODER',
			gardens: [
				{
					address: '45 University Ave, PA',
					image:
						'https://hips.hearstapps.com/hmg-prod/images/claude-monets-house-and-gardens-in-giverny-france-news-photo-1042013294-1562610151.jpg?crop=1.00xw:0.753xh;0,0.0671xh&resize=1200:*',
					distance: 5,
					driveTime: 12,
				},
				{
					address: '23 Stanford Way, CA',
					image:
						'https://www.thespruce.com/thmb/IHY_gzo-3Y5terRR2mdPQf0gnSY=/4711x0/filters:no_upscale():max_bytes(150000):strip_icc()/how-to-start-a-garden-from-scratch-2132778-hero-5f6138784a034bad8bf9607ccb18dbed.jpg',
					distance: 1,
					driveTime: 3,
				},
				{
					address: '42 Mulholland Dr, UT',
					image:
						'https://www.bhg.com/thmb/SdH3liapyw5vZZf-LKe_MmgvYuA=/4000x0/filters:no_upscale():strip_icc()/BHG-What-Is-a-Permaculture-Garden-3AWGe3jUq5hAt8vbh3yisf-f3d0c14454b44bf5b319234918574b9e.jpg',
					distance: 3,
					driveTime: 7,
				},
			],
		},
		pickDayAndTime: {
			title: 'Tag & Uhrzeit wählen',
			description: 'Wähle den Tag und die Uhrzeit, an dem sich deine Gruppe im Garten treffen wird. Du kannst dies später ändern',
			days: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
			times: [
				'8 Uhr - 9 Uhr',
				'9 Uhr - 10 Uhr',
				'10 Uhr - 11 Uhr',
				'11 Uhr - 12 Uhr',
				'12 Uhr - 13 Uhr',
				'13 Uhr - 14 Uhr',
				'15 Uhr - 16 Uhr',
				'17 Uhr - 18 Uhr',
				'19 Uhr - 20 Uhr',
				'20 Uhr - 21 Uhr',
				'21 Uhr - 22 Uhr',
				'22 Uhr - 23 Uhr',
			],
		},
		inviteFriends: {
			title: 'Freunde einladen',
			description: 'Durchsuche deine Kontakte und wähle Freunde aus, die du einladen möchtest. Sie erhalten einen Text mit einem Einladungslink.',
		},
		congratulations: {
			title: 'Herzlichen Glückwunsch! Du bist dabei.',
			oops: 'Hoppla!',
			loading: 'Lädt...',
			registrationError: 'Es gab einen Fehler bei der Anmeldung. Bitte versuche es erneut.',
			gardenCreationError: 'Es gab einen Fehler beim Erstellen deines Gartens. Bitte versuche es erneut.',
		},
	},
	learn: {
		learn: {
			title: 'Lernen',
		},
	},
	myGarden: {
		default: {
			title: 'Mein Garten',
			meetsAt: 'Treffen um',
			on: 'am',
		},
		attendanceNotification: {
			areYouComing: 'Kommst du diesen Freitag?',
			yes: 'Ja',
			no: 'Nein',
		},
		sections: {
			attending: 'Teilnahme',
			notAttending: 'Nicht teilnehmen',
			hasntResponded: 'Hat nicht geantwortet',
		},
		groupChat: {
			title: 'Gruppenchat',
			example: 'Lassen Sie uns diese Woche einige Tulpen hinzufügen...',
			groupChatMessage: 'Hallo zusammen, ich wollte nachsehen, wie es euch allen geht!',
		},
		chat: {
			attendingMessage: 'Hey, wie geht es dir? Ich freue mich darauf, dich diese Woche zu sehen!',
			notAttendingMessage:
				'Hey, es tut mir leid zu hören, dass du es diese Woche nicht schaffen kannst. Ist alles in Ordnung? Wir hoffen, dich nächste Woche bei der Veranstaltung zu sehen!',
			hasntRespondedMessage: 'Hey, ich wollte nur nachsehen, wie es dir geht? Ist alles in Ordnung?',
		},
		notification: {
			message: 'Schreibe deinen Gruppenmitgliedern, um sie zu ermutigen, diese Woche teilzunehmen!',
		},
	},
	settings: {
		settings: {
			title: 'Einstellungen',
		},
		gardenSettings: {
			inviteTextMessage:
				'Wir würden uns freuen, wenn du unserer Garten-Gruppe beitreten würdest! Wir treffen uns wöchentlich freitags, um in unserem Garten zu arbeiten. Tippe hier, um uns beizutreten! https://wwww.sage.com/join/',
		},
		accountSettings: {},
		changeLocation: {
			title: 'Standort ändern',
		},
		changeLanguage: {
			english: {
				name: 'Englisch',
				langCode: 'EN',
			},
			german: {
				name: 'Deutsch',
				langCode: 'DE',
			},
		},
		settingsList: [
			{ title: 'Garteneinstellungen' },
			{ title: 'Kontoeinstellungen' },
			{ title: 'Sprache ändern' },
			{ title: 'Abmelden', message: 'Bist du sicher, dass du dich abmelden möchtest?' },
			{ title: 'Konto löschen', message: 'Bist du sicher, dass du dein Konto löschen möchtest?' },
		],
	},
	form: {
		name: {
			label: 'Vollständiger Name',
			placeholder: 'Gib deinen vollständigen Namen ein',
		},
		email: {
			label: 'E-Mail',
			placeholder: 'Gib deine E-Mail ein',
		},
		phoneNumber: {
			label: 'Telefonnummer',
		},
		passwordRegistration: {
			label: 'Passwort',
			placeholder: 'Wähle ein Passwort',
		},
		passwordLogin: {
			label: 'Passwort',
			placeholder: 'Gib dein Passwort ein',
		},
		confirmPassword: {
			label: 'Passwort bestätigen',
			placeholder: 'Bestätige dein Passwort',
		},
		photo: {
			label: 'Profilfoto',
		},
		takePhoto: {
			label: 'Foto aufnehmen',
		},
		chooseFromLibrary: {
			label: 'Aus der Bibliothek auswählen',
		},
		inviteWord: {
			label: 'Einladungswort',
			placeholder: 'Gib ein Einladungswort ein',
			help: 'Wie bekomme ich ein Einladungswort?',
		},
		gardenName: {
			label: 'Gartenname',
			placeholder: 'Gib einen Gartenname ein',
		},
		privateGarden: {
			label: 'Privater Garten',
			placeholder: 'Gib die Adresse deines privaten Gartens ein',
		},
		localGarden: {
			label: 'Lokaler Garten',
		},
		searchContacts: {
			placeholder: 'Kontakte durchsuchen',
		},
		groupMembers: {
			label: 'Gruppenmitglieder',
		},
		changeLanguage: {
			label: 'Sprache ändern',
		},
		changeLocation: {
			label: 'Standort ändern',
		},
	},
	button: {
		back: 'Zurück',
		continue: 'Weiter',
		cancel: 'Abbrechen',
		createAccount: 'Konto erstellen',
		createGroup: 'Neue Gruppe erstellen',
		finish: 'Fertigstellen',
		join: 'Beitreten',
		login: 'Anmelden',
		invites: 'Einladungen senden',
		skip: 'Jetzt überspringen',
		view: 'Deinen Garten anzeigen',
		home: 'Zur Startseite',
		restart: 'Neustarten',
		yes: 'Ja',
		save: 'Speichern',
		deleteAccount: 'Konto löschen',
		inviteMembers: 'Mitglieder einladen',
		remove: 'Entfernen',
	},
	error: {
		emailFormat: 'Bitte geben Sie eine korrekt formatierte E-Mail-Adresse ein.',
		emailInvalidError: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
		emailOrPasswordIncorrectError: 'E-Mail oder Passwort ist falsch.',
		passwordLength: 'Das Passwort muss mindestens 8 Zeichen lang sein.',
		passwordMatching: 'Die Passwörter stimmen nicht überein.',
		passwordEmptyError: 'Das Passwort darf nicht leer sein.',
		emailExistsError: 'E-Mail existiert bereits.',
		userRegistration: 'Benutzer konnte nicht registriert werden.',
		nameEmpty: 'Der Name darf nicht leer sein.',
		nameUploadError: 'Der Name des Benutzers konnte nicht aktualisiert werden.',
		validPhoneNumber: 'Bitte geben Sie eine gültige Telefonnummer ein.',
		numberEmptyError: 'Die Telefonnummer darf nicht leer sein.',
		phoneNumberUploadError: 'Die Telefonnummer des Benutzers konnte nicht aktualisiert werden.',
		photoRetrievalError: 'Das Foto des Benutzers konnte nicht abgerufen werden.',
		photoUploadError: 'Das Foto des Benutzers konnte nicht aktualisiert werden.',
		inviteWordEmptyError: 'Das Einladungswort darf nicht leer sein.',
		inviteWordDoesntExistError: 'Das Einladungswort existiert nicht.',
		inviteWordAlreadyExistsError: 'Das Einladungswort wurde bereits verwendet.',
		gardenNameEmpty: 'Der Gartenname darf nicht leer sein.',
		cannotUseSMSError: 'SMS kann auf diesem Gerät nicht verwendet werden.',
	},
};

export { langDE, langEN };
