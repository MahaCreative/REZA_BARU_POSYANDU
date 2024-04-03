import InputText from "@/Components/InputText";
import Loading from "@/Components/Loading";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import { Add, Delete, Edit, Sort } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

export default function Index({ ...props }) {
    const dataKader = props.dataKader;
    const [model, setModel] = useState(false);
    const [openLoading, setOpenLoading] = useState(false);
    const getLoading = (value) => {
        setOpenLoading(value);
    };
    const columns = [
        {
            name: "Nama Lengkap",
            selector: (row) => row.nama_lengkap,
            wrap: true,
        },
        { name: "NIK", selector: (row) => row.nik, width: "100px" },
        { name: "Tempat Lahir", selector: (row) => row.tempat_lahir },
        { name: "Tanggal Lahir", selector: (row) => row.tgl_lahir },
        { name: "Alamat", selector: (row) => row.alamat, wrap: true },
        { name: "Telephone", selector: (row) => row.telephone },
        {
            name: "Foto",
            selector: (row) => (
                <>
                    <a target="_blank" href={"storage/" + row.foto}>
                        <img
                            src={"storage/" + row.foto}
                            alt=""
                            className="w-[40px]"
                        />
                    </a>
                </>
            ),
        },
        {
            name: "Aksi",
            selector: (row) => (
                <div className="flex gap-3 justify-center">
                    <button
                        onClick={() => deleteHandler(row.id)}
                        className="py-1 text-xs px-1 rounded-md text-white hover:cursor-pointer hover:bg-red-700 bg-red-500"
                    >
                        <Tooltip title="Hapus">
                            <Delete color="inherit" fontSize="inherit" />
                        </Tooltip>
                    </button>
                    <button
                        onClick={() => editHandler(row)}
                        className="py-1 text-xs px-1 rounded-md text-white hover:cursor-pointer hover:bg-orange-700 bg-orange-500"
                    >
                        <Tooltip title="Edit">
                            <Edit color="inherit" fontSize="inherit" />
                        </Tooltip>
                    </button>
                </div>
            ),
        },
    ];
    const editHandler = (value) => {
        Swal.fire({
            title: "Anda Yakin?",
            text: "Apakah anda yakin ingin mengubah data ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yakin",
        }).then((result) => {
            if (result.isConfirmed) {
                router.get(
                    route("admin.form-update-data-kader", { id: value.id })
                );
            }
        });
    };
    const deleteHandler = (id) => {
        setOpenLoading(true);
        Swal.fire({
            title: "Anda Yakin?",
            text: "Apakah anda yakin ingin menghapus data ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(id);
                router.delete(route("admin.delete-data-kader", { id: id }), {
                    onSuccess: () => {
                        setOpenLoading(false);
                        setTimeout(() => {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Sukses menghapus data",
                                icon: "success",
                            });
                        }, 1000);
                    },
                });
            } else {
                setOpenLoading(false);
            }
        });
    };
    return (
        <div className="w-full">
            <Loading open={openLoading} setOpen={setOpenLoading} />
            <div className="w-full">
                <div className="flex items-center jusitfy-between w-full">
                    <h1 className="text-white font-semibold w-full">
                        Data Kader Posyandu
                    </h1>
                    <div className="flex gap-3 items-center text-white">
                        <Link
                            href={route("admin.form-data-kader")}
                            className="py-1 px-2 rounded-lg bg-blue-500 hover:bg-blue-500"
                        >
                            <Add color="inherit" fontSize="small" />
                        </Link>
                        <InputText
                            className="bg-white rounded-md overflow-hidden "
                            label={"Cari Data"}
                        />
                    </div>
                </div>
                <div className="rounded-md w-full py-3">
                    <DataTable
                        data={dataKader}
                        columns={columns}
                        striped
                        highlightOnHover
                        dense
                        pagination
                        responsive
                    />
                </div>
            </div>
        </div>
    );
}
Index.layout = (page) => (
    <AdminLayout children={page} title={"Data Kader Posyandu"} />
);
