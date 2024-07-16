<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\DataIbu;
use App\Models\DataAnak;
use App\Models\DataKader;
use App\Models\DataKegiatan;
use App\Models\Dusun;
use App\Models\JenisImunisasi;
use App\Models\JenisVaksin;
use App\Models\KeanggotaanIbu;
use App\Models\PelayananAnak;
use App\Models\PelayananIbu;
use App\Models\SettingApps;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            PekerjaanSeeder::class,
            PendidikanSeeder::class,
            SettingAppsSeeder::class,
        ]);
        Role::create(['name' => 'ketua posyandu', 'guard_name' => 'web']);
        Role::create(['name' => 'kader posyandu', 'guard_name' => 'web']);
        Role::create(['name' => 'ibu', 'guard_name' => 'web']);
        $user = User::create([
            "name" => 'ketua posyandu',
            "email" => 'ketuaposyandu@gmail.com',
            "password" => bcrypt('password'),
        ]);
        $dataKader = DataKader::create([
            'user_id' => $user->id,
            "nama_lengkap" => 'ketua posyandu',
            "nik" => '7306071701980005',
            "tempat_lahir" => 'makassar',
            "tgl_lahir" => '1998-01-17',
            "alamat" => 'jl diponegoro kelurahan karema',
            "telephone" => '082194255174',
        ]);
        $user->assignRole('ketua posyandu');
        $user->assignRole('kader posyandu');
        Dusun::factory(4)->create();
        JenisVaksin::factory(4)->create();
        JenisImunisasi::factory(4)->create();
        // DataKader::factory(10)->create();
        DataIbu::factory(50)->create()->each(function ($ibu) {
            $ibu->keanggotaan()->saveMany(
                KeanggotaanIbu::factory(3)->make()
            );

            $ibu->anak()->saveMany(
                DataAnak::factory(3)->make()
            );
        });


        DataKegiatan::factory(5)->create()->each(function ($kegiatan) {
            $kegiatan->PelayananAnak()->saveMany(
                PelayananAnak::factory(10)->make()
            );
            $kegiatan->PelayananIbu()->saveMany(
                PelayananIbu::factory(10)->make()
            );
        });
    }
}
