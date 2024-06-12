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
        Schema::create('setting_apps', function (Blueprint $table) {
            $table->id();
            $table->string('nama_posyandu');
            $table->string('logo')->default('Image/logo_posyandu.png');
            $table->string('alamat');
            $table->string('desa');

            $table->string('kecamatan');
            $table->string('nama_ketua_posyandu');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('setting_apps');
    }
};
