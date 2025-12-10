<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('homes', function (Blueprint $table) {
            $table->id();

            // Basic page info
            $table->string('title')->nullable();
            $table->string('subtitle')->nullable();

            // Hero section
            $table->string('hero_title')->nullable();
            $table->text('hero_description')->nullable();
            $table->string('hero_image')->nullable();
            $table->string('hero_button_text')->nullable();
            $table->string('hero_button_link')->nullable();

            // Sections (supports dynamic layouts)
            $table->json('sections')->nullable();
            /*
                Example:
                [
                    { "type": "about", "title": "Who We Are", "content": "...", "image": "about.jpg" },
                    { "type": "services", "items": [ ... ] }
                ]
            */

            // Additional images (grid/feature icons)
            $table->json('media_gallery')->nullable();

            // SEO metadata
            $table->string('seo_title')->nullable();
            $table->text('seo_description')->nullable();
            $table->string('seo_keywords')->nullable();

            // Publishing controls
            $table->boolean('is_active')->default(true);
            $table->timestamp('published_at')->nullable();
            $table->timestamp('unpublished_at')->nullable();

            // Versioning (optional)
            $table->unsignedInteger('version')->default(1);
            $table->unsignedBigInteger('edited_by')->nullable(); // admin user ID

            $table->timestamps();

            // Foreign key optional
            $table->foreign('edited_by')->references('id')->on('users')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('homes');
    }
};
