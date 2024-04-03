<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\DataIbu;
use App\Models\DataKader;
use App\Models\JenisImunisasi;
use App\Models\JenisVaksin;
use Illuminate\Database\Seeder;

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
        ]);
        JenisVaksin::factory(4)->create();
        JenisImunisasi::factory(4)->create();
        DataKader::factory(10)->create();
        DataIbu::factory(10)->create();
    }
}
