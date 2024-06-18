<?php

namespace App\Http\Controllers\Ibu;

use App\Http\Controllers\Controller;
use App\Models\DataAnak;
use App\Models\DataIbu;
use Illuminate\Http\Request;

class DataAnakController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $ibu = DataIbu::where('user_id', $user->id)->first();
        $dataAnak = DataAnak::with('ibu')->where('data_ibu_id', $ibu->id)->get();

        return inertia('Ibu/DataAnak', compact('dataAnak'));
    }
}
