import InputText from "@/Components/InputText";
import SelectOption from "@/Components/SelectOption";
import Select from "react-select";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Cancel, Save } from "@mui/icons-material";
import { MenuItem } from "@mui/material";
import React from "react";
import Swal from "sweetalert2";

export default function Ibu(props) {
    const user = props.user;
    const { pekerjaan } = usePage().props;
    const { pendidikan } = usePage().props;
    const dusun = props.dusun;
    const profile = props.profile;
    const { data, setData, post, reset, errors } = useForm({
        id: profile.id,
        nama_lengkap: profile.nama_lengkap,
        nik: profile.nik,
        tempat_lahir: profile.tempat_lahir,
        tgl_lahir: profile.tgl_lahir,
        gol_darah: profile.gol_darah,
        alamat: profile.alamat,
        desa: profile.desa,
        dusun: profile.dusun,
        telephone: profile.telephone,
        pendidikan_id: profile.pendidikan_id,
        pekerjaan_id: profile.pekerjaan_id,
        foto: profile.foto,
        email: user.email,
    });
    const updateHandler = (e) => {
        e.preventDefault();

        post(route("setting-profile-ibu"), {
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
                    <SelectOption
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
                    >
                        <MenuItem value="">{profile.dusun}</MenuItem>
                        {dusun.map((item, key) => (
                            <MenuItem value={item.nama_dusun}>
                                {item.nama_dusun}
                            </MenuItem>
                        ))}
                    </SelectOption>
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
                        ini bisa dapat login dan melihat data .
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

                <div className="flex justify-end items-start my-3">
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

Ibu.layout = (page) => (
    <AdminLayout children={page} title={"Setting Profile"} />
);
