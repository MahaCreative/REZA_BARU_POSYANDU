import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import InputText from "@/Components/InputText";
import Loading from "@/Components/Loading";
import { Link, router, usePage } from "@inertiajs/react";
import { Add, Delete, Edit, Cancel, ArrowBack } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Tooltip, debounce } from "@mui/material";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import Form from "./Form";
import { wrap } from "highcharts";
import { useCallback } from "react";
import { useEffect } from "react";
export default function Index(props) {
    const dataKegiatan = props.dataKegiatan;
    const { auth } = usePage().props;
    const [openLoading, setOpenLoading] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const columns = [
        {
            name: "Kode Kegiatan",
            selector: (row) => row.kd_kegiatan,
        },
        {
            name: "Tanggal Kegiatan",
            selector: (row) => row.tanggal_kegiatan,
        },
        {
            name: "Status Kegiatan",
            selector: (row) => (
                <p
                    className={`${
                        row.status_kegiatan == "selesai"
                            ? "bg-green-500"
                            : row.status_kegiatan == "berlangsung"
                            ? "bg-blue-500"
                            : "bg-orange-500"
                    } w-full text-white py-1 px-4 rounded-md`}
                >
                    {row.status_kegiatan}
                </p>
            ),
        },
        {
            name: "Jumlah Ibu Di Layani",
            selector: (row) => (
                <div>
                    <p>Ibu : {row.pelayanan_ibu_count}</p>
                </div>
            ),
            width: "170px",
        },
        {
            name: "Jumlah Anak Di Layani",
            selector: (row) => (
                <div>
                    <p>Anak : {row.pelayanan_anak_count}</p>
                </div>
            ),
            width: "170px",
        },
        {
            name: "Catatan",
            selector: (row) => row.catatan,
            wrap: true,
        },
        {
            name: "Aksi",
            selector: (row) => (
                <div className="flex gap-3 justify-center">
                    {auth.roles == "ketua posyandu" && (
                        <button
                            onClick={() => deleteHandler(row.id)}
                            className="py-1 text-xs px-1 rounded-md text-white hover:cursor-pointer hover:bg-red-700 bg-red-500"
                        >
                            <Tooltip title="Hapus">
                                <Delete color="inherit" fontSize="inherit" />
                            </Tooltip>
                        </button>
                    )}
                    <button
                        onClick={() => lihatHandler(row)}
                        className="py-1 text-xs px-1 rounded-md text-white hover:cursor-pointer hover:bg-blue-700 bg-blue-500"
                    >
                        <Tooltip title="Lihat Kegiatan Ini">
                            <VisibilityIcon
                                color="inherit"
                                fontSize="inherit"
                            />
                        </Tooltip>
                    </button>
                </div>
            ),
        },
    ];

    const lihatHandler = (value) => {
        Swal.fire({
            title: "Anda Yakin?",
            text: "Anda ingin melihat data lengkap kegiatan ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yakin",
        }).then((result) => {
            if (result.isConfirmed) {
                router.get(
                    route("admin.show-data-kegiatan", {
                        kd_kegiatan: value.kd_kegiatan,
                    })
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
                router.delete(route("admin.delete-data-kegiatan", { id: id }), {
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
    const tambahHandler = () => {
        Swal.fire({
            title: "Anda Yakin?",
            text: "Anda ingin menambah data Jadwal Kegiatan",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yakin",
        }).then((result) => {
            if (result.isConfirmed) {
                setOpenForm(true);
            }
        });
    };
    const closeHandler = () => {
        Swal.fire({
            title: "Anda Yakin?",
            text: "Anda ingin menutup formulir Jadwal Kegiatan",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yakin",
        }).then((result) => {
            if (result.isConfirmed) {
                setOpenForm(false);
            }
        });
    };
    const [params, setParams] = useState({
        dari_tanggal: "",
        sampai_tanggal: "",
    });
    const reload = useCallback(
        debounce((query) => {
            router.get(route("admin.data-kegiatan"), query, {
                preserveState: true,
                preserveScroll: true,
            });
        }, 150),
        []
    );
    useEffect(() => reload(params), [params]);

    return (
        <div>
            <div className="">
                <Loading open={openLoading} setOpen={setOpenLoading} />
                <div className="w-full bg-white rounded-md shadow-md shadow-gray-500/30 py-2 px-3">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                        <div className="flex gap-3">
                            {openForm ? (
                                <button
                                    onClick={closeHandler}
                                    className="py-1 px-2 rounded-lg bg-red-500 hover:bg-red-500 text-white"
                                >
                                    <Cancel color="inherit" fontSize="small" />
                                </button>
                            ) : (
                                auth.roles == "ketua posyandu" && (
                                    <button
                                        onClick={tambahHandler}
                                        className="py-1 px-2 rounded-lg bg-blue-500 hover:bg-blue-500 text-white"
                                    >
                                        <Add color="inherit" fontSize="small" />
                                    </button>
                                )
                            )}
                            <Link
                                href={route("admin.dashboard")}
                                className="py-1 px-2 rounded-lg flex gap-2 items-center bg-green-500 hover:bg-green-500 text-white"
                            >
                                <ArrowBack color="inherit" fontSize="small" />
                                <p>Back</p>
                            </Link>
                        </div>
                        <div className="flex gap-3 items-center ">
                            <input
                                onChange={(e) =>
                                    setParams({
                                        ...params,
                                        dari_tanggal: e.target.value,
                                    })
                                }
                                type="date"
                                className="bg-white rounded-md overflow-hidden "
                                placeholder={"Dari Tanggal"}
                            />
                            <input
                                onChange={(e) =>
                                    setParams({
                                        ...params,
                                        sampai_tanggal: e.target.value,
                                    })
                                }
                                type="date"
                                className="bg-white rounded-md overflow-hidden "
                                placeholder={"Sampai Tanggal"}
                            />
                        </div>
                    </div>
                    {/*  */}

                    {openForm && (
                        <div>
                            <Form
                                setOpen={setOpenForm}
                                setOpenLoading={setOpenLoading}
                            />
                        </div>
                    )}

                    <div className="my-3 rounded-md overflow-hidden py-2 px-3">
                        <DataTable
                            data={dataKegiatan}
                            columns={columns}
                            pagination
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => (
    <AdminLayout children={page} title="Kelola Data Kegiatan Posyandu" />
);
