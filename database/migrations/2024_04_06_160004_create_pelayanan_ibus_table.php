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
        Schema::create('pelayanan_ibus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('data_kegiatan_id')->references('id')->on('data_kegiatans')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('data_ibu_id')->references('id')->on('data_ibus')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('tinggi_badan');
            $table->float('berat_badan');
            $table->integer('lingkar_lengan');
            $table->integer('lingkar_perut');
            $table->integer('tinggi_fundus');
            $table->string('detak_jantung_janin',5);
            $table->string('tekanan_darah_ibu',10);
            $table->string('posisi_janin',10);
            $table->string('pemberian_imunisasi',50)->default('tidak ada');
            $table->string('pemberian_vaksin',30)->default('tidak ada');
            $table->string('pemberian_vitamin_a',30)->default('tidak ada');
            $table->integer('umur_kehamilan');
            $table->string('resiko_kehamilan',50)->default('resiko kehamilan rendah');
            $table->string('tindakan',255)->nullable();
            $table->string('nasihat',255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pelayanan_ibus');
    }
};
