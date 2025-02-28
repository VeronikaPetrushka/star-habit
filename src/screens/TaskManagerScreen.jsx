import { View } from "react-native"
import TaskManager from "../components/TaskManager"

const TaskManagerScreen = ({ route }) => {
    const { taskName } = route.params || {};

    return (
        <View style={styles.container}>
            <TaskManager taskName={taskName} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default TaskManagerScreen;