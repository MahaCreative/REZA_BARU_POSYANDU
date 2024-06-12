<?php

namespace App\Http\Controllers;

use App\Models\DataKegiatan;
use App\Models\{PelayananIbu, PelayananAnak};
use Illuminate\Http\Request;
use Carbon\Carbon;

class KegiatanController extends Controller
{
    public function index(Request $request)
    {
        $query = DataKegiatan::query()->with('pelayananIbu', 'pelayananAnak')->withCount('pelayananIbu', 'pelayananAnak');

        if ($request->dari_tanggal) {
            $query->where('tanggal_kegiatan', '>=', $request->dari_tanggal);
        }
        if ($request->sampai_tanggal) {
            $query->where('tanggal_kegiatan', '<=', $request->sampai_tanggal);
        }
        $dataKegiatan = $query->latest()->get();

        return inertia('Admin/DataKegiatan/Index', compact('dataKegiatan'));
    }

    public function store(Request $request)
    {

        $attr = $request->validate([
            'tanggal_kegiatan' => 'required|date|after:now',
            'catatan' => 'nullable|string',
        ]);

        $tanggalAkhir = Carbon::createFromFormat('Y-m-d', $request->tanggal_kegiatan)->endOfMonth();
        $cekKegiatan = DataKegiatan::whereBetween('tanggal_kegiatan', [$request->tanggal_kegiatan, $tanggalAkhir])->first();
        if ($cekKegiatan) {

            return redirect()->back()->withErrors(['message' => 'Sudah ada kegiatan yang ditambahkan bulan ini, anda tidak dapat lagi menambahkan kegiatan baru']);
        }
        $attr['kd_kegiatan'] = now()->format('ymd') . DataKegiatan::count() + 1;
        $attr['status_kegiatan'] = 'belum berlangsung';
        $dataKegiatan = DataKegiatan::create($attr);
    }

    public function delete(Request $request)
    {
        $dataKegiatan = DataKegiatan::findOrFail($request->id);
        $dataKegiatan->delete();
    }

    public function show(Request $request)
    {
        $dataKegiatan = DataKegiatan::where('kd_kegiatan', '=', $request->kd_kegiatan)->first();
        $pelayananAnak = $this->get_pelayanan_anak($request);
        $pelayananIbu = $this->get_pelayanan_ibu($request);



        $countResiko = PelayananIbu::detail_count_resiko($dataKegiatan->id);
        $countPosisi = PelayananIbu::detail_count_pos_janin($dataKegiatan->id);
        $countImun = PelayananIbu::detail_count_pos_vaksin($dataKegiatan->id);
        $countPemberianVit = PelayananIbu::detail_count_vitamin_a($dataKegiatan->id);
        $countUsia = PelayananIbu::detail_usia_kehamilan($dataKegiatan->id);

        // // get stati pelayanan ANak
        $jumlah_stunting = PelayananAnak::JumlahStunting($dataKegiatan->id);
        $jumlah_pengidap_diare = PelayananAnak::jumlah_pengidap_diare($dataKegiatan->id);
        $jumlah_pemberian_vit_a = PelayananAnak::jumlah_pemberian_vit_a($dataKegiatan->id);
        $jumlah_pemberian_oralit = PelayananAnak::jumlah_pemberian_oralit($dataKegiatan->id);
        $countImunAnak = PelayananAnak::detail_count_pos_vaksin($dataKegiatan->id);
        $jumlah_usia_anak = PelayananAnak::statistik_usia($dataKegiatan->id);
        // dd($jumlah_usia_anak);
        return inertia('Admin/DataKegiatan/Show', compact(
            'dataKegiatan',
            'countResiko',
            'countPosisi',
            'countImun',
            'countPemberianVit',
            'countUsia',
            'jumlah_stunting',
            'jumlah_pengidap_diare',
            'jumlah_pemberian_vit_a',
            'jumlah_pemberian_oralit',
            'countImunAnak',
            'jumlah_usia_anak',
            'pelayananAnak',
            'pelayananIbu'
        ));
    }

    public function cetak_lapoaran_anak(Request $request)
    {
        $dataKegiatan = DataKegiatan::findOrFail($request->id_kegiatan);
        $pelayananAnak = $this->get_pelayanan_anak($request);

        $paramsAnak = $request->paramsAnak;

        return inertia('Admin/DataKegiatan/Cetak/CetakLaporanAnak', compact('pelayananAnak', 'paramsAnak', 'dataKegiatan'));
    }

    public function cetak_lapoaran_ibu(Request $request)
    {

        $dataKegiatan = DataKegiatan::findOrFail($request->id_kegiatan);
        $pelayananIbu = $this->get_pelayanan_ibu($request);
        $params = $request->params;

        return inertia('Admin/DataKegiatan/Cetak/CetakLaporanIbu', compact('pelayananIbu', 'params', 'dataKegiatan'));
    }
    public function get_pelayanan_ibu($request)
    {
        $dataKegiatan = DataKegiatan::where('kd_kegiatan', '=', $request->kd_kegiatan)->first();
        $queryPelayananIbu = PelayananIbu::query()->with('ibu');
        if ($request->cari_ibu) {
            $queryPelayananIbu->whereHas('ibu', function ($q) use ($request) {
                $q->where('nama_lengkap', 'like', '%' . $request->cari_ibu . '%');
            });
        }
        if ($request->nama_dusun) {
            $queryPelayananIbu->whereHas('ibu', function ($q) use ($request) {
                $q->where('dusun', 'like', '%' . $request->nama_dusun . '%');
            });
        }
        if ($request->posisi_janin) {
            $queryPelayananIbu->where('posisi_janin', '=', $request->posisi_janin);
        }
        if ($request->resiko_kehamilan) {
            $queryPelayananIbu->where('resiko_kehamilan', '=', $request->resiko_kehamilan);
        }
        $pelayananIbu = $queryPelayananIbu->latest()->get();
        return $pelayananIbu;
    }
    public function get_pelayanan_anak($request)
    {
        $dataKegiatan = DataKegiatan::where('kd_kegiatan', '=', $request->kd_kegiatan)->first();
        $queryPelayananAnak = PelayananAnak::query()->where('data_kegiatan_id', $dataKegiatan->id)->with(['data_anak' => function ($q) {
            $q->with('ibu');
        }]);
        if ($request->nama_anak) {
            $queryPelayananAnak->whereHas('data_anak', function ($q) use ($request) {
                $q->where('nama', 'like', '%' . $request->nama_anak . '%');
            });
        }
        if ($request->nama_ibu) {
            $queryPelayananAnak->whereHas('data_anak.ibu', function ($q) use ($request) {
                $q->where('nama_lengkap', 'like', '%' . $request->nama_ibu . '%');
            });
        }
        if ($request->nama_dusun) {
            $queryPelayananAnak->whereHas('data_anak', function ($q) use ($request) {
                $q->where('dusun', 'like', '%' . $request->nama_dusun . '%');
            });
        }
        if ($request->status_stunting) {
            $queryPelayananAnak->where('status_stunting', '=', $request->status_stunting);
        }
        if ($request->bb_u) {
            $queryPelayananAnak->where('bb_u', '=', $request->bb_u);
        }
        if ($request->tb_u) {
            $queryPelayananAnak->where('tb_u', '=', $request->tb_u);
        }
        if ($request->bb_tb) {
            $queryPelayananAnak->where('bb_tb', '=', $request->bb_tb);
        }
        if ($request->imt_u) {
            $queryPelayananAnak->where('imt_u', '=', $request->imt_u);
        }
        return $queryPelayananAnak->latest()->get();
    }
}
