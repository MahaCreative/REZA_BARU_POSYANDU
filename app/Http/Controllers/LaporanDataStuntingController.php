<?php

namespace App\Http\Controllers;

use App\Models\Dusun;
use App\Models\PelayananAnak;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LaporanDataStuntingController extends Controller
{

    public function index(Request $request)
    {

        $stuntingPertahun = PelayananAnak::status_stunting_pertahun();
        $count_stunting_perdusun = PelayananAnak::count_status_stunting_perdusun();

        return inertia('Admin/DataStunting/StatistikStunting', compact('stuntingPertahun', 'count_stunting_perdusun'));
    }
}
