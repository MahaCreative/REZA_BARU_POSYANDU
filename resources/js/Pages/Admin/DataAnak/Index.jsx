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
import Swal from "sweetalert2";
import GrafikAnak from "./GrafikAnak";
import { useCallback } from "react";
import { useEffect } from "react";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import Highcharts from "highcharts";
export default function Index(props) {
    const dataAnak = props.dataAnak;
    const statistikUsia = props.statistikUsia;
    const statistikDarah = props.statistikDarah;
    const jumlahKelamin = props.jumlahKelamin;

    const [openLoading, setOpenLoading] = useState(false);
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
                    route("admin.form-update-data-anak", { id: value.id })
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
                router.delete(route("admin.delete-data-anak", { id: id }), {
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
    const [params, setParams] = useState({ cari: "" });
    const reload = useCallback(
        debounce((query) => {
            router.get(route("admin.data-anak"), query, {
                preserveState: true,
                preserveScroll: true,
            });
        }, 150),
        []
    );
    useEffect(() => reload(params), [params]);
    const statUsiaLk = {
        chart: {
            type: "column",
        },
        title: {
            text: "Statistik Usia Anak Laki-Laki",
            align: "center",
        },

        xAxis: {
            categories: [
                "0-3 bulan",
                "4-6 bulan",
                "7-12 bulan",
                "1 tahun +",
                "2 tahun +",
            ],
            crosshair: true,
            accessibility: {
                description: "Jumlah",
            },
        },
        yAxis: {
            min: 0,
            title: {
                text: "Statistik Jumlah Usia Anak",
            },
        },

        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            },
        },
        series: [
            {
                name: statistikUsia[0].kategori,
                colorByPoint: true,
                shadow: 1,
                border: 1,
                data: statistikUsia[0].jumlah,
            },
        ],
    };
    const statUsiaPr = {
        chart: {
            type: "column",
        },
        title: {
            text: "Statistik Usia Anak Perempuan",
            align: "center",
        },

        xAxis: {
            categories: [
                "0-3 bulan",
                "4-6 bulan",
                "7-12 bulan",
                "1 tahun +",
                "2 tahun +",
            ],
            crosshair: true,
            accessibility: {
                description: "Jumlah",
            },
        },
        yAxis: {
            min: 0,
            title: {
                text: "Statistik Jumlah Usia Anak",
            },
        },

        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            },
        },
        series: [
            {
                name: statistikUsia[1].kategori,
                colorByPoint: true,
                shadow: 1,
                border: 1,
                data: statistikUsia[1].jumlah,
            },
        ],
    };
    console.log(statistikDarah);
    const grafGolLk = {
        chart: {
            type: "pie",
        },
        title: {
            text: "Statistik Golongan Darah Anak Laki-Laki",
        },

        accessibility: {
            enabled: true,
        },

        legend: {
            // Konfigurasi legend
            align: "center",
            verticalAlign: "bottom",
            layout: "horizontal",
        },

        buttonOptions: {
            align: "right",
            buttonSpacing: 3,
            enabled: true,
            height: 28,
            symbolFill: "#666666",
            symbolSize: 14,
            symbolStroke: "#666666",
            symbolStrokeWidth: 3,
            symbolX: 14.5,
            symbolY: 13.5,
            text: null,
        },
        navigation: {
            buttonOptions: {
                enabled: true, // Mengaktifkan tombol navigasi
            },
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: "{point.name}: {point.y:f}",
                },
            },
            pie: {
                allowPointSelect: true,
                cursor: "pointer",
                showInLegend: true,
            },
        },

        series: [
            {
                name: "Statistik Golongan Darah Anak",
                colorByPoint: true,
                shadow: 1,
                border: 1,
                data: statistikDarah[0].item.map((item) => ({
                    name: item.name,
                    y: item.y,
                })),
            },
        ],
    };
    const grafGolPr = {
        chart: {
            type: "pie",
        },
        title: {
            text: "Statistik Golongan Darah Anak Perempuan",
        },

        accessibility: {
            enabled: true,
        },

        legend: {
            // Konfigurasi legend
            align: "center",
            verticalAlign: "bottom",
            layout: "horizontal",
        },

        buttonOptions: {
            align: "right",
            buttonSpacing: 3,
            enabled: true,
            height: 28,
            symbolFill: "#666666",
            symbolSize: 14,
            symbolStroke: "#666666",
            symbolStrokeWidth: 3,
            symbolX: 14.5,
            symbolY: 13.5,
            text: null,
        },
        navigation: {
            buttonOptions: {
                enabled: true, // Mengaktifkan tombol navigasi
            },
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: "{point.name}: {point.y:f}",
                },
            },
            pie: {
                allowPointSelect: true,
                cursor: "pointer",
                showInLegend: true,
            },
        },

        series: [
            {
                name: "Statistik Golongan Darah Anak",
                colorByPoint: true,
                shadow: 1,
                border: 1,
                data: statistikDarah[1].item.map((item) => ({
                    name: item.name,
                    y: item.y,
                })),
            },
        ],
    };

    return (
        <div>
            <div className="w-full">
                <Loading open={openLoading} setOpen={setOpenLoading} />

                <div className="flex gap-3 md:flex-row jusitfy-between items-center my-3 bg-gradient-to-br">
                    <CountCard
                        icon={<Face color="inherit" fontSize="inherit" />}
                        background={
                            "bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 "
                        }
                        title={jumlahKelamin[0].kategori}
                        count={jumlahKelamin[0].jumlah}
                    />

                    <CountCard
                        background={
                            "bg-gradient-to-br from-pink-900 via-pink-800 to-pink-600 "
                        }
                        icon={<Face2 color="inherit" fontSize="inherit" />}
                        title={jumlahKelamin[1].kategori}
                        count={jumlahKelamin[1].jumlah}
                    />
                    {/* <CountCard title={item.kategori} count={item.jumlah} /> */}
                </div>

                <div className="w-full">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-3">
                            <Link
                                as="button"
                                href={route("admin.form-data-anak")}
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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={statUsiaLk}
                    />
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={statUsiaPr}
                    />
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={grafGolLk}
                    />
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={grafGolPr}
                    />
                    {/* <GrafikAnak darah={statistikDarah} usia={statistikUsia} jumlahKelamin={jumlahKelamin}/> */}
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => (
    <AdminLayout children={page} title={"Kelola Data Anak"} />
);
