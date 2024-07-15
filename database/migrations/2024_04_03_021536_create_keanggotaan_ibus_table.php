<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('keanggotaan_ibus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('data_ibu_id')->references('id')->on('data_ibus')->onDelete('cascade')->onUpdate('cascade');
            $table->string('kode_anggota', 16);
            $table->date('tanggal_pendaftaran');
            $table->integer('usia_kehamilan');
            $table->float('berat_badan');
            $table->integer('tinggi_badan');
            $table->date('hpht');
            $table->string('htp');
            $table->integer('hamil_ke');
            $table->string('foto_ktp')->default('image/preview_image.jpg');
            $table->string('foto_kk')->default('image/preview_image.jpg');
            $table->string('riwayat_penyakit')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('keanggotaan_ibus');
    }
};
