import InputText from "@/Components/InputText";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm } from "@inertiajs/react";
import { Cancel, Save } from "@mui/icons-material";
import React from "react";
import Swal from "sweetalert2";

export default function Admin(props) {
    const user = props.user;
    const profile = props.profile;
    const { data, setData, post, reset, errors } = useForm({
        id: profile.id,
        nama_lengkap: profile.nama_lengkap,
        nik: profile.nik,
        tempat_lahir: profile.tempat_lahir,
        tgl_lahir: profile.tgl_lahir,
        alamat: profile.alamat,
        telephone: profile.telephone,
        foto: profile.foto,
        email: user.email,
        password: "",
        password_confirmation: "",
    });
    const updateHandler = (e) => {
        e.preventDefault();

        post(route("setting-profile-admin"), {
            onError: (error) => {
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
    return (
        <div className="py-2 px-4 bg-white">
            <h3 className="text-pink-500 font-bold">Setting Profile</h3>

            <form onSubmit={updateHandler}>
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
                        {profile && (
                            <p className="text-white bg-gray-400 inline-block py1 px-2 rounded-md mb-2 text-xs">
                                Jika Tidak ingin mengganti Foto, biarkan kosong
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
                        Silahkan mengisikan formulir User jika anda ingin user
                        ini bisa dapat mengelola sistem informasi ini.
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
                            {profile && (
                                <p className="text-white bg-gray-400 inline-block py1 px-2 rounded-md mb-2 text-xs">
                                    Jika Tidak ingin mengganti password, biarkan
                                    kosong
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
                    </div>
                </div>
            </form>
        </div>
    );
}

Admin.layout = (page) => (
    <AdminLayout children={page} title={"Setting Profile"} />
);
