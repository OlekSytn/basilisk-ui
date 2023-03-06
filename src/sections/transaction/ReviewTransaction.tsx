import React, { useState } from "react"
import { Modal } from "components/Modal/Modal"
import { useTranslation } from "react-i18next"
import { Transaction } from "state/store"
import { ComponentProps } from "react"

import { ReviewTransactionPending } from "./ReviewTransactionPending"
import { ReviewTransactionSuccess } from "./ReviewTransactionSuccess"
import { ReviewTransactionError } from "./ReviewTransactionError"
import { ReviewTransactionForm } from "./ReviewTransactionForm"
import { ReviewTransactionToast } from "./ReviewTransactionToast"
import { useSendTransactionMutation } from "./ReviewTransaction.utils"

export const ReviewTransaction: React.FC<Transaction> = (props) => {
  const { t } = useTranslation()
  const [minimizeModal, setMinimizeModal] = useState(false)

  const sendTx = useSendTransactionMutation()

  const modalProps: Partial<ComponentProps<typeof Modal>> =
    sendTx.isLoading || sendTx.isSuccess || sendTx.isError
      ? {
          width: 460,
          title: undefined,
          variant: sendTx.isError ? "error" : "default",
          withoutClose: sendTx.isLoading,
        }
      : {
          title: t("pools.reviewTransaction.modal.title"),
        }

  function handleClose() {
    if (sendTx.isLoading) {
      setMinimizeModal(true)
      return
    }

    if (sendTx.isSuccess) {
      props.onSuccess?.(sendTx.data)
    } else {
      props.onError?.()
    }
  }

  const onReview = () => {
    sendTx.reset()
    setMinimizeModal(false)
  }

  return (
    <>
      {minimizeModal && (
        <ReviewTransactionToast
          id={props.id}
          mutation={sendTx}
          link={sendTx.data?.transactionLink}
          onReview={onReview}
          onClose={handleClose}
          toastMessage={props.toastMessage}
        />
      )}
      <Modal open={!minimizeModal} onClose={handleClose} {...modalProps}>
        {sendTx.isLoading ? (
          <ReviewTransactionPending
            txState={sendTx.txState}
            onClose={handleClose}
          />
        ) : sendTx.isSuccess ? (
          <ReviewTransactionSuccess onClose={handleClose} />
        ) : sendTx.isError ? (
          <ReviewTransactionError onClose={handleClose} onReview={onReview} />
        ) : (
          <ReviewTransactionForm
            tx={props.tx}
            hash={props.hash}
            title={props.title}
            onCancel={handleClose}
            onSigned={(signed) => sendTx.mutateAsync(signed)}
            overrides={props.overrides}
          />
        )}
      </Modal>
    </>
  )
}
