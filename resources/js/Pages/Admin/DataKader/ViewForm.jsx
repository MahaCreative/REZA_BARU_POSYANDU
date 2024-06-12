import InputText from "@/Components/InputText";
import Loading from "@/Components/Loading";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/react";
import { ArrowBack, Cancel, Save } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function ViewForm(props) {
    const dataKader = props.dataKader;
    const { data, setData, post, reset, errors } = useForm({
        nama_lengkap: "",
        nik: "",
        tempat_lahir: "",
        tgl_lahir: "",
        alamat: "",
        telephone: "",
        foto: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [openLoading, setOpenLoading] = useState(false);
    const updateHandler = (e) => {
        e.preventDefault();
        setOpenLoading(true);
        post(route("admin.update-data-kader"), {
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
                    console.log(errors);
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
        post(route("admin.post-data-kader"), {
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
                        title: "Oops...",
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
            id: dataKader ? dataKader.id : "",
            nama_lengkap: dataKader ? dataKader.nama_lengkap : "",
            nik: dataKader ? dataKader.nik : "",
            tempat_lahir: dataKader ? dataKader.tempat_lahir : "",
            tgl_lahir: dataKader ? dataKader.tgl_lahir : "",
            alamat: dataKader ? dataKader.alamat : "",
            telephone: dataKader ? dataKader.telephone : "",
            foto: dataKader ? dataKader.foto : "",
            email: dataKader ? dataKader.user?.email : "",
        });
    }, [dataKader]);

    return (
        <div className="flex flex-col md:flex-row items-center justify-center ">
            <Loading open={openLoading} setOpen={setOpenLoading} />
            <div className="w-full bg-white rounded-md py-2 px-3">
                <div className="flex justify-between items-center">
                    <h1 className="text-pink-500 font-light my-3 border-b border-pink-500 inline-block">
                        Formulir Profile Kader
                    </h1>
                    <Link
                        href={route("admin.data-kader")}
                        className="py-1 px-2 rounded-lg bg-blue-500 hover:bg-blue-500 text-white"
                    >
                        <ArrowBack color="inherit" fontSize="small" />
                    </Link>
                </div>
                <form onSubmit={dataKader ? updateHandler : submitHandler}>
                    <div className="grid grid-cols-2 gap-3">
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
                            {dataKader && (
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
                    <div className="py-3 rounded-md ">
                        <p>
                            Silahkan mengisikan formulir User jika anda ingin
                            user ini bisa dapat mengelola sistem informasi ini.
                        </p>
                        <div className="flex gap-3 flex-col">
                            <InputText
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                                type="email"
                                label={"Email"}
                                name="email"
                                value={data.email}
                                error={errors.email}
                            />
                            <div>
                                {dataKader && (
                                    <p className="text-white bg-gray-400 inline-block py1 px-2 rounded-md mb-2 text-xs">
                                        Jika Tidak ingin mengganti password,
                                        biarkan kosong
                                    </p>
                                )}
                                <InputText
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    type="password"
                                    label={"Password"}
                                    name="password"
                                    value={data.password}
                                    error={errors.password}
                                />
                            </div>
                            <InputText
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                                type="password"
                                label={"Konfirmasi Password"}
                                name="password_confirmation"
                                value={data.password_confirmation}
                                error={errors.password_confirmation}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end items-start">
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
