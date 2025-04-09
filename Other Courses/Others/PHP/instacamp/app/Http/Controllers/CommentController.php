<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class CommentController extends Controller {
    public function __construct() {
        $this->middleware('auth');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Post $post): RedirectResponse {
        $data = $request->validate([
            'comment' => 'required|max:255',
        ]);

        $post->comments()->create([
            'comment' => $data['comment'],
            'user_id' => auth()->id()
        ]);

        return redirect('/posts/' . $post->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment) {
        // check if the authenticated user is the comment owner or post owner
        if (auth()->id() !== $comment->user_id && auth()->id() !== $comment->post->user_id) {
            abort(403, 'Unauthorized action.');
        }

        $postId = $comment->post_id;
        $comment->delete();

        return redirect('/posts/' . $postId);
    }
}
