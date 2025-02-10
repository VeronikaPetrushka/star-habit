import { View } from "react-native"
import HabitsList from "../components/HabitsList"

const HabitsListScreen = ({ route }) => {
    const { habitName } = route.params || {};

    return (
        <View style={styles.container}>
            <HabitsList habitName={habitName} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default HabitsListScreen;