import { Dialog } from "@headlessui/react";
import clsx from 'clsx';
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../app/hooks";
import { BxButton, BxButtonType, BxInput } from "../../components";
import { addConditionEvent } from "../../redux/newAuction/conditionsSlice";
import StringUtility from "../../utility/StringUtility";

interface AddConditionDialogProps {
	isOpen: boolean,
  auctionId?: number,
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddConditionDialog = ({ isOpen, setIsOpen, auctionId }:AddConditionDialogProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  
  const [form, setForm] = useState({
    label: '',
    labelError: '',
    value: '',
    valueError: ''
  });

  useEffect(() => {
    setForm({
      label: '',
      labelError: '',
      value: '',
      valueError: ''
    });
  }, [])

  // ================================================================== //
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  // ================================================================== //
  function validateForm() {
    if(auctionId === undefined) {
      return false;
    }

    let hasError = false;
    let labelError:string = '';
    let valueError:string = '';

    if(!StringUtility.isValidText(form.label)) {
      labelError = t('error.errorField');
      hasError = true;
    }
    if(!StringUtility.isValidText(form.value)) {
      valueError = t('error.errorField');
      hasError = true;
    }

    setForm({
      ...form,
      labelError: labelError,
      valueError: valueError,
    });

    return !hasError;
  }

  // ================================================================== //
  return (
    <Dialog
      open={isOpen}
      onClose={setIsOpen}
      as="div"
      className={clsx(
				"fixed inset-0 z-10 flex items-center justify-center overflow-y-auto",
				{
					"bg-gray-900 bg-opacity-50": isOpen === true,
				},
			)}
    >
      <div className="flex flex-col bg-white text-black w-96 py-6 px-4 text-center rounded-lg">
				<Dialog.Overlay />
        <form>
          <div className="form-control">
            <label className="label">
              <span>{t("label.conditionLabel")}</span>
            </label>
            <BxInput
              id='label'
              name='label'
              placeholder={t("label.label")}
              error={form?.labelError}
              onChange={handleChange}
              value={form?.label}
            />
          </div>
          <div className="mb-3"/>
          <div className="form-control">
            <label className="label">
              <span>{t("label.conditionValue")}</span>
            </label>
            <BxInput
              id='value'
              name='value'
              placeholder={t("label.name")}
              error={form?.valueError}
              onChange={handleChange}
              value={form?.value}
            />
          </div>
        </form>
        
        <BxButton className="my-4" type={BxButtonType.gradient}
          onClick={() => {
            if(validateForm()) {
              dispatch(addConditionEvent({auctionId: auctionId ?? 0, label: form.label, value: form.value}));
              setIsOpen(false);
              setForm({...form, label: '', value: ''});
            }
          }}
        >
          {t('action.add')}
        </BxButton>
        <BxButton type={BxButtonType.bordered} 
          onClick={() => {
            setIsOpen(false);
            setForm({...form, label: '', value: ''});
          }}
        >
          {t('action.back')}
        </BxButton>
			</div>
    </Dialog>
  );
}
