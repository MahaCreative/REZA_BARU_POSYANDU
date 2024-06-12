import { Head, usePage } from "@inertiajs/react";
import moment from "moment";
import React from "react";

export default function Cetak({ children, perihal, title }) {
    const { settings } = usePage().props;
    return (
        <div className="py-3 px-4">
            <Head title={title} />
            <div className="flex w-full justify-center border-b border-black">
                <div className="flex items-center gap-4">
                    <img
                        src={"/storage/" + settings.logo}
                        alt=""
                        className="w-[100px]"
                    />
                    <div className="text-center">
                        <h3 className="uppercase font-bold text-3xl tracking-tighter">
                            Pemerintah Kota Kabupaten Mamuju
                        </h3>
                        <h3 className="text-center text-2xl font-bold uppercase">
                            {settings.nama_posyandu}
                        </h3>
                        <p className="tracking-tighter italic">
                            {settings.alamat +
                                " Desa :" +
                                settings.desa +
                                " Kecamatan :" +
                                settings.kecamatan +
                                " Kabupaten : Mamuju"}
                        </p>
                    </div>
                </div>
            </div>
            <div className="my-3 flex justify-between items-center">
                <p className="font-bold">{perihal}</p>
                {/* <p className="">{moment(new Date())}</p> */}
            </div>
            {children}

            <div className="flex justify-end my-6 px-4">
                <div>
                    <p className="font-bold text-xl tracking-tighter">
                        Ketua Posyandu{" "}
                        <span className="uppercase">
                            {settings.nama_posyandu}
                        </span>
                    </p>
                    <p className="mt-24 font-bold text-xl uppercase tracking-tighter text-center">
                        {settings.nama_ketua_posyandu}
                    </p>
                </div>
            </div>
        </div>
    );
}
