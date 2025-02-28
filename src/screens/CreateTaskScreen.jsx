import { View } from "react-native"
import CreateTask from "../components/CreateTask"

const CreateTaskScreen = ({ route }) => {
    const { taskToEdit } = route.params || {};

    return (
        <View style={styles.container}>
            <CreateTask taskToEdit={taskToEdit} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default CreateTaskScreen;