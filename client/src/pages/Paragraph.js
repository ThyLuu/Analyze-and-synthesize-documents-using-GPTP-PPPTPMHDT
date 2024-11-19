import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Box, Typography, useTheme, useMediaQuery, TextField, Button, Alert, Collapse, Card, Grid } from "@mui/material";

const Paragraph = () => {
    const theme = useTheme();
    const isNotMobile = useMediaQuery('(min-width: 1000px)');

    // States
    const [text, setText] = useState('');
    const [paragraph, setParagraph] = useState('');
    const [error, setError] = useState('');
    
    const [isEditing, setIsEditing] = useState(false);
    const [savedParagraphs, setSavedParagraphs] = useState([]);
    const [currentParagraph, setCurrentParagraph] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const { data } = await axios.post("/api/v1/openai/paragraph", { text });
    //         console.log(data);
    //         setPara(data);
    //     } catch (err) {
    //         console.log(error);
    //         if (err.response.data.error) {
    //             setError(err.response.data.error);
    //         } else if (err.message) {
    //             setError(err.message);
    //         }
    //         setTimeout(() => {
    //             setError("");
    //         }, 5000);
    //     }
    // };

    //thử nghiệm
    const handleSubmit = (e) => {
        e.preventDefault();

        // Mảng chứa nhiều đoạn văn khác nhau
        //chủ đề: developer, frontend, backend, Full Stack, mobile
        const paragraphs = [
            "As a developer, you play a crucial role in bringing ideas to life through code. Your responsibilities often encompass a wide range of tasks, from writing efficient algorithms to debugging complex issues. The journey of a developer involves continuous learning and adapting to new technologies that emerge in the ever-evolving tech landscape. Collaboration with other team members, including designers and project managers, is essential to ensure the final product meets user needs. Ultimately, your work contributes significantly to creating innovative solutions that can change the way people interact with technology.",
            "As a frontend developer, your primary focus is on the visual aspects of a website or application. You are responsible for implementing the user interface and ensuring a seamless user experience through intuitive design and functionality. Mastering HTML, CSS, and JavaScript is crucial, as these are the building blocks of the web. You must also stay updated with the latest frameworks and libraries, such as React or Angular, to enhance your development process. Additionally, you need to consider responsive design principles to ensure your applications work flawlessly across various devices and screen sizes.",
            "Backend developers play a vital role in managing the server-side of web applications. Your responsibilities include designing and implementing APIs, handling database interactions, and ensuring data integrity and security. Proficiency in programming languages such as Python, Java, or Node.js is essential for building robust backend systems. You must also be familiar with database management systems like MySQL or MongoDB to store and retrieve data efficiently. Additionally, understanding cloud services and deployment strategies is increasingly important in today’s tech landscape, as more applications move to cloud environments.",
            "As a full stack developer, you have the unique ability to work on both the frontend and backend of web applications. This versatility allows you to understand how different components of a project interact, which can lead to more cohesive and efficient development processes. You are skilled in various technologies, including HTML, CSS, JavaScript, as well as backend languages and frameworks like Express or Django. Your role often involves collaborating with cross-functional teams to deliver comprehensive solutions that meet user needs. Embracing continuous learning is crucial, as you need to stay updated with the latest trends and tools in both frontend and backend development.",
            "Mobile developers specialize in creating applications for mobile devices, focusing on platforms like iOS and Android. Your work requires a deep understanding of mobile user interface design, performance optimization, and platform-specific guidelines. Proficiency in languages such as Swift for iOS or Kotlin for Android is essential for developing high-quality applications. Moreover, you must consider various device sizes and capabilities to ensure a smooth user experience. As mobile technology continues to evolve, staying informed about the latest frameworks and tools, like React Native or Flutter, is crucial for delivering innovative mobile solutions."
        ];

        // Chọn ngẫu nhiên một đoạn văn từ mảng
        const randomParagraph = paragraphs[Math.floor(Math.random() * paragraphs.length)];

        // Cập nhật trạng thái với đoạn văn ngẫu nhiên
        setParagraph(randomParagraph);
        setCurrentParagraph(randomParagraph);
    };

    // Save paragraph
    const handleSave = () => {
        if (paragraph && !savedParagraphs.includes(paragraph)) {
            setSavedParagraphs([...savedParagraphs, paragraph]);
            toast.success("Paragraph saved!");
        } else {
            toast.error("Paragraph is empty or already saved!");
        }
    };
    
    // Edit paragraph
    const handleEdit = () => {
        setIsEditing(true);
        setCurrentParagraph(paragraph); 
    };

    // Done editing
    const handleDone = () => {
        setParagraph(currentParagraph);
        setIsEditing(false);
        toast.success("Paragraph updated!");
    };

    // Delete paragraph
    const handleDelete = () => {
        setParagraph('');
        setCurrentParagraph('');
        toast.success("Paragraph deleted!");
    };

    // Edit saved paragraph
    const handleEditSaved = (index) => {
        setEditingIndex(index);
        setCurrentParagraph(savedParagraphs[index]);
    };

    // Save edited paragraph
    const handleSaveEditedParagraph = () => {
        if (currentParagraph) {
            const updatedParagraphs = [...savedParagraphs];
            updatedParagraphs[editingIndex] = currentParagraph; 
            setSavedParagraphs(updatedParagraphs);
            setEditingIndex(null); 
            toast.success("Paragraph updated!");
        } else {
            toast.error("Paragraph cannot be empty!");
        }
    };

    // Delete saved paragraph
    const handleDeleteSaved = (index) => {
        const updatedParagraphs = savedParagraphs.filter((_, i) => i !== index);
        setSavedParagraphs(updatedParagraphs);
        toast.success("Paragraph deleted!");
    };

    return (
        <Box width={isNotMobile ? '40%' : '80%'} p={'2rem'} m={'2rem auto'} borderRadius={5} sx={{ boxShadow: 5 }} backgroundColor={theme.palette.background.alt}>
            <Collapse in={!!error}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            </Collapse>

            <form onSubmit={handleSubmit}>
                <Typography variant="h3">Paragraph</Typography>

                <TextField
                    placeholder="Enter your text ..."
                    onChange={(e) => setText(e.target.value)}
                    type="text"
                    multiline={true}
                    required
                    margin="normal"
                    fullWidth
                    value={text}
                />
                <Button type="submit" fullWidth variant="contained" size="large" sx={{ color: 'white', mt: 2 }}>
                    Generate
                </Button>

                <Typography mt={2}>
                    Not this tool? <Link to='/'>Go Back</Link>
                </Typography>
            </form>

            {/* Khung chứa đoạn văn đã tạo */}
            {paragraph && (
                <Card sx={{ mt: 4, border: 1, boxShadow: 0, height: 'auto', borderRadius: 5, borderColor: 'natural.medium', bgcolor: 'background.default' }}>
                    {isEditing ? (
                        <TextField
                            placeholder="Edit your paragraph..."
                            onChange={(e) => setCurrentParagraph(e.target.value)}
                            type="text"
                            multiline={true}
                            fullWidth
                            value={currentParagraph}
                            sx={{ p: 2 }}
                        />
                    ) : (
                        <Typography p={2}>{paragraph}</Typography>
                    )}

                    <Box display="flex" justifyContent="space-between" mt={2} mb={2}>
                        {isEditing ? (
                            <Button onClick={handleDone} variant="contained" size="small" sx={{ color: 'white' }}>
                                Done
                            </Button>
                        ) : (
                            <>
                                <Grid container spacing={1} justifyContent="center">
                                    <Grid item>
                                        <Button onClick={handleSave} variant="contained" size="small" sx={{ color: 'white' }}>
                                            Save
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button onClick={handleEdit} variant="contained" size="small" sx={{ color: 'white' }}>
                                            Edit
                                        </Button>
                                    </Grid>

                                    <Grid item>
                                        <Button onClick={handleDelete} variant="contained" size="small" sx={{ color: 'white' }}>
                                            Delete
                                        </Button>
                                    </Grid>
                                </Grid>
                            </>
                        )}
                    </Box>
                </Card>
            )}

            {/* Hiển thị thông báo nếu không có đoạn văn */}
            {!paragraph && (
                <Card sx={{ mt: 4, border: 1, boxShadow: 0, height: '500px', borderRadius: 5, borderColor: 'natural.medium', bgcolor: 'background.default' }}>
                    <Typography variant="h5" color='natural.main' sx={{ textAlign: 'center', verticalAlign: 'middle', lineHeight: '450px' }}>
                        Paragraph Text Appears Here
                    </Typography>
                </Card>
            )}

            {/* Danh sách các đoạn văn đã lưu */}
            {savedParagraphs.length > 0 && (
                <Box mt={4}>
                    <Typography variant="h5" fontWeight='bold'>Saved Paragraphs:</Typography>
                    <ul>
                        {savedParagraphs.map((saved, index) => (
                            <li key={index} style={{ marginBottom: '20px' }}>
                                {editingIndex === index ? (
                                    <Box display="flex" alignItems="center" width="100%">
                                        <TextField
                                            value={currentParagraph}
                                            onChange={(e) => setCurrentParagraph(e.target.value)}
                                            placeholder="Edit saved paragraph..."
                                            variant="outlined" 
                                            fullWidth 
                                            sx={{
                                                width: '500px', // Chiều dài
                                                height: '50px', // Chiều cao
                                                mr: 2 // Thay đổi margin right
                                            }}
                                        />
                                        <Button onClick={handleSaveEditedParagraph} variant="contained" size="small" sx={{ color: 'white' }}>
                                            Save
                                        </Button>
                                    </Box>
                                ) : (
                                    <Box display="flex" alignItems="center" width="100%">
                                        <Typography>{saved}</Typography>
                                        <Box display="flex" justifyContent="center" mt={1}>
                                            <Button onClick={() => handleEditSaved(index)} variant="contained" size="small" sx={{ color: 'white', mx: 1 }}>
                                                Edit
                                            </Button>
                                            <Button onClick={() => handleDeleteSaved(index)} variant="contained" size="small" sx={{ color: 'white', mx: 1 }}>
                                                Delete
                                            </Button>
                                        </Box>
                                    </Box>
                                )}
                            </li>
                        ))}
                    </ul>
                </Box>
            )}
        </Box>
    );
};

export default Paragraph;
