import React, { FunctionComponent, useEffect, useState } from "react";
import { Divider } from "react-daisyui";
import { useTranslation } from "react-i18next";
import { BxButton, BxButtonType, BxInput, BxRating } from "../../../components";
import { BxCard } from "../../../components/bx/BxCard";
import { FeedbackDto } from "../../../models/feedback/FeedbackDto";
import { getFeedbacksByNickname, userGiveFeedback } from "../../../service/userApiClient";
import { IoMdAddCircle } from "react-icons/io";
import ErrorManager from "../../../utility/ErrorManager";
import StringUtility from "../../../utility/StringUtility";
import clsx from "clsx";
import { useAppSelector } from "../../../app/hooks";
import { userState } from "../../../redux/user/userSlice";
import { Transition } from "@headlessui/react";
import { RESPONSE_ERROR, RESPONSE_SUCCESS } from "../../../app/appConst";
import { BxMessage, BxMessageType } from "../../../components/bx/BxMessage";

interface FeedbackSectionProps {
  userId?: number;
  nickname?: string;
  isMe?: boolean;
}

const FeedbackSection: FunctionComponent<FeedbackSectionProps> = (
  props: FeedbackSectionProps
) => {
  const { t } = useTranslation();
  const [addCommenShowing, setAddCommentShowing] = useState(false);
  const user = useAppSelector(userState);

  const [feedback, setFeedback] = useState({
    size: 20,
    page: 0,
    error: "",
    feedbacks: Array<FeedbackDto>(),
  });

  const [newFeedback, setNewFeedback] = useState({
    newFeedback: '',
    score: 0,
    isLoading: false,
    newFeedbackError: '',
  });

  useEffect(() => {
    getUserFeedbacks();
  }, [props.nickname]);

  // ================================================================== //
  async function getUserFeedbacks() {
    if (props.nickname === undefined) return;
    try {
      const response = await getFeedbacksByNickname({
        nickname: props.nickname,
        page: feedback.page,
        size: feedback.size,
      });
      setFeedback({ ...feedback, error: "", feedbacks: response.feedbacks });
    } catch (ex) {
      setFeedback({ ...feedback, error: ErrorManager.handleRequestError(ex) });
    }
  }

  /* ============================================================================ */
  /* ============================================================================ */
  async function giveFeedback() {
    setNewFeedback({...newFeedback, isLoading: true, newFeedbackError: ''});
    if(props.userId === undefined) {
      setNewFeedback({...newFeedback, isLoading: false, newFeedbackError: ''});
      return;
    }
    try {
      const response = await userGiveFeedback({
        comment: newFeedback.newFeedback,
        score: newFeedback.score,
        user_id: props.userId ?? 0,
      });
      if(response.status === RESPONSE_SUCCESS) {
        setNewFeedback({...newFeedback, 
          isLoading: false, 
          newFeedback: '',
        });
        setAddCommentShowing(false);
        getUserFeedbacks();
      } else if(response.status === RESPONSE_ERROR) {
        setNewFeedback({...newFeedback, isLoading: false, newFeedback: '', newFeedbackError: response.msg});
      }
    } catch(ex) {
      setNewFeedback({...newFeedback, isLoading: false, newFeedbackError: ErrorManager.handleRequestError(ex)});
    }
  }

  // ================================================================== //
  function validateForm() {
    let hasError = false;
    let feedbackError:string = '';

    if(!StringUtility.isValidText(newFeedback.newFeedback)) {
      hasError = true;
      feedbackError = t('error.errorField');
    }

    setNewFeedback({...newFeedback, 
      newFeedbackError: feedbackError,
    });
    return !hasError;
  }

  // ================================================================== //
  function checkCommentVisible() {
    return user.isLoggedIn && !props.isMe;
  }

  // ================================================================== //
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewFeedback({ ...newFeedback, [event.target.name]: event.target.value });
  }

  // ================================================================== //
  const CommentField = () => {
    if(checkCommentVisible()) {
      return (
        <div className="mb-3">
          <form>
            <div className="form-control">
              <label className="label">
                <span>{t("label.comment")}</span>
              </label>
              <BxRating 
                readOnly={false} 
                rating={newFeedback.score}
              />
              <div className="mt-3"></div>
              <textarea 
                className="textarea textarea-primary" 
                placeholder={t("label.comment")}
                id='newFeedback'
                name='newFeedback'
                onChange={handleChange}
                value={newFeedback.newFeedback}
              ></textarea>
              <BxMessage
                type={BxMessageType.error}
                message={newFeedback.newFeedbackError}
              />
            </div>
            <div className="mt-3">
              <BxButton 
                className="w-full"
                isLoading={newFeedback.isLoading}
                type={BxButtonType.gradient}
                onClick={() => {
                  if(validateForm()) {
                    giveFeedback();
                  }
                }}
              >
                {t('action.leaveComment')}
              </BxButton>
            </div>
          </form>
        </div>
      );
    }
    return <></>
  }

  // ================================================================== //
  return (
    <div>
      <div className="flex h-7 justify-between">
        <h2 className="text-xl font-medium">{t("label.feedback")}</h2>
        {checkCommentVisible() ? (
          <button
            className={clsx(
              "btn text-[11px] btn-sm w-64 text-primary w-44 btn-accent no-animation",
              addCommenShowing ? "btn-active" : ""
            )}
            onClick={() => {
              setAddCommentShowing(!addCommenShowing);
            }}
          >
            <IoMdAddCircle size={17} className="mr-1" />{" "}
            {t("action.addComment")}
          </button>
        ) : (
          <></>
        )}
      </div>
      <Divider />
      <Transition 
        show={addCommenShowing}
        as="div"
        enter="transform transition duration-[200ms]"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100 scale-100 "
        leaveTo="opacity-0 scale-95 "
      >
        {CommentField()}
      </Transition>
      <div className="flex flex-col gap-3">
        {feedback.feedbacks.map((feedback) => {
          const name = StringUtility.extractNickname(feedback.from_who);

          return (
            <BxCard className="px-3 py-2">
              <div className="flex text-sm items-center">
                <BxRating
                  rating={feedback.given_score}
                  readOnly={true}
                  size="sm"
                />
                <span className="font-medium">{name[0]}</span>
                <span className="text-gray-400 font-medium">@{name[1]}</span>
              </div>
              <div className="text-sm text-gray-400">{feedback.when}</div>
              <div className="">
                <p>{feedback.given_comment}</p>
              </div>
            </BxCard>
          );
        })}
      </div>
    </div>
  );
};

export default FeedbackSection;
