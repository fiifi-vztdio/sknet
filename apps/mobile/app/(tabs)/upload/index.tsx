"use client"

import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput, ScrollView } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Camera, CameraType } from "expo-camera"
import { Ionicons } from "@expo/vector-icons"

export default function UploadScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [type, setType] = useState(CameraType.back)
  const [isRecording, setIsRecording] = useState(false)
  const [showCamera, setShowCamera] = useState(false)
  const [videoTitle, setVideoTitle] = useState("")
  const [videoDescription, setVideoDescription] = useState("")

  React.useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === "granted")
    })()
  }, [])

  const startRecording = async () => {
    if (!hasPermission) {
      Alert.alert("Permission Required", "Camera permission is required to record videos.")
      return
    }
    setIsRecording(true)
    // Recording logic would go here
  }

  const stopRecording = () => {
    setIsRecording(false)
    // Stop recording logic would go here
  }

  const toggleCameraType = () => {
    setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back))
  }

  if (hasPermission === null) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text>Requesting camera permission...</Text>
        </View>
      </SafeAreaView>
    )
  }

  if (hasPermission === false) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>No access to camera</Text>
          <TouchableOpacity style={styles.button} onPress={() => Camera.requestCameraPermissionsAsync()}>
            <Text style={styles.buttonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }

  if (showCamera) {
    return (
      <SafeAreaView style={styles.container}>
        <Camera style={styles.camera} type={type}>
          <View style={styles.cameraControls}>
            <TouchableOpacity style={styles.cameraButton} onPress={() => setShowCamera(false)}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.cameraButton} onPress={toggleCameraType}>
              <Ionicons name="camera-reverse" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.recordingControls}>
            <TouchableOpacity
              style={[styles.recordButton, isRecording && styles.recordButtonActive]}
              onPress={isRecording ? stopRecording : startRecording}
            >
              <View style={[styles.recordButtonInner, isRecording && styles.recordButtonInnerActive]} />
            </TouchableOpacity>
          </View>
        </Camera>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Upload Your Skills</Text>
          <Text style={styles.subtitle}>Show your best moves and get discovered by scouts</Text>
        </View>

        <View style={styles.uploadOptions}>
          <TouchableOpacity style={styles.uploadButton} onPress={() => setShowCamera(true)}>
            <Ionicons name="videocam" size={32} color="#3B82F6" />
            <Text style={styles.uploadButtonText}>Record Video</Text>
            <Text style={styles.uploadButtonSubtext}>Record a new skills video</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.uploadButton}>
            <Ionicons name="folder" size={32} color="#3B82F6" />
            <Text style={styles.uploadButtonText}>Choose from Gallery</Text>
            <Text style={styles.uploadButtonSubtext}>Select an existing video</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <Text style={styles.formLabel}>Video Title</Text>
          <TextInput
            style={styles.textInput}
            value={videoTitle}
            onChangeText={setVideoTitle}
            placeholder="Enter a catchy title for your video"
            placeholderTextColor="#9CA3AF"
          />

          <Text style={styles.formLabel}>Description (Optional)</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            value={videoDescription}
            onChangeText={setVideoDescription}
            placeholder="Describe your skills, position, or any other details"
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={4}
          />

          <View style={styles.tips}>
            <Text style={styles.tipsTitle}>📱 Recording Tips:</Text>
            <Text style={styles.tipText}>• Record in good lighting</Text>
            <Text style={styles.tipText}>• Keep the camera steady</Text>
            <Text style={styles.tipText}>• Show your skills clearly</Text>
            <Text style={styles.tipText}>• Keep videos under 60 seconds</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContainer: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
  },
  uploadOptions: {
    padding: 20,
    gap: 16,
  },
  uploadButton: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  uploadButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginTop: 8,
  },
  uploadButtonSubtext: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  form: {
    padding: 20,
  },
  formLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
    marginTop: 16,
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#111827",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  tips: {
    backgroundColor: "#EFF6FF",
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E40AF",
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: "#1E40AF",
    marginBottom: 4,
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    paddingTop: 40,
  },
  cameraButton: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  recordingControls: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  recordButtonActive: {
    backgroundColor: "rgba(239, 68, 68, 0.3)",
  },
  recordButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#EF4444",
  },
  recordButtonInnerActive: {
    borderRadius: 8,
    width: 40,
    height: 40,
  },
  button: {
    backgroundColor: "#3B82F6",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    fontSize: 16,
    color: "#EF4444",
    textAlign: "center",
  },
})
