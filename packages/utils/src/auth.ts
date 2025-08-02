import type { UserRole } from "@sports-talent/types"

export const hasPermission = (userRole: UserRole, permission: string): boolean => {
  const permissions: Record<UserRole, string[]> = {
    athlete: ["upload_video", "view_own_profile", "engage_content", "update_own_profile"],
    scout: ["search_players", "view_analytics", "export_reports", "view_player_profiles", "save_searches"],
    coach: ["manage_team", "view_team_analytics", "player_development", "create_training_plans", "monitor_injuries"],
    federation: ["regional_oversight", "talent_pipeline", "data_governance", "manage_competitions", "verify_players"],
    admin: ["full_access", "user_management", "system_configuration", "data_export", "content_moderation"],
  }

  return permissions[userRole]?.includes(permission) || permissions[userRole]?.includes("full_access") || false
}

export const getRoleDisplayName = (role: UserRole): string => {
  const displayNames: Record<UserRole, string> = {
    athlete: "Athlete",
    scout: "Scout",
    coach: "Coach",
    federation: "Federation",
    admin: "Administrator",
  }

  return displayNames[role] || role
}

export const canAccessFeature = (userRole: UserRole, feature: string): boolean => {
  const featureAccess: Record<string, UserRole[]> = {
    advanced_search: ["scout", "coach", "federation", "admin"],
    analytics_dashboard: ["scout", "coach", "federation", "admin"],
    team_management: ["coach", "federation", "admin"],
    player_comparison: ["scout", "coach", "federation", "admin"],
    content_moderation: ["federation", "admin"],
    system_settings: ["admin"],
  }

  return featureAccess[feature]?.includes(userRole) || false
}
