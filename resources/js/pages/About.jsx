import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';

const About = () => {
    const teamMembers = [
        {
            name: 'David Wilson',
            position: 'CEO & Founder',
            bio: 'With over 15 years of experience in software development and digital transformation, David leads our vision and strategy.',
            image: '/images/team/ceo.jpg',
            social: {
                linkedin: '#',
                twitter: '#'
            }
        },
        {
            name: 'Sarah Johnson',
            position: 'Chief Technology Officer',
            bio: 'Expert in cloud architecture and scalable software solutions with a passion for cutting-edge technologies.',
            image: '/images/team/cto.jpg',
            social: {
                linkedin: '#',
                github: '#'
            }
        },
        {
            name: 'Mike Chen',
            position: 'Lead Developer',
            bio: 'Full-stack developer specializing in React, Node.js, and modern web technologies.',
            image: '/images/team/developer.jpg',
            social: {
                linkedin: '#',
                github: '#'
            }
        },
        {
            name: 'Emily Rodriguez',
            position: 'UX/UI Designer',
            bio: 'Creative designer focused on creating intuitive and beautiful user experiences across all platforms.',
            image: '/images/team/designer.jpg',
            social: {
                linkedin: '#',
                dribbble: '#'
            }
        }
    ];

    const stats = [
        { number: '150+', label: 'Projects Completed' },
        { number: '50+', label: 'Happy Clients' },
        { number: '10+', label: 'Years Experience' },
        { number: '24/7', label: 'Support' }
    ];

    const values = [
        {
            icon: '🚀',
            title: 'Innovation',
            description: 'We stay ahead of the curve by embracing new technologies and creative solutions.'
        },
        {
            icon: '💎',
            title: 'Quality',
            description: 'Every project is delivered with the highest standards of excellence and attention to detail.'
        },
        {
            icon: '🤝',
            title: 'Partnership',
            description: 'We work closely with our clients as partners in their digital transformation journey.'
        },
        {
            icon: '⚡',
            title: 'Efficiency',
            description: 'We deliver robust solutions on time and within budget without compromising quality.'
        }
    ];

    return (
        <MainLayout title="About Us - ByteNode">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-gray-900/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-gray-900 bg-clip-text text-transparent">
                            About ByteNode
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                            We are a team of passionate developers, designers, and innovators dedicated to
                            transforming your ideas into powerful digital solutions.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="text-center"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Story</span>
                            </h2>
                            <div className="space-y-4 text-gray-600">
                                <p className="text-lg">
                                    Founded in 2015, ByteNode started as a small team of developers with a big vision:
                                    to make cutting-edge technology accessible to businesses of all sizes.
                                </p>
                                <p>
                                    What began as a passion project has grown into a full-service digital agency
                                    specializing in web applications, mobile apps, and custom software solutions.
                                    Our journey has been fueled by our commitment to excellence and our clients' success.
                                </p>
                                <p>
                                    Today, we're proud to have helped numerous businesses transform their operations,
                                    reach new markets, and achieve their digital goals through our innovative solutions.
                                </p>
                            </div>
                            <div className="mt-8">
                                <Link
                                    href="/contact"
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center"
                                >
                                    Start Your Project
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                                <div className="text-6xl mb-4">💡</div>
                                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                                <p className="text-blue-100">
                                    To empower businesses with innovative digital solutions that drive growth,
                                    enhance efficiency, and create meaningful impact in the digital world.
                                </p>
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                <div className="text-4xl mb-2">🎯</div>
                                <h4 className="font-bold text-gray-900">Our Vision</h4>
                                <p className="text-gray-600 text-sm mt-1">
                                    To be the leading digital partner for businesses seeking transformation through technology.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Values</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            The principles that guide everything we do
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="text-center group"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-3xl">{value.icon}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Meet Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Team</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            The talented individuals behind ByteNode's success
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 text-center group"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                                <p className="text-blue-600 font-semibold mb-4">{member.position}</p>
                                <p className="text-gray-600 text-sm mb-6">{member.bio}</p>
                                <div className="flex justify-center space-x-4">
                                    {member.social.linkedin && (
                                        <a href={member.social.linkedin} className="text-gray-400 hover:text-blue-600 transition-colors">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                            </svg>
                                        </a>
                                    )}
                                    {member.social.twitter && (
                                        <a href={member.social.twitter} className="text-gray-400 hover:text-blue-400 transition-colors">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                                            </svg>
                                        </a>
                                    )}
                                    {member.social.github && (
                                        <a href={member.social.github} className="text-gray-400 hover:text-gray-900 transition-colors">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Work With Us?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        Let's build something amazing together. Our team is ready to bring your ideas to life.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 inline-flex items-center justify-center"
                        >
                            Get In Touch
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </Link>
                        <Link
                            href="/services"
                            className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300 inline-flex items-center justify-center"
                        >
                            Our Services
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default About;
