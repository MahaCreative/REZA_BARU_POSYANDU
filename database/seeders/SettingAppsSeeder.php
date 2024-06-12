<?php

namespace Database\Seeders;

use App\Models\SettingApps;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingAppsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        SettingApps::create([
            "nama_posyandu" => 'Mekar Posyandu',

            "alamat" => 'Jl. Diponegoro Kelurahan Karema Kecamatan Mamuju',
            "desa" => 'Pokkang',

            "kecamatan" => 'Pokkang',
            "nama_ketua_posyandu" => 'Reza Rahardian',
        ]);
    }
}
