<?php

namespace App\Http\Controllers;

use App\Models\DataAnak;
use Illuminate\Http\Request;

class DataAnakController extends Controller
{
    public function index(Request $request)
    {
        $query = DataAnak::query()->with('ibu');
        if ($request->cari) {
            $query->where('nama', 'like', '%' . $request->cari . '%');
        }
        $dataAnak = $query->get();
        $jumlahKelamin = DataAnak::jumlah_jenis_kelamin();
        $statistikDarah = DataAnak::statistik_gol_anak();
        $statistikUsia = DataAnak::statistik_usia();
        // dd($statistikDarah);
        return inertia('Admin/DataAnak/Index', compact('dataAnak', 'jumlahKelamin', 'statistikUsia', 'statistikDarah'));
    }

    public function form_data_anak(Request $request)
    {
        return inertia('Admin/DataAnak/ViewForm');
    }

    public function form_update_data_anak(Request $request)
    {
        $dataAnak = DataAnak::with(['ibu' => function ($q) {
            $q->with('pekerjaan', 'pendidikan');
        }])->findOrFail($request->id);
        return inertia('Admin/DataAnak/ViewForm', compact('dataAnak'));
    }

    public function store(Request $request)
    {

        $attr = $request->validate([
            'nama' => "required|min:3|string",
            'tempat_lahir' => "required|min:3",
            'tanggal_lahir' => "required|date",
            'jenis_kelamin' => "required|in:laki-laki,perempuan",
            'gol_darah' => "nullable",
            'proses_kelahiran' => "required|in:sesar,normal",
            'berat_lahir' => "required",
            'tinggi_lahir' => "required",
            'data_ibu_id' => "required",
            'foto' => 'required|image|mimes:jpg,jpeg,png',
            'dusun' => 'required',
        ]);
        $request->validate([
            'nama_lengkap_ibu' => "required",
            'nik_ibu' => "required",
            'pekerjaan_ibu' => "required",
            'pendidikan_ibu' => "required",
            'alamat_ibu' => "required",
            'telephone_ibu' => "required",
        ]);
        if ($request->hasFile('foto')) {
            $attr['foto'] = $request->file('foto')->store('DataAnak');
        }

        $data = DataAnak::create($attr);
    }

    public function update(Request $request)
    {
        $attr = $request->validate([
            'nama' => "required|min:3|string",
            'tempat_lahir' => "required|min:3",
            'tanggal_lahir' => "required|date",
            'jenis_kelamin' => "required|in:laki-laki,perempuan",
            'gol_darah' => "nullable",
            'proses_kelahiran' => "required|in:sesar,normal",
            'berat_lahir' => "required",
            'tinggi_lahir' => "required",
            'data_ibu_id' => "required",
            'foto' => 'nullable|image|mimes:jpg,jpeg,png'

        ]);

        $dataAnak = DataAnak::findOrFail($request->id);
        if ($request->hasFile('foto')) {
            $request->validate([
                'foto' => 'nullable|image|mimes:jpg,jpeg,png'
            ]);
            $attr['foto'] = $request->file('foto') ? $request->file('foto')->store('Dataanak') : $dataAnak->foto;
        }
        $dataAnak->update($attr);
    }

    public function delete(Request $request)
    {
        $dataAnak = DataAnak::findOrFail($request->id);
        $dataAnak->delete();
    }
}
