<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
     use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'page',
        'content',
        'image',
        'is_active',
        'meta_title',
        'meta_description',
        'order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'content' => 'array', // If you're storing JSON content
    ];

    /**
     * Get the image URL
     */
    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return null;
        }

        return asset('storage/' . $this->image);
    }

    /**
     * Scope active sections
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope by page
     */
    public function scopeForPage($query, $page)
    {
        return $query->where('page', $page);
    }
}
