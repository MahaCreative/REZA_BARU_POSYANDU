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
            $table->float('berat_badan_sebelumnya');
            $table->integer('berat_badan_sekarang');
            $table->integer('tinggi_badan_sebelumnya');
            $table->integer('tinggi_badan_sekarang');
            $table->integer('lingkar_lengan_sebelumnya');
            $table->integer('lingkar_lengan_sekarang');
            $table->integer('lingkar_kepala_sebelumnya');
            $table->integer('lingkar_kepala_sekarang');

            $table->string('bb_u',25);
            $table->string('tb_u',25);
            $table->string('bb_tb',25);
            $table->string('imt_u',25)->nullable();
            $table->string('status_stunting');

            $table->string('mengidap_diare',50)->default('tidak ada');
            $table->string('pemberian_oralit',50)->default('tidak ada');
            $table->string('pemberian_vit_a',50)->default('tidak ada');
            $table->string('pemberian_imunisasi',50)->default('tidak ada');
            $table->string('pemberian_vaksin',50)->default('tidak ada');
            $table->string('nomor_imunisasi',50)->nullable();
            $table->string('nomor_vaksin',50)->nullable();
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
