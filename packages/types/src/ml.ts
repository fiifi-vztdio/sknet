export interface MLAnalysisResult {
  id: string
  videoId: string
  status: "pending" | "processing" | "completed" | "failed"
  confidence: number
  processedAt: Date
  results: {
    poseEstimation: PoseEstimationResult
    skillRecognition: SkillRecognitionResult
    performanceMetrics: PerformanceMetrics
    insights: AIInsight[]
  }
}

export interface PoseEstimationResult {
  frames: PoseFrame[]
  summary: {
    totalFrames: number
    averageConfidence: number
    detectedPoses: number
  }
}

export interface PoseFrame {
  timestamp: number
  keypoints: Keypoint[]
  confidence: number
}

export interface Keypoint {
  name: string
  x: number
  y: number
  confidence: number
}

export interface SkillRecognitionResult {
  detectedSkills: DetectedSkill[]
  skillDistribution: Record<string, number>
  highlights: SkillHighlight[]
}

export interface DetectedSkill {
  skill: string
  confidence: number
  startTime: number
  endTime: number
  quality: "poor" | "average" | "good" | "excellent"
  description: string
}

export interface SkillHighlight {
  skill: string
  timestamp: number
  confidence: number
  thumbnailUrl: string
  description: string
}

export interface PerformanceMetrics {
  speed: SpeedMetrics
  agility: AgilityMetrics
  technique: TechniqueMetrics
  overall: OverallRating
}

export interface SpeedMetrics {
  maxSpeed: number
  averageSpeed: number
  acceleration: number
  sprintCount: number
}

export interface AgilityMetrics {
  directionChanges: number
  reactionTime: number
  balance: number
  coordination: number
}

export interface TechniqueMetrics {
  ballControl: number
  passing: number
  shooting: number
  dribbling: number
  defending: number
}

export interface OverallRating {
  score: number
  percentile: number
  ageGroupRanking: number
  strengths: string[]
  improvements: string[]
}

export interface AIInsight {
  type: "strength" | "improvement" | "recommendation" | "warning"
  title: string
  description: string
  confidence: number
  actionable: boolean
  relatedSkills: string[]
}
