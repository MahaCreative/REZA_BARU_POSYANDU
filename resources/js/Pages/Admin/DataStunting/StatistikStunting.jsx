import HighchartsReact from "highcharts-react-official";
import React from "react";
import Highcharts from "highcharts";
import AdminLayout from "@/Layouts/AdminLayout";

export default function StatistikStunting(props) {
    const stuntingPertahun = props.stuntingPertahun;
    const count_stunting_perdusun = props.count_stunting_perdusun;
    console.log(count_stunting_perdusun);
    const getOptions = (status) => {
        return {
            chart: {
                type: "column",
            },
            title: {
                text: `Jumlah Anak ${
                    status.charAt(0).toUpperCase() + status.slice(1)
                } Stunting Perdusun`,
            },
            xAxis: {
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "Mei",
                    "Jun",
                    "Jul",
                    "Agu",
                    "Sep",
                    "Okt",
                    "Nov",
                    "Des",
                ],
            },
            yAxis: {
                title: {
                    text: "Jumlah Anak",
                },
            },
            series: Object.keys(stuntingPertahun).map((dusun) => ({
                name: dusun,
                data: Array.from({ length: 12 }, (_, monthIndex) => {
                    const monthData =
                        stuntingPertahun[dusun][monthIndex + 1] || {};
                    return monthData[status] || 0;
                }),
            })),
        };
    };

    return (
        <div>
            <div className="bg-white py-2 px-4 rounded-md my-3">
                <h3 className="text-pink-500 font-bold">
                    Data Jumlah Status Stunting Perdusun
                </h3>
                <table className="w-full">
                    <thead className="w-full">
                        <tr>
                            <th className="border border-gray-500" rowSpan={2}>
                                No
                            </th>
                            <th className="border border-gray-500" rowSpan={2}>
                                Nama Dusun
                            </th>
                            <th className="border border-gray-500" colSpan={4}>
                                Jumlah Data Anak Perkategori Stunting
                            </th>
                        </tr>
                        <tr>
                            <th className="border border-gray-500">Tidak </th>
                            <th className="border border-gray-500">
                                Berisiko{" "}
                            </th>
                            <th className="border border-gray-500">
                                Stunting{" "}
                            </th>
                            <th className="border border-gray-500">Sembuh </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(count_stunting_perdusun).map(
                            ([index, value], key) => (
                                <tr key={key}>
                                    <td className="border border-gray-500">
                                        {key + 1}
                                    </td>
                                    <td className="border border-gray-500">
                                        {index}
                                    </td>
                                    {Object.entries(value).map(
                                        ([index, value], key) => (
                                            <td className="border border-gray-500">
                                                {value + " Anak"}
                                            </td>
                                        )
                                    )}
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
            <div>
                <h3 className="text-pink-500 font-bold">
                    Statistik Status Stunting Perdusun Berdasarkan Hasil
                    Pemeriksaan Terakhir
                </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
                <div className="rounded-xl overflow-hidden">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={getOptions("stunting")}
                    />
                </div>
                <div className="rounded-xl overflow-hidden">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={getOptions("tidak")}
                    />
                </div>
                <div className="rounded-xl overflow-hidden">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={getOptions("berisiko")}
                    />
                </div>
                <div className="rounded-xl overflow-hidden">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={getOptions("sembuh")}
                    />
                </div>
            </div>
        </div>
    );
}

StatistikStunting.layout = (page) => (
    <AdminLayout children={page} title={"Jumlah Data Stunting"} />
);
