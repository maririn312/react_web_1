import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../app/hooks";
import clsx from 'clsx';
import { BxButton, BxButtonType, BxInput } from "../../components";

interface InvoicePaymentDialogProps {
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
  invoiceId: number,
}

export const InvoicePaymentDialog = (({isOpen, setIsOpen, invoiceId}:InvoicePaymentDialogProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  /* ============================================================================ */
  /* ============================================================================ */
  const [form, setForm] = useState({
    password: '',
    passwordError: '',
    isLoading: false,
  });

  /* ============================================================================ */
  /* ============================================================================ */
  function validateForm() {
    // TODO: impl
    return false;
  }

  /* ============================================================================ */
  /* ============================================================================ */
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
        <div>
          <form>
            <div className="form-control">
              <label className="label text-sm">
                <span>{t("label.password")}</span>
              </label>
              <BxInput
                id='password'
                name='password'
                placeholder={t("label.password")}
                value={form.password}
              />
            </div>
            <div className="flex">
              <BxButton className="my-4 w-1/2" type={BxButtonType.gradient}
                onClick={() => {
                  if(validateForm()) {
                    // dispatch(addConditionEvent({id: auctionId ?? 0, label: form.label, value: form.value}));
                    // setIsOpen(false);
                    // setForm({...form, label: '', value: ''});
                  }
                }}
              >
                {t('action.ok')}
              </BxButton>
                <BxButton className="my-4 w-1/2" type={BxButtonType.bordered}
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                {t('action.cancel')}
              </BxButton>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
})