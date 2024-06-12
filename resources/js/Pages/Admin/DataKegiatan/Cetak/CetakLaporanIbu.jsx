import Cetak from "@/Layouts/Cetak";
import React from "react";
import DataTable from "react-data-table-component";

export default function CetakLaporanIbu(props) {
    const params = props.params;
    const dataKegiatan = props.dataKegiatan;
    const pelayananIbu = props.pelayananIbu;
    const columnsIbu = [
        {
            name: "Nama Ibu",
            selector: (row) => row.ibu.nama_lengkap,
            wrap: true,
        },
        {
            name: "NIK",
            selector: (row) => row.ibu.nik,
            wrap: true,
        },
        {
            name: "Dusun",
            selector: (row) => row.ibu.dusun,
            wrap: true,
            omit: params.display_nama_dusun == 1 ? false : true,
        },
        {
            name: "Umur Kehamilan",
            selector: (row) => row.umur_kehamilan + " Minggu",
            wrap: true,
            width: "130px",
            omit: params.umur_kehamilan == 1 ? false : true,
        },
        {
            name: "Resiko Kehamilan",
            selector: (row) => row.resiko_kehamilan,
            wrap: true,
            width: "130px",
            omit: params.display_resiko_kehamilan == 1 ? false : true,
        },
        {
            name: "BB/TB",
            selector: (row) => `${row.berat_badan} KG / ${row.tinggi_badan} Cm`,
            wrap: true,
            omit: params.display_berat_badan == 1 ? false : true,
        },
        {
            name: "Lingkar Lengan",
            selector: (row) => `${row.lingkar_lengan} Cm`,
            wrap: true,
            width: "120px",
            omit: params.display_lingkar_lengan == 1 ? false : true,
        },
        {
            name: "Lingkar Perut",
            selector: (row) => `${row.lingkar_perut} Cm`,
            wrap: true,
            omit: params.display_lingkar_perut == 1 ? false : true,
        },
        {
            name: "Tinggi Fundus",
            selector: (row) => `${row.tinggi_fundus} Cm`,
            wrap: true,
            omit: params.display_tinggi_fundus == 1 ? false : true,
        },
        {
            name: "Detak Janin",
            selector: (row) => `${row.detak_jantung_janin}`,
            omit: params.display_detak_jantung_janin == 1 ? false : true,
        },
        {
            name: "Tekanan Darah Ibu",
            selector: (row) => `${row.tekanan_darah_ibu}`,
            wrap: "true",
            width: "140px",
            omit: params.display_tekanan_darah_ibu == 1 ? false : true,
        },
        {
            name: "Posisi Janin",
            selector: (row) => `${row.posisi_janin}`,
            wrap: true,
            omit: params.display_posisi_janin == 1 ? false : true,
        },
        {
            name: "Imunisasi / Vaksin",
            selector: (row) =>
                `${row.pemberian_imunisasi} / ${row.pemberian_vaksin}`,
            wrap: true,
            width: "150px",
            omit: params.display_pemberian_imunisasi == 1 ? false : true,
        },
        {
            name: "Pemberian Vit A",
            selector: (row) => row.pemberian_vitamin_a,
            omit: params.display_pemberian_vit_a == 1 ? false : true,
        },
        {
            name: "Tindakan",
            selector: (row) => row.tindakan,
            omit: params.display_tindakan == 1 ? false : true,
        },
        {
            name: "nasihat",
            selector: (row) => row.nasihat,
            omit: params.display_nasihat == 1 ? false : true,
        },
    ];
    console.log(dataKegiatan);

    return (
        <div className="border border-gray-500/50 rounded-md">
            <div className="px-4 py-3">
                <h3 className="font-bold">
                    Perihal : Laporan Hasil Data Pelayanan Ibu
                </h3>
                <p>Tanggal Kegiatan : {dataKegiatan.tanggal_kegiatan}</p>
            </div>
            <DataTable data={pelayananIbu} columns={columnsIbu} dense />
        </div>
    );
}

CetakLaporanIbu.layout = (page) => (
    <Cetak children={page} title={"Cetak Laporan Ibu"} />
);
