// import { useState } from "react";
// import {
//   Button,
//   Dimensions,
//   StatusBar,
//   Text,
//   useWindowDimensions,
//   View,
// } from "react-native";

import ActivityCard from "@/components/ActivityCard";
import { availableActivities } from "@/data/availableActivities";
import { Activity } from "@/models/activity.model";
import { useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

// export default function TabLayout() {
//   const [counter, setCounter] = useState<number>(0);

//   const increase = () => {
//     console.log("Previous counter : ", counter); //debugging
//     setCounter(counter + 1);
//   };

//   const errorExample = (person: any) => {
//     // console.log(person.name); //js de app chokur , ts de compile error
//     try {
//       console.log(person.name);
//     } catch (error: any) {
//       console.warn("Error happened", error.message);
//     }
//   };

//   // const { width, height } = Dimensions.get("window"); //static
//   const { width, height } = useWindowDimensions(); //dynamic
//   const isPortrait = height > width;
//   return (
//     <View style={{ paddingTop: StatusBar.currentHeight }}>
//       <Text>Hello Orientation</Text>
//       {/* <Text>Counter : {counter}</Text>
//       <Button title="Increase" onPress={increase}></Button>
//       <Button title="Make Error" onPress={() => errorExample(null)}></Button> */}

//       <Text style={{ fontSize: 30, fontWeight: "bold" }}>
//         {" "}
//         Is Portrait : {isPortrait ? "Yes" : "No"}
//       </Text>
//       <Text style={{ fontSize: 30, fontWeight: "bold" }}>WIDTH : {width}</Text>
//       <Text style={{ fontSize: 30, fontWeight: "bold" }}>
//         HEIGHT : {height}
//       </Text>
//     </View>
//   );
// }

export default function App() {
  const [activity, setActivity] = useState<string>("");
  const [duration, setDuration] = useState<string>("");

  const [logs, setLogs] = useState<Activity[]>(availableActivities);

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const addActivity = () => {
    if (!activity.trim() || !duration.trim()) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    const newLog: Activity = { type: activity, time: duration, icon: "" };

    setLogs([newLog, ...logs]);

    Alert.alert(
      Platform.OS == "ios" ? "Added successfully 🍎" : "Added successfully 🤖",
    );

    setActivity("");
    setDuration("");
  };

  return (
    <View style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View
          style={[
            styles.wrapper,
            { flexDirection: isLandscape ? "row" : "column" },
            {paddingLeft: isLandscape ? 45: 15}
          ]}
        >
          <View style={styles.formContainer}>
            <Text style={styles.title}>Add your activity</Text>

            <TextInput
              style={styles.input}
              placeholder="Activity (exp. running)"
              value={activity}
              onChangeText={setActivity}
            />

            <TextInput
              style={styles.input}
              placeholder="Duration (exp. 30 minutes)"
              value={duration}
              onChangeText={setDuration}
            />

            <TouchableOpacity style={styles.button} onPress={addActivity}>
              <Text>Add activity</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.listContainer}>
            <Text style={styles.title}>All Activities</Text>

            <FlatList
              key={isLandscape ? "l" : "p"}
              data={logs}
              keyExtractor={(_, index) => index.toString()}
              numColumns={isLandscape ? 3 : 1}
              contentContainerStyle={{ paddingBottom: 16 }}
              renderItem={({ item }) => <ActivityCard item={item} />}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "deepskyblue",
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 8,
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    fontWeight: 600,
  },
  wrapper: {
    flex: 1,
    padding: 16,
    gap: 29,
    backgroundColor: "deepskyblue",
  },
  formContainer: {
    backgroundColor: "#f0f8ff",
    padding: 16,
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 8,
    borderRadius: 6,
    padding: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  listContainer: {
    marginTop: 10,
    flex: 1,
  },
});
