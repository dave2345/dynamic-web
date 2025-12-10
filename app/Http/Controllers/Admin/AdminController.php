<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Section;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AdminController extends Controller
{
    /**
     * Display admin dashboard
     */ public function dashboard()
    {
        $services = Service::orderBy('created_at', 'desc')->get();
        $sections = Section::all()->groupBy('page');

        $stats = [
            'total_services' => Service::count(),
            'active_services' => Service::where('is_active', true)->count(),
            'total_sections' => Section::count(),
            'recent_activity' => [
                'last_service_update' => Service::latest()->first()?->updated_at?->diffForHumans() ?? 'Never',
                'last_section_update' => Section::latest()->first()?->updated_at?->diffForHumans() ?? 'Never',
            ]
        ];

        return Inertia::render('admin/Dashboard', [
            'services' => $services,
            'sections' => $sections,
            'stats' => $stats,
        ]);
    }

    /**
     * Show form for editing a section
     */
    public function editSection($section)
    {
        $section = Section::where('slug', $section)->firstOrFail();
        $sections = Section::where('page', $section->page)->get();

        return Inertia::render('admin/Sections/Edit', [
            'currentSection' => $section,
            'sections' => $sections,
            'pageSections' => $sections->groupBy('name'),
        ]);
    }

    /**
     * Update a section
     */
    public function updateSection(Request $request, $section)
    {
        $section = Section::where('slug', $section)->firstOrFail();

        $validated = $request->validate([
            'content' => 'nullable|string',
            'is_active' => 'boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'meta_title' => 'nullable|string|max:255',
            'meta_description' => 'nullable|string|max:500',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($section->image && Storage::disk('public')->exists($section->image)) {
                Storage::disk('public')->delete($section->image);
            }

            $imagePath = $request->file('image')->store('sections', 'public');
            $validated['image'] = $imagePath;
        }

        $section->update($validated);

        return redirect()->route('admin.dashboard')->with('success', 'Section updated successfully!');
    }

    /**
     * Handle file uploads
     */
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:jpeg,png,jpg,gif,pdf,doc,docx|max:5120',
            'type' => 'nullable|in:image,document,other',
        ]);

        try {
            $file = $request->file('file');
            $type = $request->input('type', 'other');

            $path = $file->store("uploads/{$type}", 'public');

            return response()->json([
                'success' => true,
                'file_path' => $path,
                'file_url' => Storage::disk('public')->url($path),
                'file_name' => $file->getClientOriginalName(),
                'file_size' => $file->getSize(),
                'mime_type' => $file->getMimeType(),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Upload failed: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get uploads for media library
     */
    public function getUploads(Request $request)
    {
        $type = $request->input('type', 'all');

        $directories = ['uploads/image', 'uploads/document', 'uploads/other'];
        $media = [];

        foreach ($directories as $directory) {
            if (Storage::disk('public')->exists($directory)) {
                $files = Storage::disk('public')->files($directory);

                foreach ($files as $file) {
                    $fileType = explode('/', $file)[1] ?? 'other'; // Get 'image', 'document', or 'other'

                    if ($type !== 'all' && $fileType !== $type) {
                        continue;
                    }

                    $media[] = [
                        'path' => $file,
                        'url' => Storage::disk('public')->url($file),
                        'name' => basename($file),
                        'type' => $fileType,
                        'size' => Storage::disk('public')->size($file),
                        'last_modified' => Storage::disk('public')->lastModified($file),
                    ];
                }
            }
        }

        // Sort by last modified (newest first)
        usort($media, function ($a, $b) {
            return $b['last_modified'] <=> $a['last_modified'];
        });

        return response()->json([
            'success' => true,
            'media' => $media,
        ]);
    }

    /**
     * Delete uploaded file
     */
    public function deleteUpload(Request $request)
    {
        $request->validate([
            'file_path' => 'required|string',
        ]);

        try {
            $filePath = $request->input('file_path');

            if (Storage::disk('public')->exists($filePath)) {
                Storage::disk('public')->delete($filePath);

                return response()->json([
                    'success' => true,
                    'message' => 'File deleted successfully!',
                ]);
            }

            return response()->json([
                'success' => false,
                'message' => 'File not found!',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Delete failed: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Create a new section
     */
    public function createSection(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'page' => 'required|in:home,about,services,contact',
            'content' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        $validated['order'] = Section::where('page', $validated['page'])->max('order') + 1;

        Section::create($validated);

        return redirect()->route('admin.dashboard')->with('success', 'Section created successfully!');
    }

    /**
     * Delete a section
     */
    public function deleteSection(Section $section)
    {
        // Delete associated image
        if ($section->image && Storage::disk('public')->exists($section->image)) {
            Storage::disk('public')->delete($section->image);
        }

        $section->delete();

        return redirect()->route('admin.dashboard')->with('success', 'Section deleted successfully!');
    }

    /**
     * Get website analytics data (mock data for now)
     */
    public function getAnalytics()
    {
        $analytics = [
            'visitors' => [
                'total' => 12458,
                'change' => 12.5,
            ],
            'pageviews' => [
                'total' => 45689,
                'change' => 8.3,
            ],
            'bounce_rate' => [
                'total' => 42.3,
                'change' => -5.2,
            ],
            'avg_session' => [
                'total' => '00:03:45',
                'change' => 15.7,
            ],
            'top_pages' => [
                ['page' => '/', 'visitors' => 3456],
                ['page' => '/services', 'visitors' => 2345],
                ['page' => '/about', 'visitors' => 1876],
                ['page' => '/contact', 'visitors' => 1567],
            ],
        ];

        return response()->json($analytics);
    }

    /**
     * Get system status
     */
    public function getSystemStatus()
    {
        $status = [
            'server' => [
                'php_version' => PHP_VERSION,
                'laravel_version' => app()->version(),
                'server_software' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown',
            ],
            'storage' => [
                'total' => disk_total_space('/'),
                'free' => disk_free_space('/'),
                'used' => disk_total_space('/') - disk_free_space('/'),
                'used_percentage' => round((disk_total_space('/') - disk_free_space('/')) / disk_total_space('/') * 100, 2),
            ],
            'database' => [
                'connection' => config('database.default'),
                'size' => $this->getDatabaseSize(),
            ],
        ];

        return response()->json($status);
    }

    /**
     * Calculate database size
     */
    private function getDatabaseSize()
    {
        try {
            $dbName = config('database.connections.mysql.database');
            $result = \DB::select("SELECT SUM(data_length + index_length) as size FROM information_schema.TABLES WHERE table_schema = ?", [$dbName]);
            return $result[0]->size ?? 0;
        } catch (\Exception $e) {
            return 0;
        }
    }
}
