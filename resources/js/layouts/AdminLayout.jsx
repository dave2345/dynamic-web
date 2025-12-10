import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

const AdminLayout = ({ children, title }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { url } = usePage();
    const {flash} = usePage().props;
    const navigation = [
        {
            name: 'Dashboard',
            href: '/admin/dashboard',
            icon: '📊',
            current: url === '/admin/dashboard',
        },
        {
            name: 'Home',
            href: '/admin/home',
            icon: '📝',
            current: url.startsWith('/admin/home'),
        },
        {
            name: 'Services',
            href: '/admin/services',
            icon: '🛠️',
            current: url.startsWith('/admin/services'),
        },
        {
            name: 'About',
            href: '/admin/about',
            icon: '📝',
            current: url.startsWith('/admin/about'),
        },
        {
            name: 'Contact',
            href: '/admin/contact',
            icon: '📝',
            current: url.startsWith('/admin/contact'),
        },
        {
            name: 'Media',
            href: '/admin/uploads',
            icon: '🖼️',
            current: url.startsWith('/admin/uploads'),
        },
        {
            name: 'Analytics',
            href: '/admin/analytics',
            icon: '📈',
            current: url === '/admin/analytics',
        },
    ];

    const secondaryNavigation = [
        { name: 'Website', href: '/', icon: '🌐', external: true },
        {
            name: 'Settings',
            href: '/admin/settings',
            icon: '⚙️',
            current: url === '/admin/settings',
        },
    ];

    return (
        <>
            <Head title={title} />

            <div className="min-h-screen bg-gray-50">
                {/* Sidebar for mobile */}
                {sidebarOpen && (
                    <div className="fixed inset-0 z-40 flex md:hidden">
                        <div
                            className="bg-opacity-75 fixed inset-0 bg-gray-600"
                            onClick={() => setSidebarOpen(false)}
                        ></div>

                        <div className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-900">
                            <div className="absolute top-0 right-0 -mr-12 pt-2">
                                <button
                                    type="button"
                                    className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset"
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <span className="sr-only">
                                        Close sidebar
                                    </span>
                                    <svg
                                        className="h-6 w-6 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                                <div className="flex flex-shrink-0 items-center px-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                                            <span className="text-sm font-bold text-white">
                                                D
                                            </span>
                                        </div>
                                        <span className="text-xl font-bold text-white">
                                            ByteNode
                                        </span>
                                    </div>
                                </div>
                                <nav className="mt-5 space-y-1 px-2">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`group flex items-center rounded-md px-2 py-2 text-base font-medium ${
                                                item.current
                                                    ? 'bg-gray-800 text-white'
                                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                            }`}
                                        >
                                            <span className="mr-4 text-lg">
                                                {item.icon}
                                            </span>
                                            {item.name}
                                        </Link>
                                    ))}
                                </nav>
                            </div>

                            <div className="flex flex-shrink-0 border-t border-gray-700 p-4">
                                <nav className="flex-1 space-y-1">
                                    {secondaryNavigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                                                item.current
                                                    ? 'bg-gray-800 text-white'
                                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                            }`}
                                        >
                                            <span className="mr-3 text-lg">
                                                {item.icon}
                                            </span>
                                            {item.name}
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </div>
                )}

                {/* Static sidebar for desktop */}
                <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
                    <div className="flex min-h-0 flex-1 flex-col bg-gray-900">
                        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                            <div className="flex flex-shrink-0 items-center px-4">
                                <div className="flex items-center space-x-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                                        <span className="text-sm font-bold text-white">
                                            D
                                        </span>
                                    </div>
                                    <span className="text-xl font-bold text-white">
                                        ByteNode
                                    </span>
                                </div>
                            </div>
                            <nav className="mt-5 flex-1 space-y-1 px-2">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                                            item.current
                                                ? 'bg-gray-800 text-white'
                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                        }`}
                                    >
                                        <span className="mr-3 text-lg">
                                            {item.icon}
                                        </span>
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                        <div className="flex flex-shrink-0 border-t border-gray-700 p-4">
                            <nav className="flex-1 space-y-1">
                                {secondaryNavigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`group flex items-center rounded-md px-2 py-2 text-sm font-medium ${
                                            item.current
                                                ? 'bg-gray-800 text-white'
                                                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                        }`}
                                    >
                                        <span className="mr-3 text-lg">
                                            {item.icon}
                                        </span>
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="flex flex-1 flex-col md:pl-64">
                    {flash.success && (
                        <SuccessToast
                            title="Success!"
                            message={flash.success}
                        />
                    )}

                    {flash.error && (
                        <ErrorToast title="Error!" message={flash.error} />
                    )}

                    {/* Top bar */}
                    <div className="sticky top-0 z-10 bg-gray-100 pt-1 pl-1 sm:pt-3 sm:pl-3 md:hidden">
                        <button
                            type="button"
                            className="-mt-0.5 -ml-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-inset"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>

                    <main className="flex-1">
                        {/* Page content */}
                        <div className="mx-auto max-w-7xl px-8">
                            {/* Page header */}
                            <div className="mx-auto max-w-7xl">
                                <div className="md:flex md:items-center md:justify-between">
                                    <div className="min-w-0 flex-1">
                                        <h1 className="py-6 text-2xl font-bold text-gray-900 sm:truncate sm:text-3xl">
                                            {title}
                                        </h1>
                                    </div>
                                    <div className="mt-4 flex md:mt-0 md:ml-4">
                                        <Link
                                            href="/"
                                            className="ml-3 inline-flex items-center rounded-md border border-transparent bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                        >
                                            View Website
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default AdminLayout;
