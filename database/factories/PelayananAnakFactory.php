<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

use App\Models\JenisVaksin;
use App\Models\JenisImunisasi;
use App\Models\DataAnak;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PelayananAnak>
 */
class PelayananAnakFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $bb_u = ['normal', 'kurang', 'sangat kurang', 'lebih'];
        $tb_u = ['tinggi', 'normal', 'pendek', 'sangat_pendek'];
        $bb_tb = ['gizi buruk', 'gizi kurang', 'gizi baik', 'gizi lebih', 'gizi obesitas'];
        $imt = ['gizi kurang', 'normal', 'over', 'obesitas'];
        $stunting = ['tidak', 'berisiko', 'stunting', 'sembuh'];
        $mengidap_diare = ['tidak', 'diare'];
        $oralit = ['tidak', 'ya'];
        $imunisasi = JenisImunisasi::where('kategori', '=', 'anak')->get();
        $vaksin = JenisVaksin::where('kategori', '=', 'anak')->get();
        $dataAnak = DataAnak::latest()->get();
        return [
            'usia_anak' => rand(0, 50),
            'data_anak_id' => $dataAnak[rand(0, count($dataAnak) - 1)]->id,
            'berat_badan_sebelumnya' => $beratSebe = rand(0, 10),
            'berat_badan_sekarang' => rand($beratSebe, $beratSebe + 5),
            'tinggi_badan_sebelumnya' => $tinggiSebe = rand(50, 100),
            'tinggi_badan_sekarang' => rand($tinggiSebe, $tinggiSebe + 20),
            'lingkar_lengan_sebelumnya' => $lenganSebe = rand(0, 15),
            'lingkar_lengan_sekarang' => rand($lenganSebe, $lenganSebe + 5),
            'lingkar_kepala_sebelumnya' => $kepalaSebe = rand(20, 30),
            'lingkar_kepala_sekarang' => rand($kepalaSebe, $kepalaSebe + 5),
            'bb_u' => $bb_u[rand(0, count($bb_u) - 1)],
            'tb_u' => $tb_u[rand(0, count($tb_u) - 1)],
            'bb_tb' => $bb_tb[rand(0, count($bb_tb) - 1)],
            'imt_u' => $imt[rand(0, count($imt) - 1)],
            'status_stunting' => $stunting[rand(0, 3)],
            'mengidap_diare' => $mengidap_diare[rand(0, 1)],
            'pemberian_oralit' => $oralit[rand(0, 1)],
            'pemberian_vit_a' => $oralit[rand(0, 1)],
            'pemberian_imunisasi' => $imunisasi[rand(0, count($imunisasi) - 1)]->nama_imunisasi,
            'pemberian_vaksin' => $vaksin[rand(0, count($vaksin) - 1)]->nama_imunisasi,
            'nomor_vaksin' => rand(0, 99999999),
            'nomor_imunisasi' => rand(0, 99999999),
        ];
    }
}
