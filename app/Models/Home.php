<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Home extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'subtitle',

        'hero_title',
        'hero_description',
        'hero_image',
        'hero_button_text',
        'hero_button_link',

        'sections',
        'media_gallery',

        'seo_title',
        'seo_description',
        'seo_keywords',

        'is_active',
        'published_at',
        'unpublished_at',

        'version',
        'edited_by',
    ];

    protected $casts = [
        'sections'        => 'array',
        'media_gallery'   => 'array',
        'published_at'    => 'datetime',
        'unpublished_at'  => 'datetime',
        'is_active'       => 'boolean',
    ];

    /**
     * Editor relationship (optional).
     * Connects to users table.
     */
    public function editor()
    {
        return $this->belongsTo(User::class, 'edited_by');
    }

    /**
     * Helper: Get formatted list of sections.
     */
    public function getSection($key)
    {
        return $this->sections[$key] ?? null;
    }

    /**
     * Helper: Check if page is currently published.
     */
    public function isPublished()
    {
        if (! $this->is_active) {
            return false;
        }

        if ($this->published_at && now()->lt($this->published_at)) {
            return false;
        }

        if ($this->unpublished_at && now()->gt($this->unpublished_at)) {
            return false;
        }

        return true;
    }
}

