<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Home;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HomeController extends Controller
{
    // Display the admin edit page
    public function index()
    {
        $home = Home::first();

        // Create default row if not exists
        if (! $home) {
            $home = Home::create([]);
        }

        return Inertia::render('admin/home/index', compact('home'));
    }

    // Update homepage content
    public function update(Request $request, Home $home)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'subtitle' => 'nullable|string|max:255',

            'hero_title' => 'nullable|string|max:255',
            'hero_description' => 'nullable|string',
            'hero_button_text' => 'nullable|string|max:255',
            'hero_button_link' => 'nullable|string|max:255',

            'sections' => 'nullable|array',
            'media_gallery' => 'nullable|array',

            'seo_title' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string',
            'seo_keywords' => 'nullable|string|max:255',

            'hero_image' => 'nullable|image|max:3048',
        ]);

        // Upload hero image if provided
        if ($request->hasFile('hero_image')) {
            if ($home->hero_image && Storage::exists($home->hero_image)) {
                Storage::delete($home->hero_image);
            }

            $validated['hero_image'] = $request->file('hero_image')->store('home/hero');
        }

        // Convert arrays to JSON automatically
        if ($request->has('sections')) {
            $validated['sections'] = json_encode($request->sections);
        }

        if ($request->has('media_gallery')) {
            $validated['media_gallery'] = json_encode($request->media_gallery);
        }

        // Increment version
        $validated['version'] = $home->version + 1;
        $validated['edited_by'] = auth()->id();

        // Save to database
        $home->update($validated);

        return back()->with('success', 'Home page updated successfully!');
    }
}
