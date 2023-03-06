import { WalletConnectProvidersButton } from "sections/wallet/connect/providers/button/WalletConnectProvidersButton"
import { FC } from "react"
import { getWallets, Wallet } from "@talismn/connect-wallets"
import { useMedia } from "react-use"
import { theme } from "theme"
import { getWalletMeta } from "../modal/WalletConnectModal.utils"

type Props = {
  onConnect: (provider: Wallet) => void
  onDownload: (provider: { installUrl: string }) => void
}

export const WalletConnectProviders: FC<Props> = ({
  onConnect,
  onDownload,
}) => {
  const wallets = getWallets()
  const isDesktop = useMedia(theme.viewport.gte.sm)
  const isNovaWallet = window.walletExtension?.isNovaWallet || !isDesktop

  return (
    <div sx={{ flex: "column", align: "stretch", mt: 8, gap: 8 }}>
      {wallets.map((wallet) => {
        return (
          <WalletConnectProvidersButton
            key={wallet.extensionName}
            wallet={wallet}
            isNovaWallet={isNovaWallet}
            onClick={() => {
              if (wallet.installed) {
                onConnect(wallet)
              } else {
                const walletMeta = getWalletMeta(wallet, isNovaWallet)
                if (walletMeta) onDownload(walletMeta)
              }
            }}
            isInjected={!!wallet.installed}
          />
        )
      })}
    </div>
  )
}
