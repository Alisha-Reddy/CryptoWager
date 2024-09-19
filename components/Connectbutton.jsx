import React from 'react'
import { ConnectButton } from "@rainbow-me/rainbowkit"

const Connectbutton = () => {
  return (
      <ConnectButton.Custom>
          {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
          }) => {
              // Note: If your app doesn't use authentication, you
              // can remove all 'authenticationStatus' checks
              const ready = mounted && authenticationStatus !== "loading"
              const connected =
                  ready &&
                  account &&
                  chain &&
                  (!authenticationStatus || authenticationStatus === "authenticated")

              return (
                  <div
                      {...(!ready && {
                          "aria-hidden": true,
                          style: {
                              opacity: 0,
                              pointerEvents: "none",
                              userSelect: "none",
                          },
                      })}
                      style={{
                          padding: "10px",
                          backgroundColor: "#1a1a1a", // Dark theme for the box
                          borderRadius: "12px",
                      }}
                  >
                      {(() => {
                          if (!connected) {
                              return (
                                  <button
                                      onClick={openConnectModal}
                                      style={{
                                          padding: "10px",
                                          borderRadius: "8px",
                                          backgroundColor: 'rgb(254, 240, 138)', // Button color to rgb(254, 240, 138)
                                          fontWeight: "bold",
                                      }}
                                  >
                                      Connect Wallet
                                  </button>
                              )
                          }

                          if (chain.unsupported) {
                              return (
                                  <button
                                      onClick={openChainModal}
                                      style={{
                                          padding: "10px",
                                          borderRadius: "8px",
                                          backgroundColor: "red",
                                          color: "white",
                                      }}
                                  >
                                      Wrong Network
                                  </button>
                              )
                          }

                          return (
                              <div style={{ display: "flex", gap: "12px" }}>
                                  <button
                                      onClick={openChainModal}
                                      style={{
                                          padding: "10px",
                                          borderRadius: "8px",
                                          backgroundColor: "#4caf50",
                                          color: "white",
                                      }}
                                  >
                                      {chain.name}
                                  </button>
                                  <button
                                      onClick={openAccountModal}
                                      style={{
                                          padding: "10px",
                                          borderRadius: "8px",
                                          backgroundColor: "rgb(254, 240, 138)", // Button color to rgb(254, 240, 138)
                                           // Text color to black for contrast
                                          fontWeight: "bold",
                                      }}
                                  >
                                      {account.displayName}
                                  </button>
                              </div>
                          )
                      })()}
                  </div>
              )
          }}
      </ConnectButton.Custom>
  )
}

export default Connectbutton