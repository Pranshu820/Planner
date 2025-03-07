import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import routes from "../../routes";
import MaterialIcons from "../MaterialIcons";
import "./navigation.css";

const Navigation = () => {
	const location = useLocation();
	const [openNavBar, setOpenNavBar] = useState(false);
	useEffect(() => {
		setOpenNavBar(false);
	}, [location.pathname]);
	return (
		<aside className="aside" style={{ width: openNavBar ? "6rem" : 0 }}>
			<div className="aside-bar">
				<nav className="aside-nav">
					<ul className="aside-nav-ul">
						{routes.map((route, index) => (
							<li className="aside-nav-li" key={index}>
								<Link to={route.route}>
									<span>
										<MaterialIcons>
											{route.icon}
										</MaterialIcons>
									</span>
									<span>{route.title}</span>
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
			<button
				onClick={() => setOpenNavBar((prev) => !prev)}
				style={{
					right: openNavBar ? "2rem" : "0",
					width: openNavBar ? "1.5rem" : "4rem",
					animation: openNavBar
						? "none"
						: "oscillate 3s linear infinite",
					boxShadow: openNavBar
						? "none"
						: "var(--shadow-elevation-4dp)",
				}}
				className="aside-button"
			>
				<MaterialIcons>
					{openNavBar ? "chevron_right" : "chevron_left"}
				</MaterialIcons>
			</button>
		</aside>
	);
};

export default Navigation;
