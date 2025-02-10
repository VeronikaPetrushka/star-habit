import { View } from "react-native"
import CreateHabit from "../components/CreateHabit"

const CreateHabitScreen = ({ route }) => {
    const { habitToEdit } = route.params || {};

    return (
        <View style={styles.container}>
            <CreateHabit habitToEdit={habitToEdit} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default CreateHabitScreen;