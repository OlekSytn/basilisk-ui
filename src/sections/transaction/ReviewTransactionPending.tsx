import { Text } from "components/Typography/Text/Text"
import { Spinner } from "components/Spinner/Spinner.styled"
import { GradientText } from "components/Typography/GradientText/GradientText"
import { useTranslation } from "react-i18next"
import { Button } from "components/Button/Button"
import { ExtrinsicStatus } from "@polkadot/types/interfaces"
import { ReviewTransactionProgress } from "./ReviewTransactionProgress"
import { Spacer } from "components/Spacer/Spacer"

type Props = {
  onClose: () => void
  txState: ExtrinsicStatus["type"] | null
}

export const ReviewTransactionPending = ({ onClose, txState }: Props) => {
  const { t } = useTranslation()
  return (
    <div sx={{ flex: "column", align: "center", pt: 50 }}>
      <Spinner css={{ width: 135, height: 135 }} />
      <GradientText fs={24} fw={600} tAlign="center" sx={{ mt: 20 }}>
        {t("pools.reviewTransaction.modal.pending.title")}
      </GradientText>

      <div sx={{ px: 20, mt: 20 }}>
        <Text tAlign="center" fs={16} color="neutralGray200" fw={400} lh={22}>
          {t("pools.reviewTransaction.modal.pending.description")}
        </Text>
      </div>

      <Button variant="secondary" sx={{ mt: 40 }} onClick={onClose}>
        {t("pools.reviewTransaction.modal.success.close")}
      </Button>

      <Spacer size={40} />

      {txState === "Broadcast" && (
        <ReviewTransactionProgress duration={3} onComplete={onClose} />
      )}
    </div>
  )
}
