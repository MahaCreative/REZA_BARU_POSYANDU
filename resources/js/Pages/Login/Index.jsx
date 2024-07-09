import InputText from "@/Components/InputText";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Modal } from "@mui/material";
import { error } from "highcharts";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function Index() {
    const { settings } = usePage().props;
    const [modal, setModal] = useState(false);
    const { data, setData, post, reset, errors } = useForm({
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("store-login"), {
            onError: () => {
                Swal.fire({
                    title: "Error",
                    text: "Gagal melakukan login",
                    icon: "error",
                });
            },
            onSuccess: () => {
                Swal.fire({
                    title: "Sukses",
                    text: "Anda berhasil Login",
                    icon: "success",
                });
            },
        });
    };
    return (
        <div className="w-full h-screen bg-slate-950 relative">
            <Head title="Home" />
            <div className="absolute left-0 right-0 w-full h-screen">
                <div className="relative top-0 w-full h-full">
                    <img
                        src={"Image/background.jpg"}
                        alt=""
                        className="w-full object-cover h-full object-center"
                    />
                </div>
                <div className="top-0 left-0 w-full h-full bg-slate-950/50 absolute">
                    <div className="relative w-full h-full flex items-center px-8">
                        <div className="px-4 w-1/2">
                            <h3 className="font-bold text-white tracking-tighter text-3xl">
                                Selamat Datang di, Sistem Informasi Monitoring
                                Tumbuh Kembang Anak
                            </h3>
                            <p className="font-light tracking-tighter text-white">
                                Sistem informasi ini digunakan untuk mencatat
                                hasil pelayanan ibu dan anak setiap kali
                                melakukan pemeriksaan pada posyandu. diharapkan
                                dengan adanya sistem informasi ini, kader dan
                                ibu yang terdaftar pada posyandu ini bisa dapat
                                memantau perkembangan dan pertumbuhan anak.
                            </p>
                            {/* <button
                                onClick={() => setModal(true)}
                                className="bg-pink-500 py-2 px-3 rounded-md text-white tracking-tighter font-bold mt-3"
                            >
                                Login Sekarang
                            </button> */}
                        </div>
                        <div className="w-full md:w-1/2 bg-white py-2 px-3 rounded-md relative  ">
                            <form action="" onSubmit={submit}>
                                <InputText
                                    name="email"
                                    value={data.email}
                                    error={errors.email}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    type="email"
                                    label={"Email"}
                                />
                                <InputText
                                    name="password"
                                    value={data.password}
                                    error={errors.password}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    type="password"
                                    label={"Password"}
                                />
                                <InputText
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    error={errors.password_confirmation}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    type="password"
                                    label={"Konfirmasi Password"}
                                />
                                <div className="flex gap-3">
                                    <button className="bg-blue-500 text-white font-bold my-3 py-2 px-4">
                                        Login
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setModal(false)}
                                        className="bg-red-500 text-white font-bold my-3 py-2 px-4"
                                    >
                                        Cancell
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
