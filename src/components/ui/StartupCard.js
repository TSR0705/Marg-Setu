import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const StartupCard = ({ title, description, link }) => {
    return (
        <Card sx={{ padding: "20px", textAlign: "center", boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                    {description}
                </Typography>
                <Button variant="outlined" component={Link} to={link}>
                    Learn More
                </Button>
            </CardContent>
        </Card>
    );
};

export default StartupCard;

