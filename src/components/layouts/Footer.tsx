import { Container, NavLink } from '@/components'
import NavigationData from '@/data/navigation'

// Footer component
const FooterLayout = (): React.ReactNode => {
    // Destructure the data from the FooterData function
    const { menu, copyright } = NavigationData()

    // Page filter
    const pageFilter = ['Home', 'Skills', 'Articles', 'Uses']

    return (
        <footer className="mt-32">
            <Container.Outer>
                <div className="border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40 relative mx-4 sm:mx-8 lg:mx-12">
                    <Container.Inner className="lg:px-6">
                        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row text-center lg:text-left">
                            <div className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                                {menu
                                    .filter((item) => pageFilter.includes(item.title))
                                    .map((item) => (
                                        <NavLink key={item.link} href={item.link}>
                                            {item.title}
                                        </NavLink>
                                    ))}
                            </div>
                            <p className="text-sm text-zinc-400 dark:text-zinc-500">
                                &copy; {copyright.year} {copyright.text}
                            </p>
                        </div>
                    </Container.Inner>
                </div>
            </Container.Outer>
        </footer>
    )
}

export default FooterLayout
