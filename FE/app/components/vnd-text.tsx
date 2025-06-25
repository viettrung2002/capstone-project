import React from "react";


function formatVndParts(amount: number) {
    const parts = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
    }).formatToParts(amount);

    const numberPart = parts
        .filter((part) => part.type !== "currency")
        .map((part) => part.value)
        .join("");

    const currencyPart = parts.find((part) => part.type === "currency")?.value ?? "₫";

    return { numberPart, currencyPart };
}

type VndTextProps = {
    amount: number;
    classNameNumber?: string;
    classNameCurrency?: string;
};

const VndText: React.FC<VndTextProps> = ({
                                             amount,
                                             classNameNumber = "font-semibold text-base",
                                             classNameCurrency = "text-sm text-gray-500 ml-1 font-normal",
                                         }) => {
    const { numberPart, currencyPart } = formatVndParts(amount);

    return (
        <span>
      <span className={classNameNumber}>{numberPart}</span>
      <span className={classNameCurrency}>{currencyPart}</span>
    </span>
    );
};

export default VndText;
