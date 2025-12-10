import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';

const Dashboard = ({ services, sections, stats }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [showServiceModal, setShowServiceModal] = useState(false);

    return (
        <AdminLayout title="Admin Dashboard">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white shadow-lg">
                        <h3 className="text-lg font-semibold mb-2">Total Services</h3>
                        <p className="text-3xl font-bold">{stats?.total_services || 0}</p>
                        <p className="text-blue-100 text-sm mt-2">
                            {stats?.active_services || 0} active services
                        </p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white shadow-lg">
                        <h3 className="text-lg font-semibold mb-2">Website Sections</h3>
                        <p className="text-3xl font-bold">{stats?.total_sections || 0}</p>
                        <p className="text-purple-100 text-sm mt-2">
                            Manage content sections
                        </p>
                    </div>
                    <div className="bg-gradient-to-r from-gray-500 to-gray-600 rounded-lg p-6 text-white shadow-lg">
                        <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
                        <p className="text-lg font-bold">
                            {stats?.recent_activity?.last_service_update || 'No updates'}
                        </p>
                        <p className="text-gray-100 text-sm mt-2">
                            Last service update
                        </p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            {['overview', 'quick_actions'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`py-2 px-1 border-b-2 font-medium text-sm capitalize whitespace-nowrap ${
                                        activeTab === tab
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    {tab.replace('_', ' ')}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="bg-white rounded-lg shadow">
                    {activeTab === 'overview' && <OverviewTab services={services} sections={sections} />}
                    {activeTab === 'quick_actions' && <QuickActionsTab />}
                </div>

                {/* Service Modal */}
                {showServiceModal && (
                    <ServiceModal onClose={() => setShowServiceModal(false)} />
                )}
            </div>
        </AdminLayout>
    );
};

const OverviewTab = ({ services, sections }) => {
    return (
        <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Services */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Services</h3>
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        {services && services.length > 0 ? (
                            <div className="divide-y divide-gray-200">
                                {services.slice(0, 5).map((service) => (
                                    <div key={service.id} className="p-4 hover:bg-gray-50">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                                    <span className="text-white text-sm font-bold">S</span>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{service.title}</div>
                                                    <div className="text-sm text-gray-500 capitalize">{service.category}</div>
                                                </div>
                                            </div>
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                service.is_active
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {service.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center text-gray-500">
                                No services found. Create your first service to get started.
                            </div>
                        )}
                        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                            <Link
                                href="/admin/services"
                                className="text-sm font-medium text-blue-600 hover:text-blue-500"
                            >
                                View all services
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Website Sections */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Website Sections</h3>
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        {sections && Object.keys(sections).length > 0 ? (
                            <div className="divide-y divide-gray-200">
                                {Object.entries(sections).slice(0, 5).map(([page, pageSections]) => (
                                    <div key={page} className="p-4">
                                        <h4 className="text-sm font-medium text-gray-900 capitalize mb-2">{page}</h4>
                                        <div className="space-y-2">
                                            {pageSections.slice(0, 3).map((section) => (
                                                <Link
                                                    key={section.id}
                                                    href={`/admin/sections/${section.slug}`}
                                                    className="flex items-center justify-between text-sm text-gray-600 hover:text-blue-600"
                                                >
                                                    <span className="capitalize">{section.name}</span>
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-8 text-center text-gray-500">
                                No sections configured yet.
                            </div>
                        )}
                        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                            <Link
                                href="/admin/sections/home"
                                className="text-sm font-medium text-blue-600 hover:text-blue-500"
                            >
                                Manage sections
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const QuickActionsTab = () => {
    const quickActions = [
        {
            title: 'Add New Service',
            description: 'Create a new service offering',
            href: '/admin/services',
            icon: '🛠️',
            color: 'from-blue-500 to-blue-600'
        },
        {
            title: 'Edit Home Page',
            description: 'Update hero section and content',
            href: '/admin/home',
            icon: '🏠',
            color: 'from-purple-500 to-purple-600'
        },
        {
            title: 'Upload Media',
            description: 'Add images and documents',
            href: '/admin/uploads',
            icon: '📁',
            color: 'from-green-500 to-green-600'
        },
        {
            title: 'View Analytics',
            description: 'Check website performance',
            href: '/admin/analytics',
            icon: '📊',
            color: 'from-orange-500 to-orange-600'
        }
    ];

    return (
        <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {quickActions.map((action, index) => (
                    <Link
                        key={index}
                        href={action.href}
                        className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 group"
                    >
                        <div className="flex items-center">
                            <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300`}>
                                {action.icon}
                            </div>
                            <div className="ml-4">
                                <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                                    {action.title}
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">
                                    {action.description}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

const ServiceModal = ({ onClose }) => {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        slug: '',
        description: '',
        content: '',
        category: 'web',
        is_active: true
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.services.store'), {
            onSuccess: () => onClose()
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Add New Service</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Service Title</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter service title"
                                />
                                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select
                                    value={data.category}
                                    onChange={e => setData('category', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="web">Web Development</option>
                                    <option value="desktop">Desktop Applications</option>
                                    <option value="mobile">Mobile Applications</option>
                                    <option value="cybersecurity">Cyber Security</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                rows={3}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Brief description of the service"
                            />
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                            <textarea
                                value={data.content}
                                onChange={e => setData('content', e.target.value)}
                                rows={6}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Detailed content about the service"
                            />
                            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content}</p>}
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={data.is_active}
                                onChange={e => setData('is_active', e.target.checked)}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label className="ml-2 text-sm text-gray-700">Active Service</label>
                        </div>

                        <div className="flex justify-end space-x-4 pt-6 border-t">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                {processing ? 'Creating...' : 'Create Service'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
