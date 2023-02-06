import Article from "@/components/Article";
import Container from "@/components/Container";
import Newsletter from "@/components/layouts/Newsletter";
import Photos from "@/components/layouts/Photos";
import Resume from "@/components/layouts/Resume";
import SocialLink from "@/components/links/Social";
import HomeData from "@/data/home";
import socialLinksData from "@/data/socialLinks";
import workExperiencesData from "@/data/workExperiences";
import { generateRssFeed } from "@/lib/generateRssFeed";
import { getAllArticles } from "@/lib/getAllArticles";
import Head from "next/head";

/**
 * @description Render the home page
 * @param {Object} props
 * @returns Home page
 */
const Home = (props) => {
	const { articles } = props;

	// Destructure the data from the HomeData function
	const { meta, hero, slidePhotos } = HomeData();

	return (
		<>
			<Head>
				<title>{meta.title}</title>
				<meta name="description" content={meta.description} />
				<meta name="keywords" content={meta.keywords} />
			</Head>

			<Container id="hero" className="mt-9">
				<div className="max-w-2xl">
					<h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
						{hero.heading}
					</h1>
					<p className="mt-6 text-base space-y-7 text-zinc-600 dark:text-zinc-400">
						{hero.description.map((paragraph, index) => {
							return (
								<span key={index} className="space-y-7">
									{paragraph}
								</span>
							);
						})}
					</p>
					<div className="mt-6 flex gap-6">
						{socialLinksData.map((link) => {
							return <SocialLink key={link.url} {...link} />;
						})}
					</div>
				</div>
			</Container>

			<Photos data={slidePhotos} />

			<Container className="mt-24 md:mt-28">
				<div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
					<div className="flex flex-col gap-16">
						{articles?.map((article) => (
							<Article key={article.slug} article={article} />
						))}
					</div>
					<div className="space-y-10 lg:pl-16 xl:pl-24">
						<Newsletter />
						<Resume data={workExperiencesData} />
					</div>
				</div>
			</Container>
		</>
	);
};

export async function getStaticProps() {
	if (process.env.NODE_ENV === "production") {
		await generateRssFeed();
	}

	return {
		props: {
			articles: (await getAllArticles()).slice(0, 4).map(({ component, ...meta }) => meta)
		}
	};
}

export default Home;
