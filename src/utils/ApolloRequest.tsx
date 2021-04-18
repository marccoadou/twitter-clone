import { gql } from "@apollo/client";

export const GET_TWEETS = gql`
	query getUser($userHandle: String!) {
		user(userHandle: $userHandle) {
			tweets {
				id
				text
				createdAt
				user {
					username
					userHandle
				}
				statistics {
					likes
					likesList {
						userHandle
					}
					comments {
						id
						user {
							userHandle
						}
						text
					}
					retweets
					commentsList {
						userHandle
					}
					commentsNbr
				}
			}
		}
	}
`;

export const ADD_TWEET = gql`
	mutation addTweet($text: String!, $userHandle: String!) {
		addTweet(text: $text, userHandle: $userHandle) {
			user {
				userHandle
			}
			text
		}
	}
`;

export const ADD_USER = gql`
	mutation addUser(
		$credentials: CredentialsInput!
		$username: String!
		$userHandle: String!
		$userStats: UserStatsInput!
	) {
		addUser(
			credentials: $credentials
			username: $username
			userHandle: $userHandle
			userStats: $userStats
		) {
			credentials {
				email
				password
			}
			username
			userHandle
			userStats {
				totalLikes
				totalRetweets
				totalComments
			}
		}
	}
`;

export const CHECK_USER = gql`
	query checkUser($email: String!, $password: String!) {
		checkUser(email: $email, password: $password) {
			isValidLogin
			error
			user {
				username
				userHandle
				userStats {
					totalLikes
					totalRetweets
					totalComments
				}
			}
		}
	}
`;
