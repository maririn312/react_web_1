import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import NomadSelect from "../../components/nomad/NomadSelect";
import WalletTab from "../../components/wallet-tabs/WalletTab";
import urgIcon from "../../assets/icons/urg_coin.webp";
import mntIcon from "../../assets/icons/mnt.svg";
import Select, {
  components,
  SingleValueProps,
  OptionProps,
} from "react-select";
import NomadPagination from "../../components/nomad/NomadPagination";
export enum Type {
  URGX = "urgx",
  MNT = "mnt",
}

interface SelectType {
  value: string;
  text: string;
  icon: string;
}

const WalletHistory = () => {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState<SelectType>({
    value: Type.URGX,
    text: t("label.historyURG"),
    icon: urgIcon,
  });

  const selectData: SelectType[] = [
    {
      value: Type.URGX,
      text: t("label.historyURG"),
      icon: urgIcon,
    },
    {
      value: Type.MNT,
      text: t("label.historyMNT"),
      icon: mntIcon,
    },
  ];

  function handleChange(ev) {
    setSelectedOption(ev);
  }

  const SingleValue = (singleValueProps: SingleValueProps<SelectType>) => {
    const {
      data: { value, text, icon },
    } = singleValueProps;

    return (
      <components.SingleValue {...singleValueProps}>
        <span className="flex items-center py-2">
          {icon && <img height={28} width={28} src={icon} alt={value} />}
          <span className="ml-2">{text}</span>
        </span>
      </components.SingleValue>
    );
  };

  const Option = (optionProps: OptionProps<SelectType>) => {
    const { data } = optionProps;
    return (
      <components.Option {...optionProps}>
        <span className="flex items-center py-2">
          {data.icon && (
            <img height={28} width={28} src={data.icon} alt={data.value} />
          )}
          <span className="ml-2">{data.text}</span>
        </span>
      </components.Option>
    );
  };

  return (
    <>
      <h3 className="relative text-xl font-semibold mb-4 text-sec-black">
        {t("label.inOutHistory")}
      </h3>

      <div className="bg-white border border-tab-border rounded-lg shadow-table grid mb-7">
        <div className="p-10">
          <Select
            value={selectedOption}
            options={selectData}
            defaultValue={selectData}
            onChange={handleChange}
            isSearchable={false}
            components={{ SingleValue, Option }}
          />
        </div>
      </div>
      {/* <ul className="w-full ">

        </ul> */}
      <WalletTab selected={selectedOption.value}></WalletTab>
    </>
  );
};

export default WalletHistory;
