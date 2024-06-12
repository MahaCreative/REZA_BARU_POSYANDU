import Cetak from "@/Layouts/Cetak";
import React from "react";
import DataTable from "react-data-table-component";

export default function CetakLaporanAnak(props) {
    const dataKegiatan = props.dataKegiatan;
    const pelayananAnak = props.pelayananAnak;
    const paramsAnak = props.paramsAnak;
    console.log(paramsAnak);
    const columnsAnak = [
        {
            name: "Nama Ibu",
            selector: (row) => row.data_anak.ibu.nama_lengkap,
            wrap: true,
            omit: paramsAnak.display_nama_ibu == 1 ? false : true,
        },
        {
            name: "Nama Anak",
            selector: (row) => row.data_anak.nama,
            wrap: true,
        },
        {
            name: "Nama Dusun",
            selector: (row) => row.data_anak.dusun,
            wrap: true,
            omit: paramsAnak.display_nama_dusun == 1 ? false : true,
        },
        {
            name: "Usia Anak",
            selector: (row) => row.usia_anak + " Bulan",
            wrap: true,
            omit: paramsAnak.display_nama_dusun == 1 ? false : true,
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
            omit: paramsAnak.display_berat_badan == 1 ? false : true,
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
            omit: paramsAnak.display_tinggi_badan == 1 ? false : true,
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
            omit: paramsAnak.display_lingkar_kepala == 1 ? false : true,
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
            omit: paramsAnak.display_lingkar_lengan == 1 ? false : true,
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
            omit: paramsAnak.display_status_stunting == 1 ? false : true,
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
            omit: paramsAnak.display_gizi == 1 ? false : true,
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
            omit: paramsAnak.display_mengidap_diare == 1 ? false : true,
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
            omit: paramsAnak.display_pemberian_vit_a == 1 ? false : true,
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
            omit: paramsAnak.display_pemberian_imunisasi == 1 ? false : true,
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
            omit: paramsAnak.display_nasihat == 1 ? false : true,
        },
    ];
    return (
        <div className="border border-gray-500/50 rounded-md">
            <div className="px-4 py-3">
                <h3 className="font-bold">
                    Perihal : Laporan Hasil Data Pelayanan Ibu
                </h3>
                <p>Tanggal Kegiatan : {dataKegiatan.tanggal_kegiatan}</p>
            </div>
            <DataTable data={pelayananAnak} columns={columnsAnak} dense />
        </div>
    );
}

CetakLaporanAnak.layout = (page) => <Cetak children={page} />;
