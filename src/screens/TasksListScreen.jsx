import { View } from "react-native"
import TasksList from "../components/TasksList"

const TasksListScreen = ({ route }) => {
    const { taskName } = route.params || {};

    return (
        <View style={styles.container}>
            <TasksList taskName={taskName} />
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    }
}

export default TasksListScreen;