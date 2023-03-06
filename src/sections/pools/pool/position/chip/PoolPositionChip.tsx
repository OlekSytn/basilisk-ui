import { useAccountDepositIds, useDeposits } from "api/deposits"
import { useTranslation } from "react-i18next"
import { useAccountStore } from "state/store"
import { SChip } from "./PoolPositionChip.styled"

type PositionChipProps = { poolId: string; className?: string }

export const PositionChip = ({ poolId, className }: PositionChipProps) => {
  const { t } = useTranslation()
  const { account } = useAccountStore()
  const deposits = useDeposits(poolId)
  const accountDepositIds = useAccountDepositIds(account?.address)
  const positions = deposits.data?.filter((deposit) =>
    accountDepositIds.data?.some((ad) => ad.instanceId.eq(deposit.id)),
  )

  if (!positions?.length) {
    return null
  }

  return (
    <SChip className={className}>
      {t("pools.pool.positions.amount", { count: positions?.length })}
    </SChip>
  )
}
