import HeroSection from "./components/HeroSection";
import ExperienceCard from "./components/ExperienceCard";
import ProfileCard from "./components/ProfileCard";
import SkillsCard from "./components/SkillsCard";
import PortfolioCard from "./components/PortfolioCard";

export default function userPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <HeroSection />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                <ProfileCard />
                <SkillsCard />
                <ExperienceCard />
                <PortfolioCard />
            </div>
        </div>
    )
}