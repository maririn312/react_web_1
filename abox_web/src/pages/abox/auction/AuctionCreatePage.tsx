import { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { BxInput } from "../../../components";

const AuctionCreatePage:FunctionComponent = () => {

  const { t } = useTranslation();
  const navigate = useNavigate();

  // ======================================================= //
  // ======================================================= //
  const [form, setForm] = useState({
    formError: '',
    isLoading: false,
  });

  // ======================================================= //
  // ======================================================= //
  useEffect(() => {
    createAuction();
  }, []);

  // ======================================================= //
  // ======================================================= //
  async function createAuction() {
    
  }

  async function createAuctionData() {

  }

  async function addCondition() {

  }

  async function uploadImage() {
    
  }

  // ======================================================= //
  // ======================================================= //
  return (
    <div>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-white">
            <div className="card-body">
            <div className="form-control">
                <label className="label">
                  <span>{t("label.phone")}</span>
                </label> 
                <BxInput 
                  id='phoneNo' 
                  name='phoneNo' 
                  // placeholder={t("label.phone")} 
                  // error={form.phoneNoError} 
                  // onChange={handleChange} 
                  // value={form.phoneNo} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuctionCreatePage;