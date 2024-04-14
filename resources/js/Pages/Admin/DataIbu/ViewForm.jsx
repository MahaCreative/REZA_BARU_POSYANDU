import InputText from "@/Components/InputText";
import Loading from "@/Components/Loading";
import SelectOption from "@/Components/SelectOption";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Cancel, Save } from "@mui/icons-material";
import { MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Select from "react-select";
import DataTable from "react-data-table-component";
export default function ViewForm(props) {
    const dataIbu = props.dataIbu;
    const { pekerjaan } = usePage().props;
    const { pendidikan } = usePage().props;
    const { data, setData, post, reset, errors } = useForm({
        nama_lengkap: "",
        nik: "",
        tempat_lahir: "",
        tgl_lahir: "",
        gol_darah: "",
        alamat: "",
        desa: "",
        dusun: "",
        telephone: "",
        pendidikan_id: "",
        pekerjaan_id: "",
        foto: "",
    });
    const [openLoading, setOpenLoading] = useState(false);
    const updateHandler = (e) => {
        e.preventDefault();
        setOpenLoading(true);
        post(route("admin.update-data-ibu"), {
            onError: (error) => {
                setTimeout(() => {
                    setOpenLoading(false);
                }, 350);
                setTimeout(() => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Gagal Melakukan melakukan perubahan data Silahkan Cek Formulir Isian Anda",
                    });
                    
                }, 1000);
            },
            onSuccess: () => {
                setOpenLoading(false);
                setTimeout(() => {
                    Swal.fire({
                        icon: "success",
                        title: "Yess",
                        text: "Berhasil melakukan perubahan data",
                    });
                }, 300);
                reset();
            },
        });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        setOpenLoading(true);
        post(route("admin.post-data-ibu"), {
            onError: (error) => {
                setTimeout(() => {
                    setOpenLoading(false);
                }, 350);
                setTimeout(() => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Gagal Melakukan Penambahan data Silahkan Cek Formulir Isian Anda",
                    });
                    console.log(errors);
                }, 1000);
            },
            onSuccess: () => {
                setOpenLoading(false);
                setTimeout(() => {
                    Swal.fire({
                        icon: "success",
                        title: "Yess...",
                        text: "Berhasil melakukan penambahan data",
                    });
                }, 300);
                reset();
            },
        });
    };
    useEffect(() => {
        setData({
            ...data,
            id: dataIbu ? dataIbu.id : "",
            nama_lengkap: dataIbu ? dataIbu.nama_lengkap : "",
            nik: dataIbu ? dataIbu.nik : "",
            tempat_lahir: dataIbu ? dataIbu.tempat_lahir : "",
            tgl_lahir: dataIbu ? dataIbu.tgl_lahir : "",
            gol_darah: dataIbu ? dataIbu.gol_darah : "",
            alamat: dataIbu ? dataIbu.alamat : "",
            desa: dataIbu ? dataIbu.desa : "",
            dusun: dataIbu ? dataIbu.dusun : "",
            telephone: dataIbu ? dataIbu.telephone : "",
            pendidikan_id: dataIbu ? dataIbu.pekerjaan_id : "",
            pekerjaan_id: dataIbu ? dataIbu.pendidikan_id : "",
            foto: dataIbu ? dataIbu.foto : "",
        });
    }, [dataIbu]);

    return (
        <div className="flex flex-col md:flex-row items-center justify-center ">
            <Loading open={openLoading} setOpen={setOpenLoading} />
            <div className="w-full bg-white rounded-md py-2 px-3">
                <h1 className="text-pink-500 font-light my-3 border-b border-pink-500 inline-block">
                    Formulir Profile Kader
                </h1>
                <form onSubmit={dataIbu ? updateHandler : submitHandler}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <InputText
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            label={"NIK"}
                            name="nik"
                            value={data.nik}
                            error={errors.nik}
                        />
                        <InputText
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            label={"Nama Lengkap"}
                            name="nama_lengkap"
                            value={data.nama_lengkap}
                            error={errors.nama_lengkap}
                        />
                        <InputText
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            label={"Tempat Lahir"}
                            name="tempat_lahir"
                            value={data.tempat_lahir}
                            error={errors.tempat_lahir}
                        />
                        <InputText
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            type="date"
                            label={"Tanggal Lahir"}
                            name="tgl_lahir"
                            value={data.tgl_lahir}
                            error={errors.tgl_lahir}
                        />
                        <SelectOption
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            label={"Golongan Darah"}
                            name="gol_darah"
                            value={data.gol_darah}
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
                        <div className="text-xs ">
                            <label htmlFor="">Pekerjaan</label>
                            <Select
                                className="z-[10]"
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        pekerjaan_id: e.value,
                                    })
                                }
                                name="pekerjaan_id"
                                options={pekerjaan.map((item, key) => ({
                                    value: item.id,
                                    label: item.nama,
                                }))}
                            />
                            {errors.pekerjaan_id && (
                                <p className="text-red-500 text-xs italic">
                                    {errors.pekerjaan_id}
                                </p>
                            )}
                        </div>
                        <div className="text-xs ">
                            <label htmlFor="">Pendidikan</label>
                            <Select
                                className="z-[10]"
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        pendidikan_id: e.value,
                                    })
                                }
                                name="pendidikan_id"
                                options={pendidikan.map((item, key) => ({
                                    value: item.id,
                                    label: item.nama,
                                }))}
                            />
                            {errors.pendidikan_id && (
                                <p className="text-red-500 text-xs italic">
                                    {errors.pendidikan_id}
                                </p>
                            )}
                        </div>
                        <InputText
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            label={"Desa"}
                            name="desa"
                            value={data.desa}
                            error={errors.desa}
                        />
                        <InputText
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            label={"Dusun"}
                            name="dusun"
                            value={data.dusun}
                            error={errors.dusun}
                        />
                        <InputText
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            label={"Alamat"}
                            name="alamat"
                            value={data.alamat}
                            error={errors.alamat}
                        />
                        <InputText
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            label={"Telephone"}
                            name="telephone"
                            value={data.telephone}
                            error={errors.telephone}
                        />
                        <div>
                            {dataIbu && (
                                <p className="text-white bg-gray-400 inline-block py1 px-2 rounded-md mb-2 text-xs">
                                    Jika Tidak ingin mengganti Foto, biarkan
                                    kosong
                                </p>
                            )}
                            <InputText
                                type="file"
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.files[0],
                                    })
                                }
                                name="foto"
                                error={errors.foto}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end items-start my-3">
                        <div className="flex gap-3 items-center">
                            <button className="bg-blue-500 rounded-md hover:bg-blue-600 py-1 px-2 flex gap-3 text-white duration-300 ease-in-out transition-all items-center">
                                <Save color="inherit" fontSize="inherit" />
                                <p>Save</p>
                            </button>
                            <Link
                                href={route("admin.data-kader")}
                                type="button"
                                className="bg-red-500 rounded-md hover:bg-red-600 py-1 px-2 flex gap-3 text-white duration-300 ease-in-out transition-all items-center"
                            >
                                <Cancel color="inherit" fontSize="inherit" />
                                <p>Batalkan</p>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

ViewForm.layout = (page) => (
    <AdminLayout children={page} title={"Form Data Kader"} />
);
