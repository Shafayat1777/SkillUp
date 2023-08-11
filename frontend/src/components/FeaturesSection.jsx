const Features = () => {
    return ( 
        <div className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                <div>
                    <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                        Brand new
                    </p>
                </div>
                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                    <span className="relative inline-block">
                        <svg
                            viewBox="0 0 52 24"
                            fill="currentColor"
                            className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                        >
                            <defs>
                                <pattern
                                    id="18302e52-9e2a-4c8e-9550-0cbb21b38e55"
                                    x="0"
                                    y="0"
                                    width=".135"
                                    height=".30"
                                >
                                    <circle cx="1" cy="1" r=".7" />
                                </pattern>
                            </defs>
                            <rect
                                fill="url(#18302e52-9e2a-4c8e-9550-0cbb21b38e55)"
                                width="52"
                                height="24"
                            />
                        </svg>
                        <span className="relative">The</span>
                    </span>{' '}
                    quick, brown fox jumps over a lazy dog
                </h2>
                <p className="text-base text-gray-700 md:text-lg">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                    accusantium doloremque rem aperiam, eaque ipsa quae.
                </p>
            </div>
            {/* <div className="grid gap-4 row-gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col justify-between p-5 border rounded shadow-sm">
                    <div>
                        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
                            <svg
                                className="w-12 h-12 text-deep-purple-accent-400"
                                stroke="currentColor"
                                viewBox="0 0 52 52"
                            >
                                <polygon
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    fill="none"
                                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                                />
                            </svg>
                        </div>
                        <h6 className="mb-2 font-semibold leading-5">Skilled Instructors</h6>
                        <p className="mb-3 text-sm text-gray-900">
                            A flower in my garden, a mystery in my panties. Heart attack never
                            stopped old Big Bear.
                        </p>
                    </div>
                    <a
                        href="/"
                        aria-label=""
                        className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                    >
                        Learn more
                    </a>
                </div>
                <div className="flex flex-col justify-between p-5 border rounded shadow-sm">
                    <div>
                        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
                            <svg
                                className="w-12 h-12 text-deep-purple-accent-400"
                                stroke="currentColor"
                                viewBox="0 0 52 52"
                            >
                                <polygon
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    fill="none"
                                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                                />
                            </svg>
                        </div>
                        <h6 className="mb-2 font-semibold leading-5">When has justice</h6>
                        <p className="mb-3 text-sm text-gray-900">
                            Rough pomfret lemon shark plownose chimaera southern sandfish
                            kokanee northern sea.
                        </p>
                    </div>
                    <a
                        href="/"
                        aria-label=""
                        className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                    >
                        Learn more
                    </a>
                </div>
                <div className="flex flex-col justify-between p-5 border rounded shadow-sm">
                    <div>
                        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
                            <svg
                                className="w-12 h-12 text-deep-purple-accent-400"
                                stroke="currentColor"
                                viewBox="0 0 52 52"
                            >
                                <polygon
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    fill="none"
                                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                                />
                            </svg>
                        </div>
                        <h6 className="mb-2 font-semibold leading-5">Organically grow</h6>
                        <p className="mb-3 text-sm text-gray-900">
                            A slice of heaven. O for awesome, this chocka full cuzzie is as
                            rip-off as a cracker.
                        </p>
                    </div>
                    <a
                        href="/"
                        aria-label=""
                        className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                    >
                        Learn more
                    </a>
                </div>
                <div className="flex flex-col justify-between p-5 border rounded shadow-sm">
                    <div>
                        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
                            <svg
                                className="w-12 h-12 text-deep-purple-accent-400"
                                stroke="currentColor"
                                viewBox="0 0 52 52"
                            >
                                <polygon
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    fill="none"
                                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                                />
                            </svg>
                        </div>
                        <h6 className="mb-2 font-semibold leading-5">A slice of heaven</h6>
                        <p className="mb-3 text-sm text-gray-900">
                            Disrupt inspire and think tank, social entrepreneur but
                            preliminary thinking think tank compelling.
                        </p>
                    </div>
                    <a
                        href="/"
                        aria-label=""
                        className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                    >
                        Learn more
                    </a>
                </div>
            </div> */}

            {/* Card Sections */}

            <div className="grid  grid-cols-2 md:grid-cols-4 gap-4 ms-5 mt-5 justify-center p-3 text-center">

                {/* Card 1 */}
                <div class=" p-6 shadow bg-white border  border-gray-200 rounded-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-orange-400 duration-500  ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20 text-blue-400 m-auto">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                    </svg>

                    <h2 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">Skilled Instructors</h2>
                    <p class="mb-3 font-normal  text-gray-600 dark:text-gray-600 ">Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                </div>
                {/* Card 2 */}
                <div class=" p-6 shadow bg-white border  border-gray-200 rounded-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-orange-400 duration-500  ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20 text-blue-400 m-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>


                    <h2 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">Online Classes</h2>
                    <p class="mb-3 font-normal  text-gray-600 dark:text-gray-600 ">Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                </div>
                {/* Card 3 */}
                <div class=" p-6 shadow bg-white border  border-gray-200 rounded-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-orange-400 duration-500  ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20 text-blue-400 m-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>

                    <h2 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">Home Projects</h2>
                    <p class="mb-3 font-normal  text-gray-600 dark:text-gray-600 ">Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                </div>
                {/* Card 4 */}
                <div class=" p-6 shadow bg-white border  border-gray-200 rounded-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-orange-400 duration-500  ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20 text-blue-400 m-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />

                    </svg>


                    <h2 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">Book Library</h2>
                    <p class="mb-3 font-normal text-gray-600 dark:text-gray-600 ">Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                </div>
            </div>
        </div>
     );
}
 
export default Features;