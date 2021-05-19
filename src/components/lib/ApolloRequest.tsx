import { gql } from "@apollo/client";

export const GET_USER_INFO = gql`
	query getUser($userHandle: String!) {
		user(userHandle: $userHandle) {
			id
			username
			userHandle
			credentials {
				email
				password
			}
			userStats {
				totalLikes
				totalRetweets
				totalComments
			}
			following
			tweets {
				id
				userHandle
				text
				createdAt
				user {
					username
					userHandle
					following
				}
				statistics {
					likes
					likesList
					comments {
						id
						user {
							userHandle
						}
						text
					}
					retweets
					commentsList
					commentsNbr
				}
			}
		}
	}
`;

export const FOLLOW = gql`
	mutation followUser($userHandle: String!, $toFollowUserHandle: String!) {
		followUser(userHandle: $userHandle, toFollowUserHandle: $toFollowUserHandle)
	}
`;
export const UNFOLLOW = gql`
	mutation unfollowUser($userHandle: String!, $toFollowUserHandle: String!) {
		unfollowUser(userHandle: $userHandle, toFollowUserHandle: $toFollowUserHandle)
	}
`;
export const ADD_TWEET = gql`
	mutation addTweet($text: String!, $userHandle: String!) {
		addTweet(text: $text, userHandle: $userHandle) {
			id
			user {
				userHandle
			}
			text
		}
	}
`;

export const GET_TWEET = gql`
	query getTweet($id: ID!) {
		tweet(id: $id) {
			id
			userHandle
			text
			createdAt
			user {
				username
				userHandle
			}
			statistics {
				likes
				likesList
				retweets
				commentsList
				comments {
					id
					text
					userHandle
					user {
						username
					}
					createdAt
					statistics {
						likes
						likesList
						retweets
						commentsList
					}
				}
				commentsNbr
			}
		}
	}
`;

export const ADD_LIKE = gql`
	mutation addLike($userHandle: String!, $id: String!) {
		addLike(userHandle: $userHandle, id: $id) {
			id
			userHandle
			text
			createdAt
			user {
				username
				userHandle
			}
			statistics {
				likes
				likesList
				comments {
					id
					user {
						userHandle
					}
					text
				}
				retweets
				commentsList
				commentsNbr
			}
		}
	}
`;
export const REMOVE_LIKE = gql`
	mutation removeLike($userHandle: String!, $id: String!) {
		removeLike(userHandle: $userHandle, id: $id) {
			id
			userHandle
			text
			createdAt
			user {
				username
				userHandle
			}
			statistics {
				likes
				likesList
				comments {
					id
					user {
						userHandle
					}
					text
				}
				retweets
				commentsList
				commentsNbr
			}
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

export const USER_FEED = gql`
	query userFeed($following: [String]!) {
		userFeed(following: $following) {
			id
			userHandle
			text
			createdAt
			user {
				id
				username
				userHandle
			}
			statistics {
				likes
				likesList
				comments {
					id
					user {
						userHandle
					}
					text
				}
				retweets
				commentsList
				commentsNbr
			}
		}
	}
`;

export const ADD_COMMENT = gql`
	mutation addComment($text: String!, $userHandle: String!, $tweetID: String!) {
		addComment(text: $text, userHandle: $userHandle, tweetID: $tweetID) {
			id
			userHandle
			text
			createdAt
			user {
				id
				username
			}
			statistics {
				likes
				likesList
				comments {
					id
					user {
						userHandle
					}
					text
				}
				retweets
				commentsList
				commentsNbr
			}
		}
	}
`;
