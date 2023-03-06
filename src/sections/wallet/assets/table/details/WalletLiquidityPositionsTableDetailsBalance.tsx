import { Text } from "components/Typography/Text/Text"
import { useTranslation } from "react-i18next"
import { FC } from "react"
import { getAssetLogo } from "../../../../../components/AssetIcon/AssetIcon"
import { Icon } from "../../../../../components/Icon/Icon"
import BigNumber from "bignumber.js"

interface Props {
  symbol: string
  balance?: BigNumber
  balanceUsd?: BigNumber
  className?: string
}

export const WalletLiquidityPositionsTableDetailsBalance: FC<Props> = ({
  symbol,
  balance,
  balanceUsd,
  className,
}) => {
  const { t } = useTranslation()

  return (
    <div className={className}>
      <div
        sx={{
          flex: "row",
          gap: 8,
        }}
      >
        <Icon icon={getAssetLogo(symbol)} size={15} />
        <Text
          fs={12}
          lh={14}
          fw={500}
          color="neutralGray300"
          sx={{
            mb: 8,
          }}
        >
          {t("wallet.assets.liquidityPositions.table.details.balance", {
            symbol: symbol,
          })}
        </Text>
      </div>
      <Text
        fs={14}
        lh={18}
        fw={500}
        color="white"
        sx={{
          mb: 2,
        }}
      >
        {t("value", {
          value: balance,
          type: "token",
        })}
      </Text>
      <Text fs={12} lh={16} fw={500} color="neutralGray500">
        {t("value", {
          value: balanceUsd,
          numberPrefix: "$",
          type: "dollar",
        })}
      </Text>
    </div>
  )
}
