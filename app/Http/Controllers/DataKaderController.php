<?php

namespace App\Http\Controllers;

use App\Models\DataKader;
use App\Models\User;
use Illuminate\Http\Request;

class DataKaderController extends Controller
{
    public function index(Request $request)
    {

        $query = DataKader::query();
        if ($request->cari) {
            $query->where('nama_lengkap', 'like', '%' . $request->cari . '%')->orWhere('nik', 'like', '%' . $request->cari . '%');
        }
        $dataKader = $query->latest()->get();
        return inertia('Admin/DataKader/Index', compact('dataKader'));
    }
    public function form(Request $request)
    {
        return inertia("Admin/DataKader/ViewForm");
    }

    public function store(Request $request)
    {

        $attr = $request->validate([
            'nama_lengkap' => 'required|string|min:3',
            'nik' => 'required|digits:16|unique:data_kaders,nik',
            'tempat_lahir' => 'required',
            'tgl_lahir' => 'required',
            'alamat' => 'required',
            'telephone' => 'required|numeric|unique:data_kaders,telephone',
            'foto' => 'nullable',
        ]);
        if ($request->email != null or $request->password !== null) {
            $request->validate([
                'email' => 'email|required',
                'password' => 'confirmed|required|min:6|alpha_dash'
            ]);
            $user = User::create([
                'name' => $request->nama_lengkap,
                'email' => $request->email,
                'password' => bcrypt($request->password),
            ]);
            $attr['user_id'] = $user->id;
            $user->assignRole('kader posyandu');
        }
        if ($request->hasFile('foto')) {
            $request->validate(['foto' => 'nullable|image|mimes:png,jpeg,jpeg',]);
            $foto = $request->file('foto')->store('FotoKader');
            $attr['foto'] = $foto;
        } else {
            $attr['foto'] = 'Image/profile.png';
        }


        $dataKader = DataKader::create($attr);
    }

    public function form_update(Request $request)
    {

        $dataKader = DataKader::with('user')->where('id', '=', $request->id)->first();
        return inertia("Admin/DataKader/ViewForm", compact('dataKader'));
    }

    public function update(Request $request)
    {
        $dataKader = DataKader::with('user')->findOrFail($request->id);
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
        $dataKader = DataKader::with('user')->findOrFail($request->id);
        if ($dataKader->user) {
            $dataKader->user()->delete();
        }
        $dataKader->delete();
    }
}
