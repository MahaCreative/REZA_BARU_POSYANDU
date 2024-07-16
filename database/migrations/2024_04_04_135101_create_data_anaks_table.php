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
        Schema::create('data_anaks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('data_ibu_id')->references('id')->on('data_ibus')->onDelete('cascade')->onUpdate('cascade');
            $table->string('nama', 50);
            $table->string('tempat_lahir', 70);
            $table->date('tanggal_lahir');
            $table->string('jenis_kelamin');
            $table->string('gol_darah')->nullable();
            $table->string('proses_kelahiran');
            $table->string('berat_lahir');
            $table->string('tinggi_lahir');
            $table->string('dusun', 50);
            $table->string('foto')->default('image/preview_image.jpg');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_anaks');
    }
};
