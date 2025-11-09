// import React, { useRef } from "react";
// import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
// import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

// const { width } = Dimensions.get("window");

// const SLIDES = [
//   {
//     id: "1",
//     title: "Manage Everything in One Place",
//     description: "Create, categorize, and keep track of personal and work tasks effortlessly.",
//     image: require("../../assets/image1.jpg"),
//   },
//   {
//     id: "2",
//     title: "Focus on What Matters Most",
//     description: "Set priorities, add deadlines, and organize tasks so you stay productive.",
//     image: require("../../assets/image2.jpg"),
//   },
//   {
//     id: "3",
//     title: "Visualize Progress, Stay on Track",
//     description: "Monitor completed tasks and upcoming deadlines in one clean view.",
//     image: require("../../assets/image3.jpg"),
//   },
// ];

// export default function Onboarding({ navigation }: any) {
//   const scrollX = useSharedValue(0);
//   const flatListRef = useRef<FlatList>(null);

//   const scrollHandler = useAnimatedScrollHandler({
//     onScroll: (event) => {
//       scrollX.value = event.contentOffset.x;
//     },
//   });

//   const renderItem = ({ item }: any) => (
//     <View style={{ width, alignItems: "center", paddingHorizontal: 24, marginTop: 40 }}>
//       <Image source={item.image} style={{ width: 260, height: 260, resizeMode: "contain" }} />
//       <Text style={{ fontSize: 22, fontWeight: "bold", textAlign: "center", marginTop: 24 }}>{item.title}</Text>
//       <Text style={{ textAlign: "center", color: "#666", marginTop: 12 }}>{item.description}</Text>
//     </View>
//   );

//   const Dot = ({ index }: any) => {
//     const animatedDotStyle = useAnimatedStyle(() => {
//       const opacity = interpolate(scrollX.value / width, [index - 1, index, index + 1], [0.3, 1, 0.3]);
//       return { opacity };
//     });
//     return <Animated.View style={[{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#57C414", marginHorizontal: 4 }, animatedDotStyle]} />;
//   };

//   const handleNext = (index: number) => {
//     if (index < SLIDES.length - 1) {
//       flatListRef.current?.scrollToIndex({ index: index + 1 });
//     } else {
//       navigation.navigate("Login");
//     }
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: "#fff" }}>
//       <Animated.FlatList
//         ref={flatListRef}
//         data={SLIDES}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         pagingEnabled
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         onScroll={scrollHandler}
//       />

//       <View style={{ flexDirection: "row", justifyContent: "center", marginVertical: 16 }}>
//         {SLIDES.map((_, index) => (
//           <Dot key={index} index={index} />
//         ))}
//       </View>

//       <TouchableOpacity
//         onPress={() => handleNext(Math.round(scrollX.value / width))}
//         style={{ backgroundColor: "#57C414", marginHorizontal: 24, paddingVertical: 16, borderRadius: 8, marginBottom: 24 }}
//       >
//         <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}>
//           {Math.round(scrollX.value / width) === SLIDES.length - 1 ? "Continue" : "Next"}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

import { router } from "expo-router";
import React, { useRef } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Stack } from "expo-router";

const { width } = Dimensions.get("window");

const SLIDES = [
  {
    id: "1",
    title: "Manage Everything in One Place",
    description:
      "Create, categorize, and keep track of all your personal and work tasks effortlessly — right from your dashboard.",
    image: require("../../assets/image1.jpg"),
  },
  {
    id: "2",
    title: "Focus on What Matters Most",
    description:
      "Set priorities, add deadlines, and sort tasks by importance so you can tackle what truly moves you forward.",
    image: require("../../assets/image2.jpg"),
  },
  {
    id: "3",
    title: "Visualize Progress, Stay on Track",
    description:
      "Monitor completed tasks, ongoing projects, and deadlines — all clearly displayed in one place.",
    image: require("../../assets/image3.jpg"),
  },
];

export default function Onboarding() {
  const scrollX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollX.value = event.contentOffset.x;
  });

  const handleNext = (index: number) => {
    if (index === SLIDES.length - 1) {
      router.push("/login");

    } else {
      ref.current?.scrollTo({ x: (index + 1) * width, animated: true });
    }
  };

  const ref = useRef<any>(null);


  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.container}>
        <Animated.ScrollView
          ref={ref}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
        >
          {SLIDES.map((item, index) => {
            const animatedStyle = useAnimatedStyle(() => {
              const scale = interpolate(
                scrollX.value,
                [(index - 1) * width, index * width, (index + 1) * width],
                [0.7, 1, 0.7],
                Extrapolate.CLAMP
              );
              return { transform: [{ scale }] };
            });

            return (
              <View key={item.id} style={styles.slide}>
                <Animated.Image source={item.image} style={[styles.image, animatedStyle]} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.dotsContainer}>
                  {SLIDES.map((_, i) => {
                    const dotStyle = useAnimatedStyle(() => {
                      const opacity = interpolate(
                        scrollX.value,
                        [(i - 1) * width, i * width, (i + 1) * width],
                        [0.3, 1, 0.3],
                        Extrapolate.CLAMP
                      );
                      return { opacity };
                    });
                    return <Animated.View key={i} style={[styles.dot, dotStyle]} />;
                  })}
                </View>
                <TouchableOpacity style={styles.button} onPress={() => handleNext(index)}>
                  <Text style={styles.buttonText}>
                    {index === SLIDES.length - 1 ? "Continue" : "Next"}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </Animated.ScrollView>

        <TouchableOpacity style={styles.skip} onPress={() => router.replace("/login")}>
          <Text style={{ color: "#6C757D" }}>Skip</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  slide: {
    width,
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  image: {
    width: 260,
    height: 260,
    resizeMode: "contain",
  },
  title: {
    marginTop: 24,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "600",
    color: "#000",
  },
  description: {
    textAlign: "center",
    marginTop: 10,
    color: "#6C757D",
    fontSize: 14,
    paddingHorizontal: 10,
  },
  dotsContainer: {
    flexDirection: "row",
    marginVertical: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#8BC34A",
    marginHorizontal: 4,
  },
  button: {
    backgroundColor: "#8BC34A",
    paddingVertical: 14,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  skip: {
    position: "absolute",
    top: 50,
    right: 20,
  },
});