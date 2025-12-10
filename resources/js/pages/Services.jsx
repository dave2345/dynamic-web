import React from 'react';
import MainLayout from '../Layouts/MainLayout';
import { Link } from '@inertiajs/react';

const Services = ({ services }) => {
    const serviceCategories = {
        web: 'Web Application Design & Development',
        desktop: 'Desktop Application Development',
        mobile: 'Mobile Application Development',
        cybersecurity: 'Cyber Security',
        other: 'Other Services'
    };

    const getServicesByCategory = (category) => {
        return services.filter(service => service.category === category);
    };

    return (
        <MainLayout title="Services - ByteNode">
            {/* Hero */}
            <section className="relative py-20 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-gray-900/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-gray-900 bg-clip-text text-transparent">
                        Our Services
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Comprehensive digital solutions crafted with cutting-edge technology and innovative approaches
                    </p>
                </div>
            </section>

            {/* Services by Category */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {Object.entries(serviceCategories).map(([category, title]) => {
                        const categoryServices = getServicesByCategory(category);
                        if (categoryServices.length === 0) return null;

                        return (
                            <div key={category} className="mb-16">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                                    {title}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {categoryServices.map((service, index) => (
                                        <div
                                            key={service.id}
                                            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-gray-100 group"
                                            data-aos="fade-up"
                                            data-aos-delay={index * 100}
                                        >
                                            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                                <span className="text-2xl text-white">💻</span>
                                            </div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                                            <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                                            <div className="mb-6">
                                                <h4 className="font-semibold text-gray-900 mb-2">What we offer:</h4>
                                                <ul className="text-gray-600 space-y-1">
                                                    {service.features?.map((feature, idx) => (
                                                        <li key={idx} className="flex items-center">
                                                            <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                            {feature}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <Link
                                                href={`/services/${service.slug}`}
                                                className="inline-flex items-center text-blue-600 font-semibold hover:text-purple-600 transition-colors duration-300"
                                            >
                                                Learn more
                                                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Process Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Process</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { step: '01', title: 'Discovery', desc: 'Understanding your requirements and goals' },
                            { step: '02', title: 'Planning', desc: 'Creating detailed project roadmap' },
                            { step: '03', title: 'Development', desc: 'Building with modern technologies' },
                            { step: '04', title: 'Delivery', desc: 'Testing and launching your solution' }
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="text-center group"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-white text-xl font-bold">{item.step}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default Services;
