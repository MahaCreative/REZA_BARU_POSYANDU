import React from "react";
import ShowGrafik from "./ShowGrafik";

export default function StatPelayananIbu(props) {
    const countResiko = props.countResiko;
    const countUsia = props.countUsia;
    const countPosisi = props.countPosisi;
    const countImun = props.countImun;
    const countPemberianVit = props.countPemberianVit;
    return (
        <div>
            <h1 className="text-pink-500 text-xl my-3">
                Statistik Pelayanan Ibu
            </h1>
            {/*Table count*/}
            <div>
                <table className="w-full border border-gray-500/40 table-auto">
                    <thead className="capitalize">
                        <tr>
                            <th
                                className="border border-gray-500/40"
                                rowspan="2"
                            >
                                #
                            </th>
                            <th
                                className="border border-gray-500/40"
                                colspan="2"
                            >
                                Resiko Kehamilan
                            </th>
                            <th
                                className="border border-gray-500/40"
                                colspan="4"
                            >
                                Posisi Janin
                            </th>
                            <th
                                className="border border-gray-500/40"
                                colspan="4"
                            >
                                Pemberian Vitamin A
                            </th>
                        </tr>
                        <tr>
                            {countResiko.map((item, key) => (
                                <th
                                    className="border border-gray-500/40"
                                    key={key}
                                >
                                    {item.kategori}
                                </th>
                            ))}
                            {countPosisi.map((item, key) => (
                                <th
                                    className="border border-gray-500/40"
                                    key={key}
                                >
                                    {item.kategori}
                                </th>
                            ))}
                            {countPemberianVit.map((item, key) => (
                                <th
                                    className="border border-gray-500/40"
                                    key={key}
                                >
                                    {item.kategori}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-500/40">
                                Jumlah
                            </td>

                            {countResiko.map((item, key) => (
                                <td
                                    className="border border-gray-500/40 text-center"
                                    key={key}
                                >
                                    {item.jumlah}
                                </td>
                            ))}
                            {countPosisi.map((item, key) => (
                                <td
                                    className="border border-gray-500/40 text-center"
                                    key={key}
                                >
                                    {item.jumlah}
                                </td>
                            ))}
                            {countPemberianVit.map((item, key) => (
                                <td
                                    className="border border-gray-500/40 text-center"
                                    key={key}
                                >
                                    {item.jumlah}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
                <table className="w-full border border-gray-500/40 table-auto my-3">
                    <thead className="capitalize">
                        <tr>
                            <th
                                className="border border-gray-500/40"
                                rowspan="2"
                            >
                                #
                            </th>
                            <th
                                className="border border-gray-500/40"
                                colspan={countImun.jumlah_imunisasi.length}
                            >
                                Pemberian Imunisasi
                            </th>
                            <th
                                className="border border-gray-500/40"
                                colspan={countImun.jumlah_vaksin.length}
                            >
                                Pemberian Vaksin
                            </th>
                        </tr>
                        <tr>
                            {countImun.jumlah_imunisasi.map((item, key) => (
                                <th
                                    className="border border-gray-500/40"
                                    key={key}
                                >
                                    {item.kategori}
                                </th>
                            ))}
                            {countImun.jumlah_vaksin.map((item, key) => (
                                <th
                                    className="border border-gray-500/40"
                                    key={key}
                                >
                                    {item.kategori}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-500/40">
                                Jumlah
                            </td>

                            {countImun.jumlah_imunisasi.map((item, key) => (
                                <td
                                    className="border border-gray-500/40 text-center"
                                    key={key}
                                >
                                    {item.jumlah}
                                </td>
                            ))}
                            {countImun.jumlah_vaksin.map((item, key) => (
                                <td
                                    className="border border-gray-500/40 text-center"
                                    key={key}
                                >
                                    {item.jumlah}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
            {/*Grafik*/}
            <ShowGrafik
                countUsia={countUsia}
                countResiko={countResiko}
                countPosisi={countPosisi}
                countImun={countImun}
                countPemberianVit={countPemberianVit}
            />
        </div>
    );
}
