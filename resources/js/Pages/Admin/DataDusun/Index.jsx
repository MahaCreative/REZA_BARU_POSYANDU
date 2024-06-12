import InputText from "@/Components/InputText";
import AdminLayout from "@/Layouts/AdminLayout";
import { router, useForm, usePage } from "@inertiajs/react";
import { Delete } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

export default function Index(props) {
    const dusun = props.dusun;
    const { data, setData, post, reset, errors } = useForm({ nama_dusun: "" });
    const columns = [
        { name: "#", selector: (row, index) => index + 1, width: "60px" },
        { name: "Nama Dusun", selector: (row, index) => row.nama_dusun },
        {
            name: "Aksi",
            selector: (row, index) => (
                <button
                    onClick={() => deletehandler(row)}
                    className="bg-red-500 py-1 px-2 text-white rounded-md"
                >
                    <Tooltip title="Delete Dusunu">
                        <Delete />
                    </Tooltip>
                </button>
            ),
        },
    ];
    const deletehandler = (row) => {
        Swal.fire({
            title: "Hapus Dusun?",
            text: "Apakah anda yakin ingin menghapus 1 data dusun?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Hapus!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(route("admin.delete-data-dusun", { id: row.id }), {
                    onSuccess: () => {
                        Swal.fire({
                            title: "Success",
                            text: "Berhasil menghapus 1 dusun",
                            icon: "success",
                        });
                    },
                    onError: () => {
                        Swal.fire({
                            title: "Errors",
                            text: "Gagal menghapus dusun",
                            icon: "error",
                        });
                    },
                });
            }
        });
    };
    const submitHandler = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Tambah Dusun Baru?",
            text: "Apakah anda yakin ingin menambahkan 1 dusun baru?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Tambahkan!",
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("admin.store-data-dusun"), {
                    onSuccess: () => {
                        Swal.fire({
                            title: "Success",
                            text: "Berhasil menambahkan 1 dusun baru",
                            icon: "success",
                        });
                    },
                    onError: () => {
                        Swal.fire({
                            title: "Errors",
                            text: "Gagal menambahkan 1 dusun baru",
                            icon: "error",
                        });
                    },
                });
            }
        });
    };
    return (
        <div>
            <div className="my-3 bg-white py-2 px-3 flex gap-3">
                <form action="" onSubmit={submitHandler} className="flex gap-3">
                    <InputText
                        name="nama_dusun"
                        label={"Nama Dusun"}
                        className="bg-white w-full"
                        error={errors.nama_dusun}
                        value={data.nama_dusun}
                        onChange={(e) =>
                            setData({
                                ...data,
                                nama_dusun: e.target.value,
                            })
                        }
                    />
                    <button className="bg-blue-500 py-1 inline-block px-4 text-white">
                        Tambah Dusun
                    </button>
                </form>
            </div>
            <DataTable data={dusun} columns={columns} dense />
        </div>
    );
}

Index.layout = (page) => <AdminLayout children={page} title={"Data Dusun"} />;
