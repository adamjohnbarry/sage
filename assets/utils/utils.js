// english language
const langEN = {
	auth: {
		intial: {
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
				'If you are trying to join a group, ask any of the current group members to send you the invite word.\n\nThey can find it by opening Sage and tapping the settings icon as shown below.',
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
			description: 'Select a gardening location for your group. Allow Sage to access your location so we can find some gardens in your area.',
			gardens: [
				{
					name: 'Little House Garden',
					image:
						'https://hips.hearstapps.com/hmg-prod/images/claude-monets-house-and-gardens-in-giverny-france-news-photo-1042013294-1562610151.jpg?crop=1.00xw:0.753xh;0,0.0671xh&resize=1200:*',
					distance: 5,
					driveTime: 12,
				},
				{
					name: "Jeremy's Garden",
					image:
						'https://www.thespruce.com/thmb/IHY_gzo-3Y5terRR2mdPQf0gnSY=/4711x0/filters:no_upscale():max_bytes(150000):strip_icc()/how-to-start-a-garden-from-scratch-2132778-hero-5f6138784a034bad8bf9607ccb18dbed.jpg',
					distance: 1,
					driveTime: 3,
				},
				{
					name: "Adam's Garden",
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
		},
	},
	learn: {
		learn: {
			title: 'Learn',
		},
	},
	myGarden: {
		chat: {
			textMessage:
				'We would love for you to join our gardening group! We meet weekly on Fridays to work on our garden. Tap this to join us! https://wwww.sage.com/join/',
		},
	},
	settings: {
		settings: {
			title: 'Settings',
		},
		accountSettings: {},
		gardenSettings: {},
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
			placeholder: 'Search garden names or locations',
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
	},
	button: {
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
		yes: 'Yes',
		save: 'Save',
		deleteAccount: 'Delete Account',
	},
	error: {
		emailFormat: 'Please enter a properly formatted email.',
		passwordLength: 'Password must be at least 8 characters long.',
		passwordMatching: 'Passwords do not match.',
		userRegistration: 'Could not register user.',
		nameEmpty: 'Name cannot be empty.',
		nameUploadError: "Could not update user's name.",
		validPhoneNumber: 'Please enter a valid phone number.',
		phoneNumberUploadError: "Could not update user's number.",
		photoUploadError: "Could not update user's photo.",
		inviteWordLengthError: 'Invite word cannot be empty.',
		inviteWordExists: 'Invite word does not exist.',
	},
};

export { langEN };
