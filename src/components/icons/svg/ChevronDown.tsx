import React from "react";

// Chevron down SVG icon
const ChevronDownSvgIcon = (rest: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg viewBox="0 0 8 6" aria-hidden="true" {...rest}>
			<path d="M1.75 1.75 4 4.25l2.25-2.5" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
};

export default ChevronDownSvgIcon;
