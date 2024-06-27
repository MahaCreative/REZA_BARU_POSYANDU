import AdminLayout from "@/Layouts/AdminLayout";
import React, { useEffect, useRef, useState } from "react";
import FormImunisasi from "./FormImunisasi";
import { Tooltip } from "@mui/material";

import { Delete, Edit } from "@mui/icons-material";
import Loading from "@/Components/Loading";
import Swal from "sweetalert2";
import { router } from "@inertiajs/react";
import FormFaksin from "./FormFaksin";
import DataTable from "react-data-table-component";

export default function Index({ ...props }) {
    const [dataVaksin, setDataVaksin] = useState(props.dataVaksin);
    const [dataImunisasi, setDataImunisasi] = useState(props.dataImunisasi);

    useEffect(() => {
        setDataVaksin(props.dataVaksin);
        setDataImunisasi(props.dataImunisasi);
    }, [props.dataVaksin, props.dataImunisasi]);
    const columnsImunisasi = [
        {
            name: "Kode Vaksin",
            selector: (row) => row.kd_imunisasi,
        },
        {
            name: "Nama Vaksin",
            selector: (row) => row.kd_imunisasi,
        },
        {
            name: "Untuk ",
            selector: (row) => row.kategori,
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
    const columnsVaksin = [
        {
            name: "Kode Vaksin",
            selector: (row) => row.kd_imunisasi,
        },
        {
            name: "Nama Vaksin",
            selector: (row) => row.kd_imunisasi,
        },
        {
            name: "Untuk ",
            selector: (row) => row.kategori,
        },
        {
            name: "Aksi",
            selector: (row) => (
                <div className="flex gap-3 justify-center">
                    <button
                        onClick={() => deleteHandlerVaksin(row.id)}
                        className="py-1 text-xs px-1 rounded-md text-white hover:cursor-pointer hover:bg-red-700 bg-red-500"
                    >
                        <Tooltip title="Hapus">
                            <Delete color="inherit" fontSize="inherit" />
                        </Tooltip>
                    </button>
                    <button
                        onClick={() => editHandlerVaksin(row)}
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
    const options = {
        paging: false,
        searching: false,
    };
    const getLoading = (value) => {
        setOpenLoading(value);
    };
    const [openLoading, setOpenLoading] = useState(false);
    const [modelImunisasi, setModelImunisasi] = useState(false);
    const [modelVaksin, setModelVaksin] = useState(false);
    const editHandler = (row) => {
        setModelImunisasi(row);
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
                    route("admin.delete-jenis-imunisasi", { id: id }),
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
    // Vaksin
    const editHandlerVaksin = (row) => {
        setModelVaksin(row);
    };
    const deleteHandlerVaksin = (id) => {
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
                router.delete(route("admin.delete-jenis-vaksin", { id: id }), {
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
        <div>
            <Loading open={openLoading} setOpen={setOpenLoading} />
            {/* Data Imunisasi */}
            <div className="">
                <h1 className="text-white font-semibold">Data Imunisasi</h1>
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="bg-white min-h-[50vh] w-full md:w-[80%] px-4 py-4 rounded-md overflow-x-auto">
                        <DataTable
                            data={dataImunisasi}
                            columns={columnsImunisasi}
                            stripped
                            highlightOnHover
                        />
                    </div>
                    <div className="px-4 py-4 bg-white rounded-md w-full md:w-[30%]">
                        <FormImunisasi
                            getLoading={getLoading}
                            model={modelImunisasi}
                            setmodel={setModelImunisasi}
                        />
                    </div>
                </div>
            </div>
            {/* Data Vaksin */}
            <div className="">
                <h1 className="text-white font-semibold">Data Vaksin</h1>
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="bg-white min-h-[50vh]  w-full md:w-[80%] px-4 py-4 rounded-md overflow-x-auto">
                        <DataTable
                            data={dataVaksin}
                            columns={columnsVaksin}
                            stripped
                            highlightOnHover
                        />
                    </div>
                    <div className="px-4 py-4 bg-white rounded-md w-full md:w-[30%]">
                        <FormFaksin
                            getLoading={getLoading}
                            model={modelVaksin}
                            setmodel={setModelVaksin}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
Index.layout = (page) => (
    <AdminLayout children={page} title={"Jenis Vaksin dan Imunisasi"} />
);
