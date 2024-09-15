import DropdownSidebar from "@/Components/DropdownSidebar";
import MenuSidebar from "@/Components/MenuSidebar";
import { Head, usePage } from "@inertiajs/react";
import {
    ChildFriendly,
    Contacts,
    Face2,
    List,
    Logout,
    MiscellaneousServicesOutlined,
    PersonAdd,
    PregnantWoman,
    Widgets,
} from "@mui/icons-material";
import { Drawer } from "@mui/material";
import React, { useState } from "react";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
export default function AdminLayout({ children, title, props }) {
    const { settings } = usePage().props;
    const [drawer, setDrawer] = useState(false);
    const { auth } = usePage().props;
    return (
        <div>
            <Head title={title} />
            {/* Navbar */}
            <div className="w-full bg-pink-500 flex justify-between items-center px-4">
                <div
                    onClick={() => setDrawer(true)}
                    className="text-white hover:cursor-pointer hover:text-pink-900 transition-all duration-300 ease-in-out"
                >
                    <Widgets color="inherit" fontSize="inherit" />
                </div>
                <div className=" flex gap-3 items-center">
                    <img src="aaa" alt="" className="w-[30px] h-[30px] my-3" />
                    <p className="text-white">Fikom Unika</p>
                </div>
            </div>
            {/* Drawer */}
            <Drawer open={drawer} onClose={() => setDrawer(false)}>
                <div className="bg-pink-600 min-h-screen w-[450px] ">
                    <div className="w-full items-center justify-center bg-pink-800 flex gap-5  py-3">
                        <img
                            src={"/storage/" + settings.logo}
                            alt=""
                            className="w-[50px] h-[50px] object-cover bg-white rounded-full"
                        />
                        <div>
                            <p className="text-white font-semibold capitalize">
                                {settings.nama_posyandu}
                            </p>
                            <p className="text-xs font-light text-white italic capitalize">
                                {settings.alamat}
                            </p>
                        </div>
                    </div>
                    {/* Menu */}
                    <div>
                        <p className="font-light text-white px-4 pt-3 text-sm">
                            General
                        </p>
                        <MenuSidebar
                            link={"admin.dashboard"}
                            title={"Dashboard"}
                            logo={
                                <Widgets color="inherit" fontSize="inherit" />
                            }
                        />
                        {auth.roles == "ketua posyandu" && (
                            <MenuSidebar
                                link={"admin.setting-apps"}
                                title={"Setting Applikasi"}
                                logo={
                                    <Widgets
                                        color="inherit"
                                        fontSize="inherit"
                                    />
                                }
                            />
                        )}
                        <p className="font-light text-white px-4 pt-3 text-sm">
                            Master Data
                        </p>
                        {auth.roles == "ketua posyandu" && (
                            <>
                                <MenuSidebar
                                    link={"admin.data-dusun"}
                                    logo={
                                        <MiscellaneousServicesOutlined
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    }
                                    title={"Data Dusun"}
                                />
                                <MenuSidebar
                                    link={"admin.jenis-vaksin"}
                                    logo={
                                        <MiscellaneousServicesOutlined
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    }
                                    title={"Jenis Vaksin & Imunisasi"}
                                />
                                <MenuSidebar
                                    link={"admin.data-kader"}
                                    logo={
                                        <Contacts
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    }
                                    title={"Data Kader"}
                                />
                            </>
                        )}
                        {auth.roles !== "ibu" && (
                            <>
                                <MenuSidebar
                                    link={"admin.data-ibu"}
                                    logo={
                                        <PregnantWoman
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    }
                                    title={"Data Ibu"}
                                />
                                <MenuSidebar
                                    link={"admin.data-anak"}
                                    logo={
                                        <ChildFriendly
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    }
                                    title={"Data Anak"}
                                />
                                <MenuSidebar
                                    link={"admin.data-keanggotaan-ibu"}
                                    logo={
                                        <PersonAdd
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    }
                                    title={"Pendaftaran Keanggotaan Ibu"}
                                />
                                <MenuSidebar
                                    link={"admin.data-kegiatan"}
                                    logo={
                                        <AccessTimeFilledIcon
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    }
                                    title={"Kelola Jadwal Kegiatan"}
                                />
                                <MenuSidebar
                                    link={"admin.laporan-data-stunting"}
                                    logo={
                                        <AccessTimeFilledIcon
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    }
                                    title={"Laporan Data Stunting"}
                                />
                            </>
                        )}
                        {auth.roles === "ibu" && (
                            <>
                                <MenuSidebar
                                    link={"ibu.data-anak"}
                                    logo={
                                        <ChildFriendly
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    }
                                    title={"Data Anak"}
                                />

                                <MenuSidebar
                                    link={"show-pelayanan-ibu"}
                                    logo={
                                        <List
                                            color="inherit"
                                            fontSize="inherit"
                                        />
                                    }
                                    title={"Data Pelayanan Ibu"}
                                />
                            </>
                        )}
                        <MenuSidebar
                            link={"logout"}
                            logo={<Logout color="inherit" fontSize="inherit" />}
                            title={"Logout"}
                        />
                    </div>
                </div>
            </Drawer>
            <div className="py-4 px-4 min-h-screen md:px-8 lg:px-10 bg-slate-950 h-full">
                <h1 className="font-bold text-base md:text-lg lg:text-xl text-white border-pink-500 border-b-2 inline-block mb-3">
                    {title}
                </h1>
                {children}
            </div>
            <div className="bg-slate-950 text-white flex justify-end px-16 py-6">
                <p>Reza Fikom Unika (2024)</p>
            </div>
        </div>
    );
}
