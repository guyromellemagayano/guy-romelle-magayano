// Create a custom 404 page
import Seo from '@/components/Seo'
import SimpleLayout from '@/components/layouts/Simple'
import NotFoundPageData from '@/data/404'

// 404 page
const NotFoundPage = (): React.ReactNode => {
    // Destructure the data from the NotFoundPageData function
    const { meta, hero } = NotFoundPageData()

    return (
        <>
            <Seo meta={meta} />

            <SimpleLayout title={hero.heading} intro={hero.description} />
        </>
    )
}

export default NotFoundPage
