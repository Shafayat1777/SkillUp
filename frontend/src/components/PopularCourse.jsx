const PopularCourses = () => {
    return ( 
        <section>
            <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
                <header className="text-center">
                    <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                        Most Popular Coures
                    </h2>

                    <p className="max-w-md mx-auto mt-4 text-gray-500">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
                        praesentium cumque iure dicta incidunt est ipsam, officia dolor fugit
                        natus?
                    </p>
                </header>

                <ul className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4">
                    <li className="border-lg shadow-md rounded-lg p-5">
                        <a href="#" className="block overflow-hidden group">
                            <img
                                src="https://images.ctfassets.net/mrop88jh71hl/55rrbZfwMaURHZKAUc5oOW/9e5fe805eb03135b82e962e92169ce6d/python-programming-language.png?w=750&h=750&q=100&fm=png"
                                alt=""
                                className="h-[250px] rounded-lg w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[350px]"
                            />

                            <div className="relative pt-3 bg-white mb-3">
                                <h3
                                    className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4"
                                >
                                    Course Author
                                </h3>

                                <p className="mt-2 mb-2">
                                    <span className="tracking-wider text-gray-900"> Course Title </span>
                                </p>
                                <p className="tracking-wider text-gray-500">
                                    Course Descriptions... Lorem ipsum dolor sit, amet consectetur 
                                </p>
                            </div>
                        </a>
                        <div className="flex justify-center">
                            <div>
                                <a
                                    className="inline-flex items-center gap-2 rounded border border-indigo-600 bg-indigo-600 px-8 py-3 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                                    href="/download"
                                >
                                    <span className="text-sm font-medium"> Enroll Now </span>

                                    <svg
                                        className="h-5 w-5 rtl:rotate-180"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </li>

                    
                </ul>
            </div>
        </section>
     );
}
 
export default PopularCourses;