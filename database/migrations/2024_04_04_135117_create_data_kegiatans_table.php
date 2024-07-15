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
        Schema::create('data_kegiatans', function (Blueprint $table) {
            $table->id();
            $table->string('kd_kegiatan',16);
            $table->string('status_kegiatan',50);
            $table->date('tanggal_kegiatan');
            $table->longText('catatan')->default();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_kegiatans');
    }
};
