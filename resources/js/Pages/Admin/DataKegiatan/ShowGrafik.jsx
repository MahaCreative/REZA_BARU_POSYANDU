import React from "react";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import Highcharts from "highcharts";
// Aktifkan modul ekspor
HighchartsExporting(Highcharts);
// Aktifkan modul aksesibilitas jika diperlukan
HighchartsAccessibility(Highcharts);
export default function ShowGrafik({
    countResiko,
    countPosisi,
    countImun,
    countPemberianVit,
    countUsia,
}) {
    const grafImunisasi = {
        chart: {
            type: "pie",
        },
        title: {
            text: "Jumlah Pemberian Imunisasi",
        },
        subtitle: {
            text: "Statistik Jumlah Pemberian Imunisasi",
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
                name: "Jumlah Pemberian Imunisasi",
                colorByPoint: true,
                shadow: 1,
                border: 1,
                data: countImun.jumlah_imunisasi.map((item) => ({
                    name: item.kategori,
                    y: item.jumlah,
                })),
            },
        ],
    };
    const grafVaksin = {
        chart: {
            type: "pie",
        },
        title: {
            text: "Jumlah Pemberian Vaksin",
        },
        subtitle: {
            text: "Statistik Jumlah Pemberian Vaksin",
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
                name: "Jumlah Pemberian Vaksin",
                colorByPoint: true,
                shadow: 1,
                border: 1,
                data: countImun.jumlah_vaksin.map((item) => ({
                    name: item.kategori,
                    y: item.jumlah,
                })),
            },
        ],
    };
    const grafPosisi = {
        chart: {
            type: "pie",
        },
        title: {
            text: "Jumlah Poisi Janin",
        },
        subtitle: {
            text: "Statistik Jumlah Pemberian Vaksin",
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
                name: "Jumlah Posisi Janin",
                colorByPoint: true,
                shadow: 1,
                border: 1,
                data: countPosisi.map((item) => ({
                    name: item.kategori,
                    y: item.jumlah,
                })),
            },
        ],
    };
    const statResiko = {
        chart: {
            type: "column",
        },
        title: {
            text: "Jumlah Resiko Kehamilan",
            align: "left",
        },

        xAxis: {
            categories: ["Rendah", "Tinggi"],
            crosshair: true,
            accessibility: {
                description: "Jumlah",
            },
        },
        yAxis: {
            min: 0,
            title: {
                text: "Statistik Resiko Kehamilan",
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
                name: "Resiko Kehamilan",
                colorByPoint: true,
                shadow: 1,
                border: 1,
                data: countResiko.map((item, key) => ({
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
            text: "Jumlah Usia Kehamilan",
            align: "left",
        },

        xAxis: {
            categories: [
                "0 - 1 Bulan",
                "2 - 3 Bulan",
                "4 - 6 bulan",
                "7 - 9 Bulan",
            ],
            crosshair: true,
            accessibility: {
                description: "Jumlah",
            },
        },
        yAxis: {
            min: 0,
            title: {
                text: "Statistik Resiko Kehamilan",
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
                name: "Jumlah Usia Kehamilan",
                colorByPoint: true,
                shadow: 1,
                border: 1,
                data: countUsia.map((item, key) => ({
                    name: item.kategori,
                    y: item.jumlah,
                })),
            },
        ],
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-3 my-2">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={grafImunisasi}
                />
                <HighchartsReact highcharts={Highcharts} options={grafVaksin} />
                <HighchartsReact highcharts={Highcharts} options={grafPosisi} />
                <HighchartsReact highcharts={Highcharts} options={statResiko} />
            </div>
            <HighchartsReact highcharts={Highcharts} options={statUsia} />
        </div>
    );
}
