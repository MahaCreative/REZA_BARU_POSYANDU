import React, { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import InputText from "@/Components/InputText";
import Loading from "@/Components/Loading";
import { Link, router } from "@inertiajs/react";
import { Add, ArrowBack, Delete, Edit } from "@mui/icons-material";
import { Tooltip, debounce } from "@mui/material";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { useCallback } from "react";
import { useEffect } from "react";
export default function Index(props) {
    const [openLoading, setOpenLoading] = useState(false);
    const keanggotaanIbu = props.keanggotaanIbu;

    const columns = [
        {
            name: "Kode Anggota",
            selector: (row) => row.kode_anggota,
            width: "120px",
            wrap: true,
        },
        {
            name: "Nama Ibu",
            selector: (row) => row.ibu.nama_lengkap,
            width: "140px",
            wrap: true,
        },
        {
            name: "NIK",
            selector: (row) => row.ibu.nik,
            width: "120px",
            wrap: true,
        },

        {
            name: "Tanggal Pendaftaran",
            selector: (row) => row.tanggal_pendaftaran,
            width: "150px",
            wrap: true,
        },
        {
            name: "Hamil",
            selector: (row) => "Anak Ke " + row.hamil_ke,
            wrap: true,
        },
        {
            name: "BB/TB",
            selector: (row) => `${row.berat_badan} Kg / ${row.tinggi_badan} Cm`,
            wrap: true,
        },
        { name: "HPHT", selector: (row) => row.hpht, width: "130px" },
        { name: "HTP", selector: (row) => row.htp, width: "130px" },
        {
            name: "Riwayat Penyakit",
            selector: (row) => row.riwayat_penyakit,
            width: "150px",
            wrap: true,
        },
        {
            name: "Foto KTP",
            selector: (row) => (
                <>
                    <a target="_blank" href={"storage/" + row.foto}>
                        <img
                            src={"storage/" + row.foto_ktp}
                            alt=""
                            className="w-[40px]"
                        />
                    </a>
                </>
            ),
        },
        {
            name: "Foto KK",
            selector: (row) => (
                <>
                    <a target="_blank" href={"storage/" + row.foto}>
                        <img
                            src={"storage/" + row.foto_kk}
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
                    route("admin.form-update-keanggotaan-ibu", { id: value.id })
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
                router.delete(
                    route("admin.delete-data-keanggotaan-ibu", { id: id }),
                    {
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
                    }
                );
            } else {
                setOpenLoading(false);
            }
        });
    };
    const [params, setParams] = useState({ cari: "" });
    const reload = useCallback(
        debounce((query) => {
            router.get(route("admin.data-keanggotaan-ibu"), query, {
                preserveState: true,
                preserveScroll: true,
            });
        }, 150),
        []
    );
    useEffect(() => reload(params), [params]);

    return (
        <div>
            <div className="w-full">
                <Loading open={openLoading} setOpen={setOpenLoading} />
                <div className="w-full">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-3">
                            <Link
                                as="button"
                                href={route("admin.form-keanggotaan-ibu")}
                                className="py-1 px-2 rounded-lg flex gap-2 items-center bg-blue-500 hover:bg-blue-500 text-white"
                            >
                                <Add color="inherit" fontSize="small" />
                                <p>Tambah Data Anak</p>
                            </Link>
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
                                        cari: e.target.value,
                                    })
                                }
                                className="bg-white rounded-md overflow-hidden "
                                placeholder={"Cari Data"}
                            />
                        </div>
                    </div>
                    <div className="rounded-md w-full py-3">
                        <DataTable
                            data={keanggotaanIbu}
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
        </div>
    );
}
Index.layout = (page) => (
    <AdminLayout children={page} title="Kelola Keanggotaan Ibu" />
);
