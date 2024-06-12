<?php

namespace Database\Factories;

use App\Models\DataIbu;
use App\Models\Dusun;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DataAnak>
 */
class DataAnakFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $jenkel = ['laki-laki', 'perempuan'];
        $proses = ['sesar', 'normal'];
        $gol = ['A-', 'A+', 'B-', 'B+', 'AB-', 'AB+', 'O-', 'O+',];
        $dusun = Dusun::latest()->get();
        return [

            'nama' => $this->faker->name(),
            'tempat_lahir' => $this->faker->word(1),
            'tanggal_lahir' => $this->faker->dateTimeBetween('-3 years', 'now'),
            'jenis_kelamin' => $jenkel[rand(0, 1)],
            'gol_darah' => $gol[rand(0, count($gol) - 1)],
            'proses_kelahiran' => $proses[rand(0, 1)],
            'berat_lahir' => rand(2.0, 10.0) . "kg",
            'tinggi_lahir' => rand(30, 100) . 'cm',
            'dusun' => $dusun[rand(1, count($dusun) - 1)]->nama_dusun,
        ];
    }
}
