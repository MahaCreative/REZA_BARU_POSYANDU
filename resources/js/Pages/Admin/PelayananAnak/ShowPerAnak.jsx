import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";
import DataTable from "react-data-table-component";

export default function ShowPerAnak(props) {
    const anak = props.anak;
    const allPelayanan = props.allPelayanan;
    const stat_pelayanan = props.stat_pelayanan;
    console.log(stat_pelayanan);
    const columnsAnak = [
        {
            name: "Usia Anak",
            selector: (row) => row.usia_anak + " Bulan",
            wrap: true,
            //   omit: paramsAnak.display_nama_dusun ? false : true,
        },
        {
            name: "Tanggal Kegiatan",
            selector: (row) => row.kegiatan.tanggal_kegiatan,
            wrap: true,
            //   omit: paramsAnak.display_nama_dusun ? false : true,
        },
        {
            name: "Berat Badan",
            selector: (row) => (
                <div>
                    <p> Sebelumnya : {row.berat_badan_sebelumnya} Kg</p>
                    <p> Sekarang : {row.berat_badan_sekarang} Kg</p>
                </div>
            ),
            wrap: true,
            //   omit: paramsAnak.display_berat_badan ? false : true,
        },
        {
            name: "Tinggi Badan",
            selector: (row) => (
                <div>
                    <p> Sebelumnya : {row.tinggi_badan_sebelumnya} Cm</p>
                    <p> Sekarang : {row.tinggi_badan_sekarang} Cm</p>
                </div>
            ),
            wrap: true,
            width: "130px",
            //   omit: paramsAnak.display_tinggi_badan ? false : true,
        },
        {
            name: "Lingkar Kepala",
            selector: (row) => (
                <div>
                    <p> Sebelumnya : {row.lingkar_kepala_sebelumnya} Cm</p>
                    <p> Sekarang : {row.lingkar_kepala_sekarang} Cm</p>
                </div>
            ),
            wrap: true,
            width: "130px",
            //   omit: paramsAnak.display_lingkar_kepala ? false : true,
        },
        {
            name: "Lingkar Lengan",
            selector: (row) => (
                <div>
                    <p> Sebelumnya : {row.lingkar_lengan_sebelumnya} Cm</p>
                    <p> Sekarang : {row.lingkar_lengan_sekarang} Cm</p>
                </div>
            ),
            wrap: true,
            width: "120px",
            //   omit: paramsAnak.display_lingkar_lengan ? false : true,
        },
        {
            name: "Status Stunting",
            selector: (row) => (
                <div>
                    <p>{row.status_stunting} </p>
                </div>
            ),
            wrap: true,

            width: "120px",
            //   omit: paramsAnak.display_status_stunting ? false : true,
        },
        {
            name: "Status Gizi",
            selector: (row) => (
                <div>
                    <p> BB/U : {row.bb_u} </p>
                    <p> TB/U : {row.tb_u} </p>
                    <p> BB/TB : {row.bb_tb} </p>
                    <p> IMT/U : {row.imt_u} </p>
                </div>
            ),
            wrap: true,
            width: "150px",
            //   omit: paramsAnak.display_gizi ? false : true,
        },
        {
            name: "Mengidap Diare",
            selector: (row) => (
                <div>
                    <p> {row.mengidap_diare} </p>
                </div>
            ),
            wrap: true,
            width: "120px",
            //   omit: paramsAnak.display_mengidap_diare ? false : true,
        },
        {
            name: "Pemberian Vitamin",
            selector: (row) => (
                <div>
                    <p> Vitamin A: {row.pemberian_vit_a} </p>
                    <p> Oralit: {row.pemberian_oralit} </p>
                </div>
            ),
            wrap: true,
            width: "140px",
            //   omit: paramsAnak.display_pemberian_vit_a ? false : true,
        },
        {
            name: "Imunisasi / Vaksin",
            selector: (row) => (
                <div>
                    <p> Imunisasi: {row.pemberian_imunisasi} </p>
                    <p> Vaksin: {row.pemberian_vaksin} </p>
                </div>
            ),
            wrap: true,
            width: "190px",
            //   omit: paramsAnak.display_pemberian_imunisasi ? false : true,
        },
        {
            name: "Nasehat",
            selector: (row) => (
                <div>
                    <p>{row.nasihat} </p>
                </div>
            ),
            wrap: true,
            width: "190px",
            //   omit: paramsAnak.display_nasihat ? false : true,
        },
    ];
    const parseData = (data) => {
        const categories = data.map((item) => `ID ${item.id}`);
        const tinggiBadan = data.map((item) =>
            parseInt(item.tinggi_badan_sekarang)
        );
        const beratBadan = data.map((item) =>
            parseInt(item.berat_badan_sekarang)
        );
        const lingkarLengan = data.map((item) =>
            parseInt(item.lingkar_lengan_sekarang)
        );
        const lingkarKepala = data.map((item) =>
            parseInt(item.lingkar_kepala_sekarang)
        );

        return {
            categories,
            tinggiBadan,
            beratBadan,
            lingkarLengan,
            lingkarKepala,
        };
    };

    const {
        categories,
        tinggiBadan,
        beratBadan,
        lingkarLengan,
        lingkarKepala,
    } = parseData(stat_pelayanan);

    const options = {
        chart: {
            type: "spline",
        },
        title: {
            text: "Statistik Hasil Pemeriksaan Anak Sejak 12 Pelayanan Terakhir",
        },
        xAxis: {
            categories: [
                "Pemeriksaan 1",
                "Pemeriksaan 2",
                "Pemeriksaan 3",
                "Pemeriksaan 4",
                "Pemeriksaan 5",
                "Pemeriksaan 6",
                "Pemeriksaan 7",
                "Pemeriksaan 8",
                "Pemeriksaan 9",
                "Pemeriksaan 10",
                "Pemeriksaan 11",
                "Pemeriksaan 12",
            ],
        },
        yAxis: {
            title: {
                text: "Nilai",
            },
        },
        series: [
            {
                name: "Tinggi Badan",
                data: tinggiBadan,
            },
            {
                name: "Berat Badan",
                data: beratBadan,
            },
            {
                name: "Lingkar Lengan",
                data: lingkarLengan,
            },
            {
                name: "Lingkar Kepala",
                data: lingkarKepala,
            },
        ],
    };
    return (
        <div>
            <div className="flex gap-3 flex-col md:flex-row bg-white py-2 px-3 rounded-md">
                <img
                    src={"/storage/" + anak.foto}
                    alt=""
                    className="w-[350px] h-[200px] object-cover"
                />
                <div className="w-full">
                    <h3 className="text-pink-500 font-bold text-xl tracking-tighter">
                        Profile Anak
                    </h3>
                    <div className="w-full">
                        <p>Nama Lengkap: {anak.nama}</p>
                        <p>Jenis Kelamin: {anak.jenis_kelamin}</p>
                        <p>
                            TTL :{" "}
                            {anak.tempat_lahir + ", " + anak.tanggal_lahir}
                        </p>
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="border border-gray-500 text-center capitalize">
                                        Gol Darah
                                    </th>
                                    <th className="border border-gray-500 text-center capitalize">
                                        Jenis Kelahiran
                                    </th>
                                    <th className="border border-gray-500 text-center capitalize">
                                        Berat Lahir
                                    </th>
                                    <th className="border border-gray-500 text-center capitalize">
                                        Tinggi Lahir
                                    </th>
                                    <th className="border border-gray-500 text-center capitalize">
                                        Dusun
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-500 text-center capitalize">
                                        {anak.gol_darah}
                                    </td>

                                    <td className="border border-gray-500 text-center capitalize">
                                        {anak.proses_kelahiran}
                                    </td>
                                    <td className="border border-gray-500 text-center capitalize">
                                        {anak.berat_lahir + "Kg"}
                                    </td>
                                    <td className="border border-gray-500 text-center capitalize">
                                        {anak.tinggi_lahir + "Cm"}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <h3 className="text-pink-500 font-bold text-xl tracking-tighter my-3 border-b border-pink-500 inline-block">
                Data Pelayanan Anak
            </h3>
            <DataTable
                data={allPelayanan}
                columns={columnsAnak}
                pagination
                dense
            />
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
}

ShowPerAnak.layout = (page) => (
    <AdminLayout children={page} title={"Detail Pelayanan Anak"} />
);
