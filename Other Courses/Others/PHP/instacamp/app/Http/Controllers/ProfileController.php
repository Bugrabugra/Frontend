<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\View\View;

class ProfileController extends Controller {
  /**
   * Display a listing of the resource.
   */
  public function index(User $user): View {
    return view('profiles.index', compact('user'));
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(User $user) {
    if (auth()->id() !== $user->id) {
      abort(403, "Unauthorized action.");
    }

    return view('profiles.edit', compact('user'));
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, User $user) {
    if (auth()->id() !== $user->id) {
      abort(403, "Unauthorized action.");
    }

    $data = $request->validate([
      'name'          => 'required',
      'username'      => 'required',
      'bio'           => 'nullable',
      'profile_image' => 'image|nullable|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    if ($request->hasFile('profile_image')) {
      // delete old profile image if exists
      if ($user->profile_image) {
        Storage::disk('public')->delete($user->profile_image);
      }

      $imagePath = $request->file('profile_image')->store('profile', 'public');
      $data['profile_image'] = $imagePath;
    }

    $user->update($data);

    return redirect("/profile/{$user->id}");
  }
}
