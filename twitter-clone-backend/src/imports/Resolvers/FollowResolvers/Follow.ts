import { exportAdmin } from "../../../index";
import * as LocalAdmin from "firebase-admin";
import { ApolloError } from "@apollo/client";

export const followUser = {
	Mutation: {
		async followUser(_, args) {
			try {
				console.log(args.userHandle);
				const following = await exportAdmin
					.firestore()
					.collection("users")
					.doc(`${args.userHandle}`)
					.update({
						following: LocalAdmin.firestore.FieldValue.arrayUnion(args.toFollowUserHandle),
					})
					.then(() => {
						return true;
					})
					.catch((error) => {
						return false;
					});
				return following;
			} catch (error) {
				throw new ApolloError(error);
			}
		},
	},
};
