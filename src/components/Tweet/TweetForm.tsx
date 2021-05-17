import React from "react";
import { Button, Form, Image } from "react-bootstrap";

interface Props {
	DefaultUserIcon: string;
	handleTweetAdd: any;
	tweetText: string;
	tweetLength: number;
	handleTweetLength: any;
}
export const TweetForm: React.FC<Props> = ({
	handleTweetAdd,
	handleTweetLength,
	DefaultUserIcon,
	tweetText,
	tweetLength,
}) => {
	return (
		<>
			<div className="divider-h"></div>
			<div className="create-tweet">
				<Image
					width={40}
					height={40}
					className="mr-3"
					src={DefaultUserIcon}
					alt="Generic placeholder"
					roundedCircle
				/>
				<Button onClick={handleTweetAdd} disabled={tweetLength > 0 ? false : true}>
					Submit
				</Button>
				<Form name="addTweet" className="input-form" onSubmit={handleTweetAdd}>
					<Form.Group controlId="exampleForm.ControlTextarea1">
						<Form.Control
							as="textarea"
							name="tweet"
							rows={4}
							style={{
								backgroundColor: "rgb(0, 0, 0)",
								border: "none",
								color: "white",
								resize: "none",
								width: "100%",
							}}
							maxLength={280}
							value={tweetText}
							onChange={handleTweetLength}
							placeholder="What's popping?"
						/>
					</Form.Group>
					<div className="divider-h"></div>
					<div className="optional-icons">
						<a href="">
							<i className="fas fa-image"></i>
						</a>
						<a href="">
							<i className="fas fa-poll-h"></i>
						</a>
						<a href="">
							<i className="far fa-laugh-beam"></i>
						</a>
						<p>{tweetLength} / 280</p>
					</div>
				</Form>
			</div>
		</>
	);
};
