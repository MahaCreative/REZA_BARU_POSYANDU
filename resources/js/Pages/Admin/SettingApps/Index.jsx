import InputText from "@/Components/InputText";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";
import React from "react";
import Swal from "sweetalert2";

export default function Index(props) {
    const settingApps = props.settingApps;
    const { data, setData, post, reset, errors } = useForm({
        nama_posyandu: settingApps.nama_posyandu,
        logo: settingApps.logo,
        alamat: settingApps.alamat,
        desa: settingApps.desa,
        kecamatan: settingApps.kecamatan,
        nama_ketua_posyandu: settingApps.nama_ketua_posyandu,
    });
    const submitHandler = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Ubah Data?",
            text: "Apakah anda ingin merubah data posyandu",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yakin",
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("admin.update-setting-apps"), {
                    onSuccess: () => {
                        Swal.fire({
                            title: "Success",
                            text: "Berhasil merubah data posyandu",
                            icon: "success",
                        });
                    },
                    onError: () => {
                        Swal.fire({
                            title: "Error",
                            text: "Gagal melakukan perubahan data posyandu",
                            icon: "error",
                        });
                    },
                });
            }
        });
    };
    return (
        <div className="bg-white py-3 px-4 rounded-md">
            <div className="flex gap-3 flex-col md:flex-row justify-between items-start">
                <img
                    src={"/storage/" + settingApps.logo}
                    alt=""
                    className="w-1/2"
                />
                <div className="w-full">
                    <form action="" onSubmit={submitHandler}>
                        <InputText
                            label={"Nama Posyandu"}
                            name="nama_posyandu"
                            error={errors.nama_posyandu}
                            value={data.nama_posyandu}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    nama_posyandu: e.target.files[0],
                                })
                            }
                        />
                        <InputText
                            label={"Alamat Posyandu"}
                            name="alamat"
                            error={errors.alamat}
                            value={data.alamat}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    alamat: e.target.files[0],
                                })
                            }
                        />
                        <InputText
                            label={"Desa"}
                            name="desa"
                            error={errors.desa}
                            value={data.desa}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    desa: e.target.files[0],
                                })
                            }
                        />
                        <InputText
                            label={"Kecamatan"}
                            name="kecamatan"
                            error={errors.kecamatan}
                            value={data.kecamatan}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    kecamatan: e.target.files[0],
                                })
                            }
                        />
                        <InputText
                            label={"Nama Ketua Posyandu"}
                            name="nama_ketua_posyandu"
                            error={errors.nama_ketua_posyandu}
                            value={data.nama_ketua_posyandu}
                            onChange={(e) =>
                                setData({
                                    ...data,
                                    nama_ketua_posyandu: e.target.files[0],
                                })
                            }
                        />
                        <InputText
                            label={"Logo"}
                            name="logo"
                            error={errors.logo}
                            type="file"
                            onChange={(e) =>
                                setData({ ...data, logo: e.target.files[0] })
                            }
                        />
                        <button className="py-2 my-3 px-4 bg-blue-500 text-white">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => <AdminLayout children={page} title={"Setting Apps"} />;
