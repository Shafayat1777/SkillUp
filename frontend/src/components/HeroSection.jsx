import { Link } from "react-router-dom";
import { Player } from '@lottiefiles/react-lottie-player';
const HeroSection = () => {
    return ( 
        < section className = "dark:bg-gray-800 dark:text-gray-100" >
            <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
                <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                    <h1 className="text-5xl font-bold leadi sm:text-6xl">SkillUp <br />
                        <span className="dark:text-violet-400">Start </span>Learning today
                    </h1>
                    <p className="mt-6 mb-8 text-lg sm:mb-12">Dictum aliquam porta in condimentum ac integer
                        {/* <br className="hidden md:inline lg:hidden">turpis pulvinar, est scelerisque ligula sem */}
                    </p>
                    <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                        <Link rel="noopener noreferrer" to="/signup" className="px-8 py-3 text-lg font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Student</Link>
                        <Link rel="noopener noreferrer" to="/signup" className="px-8 py-3 text-lg font-semibold border rounded dark:border-gray-100">Teacher</Link>
                    </div>
                </div>
                <div className="flex items-center justify-center p-6 ">
                    {/* <img src="assets/svg/Business_SVG.svg" alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" /> */}

                    <Player
                        src='https://lottie.host/09ae03e9-fb2b-4126-82ba-19611e3ceae9/hihajacr2n.json'
                        className="player"
                        loop
                        autoplay
                    />

                </div>
            </div>
          </section >
     );
}
 
export default HeroSection;