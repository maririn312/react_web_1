import { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { KYC_IMAGE_CONFIRMED, RESPONSE_ERROR, RESPONSE_SUCCESS, URL_BACKEND_DOWNLOAD } from "../../../app/appConst";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { BxButton, BxButtonType, BxImageUpload, BxInput } from "../../../components";
import { BxMessage, BxMessageType } from "../../../components/bx/BxMessage";
import { userKyc, userState } from "../../../redux/user/userSlice";
import { userUpdateBasicInfo, userUploadIdBack, userUploadIdFront } from "../../../service/userApiClient";
import ErrorManager from "../../../utility/ErrorManager";
import StringUtility from "../../../utility/StringUtility";

const KycPage:FunctionComponent = () => {

  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useAppSelector(userState);
  const dispatch = useAppDispatch();

  const [idFront, setIdFront] = useState({
    img: '',
    isLoading: false,
    status: 0,
    statusText: '',
    error: '',
  });

  const [idBack, setIdBack] = useState({
    img: '',
    isLoading: false,
    status: 0,
    statusText: '',
    error: '',
  });

  const [form, setForm] = useState({
    lastname: '',
    lastnameError: '',
    firstname: '',
    firstnameError: '',
    nickname: '',
    nicknameError: '',
    registerNo: '',
    registerNoError: '',
    error: '',
    isLoading: false,
    readOnly: false,
  });

  useEffect(() => {
    if(user.isLoggedIn) {
      if(user.info !== undefined) {
        if(user.info.kyc.kyc_confirmed_flag) {
          navigate(`/user/${user.info?.kyc.nickname}`);
        }

        // setForm({...form,
        //   lastname: user.info.kyc.last_name,
        //   firstname: user.info.kyc.first_name,
        //   registerNo: user.info.kyc.registration_no,
        //   nickname: user.info.kyc.nickname,
        // });

        if(!user.info.kyc.basic_info_required) {
          setForm({...form,
            lastname: user.info.kyc.last_name,
            firstname: user.info.kyc.first_name,
            registerNo: user.info.kyc.registration_no,
            nickname: user.info.kyc.nickname,
          });
        }

        const backImg = user.info.kyc.id_back !== 'DEFAULT' ? `${URL_BACKEND_DOWNLOAD}/${user.info.kyc.id_back}` : '';
        setIdBack({...idBack,
          img: backImg,
          statusText: user.info.kyc.id_back_text,
          status: user.info.kyc.id_back_status,
        });

        const frontImg = user.info.kyc.id_front !== 'DEFAULT' ? `${URL_BACKEND_DOWNLOAD}/${user.info.kyc.id_front}` : '';
        setIdFront({...idFront,
          img: frontImg,
          statusText: user.info.kyc.id_front_text,
          status: user.info.kyc.id_front_status,
        });
      }
    }
  }, [user.info]);

  // ======================================================= //
  // ======================================================= //
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  // ======================================================= //
  // ======================================================= //
  const handleUpload = (file:File | undefined | null, name:string) => {
    if(file !== undefined && file !== null) {
      if(name === 'idBack') {
        uploadBack(file);
      } else if(name === 'idFront') {
        uploadFront(file);
      }
      dispatch(userKyc());
    }
  }

  // ======================================================= //
  // ======================================================= //
  async function uploadFront(file:File) {
    setIdFront({...idFront, img: URL.createObjectURL(file), isLoading: true, error: ''});
    try {
      const response = await userUploadIdFront(file);
      if(response.status === RESPONSE_SUCCESS) {
        setIdFront({...idFront, img: URL.createObjectURL(file)});
      } else if(response.status === RESPONSE_ERROR) {
        setIdFront({...idFront, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      setIdFront({...idFront, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  // ======================================================= //
  // ======================================================= //
  async function uploadBack(file:File) {
    setIdBack({...idBack, img: URL.createObjectURL(file), isLoading: true, error: ''});
    try {
      const response = await userUploadIdBack(file);
      if(response.status === RESPONSE_SUCCESS) {
        setIdBack({...idBack, img: URL.createObjectURL(file)});
      } else if(response.status === RESPONSE_ERROR) {
        setIdBack({...idBack, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      setIdBack({...idBack, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  // ======================================================= //
  // ======================================================= //
  async function updateBasicInfo() {
    setForm({...form, isLoading: true});
    try {
      const response = await userUpdateBasicInfo({
        first_name: form.firstname,
        last_name: form.lastname,
        registration_no: form.registerNo,
        nickname: form.nickname
      });
      if(response.status === RESPONSE_SUCCESS) {
        dispatch(userKyc());
      } else if(response.status === RESPONSE_ERROR) {
        setForm({...form, isLoading: false, error: response.msg});
      }
    } catch(ex) {
      setForm({...form, isLoading: false, error: ErrorManager.handleRequestError(ex)});
    }
  }

  // ======================================================= //
  // ======================================================= //
  function validateForm() {
    let hasError = false;
    let lastnameError:string = '';
    let firstnameError:string = '';
    let registerNoError:string = '';
    let nicknameError:string = '';

    if(!StringUtility.isValidText(form.lastname)) {
      lastnameError = t('error.errorField');
      hasError = true;
    } else {
      setForm({...form, lastnameError: ''});
    }
    if(!StringUtility.isValidText(form.firstname)) {
      firstnameError = t('error.errorField');
      hasError = true;
    } else {
      setForm({...form, firstnameError: ''});
    }
    if(!StringUtility.isValidText(form.nickname)) {
      nicknameError = t('error.errorField');
      hasError = true;
    } else {
      setForm({...form, nicknameError: ''});
    }
    if(!StringUtility.isValidText(form.registerNo)) {
      registerNoError = t('error.errorField');
      hasError = true;
    } 

    setForm({...form, 
      lastnameError: lastnameError,
      firstnameError: firstnameError,
      nicknameError: nicknameError,
      registerNoError: registerNoError
    });

    return !hasError;
  }

  // ================================================================== //
  const ImageUploadSection = () => {
    return <div className="grid grid-cols-2 gap-3 mb-3">
      <div>
        <div>{t('label.idFrontImage')}</div>
        <BxImageUpload
          name="idFront"
          isLoading={idFront.isLoading}
          image={idFront.img}
          onUpload={handleUpload}
        />
        <BxMessage
          message={idFront.statusText}
          type={idFront.status === KYC_IMAGE_CONFIRMED ? BxMessageType.success : BxMessageType.warning}
        />
      </div>
      <div>
        <div>{t('label.idBackImage')}</div>
        <BxImageUpload
          name="idBack"
          isLoading={idBack.isLoading}
          image={idBack.img}
          onUpload={handleUpload}
        />
        <BxMessage
          message={idBack.statusText}
          type={idBack.status === KYC_IMAGE_CONFIRMED ? BxMessageType.success : BxMessageType.warning}
        />
      </div>
    </div>
  }

  // ======================================================= //
  // ======================================================= //
  return (
    <div>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">KYC</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-white">
            <div className="card-body">
              <BxMessage
                message={form.error}
                type={BxMessageType.error}
              />
              <h2 className="card-title">{t("title.idImage")}</h2>
              {ImageUploadSection()}
              <form>
                <h2 className="card-title">{t("title.personalInfo")}</h2>
                <div className="form-control">
                  <label className="label">
                    <span>{t("label.lastname")}</span>
                  </label>
                  <BxInput
                    id='lastname'
                    name='lastname'
                    placeholder={t("label.lastname")}
                    readonly={form.readOnly}
                    error={form.lastnameError}
                    onChange={handleChange}
                    value={form.lastname}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span>{t("label.firstname")}</span>
                  </label>
                  <BxInput
                    id='firstname'
                    name='firstname'
                    placeholder={t("label.firstname")}
                    readonly={form.readOnly}
                    error={form.firstnameError}
                    onChange={handleChange}
                    value={form.firstname}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span>{t("label.nickname")}</span>
                  </label>
                  <BxInput
                    id='nickname'
                    name='nickname'
                    placeholder={t("label.nickname")}
                    readonly={form.readOnly}
                    error={form.nicknameError}
                    onChange={handleChange}
                    value={form.nickname}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span>{t("label.registerNo")}</span>
                  </label>
                  <BxInput
                    id='registerNo'
                    name='registerNo'
                    placeholder={t("label.laregisterNostname")}
                    readonly={form.readOnly}
                    error={form.registerNoError}
                    onChange={handleChange}
                    value={form.registerNo}
                  />
                </div>
                <BxMessage
                  type={BxMessageType.error}
                  message={form.error}
                />
              </form>
              <div className="card-actions mt-3">
                <div className="flex w-full">
                  <div className="grid flex-grow">
                    <BxButton
                      onClick={() => {
                        if(!form.readOnly) {
                          if(validateForm()) {
                            updateBasicInfo();
                          }
                        }
                      }}
                      isLoading={form.isLoading}
                      type={BxButtonType.gradient}
                    >
                      {t("action.confirm")}
                    </BxButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KycPage;