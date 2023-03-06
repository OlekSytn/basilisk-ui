import { getAssetLogo } from "components/AssetIcon/AssetIcon"
import { Text } from "components/Typography/Text/Text"
import BN from "bignumber.js"
import { useTranslation } from "react-i18next"
import { SIcon } from "sections/wallet/assets/table/data/WalletAssetsTableData.styled"
import { DollarAssetValue } from "components/DollarAssetValue/DollarAssetValue"

export const WalletAssetsTableName = (props: {
  symbol: string
  name: string
  isPaymentFee: boolean
  large?: boolean
}) => {
  const { t } = useTranslation()

  return (
    <div>
      <div sx={{ flex: "row", gap: 6, align: "center" }}>
        <SIcon large={props.large}>{getAssetLogo(props.symbol)}</SIcon>
        <div sx={{ flex: "column", width: "100%" }}>
          <Text fs={14} lh={[props.large ? 18 : 16, 18]} fw={500} color="white">
            {props.symbol}
          </Text>
          <Text
            fs={[props.large ? 14 : 10, 12]}
            lh={[props.large ? 18 : 14, 16]}
            fw={500}
            color="neutralGray400"
            css={{ letterSpacing: "0.02em" }}
          >
            {props.name}
          </Text>
        </div>
      </div>
      {props.isPaymentFee && (
        <Text
          fs={props.large ? 9 : 8}
          fw={700}
          sx={{
            mt: 2,
            ml: props.large ? 40 : [32, 40],
          }}
          color="primary300"
          tTransform="uppercase"
        >
          {t("wallet.assets.table.details.feePaymentAsset")}
        </Text>
      )}
    </div>
  )
}

export const WalletAssetsTableBalance = (props: {
  balance: BN
  balanceUSD: BN
}) => {
  const { t } = useTranslation()

  return (
    <div sx={{ flex: "column", align: ["end", "start"], gap: 2 }}>
      <Text fs={14} lh={18} fw={500} color="white">
        {t("value", { value: props.balance, type: "token" })}
      </Text>

      <DollarAssetValue
        value={props.balanceUSD}
        wrapper={(children) => (
          <Text fs={[11, 12]} lh={[14, 16]} fw={500} color="neutralGray500">
            {children}
          </Text>
        )}
      >
        {t("value.usd", { amount: props.balanceUSD, type: "dollar" })}
      </DollarAssetValue>
    </div>
  )
}
