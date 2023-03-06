import { Dialog, DialogPortal } from "@radix-ui/react-dialog"
import { theme } from "theme"
import { Text } from "components/Typography/Text/Text"
import { Backdrop } from "components/Backdrop/Backdrop"
import { ReactComponent as CrossIcon } from "assets/icons/CrossIcon.svg"
import { ReactNode } from "react"
import { SWrapper, SDialogContent, SCloseButton } from "./ToastSidebar.styled"
import { ToastContent } from "./ToastContent"
import { useToast } from "state/toasts"
import { useTranslation } from "react-i18next"
import { RemoveScroll } from "react-remove-scroll"
import { ReactComponent as NoActivities } from "assets/icons/NoActivities.svg"

const ToastGroupHeader = (props: { children?: ReactNode }) => (
  <Text
    fw={400}
    fs={14}
    css={{ background: `rgba(${theme.rgbColors.black}, 0.2)` }}
    sx={{ px: 22, py: 10 }}
  >
    {props.children}
  </Text>
)

export function ToastSidebar() {
  const store = useToast()
  const onClose = () => store.setSidebar(false)

  const sortedToasts = store.toasts.sort(
    (a, b) =>
      new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime(),
  )

  const pendingToasts = sortedToasts.filter((x) => x.variant === "progress")
  const completedToasts = sortedToasts.filter((x) => x.variant !== "progress")

  const { t } = useTranslation()

  return (
    <Dialog open={store.sidebar}>
      <DialogPortal>
        <SWrapper>
          <Backdrop onClick={onClose} />

          <RemoveScroll enabled={store.sidebar}>
            <SDialogContent onEscapeKeyDown={onClose}>
              <Text fw={500} fs={16} tAlign="center" sx={{ py: 24 }}>
                {t("toast.sidebar.title")}
              </Text>

              <SCloseButton
                name={t("toast.close")}
                icon={<CrossIcon />}
                onClick={onClose}
              />
              {!sortedToasts.length ? (
                <div
                  sx={{
                    flex: "column",
                    justify: "center",
                    align: "center",
                    height: "100%",
                    py: 100,
                  }}
                >
                  <NoActivities
                    sx={{
                      color: "neutralGray500",
                      height: 50,
                      width: "100%",
                      mb: 16,
                    }}
                  />
                  <Text color="neutralGray500" fs={16}>
                    {t("toast.sidebar.empty.text1")}
                  </Text>
                  <Text color="neutralGray500" fs={16}>
                    {t("toast.sidebar.empty.text2")}
                  </Text>
                </div>
              ) : (
                <>
                  {pendingToasts.length > 0 && (
                    <>
                      <ToastGroupHeader>
                        {t("toast.sidebar.pending")}
                      </ToastGroupHeader>
                      <div sx={{ flex: "column", gap: 6, p: 8 }}>
                        {pendingToasts.map((toast) => (
                          <ToastContent
                            key={toast.id}
                            variant={toast.variant}
                            title={
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: toast.title,
                                }}
                              />
                            }
                            actions={toast.actions}
                            dateCreated={
                              typeof toast.dateCreated === "string"
                                ? new Date(toast.dateCreated)
                                : toast.dateCreated
                            }
                          />
                        ))}
                      </div>
                    </>
                  )}
                  {completedToasts.length > 0 && (
                    <>
                      <ToastGroupHeader>
                        {t("toast.sidebar.completed")}
                      </ToastGroupHeader>
                      <div sx={{ flex: "column", gap: 6, p: 8 }}>
                        {completedToasts.map((toast) => (
                          <ToastContent
                            key={toast.id}
                            link={toast.link}
                            variant={toast.variant}
                            title={
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: toast.title,
                                }}
                              />
                            }
                            actions={toast.actions}
                            dateCreated={
                              typeof toast.dateCreated === "string"
                                ? new Date(toast.dateCreated)
                                : toast.dateCreated
                            }
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}
            </SDialogContent>
          </RemoveScroll>
        </SWrapper>
      </DialogPortal>
    </Dialog>
  )
}
