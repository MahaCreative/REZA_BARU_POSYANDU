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
        Schema::create('data_ibus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable();
            $table->string('nama_lengkap', 50);
            $table->string('nik', 16);
            $table->string('tempat_lahir', 50);
            $table->date('tgl_lahir');
            $table->string('gol_darah', 3);
            $table->string('alamat', 100);
            $table->string('dusun', 50);
            $table->string('telephone', 12);
            $table->string('pekerjaan', 50);
            $table->string('pendidikan',50);
            $table->string('foto')->default('image/preview_image.jpg');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_ibus');
    }
};
