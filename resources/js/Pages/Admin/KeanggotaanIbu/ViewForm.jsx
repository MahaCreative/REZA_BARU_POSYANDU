import InputText from "@/Components/InputText";
import SelectOption from "@/Components/SelectOption";
import AdminLayout from "@/Layouts/AdminLayout";
import { ClassNames } from "@emotion/react";
import { useForm, Link } from "@inertiajs/react";
import { Search, Save, Cancel, ArrowBack } from "@mui/icons-material";
import React, { useEffect } from "react";
import { useState } from "react";
import PilihIbu from "./PilihIbu";
import Loading from "@/Components/Loading";
import Swal from "sweetalert2";
import { MenuItem } from "@mui/material";
export default function ViewForm({ keanggotaanIbu }) {
    const { data, setData, post, reset, errors } = useForm({
        usia_kehamilan: "",
        berat_badan: "",
        tinggi_badan: "",
        hpht: "",
        htp: "",
        hamil_ke: "",
        foto_ktp: "",
        foto_kk: "",
        // data_ibu
        data_ibu_id: "",
        nama_lengkap_ibu: "",
        nik_ibu: "",
        pekerjaan_ibu: "",
        pendidikan_ibu: "",
        alamat_ibu: "",
        telephone_ibu: "",
    });
    const [modelIbu, setModelIbu] = useState(false);
    const [openLoading, setOpenLoading] = useState(false);

    const [params, setParams] = useState("");
    const CariHandler = () => {
        fetchData();
    };

    const [modelSelected, setModelSelect] = useState(null);
    useEffect(() => {
        setData({
            ...data,
            data_ibu_id: modelSelected ? modelSelected.id : "",
            nama_lengkap_ibu: modelSelected ? modelSelected.nama_lengkap : "",
            nik_ibu: modelSelected ? modelSelected.nik : "",
            pekerjaan_ibu: modelSelected ? modelSelected.pekerjaan.nama : "",
            pendidikan_ibu: modelSelected ? modelSelected.pendidikan.nama : "",
            alamat_ibu: modelSelected ? modelSelected.alamat : "",
            telephone_ibu: modelSelected ? modelSelected.telephone : "",
        });
    }, [modelSelected]);
    useEffect(() => {
        setData({
            ...data,
            id: keanggotaanIbu ? keanggotaanIbu.id : "",
            usia_kehamilan: keanggotaanIbu ? keanggotaanIbu.usia_kehamilan : "",
            berat_badan: keanggotaanIbu ? keanggotaanIbu.berat_badan : "",
            tinggi_badan: keanggotaanIbu ? keanggotaanIbu.tinggi_badan : "",
            hpht: keanggotaanIbu ? keanggotaanIbu.hpht : "",
            htp: keanggotaanIbu ? keanggotaanIbu.htp : "",
            hamil_ke: keanggotaanIbu ? keanggotaanIbu.hamil_ke : "",
            foto_ktp: keanggotaanIbu ? keanggotaanIbu.foto_ktp : "",
            foto_kk: keanggotaanIbu ? keanggotaanIbu.foto_kk : "",
        });
        setModelSelect(keanggotaanIbu && keanggotaanIbu.ibu);
    }, [keanggotaanIbu]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`/get-data-ibu?cari=${params}`);
            const result = await response.json();
            setModelIbu(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(data);
        if (data.data_ibu_id === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Silahkan memilih data ibu terlebih dahulu",
            });
        } else {
            post(route("admin.post-data-keanggotaan-ibu"), {
                onSuccess: () => {
                    setTimeout(() => {
                        setOpenLoading(false);
                    }, 350);
                    setTimeout(() => {
                        Swal.fire({
                            icon: "success",
                            title: "Yeay....",
                            text: "Berhasil menambahkan data ke sistem",
                        });
                        reset();
                        setModelSelect(null);
                    }, 1000);
                },
                onError: (error) => {
                    setTimeout(() => {
                        setOpenLoading(false);
                    }, 350);
                    setTimeout(() => {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Gagal Melakukan melakukan penambahan data Silahkan Cek Formulir Isian Anda",
                        });
                    }, 1000);
                },
                preserveScroll: true,
            });
        }
    };
    const cancellHandler = () => {
        Swal.fire({
            title: "Anda Yakin?",
            text: "Apakah anda yakin membatalkan mengisi formulir ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, batalkan memilih!",
        }).then((result) => {
            if (result.isConfirmed) {
                if ($keanggotaanIbu) {
                    reset("");
                } else {
                    setModelSelect(null);
                }
            } else {
                setOpenLoading(false);
            }
        });
        console.log(modelSelected);
    };
    const updateHandler = (e) => {
        e.preventDefault();
        console.log(data);
        if (data.data_ibu_id === "") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Silahkan memilih data ibu terlebih dahulu",
            });
        } else {
            post(route("admin.update-data-keanggotaan-ibu"), {
                onSuccess: () => {
                    setTimeout(() => {
                        setOpenLoading(false);
                    }, 350);
                    setTimeout(() => {
                        Swal.fire({
                            icon: "success",
                            title: "Yeay....",
                            text: "Berhasil mengubah data ke sistem",
                        });
                        reset();
                    }, 1000);
                },
                onError: (error) => {
                    setTimeout(() => {
                        setOpenLoading(false);
                    }, 350);
                    setTimeout(() => {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Gagal Melakukan melakukan pengubahan data Silahkan Cek Formulir Isian Anda",
                        });
                    }, 1000);
                },
                preserveScroll: true,
            });
        }
    };
    return (
        <div className="bg-white py-2 px-4 rounded-md w-full">
            {/**/}
            <Loading open={openLoading} setOpen={setOpenLoading} />
            <div className="flex justify-between items-center">
                <h1 className="text-pink-500 font-light my-3 border-b border-pink-500 inline-block">
                    Formulir Keanggotaan Ibu
                </h1>
                <Link
                    href={route("admin.data-keanggotaan-ibu")}
                    className="py-1 px-2 rounded-lg bg-blue-500 hover:bg-blue-500 text-white"
                >
                    <ArrowBack color="inherit" fontSize="small" />
                </Link>
            </div>
            <div className="flex gap-4 items-center w-full">
                <InputText
                    onChange={(e) => setParams(e.target.value)}
                    label={"Cari Data Ibu"}
                    className="w-full"
                />
                <button
                    onClick={CariHandler}
                    className="py-2 bg-blue-500 hover:bg-blue-700 px-4 flex items-center gap-3 justify-center text-white rounded-md"
                >
                    <Search color="inherit" fontSize="inherit" />
                    <p>Cari Ibu</p>
                </button>
            </div>

            {/*DataTables*/}
            <PilihIbu
                dataIbu={modelIbu}
                model={modelSelected}
                setModel={setModelSelect}
            />
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start gap-3">
                <div className="border border-pink-500 py-2 px-4  w-full rounded-md">
                    <h1 className="text-xl font-bold text-pink-500 py-3">
                        Profile Ibu
                    </h1>
                    <label>Nama Lengkap</label>
                    <InputText
                        disabled
                        label=""
                        value={data.nama_lengkap_ibu}
                    />
                    <label>NIK</label>
                    <InputText disabled label="" value={data.nik_ibu} />
                    <label>Pekerjaan</label>
                    <InputText disabled label="" value={data.pekerjaan_ibu} />
                    <label>Pendidikan</label>
                    <InputText disabled label="" value={data.pendidikan_ibu} />
                    <label>Alamat</label>
                    <InputText disabled label="" value={data.alamat_ibu} />
                    <label>No Telephone</label>
                    <InputText disabled label="" value={data.telephone_ibu} />
                </div>
                <div className="border border-pink-500 py-2 px-4  w-full rounded-md">
                    <h1 className="text-xl font-bold text-pink-500 py-3">
                        Formulir Pendaftaran Keanggotaan Ibu
                    </h1>
                    <form
                        className="flex flex-col gap-3"
                        onSubmit={
                            keanggotaanIbu ? updateHandler : submitHandler
                        }
                    >
                        <label>Nama Lengkap</label>
                        <InputText
                            disabled
                            label=""
                            value={data.nama_lengkap_ibu}
                        />
                        <label>NIK</label>
                        <InputText disabled label="" value={data.nik_ibu} />

                        <InputText
                            type="date"
                            label="HPHT"
                            name="hpht"
                            value={data.hpht}
                            error={errors.hpht}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <InputText
                            type="date"
                            label="HTP"
                            name="htp"
                            value={data.htp}
                            error={errors.htp}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <InputText
                            type="numeric"
                            label="Usia Kehamilan Dalam Minggu"
                            name="usia_kehamilan"
                            value={data.usia_kehamilan}
                            error={errors.usia_kehamilan}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <InputText
                            label="Hamil Anak Ke"
                            name="hamil_ke"
                            value={data.hamil_ke}
                            error={errors.hamil_ke}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <InputText
                                type="number"
                                label="Berat Badan Dalam KG"
                                name="berat_badan"
                                value={data.berat_badan}
                                error={errors.berat_badan}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                            <InputText
                                type="number"
                                label="Tinggi Badan Dalam Cm"
                                name="tinggi_badan"
                                value={data.tinggi_badan}
                                error={errors.tinggi_badan}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <InputText
                                type="file"
                                label="Foto KTP"
                                name="foto_ktp"
                                error={errors.foto_ktp}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.files[0],
                                    })
                                }
                            />
                            <InputText
                                type="file"
                                label="Foto KK"
                                name="foto_kk"
                                error={errors.foto_kk}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.files[0],
                                    })
                                }
                            />
                        </div>
                        <InputText
                            label="Riwayat Penyakit"
                            name="riwayat_penyakit"
                            value={data.riwayat_penyakit}
                            error={errors.riwayat_penyakit}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <div className="flex gap-3 items-center">
                            <button className="bg-blue-500 rounded-md hover:bg-blue-600 py-1 px-2 flex gap-3 text-white duration-300 ease-in-out transition-all items-center">
                                <Save color="inherit" fontSize="inherit" />
                                <p>Save</p>
                            </button>
                            <button
                                onClick={cancellHandler}
                                type="button"
                                className="bg-red-500 rounded-md hover:bg-red-600 py-1 px-2 flex gap-3 text-white duration-300 ease-in-out transition-all items-center"
                            >
                                <Cancel color="inherit" fontSize="inherit" />
                                <p>Batalkan</p>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

ViewForm.layout = (page) => (
    <AdminLayout children={page} title={"Form Data Anak"} />
);
