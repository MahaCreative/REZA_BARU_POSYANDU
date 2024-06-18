<?php

namespace App\Http\Controllers;

use App\Models\DataIbu;
use App\Models\User;
use Illuminate\Http\Request;

class DataIbuController extends Controller
{
    public function index(Request $request)
    {
        $query = DataIbu::query()->with('pekerjaan', 'pendidikan', 'user');
        if ($request->cari) {
            $query->where('nama_lengkap', 'like', '%' . $request->cari . '%')->orWhere('nik', 'like', '%' . $request->cari . '%');
        }
        $dataIbu =  $query->get();
        return inertia("Admin/DataIbu/Index", compact('dataIbu'));
    }

    public function form_data_ibu(Request $request)
    {
        return inertia("Admin/DataIbu/ViewForm");
    }

    public function store(Request $request)
    {

        $attr = $request->validate([
            'nama_lengkap' => 'required|string|min:3',
            'nik' => 'required|numeric|unique:data_ibus,nik|digits:16',
            'tempat_lahir' => 'required|string|min:3',
            'tgl_lahir' => 'required',
            'gol_darah' => 'required',
            'alamat' => 'required|string|min:4',
            'desa' => 'required|string|min:4',
            'dusun' => 'required|string|min:4',
            'telephone' => 'required|numeric|digits:12|unique:data_ibus,telephone',
            'pendidikan_id' => 'required',
            'pekerjaan_id' => 'required',
            'foto' => 'required|mimes:png,jpeg,jpg|image',
        ]);
        if ($request->email != null or $request->password !== null) {

            $request->validate([
                'email' => 'email|required|unique:users,email',
                'password' => 'confirmed|required|min:6|alpha_dash'
            ]);

            $user = User::create([
                'name' => $request->nama_lengkap,
                'email' => $request->email,
                'password' => bcrypt($request->password),
            ]);
            $user->assignRole('ibu');
            $attr['user_id'] = $user->id;
        }
        if ($request->file('foto')) {
            $attr['foto'] = $request->file('foto')->store('FotoIbu', 'public');
        }

        $dataIbu = DataIbu::create($attr);
    }
    public function form_update_data_ibu(Request $request)
    {
        $dataIbu = DataIbu::with('pekerjaan', 'pendidikan', 'user')->findOrFail($request->id);
        return inertia("Admin/DataIbu/ViewForm", compact('dataIbu'));
    }

    public function update(Request $request)
    {

        $dataKader = DataIbu::with('user')->findOrFail($request->id);
        $attr = $request->validate([
            'nama_lengkap' => 'required|string|min:3',
            'nik' => 'required|digits:16|unique:data_kaders,nik,' . $request->id,
            'tempat_lahir' => 'required',
            'tgl_lahir' => 'required',
            'alamat' => 'required',
            'telephone' => 'required|numeric',

        ]);
        $foto = '';

        if ($request->hasFile('foto')) {
            $request->validate(['foto' => 'nullable|image|mimes:png,jpeg,jpeg',]);
            $foto = $request->file('foto')->store('FotoKader');
        }

        if ($dataKader->user != null) {

            if ($request->password) {
                $request->validate([
                    'password' => 'confirmed|required|min:6|alpha_dash'
                ]);
            }
            $dataKader->user()->update([
                'name' => $request->nama_lengkap,
                'email' => $request->email,
                'password' => $request->password ? bcrypt($request->password) : $dataKader->user->password
            ]);
            $attr['user_id'] = $dataKader->user->id;
        } else {

            if ($request->email != null or $request->password !== null) {
                $request->validate([
                    'email' => 'email|required',
                    'password' => 'confirmed|required|min:6|alpha_dash'
                ]);
            }
            if ($request->email !== null or $request->password !== null) {
                $user = User::create([
                    'name' => $request->nama_lengkap,
                    'email' => $request->email,
                    'password' => bcrypt($request->password),
                ]);
                $attr['user_id'] = $user->id;
            }
        }
        $dataKader->update($attr);
    }

    public function delete(Request $request)
    {
        $dataIbu = DataIbu::FindOrFail($request->id);
        $dataIbu->delete();
    }
}
