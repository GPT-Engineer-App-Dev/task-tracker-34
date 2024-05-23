import { useState } from "react";
import { Container, VStack, HStack, Input, Button, Text, Box, Checkbox, IconButton, Flex, Spacer } from "@chakra-ui/react";
import { FaTrash, FaEdit, FaSave } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const [editIndex, setEditIndex] = useState(null);
  const [editTask, setEditTask] = useState("");

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask("");
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = tasks.map((t, i) => (i === index ? { ...t, completed: !t.completed } : t));
    setTasks(newTasks);
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setEditTask(tasks[index].text);
  };

  const saveTask = (index) => {
    const newTasks = tasks.map((t, i) => (i === index ? { ...t, text: editTask } : t));
    setTasks(newTasks);
    setEditIndex(null);
    setEditTask("");
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="3xl" fontWeight="bold">Todo App</Text>
        <HStack width="100%">
          <Input
            placeholder="Enter a new task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <Button onClick={addTask} colorScheme="blue">Add Task</Button>
        </HStack>
        <VStack width="100%" spacing={3}>
          {tasks.map((t, index) => (
            <HStack key={index} width="100%" justifyContent="space-between">
              {editIndex === index ? (
                <HStack width="100%">
                  <Input
                    value={editTask}
                    onChange={(e) => setEditTask(e.target.value)}
                  />
                  <IconButton
                    aria-label="Save task"
                    icon={<FaSave />}
                    colorScheme="green"
                    onClick={() => saveTask(index)}
                  />
                </HStack>
              ) : (
                <>
                  <Checkbox isChecked={t.completed} onChange={() => toggleTaskCompletion(index)}>
                    <Text as={t.completed ? "s" : ""}>{t.text}</Text>
                  </Checkbox>
                  <HStack>
                    <IconButton
                      aria-label="Edit task"
                      icon={<FaEdit />}
                      colorScheme="yellow"
                      onClick={() => startEditing(index)}
                    />
                    <IconButton
                      aria-label="Delete task"
                      icon={<FaTrash />}
                      colorScheme="red"
                      onClick={() => deleteTask(index)}
                    />
                  </HStack>
                </>
              )}
            </HStack>
          ))}
        </VStack>
      </VStack>
      <Footer />
    </Container>
  );
};

const Footer = () => (
  <Box as="footer" width="100%" py={4} bg="gray.200" mt={8}>
    <Flex justify="center" align="center">
      <Text fontSize="sm" color="gray.600">© 2023 Todo App. All rights reserved.</Text>
    </Flex>
  </Box>
);

export default Index;