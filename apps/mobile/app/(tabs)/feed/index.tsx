"use client"

import { useState, useEffect } from "react"
import { View, Text, FlatList, StyleSheet, RefreshControl, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import type { Video } from "@sports-talent/types"
import { api } from "@sports-talent/api-client"

export default function FeedScreen() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [page, setPage] = useState(1)

  const loadVideos = async (pageNum = 1, refresh = false) => {
    try {
      if (refresh) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }

      const response = await api.videos.getVideos({
        page: pageNum,
        limit: 20,
        sortBy: "date",
        sortOrder: "desc",
      })

      if (response.success && response.data) {
        if (refresh || pageNum === 1) {
          setVideos(response.data.videos)
        } else {
          setVideos((prev) => [...prev, ...response.data!.videos])
        }
        setPage(pageNum)
      }
    } catch (error) {
      console.error("Error loading videos:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadVideos()
  }, [])

  const handleRefresh = () => {
    loadVideos(1, true)
  }

  const handleLoadMore = () => {
    if (!loading) {
      loadVideos(page + 1)
    }
  }

  const renderVideo = ({ item }: { item: Video }) => (
    <View style={styles.videoCard}>
      <View style={styles.videoHeader}>
        <Text style={styles.videoTitle}>{item.title}</Text>
        <Text style={styles.videoMeta}>
          {item.analytics.views} views • {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.videoContainer}>
        {/* Video player component would go here */}
        <View style={styles.videoPlaceholder}>
          <Text style={styles.placeholderText}>Video Player</Text>
        </View>
      </View>

      <View style={styles.videoActions}>
        <Text style={styles.actionText}>❤️ {item.analytics.likes}</Text>
        <Text style={styles.actionText}>💬 {item.analytics.comments}</Text>
        <Text style={styles.actionText}>📤 {item.analytics.shares}</Text>
      </View>

      {item.description && <Text style={styles.videoDescription}>{item.description}</Text>}
    </View>
  )

  if (loading && videos.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text style={styles.loadingText}>Loading videos...</Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={videos}
        renderItem={renderVideo}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  listContainer: {
    paddingVertical: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#6B7280",
  },
  videoCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  videoHeader: {
    marginBottom: 12,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  videoMeta: {
    fontSize: 14,
    color: "#6B7280",
  },
  videoContainer: {
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 12,
  },
  videoPlaceholder: {
    height: 200,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 16,
    color: "#6B7280",
  },
  videoActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    color: "#6B7280",
  },
  videoDescription: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },
})
