
import HeroSection from "./components/HeroSection";
import ExperienceCard from "./components/ExperienceCard";
import ProfileCard from "./components/ProfileCard";
import SkillsCard from "./components/SkillsCard";

export default function userPage() {
    return (
        <div>
            <HeroSection />
            <ExperienceCard />
            <ProfileCard />
            <SkillsCard />
        </div>
    )
}