import InputText from "@/Components/InputText";
import SelectOption from "@/Components/SelectOption";
import { useForm, usePage } from "@inertiajs/react";
import { InputAdornment, MenuItem } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";

export default function FormPelayanan({ model, setModel, kegiatan }) {
    const [menu, setMenu] = useState("form");
    const { imun_ibu } = usePage().props;
    const { vaksin_ibu } = usePage().props;
    const { data, setData, post, reset, errors } = useForm({
        data_kegiatan_id: kegiatan.id,

        tinggi_badan: "",
        berat_badan: "",
        lingkar_lengan: "",
        lingkar_perut: "",
        tinggi_fundus: "",
        detak_jantung_janin: "",
        tekanan_darah_ibu: "",
        posisi_janin: "",
        pemberian_imunisasi: "",
        pemberian_vaksin: "",
        nomor_imunisasi: "",
        nomor_vaksin: "",
        pemberian_vitamin_a: "",
        umur_kehamilan: "",
        resiko_kehamilan: "",
        tindakan: "",
        nasihat: "",
    });
    useEffect(() => {
        const hpht = new Date(
            model ? model?.keanggotaan[model.keanggotaan.length - 1].hpht : ""
        );
        const sekarang = new Date();
        const selisihHari = Math.floor(
            (sekarang - hpht) / (1000 * 60 * 60 * 24)
        );
        const minggu = Math.floor(selisihHari / 7);

        setData({
            ...data,
            umur_kehamilan: model ? minggu : 0,
            data_ibu_id: model ? model.id : "",
            tinggi_badan_sebelumnya: model
                ? model?.pelayanan_ibu.length > 0
                    ? model.pelayanan_ibu[model.pelayanan_ibu.length - 1]
                          .tinggi_badan
                    : 0
                : " ",
            berat_badan_sebelumnya: model
                ? model?.pelayanan_ibu.length > 0
                    ? model.pelayanan_ibu[model.pelayanan_ibu.length - 1]
                          .berat_badan
                    : 0
                : "",
            lingkar_lengan_sebelumnya: model
                ? model?.pelayanan_ibu.length > 0
                    ? model.pelayanan_ibu[model.pelayanan_ibu.length - 1]
                          .lingkar_lengan
                    : 0
                : "",
            lingkar_perut_sebelumnya: model
                ? model?.pelayanan_ibu.length > 0
                    ? model.pelayanan_ibu[model.pelayanan_ibu.length - 1]
                          .lingkar_perut
                    : 0
                : "",
            tinggi_fundus_sebelumnya: model
                ? model?.pelayanan_ibu.length > 0
                    ? model.pelayanan_ibu[model.pelayanan_ibu.length - 1]
                          .tinggi_fundus
                    : 0
                : "",
            detak_jantung_janin_sebelumnya: model
                ? model?.pelayanan_ibu.length > 0
                    ? model.pelayanan_ibu[model.pelayanan_ibu.length - 1]
                          .detak_jantung_janin
                    : 0
                : "",
            tekanan_darah_ibu_sebelumnya: model
                ? model?.pelayanan_ibu.length > 0
                    ? model.pelayanan_ibu[model.pelayanan_ibu.length - 1]
                          .tekanan_darah_ibu
                    : 0
                : "",
            posisi_janin_sebelumnya: model
                ? model?.pelayanan_ibu.length > 0
                    ? model.pelayanan_ibu[model.pelayanan_ibu.length - 1]
                          .posisi_janin
                    : 0
                : "",
            pemberian_imunisasi_sebelumnya: model
                ? model?.pelayanan_ibu.length > 0
                    ? model.pelayanan_ibu[model.pelayanan_ibu.length - 1]
                          .pemberian_imunisasi
                    : 0
                : "",
            pemberian_vaksin_sebelumnya: model
                ? model?.pelayanan_ibu.length > 0
                    ? model.pelayanan_ibu[model.pelayanan_ibu.length - 1]
                          .pemberian_vaksin
                    : 0
                : "",
            nomor_imunisasi_sebelumnya: model
                ? model?.pelayanan_ibu.length > 0
                    ? model.pelayanan_ibu[model.pelayanan_ibu.length - 1]
                          .nomor_imunisasi
                    : 0
                : "",
            nomor_vaksin_sebelumnya: model
                ? model?.pelayanan_ibu.length > 0
                    ? model.pelayanan_ibu[model.pelayanan_ibu.length - 1]
                          .nomor_vaksin
                    : 0
                : "",
            pemberian_vitamin_a_sebelumnya: model
                ? model?.pelayanan_ibu.length > 0
                    ? model.pelayanan_ibu[model.pelayanan_ibu.length - 1]
                          .pemberian_vitamin_a
                    : 0
                : "",
            umur_kehamilan_sebelumnya: model
                ? model?.pelayanan_ibu.length > 0
                    ? model.pelayanan_ibu[model.pelayanan_ibu.length - 1]
                          .umur_kehamilan
                    : 0
                : "",
            resiko_kehamilan_sebelumnya: model
                ? model?.pelayanan_ibu.length > 0
                    ? model.pelayanan_ibu[model.pelayanan_ibu.length - 1]
                          .resiko_kehamilan
                    : 0
                : "",
            tindakan_sebelumnya: model
                ? model?.pelayanan_ibu.length > 0
                    ? model.pelayanan_ibu[model.pelayanan_ibu.length - 1]
                          .tindakan
                    : 0
                : "",
            nasihat_sebelumnya: model
                ? model?.pelayanan_ibu.length > 0
                    ? model.pelayanan_ibu[model.pelayanan_ibu.length - 1]
                          .nasihat
                    : 0
                : "",
        });
    }, [model]);
    console.log(model);
    const submitHandler = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Tambah Pelayanan",
            text: "Apakah anda yakin ingin menambahkan data pelayanan?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Tambahkan",
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("admin.store-pelayanan-ibu"), {
                    preserveScroll: true,
                    onError: () => {
                        Swal.fire({
                            title: "Error",
                            text: "Gagal menambahkan data pelayanan ibu, silahkan periksa kembali isian anda?",
                            icon: "error",
                        });
                    },
                    onSuccess: () => {
                        setModel(null);
                        reset();
                        Swal.fire({
                            title: "Sukses",
                            text: "Berhasil menambahkan 1 data pelayanan ibu",
                            icon: "success",
                        });
                    },
                });
            }
        });
    };
    return (
        <div className="my-3 bg-white py-2 px-3">
            <div className="inline-block bg-white">
                <button
                    onClick={() => setMenu("form")}
                    className={`${
                        menu == "form" ? "bg-pink-500 text-white" : "text-black"
                    }  py-1 px-3`}
                >
                    Form Pelayanan
                </button>
                <button
                    onClick={() => setMenu("pemeriksaan-terakhir")}
                    className={`${
                        menu == "pemeriksaan-terakhir"
                            ? "bg-pink-500 text-white"
                            : "text-black"
                    }  py-1 px-3`}
                >
                    Lihat Hasil Pelayanan Terakhir
                </button>
            </div>
            <div
                className={`${menu == "pemeriksaan-terakhir" ? "" : "hidden"}`}
            >
                <h3 className="text-pink-500 font-bold border-b border-pink-500 inline-block  my-2">
                    Profile Ibu
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    <InputText
                        label={"Nama Lengkap"}
                        disabled
                        value={model ? model.nama_lengkap : ""}
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"NIK"}
                        disabled
                        value={model ? model.nik : ""}
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"Tempat Tanggal Lahir"}
                        disabled
                        value={
                            model
                                ? model.tempat_lahir + " " + model.tanggal_lahir
                                : ""
                        }
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"HPHT"}
                        disabled
                        value={
                            model
                                ? model.keanggotaan[
                                      model.keanggotaan.length - 1
                                  ].hpht
                                : ""
                        }
                        className="bg-white w-full"
                    />
                </div>
                <h3 className="text-pink-500 font-bold border-b border-pink-500 inline-block  my-2">
                    Hasil Pemeriksaan Terakhir
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    <InputText
                        label={"Berat Badan Sebelumnya"}
                        disabled
                        value={data.berat_badan_sebelumnya}
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"Tinggi Badan Sebelumnya"}
                        disabled
                        value={data.tinggi_badan_sebelumnya}
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"Lingkar Lengan Sebelumnya"}
                        disabled
                        value={data.lingkar_lengan_sebelumnya}
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"Lingkar Perut Sebelumnya"}
                        disabled
                        value={data.lingkar_perut_sebelumnya}
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"Tinggi Fundus"}
                        disabled
                        value={data.tinggi_fundus_sebelumnya}
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"Detak Jantung Janin"}
                        disabled
                        value={data.detak_jantung_janin_sebelumnya}
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"Tekanan Darah Ibu"}
                        disabled
                        value={data.tekanan_darah_ibu_sebelumnya}
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"Posisi Janin"}
                        disabled
                        value={data.posisi_janin_sebelumnya}
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"Pemberian Imunisasi"}
                        disabled
                        value={data.pemberian_imunisasi_sebelumnya}
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"Pemberian Vaksin"}
                        disabled
                        value={data.pemberian_vaksin_sebelumnya}
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"Resiko Kehamilan"}
                        disabled
                        value={data.resiko_kehamilan_sebelumnya}
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"Pemberian Vitamin A"}
                        disabled
                        value={data.pemberian_vitamin_a_sebelumnya}
                        className="bg-white w-full"
                    />
                </div>
            </div>
            <form
                onSubmit={submitHandler}
                className={`${menu == "form" ? "" : "hidden"}`}
            >
                <h3 className="text-pink-500 font-bold border-b border-pink-500 inline-block  my-2">
                    Profile Ibu
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    <InputText
                        label={"Nama Lengkap"}
                        disabled
                        value={model ? model.nama_lengkap : ""}
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"NIK"}
                        disabled
                        value={model ? model.nik : ""}
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"Tempat Tanggal Lahir"}
                        disabled
                        value={
                            model
                                ? model.tempat_lahir + " " + model.tanggal_lahir
                                : ""
                        }
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"HPHT"}
                        disabled
                        value={
                            model
                                ? model.keanggotaan[
                                      model.keanggotaan.length - 1
                                  ].hpht
                                : ""
                        }
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"Usia Kehamilan (minggu)"}
                        disabled
                        value={data.umur_kehamilan}
                        className="bg-white w-full"
                    />
                </div>
                <h3 className="text-pink-500 font-bold border-b border-pink-500 inline-block  my-2">
                    Form Pelayanan Ibu
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    <InputText
                        className="bg-white w-full"
                        label={"Tinggi Badan (Cm)"}
                        name="tinggi_badan"
                        error={errors.tinggi_badan}
                        value={data.tinggi_badan}
                        type="number"
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <InputText
                        className="bg-white w-full"
                        label={"Berat Badan (Kg)"}
                        name="berat_badan"
                        error={errors.berat_badan}
                        value={data.berat_badan}
                        type="number"
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <InputText
                        className="bg-white w-full"
                        label={"Lingkar Lengan (Cm)"}
                        name="lingkar_lengan"
                        error={errors.lingkar_lengan}
                        value={data.lingkar_lengan}
                        type="number"
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <InputText
                        className="bg-white w-full"
                        label={"Lingkar Perut (Cm)"}
                        name="lingkar_perut"
                        error={errors.lingkar_perut}
                        value={data.lingkar_perut}
                        type="number"
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <InputText
                        className="bg-white w-full"
                        label={"Tinggi Fundus (Cm)"}
                        name="tinggi_fundus"
                        error={errors.tinggi_fundus}
                        value={data.tinggi_fundus}
                        type="number"
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <InputText
                        className="bg-white w-full"
                        label={"Detak Jantung Janin"}
                        name="detak_jantung_janin"
                        error={errors.detak_jantung_janin}
                        value={data.detak_jantung_janin}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <InputText
                        className="bg-white w-full"
                        label={"Tekanan Darah Ibu"}
                        name="tekanan_darah_ibu"
                        error={errors.tekanan_darah_ibu}
                        value={data.tekanan_darah_ibu}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <SelectOption
                        className="bg-white w-full capitalize"
                        label={"Posisi Janin"}
                        name="posisi_janin"
                        error={errors.posisi_janin}
                        value={data.posisi_janin}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    >
                        <MenuItem value={""} selected disabled>
                            Pilih Posisi Janin
                        </MenuItem>
                        <MenuItem value={"kepala dibawah"}>
                            kepala dibawah
                        </MenuItem>
                        <MenuItem value={"posterior"}>posterior</MenuItem>
                        <MenuItem value={"melintang"}>melintang</MenuItem>
                        <MenuItem value={"sunsang"}>sunsang</MenuItem>
                    </SelectOption>
                    <SelectOption
                        className="bg-white w-full capitalize"
                        label={"Pemberian Imunisasi"}
                        name="pemberian_imunisasi"
                        error={errors.pemberian_imunisasi}
                        value={data.pemberian_imunisasi}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    >
                        <MenuItem value={""} selected disabled>
                            Pilih Jenis Imunisasi
                        </MenuItem>
                        {imun_ibu.map((item, key) => (
                            <MenuItem value={item.nama_imunisasi}>
                                {item.nama_imunisasi}
                            </MenuItem>
                        ))}
                    </SelectOption>
                    <SelectOption
                        className="bg-white w-full capitalize"
                        label={"Pemberian Vaksin"}
                        name="pemberian_vaksin"
                        error={errors.pemberian_vaksin}
                        value={data.pemberian_vaksin}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    >
                        <MenuItem value={""} selected disabled>
                            Pilih Jenis Vaksin
                        </MenuItem>
                        {vaksin_ibu.map((item, key) => (
                            <MenuItem value={item.nama_imunisasi}>
                                {item.nama_imunisasi}
                            </MenuItem>
                        ))}
                    </SelectOption>
                    <SelectOption
                        className="bg-white w-full capitalize"
                        label={"Pemberian Vitamin A"}
                        name="pemberian_vitamin_a"
                        error={errors.pemberian_vitamin_a}
                        value={data.pemberian_vitamin_a}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    >
                        <MenuItem value={""} selected disabled>
                            Pilih Status Pemberian Vitamin
                        </MenuItem>
                        <MenuItem value="tidak">tidak</MenuItem>
                        <MenuItem value="ya">ya</MenuItem>
                    </SelectOption>
                    <SelectOption
                        className="bg-white w-full capitalize"
                        label={"Resiko Kehamilan"}
                        name="resiko_kehamilan"
                        error={errors.resiko_kehamilan}
                        value={data.resiko_kehamilan}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    >
                        <MenuItem value={""} selected disabled>
                            Pilih Status Resiko Kehamilan
                        </MenuItem>
                        <MenuItem value="rendah">rendah</MenuItem>
                        <MenuItem value="tinggi">tinggi</MenuItem>
                    </SelectOption>
                </div>
                <InputText
                    className="bg-white w-full"
                    label={"Tindakan"}
                    name="tindakan"
                    error={errors.tindakan}
                    value={data.tindakan}
                    onChange={(e) =>
                        setData({
                            ...data,
                            [e.target.name]: e.target.value,
                        })
                    }
                />
                <InputText
                    className="bg-white w-full"
                    label={"Nasehat"}
                    name="nasihat"
                    error={errors.nasihat}
                    value={data.nasihat}
                    onChange={(e) =>
                        setData({
                            ...data,
                            [e.target.name]: e.target.value,
                        })
                    }
                />
                <button className="my-3 bg-blue-500 py-2 px-4 text-white">
                    Submit
                </button>
            </form>
        </div>
    );
}
