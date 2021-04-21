import { exportAdmin } from "../../../index";
import * as LocalAdmin from "firebase-admin";
import { ApolloError } from "@apollo/client";

export const tweetRemoveLike = {
	Mutation: {
		async removeLike(_, args) {
			try {
				console.log(args);
				await exportAdmin
					.firestore()
					.collection("tweets")
					.doc(`${args.id}`)
					.update({
						"statistics.likes": LocalAdmin.firestore.FieldValue.increment(-1),
						"statistics.likesList": LocalAdmin.firestore.FieldValue.arrayRemove(args.userHandle),
					});
				const tweetData = await exportAdmin.firestore().doc(`tweets/${args.id}`).get();
				const tweet = tweetData.data();
				tweet.createdAt = tweet.createdAt.toDate().toString();
				return tweet;
			} catch (error) {
				throw new ApolloError(error);
			}
		},
	},
};
