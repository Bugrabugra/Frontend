<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Relations\BelongsTo;
use MongoDB\Laravel\Relations\HasMany;

class Post extends Model {
    protected $connection = 'mongodb';
    protected $table = 'posts';

    protected $fillable = [
        'caption',
        'image_path',
        'image_url',
        'user_id',
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(related: User::class);
    }

    public function comments(): HasMany {
        return $this->hasMany(related: Comment::class);
    }

    public function likes(): HasMany {
        return $this->hasMany(related: Like::class);
    }
}
