<?php

namespace App\Models;

use Carbon\Carbon;
use DateTime;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Date;

class DataAnak extends Model
{

    use HasFactory;
    protected $guarded = [];

    public function pelayanan_anak()
    {
        return $this->hasMany(PelayananAnak::class, 'data_anak_id');
    }

    public function ibu()
    {
        return $this->belongsTo(DataIbu::class, 'data_ibu_id');
    }

    public static function jumlah_jenis_kelamin()
    {
        return [
            [
                'kategori' => 'Laki-laki',
                'jumlah' => DataAnak::where('jenis_kelamin', 'laki-laki')->count()
            ],
            [
                'kategori' => 'Perempuan',
                'jumlah' => DataAnak::where('jenis_kelamin', 'perempuan')->count()
            ],
        ];
    }
    public static function statistik_gol_anak($id_kegiatan = null)
    {
        $gol = ['A-', 'A+', 'B-', 'B+', 'AB-', 'AB+', 'O-', 'O+',];
        $data = array();
        $dataPr = array();
        foreach ($gol as $item) {
            $data[] = [
                'name' => $item,
                'y' => static::where('gol_darah', $item)->where('jenis_kelamin', 'laki-laki')->count(),
            ];
        }
        foreach ($gol as $item) {
            $dataPr[] = [
                'name' => $item,
                'y' => static::where('gol_darah', $item)->where('jenis_kelamin', 'perempuan')->count(),
            ];
        }
        return [
            ['kategori' => 'laki-laki', 'item' => $data],
            ['kategori' => 'perempuan', 'item' => $dataPr],
        ];
    }
    public static function statistik_usia($id_kegiatan = null)
    {
        $usia = ['0-3 bulan', '4-6 bulan', '7-12 bulan', '1 tahun +', '2 tahun +'];
        $categories = [
            '0-3 bulan' => [0, 3],
            '4-6 bulan' => [4, 6],
            '7-12 bulan' => [7, 12],
            '1 tahun +' => [13, 24],
            '2 tahun +' => [25, PHP_INT_MAX]
        ];

        $jumlahAnak_lk = [];
        $jumlahAnak_pr = [];

        foreach ($categories as $category => [$min, $max]) {
            $jumlahAnak_lk[] = self::whereBetween('tanggal_lahir', [
                Carbon::now()->subMonths($max)->startOfMonth(),
                Carbon::now()->subMonths($min)->endOfMonth()
            ])->where('jenis_kelamin', 'laki-laki')->count();
        }
        foreach ($categories as $category => [$min, $max]) {
            $jumlahAnak_pr[] = self::whereBetween('tanggal_lahir', [
                Carbon::now()->subMonths($max)->startOfMonth(),
                Carbon::now()->subMonths($min)->endOfMonth()
            ])->where('jenis_kelamin', 'perempuan')->count();
        }

        return [
            [
                'kategori' => 'laki-laki',
                'jumlah' => $jumlahAnak_lk
            ],
            [
                'kategori' => 'perempuan',
                'jumlah' => $jumlahAnak_pr
            ],

        ];
    }
}
