import { ApolloError, ValidationError } from "apollo-server";
import { exportAdmin } from "../../index";
import * as passwordHash from "password-hash";
var uniqid = require("uniqid");

export const UserResolvers = {
	Query: {
		async user(_, args) {
			try {
				const userDoc = await exportAdmin.firestore().doc(`users/${args.userHandle}`).get();
				const user = userDoc.data();
				return user || new ValidationError("User not found");
			} catch (error) {
				throw new ApolloError(error);
			}
		},
		async users() {
			try {
				const users = await exportAdmin.firestore().collection("users").get();
				return users.docs.map((user) => user.data());
			} catch (error) {
				throw new ApolloError(error);
			}
		},
		async checkUser(_, args) {
			console.log(args);
			try {
				const userDoc = await exportAdmin
					.firestore()
					.collection("users")
					.where("credentials.email", "==", args.email)
					.get();
				var user = {
					isValidLogin: false,
					error: "",
					user: userDoc.docs.map((user) => user.data())[0],
				};
				let isValid = passwordHash.verify(args.password, user.user.credentials.password);
				user.isValidLogin = isValid;
				user.error = user.isValidLogin ? "" : "Wrong password or email";
				console.log(user);
				return user;
			} catch (error) {
				throw new ApolloError(error);
			}
		},
	},
	Mutation: {
		async addUser(_, args) {
			try {
				if (args.credentials.password) {
					const hashed = passwordHash.generate(args.credentials.password);
					args.credentials.password = hashed;
				}

				args.id = uniqid();
				const userAdded = await exportAdmin
					.firestore()
					.collection("users")
					.doc(`${args.userHandle}`)
					.set(args)
					.then(async () => {
						const returnUser = await exportAdmin.firestore().doc(`users/${args.userHandle}`).get();
						return returnUser.data();
					});
				return userAdded;
			} catch (error) {
				throw new ApolloError(error);
			}
		},
	},
};
