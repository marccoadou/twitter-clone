import { exportAdmin } from "../../../index";
import * as LocalAdmin from "firebase-admin";
import { ApolloError } from "@apollo/client";

export const follow = {
	Mutation: {
		async follow(_: any, args: { userHandle: string; toFollowUserHandle: string }) {
			try {
				const following = await exportAdmin
					.firestore()
					.collection("users")
					.doc(`${args.userHandle}`)
					.update({
						following: LocalAdmin.firestore.FieldValue.arrayUnion(args.toFollowUserHandle),
					})
					.then((e) => {
						console.log(e);
						return true;
					})
					.catch(() => {
						return false;
					});
				return following;
			} catch (error) {
				throw new ApolloError(error);
			}
		},
	},
};
