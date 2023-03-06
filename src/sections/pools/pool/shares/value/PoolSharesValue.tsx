import { FC } from "react"
import { Text } from "components/Typography/Text/Text"
import { useTranslation } from "react-i18next"
import { u32 } from "@polkadot/types"
import BN from "bignumber.js"
import { PoolBase } from "@galacticcouncil/sdk"
import { useCurrentSharesValue } from "sections/pools/pool/shares/value/PoolSharesValue.utils"
import { Maybe } from "utils/helpers"

type Props = { shareToken: Maybe<u32>; pool: PoolBase; shareTokenBalance?: BN }

export const PoolSharesValue: FC<Props> = (props) => {
  const { t } = useTranslation()

  const { dollarValue, assetA, assetB } = useCurrentSharesValue(props)

  return (
    <div sx={{ flex: "row", justify: "center" }}>
      <div sx={{ flex: "column", gap: 6 }}>
        <Text fs={12} lh={16} fw={400} color="neutralGray500">
          {t("pools.pool.liquidity.value")}
        </Text>
        <div sx={{ flex: "column", gap: 2 }}>
          <Text fs={14} lh={18} color="white">
            {t("pools.pool.liquidity.amounts", {
              amountA: assetA?.amount,
              symbolA: assetA?.symbol,
              amountB: assetB?.amount,
              symbolB: assetB?.symbol,
            })}
          </Text>
          <Text fs={12} lh={16} color="neutralGray500">
            {t("value.usd", { amount: dollarValue })}
          </Text>
        </div>
      </div>
    </div>
  )
}
