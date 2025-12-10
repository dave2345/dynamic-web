<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services = Service::orderBy('order')->get();

        return Inertia::render('admin/services/Index', [
            'services' => $services->map(function ($service) {
                return [
                    'id' => $service->id,
                    'title' => $service->title,
                    'slug' => $service->slug,
                    'description' => $service->description,
                    'category' => $service->category,
                    'image_url' => $service->image_url,
                    'is_active' => $service->is_active,
                    'order' => $service->order,
                    'created_at' => $service->created_at->format('M j, Y'),
                ];
            }),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255|unique:services,title',
            'slug' => 'nullable|string|max:255|unique:services,slug',
            'description' => 'required|string|max:500',
            'content' => 'required|string',
            'category' => 'required|in:web,desktop,mobile,cybersecurity,other',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'icon' => 'nullable|string|max:50',
            'features' => 'nullable|array',
            'features.*' => 'string|max:255',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'is_active' => 'boolean',
            'order' => 'nullable|integer',
        ]);


        // Handle image upload
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('services', 'public');
            $validated['image'] = $imagePath;
        }

        // Convert features array to JSON
        if (isset($validated['features'])) {
            $validated['features'] = json_encode($validated['features']);
        }

        // Set default order if not provided
        if (!isset($validated['order'])) {
            $validated['order'] = Service::max('order') + 1;
        }

        $service = Service::create($validated);

        return redirect()->route('admin.services.index')->with('success', 'Service created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Service $service)
    {
        return Inertia::render('admin/Services/Show', [
            'service' => [
                'id' => $service->id,
                'title' => $service->title,
                'slug' => $service->slug,
                'description' => $service->description,
                'content' => $service->content,
                'category' => $service->category,
                'image_url' => $service->image_url,
                'icon' => $service->icon,
                'features' => $service->features,
                'meta_title' => $service->meta_title,
                'meta_description' => $service->meta_description,
                'is_active' => $service->is_active,
                'order' => $service->order,
                'created_at' => $service->created_at->format('M j, Y'),
                'updated_at' => $service->updated_at->format('M j, Y'),
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'title' => [
                'required',
                'string',
                'max:255',
                Rule::unique('services')->ignore($service->id),
            ],
            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('services')->ignore($service->id),
            ],
            'description' => 'required|string|max:500',
            'content' => 'required|string',
            'category' => 'required|in:web,desktop,mobile,cybersecurity,other',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'icon' => 'nullable|string|max:50',
            'features' => 'nullable|array',
            'features.*' => 'string|max:255',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
            'is_active' => 'boolean',
            'order' => 'nullable|integer',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($service->image && Storage::disk('public')->exists($service->image)) {
                Storage::disk('public')->delete($service->image);
            }

            $imagePath = $request->file('image')->store('services', 'public');
            $validated['image'] = $imagePath;
        }

        // Convert features array to JSON
        if (isset($validated['features'])) {
            $validated['features'] = json_encode($validated['features']);
        }

        $service->update($validated);

        return redirect()->route('admin.services.index')->with('success', 'Service updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        // Delete associated image
        if ($service->image && Storage::disk('public')->exists($service->image)) {
            Storage::disk('public')->delete($service->image);
        }

        $service->delete();

        return redirect()->route('admin.services.index')->with('success', 'Service deleted successfully!');
    }

    /**
     * Update service order (for drag & drop sorting)
     */
    public function updateOrder(Request $request)
    {
        $request->validate([
            'services' => 'required|array',
            'services.*.id' => 'required|exists:services,id',
            'services.*.order' => 'required|integer',
        ]);

        foreach ($request->services as $service) {
            Service::where('id', $service['id'])->update(['order' => $service['order']]);
        }

        return response()->json(['message' => 'Order updated successfully!']);
    }

    /**
     * Toggle service status
     */
    public function toggleStatus(Service $service)
    {
        $service->update([
            'is_active' => !$service->is_active
        ]);

        return redirect()->back()->with('success', 'Service status updated!');
    }
}
