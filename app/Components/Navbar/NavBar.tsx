export const Navbar = ()=>{
    return (
        <>
        <nav className="container p-6 mx-auto lg:flex lg:justify-between lg:items-center">
            <div className="flex items-center justify-between">
                <div>
                    <a className="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300" href="#">Brand</a>
                </div>


                <div className="flex lg:hidden">
                    <button type="button"
                        className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                        aria-label="toggle menu">
                        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                            <path fill-rule="evenodd"
                                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>

            <div className="flex flex-col mt-4 space-y-2 lg:-mx-6 lg:mt-0 lg:flex-row lg:space-y-0">
                <a className="text-gray-700 dark:text-gray-200 lg:px-6 dark:hover:text-blue-400 hover:text-blue-500"
                    href="#">Home</a>
                <a className="text-gray-700 dark:text-gray-200 lg:px-6 dark:hover:text-blue-400 hover:text-blue-500"
                    href="#">Components</a>
                <a className="text-gray-700 dark:text-gray-200 lg:px-6 dark:hover:text-blue-400 hover:text-blue-500"
                    href="#">Pricing</a>
                <a className="text-gray-700 dark:text-gray-200 lg:px-6 dark:hover:text-blue-400 hover:text-blue-500"
                    href="#">Contact</a>
                <a className="text-gray-700 dark:text-gray-200 lg:px-6 dark:hover:text-blue-400 hover:text-blue-500"
                href="#">FAQ</a>
            </div>

            <a className="block h-10 px-5 py-2 mt-4 text-sm text-center text-gray-700 capitalize transition-colors duration-200 transform border rounded-md dark:hover:bg-gray-700 dark:text-white lg:mt-0 hover:bg-gray-100 lg:w-auto"
                href="#">
                Contact Us
            </a>
        </nav>
        </>
    )
}