/**
 * Re-exports React Native's built-in Animated components wrapped with
 * NativeWind's `cssInterop` so they accept `className` props.
 *
 * Usage:
 *   import { AnimatedView, AnimatedText, AnimatedScrollView } from "@/components/Animated";
 *   <AnimatedView className="flex-1 bg-white" style={{ opacity }} />
 */
import { Animated } from "react-native";
import { cssInterop } from "nativewind";

export const AnimatedView = cssInterop(Animated.View, { className: "style" });
export const AnimatedText = cssInterop(Animated.Text, { className: "style" });
export const AnimatedScrollView = cssInterop(Animated.ScrollView, {
  className: "style",
  contentContainerClassName: "contentContainerStyle",
});
