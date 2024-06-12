import React from "react";
export default function CountCard({ title, count, icon, background }) {
    return (
        <div className={`rounded-md ${background} text-white py-2 px-3 w-full`}>
            <div className="flex justify-between items-center">
                <div className="text-5xl md:text-7xl lg:text-7xl text-white">
                    {icon}
                </div>
                <div className="flex justify-end w-full text-right">
                    <div>
                        <p className="text-5xl md:text-2xl lg:text-7xl font-bold">
                            {count}
                        </p>
                        <p className="text-xs md:text-sm lg:text-md font-thin">
                            Jumlah {title}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
