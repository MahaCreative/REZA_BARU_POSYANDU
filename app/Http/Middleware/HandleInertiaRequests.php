<?php

namespace App\Http\Middleware;

use App\Models\Dusun;
use App\Models\JenisImunisasi;
use App\Models\JenisVaksin;
use App\Models\Pekerjaan;
use App\Models\Pendidikan;
use App\Models\SettingApps;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $setting = SettingApps::first();
        $dusun = Dusun::latest()->get();
        $roles = null;
        if ($request->user()) {
            $roles = $request->user()->getRoleNames()[0];
        }
        return [
            ...parent::share($request),
            'pekerjaan' => Pekerjaan::all(),
            'pendidikan' => Pendidikan::all(),
            'auth' => [
                'user' => $request->user(),
                'roles' => $roles,
            ],
            'settings' => $setting,
            'dusun' => $dusun,
            'imun_anak' => JenisImunisasi::where('kategori', 'anak')->latest()->get(),
            'vaksin_anak' => JenisVaksin::where('kategori', 'anak')->latest()->get(),
            'imun_ibu' => JenisImunisasi::where('kategori', 'ibu')->latest()->get(),
            'vaksin_ibu' => JenisVaksin::where('kategori', 'ibu')->latest()->get(),
            'dusun' => Dusun::all(),
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
