import { Link } from "@remix-run/react";

export default function Card(props: {
    num: number | string;
    name: string;
    total: number | string;
    nameInArabic: string;
}) {
    const { num, name, total, nameInArabic } = props;
    return (
        <Link
            to={`/surah/${num}`}
            className="flex w-full p-4 hover:cursor-pointer bg-white border border-gray-200 rounded-md shadow-md hover:bg-gray-100 align-top"
        >
            <div className="flex-shrink-0 w-10 h-10 font-semibold text-lg rounded-full bg-purple-100 text-purple-700 flex items-center justify-center mr-4">
                {num}
            </div>
            <div className="w-full">
                <h4 className="text-purple-800 font-semibold text-lg">
                    {name}
                </h4>
                <p className="text-gray-400 text-sm">{`${total} ayat`}</p>
            </div>
            <div className="flex-shrink-0 font-[quran] text-xl text-purple-800">
                {nameInArabic}
            </div>
        </Link>
    );
}
