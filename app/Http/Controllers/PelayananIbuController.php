<?php

namespace App\Http\Controllers;

use App\Models\DataIbu;
use App\Models\DataKegiatan;
use App\Models\PelayananIbu;
use Illuminate\Http\Request;

class PelayananIbuController extends Controller
{
    public function create(Request $request, $kd_kegiatan)
    {
        $kegiatan = DataKegiatan::where('kd_kegiatan', $kd_kegiatan)->first();
        $pelayananIbu = PelayananIbu::where('data_kegiatan_id', $kegiatan->id)->pluck('data_ibu_id');

        $query = DataIbu::whereNotIn('id', $pelayananIbu)->with(['pelayanan_ibu' => function ($q) use ($kegiatan) {
            $q->whereNot('data_kegiatan_id', $kegiatan->id)->latest()->get()->take(1);
        }, 'keanggotaan']);
        if ($request->cari) {
            $query->where('nik', 'like', '%' . $request->cari . '%')
                ->orWhere('nama_lengkap', 'like', '%' . $request->cari . '%');
        }
        $dataIbu = $query->latest()->get();

        return inertia('Admin/PelayananIbu/Index', compact('kegiatan', 'dataIbu'));
    }

    public function store(Request $request)
    {

        $attr = $request->validate([

            "tinggi_badan" => 'required|numeric',
            "berat_badan" => 'required|numeric',
            "lingkar_lengan" => 'required|numeric',
            "lingkar_perut" => 'required|numeric',
            "tinggi_fundus" => 'required|numeric',
            "detak_jantung_janin" => 'required',
            "tekanan_darah_ibu" => 'required',
            "posisi_janin" => 'required',
            "pemberian_imunisasi" => 'required',
            "pemberian_vaksin" => 'required',
            "pemberian_vitamin_a" => 'required',
            "umur_kehamilan" => 'required',
            "resiko_kehamilan" => 'required',
            "tindakan" => 'nullable',
            "nasihat" => 'nullable',
        ]);
        $attr['data_kegiatan_id'] = $request->data_kegiatan_id;
        $attr['data_ibu_id'] = $request->data_ibu_id;
        $pelayananIbu = PelayananIbu::create($attr);
    }

    public function show_per_ibu(Request $request)
    {

        $ibu = DataIbu::with('pekerjaan', 'pendidikan')->findOrFail($request->id);
        $allPelayanan = PelayananIbu::where('data_ibu_id', $ibu->id)->latest()->get();
        $stat_pelayanan = PelayananIbu::where('data_ibu_id', $ibu->id)->latest()->get()->take(12);
        return inertia('Admin/PelayananIbu/ShowPerIbu', compact('ibu', 'allPelayanan', 'stat_pelayanan'));
    }
}
