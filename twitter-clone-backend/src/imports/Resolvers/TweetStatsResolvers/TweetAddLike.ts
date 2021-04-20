import { exportAdmin } from "../../../index";
import * as LocalAdmin from "firebase-admin";
import { ApolloError } from "@apollo/client";

export const tweetAddLike = {
	Mutation: {
		async addLike(_, args) {
			try {
				await exportAdmin
					.firestore()
					.collection("tweets")
					.doc(`${args.id}`)
					.update({
						"statistics.likes": LocalAdmin.firestore.FieldValue.increment(1),
						"statistics.likesList": LocalAdmin.firestore.FieldValue.arrayUnion(args.userHandle),
					});
				const tweet = await exportAdmin.firestore().doc(`tweets/${args.id}`).get();
				return tweet.data();
			} catch (error) {
				throw new ApolloError(error);
			}
		},
	},
};
