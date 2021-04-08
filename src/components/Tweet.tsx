import React from "react";
import { Col, Image, Container } from "react-bootstrap";
import DefaultProfilePic from "../img/default_profile_400x400.png";

export const Tweet = () => {
	return (
		<>
			<Container>
				<Col>
					<Image src={DefaultProfilePic} roundedCircle />
				</Col>

				<Col>
					<div>
						<h6>Username</h6>
						<small>userurl</small>
						<small>Apr 5</small>
						<button>dropdown </button>
					</div>
					<div>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam eum
							consequuntur unde. Distinctio aliquid assumenda nesciunt iste ipsa quod
							pariatur, id itaque hic.
						</p>
					</div>
					<div>
						<button>comments icon | number</button>
						<button>retweet icon | number</button>
						<button>like icon | number</button>
						<button>share</button>
					</div>
				</Col>
			</Container>
		</>
	);
};
