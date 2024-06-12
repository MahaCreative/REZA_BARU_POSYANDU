import AdminLayout from "@/Layouts/AdminLayout";
import React from "react";
import DataTable from "react-data-table-component";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
export default function ShowPerIbu(props) {
    const ibu = props.ibu;
    const allPelayanan = props.allPelayanan;
    const stat_pelayanan = props.stat_pelayanan;
    const columnsIbu = [
        {
            name: "Umur Kehamilan",
            selector: (row) => row.umur_kehamilan + " Minggu",
            wrap: true,
            width: "130px",
            //   omit: params.umur_kehamilan ? false : true,
        },
        {
            name: "Resiko Kehamilan",
            selector: (row) => row.resiko_kehamilan,
            wrap: true,
            width: "130px",
            //   omit: params.display_resiko_kehamilan ? false : true,
        },
        {
            name: "BB/TB",
            selector: (row) => `${row.berat_badan} KG / ${row.tinggi_badan} Cm`,
            wrap: true,
            //   omit: params.display_berat_badan ? false : true,
        },
        {
            name: "Lingkar Lengan",
            selector: (row) => `${row.lingkar_lengan} Cm`,
            wrap: true,
            width: "120px",
            //   omit: params.display_lingkar_lengan ? false : true,
        },
        {
            name: "Lingkar Perut",
            selector: (row) => `${row.lingkar_perut} Cm`,
            wrap: true,
            //   omit: params.display_lingkar_perut ? false : true,
        },
        {
            name: "Tinggi Fundus",
            selector: (row) => `${row.tinggi_fundus} Cm`,
            wrap: true,
            //   omit: params.display_tinggi_fundus ? false : true,
        },
        {
            name: "Detak Janin",
            selector: (row) => `${row.detak_jantung_janin}`,
            //   omit: params.display_detak_jantung_janin ? false : true,
        },
        {
            name: "Tekanan Darah Ibu",
            selector: (row) => `${row.tekanan_darah_ibu}`,
            wrap: "true",
            width: "140px",
            //   omit: params.display_tekanan_darah_ibu ? false : true,
        },
        {
            name: "Posisi Janin",
            selector: (row) => `${row.posisi_janin}`,
            wrap: true,
            //   omit: params.display_posisi_janin ? false : true,
        },
        {
            name: "Imunisasi / Vaksin",
            selector: (row) =>
                `${row.pemberian_imunisasi} / ${row.pemberian_vaksin}`,
            wrap: true,
            width: "150px",
            //   omit: params.display_pemberian_imunisasi ? false : true,
        },
        {
            name: "Pemberian Vit A",
            selector: (row) => row.pemberian_vitamin_a,
            //   omit: params.display_pemberian_vit_a ? false : true,
        },
        {
            name: "Tindakan",
            selector: (row) => row.tindakan,
            //   omit: params.display_tindakan ? false : true,
        },
        {
            name: "nasihat",
            selector: (row) => row.nasihat,
            //   omit: params.display_nasihat ? false : true,
        },
    ];
    const parseData = (data) => {
        const categories = data.map((item) => `ID ${item.id}`);
        const tinggiBadan = data.map((item) => parseInt(item.tinggi_badan));
        const beratBadan = data.map((item) => parseInt(item.berat_badan));
        const lingkarLengan = data.map((item) => parseInt(item.lingkar_lengan));
        const lingkarPerut = data.map((item) => parseInt(item.lingkar_perut));
        const tinggiFundus = data.map((item) => parseInt(item.tinggi_fundus));

        return {
            categories,
            tinggiBadan,
            beratBadan,
            lingkarLengan,
            lingkarPerut,
            tinggiFundus,
        };
    };

    const {
        categories,
        tinggiBadan,
        beratBadan,
        lingkarLengan,
        lingkarPerut,
        tinggiFundus,
    } = parseData(stat_pelayanan);

    const options = {
        chart: {
            type: "spline",
        },
        title: {
            text: "Statistik Hasil Pemeriksaan Ibu Sejak 12 Pelayanan Terakhir",
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
                name: "Lingkar Perut",
                data: lingkarPerut,
            },
            {
                name: "Tinggi Fundus",
                data: tinggiFundus,
            },
        ],
    };
    return (
        <div>
            <div className="flex gap-3 flex-col md:flex-row bg-white py-2 px-3 rounded-md">
                <img
                    src={"/storage/" + ibu.foto}
                    alt=""
                    className="w-[350px] h-[200px] object-cover"
                />
                <div className="w-full">
                    <h3 className="text-pink-500 font-bold text-xl tracking-tighter">
                        Profile Ibu
                    </h3>
                    <div className="w-full">
                        <p>Nama Ibu : {ibu.nama_lengkap}</p>
                        <p>NIK Ibu : {ibu.nik}</p>
                        <p>TTL : {ibu.tempat_lahir + ", " + ibu.tgl_lahir}</p>
                        <p>Alamat : {ibu.alamat}</p>
                        <p>No Telp : {ibu.telephone}</p>
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th className="border border-gray-500 text-center capitalize">
                                        Gol Darah
                                    </th>
                                    <th className="border border-gray-500 text-center capitalize">
                                        Pekerjaan
                                    </th>
                                    <th className="border border-gray-500 text-center capitalize">
                                        Pendidikan
                                    </th>
                                    <th className="border border-gray-500 text-center capitalize">
                                        Desa
                                    </th>
                                    <th className="border border-gray-500 text-center capitalize">
                                        Dusun
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-gray-500 text-center capitalize">
                                        {ibu.gol_darah}
                                    </td>
                                    <td className="border border-gray-500 text-center capitalize">
                                        {ibu.pekerjaan.nama}
                                    </td>
                                    <td className="border border-gray-500 text-center capitalize">
                                        {ibu.pendidikan.nama}
                                    </td>
                                    <td className="border border-gray-500 text-center capitalize">
                                        {ibu.desa}
                                    </td>
                                    <td className="border border-gray-500 text-center capitalize">
                                        {ibu.dusun}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <h3 className="text-pink-500 font-bold text-xl tracking-tighter my-3 border-b border-pink-500 inline-block">
                Data Pelayanan Ibu
            </h3>
            <DataTable
                data={allPelayanan}
                columns={columnsIbu}
                pagination
                dense
                highlightOnHover
            />
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
}

ShowPerIbu.layout = (page) => (
    <AdminLayout children={page} title={"Detail Pelayanan Ibu"} />
);
