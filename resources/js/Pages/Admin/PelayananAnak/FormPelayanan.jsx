import InputText from "@/Components/InputText";
import SelectOption from "@/Components/SelectOption";
import { useForm, usePage } from "@inertiajs/react";
import { MenuItem } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function FormPelayanan({ model, setModel, kegiatan }) {
    const { imun_anak } = usePage().props;
    const { vaksin_anak } = usePage().props;
    const { data, setData, post, reset, errors } = useForm({
        data_kegiatan_id: kegiatan?.id,
        kd_kegiatan: kegiatan?.kd_kegiatan,
        tanggal_kegiatan: kegiatan?.tanggal_kegiatan,
        data_anak_id: "",
        usia_anak: "",
        berat_badan_sebelumnya: "",
        berat_badan_sekarang: "",
        tinggi_badan_sebelumnya: "",
        tinggi_badan_sekarang: "",
        lingkar_lengan_sebelumnya: "",
        lingkar_lengan_sekarang: "",
        lingkar_kepala_sebelumnya: "",
        lingkar_kepala_sekarang: "",
        bb_u: "",
        tb_u: "",
        bb_tb: "",
        imt_u: "",
        status_stunting: "",
        mengidap_diare: "",
        pemberian_oralit: "",
        pemberian_vit_a: "",
        pemberian_imunisasi: "",
        pemberian_vaksin: "",
        nomor_imunisasi: "",
        nomor_vaksin: "",
        nasihat: "",
    });
    useEffect(() => {
        const birthDate = new Date(model?.tanggal_lahir);
        const today = new Date();

        const yearsDifference = today.getFullYear() - birthDate.getFullYear();
        const monthsDifference = today.getMonth() - birthDate.getMonth();
        let totalMonths = yearsDifference * 12 + monthsDifference;

        // Jika tanggal hari ini belum mencapai tanggal lahir bulan ini, kurangi 1 bulan
        if (today.getDate() < birthDate.getDate()) {
            totalMonths - 1;
        }
        // Hitung total bulan
        console.log(totalMonths);
        setData({
            ...data,
            data_anak_id: model ? model.id : "",
            data_kegiatan_id: kegiatan.id,
            usia_anak: model ? totalMonths : "",
            berat_badan_sebelumnya: model
                ? model.pelayanan_anak.length > 0
                    ? model.pelayanan_anak[0].berat_badan_sekarang
                    : "Belum Pernah Mendapatkan Pelayanan"
                : "",
            tinggi_badan_sebelumnya: model
                ? model.pelayanan_anak.length > 0
                    ? model.pelayanan_anak[0].tinggi_badan_sekarang
                    : "Belum Pernah Mendapatkan Pelayanan"
                : "",
            lingkar_lengan_sebelumnya: model
                ? model.pelayanan_anak.length > 0
                    ? model.pelayanan_anak[0].tinggi_badan_sekarang
                    : "Belum Pernah Mendapatkan Pelayanan"
                : "",
            lingkar_kepala_sebelumnya: model
                ? model.pelayanan_anak.length > 0
                    ? model.pelayanan_anak[0].tinggi_badan_sekarang
                    : "Belum Pernah Mendapatkan Pelayanan "
                : "",
            bb_u_sebelumnya: model
                ? model.pelayanan_anak.length > 0
                    ? model.pelayanan_anak[0].bb_u
                    : "Belum pernah mendapatkan pelayanan"
                : "",
            tb_u_sebelumnya: model
                ? model.pelayanan_anak.length > 0
                    ? model.pelayanan_anak[0].tb_u
                    : "Belum pernah mendapatkan pelayanan"
                : "",
            bb_tb_sebelumnya: model
                ? model.pelayanan_anak.length > 0
                    ? model.pelayanan_anak[0].bb_tb
                    : "Belum pernah mendapatkan pelayanan"
                : "",
            imt_u_sebelumnya: model
                ? model.pelayanan_anak.length > 0
                    ? model.pelayanan_anak[0].imt_u
                    : "Belum pernah mendapatkan pelayanan"
                : "",
            status_stunting_sebelumnya: model
                ? model.pelayanan_anak.length > 0
                    ? model.pelayanan_anak[0].status_stunting
                    : "Belum Pernah Mendapatkan Pelayanan"
                : "",

            mengidap_diare_sebelumnya: model
                ? model.pelayanan_anak.length > 0
                    ? model.pelayanan_anak[0].mengidap_diare
                    : "Belum Pernah Mendapatkan Pelayanan"
                : "",

            pemberian_oralit_sebelumnya: model
                ? model.pelayanan_anak.length > 0
                    ? model.pelayanan_anak[0].pemberian_oralit
                    : "Belum Pernah Mendapatkan Pelayanan"
                : "",

            pemberian_vit_a_sebelumnya: model
                ? model.pelayanan_anak.length > 0
                    ? model.pelayanan_anak[0].pemberian_vit_a
                    : "Belum Pernah Mendapatkan Pelayanan"
                : "",

            pemberian_imunisasi_sebelumnya: model
                ? model.pelayanan_anak.length > 0
                    ? model.pelayanan_anak[0].pemberian_imunisasi
                    : "Belum Pernah Mendapatkan Pelayanan"
                : "",
            pemberian_vaksin_sebelumnya: model
                ? model.pelayanan_anak.length > 0
                    ? model.pelayanan_anak[0].pemberian_vaksin
                    : "Belum Pernah Mendapatkan Pelayanan"
                : "",
        });
    }, [model]);
    const [menu, setMenu] = useState("form");
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
                post(route("admin.store-pelayanan-anak"), {
                    preserveScroll: true,
                    onError: () => {
                        Swal.fire({
                            title: "Error",
                            text: "Gagal menambahkan data pelayanan anak, silahkan periksa kembali isian anda?",
                            icon: "error",
                        });
                    },
                    onSuccess: () => {
                        setModel(null);
                        reset();
                        Swal.fire({
                            title: "Sukses",
                            text: "Berhasil menambahkan 1 data pelayanan anak",
                            icon: "success",
                        });
                    },
                });
            }
        });
    };
    console.log(model);
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
            {/* Informasi Pemeriksaan Terakhir */}
            <div
                className={`${menu == "pemeriksaan-terakhir" ? "" : "hidden"}`}
            >
                <h3 className="text-pink-500 font-bold border-b border-pink-500 inline-block  my-2">
                    Profile Anak
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    <InputText
                        label={"Nama Anak"}
                        disabled
                        value={model ? model.nama : ""}
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"Nama Ibu"}
                        disabled
                        value={model ? model.ibu.nama_lengkap : ""}
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
                        label={"Usia Anak"}
                        disabled
                        value={data.usia_anak + " Bulan"}
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"Jenis Kelamin"}
                        disabled
                        value={model?.jenis_kelamin}
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"Gol Darah"}
                        disabled
                        value={model?.gol_darah}
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"Dusun"}
                        disabled
                        value={model?.dusun}
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"Tinggi Lahir"}
                        disabled
                        vavalueue={model?.tinggi_lahir + " Cm"}
                        className="bg-white w-full"
                    />
                </div>
                <h3 className="text-pink-500 font-bold border-b border-pink-500 inline-block  my-2">
                    Informasi Pemeriksaan Terakhir
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
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
                        label={"Lingkar Kepala Sebelumnya"}
                        disabled
                        value={data.lingkar_kepala_sebelumnya}
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"BB/U Sebelumnya"}
                        disabled
                        value={data.bb_u_sebelumnya}
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"TB/U Sebelumnya"}
                        disabled
                        value={data.tb_u_sebelumnya}
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"IMT/U Sebelumnya"}
                        disabled
                        value={data.imt_u_sebelumnya}
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"BB/TB Sebelumnya"}
                        disabled
                        value={data.bb_tb_sebelumnya}
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"Status Stunting Sebelumnya"}
                        disabled
                        value={data.status_stunting_sebelumnya}
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"Status Mengida Diare Sebelumnya"}
                        disabled
                        value={data.mengidap_diare_sebelumnya}
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"Status Pemberian Oralit Sebelumnya"}
                        disabled
                        value={data.pemberian_oralit_sebelumnya}
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"Status Pemberian Vit A Sebelumnya"}
                        disabled
                        value={data.pemberian_vit_a_sebelumnya}
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"Status Pemberian Imunisasi Sebelumnya"}
                        disabled
                        value={data.pemberian_imunisasi_sebelumnya}
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"Status Pemberian Vaksin Sebelumnya"}
                        disabled
                        value={data.pemberian_vaksin_sebelumnya}
                        className="bg-white w-full"
                    />
                </div>
            </div>

            <form
                onSubmit={submitHandler}
                action=""
                className={`${menu == "form" ? "" : "hidden"} my-3`}
            >
                <h3 className="text-pink-500 font-bold border-b border-pink-500 inline-block">
                    Form Data Pelayanan Anak
                </h3>
                <div className="flex gap-3">
                    <InputText
                        label={"Kode Kegiatan"}
                        disabled
                        value={data.kd_kegiatan}
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"Tanggal Kegiatan"}
                        disabled
                        value={data.tanggal_kegiatan}
                        className="bg-white w-full"
                    />
                </div>
                <h3 className="text-pink-500 font-bold border-b border-pink-500 inline-block  my-2">
                    Profile Anak
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    <InputText
                        label={"Nama Anak"}
                        disabled
                        value={model ? model.nama : ""}
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"Nama Ibu"}
                        disabled
                        value={model ? model.ibu.nama_lengkap : ""}
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
                        label={"Usia Anak"}
                        disabled
                        value={data.usia_anak + " Bulan"}
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"Jenis Kelamin"}
                        disabled
                        value={model?.jenis_kelamin}
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"Gol Darah"}
                        disabled
                        value={model?.gol_darah}
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"Dusun"}
                        disabled
                        value={model?.dusun}
                        className="bg-white w-full"
                    />
                    <InputText
                        label={"Tinggi Lahir"}
                        disabled
                        vavalueue={model?.tinggi_lahir + " Cm"}
                        className="bg-white w-full"
                    />
                </div>
                <h3 className="text-pink-500 font-bold border-b border-pink-500 inline-block  my-2">
                    Form Pelayanan
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    <InputText
                        className="bg-white w-full"
                        label={"Berat Badan Sekarang (Kg)"}
                        name="berat_badan_sekarang"
                        error={errors.berat_badan_sekarang}
                        value={data.berat_badan_sekarang}
                        type="number"
                        min={2}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <InputText
                        className="bg-white w-full"
                        label={"Tinggi Badan Sekarang (Cm)"}
                        name="tinggi_badan_sekarang"
                        error={errors.tinggi_badan_sekarang}
                        value={data.tinggi_badan_sekarang}
                        type="number"
                        min={2}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <InputText
                        className="bg-white w-full"
                        label={"Lingkar Lengan Sekarang (Cm)"}
                        name="lingkar_lengan_sekarang"
                        error={errors.lingkar_lengan_sekarang}
                        value={data.lingkar_lengan_sekarang}
                        type="number"
                        min={2}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <InputText
                        className="bg-white w-full"
                        label={"Lingkar Kepala Sekarang (Cm)"}
                        name="lingkar_kepala_sekarang"
                        error={errors.lingkar_kepala_sekarang}
                        value={data.lingkar_kepala_sekarang}
                        type="number"
                        min={2}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                    <SelectOption
                        className="bg-white w-full capitalize"
                        label={"BB/U"}
                        name="bb_u"
                        error={errors.bb_u}
                        value={data.bb_u}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    >
                        <MenuItem value={""} selected disabled>
                            Pilih Status BB/U
                        </MenuItem>
                        <MenuItem value={"normal"}>normal</MenuItem>
                        <MenuItem value={"kurang"}>kurang</MenuItem>
                        <MenuItem value={"sangat kurang"}>
                            sangat kurang
                        </MenuItem>
                        <MenuItem value={"lebih"}>lebih</MenuItem>
                    </SelectOption>
                    <SelectOption
                        className="bg-white w-full capitalize"
                        label={"TB/U"}
                        name="tb_u"
                        error={errors.tb_u}
                        value={data.tb_u}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    >
                        <MenuItem value={""} selected disabled>
                            Pilih Status TB/U
                        </MenuItem>
                        <MenuItem value={"tinggi"}>tinggi</MenuItem>
                        <MenuItem value={"normal"}>normal</MenuItem>
                        <MenuItem value={"pendek"}>pendek</MenuItem>
                        <MenuItem value={"sangat pendek"}>
                            sangat pendek
                        </MenuItem>
                    </SelectOption>
                    <SelectOption
                        className="bg-white w-full capitalize"
                        label={"BB/TB"}
                        name="bb_tb"
                        error={errors.bb_tb}
                        value={data.bb_tb}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    >
                        <MenuItem value={""} selected disabled>
                            Pilih Status BB/TB
                        </MenuItem>
                        <MenuItem value={"gizi buruk"}>gizi buruk</MenuItem>
                        <MenuItem value={"gizi kurang"}>gizi kurang</MenuItem>
                        <MenuItem value={"gizi baik"}>gizi baik</MenuItem>
                        <MenuItem value={"gizi lebih"}>gizi lebih</MenuItem>
                        <MenuItem value={"gizi obasitas"}>
                            gizi obasitas
                        </MenuItem>
                    </SelectOption>
                    <SelectOption
                        className="bg-white w-full capitalize"
                        label={"IMT/U"}
                        name="imt_u"
                        error={errors.imt_u}
                        value={data.imt_u}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    >
                        <MenuItem value={""} selected disabled>
                            Pilih Status IMT/U
                        </MenuItem>

                        <MenuItem value={"gizi kurang"}>gizi kurang</MenuItem>
                        <MenuItem value={"normal"}>normal</MenuItem>
                        <MenuItem value={"over"}>over</MenuItem>
                        <MenuItem value={"obesitas"}>obesitas</MenuItem>
                    </SelectOption>
                    <SelectOption
                        className="bg-white w-full capitalize"
                        label={"Status Stunting"}
                        name="status_stunting"
                        error={errors.status_stunting}
                        value={data.status_stunting}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    >
                        <MenuItem value={""} selected disabled>
                            Pilih Status Stunting
                        </MenuItem>

                        <MenuItem value={"tidak"}>tidak</MenuItem>
                        <MenuItem value={"berisiko"}>berisiko</MenuItem>
                        <MenuItem value={"stunting"}>stunting</MenuItem>
                        <MenuItem value={"sembuh"}>sembuh</MenuItem>
                    </SelectOption>
                    <SelectOption
                        className="bg-white w-full capitalize"
                        label={"Status Mengidap Diare"}
                        name="mengidap_diare"
                        error={errors.mengidap_diare}
                        value={data.mengidap_diare}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    >
                        <MenuItem value={""} selected disabled>
                            Pilih Status Mengidap Diare
                        </MenuItem>

                        <MenuItem value={"diare"}>diare</MenuItem>
                        <MenuItem value={"tidak"}>tidak diare</MenuItem>
                    </SelectOption>
                    <SelectOption
                        className="bg-white w-full capitalize"
                        label={"Status Pemberian Oralit"}
                        name="pemberian_oralit"
                        error={errors.pemberian_oralit}
                        value={data.pemberian_oralit}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    >
                        <MenuItem value={""} selected disabled>
                            Pilih Status Pemberian Oralit
                        </MenuItem>

                        <MenuItem value={"tidak"}>tidak</MenuItem>
                        <MenuItem value={"ya"}>ya</MenuItem>
                    </SelectOption>
                    <SelectOption
                        className="bg-white w-full capitalize"
                        label={"Status Pemberian Vit A"}
                        name="pemberian_vit_a"
                        error={errors.pemberian_vit_a}
                        value={data.pemberian_vit_a}
                        onChange={(e) =>
                            setData({
                                ...data,
                                [e.target.name]: e.target.value,
                            })
                        }
                    >
                        <MenuItem value={""} selected disabled>
                            Pilih Status Pemberian Vit A
                        </MenuItem>

                        <MenuItem value={"tidak"}>tidak</MenuItem>
                        <MenuItem value={"ya"}>ya</MenuItem>
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

                        {imun_anak.map((item, key) => (
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

                        {vaksin_anak.map((item, key) => (
                            <MenuItem value={item.nama_imunisasi}>
                                {item.nama_imunisasi}
                            </MenuItem>
                        ))}
                    </SelectOption>
                </div>
                <InputText
                    className="bg-white w-full"
                    label={"Nasehat Kesehatan"}
                    name="nasihat"
                    error={errors.nasihat}
                    value={data.nasihat}
                    min={2}
                    onChange={(e) =>
                        setData({
                            ...data,
                            [e.target.name]: e.target.value,
                        })
                    }
                />
                <button className="my-3 bg-blue-500 rounded-md text-white py-2 px-4">
                    Submit
                </button>
            </form>
        </div>
    );
}
