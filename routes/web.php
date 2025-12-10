<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\HomeController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\Admin\ServiceController;
use App\Models\Home;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
// Public routes
Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('/about', [PageController::class, 'about'])->name('about');
Route::get('/services', [PageController::class, 'services'])->name('services');
Route::get('/services/{slug}', [PageController::class, 'serviceDetail'])->name('service.detail');
Route::get('/contact', [PageController::class, 'contact'])->name('contact');
Route::post('/contact', [PageController::class, 'contactSubmit'])->name('contact.submit');

// Admin routes
Route::prefix('admin')->middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');

    // Home
    Route::get('/home', [HomeController::class, 'index'])->name('admin.home.edit');
    Route::post('/home/{home}', [HomeController::class, 'update'])->name('admin.home.update');

    // About
    Route::get('/about', [AdminController::class, 'editSection'])->name('admin.about.edit');
    Route::post('/about', [AdminController::class, 'updateSection'])->name('admin.about.update');
    Route::post('/about', [AdminController::class, 'createSection'])->name('admin.about.create');
    Route::delete('/about', [AdminController::class, 'deleteSection'])->name('admin.about.destroy');

    // Contact
    Route::get('/contact', [AdminController::class, 'editSection'])->name('admin.contact.edit');
    Route::post('/contact', [AdminController::class, 'updateSection'])->name('admin.contact.update');
    Route::post('/contact', [AdminController::class, 'createSection'])->name('admin.contact.create');
    Route::delete('/contact', [AdminController::class, 'deleteSection'])->name('admin.contact.destroy');

    // Services
    Route::get('/services', [ServiceController::class, 'index'])->name('admin.services.index');
    Route::post('/services', [ServiceController::class, 'store'])->name('admin.services.store');
    Route::get('/services/{service}', [ServiceController::class, 'show'])->name('admin.services.show');
    Route::put('/services/{service}', [ServiceController::class, 'update'])->name('admin.services.update');
    Route::delete('/services/{service}', [ServiceController::class, 'destroy'])->name('admin.services.destroy');
    Route::post('/services/order', [ServiceController::class, 'updateOrder'])->name('admin.services.order');
    Route::post('/services/{service}/toggle', [ServiceController::class, 'toggleStatus'])->name('admin.services.toggle');

    // File management
    Route::post('/upload', [AdminController::class, 'upload'])->name('admin.upload');
    Route::get('/uploads', [AdminController::class, 'getUploads'])->name('admin.uploads');
    Route::delete('/upload', [AdminController::class, 'deleteUpload'])->name('admin.upload.delete');

    // Analytics and system
    Route::get('/analytics', [AdminController::class, 'getAnalytics'])->name('admin.analytics');
    Route::get('/system-status', [AdminController::class, 'getSystemStatus'])->name('admin.system-status');
});
