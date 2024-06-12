<?php

namespace App\Http\Controllers;

use App\Models\SettingApps;
use Illuminate\Http\Request;

class SettingAppsController extends Controller
{
    public function index(Request $request)
    {
        $settingApps = SettingApps::first();
        return inertia('Admin/SettingApps/Index', compact('settingApps'));
    }

    public function update(Request $request)
    {
        $request->validate([
            "nama_posyandu" => 'required|string|min:10',
            "logo" => 'required|image|mimes:jpg,jpeg,png,webp',
            "alamat" => 'required|string|min:20',
            "kecamatan" => 'required|string|min:6',
            "nama_ketua_posyandu" => 'required|string|min:10',
        ]);
        $foto = $request->file('logo')->store('settingApps');
        $setting = SettingApps::first();
        $setting->update([
            "nama_posyandu" => $request->nama_posyandu,
            "logo" => $foto,
            "alamat" => $request->alamat,
            "kecamatan" => $request->kecamatan,
            "nama_ketua_posyandu" => $request->nama_ketua_posyandu,
        ]);
    }
}
