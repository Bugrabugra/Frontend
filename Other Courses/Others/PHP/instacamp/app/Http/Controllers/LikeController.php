<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class LikeController extends Controller {
    public function __construct() {
        $this->middleware('auth');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Post $post) {
        $post->likes()->create([
            'user_id' => auth()->id()
        ]);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post): RedirectResponse {
        $post->likes()->where('user_id', auth()->id())->delete();

        return back();
    }
}
