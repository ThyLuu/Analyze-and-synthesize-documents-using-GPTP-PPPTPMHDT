import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Box, Typography, useTheme, useMediaQuery, TextField, Button, Alert, Collapse, Card, Grid } from "@mui/material";

const Summary = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isNotMobile = useMediaQuery('(min-width: 1000px)');

    // States
    const [text, setText] = useState('');
    const [summary, setSummary] = useState('');
    const [error, setError] = useState('');

    const [currentSummary, setCurrentSummary] = useState('');
    const [savedSummaries, setSavedSummaries] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);


    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //       const { data } = await axios.post("/api/v1/openai/summary", { text });
    //       console.log(data);
    //       setSummary(data);
    //     } catch (err) {
    //       console.log(error);
    //       if (err.response.data.error) {
    //         setError(err.response.data.error);
    //       } else if (err.message) {
    //         setError(err.message);
    //       }
    //       setTimeout(() => {
    //         setError("");
    //       }, 5000);
    //     }
    //   };

    // thử nghiệm
    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!text) {
            setError("Text input is empty.");
            setTimeout(() => setError(''), 3000);
            return;
        }
    
        // Chia văn bản thành các câu
        const sentences = text.split(". ");
        
        // Lấy từ khóa bằng cách tìm các từ có độ dài lớn hơn 4 ký tự và không phải là stopwords (như: and, the, is, in,...)
        const words = text.match(/\b(\w{5,})\b/g) || []; // Tìm từ có độ dài >= 5 ký tự
        const wordFrequency = {};
    
        // Đếm tần suất xuất hiện của các từ
        words.forEach(word => {
            const lowerWord = word.toLowerCase();
            wordFrequency[lowerWord] = (wordFrequency[lowerWord] || 0) + 1;
        });
    
        // Sắp xếp các từ theo tần suất xuất hiện giảm dần
        const sortedWords = Object.keys(wordFrequency).sort((a, b) => wordFrequency[b] - wordFrequency[a]);
    
        // Chọn ra một số từ khóa quan trọng nhất
        const importantWords = sortedWords.slice(0, 5); // Lấy 5 từ quan trọng nhất
    
        // Chọn các câu có chứa các từ quan trọng này
        const importantSentences = sentences.filter(sentence => {
            return importantWords.some(word => sentence.toLowerCase().includes(word));
        });
    
        // Gộp các câu quan trọng thành đoạn tóm tắt
        const summarizedText = importantSentences.join(". ") + ".";
    
        setSummary(summarizedText);
        setCurrentSummary(summarizedText);
    };
    


    // Save summary
    const handleSave = () => {
        if (summary && !savedSummaries.includes(summary)) {
            setSavedSummaries([...savedSummaries, summary]);
            toast.success("Summary saved!");
        } else {
            toast.error("Summary is empty or already saved!");
        }
    };

    // Edit the current summary
    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleDone = () => {
        setSummary(currentSummary);
        setIsEditing(false);
    };

    const handleDelete = () => {
        setSummary('');
        setCurrentSummary('');
        setIsEditing(false);
    };

    // Edit saved summary
    const handleEditSaved = (index) => {
        setEditingIndex(index);
        setCurrentSummary(savedSummaries[index]);
    };

    // Save edited summary
    const handleSaveEditedSummary = () => {
        if (currentSummary) {
            const updatedSummaries = [...savedSummaries];
            updatedSummaries[editingIndex] = currentSummary;
            setSavedSummaries(updatedSummaries);
            setEditingIndex(null);
            toast.success("Summary updated!");
        } else {
            toast.error("Summary cannot be empty!");
        }
    };

    // Delete saved summary
    const handleDeleteSaved = (index) => {
        const updatedSummaries = savedSummaries.filter((_, i) => i !== index);
        setSavedSummaries(updatedSummaries);
        toast.success("Summary deleted!");
    };

    return (
        <Box width={isNotMobile ? '40%' : '80%'} p={'2rem'} m={'2rem auto'} borderRadius={5} sx={{ boxShadow: 5 }} backgroundColor={theme.palette.background.alt}>
            <Collapse in={!!error}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            </Collapse>

            {/* Input Form */}
            <form onSubmit={handleSubmit}>
                <Typography variant="h3">Summary</Typography>

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

            {/* Display Generated Summary */}
            {summary && (
                <Card sx={{ mt: 4, border: 1, boxShadow: 0, height: 'auto', borderRadius: 5, borderColor: 'natural.medium', bgcolor: 'background.default' }}>
                    {isEditing ? (
                        <TextField
                            placeholder="Edit your summary..."
                            onChange={(e) => setCurrentSummary(e.target.value)}
                            type="text"
                            multiline={true}
                            fullWidth
                            value={currentSummary}
                            sx={{ p: 2 }}
                        />
                    ) : (
                        <Typography p={2}>{summary}</Typography>
                    )}

                    {/* Action Buttons */}
                    <Box display="flex" justifyContent="space-between" mt={2} mb={2}>
                        {isEditing ? (
                            <Button onClick={handleDone} variant="contained" size="small" sx={{ color: 'white' }}>
                                Done
                            </Button>
                        ) : (
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
                        )}
                    </Box>
                </Card>
            )}

            {/* Placeholder when no summary is generated */}
            {!summary && (
                <Card sx={{ mt: 4, border: 1, boxShadow: 0, height: '500px', borderRadius: 5, borderColor: 'natural.medium', bgcolor: 'background.default' }}>
                    <Typography variant="h5" color='natural.main' sx={{ textAlign: 'center', verticalAlign: 'middle', lineHeight: '450px' }}>
                        Summary Text Appears Here
                    </Typography>
                </Card>
            )}

            {/* List of saved summaries */}
            {savedSummaries.length > 0 && (
                <Box mt={4}>
                    <Typography variant="h5" fontWeight='bold'>Saved Summaries:</Typography>
                    <ul>
                        {savedSummaries.map((saved, index) => (
                            <li key={index} style={{ marginBottom: '20px' }}>
                                {editingIndex === index ? (
                                    <Box display="flex" alignItems="center" width="100%">
                                        <TextField
                                            value={currentSummary}
                                            onChange={(e) => setCurrentSummary(e.target.value)}
                                            placeholder="Edit saved summary..."
                                            fullWidth
                                            sx={{
                                                width: '500px', // width
                                                height: '50px', // height
                                                mr: 2 // margin right
                                            }}
                                        />
                                        <Button onClick={handleSaveEditedSummary} variant="contained" size="small" sx={{ color: 'white' }}>
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

export default Summary;
