import { type ReactNode, useCallback, useImperativeHandle, forwardRef, useEffect } from "react";
import { Platform, useWindowDimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  Easing,
} from "react-native-reanimated";

const SWIPE_THRESHOLD = 0.25; // 25% of screen width
const VELOCITY_THRESHOLD = 500;
const TIMING_CONFIG = { duration: 280, easing: Easing.out(Easing.cubic) };

export interface WebPagerRef {
  setPage: (index: number) => void;
}

interface WebPagerProps {
  initialPage: number;
  onPageSelected: (index: number) => void;
  children: ReactNode[];
}

export const WebPager = forwardRef<WebPagerRef, WebPagerProps>(
  function WebPager({ initialPage, onPageSelected, children }, ref) {
    const { width } = useWindowDimensions();
    const pageCount = (children as ReactNode[]).length;

    const translateX = useSharedValue(-initialPage * width);
    const dragX = useSharedValue(0);
    const currentPage = useSharedValue(initialPage);

    const reportPage = useCallback(
      (page: number) => {
        onPageSelected(page);
      },
      [onPageSelected],
    );

    const animateToPage = useCallback(
      (page: number) => {
        "worklet";
        currentPage.value = page;
        translateX.value = withTiming(-page * width, TIMING_CONFIG);
        runOnJS(reportPage)(page);
      },
      [width, translateX, currentPage, reportPage],
    );

    useImperativeHandle(
      ref,
      () => ({
        setPage: (index: number) => {
          currentPage.value = index;
          translateX.value = withTiming(-index * width, TIMING_CONFIG);
          reportPage(index);
        },
      }),
      [width, translateX, currentPage, reportPage],
    );

    const pan = Gesture.Pan()
      .activeOffsetX([-15, 15])
      .failOffsetY([-10, 10])
      .onUpdate((e) => {
        const page = currentPage.value;
        // Clamp drag at edges with rubber-band effect
        let dx = e.translationX;
        if (page === 0 && dx > 0) dx *= 0.3;
        if (page === pageCount - 1 && dx < 0) dx *= 0.3;
        dragX.value = dx;
      })
      .onEnd((e) => {
        const page = currentPage.value;
        const swipedLeft =
          e.translationX < -width * SWIPE_THRESHOLD ||
          e.velocityX < -VELOCITY_THRESHOLD;
        const swipedRight =
          e.translationX > width * SWIPE_THRESHOLD ||
          e.velocityX > VELOCITY_THRESHOLD;

        let targetPage = page;
        if (swipedLeft && page < pageCount - 1) targetPage = page + 1;
        else if (swipedRight && page > 0) targetPage = page - 1;

        // Commit drag offset into translateX so the animation starts
        // from the current visual position, not from the page-aligned spot.
        translateX.value = translateX.value + dragX.value;
        dragX.value = 0;
        animateToPage(targetPage);
      })
      .onFinalize(() => {
        // Covers cancelled / interrupted gestures (e.g. pointer leaving the window on web)
        // If onEnd already ran, dragX is 0 and this is a no-op.
        if (dragX.value !== 0) {
          translateX.value = translateX.value + dragX.value;
          dragX.value = 0;
          animateToPage(currentPage.value);
        }
      });

    // Patch releasePointerCapture on web so that releasing a pointer
    // that already left the window doesn't throw.
    useEffect(() => {
      if (Platform.OS !== "web") return;
      const original = Element.prototype.releasePointerCapture;
      Element.prototype.releasePointerCapture = function (pointerId: number) {
        try {
          original.call(this, pointerId);
        } catch {
          // Silently ignore – the pointer is already gone
        }
      };
      return () => {
        Element.prototype.releasePointerCapture = original;
      };
    }, []);

    const stripStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: translateX.value + dragX.value }],
    }));

    return (
      <GestureDetector gesture={pan}>
        <Animated.View style={{ flex: 1, overflow: "hidden" }}>
          <Animated.View
            style={[
              {
                flexDirection: "row",
                width: width * pageCount,
                flex: 1,
              },
              stripStyle,
            ]}
          >
            {(children as ReactNode[]).map((child, index) => (
              <Animated.View key={index} style={{ width, flex: 1 }}>
                {child}
              </Animated.View>
            ))}
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    );
  },
);
