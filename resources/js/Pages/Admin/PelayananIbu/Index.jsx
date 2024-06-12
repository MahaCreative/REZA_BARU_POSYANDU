import AdminLayout from "@/Layouts/AdminLayout";
import { Check } from "@mui/icons-material";
import { Tooltip, debounce } from "@mui/material";
import React from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import FormPelayanan from "./FormPelayanan";
import { useCallback } from "react";
import { useEffect } from "react";
import InputText from "@/Components/InputText";
import { Link, router } from "@inertiajs/react";

export default function Index(props) {
    const dataIbu = props.dataIbu;
    const kegiatan = props.kegiatan;
    const [params, setParams] = useState({ cari: "" });
    const [model, setModel] = useState(null);
    const columns = [
        {
            name: "#",
            selector: (row, index) => index + 1,
            width: "60px",
        },
        {
            name: "Aksi",
            width: "60px",
            selector: (row) => (
                <div>
                    <button
                        onClick={() => setModel(row)}
                        className="py-1 text-xs px-1 rounded-md text-white hover:cursor-pointer hover:bg-blue-700 bg-blue-500"
                    >
                        <Tooltip title="Pilih ke anggotaan ibu">
                            <Check color="inherit" fontSize="inherit" />
                        </Tooltip>
                    </button>
                </div>
            ),
            wrap: true,
        },
        {
            name: "Nama Ibu",
            selector: (row) => row.nama_lengkap,
            wrap: true,
        },
        {
            name: "NIK",
            selector: (row) => row.nik,
            wrap: true,
        },
        {
            name: "Kode Anggota",
            selector: (row) =>
                row.keanggotaan[row.keanggotaan.length - 1].kode_anggota,
            wrap: true,
        },
        {
            name: "HPHT",
            selector: (row) => row.keanggotaan[row.keanggotaan.length - 1].hpht,
            wrap: true,
        },
        {
            name: "Hamil Ke",
            selector: (row) =>
                "Anak ke " +
                row.keanggotaan[row.keanggotaan.length - 1].hamil_ke,
            wrap: true,
        },
    ];
    const reload = useCallback(
        debounce((query) => {
            router.get(
                route("admin.create-pelayanan-ibu", kegiatan.kd_kegiatan),
                query,
                {
                    preserveState: true,
                    preserveScroll: true,
                }
            );
        }, 150),
        []
    );
    useEffect(() => reload(params), [params]);
    return (
        <div>
            <div className="flex justify-between items-center my-3">
                <p className="text-white items-center">
                    Silahkan memilih data ibu yang belum mendapatkan pelayanan.
                </p>
                <div className="flex gap-3">
                    <InputText
                        onChange={(e) =>
                            setParams({ ...params, cari: e.target.value })
                        }
                        className={"bg-white my-2"}
                        placeholder={"Cari Ibu..."}
                    />
                    <Link
                        href={route("admin.show-data-kegiatan", {
                            kd_kegiatan: kegiatan.kd_kegiatan,
                        })}
                        as="button"
                        className="text-white px-3 bg-blue-500 text-center"
                    >
                        Kembali
                    </Link>
                </div>
            </div>
            <DataTable
                data={dataIbu}
                columns={columns}
                pagination
                highlightOnHover
            />
            <FormPelayanan
                model={model}
                setModel={setModel}
                kegiatan={kegiatan}
            />
        </div>
    );
}

Index.layout = (page) => (
    <AdminLayout children={page} title={"Tambah Pelayanan Ibu"} />
);
