import MainHome from "@/components/MainHome";
import Wrapper from "@/layouts/Wrapper";
import React from "react";

export const metadata = {
	title: "WashingTon Laundry - Home",
};

const index = () => {
	return (
		<Wrapper>
			<MainHome />
		</Wrapper>
	);
};

export default index;
