import VisibilityIcon from "@mui/icons-material/Visibility";
import InputText from "@/Components/InputText";
import CountCard from "@/Components/CountCard";
import Loading from "@/Components/Loading";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, router } from "@inertiajs/react";
import { Add, ArrowBack, Delete, Edit, Face, Face2 } from "@mui/icons-material";
import { Tooltip, debounce } from "@mui/material";
import React from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";

export default function DataAnak(props) {
    const dataAnak = props.dataAnak;

    const columns = [
        {
            name: "Nama Lengkap",
            selector: (row) => row.nama,
            wrap: true,
        },
        {
            name: "Nama Ibu",
            selector: (row) => row.ibu.nama_lengkap,
            wrap: true,
        },
        {
            name: "Tempat TGL Lahir",
            selector: (row) => row.tempat_lahir + ", " + row.tanggal_lahir,
            wrap: true,
        },

        { name: "Golongan Darah", selector: (row) => row.gol_darah },
        { name: "Jenis Kelamin", selector: (row) => row.jenis_kelamin },
        { name: "Proses Kelahiran", selector: (row) => row.proses_kelahiran },
        {
            name: "BB/TB Lahir",
            selector: (row) => `${row.berat_lahir} / ${row.tinggi_lahir}`,
        },

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
                    <Link
                        href={route("show-pelayanan-anak", {
                            id: row.id,
                        })}
                        className="py-1 text-xs px-1 rounded-md text-white hover:cursor-pointer hover:bg-blue-700 bg-blue-500"
                    >
                        <Tooltip title="Lihat semua data pelayanan Anak">
                            <VisibilityIcon
                                color="inherit"
                                fontSize="inherit"
                            />
                        </Tooltip>
                    </Link>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="w-full">
                <div className="w-full">
                    <div className="rounded-md w-full py-3">
                        <DataTable
                            data={dataAnak}
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

DataAnak.layout = (page) => (
    <AdminLayout children={page} title={"Kelola Data Anak"} />
);
