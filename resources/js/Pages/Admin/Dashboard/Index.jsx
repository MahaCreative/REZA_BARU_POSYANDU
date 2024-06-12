import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";
import StatistikStunting from "../DataStunting/StatistikStunting";
import CountCard from "@/Components/CountCard";
import { Face } from "@mui/icons-material";
import StatPelayananAnak from "../DataKegiatan/StatPelayananAnak";
import { usePage } from "@inertiajs/react";

export default function Index(props) {
    const { settings } = usePage().props;
    const stuntingPertahun = props.stuntingPertahun;
    const count_stunting_perdusun = props.count_stunting_perdusun;
    const countAnak = props.countAnak;
    const countIbu = props.countIbu;
    const countStunting = props.countStunting;
    const countKegiatan = props.countKegiatan;

    const countResiko = props.countResiko;
    const countPosisi = props.countPosisi;
    const countImun = props.countImun;
    const countPemberianVit = props.countPemberianVit;
    const countUsia = props.countUsia;
    const jumlah_stunting = props.jumlah_stunting;
    const jumlah_pengidap_diare = props.jumlah_pengidap_diare;
    const jumlah_pemberian_vit_a = props.jumlah_pemberian_vit_a;
    const jumlah_pemberian_oralit = props.jumlah_pemberian_oralit;
    const countImunAnak = props.countImunAnak;
    const jumlah_usia_anak = props.jumlah_usia_anak;
    return (
        <div>
            <div className="w-full bg-pink-500 text-white flex flex-col items-center justify-center py-3 rounded-lg">
                <img
                    src={"/storage/" + settings.logo}
                    alt=""
                    className="w-[50px] h-[50px] object-cover items-center bg-white rounded-full "
                />
                <h1 className="text-md md:text-lg lg:text-xl font-semibold my-1.4">
                    Selamat Datang Di Sistem Informasi {settings.nama_posyandu}
                </h1>
                <p className="text-sm font-light italic">{settings.alamat}</p>
            </div>
            <div className="my-3 grid grid-cols-2 md:grid-cols-4 gap-2">
                <CountCard
                    icon={<Face color="inherit" fontSize="inherit" />}
                    background={
                        "bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 "
                    }
                    title={"Data Ibu"}
                    count={countIbu}
                />
                <CountCard
                    icon={<Face color="inherit" fontSize="inherit" />}
                    background={
                        "bg-gradient-to-br from-green-900 via-green-800 to-green-600 "
                    }
                    title={"Data Anak"}
                    count={countAnak}
                />
                <CountCard
                    icon={<Face color="inherit" fontSize="inherit" />}
                    background={
                        "bg-gradient-to-br from-pink-900 via-pink-800 to-pink-600 "
                    }
                    title={"Data Kegiatan Pelayanan"}
                    count={countKegiatan}
                />
                <CountCard
                    icon={<Face color="inherit" fontSize="inherit" />}
                    background={
                        "bg-gradient-to-br from-red-900 via-red-800 to-red-600 "
                    }
                    title={"Data Pelayanan Terakhir Anak Stunting"}
                    count={countStunting}
                />
            </div>
            <div className="my-3">
                <StatistikStunting
                    count_stunting_perdusun={count_stunting_perdusun}
                    stuntingPertahun={stuntingPertahun}
                />
            </div>
            <div className="py-2 px-4 bg-white rounded-md">
                <StatPelayananAnak
                    countImunAnak={countImunAnak}
                    jumlah_stunting={jumlah_stunting}
                    jumlah_pemberian_vit_a={jumlah_pemberian_vit_a}
                    jumlah_pemberian_oralit={jumlah_pemberian_oralit}
                    jumlah_pengidap_diare={jumlah_pengidap_diare}
                    jumlah_usia_anak={jumlah_usia_anak}
                />
            </div>
        </div>
    );
}

Index.layout = (page) => <AdminLayout children={page} title="Dashboard" />;
