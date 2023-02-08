import Image from "next/image";
import MainButton from "../button/Main";
import ArrowDownSvgIcon from "../icons/svg/ArrowDown";
import BriefcaseSvgIcon from "../icons/svg/Briefcase";

/**
 * @description Render the resume layout
 * @param {Object} props
 * @returns Resume layout
 */
const Resume = (props) => {
	const { data } = props;

	return (
		<div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
			<h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
				<BriefcaseSvgIcon className="h-6 w-6 flex-none" />
				<span className="ml-3">Work</span>
			</h2>
			<ol className="mt-6 space-y-4">
				{data?.work?.map((role, index) => (
					<li key={index} className="flex gap-4">
						<div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 rounded-full">
							{role.logo ? (
								<Image src={role.logo} alt="" className="h-7 w-7 rounded-full" unoptimized />
							) : (
								<BriefcaseSvgIcon className="h-6 w-6 text-white" />
							)}
						</div>
						<dl className="flex flex-auto flex-wrap gap-x-2">
							<dt className="sr-only">Company</dt>
							<dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">{role.company}</dd>
							<dt className="sr-only">Role</dt>
							<dd className="text-xs text-zinc-500 dark:text-zinc-400">{role.title}</dd>
							<dt className="sr-only">Date</dt>
							<dd
								className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
								aria-label={`${role.start.label ?? role.start} until ${role.end.label ?? role.end}`}
							>
								<time dateTime={role.start.dateTime ?? role.start}>{role.start.label ?? role.start}</time>{" "}
								<span aria-hidden="true">—</span>{" "}
								<time dateTime={role.end.dateTime ?? role.end}>{role.end.label ?? role.end}</time>
							</dd>
						</dl>
					</li>
				))}
			</ol>

			<MainButton href={data?.file || "#"} variant="secondary" className="group mt-6 w-full">
				Download CV
				<ArrowDownSvgIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
			</MainButton>
		</div>
	);
};

export default Resume;
