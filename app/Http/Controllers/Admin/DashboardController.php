<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DataAnak;
use App\Models\DataIbu;
use App\Models\DataKegiatan;
use App\Models\PelayananAnak;
use App\Models\PelayananIbu;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $stuntingPertahun = PelayananAnak::status_stunting_pertahun();
        $count_stunting_perdusun = PelayananAnak::count_status_stunting_perdusun();
        $countAnak = DataAnak::count();
        $countIbu = DataIbu::count();
        $countKegiatan = DataKegiatan::count();
        $dataKegiatan = DataKegiatan::latest()->first();



        $jumlah_stunting = 0;
        $jumlah_pengidap_diare = 0;
        $jumlah_pemberian_vit_a = 0;
        $jumlah_pemberian_oralit = 0;
        $countImunAnak = 0;
        $jumlah_usia_anak = 0;
        $countStunting = 0;
        $countResiko = 0;
        $countPosisi = 0;
        $countImun = 0;
        $countPemberianVit = 0;
        $countUsia = 0;
        if ($dataKegiatan) {
            $jumlah_stunting = PelayananAnak::JumlahStunting($dataKegiatan->id);
            $jumlah_pengidap_diare = PelayananAnak::jumlah_pengidap_diare($dataKegiatan->id);
            $jumlah_pemberian_vit_a = PelayananAnak::jumlah_pemberian_vit_a($dataKegiatan->id);
            $jumlah_pemberian_oralit = PelayananAnak::jumlah_pemberian_oralit($dataKegiatan->id);
            $countImunAnak = PelayananAnak::detail_count_pos_vaksin($dataKegiatan->id);
            $jumlah_usia_anak = PelayananAnak::statistik_usia($dataKegiatan->id);
            $countStunting = PelayananAnak::where('status_stunting', '=', 'stunting')->where('data_kegiatan_id', $dataKegiatan->id)->count();

            $countResiko = PelayananIbu::detail_count_resiko($dataKegiatan->id);
            $countPosisi = PelayananIbu::detail_count_pos_janin($dataKegiatan->id);
            $countImun = PelayananIbu::detail_count_pos_vaksin($dataKegiatan->id);
            $countPemberianVit = PelayananIbu::detail_count_vitamin_a($dataKegiatan->id);
            $countUsia = PelayananIbu::detail_usia_kehamilan($dataKegiatan->id);
        }
        return inertia(
            'Admin/Dashboard/Index',
            compact(
                'stuntingPertahun',
                'count_stunting_perdusun',
                'countAnak',
                'countIbu',
                'countKegiatan',
                'countStunting',
                'countResiko',
                'countPosisi',
                'countImun',
                'countPemberianVit',
                'countUsia',
                'jumlah_stunting',
                'jumlah_pengidap_diare',
                'jumlah_pemberian_vit_a',
                'jumlah_pemberian_oralit',
                'countImunAnak',
                'jumlah_usia_anak',
            )
        );
    }
    public function store(Request $request)
    {

        return;
    }
    public function sow(Request $request)
    {

        return;
    }
    public function update(Request $request)
    {

        return;
    }
    public function delete(Request $request)
    {

        return;
    }
}
