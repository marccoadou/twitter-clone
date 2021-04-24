import { exportAdmin } from "../../../index";
import * as LocalAdmin from "firebase-admin";
import { ApolloError } from "@apollo/client";

export const unfollowUser = {
	Mutation: {
		async unfollowUser(_, args) {
			try {
				const follow = await exportAdmin
					.firestore()
					.collection("users")
					.doc(`${args.userHandle}`)
					.update({
						following: LocalAdmin.firestore.FieldValue.arrayRemove(args.toFollowUserHandle),
					})
					.then(() => {
						return true;
					})
					.catch((error) => {
						return false;
					});
				return follow;
			} catch (error) {
				throw new ApolloError(error);
			}
		},
	},
};
