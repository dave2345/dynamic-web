<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Service;
use App\Models\Section;
use Illuminate\Http\Request;

class PageController extends Controller
{
    /**
     * Display the home page
     */
    public function home()
    {
        $services = Service::where('is_active', true)
            ->orderBy('order')
            ->take(6)
            ->get()
            ->map(function ($service) {
                return [
                    'id' => $service->id,
                    'title' => $service->title,
                    'slug' => $service->slug,
                    'description' => $service->description,
                    'image' => $service->image,
                    'icon' => $service->icon,
                    'category' => $service->category,
                ];
            });

        $sections = Section::where('page', 'home')
            ->where('is_active', true)
            ->get()
            ->mapWithKeys(function ($section) {
                return [$section->name => $section->content];
            });

        return Inertia::render('Home', [
            'services' => $services,
            'sections' => $sections,
            'featuredContent' => [
                'hero' => [
                    'title' => $sections['hero_title'] ?? 'Digital Innovation Meet Excellence',
                    'subtitle' => $sections['hero_subtitle'] ?? 'We craft cutting-edge digital solutions that drive your business forward.',
                ]
            ]
        ]);
    }

    /**
     * Display the about page
     */
    public function about()
    {
        $sections = Section::where('page', 'about')
            ->where('is_active', true)
            ->get()
            ->mapWithKeys(function ($section) {
                return [$section->name => $section->content];
            });

        return Inertia::render('About', [
            'sections' => $sections,
            'team' => [
                'ceo' => [
                    'name' => 'David Wilson',
                    'position' => 'CEO & Founder',
                    'bio' => 'With over 15 years of experience in software development and digital transformation.',
                    'image' => '/images/team/ceo.jpg',
                ],
                'cto' => [
                    'name' => 'Sarah Johnson',
                    'position' => 'CTO',
                    'bio' => 'Expert in cloud architecture and scalable software solutions.',
                    'image' => '/images/team/cto.jpg',
                ]
            ],
            'stats' => [
                ['value' => '150+', 'label' => 'Projects Completed'],
                ['value' => '50+', 'label' => 'Happy Clients'],
                ['value' => '10+', 'label' => 'Years Experience'],
                ['value' => '24/7', 'label' => 'Support'],
            ]
        ]);
    }

    /**
     * Display the services page
     */
    public function services()
    {
        $services = Service::where('is_active', true)
            ->orderBy('order')
            ->get()
            ->map(function ($service) {
                return [
                    'id' => $service->id,
                    'title' => $service->title,
                    'slug' => $service->slug,
                    'description' => $service->description,
                    'content' => $service->content,
                    'image' => $service->image,
                    'icon' => $service->icon,
                    'category' => $service->category,
                    'features' => json_decode($service->features, true) ?? [],
                    'is_active' => $service->is_active,
                ];
            });

        $sections = Section::where('page', 'services')
            ->where('is_active', true)
            ->get()
            ->mapWithKeys(function ($section) {
                return [$section->name => $section->content];
            });

        return Inertia::render('Services', [
            'services' => $services,
        ]);
    }

    /**
     * Display a single service detail page
     */
    public function serviceDetail($slug)
    {
        $service = Service::where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        $relatedServices = Service::where('category', $service->category)
            ->where('id', '!=', $service->id)
            ->where('is_active', true)
            ->orderBy('order')
            ->take(3)
            ->get();

        return Inertia::render('ServiceDetail', [
            'service' => [
                'id' => $service->id,
                'title' => $service->title,
                'slug' => $service->slug,
                'description' => $service->description,
                'content' => $service->content,
                'image' => $service->image,
                'icon' => $service->icon,
                'category' => $service->category,
                'features' => json_decode($service->features, true) ?? [],
                'meta_title' => $service->meta_title,
                'meta_description' => $service->meta_description,
            ],
            'relatedServices' => $relatedServices,
        ]);
    }

    /**
     * Display the contact page
     */
    public function contact()
    {
        $sections = Section::where('page', 'contact')
            ->where('is_active', true)
            ->get()
            ->mapWithKeys(function ($section) {
                return [$section->name => $section->content];
            });

        return Inertia::render('Contact', [
            'sections' => $sections,
            'contactInfo' => [
                'email' => 'info@dave-tech.com',
                'phone' => '+1 (555) 123-4567',
                'address' => '123 Tech Street, Digital City, DC 12345',
                'working_hours' => 'Mon - Fri: 9:00 AM - 6:00 PM',
            ]
        ]);
    }

    /**
     * Handle contact form submission
     */
    public function contactSubmit(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|min:10',
            'g-recaptcha-response' => 'required|recaptcha',
        ]);

        // Here you would typically:
        // 1. Send email notification
        // 2. Store in database
        // 3. Send auto-response

        return redirect()->back()->with('success', 'Thank you for your message! We will get back to you soon.');
    }
}
