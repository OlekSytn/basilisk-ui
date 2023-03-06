import { u32 } from "@polkadot/types"
import { useAsset } from "api/asset"
import { useTokenBalance } from "api/balances"
import { AssetSelectInput } from "components/AssetSelect/AssetSelectInput"
import { useAssetsModal } from "sections/assets/AssetsModal.utils"
import { useAccountStore } from "state/store"

export const WalletTransferAssetSelect = (props: {
  name: string

  value: string
  onChange: (value: string) => void

  asset: u32 | string
  onAssetChange: (asset: u32 | string) => void

  title?: string
  className?: string

  error?: string
}) => {
  const { account } = useAccountStore()
  const asset = useAsset(props.asset)
  const balance = useTokenBalance(props.asset, account?.address)

  const { openModal, modal } = useAssetsModal({
    onSelect: props.onAssetChange,
  })

  return (
    <>
      {modal}
      <AssetSelectInput
        name={props.name}
        title={props.title}
        className={props.className}
        value={props.value}
        onChange={props.onChange}
        asset={props.asset}
        assetIcon={asset.data?.icon}
        decimals={asset.data?.decimals?.toNumber()}
        balance={balance.data?.balance}
        onSelectAssetClick={openModal}
        error={props.error}
      />
    </>
  )
}
