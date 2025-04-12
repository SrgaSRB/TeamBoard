import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import api from "../api";

interface Task {
    id: string;
    name: string;
    description: string;
    projectName: string;
    priority: string;
    deadline: string;
    status: string;
}

const Tasks: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const groupTasksByStatus = (tasks: Task[]) => {
        return {
            ToDo: tasks.filter((t) => t.status === "ToDo"),
            InProgress: tasks.filter((t) => t.status === "InProgress"),
            Done: tasks.filter((t) => t.status === "Done"),
        };
    };

    const columns = groupTasksByStatus(tasks);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/tasks/my/");
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleDragEnd = async (result: any) => {
        const { source, destination, draggableId } = result;
        if (!destination || source.droppableId === destination.droppableId) return;

        const updatedTasks = tasks.map((task) =>
            task.id === draggableId ? { ...task, status: destination.droppableId } : task
        );

        setTasks(updatedTasks);

        try {
            await api.put(`/tasks/${draggableId}/status`, destination.droppableId, );
        } catch (error) {
            console.error("Failed to update task status:", error);
        }
    };

    return (
        <section className="tasks-section">
            <div className="w-layout-blockcontainer container w-container">
                <div className="task-wrapper">
                    <h1 className="heading-4">My Tasks</h1>
                    <div className="tasks-div-block">
                        <DragDropContext onDragEnd={handleDragEnd}>
                            {Object.entries(columns).map(([status, taskList]) => (
                                <Droppable droppableId={status} key={status}>
                                    {(provided) => (
                                        <div
                                            className={`${status.toLowerCase()}-tasks-div`}
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            <div className={`div-block-9`}>
                                                <div className={`text-block-${status.toLowerCase()}`}>{status.toUpperCase()}</div>
                                            </div>
                                            <div className="div-block-8">
                                                {taskList.map((task, index) => (
                                                    <Draggable key={task.id} draggableId={task.id} index={index}>
                                                        {(provided) => (
                                                            <div
                                                                className="task-div"
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <div className="text-block-23">{task.name}</div>
                                                                <div className="text-block-24">{task.description}</div>
                                                                <div>
                                                                    Project: <span className="text-span-4">{task.projectName}</span>
                                                                </div>
                                                                <div>
                                                                    Priority: <span className="text-span-5">{task.priority}</span>
                                                                </div>
                                                                <div>
                                                                    Deadline: <span className="text-span-6">{task.deadline}</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        </div>
                                    )}
                                </Droppable>
                            ))}
                        </DragDropContext>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Tasks;
