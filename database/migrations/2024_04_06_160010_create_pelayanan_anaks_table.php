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
        Schema::create('pelayanan_anaks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('data_kegiatan_id')->references('id')->on('data_kegiatans')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('data_anak_id')->references('id')->on('data_anaks')->onDelete('cascade')->onUpdate('cascade');
            $table->string('usia_anak');
            $table->string('berat_badan_sebelumnya');
            $table->string('berat_badan_sekarang');
            $table->string('tinggi_badan_sebelumnya');
            $table->string('tinggi_badan_sekarang');
            $table->string('lingkar_lengan_sebelumnya');
            $table->string('lingkar_lengan_sekarang');
            $table->string('lingkar_kepala_sebelumnya');
            $table->string('lingkar_kepala_sekarang');

            $table->string('bb_u');
            $table->string('tb_u');
            $table->string('bb_tb');
            $table->string('imt_u')->nullable();
            $table->string('status_stunting');

            $table->string('mengidap_diare')->default('tidak ada');
            $table->string('pemberian_oralit')->default('tidak ada');
            $table->string('pemberian_vit_a')->default('tidak ada');
            $table->string('pemberian_imunisasi')->default('tidak ada');
            $table->string('pemberian_vaksin')->default('tidak ada');
            $table->string('nomor_imunisasi')->nullable();
            $table->string('nomor_vaksin')->nullable();
            $table->longText('nasihat')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pelayanan_anaks');
    }
};
