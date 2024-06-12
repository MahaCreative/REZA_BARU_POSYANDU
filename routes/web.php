<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\DataAnakController;
use App\Http\Controllers\DataDusunController;
use App\Http\Controllers\DataIbuController;
use App\Http\Controllers\KegiatanController;
use App\Http\Controllers\KeanggotaanIbuController;
use App\Http\Controllers\DataKaderController;
use App\Http\Controllers\JenisVaksinController;
use App\Http\Controllers\LaporanDataStuntingController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PelayananAnakController;
use App\Http\Controllers\PelayananIbuController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingAppsController;
use App\Http\Controllers\SettingProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\DataIbu;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware(['guest'])->group(function () {
    Route::get('', function () {
        return inertia('Login/Index');
    });
    Route::get('login', [LoginController::class, 'index'])->name('login');
    Route::post('login', [LoginController::class, 'login'])->name('store-login');
});

Route::middleware(['auth'])->group(function () {
    Route::get('setting-profile', [SettingProfileController::class, 'index'])->name('setting-profile');
    Route::post('update-setting-profile-admin', [SettingProfileController::class, 'update_admin'])->name('setting-profile-admin');
    Route::post('update-setting-profile-ibu', [SettingProfileController::class, 'update_ibu'])->name('setting-profile-ibu');
    Route::get('dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('logout', [LoginController::class, 'logout'])->name('logout');

    Route::get('show-pelayanan-ibu', [PelayananIbuController::class, 'show_per_ibu'])->name('show-pelayanan-ibu');
    Route::get('show-pelayanan-anak', [PelayananAnakController::class, 'show_per_anak'])->name('show-pelayanan-anak');
});
Route::middleware(['auth', 'role:ketua posyandu'])->group(function ($request) {
    Route::get('admin/setting-apps', [SettingAppsController::class, 'index'])->name('admin.setting-apps');
    Route::post('admin/setting-apps', [SettingAppsController::class, 'update'])->name('admin.update-setting-apps');
    Route::get('jenis-vaksin-imunisasi', [JenisVaksinController::class, 'index'])->name('admin.jenis-vaksin');
    Route::post('post-jenis-imunisasi', [JenisVaksinController::class, 'store'])->name('admin.post-jenis-imunisasi');
    Route::post('update-jenis-imunisasi', [JenisVaksinController::class, 'update'])->name('admin.update-jenis-imunisasi');
    Route::delete('delete-jenis-imunisasi', [JenisVaksinController::class, 'delete'])->name('admin.delete-jenis-imunisasi');

    Route::post('post-jenis-vaksin', [JenisVaksinController::class, 'store_vaksin'])->name('admin.post-jenis-vaksin');
    Route::post('update-jenis-vaksin', [JenisVaksinController::class, 'update_vaksin'])->name('admin.update-jenis-vaksin');
    Route::delete('delete-jenis-vaksin', [JenisVaksinController::class, 'delete_vaksin'])->name('admin.delete-jenis-vaksin');

    Route::get('data-kader', [DataKaderController::class, 'index'])->name('admin.data-kader');
    Route::get('form-data-kader', [DataKaderController::class, 'form'])->name('admin.form-data-kader');
    Route::get('form-update-data-kader', [DataKaderController::class, 'form_update'])->name('admin.form-update-data-kader');
    Route::post('post-data-kader', [DataKaderController::class, 'store'])->name('admin.post-data-kader');
    Route::post('update-data-kader', [DataKaderController::class, 'update'])->name('admin.update-data-kader');
    Route::delete('delete-data-kader', [DataKaderController::class, 'delete'])->name('admin.delete-data-kader');

    Route::get('data-dusun', [DataDusunController::class, 'index'])->name('admin.data-dusun');
    Route::post('store-data-dusun', [DataDusunController::class, 'store'])->name('admin.store-data-dusun');
    Route::post('delete-data-dusun', [DataDusunController::class, 'delete'])->name('admin.delete-data-dusun');
});

Route::middleware(['auth', 'role:kader posyandu'])->group(function () {

    Route::get('data-ibu', [DataIbuController::class, 'index'])->name('admin.data-ibu');
    Route::get('form-data-ibu', [DataIbuController::class, 'form_data_ibu'])->name('admin.form-data-ibu');
    Route::get('form-update-data-ibu', [DataIbuController::class, 'form_update_data_ibu'])->name('admin.form-update-data-ibu');
    Route::post('post-data-ibu', [DataIbuController::class, 'store'])->name('admin.post-data-ibu');
    Route::post('update-data-ibu', [DataIbuController::class, 'update'])->name('admin.update-data-ibu');
    Route::delete('delete-data-ibu', [DataIbuController::class, 'delete'])->name('admin.delete-data-ibu');

    Route::get('data-anak', [DataAnakController::class, 'index'])->name('admin.data-anak');
    Route::post('post-data-anak', [DataAnakController::class, 'store'])->name('admin.post-data-anak');
    Route::post('update-data-anak', [DataAnakController::class, 'update'])->name('admin.update-data-anak');
    Route::delete('delete-data-anak', [DataAnakController::class, 'delete'])->name('admin.delete-data-anak');
    Route::get('form-data-anak', [DataAnakController::class, 'form_data_anak'])->name('admin.form-data-anak');
    Route::get('form-update-data-anak', [DataAnakController::class, 'form_update_data_anak'])->name('admin.form-update-data-anak');


    Route::get('data-keanggotaan-ibu', [KeanggotaanIbuController::class, 'index'])->name('admin.data-keanggotaan-ibu');
    Route::get('form-keanggotaan-ibu', [KeanggotaanIbuController::class, 'form_keanggotaan_bu'])->name('admin.form-keanggotaan-ibu');
    Route::get('form-update-keanggotaan-ibu', [KeanggotaanIbuController::class, 'form_update_keanggotaan_bu'])->name('admin.form-update-keanggotaan-ibu');

    Route::post('post-data-keanggotaan-ibu', [KeanggotaanIbuController::class, 'store'])->name('admin.post-data-keanggotaan-ibu');
    Route::post('update-data-keanggotaan-ibu', [KeanggotaanIbuController::class, 'update'])->name('admin.update-data-keanggotaan-ibu');
    Route::delete('delete-data-keanggotaan-ibu', [KeanggotaanIbuController::class, 'delete'])->name('admin.delete-data-keanggotaan-ibu');

    Route::get('data-kegiatan', [KegiatanController::class, 'index'])->name('admin.data-kegiatan');
    Route::get('show-data-kegiatan', [KegiatanController::class, 'show'])->name('admin.show-data-kegiatan');
    Route::post('post-data-kegiatan', [KegiatanController::class, 'store'])->name('admin.post-data-kegiatan');
    Route::delete('delete-data-kegiatan', [KegiatanController::class, 'delete'])->name('admin.delete-data-kegiatan');
    Route::get('cetak-lapoaran-anak', [KegiatanController::class, 'cetak_lapoaran_anak'])->name('admin.cetak-lapoaran-anak');
    Route::get('cetak-lapoaran-ibu', [KegiatanController::class, 'cetak_lapoaran_ibu'])->name('admin.cetak-lapoaran-ibu');

    Route::get('create-pelayanan-anak/{kd_kegiatan}', [PelayananAnakController::class, 'create'])->name('admin.create-pelayanan-anak');
    Route::post('store-pelayanan-anak', [PelayananAnakController::class, 'store'])->name('admin.store-pelayanan-anak');
    Route::delete('delete-pelayanan-anak', [PelayananAnakController::class, 'delete'])->name('admin.delete-pelayanan-anak');
    Route::delete('delete-pelayanan-ibu', [PelayananAnakController::class, 'delete_ibu'])->name('admin.delete-pelayanan-ibu');

    Route::get('create-pelayanan-ibu/{kd_kegiatan}', [PelayananIbuController::class, 'create'])->name('admin.create-pelayanan-ibu');
    Route::post('store-pelayanan-ibu/', [PelayananIbuController::class, 'store'])->name('admin.store-pelayanan-ibu');

    Route::get('laporan-data-stunting', [LaporanDataStuntingController::class, 'index'])->name('admin.laporan-data-stunting');
});






Route::get('get-data-ibu', function (Request $request) {
    $query = DataIbu::query()->with('pekerjaan', 'pendidikan');
    if ($request->cari) {
        $query->where('nik', 'like', '%' . $request->cari . '%');
    }
    $dataAnak = $query->get();
    return response()->json($dataAnak);
});
