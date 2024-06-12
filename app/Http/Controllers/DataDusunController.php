<?php

namespace App\Http\Controllers;

use App\Models\Dusun;
use Illuminate\Http\Request;

class DataDusunController extends Controller
{
    public function index(Request $request)
    {
        $dusun = Dusun::latest()->get();
        return inertia('Admin/DataDusun/Index', compact('dusun'));
    }

    public function store(Request $request)
    {

        $request->validate(['nama_dusun' => 'required|string|min:6']);
        $dusun = Dusun::create(['nama_dusun' => $request->nama_dusun]);
        return redirect()->back();
    }

    public function delete(Request $request)
    {
        $dusun = Dusun::findOrFail($request->id);
        $dusun->delete();
        return redirect()->back();
    }
}
