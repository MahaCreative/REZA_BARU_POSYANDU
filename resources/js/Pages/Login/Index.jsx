import InputText from "@/Components/InputText";
import { useForm, usePage } from "@inertiajs/react";
import { error } from "highcharts";
import React from "react";
import Swal from "sweetalert2";

export default function Index() {
    const { settings } = usePage().props;
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
        <div className="w-full h-screen bg-slate-950">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3">
                <div className="w-full bg-white py-2 px-3 rounded-md h-full ">
                    <p className="text-pink-500 tracking-tighter font-bold ">
                        Selamat Data Di Sistem Informasi Monitoring Tumbuh
                        Kembang Anak Untuk Pencegahan Stunting
                    </p>
                    <p>
                        Silahkan login untuk menggunakan sistem informasi ini.
                    </p>
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
                        <button className="bg-blue-500 text-white font-bold my-3 py-2 px-4">
                            Login
                        </button>
                    </form>
                </div>
                <div className="w-full bg-slate-900 h-screen flex justify-center items-center">
                    <img
                        src="/storage/Image/Untitled-1.png"
                        alt=""
                        className="w-[80%]"
                    />
                </div>
            </div>
        </div>
    );
}
