import React, { useState, useEffect } from "react";

import AdminLayout from "@/Layouts/AdminLayout";
import InputText from "@/Components/InputText";
import Loading from "@/Components/Loading";
import { Link, router, usePage } from "@inertiajs/react";
import {
    Add,
    Delete,
    Edit,
    Cancel,
    ArrowBack,
    Print,
    Filter,
    Filter2,
} from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    MenuItem,
    Modal,
    Tooltip,
    debounce,
} from "@mui/material";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import ShowGrafik from "./ShowGrafik";
import StatPelayananAnak from "./StatPelayananAnak";
import StatPelayananIbu from "./StatPelayananIbu";
import { useCallback } from "react";
import SelectOption from "@/Components/SelectOption";
let detailKegiatan = "";
export default function Show(props) {
    const [menu, setMenu] = useState("ibu");
    const { dusun } = usePage().props;
    const countResiko = props.countResiko;
    const countUsia = props.countUsia;
    const countPosisi = props.countPosisi;
    const countImun = props.countImun;
    const countPemberianVit = props.countPemberianVit;
    const dataKegiatan = props.dataKegiatan;
    const jumlah_stunting = props.jumlah_stunting;
    const jumlah_pengidap_diare = props.jumlah_pengidap_diare;
    const jumlah_pemberian_vit_a = props.jumlah_pemberian_vit_a;
    const jumlah_pemberian_oralit = props.jumlah_pemberian_oralit;
    const jumlah_usia_anak = props.jumlah_usia_anak;
    const pelayananAnak = props.pelayananAnak;
    const pelayananIbu = props.pelayananIbu;

    const countImunAnak = props.countImunAnak;

    const deleteHandler = (row) => {
        Swal.fire({
            title: "Hapus Pelayanan Anak",
            text: `Apakah anda yakin ingin menghapus pelayanan ${row.data_anak.nama}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Hapus Pelayanan",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(
                    route("admin.delete-pelayanan-anak", { id: row.id }),
                    {
                        preserveScroll: true,
                        onError: () => {
                            Swal.fire({
                                title: "Error",
                                text: "Gagal menghapus data pelayanan anak?",
                                icon: "error",
                            });
                        },
                        onSuccess: () => {
                            Swal.fire({
                                title: "Sukses",
                                text: "Berhasil menghaus 1 data pelayanan",
                                icon: "success",
                            });
                        },
                    }
                );
            }
        });
    };
    const deleteHandlerIbu = (row) => {
        Swal.fire({
            title: "Hapus Pelayanan Ibu",
            text: `Apakah anda yakin ingin menghapus pelayanan ${row.ibu.nama_lengkap}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Hapus Pelayanan",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(
                    route("admin.delete-pelayanan-ibu", { id: row.id }),
                    {
                        preserveScroll: true,
                        onError: () => {
                            Swal.fire({
                                title: "Error",
                                text: "Gagal menghapus data pelayanan ibu",
                                icon: "error",
                            });
                        },
                        onSuccess: () => {
                            Swal.fire({
                                title: "Sukses",
                                text: "Berhasil menghaus 1 data pelayanan",
                                icon: "success",
                            });
                        },
                    }
                );
            }
        });
    };
    const [modalFilterAnak, setModalFilterAnak] = useState(false);
    const [modalFilterIbu, setModalFilterIu] = useState(false);
    const [params, setParams] = useState({
        cari_ibu: "",
        nama_dusun: "",
        posisi_janin: "",
        resiko_kehamilan: "",
        display_nama_dusun: true,
        display_tinggi_badan: true,
        display_berat_badan: true,
        display_lingkar_lengan: true,
        display_lingkar_perut: true,
        display_tinggi_fundus: true,
        display_detak_jantung_janin: false,
        display_tekanan_darah_ibu: false,
        display_posisi_janin: true,
        display_pemberian_imunisasi: false,
        display_pemberian_vitamin_a: false,
        display_umur_kehamilan: true,
        display_resiko_kehamilan: true,
        display_tindakan: false,
        display_nasihat: false,
    });
    const [paramsAnak, setParamsAnak] = useState({
        nama_ibu: "",
        nama_anak: "",
        status_stunting: "",
        nama_dusun: "",
        bb_u: "",
        tb_u: "",
        bb_tb: "",
        imt_u: "",

        // display
        display_nama_ibu: true,
        display_nama_dusun: true,
        display_usia_anak: true,
        display_berat_badan: true,
        display_tinggi_badan: true,
        display_lingkar_lengan: false,
        display_lingkar_kepala: false,
        display_gizi: true,
        display_status_stunting: true,
        display_mengidap_diare: false,
        display_pemberian_oralit: false,
        display_pemberian_vit_a: false,
        display_pemberian_imunisasi: false,
        display_nasihat: false,
    });
    const handleChange = (e) => {
        const { name, checked } = e.target;
        setParamsAnak((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
    };
    const handleChangeIbu = (e) => {
        const { name, checked } = e.target;
        setParams((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
    };

    const columnsIbu = [
        {
            name: "Aksi",
            width: "60px",
            selector: (row) => (
                <div>
                    <Link
                        href={route("show-pelayanan-ibu", { id: row.ibu.id })}
                        as="button"
                        className="py-1 text-xs px-1 rounded-md text-white hover:cursor-pointer hover:bg-blue-700 bg-blue-500"
                    >
                        <Tooltip title="Lihat semua data pelayanan ibu">
                            <VisibilityIcon
                                color="inherit"
                                fontSize="inherit"
                            />
                        </Tooltip>
                    </Link>
                    <button
                        onClick={() => deleteHandlerIbu(row)}
                        className="py-1 mt-2 text-xs px-1 rounded-md text-white hover:cursor-pointer hover:bg-red-700 bg-red-500"
                    >
                        <Tooltip title="Hapus Data Pelayanan Ini">
                            <Delete color="inherit" fontSize="inherit" />
                        </Tooltip>
                    </button>
                </div>
            ),
            wrap: true,
        },
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
            omit: params.display_nama_dusun ? false : true,
        },
        {
            name: "Umur Kehamilan",
            selector: (row) => row.umur_kehamilan + " Minggu",
            wrap: true,
            width: "130px",
            omit: params.umur_kehamilan ? false : true,
        },
        {
            name: "Resiko Kehamilan",
            selector: (row) => row.resiko_kehamilan,
            wrap: true,
            width: "130px",
            omit: params.display_resiko_kehamilan ? false : true,
        },
        {
            name: "BB/TB",
            selector: (row) => `${row.berat_badan} KG / ${row.tinggi_badan} Cm`,
            wrap: true,
            omit: params.display_berat_badan ? false : true,
        },
        {
            name: "Lingkar Lengan",
            selector: (row) => `${row.lingkar_lengan} Cm`,
            wrap: true,
            width: "120px",
            omit: params.display_lingkar_lengan ? false : true,
        },
        {
            name: "Lingkar Perut",
            selector: (row) => `${row.lingkar_perut} Cm`,
            wrap: true,
            omit: params.display_lingkar_perut ? false : true,
        },
        {
            name: "Tinggi Fundus",
            selector: (row) => `${row.tinggi_fundus} Cm`,
            wrap: true,
            omit: params.display_tinggi_fundus ? false : true,
        },
        {
            name: "Detak Janin",
            selector: (row) => `${row.detak_jantung_janin}`,
            omit: params.display_detak_jantung_janin ? false : true,
        },
        {
            name: "Tekanan Darah Ibu",
            selector: (row) => `${row.tekanan_darah_ibu}`,
            wrap: "true",
            width: "140px",
            omit: params.display_tekanan_darah_ibu ? false : true,
        },
        {
            name: "Posisi Janin",
            selector: (row) => `${row.posisi_janin}`,
            wrap: true,
            omit: params.display_posisi_janin ? false : true,
        },
        {
            name: "Imunisasi / Vaksin",
            selector: (row) =>
                `${row.pemberian_imunisasi} / ${row.pemberian_vaksin}`,
            wrap: true,
            width: "150px",
            omit: params.display_pemberian_imunisasi ? false : true,
        },
        {
            name: "Pemberian Vit A",
            selector: (row) => row.pemberian_vitamin_a,
            omit: params.display_pemberian_vit_a ? false : true,
        },
        {
            name: "Tindakan",
            selector: (row) => row.tindakan,
            omit: params.display_tindakan ? false : true,
        },
        {
            name: "nasihat",
            selector: (row) => row.nasihat,
            omit: params.display_nasihat ? false : true,
        },
    ];
    const columnsAnak = [
        {
            name: "Aksi",
            width: "60px",
            selector: (row) => (
                <div>
                    <Link
                        href={route("show-pelayanan-anak", {
                            id: row.data_anak.id,
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
                    <button
                        onClick={() => deleteHandler(row)}
                        className="py-1 mt-2 text-xs px-1 rounded-md text-white hover:cursor-pointer hover:bg-red-700 bg-red-500"
                    >
                        <Tooltip title="Hapus Data Pelayanan Ini">
                            <Delete color="inherit" fontSize="inherit" />
                        </Tooltip>
                    </button>
                </div>
            ),
            wrap: true,
        },
        {
            name: "Nama Ibu",
            selector: (row) => row.data_anak.ibu.nama_lengkap,
            wrap: true,
            omit: paramsAnak.display_nama_ibu ? false : true,
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
            omit: paramsAnak.display_nama_dusun ? false : true,
        },
        {
            name: "Usia Anak",
            selector: (row) => row.usia_anak + " Bulan",
            wrap: true,
            omit: paramsAnak.display_nama_dusun ? false : true,
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
            omit: paramsAnak.display_berat_badan ? false : true,
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
            omit: paramsAnak.display_tinggi_badan ? false : true,
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
            omit: paramsAnak.display_lingkar_kepala ? false : true,
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
            omit: paramsAnak.display_lingkar_lengan ? false : true,
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
            omit: paramsAnak.display_status_stunting ? false : true,
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
            omit: paramsAnak.display_gizi ? false : true,
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
            omit: paramsAnak.display_mengidap_diare ? false : true,
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
            omit: paramsAnak.display_pemberian_vit_a ? false : true,
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
            omit: paramsAnak.display_pemberian_imunisasi ? false : true,
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
            omit: paramsAnak.display_nasihat ? false : true,
        },
    ];
    const reloadDataAnak = useCallback(
        debounce((query) => {
            router.get(
                route("admin.show-data-kegiatan", {
                    kd_kegiatan: dataKegiatan.kd_kegiatan,
                }),
                query,
                {
                    preserveState: true,
                    preserveScroll: true,
                }
            );
        }, 150),
        []
    );
    const reloadDataIbu = useCallback(
        debounce((query) => {
            router.get(
                route("admin.show-data-kegiatan", {
                    kd_kegiatan: dataKegiatan.kd_kegiatan,
                }),
                query,
                {
                    preserveState: true,
                    preserveScroll: true,
                }
            );
        }, 150),
        []
    );
    useEffect(() => reloadDataIbu(params), [params]);
    useEffect(() => reloadDataAnak(paramsAnak), [paramsAnak]);
    const FilterLaporanAnak = () => {
        setModalFilterAnak(true);
    };
    const FilterLaporanIbu = () => {
        setModalFilterIu(true);
    };
    const cetakLaporanAnak = () => {
        router.visit(
            route("admin.cetak-lapoaran-anak", {
                id_kegiatan: dataKegiatan.id,
                paramsAnak,
                kd_kegiatan: dataKegiatan.kd_kegiatan,
            })
        );
    };
    const cetakLaporanIbu = () => {
        router.visit(
            route("admin.cetak-lapoaran-ibu", {
                id_kegiatan: dataKegiatan.id,
                params,
                kd_kegiatan: dataKegiatan.kd_kegiatan,
            })
        );
    };
    return (
        <div>
            {/* modal filter anak */}
            <Modal open={modalFilterAnak} onClose={setModalFilterAnak}>
                <div className="w-full h-full flex justify-center items-center">
                    <div className="w-[90%] max-h-[90vh] overflow-auto bg-white rounded-md py-2 px-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-pink-500 font-bold">
                                Filter Data Anak
                            </h3>
                            <button
                                onClick={() => setModalFilterAnak(false)}
                                className="text-gray-500 "
                            >
                                <Cancel color="inherit" fontSize="inherit" />
                            </button>
                        </div>
                        <p>
                            Silahkan mengatur form pencarian dibawah ini untuk
                            menampilkan data yang ingin anda lihat
                        </p>
                        <div className="my-3 flex gap-3 flex-row w-full">
                            <InputText
                                className="bg-white w-full"
                                label={"Nama Ibu"}
                                name="nama_ibu"
                                value={paramsAnak.nama_ibu}
                                onChange={(e) =>
                                    setParamsAnak({
                                        ...paramsAnak,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                            <InputText
                                className="bg-white w-full"
                                label={"Nama Anak"}
                                name="nama_anak"
                                value={paramsAnak.nama_anak}
                                onChange={(e) =>
                                    setParamsAnak({
                                        ...paramsAnak,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <SelectOption
                            className="bg-white w-full capitalize"
                            label={"Nama Dusun"}
                            name="nama_dusun"
                            value={paramsAnak.nama_dusun}
                            onChange={(e) =>
                                setParamsAnak({
                                    ...paramsAnak,
                                    [e.target.name]: e.target.value,
                                })
                            }
                        >
                            <MenuItem value={""}>Pilih Status BB/U</MenuItem>
                            {dusun.map((item, key) => (
                                <MenuItem value={item.nama_dusun}>
                                    {item.nama_dusun}
                                </MenuItem>
                            ))}
                        </SelectOption>
                        <div className="grid my-3 grid-cols-2 md:grid-cols-4 gap-3 items-center">
                            <SelectOption
                                className="bg-white w-full capitalize"
                                label={"BB/U"}
                                name="bb_u"
                                value={paramsAnak.bb_u}
                                onChange={(e) =>
                                    setParamsAnak({
                                        ...paramsAnak,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            >
                                <MenuItem value={""}>
                                    Pilih Status BB/U
                                </MenuItem>
                                <MenuItem value={"normal"}>normal</MenuItem>
                                <MenuItem value={"kurang"}>kurang</MenuItem>
                                <MenuItem value={"sangat kurang"}>
                                    sangat kurang
                                </MenuItem>
                                <MenuItem value={"lebih"}>lebih</MenuItem>
                            </SelectOption>
                            <SelectOption
                                className="bg-white w-full capitalize"
                                label={"TB/U"}
                                name="tb_u"
                                value={paramsAnak.tb_u}
                                onChange={(e) =>
                                    setParamsAnak({
                                        ...paramsAnak,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            >
                                <MenuItem value={""}>
                                    Pilih Status TB/U
                                </MenuItem>
                                <MenuItem value={"tinggi"}>tinggi</MenuItem>
                                <MenuItem value={"normal"}>normal</MenuItem>
                                <MenuItem value={"pendek"}>pendek</MenuItem>
                                <MenuItem value={"sangat pendek"}>
                                    sangat pendek
                                </MenuItem>
                            </SelectOption>
                            <SelectOption
                                className="bg-white w-full capitalize"
                                label={"BB/TB"}
                                name="bb_tb"
                                value={paramsAnak.bb_tb}
                                onChange={(e) =>
                                    setParamsAnak({
                                        ...paramsAnak,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            >
                                <MenuItem value={""}>
                                    Pilih Status BB/TB
                                </MenuItem>
                                <MenuItem value={"gizi buruk"}>
                                    gizi buruk
                                </MenuItem>
                                <MenuItem value={"gizi kurang"}>
                                    gizi kurang
                                </MenuItem>
                                <MenuItem value={"gizi baik"}>
                                    gizi baik
                                </MenuItem>
                                <MenuItem value={"gizi lebih"}>
                                    gizi lebih
                                </MenuItem>
                                <MenuItem value={"gizi obasitas"}>
                                    gizi obasitas
                                </MenuItem>
                            </SelectOption>
                            <SelectOption
                                className="bg-white w-full capitalize"
                                label={"IMT/U"}
                                name="imt_u"
                                value={paramsAnak.imt_u}
                                onChange={(e) =>
                                    setParamsAnak({
                                        ...paramsAnak,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            >
                                <MenuItem value={""}>
                                    Pilih Status IMT/U
                                </MenuItem>

                                <MenuItem value={"gizi kurang"}>
                                    gizi kurang
                                </MenuItem>
                                <MenuItem value={"normal"}>normal</MenuItem>
                                <MenuItem value={"over"}>over</MenuItem>
                                <MenuItem value={"obesitas"}>obesitas</MenuItem>
                            </SelectOption>
                            <SelectOption
                                className="bg-white w-full capitalize"
                                label={"Status Stunting"}
                                name="status_stunting"
                                value={paramsAnak.status_stunting}
                                onChange={(e) =>
                                    setParamsAnak({
                                        ...paramsAnak,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            >
                                <MenuItem value={""}>
                                    Pilih Status Stunting
                                </MenuItem>

                                <MenuItem value={"tidak"}>tidak</MenuItem>
                                <MenuItem value={"berisiko"}>berisiko</MenuItem>
                                <MenuItem value={"stunting"}>stunting</MenuItem>
                                <MenuItem value={"sembuh"}>sembuh</MenuItem>
                            </SelectOption>
                        </div>
                        <p>
                            Silahkan mengatur kolum data yang ingin ditampilkan
                            saat mencetak laporan, data yang tidak terceklist
                            akan menampilkan semua data pada kolum tabel saat
                            membuat laporan
                        </p>
                        <div className="grid grid-cols-3 md:grid-cols-3 text-xs">
                            <FormControlLabel
                                onChange={handleChange}
                                checked={paramsAnak.display_nama_dusun}
                                control={<Checkbox name="display_nama_dusun" />}
                                label="Tampilkan Nama Dusun"
                                className="text-xs"
                            />
                            <FormControlLabel
                                onChange={handleChange}
                                checked={paramsAnak.display_usia_anak}
                                control={<Checkbox name="display_usia_anak" />}
                                label="Tampilkan Usia Anak"
                            />
                            <FormControlLabel
                                onChange={handleChange}
                                checked={paramsAnak.display_berat_badan}
                                control={
                                    <Checkbox name="display_berat_badan" />
                                }
                                label="Tampilkan Berat Badan"
                            />
                            <FormControlLabel
                                onChange={handleChange}
                                checked={paramsAnak.display_tinggi_badan}
                                control={
                                    <Checkbox name="display_tinggi_badan" />
                                }
                                label="Tampilkan Tinggi Badan"
                            />
                            <FormControlLabel
                                onChange={handleChange}
                                checked={paramsAnak.display_lingkar_lengan}
                                control={
                                    <Checkbox name="display_lingkar_lengan" />
                                }
                                label="Tampilkan Lingkar Lengan"
                            />
                            <FormControlLabel
                                onChange={handleChange}
                                checked={paramsAnak.display_lingkar_kepala}
                                control={
                                    <Checkbox name="display_lingkar_kepala" />
                                }
                                label="Tampilkan Lingkar Kepala"
                            />
                            <FormControlLabel
                                onChange={handleChange}
                                checked={paramsAnak.display_gizi}
                                control={<Checkbox name="display_gizi" />}
                                label="Tampilkan Gizi"
                            />
                            <FormControlLabel
                                onChange={handleChange}
                                checked={paramsAnak.display_status_stunting}
                                control={
                                    <Checkbox name="display_status_stunting" />
                                }
                                label="Tampilkan Status Stunting"
                            />
                            <FormControlLabel
                                onChange={handleChange}
                                checked={paramsAnak.display_mengidap_diare}
                                control={
                                    <Checkbox name="display_mengidap_diare" />
                                }
                                label="Tampilkan Mengidap Diare"
                            />
                            <FormControlLabel
                                onChange={handleChange}
                                checked={paramsAnak.display_pemberian_oralit}
                                control={
                                    <Checkbox name="display_pemberian_oralit" />
                                }
                                label="Tampilkan Pemberian Oralit"
                            />
                            <FormControlLabel
                                onChange={handleChange}
                                checked={paramsAnak.display_pemberian_vit_a}
                                control={
                                    <Checkbox name="display_pemberian_vit_a" />
                                }
                                label="Tampilkan Pemberian Vit A"
                            />
                            <FormControlLabel
                                onChange={handleChange}
                                checked={paramsAnak.display_pemberian_imunisasi}
                                control={
                                    <Checkbox name="display_pemberian_imunisasi" />
                                }
                                label="Tampilkan Pemberian Imunisasi"
                            />
                            <FormControlLabel
                                onChange={handleChange}
                                checked={paramsAnak.display_nasihat}
                                control={<Checkbox name="display_nasihat" />}
                                label="Tampilkan Nasihat"
                            />
                        </div>
                        <button
                            onClick={() => cetakLaporanAnak()}
                            className="py-2 px-2 rounded-lg flex gap-2 items-center bg-pink-500 hover:bg-pink-500 text-white"
                        >
                            <Print color="inherit" fontSize="small" />
                            <p>Cetak Laporan</p>
                        </button>
                    </div>
                </div>
            </Modal>
            {/* Filter Ibu */}
            <Modal open={modalFilterIbu} onClose={setModalFilterIu}>
                <div className="w-full h-full flex justify-center items-center">
                    <div className="w-[90%] max-h-[90vh] overflow-auto bg-white rounded-md py-2 px-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-pink-500 font-bold">
                                Filter Data Ibu
                            </h3>
                            <button
                                onClick={() => setModalFilterIu(false)}
                                className="text-gray-500 "
                            >
                                <Cancel color="inherit" fontSize="inherit" />
                            </button>
                        </div>
                        <p>
                            Silahkan mengatur form pencarian dibawah ini untuk
                            menampilkan data yang ingin anda lihat
                        </p>
                        <div className="my-3  flex-row w-full">
                            <InputText
                                className="bg-white w-full"
                                label={"Nama Lengkap"}
                                name="cari_ibu"
                                value={params.cari_ibu}
                                onChange={(e) =>
                                    setParams({
                                        ...params,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="grid my-3 grid-cols-2 md:grid-cols-4 gap-3 items-center">
                            <SelectOption
                                className="bg-white w-full capitalize"
                                label={"Nama Dusun"}
                                name="nama_dusun"
                                value={params.nama_dusun}
                                onChange={(e) =>
                                    setParams({
                                        ...params,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            >
                                <MenuItem value={""}>Pilih Dusun</MenuItem>
                                {dusun.map((item, key) => (
                                    <MenuItem value={item.nama_dusun}>
                                        {item.nama_dusun}
                                    </MenuItem>
                                ))}
                            </SelectOption>
                            <SelectOption
                                className="bg-white w-full capitalize"
                                label={"Resiko Kehamilan"}
                                name="resiko_kehamilan"
                                value={params.resiko_kehamilan}
                                onChange={(e) =>
                                    setParams({
                                        ...params,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            >
                                <MenuItem value={""}>
                                    Pilih Status Resiko Kehamilan
                                </MenuItem>
                                <MenuItem value={"tinggi"}>tinggi</MenuItem>
                                <MenuItem value={"rendah"}>rendah</MenuItem>
                            </SelectOption>
                            <SelectOption
                                className="bg-white w-full capitalize"
                                label={"Posisi Janin"}
                                name="posisi_janin"
                                value={params.posisi_janin}
                                onChange={(e) =>
                                    setParams({
                                        ...params,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            >
                                <MenuItem value={""}>
                                    Pilih Status Posisi Janin
                                </MenuItem>
                                <MenuItem value={"posterior"}>
                                    posterior
                                </MenuItem>
                                <MenuItem value={"melintang"}>
                                    melintang
                                </MenuItem>
                                <MenuItem value={"sunsang"}>sunsang</MenuItem>
                                <MenuItem value={"kepala dibawah"}>
                                    kepala dibawah
                                </MenuItem>
                            </SelectOption>
                        </div>
                        <p>
                            Silahkan mengatur kolum data yang ingin ditampilkan
                            saat mencetak laporan, data yang tidak terceklist
                            akan menampilkan semua data pada kolum tabel saat
                            membuat laporan
                        </p>
                        <div className="grid grid-cols-3 md:grid-cols-3 text-xs">
                            <FormControlLabel
                                onChange={handleChangeIbu}
                                checked={params.display_nama_dusun}
                                control={<Checkbox name="display_nama_dusun" />}
                                label="Tampilkan Nama Dusun"
                                className="text-xs"
                            />
                            <FormControlLabel
                                onChange={handleChangeIbu}
                                checked={params.display_berat_badan}
                                control={
                                    <Checkbox name="display_berat_badan" />
                                }
                                label="Tampilkan Berat Badan"
                                className="text-xs"
                            />
                            <FormControlLabel
                                onChange={handleChangeIbu}
                                checked={params.display_tinggi_badan}
                                control={
                                    <Checkbox name="display_tinggi_badan" />
                                }
                                label="Tampilkan Tinggi Badan"
                                className="text-xs"
                            />
                            <FormControlLabel
                                onChange={handleChangeIbu}
                                checked={params.display_lingkar_lengan}
                                control={
                                    <Checkbox name="display_lingkar_lengan" />
                                }
                                label="Tampilkan Lingkar Perut"
                                className="text-xs"
                            />
                            <FormControlLabel
                                onChange={handleChangeIbu}
                                checked={params.display_tinggi_fundus}
                                control={
                                    <Checkbox name="display_tinggi_fundus" />
                                }
                                label="Tampilkan Tinggi Fundus"
                                className="text-xs"
                            />
                            <FormControlLabel
                                onChange={handleChangeIbu}
                                checked={params.display_detak_jantung_janin}
                                control={
                                    <Checkbox name="display_detak_jantung_janin" />
                                }
                                label="Tampilkan Detak Jantung Janin"
                                className="text-xs"
                            />
                            <FormControlLabel
                                onChange={handleChangeIbu}
                                checked={params.display_tekanan_darah_ibu}
                                control={
                                    <Checkbox name="display_tekanan_darah_ibu" />
                                }
                                label="Tampilkan Tekanan Darah Ibu"
                                className="text-xs"
                            />
                            <FormControlLabel
                                onChange={handleChangeIbu}
                                checked={params.display_posisi_janin}
                                control={
                                    <Checkbox name="display_posisi_janin" />
                                }
                                label="Tampilkan Posisi Janin"
                                className="text-xs"
                            />
                            <FormControlLabel
                                onChange={handleChangeIbu}
                                checked={params.display_pemberian_imunisasi}
                                control={
                                    <Checkbox name="display_pemberian_imunisasi" />
                                }
                                label="Tampilkan Pemberian Imunisasi"
                                className="text-xs"
                            />
                            <FormControlLabel
                                onChange={handleChangeIbu}
                                checked={params.display_pemberian_vitamin_a}
                                control={
                                    <Checkbox name="display_pemberian_vitamin_a" />
                                }
                                label="Tampilkan Pemberian Vitamin A"
                                className="text-xs"
                            />
                            <FormControlLabel
                                onChange={handleChangeIbu}
                                checked={params.display_umur_kehamilan}
                                control={
                                    <Checkbox name="display_umur_kehamilan" />
                                }
                                label="Tampilkan Usia Kehamilan"
                                className="text-xs"
                            />
                            <FormControlLabel
                                onChange={handleChangeIbu}
                                checked={params.tindakan}
                                control={<Checkbox name="tindakan" />}
                                label="Tampilkan Tindakan"
                                className="text-xs"
                            />
                            <FormControlLabel
                                onChange={handleChangeIbu}
                                checked={params.nasihat}
                                control={<Checkbox name="nasihat" />}
                                label="Tampilkan Nasehat"
                                className="text-xs"
                            />
                        </div>
                        <button
                            onClick={() => cetakLaporanIbu()}
                            className="py-2 px-2 rounded-lg flex gap-2 items-center bg-pink-500 hover:bg-pink-500 text-white"
                        >
                            <Print color="inherit" fontSize="small" />
                            <p>Cetak Laporan</p>
                        </button>
                    </div>
                </div>
            </Modal>
            <div className="w-full bg-white rounded-md shadow-md shadow-gray-500/30 py-2 px-3">
                <div className="flex">
                    <button
                        onClick={() => setMenu("ibu")}
                        className={`${
                            menu == "ibu" ? "bg-blue-500 text-white" : ""
                        } py-2 px-3 `}
                    >
                        Data Pelayanan Ibu
                    </button>
                    <button
                        onClick={() => setMenu("anak")}
                        className={`${
                            menu == "anak" ? "bg-blue-500 text-white" : ""
                        } py-2 px-3 `}
                    >
                        Data Pelayanan Anak
                    </button>
                </div>
                <div
                    className={`${
                        menu == "anak" ? "hidden" : "block"
                    } rounded-md overflow-hidden py-2 px-3 bg-white `}
                >
                    <h1 className="text-pink-500 text-xl ">
                        Data Pelayanan Ibu
                    </h1>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-3">
                            <Link
                                as="button"
                                href={route("admin.create-pelayanan-ibu", {
                                    kd_kegiatan: dataKegiatan.kd_kegiatan,
                                })}
                                className="py-1 px-2 rounded-lg flex gap-2 items-center bg-blue-500 hover:bg-blue-500 text-white"
                            >
                                <Add color="inherit" fontSize="small" />
                                <p>Tambah Pelayanan Ibu</p>
                            </Link>
                            <Link
                                href={route("admin.data-kegiatan")}
                                className="py-1 px-2 rounded-lg flex gap-2 items-center bg-green-500 hover:bg-green-500 text-white"
                            >
                                <ArrowBack color="inherit" fontSize="small" />
                                <p>Back</p>
                            </Link>
                            <button
                                onClick={() => FilterLaporanIbu()}
                                className="py-1 px-2 rounded-lg flex gap-2 items-center bg-orange-500 hover:bg-orange-500 text-white"
                            >
                                <Filter2 color="inherit" fontSize="small" />
                                <p>Filter</p>
                            </button>
                        </div>
                    </div>
                    <div className="text-xs">
                        <DataTable
                            data={pelayananIbu}
                            columns={columnsIbu}
                            pagination
                        />
                    </div>
                    <StatPelayananIbu
                        countResiko={countResiko}
                        countUsia={countUsia}
                        countPosisi={countPosisi}
                        countImun={countImun}
                        countPemberianVit={countPemberianVit}
                    />
                </div>
                {/* anak */}
                <div
                    className={`${
                        menu == "ibu" ? "hidden" : "block"
                    } rounded-md overflow-hidden py-2 px-3 bg-white `}
                >
                    <h1 className="text-pink-500 text-xl ">
                        Data Pelayanan Anak
                    </h1>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-3">
                            <Link
                                as="button"
                                href={route("admin.create-pelayanan-anak", {
                                    kd_kegiatan: dataKegiatan.kd_kegiatan,
                                })}
                                className="py-1 px-2 rounded-lg flex gap-2 items-center bg-blue-500 hover:bg-blue-500 text-white"
                            >
                                <Add color="inherit" fontSize="small" />
                                <p>Tambah Pelayanan Anak</p>
                            </Link>
                            <Link
                                href={route("admin.data-kegiatan")}
                                className="py-1 px-2 rounded-lg flex gap-2 items-center bg-green-500 hover:bg-green-500 text-white"
                            >
                                <ArrowBack color="inherit" fontSize="small" />
                                <p>Back</p>
                            </Link>
                            <button
                                onClick={() => FilterLaporanAnak()}
                                className="py-1 px-2 rounded-lg flex gap-2 items-center bg-orange-500 hover:bg-orange-500 text-white"
                            >
                                <Filter2 color="inherit" fontSize="small" />
                                <p>Filter</p>
                            </button>
                        </div>
                    </div>
                    <div className="text-xs">
                        <DataTable
                            data={pelayananAnak}
                            columns={columnsAnak}
                            pagination
                        />
                    </div>
                    {/*Table Statistik*/}
                    <StatPelayananAnak
                        countImunAnak={countImunAnak}
                        jumlah_stunting={jumlah_stunting}
                        jumlah_pemberian_vit_a={jumlah_pemberian_vit_a}
                        jumlah_pemberian_oralit={jumlah_pemberian_oralit}
                        jumlah_pengidap_diare={jumlah_pengidap_diare}
                        jumlah_usia_anak={jumlah_usia_anak}
                    />
                </div>
            </div>
        </div>
    );
}

Show.layout = (page) => (
    <AdminLayout
        children={page}
        title={`Detail Kegiatan Kode ${detailKegiatan}`}
    />
);
