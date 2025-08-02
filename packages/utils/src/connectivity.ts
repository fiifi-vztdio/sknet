export interface ConnectivityInfo {
  isOnline: boolean
  connectionType: "wifi" | "4g" | "3g" | "2g" | "unknown"
  effectiveType: "slow-2g" | "2g" | "3g" | "4g"
  downlink: number
  rtt: number
}

export const getConnectivityInfo = (): ConnectivityInfo => {
  if (typeof navigator === "undefined") {
    return {
      isOnline: true,
      connectionType: "unknown",
      effectiveType: "4g",
      downlink: 10,
      rtt: 100,
    }
  }

  const connection =
    (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection

  return {
    isOnline: navigator.onLine,
    connectionType: connection?.type || "unknown",
    effectiveType: connection?.effectiveType || "4g",
    downlink: connection?.downlink || 10,
    rtt: connection?.rtt || 100,
  }
}

export const getOptimalVideoQuality = (connectivity: ConnectivityInfo): string => {
  if (!connectivity.isOnline) return "offline"

  switch (connectivity.effectiveType) {
    case "slow-2g":
    case "2g":
      return "240p"
    case "3g":
      return "360p"
    case "4g":
      return connectivity.connectionType === "wifi" ? "1080p" : "720p"
    default:
      return "720p"
  }
}

export const shouldPreloadContent = (connectivity: ConnectivityInfo): boolean => {
  return connectivity.isOnline && (connectivity.connectionType === "wifi" || connectivity.effectiveType === "4g")
}

export const getUploadStrategy = (connectivity: ConnectivityInfo): "immediate" | "wifi_only" | "queue" => {
  if (!connectivity.isOnline) return "queue"
  if (connectivity.connectionType === "wifi") return "immediate"
  if (connectivity.effectiveType === "4g") return "immediate"
  return "wifi_only"
}
