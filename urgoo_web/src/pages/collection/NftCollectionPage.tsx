import { useEffect, useState } from "react";
import { Translation, useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import Main from "../../components/layout/main/main";
import NftCard from "../../components/nft-card/NftCard";
import { NftCollectionResponseDto } from "../../models/nft/NftCollectionResponseDto";
import { getNftCollection } from "../../service/cardApiClient";
import ErrorManager from "../../utility/ErrorManager";
import { TabTitle } from "../../utility/TabTitleUtility";
import MnTranslation from "../../i18n/mn/translation.json";
import filter from "../../assets/img/filter_icon.a4d474c0846c03b659a5.svg";
import sort from "../../assets/img/sort_icon.00231af3221222a111d7.svg";

interface Collections {
  collection: Array<NftCollectionResponseDto>;
  error?: string;
}

const NftCollectionPage = () => {
  const { t } = useTranslation();
  let { collectionId } = useParams();

  const [items, setItems] = useState<Collections>({
    error: "",
    collection: [],
  });

  TabTitle(MnTranslation.mainTitle.nftCollection);

  /* ============================================================================ */
  /* ============================================================================ */
  useEffect(() => {
    if (items.collection.length === 0) {
      getCollection();
    }
  }, []);

  async function getCollection() {
    try {
      const response = await getNftCollection({
        collection_Id: collectionId,
      });

      response.nfts.forEach(async (item, index) => {
        items.collection[index] = response;
        setItems({ ...items });
      });
    } catch (error) {
      setItems({ ...items, error: ErrorManager.handleRequestError(error) });
    }
  }

  return (
    <Main>
      <div className="pt-5 p-0 m-0">
        <div className="flex box-border outline-none p-0 m-0 justify-between items-center">
          <form>
            <input
              type="text"
              placeholder="Цуглуулга хайх"
              className="bg-inherit leading-[38px] py-0 px-[12px] h-[38px] w-[270px] border-inherit border-[#2e344c] border-solid border text-[#aaa]"
            />
          </form>
          <div className="flex items-center">
            <div className="text-[#fff] font-medium leading-9  h-[38px] py-0 pr-[15px] pl-[8px] border-inherit border-[#2e344c] border-solid border rounded-lg cursor-pointer flex items-center box-border outline-none">
              <span className={`"flex text-center items-center justify-center h-[24px] w-[24px] bg-no-repeat bg-auto "`}>
                <img src={filter} />
              </span>
              {t("label.filter")}
            </div>
            <div className="ml-[16px] text-[#fff] font-medium leading-9  h-[38px] py-0 pr-[15px] pl-[8px] border-inherit border-[#2e344c] border-solid border rounded-lg cursor-pointer flex items-center ">
              <span className={`"flex text-center items-center justify-center h-[24px] w-[24px] bg-no-repeat bg-auto "`}>
                <img src={sort} />
              </span> 
              {t("label.sort")}
            </div>
          </div>
        </div>
        <div className="mt-6 p-0 m-0 outline-none border-size">
          <div className="gap-6 grid-cols-3 grid p-0 m-0 outline-none border-size">
            {items.collection.map((nft, index) => {
              return (
                <section key={index}>
                  <Link
                    to={`/nft/detail/${nft.nfts[index].bsId}/${nft.nfts[index].code}`}
                  >
                    <NftCard
                      id={nft.nfts[index].code}
                      key={index}
                      photo={nft.nfts[index].photo}
                      name={nft.nfts[index].name}
                      likes={nft.nfts[index].likes}
                      shares={nft.nfts[index].shares}
                      collection={true}
                      creator={nft.nfts[index].creator}
                      prices={nft.nfts[index].prices}
                      dataTestId="collectionId"
                    />
                  </Link>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </Main>
  );
};

export default NftCollectionPage;
