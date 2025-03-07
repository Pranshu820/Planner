import React, { useState } from "react";
import wave from "../../images/wave.svg";
import Input, { TextArea } from "../Input/Input";
import Button from "../Button/Button";
import "./footer.css";
import favicon from "../../images/favicon.svg";
import {
	Facebook,
	GitHub,
	Instagram,
	Linkedin,
	Mail,
	Twitter,
} from "react-feather";

const Footer = () => {
	const [userMessage, setUserMessage] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [imgClicked, setImgClicked] = useState(false);
	const c = (x) => Math.cos((Math.PI * x) / 180);
	const s = (x) => Math.sin((Math.PI * x) / 180);
	const pos = (x) => `translate( ${r * c(x)}rem, ${r * s(x)}rem)`;
	const r = 7;
	const socials = [
		{
			username: "@akshatmittal61",
			link: "https://twitter.com/akshatmittal61",
			icon: <Twitter />,
			angle: -90,
		},
		{
			username: "@akshatmittal61",
			link: "https://www.linkedin.com/in/akshatmittal61",
			icon: <Linkedin />,
			angle: -30,
		},
		{
			username: "@akshatmittal61",
			link: "https://www.github.com/akshatmittal61",
			icon: <GitHub />,
			angle: 30,
		},
		{
			username: "@akshatmittal61",
			link: "https://instagram.com/akshatmittal61",
			icon: <Instagram />,
			angle: 90,
		},
		{
			username: "akshatmittal2506@gmail.com",
			link: "mailto:akshatmittal2506@gmail.com",
			icon: <Mail />,
			angle: 150,
		},
		{
			username: "akshatmittal61",
			link: "https://www.facebook.com/akshatmittal61/",
			icon: <Facebook />,
			angle: 210,
		},
	];
	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserMessage((prev) => ({ ...prev, [name]: value }));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(userMessage);
		setUserMessage({
			name: "",
			email: "",
			message: "",
		});
	};
	const handleReset = (e) => {
		e.preventDefault();
		setUserMessage({
			name: "",
			email: "",
			message: "",
		});
	};
	return (
		<footer className="footer" style={{ backgroundImage: `url(${wave})` }}>
			<div className="footer-left">
				<div className="footer-left-container">
					<img
						className="footer-left-logo"
						src={favicon}
						alt="Planner favicon"
						style={{
							width: `${r + 2}rem`,
							height: `${r + 2}rem`,
							animation: imgClicked
								? "none"
								: "zoom 1.5s linear infinite",
						}}
						onClick={() => setImgClicked((prev) => !prev)}
					/>
					<div className="footer-left-socials">
						{socials.map((social, index) => (
							<a
								href={social.link}
								key={index}
								className="footer-left-social"
								title={social.username}
								style={{
									transform: imgClicked && pos(social.angle),
								}}
								target="_blank"
								rel="noreferrer"
							>
								{social.icon}
							</a>
						))}
					</div>
				</div>
			</div>
			<div className="footer-right">
				<div className="footer-right-feedback">
					<h2>Contact Us</h2>
					<form
						className="footer-right-form"
						onReset={handleReset}
						onSubmit={handleSubmit}
					>
						<Input
							type="text"
							name="name"
							required
							placeholder="Enter Your Name"
							icon="person"
							value={userMessage.name}
							onChange={handleChange}
						/>
						<Input
							type="email"
							name="email"
							required
							placeholder="Enter Your Email"
							icon="mail"
							value={userMessage.email}
							onChange={handleChange}
						/>
						<TextArea
							type="text"
							name="message"
							required
							placeholder="Your Message Here"
							icon="chat"
							value={userMessage.message}
							onChange={handleChange}
							rows={5}
						/>
						<div className="form-group">
							<Button
								text="Cancel"
								type="reset"
								variant="outline"
								color="indigo"
							/>
							<Button
								text="Submit"
								type="submit"
								variant="fill"
								color="indigo"
							/>
						</div>
					</form>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
