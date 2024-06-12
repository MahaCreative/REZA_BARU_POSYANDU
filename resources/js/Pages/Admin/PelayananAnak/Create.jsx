import AdminLayout from "@/Layouts/AdminLayout";
import { Cancel, Check } from "@mui/icons-material";
import { Tooltip, debounce } from "@mui/material";
import React from "react";
import DataTable from "react-data-table-component";
import FormPelayanan from "./FormPelayanan";
import { useState } from "react";
import InputText from "@/Components/InputText";
import { Link, router } from "@inertiajs/react";
import { useCallback } from "react";
import { useEffect } from "react";

export default function Create(props) {
    const dataAnak = props.dataAnak;
    const kegiatan = props.kegiatan;
    const [model, setModel] = useState(null);
    const columns = [
        { name: "#", selector: (row, index) => index + 1, width: "60px" },
        {
            name: "Pilih",
            selector: (row, index) =>
                model?.id == row.id ? (
                    <button
                        onClick={() => setModel(null)}
                        className="bg-red-500 py-1 px-2 rounded-md text-white"
                    >
                        <Tooltip title={`Batalkan Pemilihan ${row.nama}`}>
                            <Cancel />
                        </Tooltip>
                    </button>
                ) : (
                    <button
                        onClick={() => setModel(row)}
                        className="bg-blue-500 py-1 px-2 rounded-md text-white"
                    >
                        <Tooltip title={`Pilih ${row.nama}`}>
                            <Check />
                        </Tooltip>
                    </button>
                ),
            width: "80px",
        },
        {
            name: "Nama Ibu",
            selector: (row) => row.ibu.nama_lengkap,
            wrap: true,
        },
        {
            name: "Nama Anak",
            selector: (row) => row.nama,
            wrap: true,
        },
        {
            name: "Lingkar Lengan",
            selector: (row) => (
                <div>
                    <p>
                        {" "}
                        Sebelumnya :{" "}
                        {row.pelayanan_anak.lingkar_lengan_sebelumnya} Cm
                    </p>
                    <p>
                        {" "}
                        Sekarang : {
                            row.pelayanan_anak.lingkar_lengan_sekarang
                        }{" "}
                        Cm
                    </p>
                </div>
            ),
            wrap: true,
            width: "120px",
        },
        {
            name: "Status Stunting",
            selector: (row) => (
                <div>
                    <p>{row.pelayanan_anak.status_stunting} </p>
                </div>
            ),
            wrap: true,
            width: "120px",
        },
        {
            name: "Status Gizi",
            selector: (row) => (
                <div>
                    <p> BB/U : {row.pelayanan_anak.bb_u} </p>
                    <p> TB/U : {row.pelayanan_anak.tb_u} </p>
                    <p> BB/TB : {row.pelayanan_anak.bb_tb} </p>
                    <p> IMT/U : {row.pelayanan_anak.imt_u} </p>
                </div>
            ),
            wrap: true,
            width: "150px",
        },
        {
            name: "Mengidap Diare",
            selector: (row) => (
                <div>
                    <p> {row.pelayanan_anak.mengidap_diare} </p>
                </div>
            ),
            wrap: true,
            width: "120px",
        },
        {
            name: "Pemberian Vitamin",
            selector: (row) => (
                <div>
                    <p> Vitamin A: {row.pelayanan_anak.pemberian_vit_a} </p>
                    <p> Oralit: {row.pelayanan_anak.pemberian_oralit} </p>
                </div>
            ),
            wrap: true,
            width: "140px",
        },
    ];
    const [params, setParams] = useState({ cari: "" });
    const reload = useCallback(
        debounce((query) => {
            router.get(
                route("admin.create-pelayanan-anak", kegiatan.kd_kegiatan),
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
                    Silahkan memilih data anak yang belum mendapatkan pelayanan.
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
                data={dataAnak}
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

Create.layout = (page) => (
    <AdminLayout children={page} title={"Tambah Data Pelayanan Anak"} />
);
