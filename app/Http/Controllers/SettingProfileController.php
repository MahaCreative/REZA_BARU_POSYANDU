<?php

namespace App\Http\Controllers;

use App\Models\DataIbu;
use App\Models\DataKader;
use App\Models\Dusun;
use App\Models\User;
use Illuminate\Http\Request;

class SettingProfileController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user->getRoleNames()[0] == 'ibu') {
            $profile = DataIbu::where('user_id', $user->id)->first();
            $dusun = Dusun::latest()->get();
            return inertia('SettingProfile/Ibu', compact('user', 'profile', 'dusun'));
        } else {
            $profile = DataKader::where('user_id', $user->id)->first();
            return inertia('SettingProfile/Admin', compact('user', 'profile'));
        }
    }

    public function update_admin(Request $request)
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

    public function update_ibu(Request $request)
    {
        $attr = $request->validate([
            'nama_lengkap' => 'required|string|min:3',
            'nik' => 'required|numeric|digits:16',
            'tempat_lahir' => 'required|string|min:3',
            'tgl_lahir' => 'required',
            'gol_darah' => 'required',
            'alamat' => 'required|string|min:4',
            'desa' => 'required|string|min:4',
            'dusun' => 'required|string|min:4',
            'telephone' => 'required|numeric|digits:12',
            'pendidikan_id' => 'required',
            'pekerjaan_id' => 'required',

        ]);
        $dataIbu = DataIbu::findOrFail($request->id);
        if ($request->file('foto')) {
            $request->validate([
                'foto' => 'required|mimes:png,jpg,jpeg|image',
            ]);
            $attr['foto'] = $request->file('foto') ? $request->file('foto')->store('FotoIbu') : $dataIbu->foto;
        }
        if ($dataIbu->user != null) {

            if ($request->password) {
                $request->validate([
                    'password' => 'confirmed|required|min:6|alpha_dash'
                ]);
            }
            $dataIbu->user()->update([
                'name' => $request->nama_lengkap,
                'email' => $request->email,
                'password' => $request->password ? bcrypt($request->password) : $dataIbu->user->password
            ]);
            $attr['user_id'] = $dataIbu->user->id;
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
        $dataIbu->update($attr);
    }
}
