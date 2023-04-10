import { Dialog } from "@headlessui/react";
import { FunctionComponent, useState } from "react";
import clsx from 'clsx';
import { BxButton, BxButtonType, BxInput } from "../../components";
import StringUtility from "../../utility/StringUtility";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../app/hooks";
import { BxKeyboardType } from "../../components/bx/BxInput";

interface DenchinDialogProps {
	isOpen: boolean,
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>

}

export const DenchinDialog = ({ isOpen, setIsOpen }: DenchinDialogProps) => {

	const { t } = useTranslation();
  const dispatch = useAppDispatch();

	const [form, setForm] = useState({
		currentDeposit: '',
		addingDeposit: '',
		addingDepositError: '',
		updatedDeposit: '',
		availablePrice: '',
	});

	// ================================================================== //
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

	// ================================================================== //
	function validateForm() {
		if(!StringUtility.isValidText(form.addingDeposit)) {
			setForm({...form, addingDepositError: t('error.errorField')})
      return false;
    }
		return true;;
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
			<div className="flex w-96 flex-col bg-white text-black py-6 px-4 rounded-lg">
				<form>
					<div className="grid grid-cols-2 gap-3">
						<div className="col-span-2 form-control">
							<label className="label">
								<span>{t("label.currentDeposit")}</span>
							</label>
							<BxInput
								id='currentDeposit'
								name='currentDeposit'
								placeholder={t("label.currentDeposit")}
								value={form.currentDeposit}
								readonly={true}
								inputType={BxKeyboardType.currency}
							/>
						</div>
						<div className="col-span-2 form-control">
							<label className="label">
								<span>{t("label.addingDeposit")}</span>
							</label>
							<BxInput 
								id='addingDeposit'
								name='addingDeposit'
								placeholder={t("label.addingDeposit")}
								onChange={handleChange}
								error={form.addingDepositError}
								value={form.addingDeposit}
								readonly={false}
								inputType={BxKeyboardType.currency}
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span>{t("label.addingDeposit")}</span>
							</label>
							<BxInput 
								id='addingDeposit'
								name='addingDeposit'
								placeholder={t("label.addingDeposit")}
								value={form.updatedDeposit}
								readonly={true}
								inputType={BxKeyboardType.currency}
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span>{t("label.availablePrice")}</span>
							</label>
							<BxInput 
								id='availablePrice'
								name='availablePrice'
								placeholder={t("label.availablePrice")}
								value={form.availablePrice}
								readonly={true}
								inputType={BxKeyboardType.currency}
							/>
						</div>
						<div className="col-span-2 grid">
							<BxButton className="my-4" type={BxButtonType.gradient}
								onClick={() => {
									if(validateForm()) {

									}
								}}
							>
								{t('action.increase')}
							</BxButton>
							<BxButton type={BxButtonType.bordered} 
								onClick={() => {
									setIsOpen(false);
								}}
							>
								{t('action.back')}
							</BxButton>
						</div>
					</div>
				</form>
			</div>
		</Dialog>
	);
}
