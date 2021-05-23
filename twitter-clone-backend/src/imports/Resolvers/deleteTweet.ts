import { ApolloError } from "apollo-server-errors";
import { exportAdmin } from "../..";

export const deleteTweet = {
	Mutation: {
		async deleteTweet(_, args) {
			try {
				const deleted = await exportAdmin
					.firestore()
					.doc(`tweets/${args.id}`)
					.delete()
					.then(() => true)
					.catch((error) => false);
				return deleted;
			} catch (error) {
				throw new ApolloError(error);
			}
		},
	},
};
