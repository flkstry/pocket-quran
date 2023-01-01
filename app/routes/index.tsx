import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ButtonIcon from "~/modules/components/button/button-icon";
import Card from "~/modules/components/card";

export const loader = async () => {
    try {
        const rawRes = await fetch("http://api.alquran.cloud/v1/surah");
        const res = await rawRes.json();
        if (String(res.status) !== "OK") throw new Error(res.message);
        const data = res.data.map((item: any) => ({
            num: item.number,
            name: item.englishName,
            total: item.numberOfAyahs,
            nameInArabic: item.name,
        }));
        return json({
            status: true,
            message: "Berhasil mengambil data",
            data,
        });
    } catch (error) {
        return json({
            status: false,
            message: error,
            data: [],
        });
    }
};

export default function Index() {
    const loaderData = useLoaderData();
    return (
        <main className="w-full max-w-lg mx-auto p-4 pb-16">
            <header className="flex items-center">
                <ButtonIcon
                    description="menu button"
                    onClick={() => {
                        console.log("first");
                    }}
                    cx="h-10 w-10 flex-shrink-0"
                >
                    <img src="assets/images/menu.svg" alt="menu icon" />
                </ButtonIcon>
                <h1 className="p-4 w-full text-purple-700 font-semibold text-xl">
                    Quran App
                </h1>
                <ButtonIcon
                    description="menu button"
                    onClick={() => {
                        console.log("first");
                    }}
                    cx="h-10 w-10 flex-shrink-0"
                >
                    <img src="assets/images/search.svg" alt="search icon" />
                </ButtonIcon>
            </header>
            <section className="block my-4 w-full space-y-4">
                {loaderData.data &&
                    loaderData.data.map((item: any) => (
                        <Card key={item.num} {...item} />
                    ))}
            </section>
            <div className="fixed bg-[#f5f5f5] left-0 bottom-0 w-screen shadow-md border-t">
                <nav className="w-full max-w-xl mx-auto flex items-center justify-around p-2">
                    <ButtonIcon
                        description="read quran"
                        onClick={() => {
                            console.log("first");
                        }}
                        cx="h-12 w-12"
                    >
                        <img
                            src="assets/images/read.svg"
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
                        <img src="assets/images/doa.svg" alt="doa icon" />
                    </ButtonIcon>
                    <ButtonIcon
                        description="bacaan button"
                        onClick={() => {
                            console.log("first");
                        }}
                        cx="h-12 w-12"
                    >
                        <img
                            src="assets/images/bacaan-doa.svg"
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
                            src="assets/images/remember.svg"
                            alt="bookmarks icon"
                        />
                    </ButtonIcon>
                </nav>
            </div>
        </main>
    );
}
