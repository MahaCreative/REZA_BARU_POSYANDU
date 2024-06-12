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
export default function ViewForm({ dataAnak }) {
    const { data, setData, post, reset, errors } = useForm({
        nama: "",
        dusun: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        jenis_kelamin: "",
        gol_darah: "",
        proses_kelahiran: "",
        berat_lahir: "",
        tinggi_lahir: "",
        foto: "",
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
            dusun: modelSelected ? modelSelected.dusun : "",
        });
    }, [modelSelected]);
    useEffect(() => {
        setData({
            ...data,
            id: dataAnak ? dataAnak.id : "",
            nama: dataAnak ? dataAnak.nama : "",
            tempat_lahir: dataAnak ? dataAnak.tempat_lahir : "",
            tanggal_lahir: dataAnak ? dataAnak.tanggal_lahir : "",
            jenis_kelamin: dataAnak ? dataAnak.jenis_kelamin : "",
            gol_darah: dataAnak ? dataAnak.gol_darah : "",
            proses_kelahiran: dataAnak ? dataAnak.proses_kelahiran : "",
            berat_lahir: dataAnak ? dataAnak.berat_lahir : "",
            tinggi_lahir: dataAnak ? dataAnak.tinggi_lahir : "",
            foto: dataAnak ? dataAnak.foto : "",
        });
        setModelSelect(dataAnak && dataAnak.ibu);
    }, [dataAnak]);
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
            post(route("admin.post-data-anak"), {
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
                if ($dataAnak) {
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
            post(route("admin.update-data-anak"), {
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
                    Formulir Data Anak
                </h1>
                <Link
                    href={route("admin.data-anak")}
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
                        Formulir Data Anak
                    </h1>
                    <form
                        className="flex flex-col gap-3"
                        onSubmit={dataAnak ? updateHandler : submitHandler}
                    >
                        <InputText
                            label="Nama Lengkap"
                            name="nama"
                            value={data.nama}
                            error={errors.nama}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <InputText
                            label="Tempat Lahir"
                            name="tempat_lahir"
                            value={data.tempat_lahir}
                            error={errors.tempat_lahir}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <InputText
                            type="date"
                            label="Tanggal Lahir"
                            name="tanggal_lahir"
                            value={data.tanggal_lahir}
                            error={errors.tanggal_lahir}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <InputText
                                label="Berat Lahir (Kg)"
                                name="berat_lahir"
                                type="number"
                                value={data.berat_lahir}
                                error={errors.berat_lahir}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                            <InputText
                                label="Tinggi Lahir (Cm)"
                                name="tinggi_lahir"
                                type="number"
                                value={data.tinggi_lahir}
                                error={errors.tinggi_lahir}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <InputText
                            label="Dusun"
                            name="dusun"
                            disabled
                            value={data.dusun}
                            error={errors.dusun}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        />
                        <SelectOption
                            value={data.jenis_kelamin}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            label={"Pilih jenis Kelamin"}
                            name="jenis_kelamin"
                            error={errors.jenis_kelamin}
                        >
                            <MenuItem value="">Pilih Jenis Kelamin</MenuItem>
                            <MenuItem value="laki-laki"> Laki-Laki</MenuItem>
                            <MenuItem value="perempuan">Perempuan</MenuItem>
                        </SelectOption>
                        <SelectOption
                            value={data.proses_kelahiran}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            label={"Pilih Proses Kelahiran"}
                            name="proses_kelahiran"
                            error={errors.proses_kelahiran}
                        >
                            <MenuItem value="">Pilih Proses Kelahiran</MenuItem>
                            <MenuItem value="sesar"> Sesar</MenuItem>
                            <MenuItem value="normal">Normal</MenuItem>
                        </SelectOption>
                        <SelectOption
                            value={data.gol_darah}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            label={"Golongan Darah"}
                            name="gol_darah"
                            error={errors.gol_darah}
                        >
                            <MenuItem value="">Pilih Golongan Darah</MenuItem>
                            <MenuItem value="A-">A-</MenuItem>
                            <MenuItem value="A+">A+</MenuItem>
                            <MenuItem value="B-">B-</MenuItem>
                            <MenuItem value="B+">B+</MenuItem>
                            <MenuItem value="AB-">AB-</MenuItem>
                            <MenuItem value="AB+">AB+</MenuItem>
                            <MenuItem value="O-">O-</MenuItem>
                            <MenuItem value="O">O</MenuItem>
                        </SelectOption>
                        <InputText
                            type="file"
                            label="Foto"
                            name="foto"
                            error={errors.foto}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.files[0],
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
