import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { ErrorToast, SuccessToast } from '../../../components/notification';
import AdminLayout from '../../../layouts/AdminLayout';

const ServicesIndex = ({ services }) => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const { delete: destroy } = useForm();

    const handleDelete = (service) => {
        (router.distroy('admin.services.destroy', service.id),
            {
                onSuccess: () => setDeleteConfirm(null),
                preserveScroll: true,
            });
    };

    const categories = {
        web: 'Web Development',
        desktop: 'Desktop Applications',
        mobile: 'Mobile Applications',
        cybersecurity: 'Cyber Security',
        other: 'Other Services',
    };

    const getCategoryColor = (category) => {
        const colors = {
            web: 'bg-blue-100 text-blue-800',
            desktop: 'bg-purple-100 text-purple-800',
            mobile: 'bg-green-100 text-green-800',
            cybersecurity: 'bg-red-100 text-red-800',
            other: 'bg-gray-100 text-gray-800',
        };
        return colors[category] || colors.other;
    };
    return (
        <AdminLayout title="Manage Services - Dave-Tech">
            <Head title="Manage Services" />
            <SuccessToast
                title="Success!"
                message="Everything saved correctly."
            />

            <ErrorToast title="Error!" message="Something went wrong." />
            <div className="py-6">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-600">
                                Create, edit, and manage your service offerings
                            </p>
                        </div>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="flex transform items-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        >
                            <svg
                                className="mr-2 h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            Add New Service
                        </button>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="rounded-lg border border-gray-200 bg-white shadow">
                    {services && services.length > 0 ? (
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Service
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Category
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Order
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {services.map((service) => (
                                        <tr
                                            key={service.id}
                                            className="transition-colors duration-200 hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
                                                        <span className="text-sm font-bold text-white">
                                                            {service.icon ||
                                                                '🛠️'}
                                                        </span>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {service.title}
                                                        </div>
                                                        <div className="max-w-xs truncate text-sm text-gray-500">
                                                            {
                                                                service.description
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryColor(service.category)}`}
                                                >
                                                    {categories[
                                                        service.category
                                                    ] || service.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                        service.is_active
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-red-100 text-red-800'
                                                    }`}
                                                >
                                                    {service.is_active
                                                        ? 'Active'
                                                        : 'Inactive'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                                {service.order}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                                <div className="flex items-center space-x-3">
                                                    <button
                                                        onClick={() =>
                                                            setEditingService(
                                                                service,
                                                            )
                                                        }
                                                        className="text-blue-600 transition-colors duration-200 hover:text-blue-900"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            setDeleteConfirm(
                                                                service,
                                                            )
                                                        }
                                                        className="text-red-600 transition-colors duration-200 hover:text-red-900"
                                                    >
                                                        Delete
                                                    </button>
                                                    <Link
                                                        href={`/services/${service.slug}`}
                                                        target="_blank"
                                                        className="text-gray-600 transition-colors duration-200 hover:text-gray-900"
                                                    >
                                                        View
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="py-12 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                <svg
                                    className="h-8 w-8 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-lg font-medium text-gray-900">
                                No services yet
                            </h3>
                            <p className="mb-4 text-gray-500">
                                Get started by creating your first service.
                            </p>
                            <button
                                onClick={() => setShowCreateModal(true)}
                                className="transform rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            >
                                Create Service
                            </button>
                        </div>
                    )}
                </div>

                {/* Stats Footer */}
                {services && services.length > 0 && (
                    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow">
                            <div className="text-2xl font-bold text-gray-900">
                                {services.length}
                            </div>
                            <div className="text-sm text-gray-500">
                                Total Services
                            </div>
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow">
                            <div className="text-2xl font-bold text-green-600">
                                {services.filter((s) => s.is_active).length}
                            </div>
                            <div className="text-sm text-gray-500">
                                Active Services
                            </div>
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow">
                            <div className="text-2xl font-bold text-blue-600">
                                {
                                    services.filter((s) => s.category === 'web')
                                        .length
                                }
                            </div>
                            <div className="text-sm text-gray-500">
                                Web Services
                            </div>
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow">
                            <div className="text-2xl font-bold text-purple-600">
                                {
                                    services.filter(
                                        (s) => s.category === 'mobile',
                                    ).length
                                }
                            </div>
                            <div className="text-sm text-gray-500">
                                Mobile Services
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Create/Edit Modal */}
            {(showCreateModal || editingService) && (
                <ServiceModal
                    service={editingService}
                    onClose={() => {
                        setShowCreateModal(false);
                        setEditingService(null);
                    }}
                />
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <DeleteConfirmModal
                    service={deleteConfirm}
                    onConfirm={() => handleDelete(deleteConfirm)}
                    onCancel={() => setDeleteConfirm(null)}
                />
            )}
        </AdminLayout>
    );
};

const ServiceModal = ({ service, onClose }) => {
    const { data, setData, processing, errors, reset } = useForm({
        title: service?.title || '',
        slug: service?.slug || '',
        description: service?.description || '',
        content: service?.content || '',
        category: service?.category || 'web',
        icon: service?.icon || '🛠️',
        features: service?.features || [],
        meta_title: service?.meta_title || '',
        meta_description: service?.meta_description || '',
        is_active: service?.is_active ?? true,
        order: service?.order || 0,
    });

    const [featureInput, setFeatureInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (service) {
            (router.put('/admin/services', service.id),
                {
                    onSuccess: () => {
                        reset();
                        onClose();
                    },
                });
        } else {
            (router.post('/admin/services', data),
                {
                    onSuccess: () => {
                        reset();
                        onClose();
                    },
                });
        }
    };

    const addFeature = () => {
        if (
            featureInput.trim() &&
            !data.features.includes(featureInput.trim())
        ) {
            setData('features', [...data.features, featureInput.trim()]);
            setFeatureInput('');
        }
    };

    const removeFeature = (index) => {
        const newFeatures = data.features.filter((_, i) => i !== index);
        setData('features', newFeatures);
    };

    const categories = [
        { value: 'web', label: 'Web Application Development' },
        { value: 'desktop', label: 'Desktop Application Development' },
        { value: 'mobile', label: 'Mobile Application Development' },
        { value: 'cybersecurity', label: 'Cyber Security' },
        { value: 'other', label: 'Other Services' },
    ];

    return (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
            <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white">
                <div className="p-6">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {service ? 'Edit Service' : 'Create New Service'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
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

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Service Title *
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData('title', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="Enter service title"
                                    required
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Category *
                                </label>
                                <select
                                    value={data.category}
                                    onChange={(e) =>
                                        setData('category', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    required
                                >
                                    {categories.map((cat) => (
                                        <option
                                            key={cat.value}
                                            value={cat.value}
                                        >
                                            {cat.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Description *
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                rows={3}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Brief description of the service"
                                required
                            />
                            {errors.description && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Detailed Content *
                            </label>
                            <textarea
                                value={data.content}
                                onChange={(e) =>
                                    setData('content', e.target.value)
                                }
                                rows={6}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Detailed content about the service, features, benefits, etc."
                                required
                            />
                            {errors.content && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.content}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Icon
                                </label>
                                <input
                                    type="text"
                                    value={data.icon}
                                    onChange={(e) =>
                                        setData('icon', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="🛠️"
                                    maxLength={10}
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    Emoji or short text for icon
                                </p>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Display Order
                                </label>
                                <input
                                    type="number"
                                    value={data.order}
                                    onChange={(e) =>
                                        setData(
                                            'order',
                                            parseInt(e.target.value) || 0,
                                        )
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    min="0"
                                />
                            </div>
                        </div>

                        {/* Features Management */}
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Features
                            </label>
                            <div className="space-y-3">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={featureInput}
                                        onChange={(e) =>
                                            setFeatureInput(e.target.value)
                                        }
                                        onKeyPress={(e) =>
                                            e.key === 'Enter' &&
                                            (e.preventDefault(), addFeature())
                                        }
                                        className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        placeholder="Add a feature"
                                    />
                                    <button
                                        type="button"
                                        onClick={addFeature}
                                        className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-300"
                                    >
                                        Add
                                    </button>
                                </div>

                                {data.features.length > 0 && (
                                    <div className="space-y-2">
                                        {data.features.map((feature, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2"
                                            >
                                                <span className="text-sm text-gray-700">
                                                    {feature}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeFeature(index)
                                                    }
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <svg
                                                        className="h-4 w-4"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
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
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* SEO Fields */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Meta Title
                                </label>
                                <input
                                    type="text"
                                    value={data.meta_title}
                                    onChange={(e) =>
                                        setData('meta_title', e.target.value)
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="SEO title (optional)"
                                    maxLength={255}
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Meta Description
                                </label>
                                <textarea
                                    value={data.meta_description}
                                    onChange={(e) =>
                                        setData(
                                            'meta_description',
                                            e.target.value,
                                        )
                                    }
                                    rows={2}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-black focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="SEO description (optional)"
                                    maxLength={500}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between border-t pt-6">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) =>
                                        setData('is_active', e.target.checked)
                                    }
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <label className="ml-2 text-sm text-gray-700">
                                    Active Service
                                </label>
                            </div>

                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="rounded-lg border border-gray-300 px-6 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex items-center rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {processing ? (
                                        <>
                                            <svg
                                                className="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            {service
                                                ? 'Updating...'
                                                : 'Creating...'}
                                        </>
                                    ) : service ? (
                                        'Update Service'
                                    ) : (
                                        'Create Service'
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const DeleteConfirmModal = ({ service, onConfirm, onCancel }) => {
    return (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-6">
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                        <svg
                            className="h-6 w-6 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                        </svg>
                    </div>

                    <h3 className="mb-2 text-lg font-medium text-gray-900">
                        Delete Service
                    </h3>
                    <p className="mb-6 text-gray-500">
                        Are you sure you want to delete "
                        <strong>{service.title}</strong>"? This action cannot be
                        undone.
                    </p>

                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={onCancel}
                            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onConfirm}
                            className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700"
                        >
                            Delete Service
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesIndex;
