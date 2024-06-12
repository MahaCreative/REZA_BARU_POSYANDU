<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PelayananIbu extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function ibu()
    {
        return $this->belongsTo(DataIbu::class, 'data_ibu_id');
    }
    public function kegiatan()
    {
        return $this->belongsTo(DataKegiatan::class);
    }




    // function statistik

    public static function detail_count_resiko($id_kegiatan)
    {
        $kategori = ['rendah', 'tinggi'];
        $query = static::query();

        $rendah = static::where('data_kegiatan_id', '=', $id_kegiatan)->where('resiko_kehamilan', '=', 'rendah')->count();

        $tinggi =  static::where('data_kegiatan_id', '=', $id_kegiatan)->where('resiko_kehamilan', '=', 'rendah')->count();
        return [
            ['kategori' => 'rendah', 'jumlah' => $rendah],
            ['kategori' => 'tinggi', 'jumlah' => $tinggi],
        ];
    }

    public static function detail_count_pos_janin($id_kegiatan)
    {
        $kategori = ['kepala dibawah', 'posterior', 'melintang', 'sungsang'];

        $data = array();


        foreach ($kategori as $item) {
            $data[] = [
                'kategori' => $item,
                'jumlah' => static::where('data_kegiatan_id', '=', $id_kegiatan)->where('posisi_janin', '=', $item)->count(),
            ];
        }

        return $data;
    }

    public static function detail_count_pos_vaksin($id_kegiatan)
    {

        $data = array();
        $data2 = array();
        $jenisVaksin = JenisVaksin::where('kategori', '=', 'ibu')->get();
        $jenisImunisasi = jenisImunisasi::where('kategori', '=', 'ibu')->get();


        foreach ($jenisVaksin as $item) {
            $data[] = [
                'kategori' => $item->nama_imunisasi,
                'jumlah' => static::where('data_kegiatan_id', '=', $id_kegiatan)->where('pemberian_vaksin', $item->nama_imunisasi)->count(),
            ];
        }

        foreach ($jenisImunisasi as $item) {
            $data2[] = [
                'kategori' => $item->nama_imunisasi,
                'jumlah' => static::where('data_kegiatan_id', '=', $id_kegiatan)->where('pemberian_imunisasi', $item->nama_imunisasi)->count(),
            ];
        }

        return [
            'jumlah_imunisasi' => $data2,
            'jumlah_vaksin' => $data
        ];
    }

    public static function detail_count_vitamin_a($id_kegiatan)
    {
        $query = static::query();
        $data = array();

        $data = [

            [
                'kategori' => 'ya',
                'jumlah' => static::where('data_kegiatan_id', '=', $id_kegiatan)->where('pemberian_vitamin_a', '=', 'ya')->count()
            ],
            [
                'kategori' => 'tidak',
                'jumlah' => static::where('data_kegiatan_id', '=', $id_kegiatan)->where('pemberian_vitamin_a', '=', 'tidak')->count()
            ],
        ];

        return $data;
    }

    public static function detail_usia_kehamilan($id_kegiatan)
    {

        $kategori = ['0 - 1 Bulan', '2 - 3 Bulan', '4 - 6 bulan', '7 - 9 Bulan'];
        $data = static::where('data_kegiatan_id', '=', $id_kegiatan)->get();
        $usia1 = 0;
        $usia2 = 0;
        $usia3 = 0;
        $usia4 = 0;
        $usia5 = 0;
        foreach ($data as $item) {

            if ($item->umur_kehamilan >= 0 && $item->umur_kehamilan <= 4) {
                $usia1 += 1;
            } else if ($item->umur_kehamilan >= 5 && $item->umur_kehamilan <= 12) {
                $usia2 += 1;
            } else if ($item->umur_kehamilan >= 13 && $item->umur_kehamilan <= 24) {
                $usia3 += 1;
            } else if ($item->umur_kehamilan >= 25 && $item->umur_kehamilan <= 48) {
                $usia4 += 1;
            }
        }

        return [

            ['kategori' => $kategori[0], 'jumlah' => $usia1],
            ['kategori' => $kategori[1], 'jumlah' => $usia2],
            ['kategori' => $kategori[2], 'jumlah' => $usia3],
            ['kategori' => $kategori[3], 'jumlah' => $usia4],

        ];
    }
}
