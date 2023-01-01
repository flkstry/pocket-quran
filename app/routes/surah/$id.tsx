import { ConvertToArabicNumbers } from "~/utils/helpers/helper";
import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate, useLocation } from "@remix-run/react";
import ButtonIcon from "~/modules/components/button/button-icon";
import CardAyat from "~/modules/components/card-ayat";

export async function loader({
    params: { id },
    request,
}: {
    params: { id: string };
    request: any;
}) {
    try {
        const uri = new URL(request.url);
        let offset = uri.searchParams.get("offset");
        if (!offset) offset = "0";

        const url = `http://api.alquran.cloud/v1/surah/${id}?offset=${offset}&limit=20`;
        const rawRes = await fetch(url);
        const res = await rawRes.json();
        if (String(res.status) !== "OK") throw new Error(res.message);

        const lists = res.data.ayahs.map((i: any) => ({
            num: ConvertToArabicNumbers(i.numberInSurah),
            arabic: i.text,
        }));

        const totalPage = Math.floor(Number(res.data.numberOfAyahs) / 20) + 1;
        const pagination = Array.from(Array(totalPage).keys());

        return json({
            status: true,
            message: "Berhasil mengambil data",
            data: {
                surahName: res.data.englishName,
                lists,
            },
            meta: {
                pagination,
                currentPage: offset,
                next:
                    Number(res.data.numberOfAyahs) > Number(offset) + 20
                        ? `${uri.pathname}?offset=${20 + Number(offset)}`
                        : null,
                prev:
                    Number(offset) >= 20
                        ? `${uri.pathname}?offset=${Number(offset) - 20}`
                        : null,
            },
        });
    } catch (error) {
        return json({
            status: false,
            message: error,
            data: {
                surahName: "",
                lists: [],
            },
            meta: {
                pagination: [],
                currentPage: 0,
                next: null,
                prev: null,
            },
        });
    }
}

export const meta: MetaFunction<typeof loader> = ({
    data: {
        data: { surahName },
    },
}) => {
    const title = `Pocket Quran - Surah ${surahName}`;
    return {
        charset: "utf-8",
        title,
        viewport: "width=device-width,initial-scale=1",
    };
};

export default function SurahPage() {
    const loaderData = useLoaderData<typeof loader>();
    const nav = useNavigate();
    const { pathname } = useLocation();

    return (
        <main className="w-full max-w-lg mx-auto p-4 pb-16">
            <header className="flex items-center">
                <ButtonIcon
                    description="back button"
                    onClick={() => {
                        nav("/");
                    }}
                    cx="h-10 w-10 flex-shrink-0"
                >
                    <img src="/assets/images/back.svg" alt="menu icon" />
                </ButtonIcon>
                <h1 className="p-4 w-full text-purple-700 font-semibold text-2xl">
                    {`Surah ${loaderData.data.surahName}`}
                </h1>
                <ButtonIcon
                    description="search button"
                    onClick={() => {
                        console.log("first");
                    }}
                    cx="h-10 w-10 flex-shrink-0"
                >
                    <img src="/assets/images/search.svg" alt="search icon" />
                </ButtonIcon>
            </header>
            <section className="block my-4 w-full space-y-4">
                {loaderData.data.lists &&
                    loaderData.data.lists.map((item: any) => (
                        <CardAyat key={item.num} {...item} />
                    ))}
            </section>
            <section className="flex items-center justify-between p-4">
                <div className="flex gap-x-4">
                    <ButtonIcon
                        description="prev button"
                        onClick={() => {
                            nav(loaderData.meta.prev);
                        }}
                        disabled={loaderData.meta.prev === null}
                        cx="h-10 text-purple-600 gap-x-4 text-base font-semibold px-3 hover:text-purple-700 flex-shrink-0"
                    >
                        <img src="/assets/images/back.svg" alt="prev icon" />
                        Prev
                    </ButtonIcon>
                    <ButtonIcon
                        description="next button"
                        onClick={() => {
                            nav(loaderData.meta.next);
                        }}
                        disabled={loaderData.meta.next === null}
                        cx="h-10 text-purple-600 gap-x-4 text-base font-semibold px-3 hover:text-purple-700 flex-shrink-0"
                    >
                        Next
                        <img
                            src="/assets/images/back.svg"
                            className="rotate-180"
                            alt="next icon"
                        />
                    </ButtonIcon>
                </div>
                <div className="gap-x-2 flex text-purple-700 items-center">
                    Page:
                    <select
                        onChange={(e) =>
                            nav(
                                `${pathname}?offset=${
                                    Number(e.target.value) * 20
                                }`
                            )
                        }
                        id="countries"
                        className="bg-purple-50 border w-fit border-purple-300 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-2"
                    >
                        {loaderData.meta.pagination.map((i: number) => (
                            <option key={i} value={i}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                </div>
            </section>
            <div className="fixed bg-purple-200 left-0 bottom-0 w-screen shadow-md border-t">
                <nav className="w-full max-w-xl mx-auto flex items-center justify-around p-2">
                    <ButtonIcon
                        description="read quran"
                        onClick={() => {
                            console.log("first");
                        }}
                        cx="h-12 w-12"
                    >
                        <img
                            src="/assets/images/read.svg"
                            alt="read quran icon"
                        />
                    </ButtonIcon>
                    <ButtonIcon
                        description="doa button"
                        onClick={() => {
                            console.log("first");
                        }}
                        cx="h-12 w-12"
                    >
                        <img src="/assets/images/doa.svg" alt="doa icon" />
                    </ButtonIcon>
                    <ButtonIcon
                        description="bacaan button"
                        onClick={() => {
                            console.log("first");
                        }}
                        cx="h-12 w-12"
                    >
                        <img
                            src="/assets/images/bacaan-doa.svg"
                            alt="bacaan icon"
                        />
                    </ButtonIcon>
                    <ButtonIcon
                        description="bookmarks button"
                        onClick={() => {
                            console.log("first");
                        }}
                        cx="h-12 w-12"
                    >
                        <img
                            src="/assets/images/remember.svg"
                            alt="bookmarks icon"
                        />
                    </ButtonIcon>
                </nav>
            </div>
        </main>
    );
}
