<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PelayananIbu>
 */

use App\Models\DataIbu;
use App\Models\JenisVaksin;
use App\Models\JenisImunisasi;

class PelayananIbuFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $imunisasi = JenisImunisasi::where('kategori', '=', 'ibu')->get();
        $vaksin = JenisVaksin::where('kategori', '=', 'ibu')->get();
        $dataIbu = DataIbu::get();
        $posisi = ['kepala dibawah', 'posterior', 'melintang', 'sungsang'];
        $vitA = ['ya', 'tidak'];
        $resiko = ['tinggi', 'rendah'];
        return [
            'data_ibu_id' => $dataIbu[rand(1, count($dataIbu) - 1)]->id,
            'tinggi_badan' => rand(150, 180),
            'berat_badan' => rand(40, 90),
            'lingkar_lengan' => rand(14, 25),
            'lingkar_perut' => rand(30, 45),
            'tinggi_fundus' => rand(2, 10),
            'detak_jantung_janin' => rand(90, 110) . "/" . rand(0, 30),
            'tekanan_darah_ibu' => rand(90, 110) . "/" . rand(0, 30),
            'posisi_janin' => $posisi[rand(0, 3)],
            'pemberian_imunisasi' => $imunisasi[rand(0, count($imunisasi) - 1)]->nama_imunisasi,
            'pemberian_vaksin' => $vaksin[rand(0, count($vaksin) - 1)]->nama_imunisasi,

            'pemberian_vitamin_a' => $vitA[rand(0, 1)],
            'umur_kehamilan' => rand(0, 90),
            'resiko_kehamilan' => $resiko[rand(0, 1)],

        ];
    }
}
