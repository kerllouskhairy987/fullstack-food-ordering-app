"use client";

import Lottie from "lottie-react";
import NoBestSellers from "../../../public/assets/NoBestSellers.json"
import ErrorLottie from "../../../public/assets/ErrorLottie.json"

const lottieFilesWord = {
    NoBestSellers,
    ErrorLottie
}
type IProps = {
    lottieType: keyof typeof lottieFilesWord;
    title?: string;
}

const LottieHandler = ({ lottieType, title }: IProps) => {
    const LottieComponent = lottieFilesWord[lottieType];
    
    return (
        <div className="text-center flex flex-col items-center grow justify-center gap-3">
            <div className="sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px]">
                <Lottie animationData={LottieComponent} loop={true} />
            </div>
            <span
                className={`text-center text-lg md:text-xl ${lottieType === "NoBestSellers" ? "text-red-500" : "text-accent-foreground/50"}`}
            >
                {title}
            </span>
        </div>
    )
}

export default LottieHandler