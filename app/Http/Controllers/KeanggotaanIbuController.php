<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\KeanggotaanIbu;

class KeanggotaanIbuController extends Controller
{
    public function index(Request $request)
    {

        $query = KeanggotaanIbu::query()->with('ibu');
        if ($request->cari) {
            $query->whereHas('ibu', function ($q) use ($request) {
                $q->where('nama_lengkap', 'like', '%' . $request->cari . '%');
            });
        }
        $keanggotaanIbu = $query->get();

        return inertia("Admin/KeanggotaanIbu/Index", compact('keanggotaanIbu'));
    }

    public function form_keanggotaan_bu(Request $request)
    {
        return inertia("Admin/KeanggotaanIbu/ViewForm");
    }
    public function form_update_keanggotaan_bu(Request $request)
    {
        $keanggotaanIbu = KeanggotaanIbu::with(['ibu' => function ($q) {
            $q->with('pekerjaan', 'pendidikan');
        }])->findOrFail($request->id);

        return inertia("Admin/KeanggotaanIbu/ViewForm", compact('keanggotaanIbu'));
    }

    public function store(Request $request)
    {

        $attr = $request->validate([
            "usia_kehamilan" => "required|numeric",
            "berat_badan" => "required|numeric",
            "tinggi_badan" => "required|numeric",
            "hpht" => "required|date",
            "htp" => "required|date",
            "hamil_ke" => "required|numeric",
            "foto_ktp" => "nullable",
            "foto_kk" => "nullable",
            'riwayat_penyakit' => 'nullable|string',
        ]);
        if ($request->hasFile('foto_ktp')) {
            $request->validate([
                "foto_ktp" => "required|image|mimes:jpg,jpeg,png",

            ]);
            $attr['foto_ktp'] = $request->file('foto_ktp')->store('Berkas_Keanggotaan_Ibu/KTP');
        }
        if ($request->hasFile('foto_kk')) {
            $request->validate([
                "foto_kk" => "required|image|mimes:jpg,jpeg,png",
            ]);

            $attr['foto_kk'] = $request->file('foto_kk')->store('Berkas_Keanggotaan_Ibu/KK');
        }
        $attr['tanggal_pendaftaran'] = now();
        $attr['kode_anggota'] = now()->format('ymd') . $request->data_ibu_id . KeanggotaanIbu::count() + 1;
        $attr['data_ibu_id'] = $request->data_ibu_id;
        $keanggotaanIbu = KeanggotaanIbu::create($attr);
    }

    public function update(Request $request)
    {

        $keanggotaanIbu = KeanggotaanIbu::findOrFail($request->id);

        if ($request->hasFile('foto_kk')) {
            $request->validate(['foto_kk' => 'nullable|imagge|mimes:png,jpg,jpeg']);
            $attr['foto_kk'] = $request->file('foto_kk') ? $request->file('foto_kk')->store('Berkas_Keanggotaan_Ibu/KK') : $keanggotaanIbu->foto_kk;
        }
        if ($request->hasFile('foto_ktp')) {
            $request->validate(['foto_ktp' => 'nullable|imagge|mimes:png,jpg,jpeg']);
            $attr['foto_ktp'] = $request->file('foto_ktp') ? $request->file('foto_ktp')->store('Berkas_Keanggotaan_Ibu/KTP') : $keanggotaanIbu->foto_kk;
        }
        $attr = $request->validate([
            "usia_kehamilan" => "required|numeric",
            "berat_badan" => "required|numeric",
            "tinggi_badan" => "required|numeric",
            "hpht" => "required|date",
            "htp" => "required|date",
            "hamil_ke" => "required|numeric",
            'riwayat_penyakit' => 'nullable|string',
        ]);
        $keanggotaanIbu->update($attr);
    }

    public function delete(Request $request)
    {
        $keanggotaanIbu = KeanggotaanIbu::findOrFail($request->id);
        $keanggotaanIbu->delete();
    }
}
