import NavBarHome from '../components/NavBarHome'
import BottomFooter from '../components/BottomFooter'
import Hero from '../components/Hero'
import HomeDemoShowcase from '../components/HomeDemoShowcase'
import HomeFeatures from '../components/HomeFeatures'
import Workflow from '../components/Workflow'


function Home() {
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 tech-bg">
            <NavBarHome></NavBarHome>
            <main>
                <Hero></Hero>
                <HomeDemoShowcase></HomeDemoShowcase>
                <HomeFeatures></HomeFeatures>
                <Workflow></Workflow>
                
            </main>
            
            <BottomFooter></BottomFooter>

        </div>
    )
}

export default Home
