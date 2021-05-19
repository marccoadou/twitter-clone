import "../../styles/tweet.scss";
import { TweetIndividual } from "./TweetIndividual";
import { CreateComment } from "./CreateComment";

export const TweetReply = () => {
	return (
		<div className="tweet-reply">
			<TweetIndividual />
			<CreateComment />
		</div>
	);
};
