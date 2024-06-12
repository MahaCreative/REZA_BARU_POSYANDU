import React from "react";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import Highcharts from "highcharts";
import { PieChart } from "@mui/icons-material";
export default function StatPelayananAnak(props) {
    const jumlah_stunting = props.jumlah_stunting;
    const jumlah_pengidap_diare = props.jumlah_pengidap_diare;
    const jumlah_pemberian_vit_a = props.jumlah_pemberian_vit_a;
    const jumlah_pemberian_oralit = props.jumlah_pemberian_oralit;
    const jumlah_usia_anak = props.jumlah_usia_anak;
    const countImunAnak = props.countImunAnak;
    const grafPengidapDiare = {
        chart: {
            type: "pie",
        },
        title: {
            text: "Jumlah Pengidap Diare",
        },
        subtitle: {
            text: "Statistik Jumlah Pengidap Diare",
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
                name: "Jumlah Pengidap Diare",
                colorByPoint: true,
                shadow: 1,
                border: 1,
                data: jumlah_pengidap_diare.map((item) => ({
                    name: item.kategori,
                    y: item.jumlah,
                })),
            },
        ],
    };
    const grafStunting = {
        chart: {
            type: "pie",
        },
        title: {
            text: "Jumlah Stunting",
        },
        subtitle: {
            text: "Statistik Jumlah Stunting",
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
                name: "Jumlah Stunting",
                colorByPoint: true,
                shadow: 1,
                border: 1,
                data: jumlah_stunting.map((item) => ({
                    name: item.kategori,
                    y: item.jumlah,
                })),
            },
        ],
    };
    const grafPemberianOralit = {
        chart: {
            type: "pie",
        },
        title: {
            text: "Jumlah Pemberian Oralit",
        },
        subtitle: {
            text: "Statistik Jumlah Pemberian Oralit",
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
                name: "Jumlah Pemberian Oralit",
                colorByPoint: true,
                shadow: 1,
                border: 1,
                data: jumlah_pemberian_oralit.map((item) => ({
                    name: item.kategori,
                    y: item.jumlah,
                })),
            },
        ],
    };

    const graf_pemerian_vitamin_a = {
        chart: {
            type: "pie",
        },
        title: {
            text: "Jumlah Pemberian Vitamin A",
        },
        subtitle: {
            text: "Statistik Jumlah Pemberian Vitamin A",
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
                name: "Jumlah Pemberian Vitamin A",
                colorByPoint: true,
                shadow: 1,
                border: 1,
                data: jumlah_pemberian_vit_a.map((item) => ({
                    name: item.kategori,
                    y: item.jumlah,
                })),
            },
        ],
    };
    const statUsia = {
        chart: {
            type: "column",
        },
        title: {
            text: "Jumlah Usia Anak",
            align: "left",
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
                text: "Jumlah Usia Anak",
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
                name: "Jumlah Usia Anak",
                colorByPoint: true,
                shadow: 1,
                border: 1,
                data: jumlah_usia_anak.map((item, key) => ({
                    y: item,
                })),
            },
        ],
    };

    return (
        <div>
            <div>
                <h1 className="text-pink-500 text-xl my-3">
                    Statistik Pelayanan Anak
                </h1>
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th
                                className="border border-gray-500/40"
                                rowspan="2"
                            >
                                {" "}
                                #
                            </th>
                            <th
                                className="border border-gray-500/40"
                                colspan="3"
                            >
                                {" "}
                                Jumlah Stunting
                            </th>
                            <th
                                className="border border-gray-500/40"
                                colspan="2"
                            >
                                {" "}
                                Mengidap Diare
                            </th>
                            <th
                                className="border border-gray-500/40"
                                colspan="2"
                            >
                                {" "}
                                Pemberian Vitamin A
                            </th>
                            <th
                                className="border border-gray-500/40"
                                colspan="2"
                            >
                                {" "}
                                Pemberian Oralit
                            </th>
                        </tr>
                        <tr>
                            {jumlah_stunting.map((item, key) => (
                                <td
                                    className="border border-gray-500/40 capitalize text-center"
                                    key={key}
                                >
                                    {item.kategori}
                                </td>
                            ))}
                            {jumlah_pengidap_diare.map((item, key) => (
                                <td
                                    className="border border-gray-500/40 capitalize text-center"
                                    key={key}
                                >
                                    {item.kategori}
                                </td>
                            ))}
                            {jumlah_pemberian_vit_a.map((item, key) => (
                                <td
                                    className="border border-gray-500/40 capitalize text-center"
                                    key={key}
                                >
                                    {item.kategori}
                                </td>
                            ))}
                            {jumlah_pemberian_oralit.map((item, key) => (
                                <td
                                    className="border border-gray-500/40 capitalize text-center"
                                    key={key}
                                >
                                    {item.kategori}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="border border-gray-500/40 capitalize text-center">
                                Jumlah
                            </td>
                            {jumlah_stunting.map((item, key) => (
                                <td
                                    className="border border-gray-500/40 capitalize text-center"
                                    key={key}
                                >
                                    {item.jumlah}
                                </td>
                            ))}
                            {jumlah_pengidap_diare.map((item, key) => (
                                <td
                                    className="border border-gray-500/40 capitalize text-center"
                                    key={key}
                                >
                                    {item.jumlah}
                                </td>
                            ))}
                            {jumlah_pemberian_vit_a.map((item, key) => (
                                <td
                                    className="border border-gray-500/40 capitalize text-center"
                                    key={key}
                                >
                                    {item.jumlah}
                                </td>
                            ))}
                            {jumlah_pemberian_oralit.map((item, key) => (
                                <td
                                    className="border border-gray-500/40 capitalize text-center"
                                    key={key}
                                >
                                    {item.jumlah}
                                </td>
                            ))}
                        </tr>
                    </thead>
                </table>
                <table className="table-auto w-full my-3">
                    <thead>
                        <tr>
                            <th
                                className="border border-gray-500/40"
                                rowspan="#"
                            >
                                Jumlah Usia Anak
                            </th>
                            <th
                                className="border border-gray-500/40"
                                rowspan="#"
                            >
                                0-3 Bulan
                            </th>
                            <th
                                className="border border-gray-500/40"
                                rowspan="#"
                            >
                                4-6 Bulan
                            </th>
                            <th
                                className="border border-gray-500/40"
                                rowspan="#"
                            >
                                7-12 Bulan
                            </th>
                            <th
                                className="border border-gray-500/40"
                                rowspan="#"
                            >
                                1 Tahun Ke Atas
                            </th>
                            <th
                                className="border border-gray-500/40"
                                rowspan="#"
                            >
                                2 Tahun Ke Atas
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td
                                className="border border-gray-500/40 text-center"
                                rowspan="#"
                            >
                                Jumlah Anak
                            </td>
                            {jumlah_usia_anak.map((item, key) => (
                                <td
                                    key={key}
                                    className="border border-gray-500/40 text-center"
                                    rowspan="#"
                                >
                                    {item}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
                <table className="table-auto w-full my-3">
                    <thead>
                        <tr>
                            <th
                                className="border border-gray-500/40"
                                rowspan="2"
                            >
                                Jumlah pemberian Imunisasi dan Vaksin
                            </th>
                            <th
                                colspan={countImunAnak.jumlah_imunisasi.length}
                                className="border border-gray-500/40"
                            >
                                Jumlah Imunisasi
                            </th>
                            <th
                                colspan={countImunAnak.jumlah_vaksin.length}
                                className="border border-gray-500/40"
                            >
                                Jumlah Vaksin
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className="border border-gray-500/40">
                                Kategori
                            </th>
                            {countImunAnak.jumlah_imunisasi.map(
                                (item, index) => (
                                    <th
                                        key={index}
                                        className="border border-gray-500/40"
                                    >
                                        {item.kategori}
                                    </th>
                                )
                            )}
                            {countImunAnak.jumlah_vaksin.map((item, index) => (
                                <th
                                    key={index}
                                    className="border border-gray-500/40"
                                >
                                    {item.kategori}
                                </th>
                            ))}
                        </tr>
                        <tr>
                            <th className="border border-gray-500/40">
                                Jumlah
                            </th>
                            {countImunAnak.jumlah_imunisasi.map(
                                (item, index) => (
                                    <td
                                        key={index}
                                        className="border border-gray-500/40"
                                    >
                                        {item.jumlah}
                                    </td>
                                )
                            )}
                            {countImunAnak.jumlah_vaksin.map((item, index) => (
                                <td
                                    key={index}
                                    className="border border-gray-500/40"
                                >
                                    {item.jumlah}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={grafPengidapDiare}
                />
                <HighchartsReact
                    highcharts={Highcharts}
                    options={grafPemberianOralit}
                />
                <HighchartsReact
                    highcharts={Highcharts}
                    options={graf_pemerian_vitamin_a}
                />
                <HighchartsReact
                    highcharts={Highcharts}
                    options={grafStunting}
                />
            </div>
            <HighchartsReact highcharts={Highcharts} options={statUsia} />
        </div>
    );
}
