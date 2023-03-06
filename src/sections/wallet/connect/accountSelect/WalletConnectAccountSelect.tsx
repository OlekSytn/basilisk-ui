import { FC, ReactNode } from "react"
import { Text } from "components/Typography/Text/Text"
import { useTranslation } from "react-i18next"
import { useQuery } from "@tanstack/react-query"
import { WalletConnectAccountSelectItem } from "sections/wallet/connect/accountSelect/item/WalletConnectAccountSelectItem"
import { Account } from "state/store"
import { getWalletBySource } from "@talismn/connect-wallets"
import { SContainer } from "./WalletConnectAccountSelect.styled"

type Props = {
  provider: string
  onSelect: (account: Account) => void
  currentAddress: string | undefined
}

export const WalletConnectAccountSelect: FC<Props> = ({
  provider,
  onSelect,
  currentAddress,
}) => {
  const { t } = useTranslation("translation")

  const accounts = useQuery(["web3Accounts", provider], async () => {
    const wallet = getWalletBySource(provider)
    return await wallet?.getAccounts()
  })

  const accountComponents = accounts.data?.reduce((memo, account) => {
    const accountName = account.name ?? account.address
    // As Talisman allows Ethereum accounts to be added as well, filter these accounts out
    // as I believe these are not supported on Basilisk / HydraDX
    // @ts-expect-error
    if (account.type !== "ethereum" && account.type !== "ecdsa") {
      const isActive = currentAddress === account.address
      const accountComponent = (
        <WalletConnectAccountSelectItem
          isActive={isActive}
          provider={provider}
          key={account.address}
          name={accountName}
          address={account.address}
          setAccount={() => {
            onSelect({
              name: accountName,
              address: account.address,
              provider,
            })
          }}
        />
      )
      if (isActive) {
        memo.unshift(accountComponent)
      } else {
        memo.push(accountComponent)
      }
    }

    return memo
  }, [] as ReactNode[])

  return (
    <>
      <Text fw={500} color="neutralGray200" sx={{ mt: 6 }}>
        {t("walletConnect.accountSelect.description")}
      </Text>

      <SContainer>{accountComponents}</SContainer>
    </>
  )
}
