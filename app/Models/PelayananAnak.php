<?php

namespace App\Models;

use Carbon\Carbon;
use DateTime;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class PelayananAnak extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function data_anak()
    {
        return $this->belongsTo(DataAnak::class);
    }
    public function kegiatan()
    {
        return $this->belongsTo(DataKegiatan::class, 'data_kegiatan_id');
    }

    public static function jumlah_jenis_kelamin($id_kegiatan = null)
    {
        $laki = static::where('jenis_kelamin', '=', 'laki-laki')->count();
        $perempuan = static::where('jenis_kelamin', 'perempuan')->count();
        $data = [
            ['jumlah' => $laki, 'kategori' => 'Laki-Laki'],
            ['jumlah' => $perempuan, 'kategori' => 'Perempuan']

        ];
        return $data;
    }
    public static function statistik_gol_anak($id_kegiatan = null)
    {
        $gol = ['A-', 'A+', 'B-', 'B+', 'AB-', 'AB+', 'O-', 'O+',];
        $data = array();
        foreach ($gol as $item) {
            $data[] = [
                'name' => $item,
                'y' => static::where('gol_darah', $item)->count(),
            ];
        }
        return $data;
    }
    public static function statistik_usia($id_kegiatan = null)
    {
        // $usia = ['0-3 bulan', '4-6 bulan', '7-12 bulan', '1 tahun +', '2 tahun +'];
        $query1 = static::query();
        $query2 = static::query();
        $query3 = static::query();
        $query4 = static::query();
        $query5 = static::query();
        $usia1 = 0;
        $usia2 = 0;
        $usia3 = 0;
        $usia4 = 0;
        $usia5 = 0;
        if ($id_kegiatan) {
            $query1->where('data_kegiatan_id', '=', $id_kegiatan);
            $query2->where('data_kegiatan_id', '=', $id_kegiatan);
            $query3->where('data_kegiatan_id', '=', $id_kegiatan);
            $query4->where('data_kegiatan_id', '=', $id_kegiatan);
            $query5->where('data_kegiatan_id', '=', $id_kegiatan);
        }
        $usia1 = $query1->where('usia_anak', '>=', 0)->where('usia_anak', '<=', 3)->count();
        $usia2 = $query2->where('usia_anak', '>=', 4)->where('usia_anak', '<=', 6)->count();
        $usia3 = $query3->where('usia_anak', '>=', 7)->where('usia_anak', '<=', 12)->count();
        $usia4 = $query4->where('usia_anak', '>=', 13)->where('usia_anak', '<=', 23)->count();
        $usia5 = $query5->where('usia_anak', '>=', 24)->count();
        return [
            $usia1,
            $usia2,
            $usia3,
            $usia4,
            $usia5,
        ];
    }
    public static function JumlahStunting($id_kegiatan = null)
    {

        $query1 = static::query();
        $query2 = static::query();
        $query3 = static::query();
        $query4 = static::query();
        if ($id_kegiatan) {
            $query1->where('data_kegiatan_id', '=', $id_kegiatan);
            $query2->where('data_kegiatan_id', '=', $id_kegiatan);
            $query3->where('data_kegiatan_id', '=', $id_kegiatan);
            $query4->where('data_kegiatan_id', '=', $id_kegiatan);
        }
        $tidak = $query1->where('status_stunting', '=', 'tidak')->count();
        $berisiko = $query1->where('status_stunting', '=', 'berisiko stunting')->count();
        $stunting = $query3->where('status_stunting', '=', 'stunting')->count();
        $sembuh = $query3->where('status_stunting', '=', 'sembuh')->count();

        return [
            ['kategori' => 'tidak', 'jumlah' => $tidak],
            ['kategori' => 'berisiko', 'jumlah' => $berisiko],
            ['kategori' => 'stunting', 'jumlah' => $stunting],
            ['kategori' => 'sembuh', 'jumlah' => $sembuh],

        ];
    }
    public static function jumlah_pengidap_diare($id_kegiatan = null)
    {

        $query1 = static::query();
        $query2 = static::query();

        if ($id_kegiatan) {
            $query1->where('data_kegiatan_id', '=', $id_kegiatan);
            $query2->where('data_kegiatan_id', '=', $id_kegiatan);
        }
        $tidak = $query1->where('mengidap_diare', '=', 'tidak')->count();
        $diare = $query2->where('mengidap_diare', '=', 'diare')->count();



        return [
            ['kategori' => 'tidak', 'jumlah' => $tidak],
            ['kategori' => 'diare', 'jumlah' => $diare],


        ];
    }
    public static function jumlah_pemberian_vit_a($id_kegiatan = null)
    {

        $query1 = static::query();
        $query2 = static::query();

        if ($id_kegiatan) {
            $query1->where('data_kegiatan_id', '=', $id_kegiatan);
            $query2->where('data_kegiatan_id', '=', $id_kegiatan);
        }
        $tidak = $query1->where('pemberian_vit_a', '=', 'tidak')->count();
        $ya = $query2->where('pemberian_vit_a', '=', 'ya')->count();


        return [
            ['kategori' => 'tidak', 'jumlah' => $tidak],
            ['kategori' => 'ya', 'jumlah' => $ya],


        ];
    }
    public static function jumlah_pemberian_oralit($id_kegiatan = null)
    {

        $query1 = static::query();
        $query2 = static::query();

        if ($id_kegiatan) {
            $query1->where('data_kegiatan_id', '=', $id_kegiatan);
            $query2->where('data_kegiatan_id', '=', $id_kegiatan);
        }
        $tidak = $query1->where('pemberian_oralit', '=', 'tidak')->count();
        $ya = $query2->where('pemberian_oralit', '=', 'ya')->count();


        return [
            ['kategori' => 'tidak', 'jumlah' => $tidak],
            ['kategori' => 'ya', 'jumlah' => $ya],


        ];
    }
    public static function detail_count_pos_vaksin($id_kegiatan = null)
    {

        $data = array();
        $data2 = array();
        $jenisVaksin = JenisVaksin::where('kategori', '=', 'anak')->get();
        $jenisImunisasi = jenisImunisasi::where('kategori', '=', 'anak')->get();


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

    public static function status_stunting_pertahun()
    {
        $startDate = now()->subYear()->startOfYear();
        $endDate = now()->endOfYear();

        // Mendapatkan data
        $data = DB::table('pelayanan_anaks')
            ->rightJoin('data_anaks', 'pelayanan_anaks.data_anak_id', '=', 'data_anaks.id')
            ->rightJoin('data_kegiatans', 'pelayanan_anaks.data_kegiatan_id', '=', 'data_kegiatans.id')
            ->selectRaw('data_anaks.dusun, MONTH(data_kegiatans.tanggal_kegiatan) AS month, pelayanan_anaks.status_stunting, COUNT(*) AS total')
            ->whereBetween('data_kegiatans.tanggal_kegiatan', [$startDate, $endDate])
            ->whereIn('pelayanan_anaks.status_stunting', ['tidak', 'berisiko', 'stunting', 'sembuh'])
            ->groupBy('data_anaks.dusun', DB::raw('MONTH(data_kegiatans.tanggal_kegiatan)'), 'pelayanan_anaks.status_stunting')
            ->orderBy('data_anaks.dusun')
            ->orderBy(DB::raw('MONTH(pelayanan_anaks.created_at)'))
            ->get();

        // Inisialisasi hasil dengan nol untuk setiap dusun dan bulan
        $result = [];
        foreach ($data as $row) {
            if (!isset($result[$row->dusun])) {
                $result[$row->dusun] = [];
            }
            if (!isset($result[$row->dusun][$row->month])) {
                $result[$row->dusun][$row->month] = [];
            }
            $result[$row->dusun][$row->month][$row->status_stunting] = $row->total;
        }

        // Mengisi bulan-bulan yang tidak memiliki data dengan nol
        for ($month = 1; $month <= 12; $month++) {
            foreach ($result as $dusun => $months) {
                if (!isset($result[$dusun][$month])) {
                    $result[$dusun][$month] = [
                        'tidak' => 0,
                        'berisiko' => 0,
                        'stunting' => 0,
                        'sembuh' => 0,
                    ];
                }
            }
        }

        return $result;
    }

    public static function count_status_stunting_perdusun()
    {
        $data = DB::table('pelayanan_anaks')
            ->join('data_anaks', 'pelayanan_anaks.data_anak_id', '=', 'data_anaks.id')
            ->select('data_anaks.dusun', 'pelayanan_anaks.status_stunting', DB::raw('count(*) as total'))
            ->whereIn('pelayanan_anaks.status_stunting', ['tidak', 'berisiko', 'stunting', 'sembuh'])
            ->groupBy('data_anaks.dusun', 'pelayanan_anaks.status_stunting')
            ->get();

        // Transform the data into a more readable format
        $result = [];
        foreach ($data as $row) {
            if (!isset($result[$row->dusun])) {
                $result[$row->dusun] = [
                    'tidak' => 0,
                    'berisiko' => 0,
                    'stunting' => 0,
                    'sembuh' => 0,
                ];
            }
            $result[$row->dusun][$row->status_stunting] = $row->total;
        }
        return $result;
    }
}
