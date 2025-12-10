import React from 'react';
import { Head, Link } from '@inertiajs/react';

const MainLayout = ({ children, title }) => {
    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <Navbar />
                <main>{children}</main>
                <Footer />
            </div>
        </>
    );
};

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <nav className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">BN</span>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                ByteNode
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium hover:scale-105">
                            Home
                        </Link>
                        <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium hover:scale-105">
                            About
                        </Link>
                        <Link href="/services" className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium hover:scale-105">
                            Services
                        </Link>
                        <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium hover:scale-105">
                            Contact
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-md">
                        <div className="flex flex-col space-y-4">
                            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">
                                Home
                            </Link>
                            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">
                                About
                            </Link>
                            <Link href="/services" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">
                                Services
                            </Link>
                            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">
                                Contact
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">BN</span>
                            </div>
                            <span className="text-xl font-bold">ByteNode</span>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Transforming ideas into digital reality with cutting-edge technology solutions.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                            <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Connect</h3>
                        <ul className="space-y-2">
                            <li className="text-gray-400">info@ByteNode.com</li>
                            <li className="text-gray-400">+260 760123364</li>
                             <li className="text-gray-400">+260 979710217</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2024 ByteNode. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default MainLayout;
