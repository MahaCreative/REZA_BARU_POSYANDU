<?php

namespace App\Http\Controllers;

use App\Models\DataAnak;
use App\Models\DataKegiatan;
use App\Models\PelayananAnak;
use App\Models\PelayananIbu;
use Illuminate\Http\Request;

class PelayananAnakController extends Controller
{
    public function create(Request $request, $kd_kegiatan)
    {

        $kegiatan = DataKegiatan::where('kd_kegiatan', $kd_kegiatan)->first();
        $pelayanan = PelayananAnak::where('data_kegiatan_id', $kegiatan->id)->pluck('data_anak_id');
        // dd($pelayanan);
        $query = DataAnak::query()->whereNotIn('id', $pelayanan)->with(['pelayanan_anak' => function ($q) use ($kegiatan) {
            $q->whereNot('data_kegiatan_id', $kegiatan->id)->latest()->get()->take(1);
        }, 'ibu']);
        if ($request->cari) {
            $query->where('nama', 'like', '%' . $request->cari . '%');
        }
        $dataAnak = $query->latest()->get();
        return inertia('Admin/PelayananAnak/Create', compact('dataAnak', 'kegiatan'));
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            "data_kegiatan_id" => 'required',
            "data_anak_id" => 'required',
            "usia_anak" => 'required',
            "berat_badan_sekarang" => 'required|numeric',
            "tinggi_badan_sekarang" => 'required|numeric',
            "lingkar_lengan_sekarang" => 'required|numeric',
            "lingkar_kepala_sekarang" => 'required|numeric',
            "bb_u" => 'required',
            "tb_u" => 'required',
            "bb_tb" => 'required',
            "imt_u" => 'required',
            "status_stunting" => 'required',
            "mengidap_diare" => 'required',
            "pemberian_oralit" => 'required',
            "pemberian_vit_a" => 'required',
            "pemberian_imunisasi" => 'required',
            "pemberian_vaksin" => 'required',
        ]);
        $berat_badan_sebelumnya = 0;
        $tinggi_badan_sebelumnya = 0;
        $lingkar_lengan_sebelumnya = 0;
        $lingkar_kepala_sebelumnya = 0;
        if ($request->berat_badan_sebelumnya !== "Belum Pernah Mendapatkan Pelayanan") {
            $berat_badan_sebelumnya = $request->berat_badan_sebelumnya;
        }
        if ($request->tinggi_badan_sebelumnya !== "Belum Pernah Mendapatkan Pelayanan") {
            $tinggi_badan_sebelumnya = $request->tinggi_badan_sebelumnya;
        }
        if ($request->lingkar_lengan_sebelumnya !== "Belum Pernah Mendapatkan Pelayanan") {
            $lingkar_lengan_sebelumnya = $request->lingkar_lengan_sebelumnya;
        }
        if ($request->lingkar_kepala_sebelumnya !== "Belum Pernah Mendapatkan Pelayanan") {
            $lingkar_kepala_sebelumnya = $request->lingkar_kepala_sebelumnya;
        }
        $pelayananAnak = PelayananAnak::create([
            "data_kegiatan_id" => $request->data_kegiatan_id,
            "data_anak_id" => $request->data_anak_id,
            "usia_anak" => $request->usia_anak,
            "berat_badan_sebelumnya" => $berat_badan_sebelumnya,
            "berat_badan_sekarang" => $request->berat_badan_sekarang,
            "tinggi_badan_sebelumnya" => $tinggi_badan_sebelumnya,
            "tinggi_badan_sekarang" => $request->tinggi_badan_sekarang,
            "lingkar_lengan_sebelumnya" => $lingkar_lengan_sebelumnya,
            "lingkar_lengan_sekarang" => $request->lingkar_lengan_sekarang,
            "lingkar_kepala_sebelumnya" => $lingkar_kepala_sebelumnya,
            "lingkar_kepala_sekarang" => $request->lingkar_kepala_sekarang,
            "bb_u" => $request->bb_u,
            "tb_u" => $request->tb_u,
            "bb_tb" => $request->bb_tb,
            "imt_u" => $request->imt_u,
            "status_stunting" => $request->status_stunting,
            "mengidap_diare" => $request->mengidap_diare,
            "pemberian_oralit" => $request->pemberian_oralit,
            "pemberian_vit_a" => $request->pemberian_vit_a,
            "pemberian_imunisasi" => $request->pemberian_imunisasi,
            "pemberian_vaksin" => $request->pemberian_vaksin,
            "nasihat" => $request->nasihat,
            "nomor_imunisasi" => $request->kd_kegiatan + PelayananAnak::count() + 1,
            "nomor_vaksin" => $request->kd_kegiatan + PelayananAnak::count() + 1,
        ]);

        return redirect()->back();
    }

    public function delete(Request $request)
    {
        $pelayanan = PelayananAnak::findOrFail($request->id);
        $pelayanan->delete();
        return redirect()->back();
    }
    public function delete_ibu(Request $request)
    {
        $pelayanan = PelayananIbu::findOrFail($request->id);
        $pelayanan->delete();
        return redirect()->back();
    }

    public function show_per_anak(Request $request)
    {
        $anak = DataAnak::with('ibu')->findOrFail($request->id);
        $allPelayanan = PelayananAnak::where('data_anak_id', $request->id)->latest()->get();
        $stat_pelayanan = PelayananAnak::where('data_anak_id', $request->id)->get()->take(12);
        return inertia('Admin/PelayananAnak/ShowPerAnak', compact('anak', 'allPelayanan', 'stat_pelayanan'));
    }
}
