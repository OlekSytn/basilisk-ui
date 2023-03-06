import create from "zustand"
import { persist } from "zustand/middleware"
import { SubmittableExtrinsic } from "@polkadot/api/promise/types"
import { ISubmittableResult } from "@polkadot/types/types"
import { getWalletBySource } from "@talismn/connect-wallets"
import { POLKADOT_APP_NAME } from "utils/api"
import { v4 as uuid } from "uuid"
import { ReactElement } from "react"
import BigNumber from "bignumber.js"

export interface Account {
  name: string
  address: string
  provider: string
}

export interface TransactionInput {
  title?: string
  tx: SubmittableExtrinsic
  overrides?: {
    fee: BigNumber
    currencyId?: string
  }
}

export interface ToastMessage {
  onLoading?: ReactElement
  onSuccess?: ReactElement
  onError?: ReactElement
}

export interface Transaction extends TransactionInput {
  hash: string
  id: string
  onSuccess?: (result: ISubmittableResult) => void
  onError?: () => void
  toastMessage?: ToastMessage
}

interface Store {
  transactions?: Transaction[]
  createTransaction: (
    transaction: TransactionInput,
    options?: {
      onSuccess?: () => void
      toast?: ToastMessage
    },
  ) => Promise<ISubmittableResult>
  cancelTransaction: (hash: string) => void
}

export const useAccountStore = create(
  persist<{
    account?: Account
    setAccount: (account: Account | undefined) => void
  }>(
    (set) => ({
      setAccount: (account) => set({ account }),
    }),
    {
      name: "account",
      getStorage: () => ({
        async getItem(name: string) {
          // attempt to activate the account
          const value = window.localStorage.getItem(name)
          if (value == null) return value

          try {
            const { state } = JSON.parse(value)
            if (state.account?.provider == null) return null

            const wallet = getWalletBySource(state.account.provider)
            await wallet?.enable(POLKADOT_APP_NAME)
            const accounts = await wallet?.getAccounts()

            const foundAccount = accounts?.find(
              (i) => i.address === state.account.address,
            )

            if (!foundAccount) throw new Error("Account not found")
            return value
          } catch (err) {
            console.error(err)
            return null
          }
        },
        setItem(name, value) {
          window.localStorage.setItem(name, value)
        },
        removeItem(name) {
          window.localStorage.removeItem(name)
        },
      }),
    },
  ),
)

export const useStore = create<Store>((set) => ({
  createTransaction: (transaction, options) => {
    return new Promise<ISubmittableResult>((resolve, reject) => {
      const hash = transaction.tx.hash.toString()
      set((store) => {
        return {
          transactions: [
            {
              ...transaction,
              hash,
              id: uuid(),
              toastMessage: {
                onLoading: options?.toast?.onLoading,
                onSuccess: options?.toast?.onSuccess,
                onError: options?.toast?.onError,
              },
              onSuccess: resolve,
              onError: () => reject(new Error("Transaction rejected")),
            },
            ...(store.transactions ?? []),
          ],
        }
      })
    })
  },
  cancelTransaction: (id) => {
    set((store) => ({
      transactions: store.transactions?.filter(
        (transaction) => transaction.id !== id,
      ),
    }))
  },
}))
