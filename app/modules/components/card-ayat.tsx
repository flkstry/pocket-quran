import ButtonIcon from "./button/button-icon";

export default function CardAyat(props: {
    num: number | string;
    arabic: string;
}) {
    const { num, arabic } = props;
    return (
        <div className="block w-full p-4 rounded-md bg-white align-center">
            <div className="flex mb-4 items-center rounded-lg justify-between p-1 bg-purple-50">
                <div className="flex items-center justify-center w-8 h-8 text-lg rounded-md text-purple-500">
                    {num}
                </div>
                <ButtonIcon
                    description="menu button"
                    onClick={() => {
                        console.log("first");
                    }}
                    cx="h-8 w-8 p-1 rounded-md flex-shrink-0 hover:bg-purple-200"
                >
                    <img
                        src="/assets/images/bookmark.svg"
                        alt="bookmark icon"
                    />
                </ButtonIcon>
            </div>
            <div className="flex-shrink-0 font-[quran] text-2xl text-right leading-loose text-purple-800">
                {arabic}
            </div>
        </div>
    );
}
